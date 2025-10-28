const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// IMPORTANT: Enable CORS for your frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());

// Your endpoints here...
```

### 4. **Check Frontend is Pointing to Correct URL**

Create/update `.env.development` in your React app root:
```
REACT_APP_BACKEND_URL=http://localhost:3001
