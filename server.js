const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


// Middleware
// app.use(cors(
//     {
//        origin: 'https://insignyx.com',
// //        methods: ['GET', 'POST'],   
//   }
// ));

app.use(cors({
  origin: 'https://insignyx.com',
  methods: ['GET', 'POST', 'OPTIONS'], // ensure OPTIONS is included
  credentials: true // if you're sending cookies or auth headers
}));

app.options('*', cors());
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' https://backend-of-the-igsignyx.onrender.com;");
//   next();
// });
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 