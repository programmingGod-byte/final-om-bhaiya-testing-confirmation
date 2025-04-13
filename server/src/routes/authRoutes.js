const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET
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
        email:user.email
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
