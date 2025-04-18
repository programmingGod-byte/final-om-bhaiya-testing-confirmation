// routes/research-papers.js
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require("../models/Payment")
const router = express.Router();
const User = require("../models/User")
const Module  = require("../models/ModuleSchema")
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
// ROUTE 1 : Create Order Api Using POST Method http://localhost:4000/api/payment/order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})



router.post('/verify', async (req, res) => {
    console.log("dbvdhjsbvjdhsbfjhdsbvjkdhsv")
    console.log(req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, moduleId, email, amount } = req.body;

    // console.log("req.body", req.body);

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                moduleId,
                email
            });


            const user = await User.findOne({ email });
            const module = await Module.findOne({_id:moduleId})
            if (user) {
                user.paidModule.push({
                    moduleId,
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    amount: req.body.amount || 1, // or however you determine amount
                    date: new Date(),
                    moduleTitle:module.title,
                    moduleImageUri:module.image,
                    moduleDesc:module.description
                });
            }
            await user.save();




            // Save Payment 
            await payment.save();


            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }else{
            res.status(500).json({ message: "Internal Server Error!" });    
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})


module.exports = router;
