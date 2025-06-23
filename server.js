const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser=require('body-parser')
const db= require('./db'); // Assuming you have a db.js file for MongoDB connection

dotenv.config();

const app = express(bodyParser);



// Middleware
// app.use(cors(
//     {
//        origin: 'https://insignyx.com',
// //        methods: ['GET', 'POST'],   
//   }
// ));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'], // ensure OPTIONS is included
  credentials: true // if you're sending cookies or auth headers
}));

app.options('*', cors());
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' https://backend-of-the-igsignyx.onrender.com;");
//   next();
// });
app.use(express.json());




// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);


//importing the apply route
const applyRoute=require('./routes/applyRoute');
app.use('/',applyRoute);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 