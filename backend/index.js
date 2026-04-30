const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/ResumeAnalysis', require('./routes/analysis'));

// PORT (important for Render)
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export API key if needed
module.exports = { API: process.env.GROQ_API_KEY };