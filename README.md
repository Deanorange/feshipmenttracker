# Shipment Tracker Frontend

Track inbound shipments from FedEx and DHL with a beautiful, responsive interface.

## Features

- Real-time shipment tracking
- Support for FedEx and DHL carriers
- Summary dashboard with key metrics
- Automatic fallback to mock data if backend unavailable
- Responsive design for mobile and desktop
- Production-ready with environment variable support

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

\`\`\`bash
# Install dependencies
npm install
\`\`\`

## Development

\`\`\`bash
# Start development server
npm start

# App will open at http://localhost:3000
\`\`\`

## Environment Variables

### Development (.env.development)
\`\`\`
REACT_APP_BACKEND_URL=http://localhost:3001
\`\`\`

### Production (.env.production)
\`\`\`
REACT_APP_BACKEND_URL=https://your-backend-app.herokuapp.com
\`\`\`

## Building for Production

\`\`\`bash
# Create production build
npm run build

# Test production build locally
npm install -g serve
serve -s build
\`\`\`

## Deployment

### Heroku

\`\`\`bash
# Create Heroku app
heroku create shipment-tracker-frontend

# Set environment variable
heroku config:set REACT_APP_BACKEND_URL=https://your-backend.herokuapp.com

# Deploy via GitHub (recommended)
# 1. Connect GitHub repository in Heroku dashboard
# 2. Enable automatic deploys

# Or deploy via CLI
git push heroku main
\`\`\`

### Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Or deploy via GitHub integration at vercel.com
\`\`\`

### Netlify

\`\`\`bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Or deploy via GitHub integration at netlify.com
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # React components
│   └── ShipmentTracker.js
├── services/           # API services
│   └── api.js
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
\`\`\`

## Available Scripts

- \`npm start\` - Start development server
- \`npm build\` - Create production build
- \`npm test\` - Run tests
- \`npm run eject\` - Eject from Create React App (one-way operation)

## Backend Requirements

This frontend expects a backend server with the following endpoints:

- \`POST /api/fedex/track\` - Fetch FedEx shipments
- \`GET /api/dhl/track\` - Fetch DHL shipments
- \`GET /health\` - Health check endpoint

The backend must have CORS enabled for your frontend domain.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
\`\`\`

---

## Quick Start Guide

### 1. Create React App

\`\`\`bash
# Create new React app
npx create-react-app shipment-tracker-frontend
cd shipment-tracker-frontend

# Install dependencies
npm install lucide-react express
\`\`\`

### 2. Copy All Files

Copy all the files above into your project, maintaining the directory structure.

### 3. Run Locally

\`\`\`bash
# Start development server
npm start
\`\`\`

### 4. Deploy to Heroku

\`\`\`bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/YOUR-USERNAME/shipment-tracker-frontend.git
git push -u origin main

# Create and deploy Heroku app
heroku create shipment-tracker-frontend
heroku config:set REACT_APP_BACKEND_URL=https://your-backend.herokuapp.com

# Connect GitHub in Heroku dashboard and deploy
\`\`\`

---

## Production Checklist

- [ ] All files created in correct structure
- [ ] Dependencies installed (\`npm install\`)
- [ ] Environment variables configured
- [ ] Backend URL updated in .env.production
- [ ] Build succeeds locally (\`npm run build\`)
- [ ] App runs in development (\`npm start\`)
- [ ] Code pushed to GitHub
- [ ] Heroku app created
- [ ] GitHub connected to Heroku
- [ ] Environment variables set on Heroku
- [ ] App deployed successfully
- [ ] Backend CORS configured
- [ ] Production app tested

---

## Troubleshooting

**Build Fails**
- Run \`npm run build\` locally to see errors
- Check for missing dependencies
- Verify Node version matches package.json engines

**API Calls Fail**
- Check REACT_APP_BACKEND_URL is set correctly
- Verify backend is running
- Check CORS configuration on backend
- Look at browser Network tab for details

**Blank Page in Production**
- Check browser console for errors
- Verify build completed successfully
- Check server.js is serving files correctly

---

Your production-ready React app is complete! 🚀
