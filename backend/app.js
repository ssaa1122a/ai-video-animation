const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const videoRoutes = require('./routes/videos'); // ✅ Route import

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Base route
app.get('/', (req, res) => {
    res.send('Backend API is working 🚀');
});

// ✅ API routes
app.use('/api', videoRoutes);

// ✅ MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
}) // ← This was missing
.catch(err => console.error('❌ MongoDB connection error:', err));
