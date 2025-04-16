const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    moduleId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
