const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'publisher', 'admin'],
    default: 'user'
  },
  profilePicture: {
    type: String,
    default: 'default-profile.jpg'
  },
  completedModules: [{
    module: {
      type: mongoose.Schema.ObjectId,
      ref: 'Module'
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  completedExercises: [{
    exercise: {
      type: mongoose.Schema.ObjectId,
      ref: 'Exercise'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number,
      default: 0
    }
  }],
  bookmarks: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Module'
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  paidModule: {
    type: [
      {
        moduleId: {
          type: String,
          required: true
        },
        moduleImageUri:{
          type:String,
          required:true,
        },
        moduleTitle:{
          type:String,
          required:true,
        },
        moduleDesc:{
          type:String,
          required:true,
        },
        razorpay_order_id: {
          type: String,
          required: true
        },
        razorpay_payment_id: {
          type: String,
          required: true
        },
        razorpay_signature: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []
  }
});

// Encrypt password using bcrypt
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 