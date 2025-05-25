const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { setWithTTL, getValue, deleteKey, getTTL } = require('./redisClient');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET
const {sendVerificationEmail} = require("./sendMail")
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
};


function generateRandomHash(length = 30) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}
router.post("/email-signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (user) {
      return res.status(400).send("User already registered, login first");
    }

    // Call email function (ideally async and awaited)
    let randomHash = generateRandomHash()
    setWithTTL(`${randomHash}`,JSON.stringify({
      email:email,
      firstName:firstName,
      lastName:lastName,
      password:password,
      isVerified:false
    }),1800)
    await sendVerificationEmail(email, `${firstName} ${lastName}`, `https://verigeek.xyz/verify/${randomHash}`);

    // Respond once and only once
    return res.status(200).send("Verification email sent check your inbox");
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send("Some error occurred");
  }
});

router.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  console.log(req.body)
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    let userId = await getValue(`${token}`);
    userId = JSON.parse(userId)
    console.log("USER ID")
    console.log(userId)
    if (!userId) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Mark user as verified
 let user = await User.findOne({ email:userId.email });
    let hashP = await hashPassword(userId.password)
    if (!user) {
      user = await User.create({
        name:`${userId.firstName} ${userId.lastName}`,
        email:userId.email,
        password:hashP, 
        profilePicture: "",
      });
    }

     const authToken = user.getSignedJwtToken();
  // await deleteKey(`${token}`);

    return res.status(200).json({ success: true, token: authToken,name:`${userId.firstName} ${userId.lastName}`,email:userId.email });

    // Delete token from Redis
    
    // return res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email }).select('+password');
    console.log(user)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(!user.isVerified){
      return res.status(404).json({ message: 'user email is not verified' });
    }


    // 2. Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const authToken = user.getSignedJwtToken();

    // 3. Success
    res.status(200).json({ message: 'Login successful', token:authToken,name:user.name,email:user.email,success:true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/google',(req,res)=>{
    res.send("hello ")
})

router.get('/profile', async (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) return res.sendStatus(401);
  
    const token = authHeader.split(' ')[1];
    console.log(token)
    console.log(JWT_SECRET)
    try {
        
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);

      console.log(decoded)
        console.log(user)
      res.status(200).json({
        name:user.name,
        email:user.email,
        wholeData:user
      });
    } catch (err) {
      res.sendStatus(403);
    }
  });

router.post('/google', async (req, res) => {
  const { token } = req.body;
  console.log("/google token",token)
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: 'google-login', 
        profilePicture: picture,
      });
    }

    const authToken = user.getSignedJwtToken();

    res.json({ success: true, token: authToken,name:name,email:email });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Google token verification failed' });
  }
});

module.exports = router;
