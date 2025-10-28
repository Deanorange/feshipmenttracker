const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CRITICAL: CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL || 'https://shipment-tracker-frontend.herokuapp.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Your API endpoints here...
// (FedEx, DHL, health check endpoints)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
