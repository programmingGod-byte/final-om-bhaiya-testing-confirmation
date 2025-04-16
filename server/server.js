require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes')
const workSpaceRoutes = require('./src/routes/workSpaceRoutes')
const morgan = require('morgan');
// Load env vars
const moduleRoutes = require('./src/routes/ModulesConf')
const adminRoutes = require('./src/routes/adminRoutes')
const generalRoute = require('./src/routes/generalRoute')
const paymentRoute = require("./src/routes/payment")
const app = express();

// Middleware
app.use(cors({
  origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Serve static files
app.use('/images', express.static(path.join(__dirname, '../public/images')));




// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/verilog_forum';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes

app.use('/api/auth',authRoutes)
app.use('/api/workspace/',workSpaceRoutes)
app.use('/api/modules',moduleRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/payment',paymentRoute)
app.use('/api/general',generalRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 