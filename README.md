# Shipment Tracker Frontend

Track inbound shipments from FedEx and DHL with a beautiful, responsive interface.

## Features

- 📦 Real-time shipment tracking from FedEx and DHL
- 📊 Summary dashboard with key metrics
- 🔄 Automatic refresh capability
- 📱 Fully responsive design
- 🎨 Modern, clean UI with Tailwind CSS
- ⚡ Fast and optimized for production
- 🔒 Secure environment variable configuration

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Backend API deployed and running

## Installation

\`\`\`bash
# Install dependencies
npm install
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

**Important:** Update `.env.production` with your actual backend URL before deploying!

## Development

\`\`\`bash
# Start development server
npm start

# App will open at http://localhost:3000
\`\`\`

## Building for Production

\`\`\`bash
# Create production build
npm run build

# Test production build locally
npx serve -s build
\`\`\`

## Deployment to Heroku

### Via GitHub (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/shipment-tracker-frontend.git
   git push -u origin main
   \`\`\`

2. **Create Heroku App**
   \`\`\`bash
   heroku create shipment-tracker-frontend
   \`\`\`

3. **Set Environment Variable**
   \`\`\`bash
   heroku config:set REACT_APP_BACKEND_URL=https://your-backend.herokuapp.com
   \`\`\`

4. **Connect GitHub to Heroku**
   - Go to Heroku Dashboard → Deploy tab
   - Connect GitHub repository
   - Enable automatic deploys

5. **Deploy**
   - Click "Deploy Branch" for initial deploy
   - Future pushes to main will auto-deploy

### Via Heroku CLI

\`\`\`bash
# Push directly to Heroku
git push heroku main
\`\`\`

## Backend Requirements

This frontend requires a backend API with these endpoints:

- \`POST /api/fedex/track\` - Fetch FedEx shipments
- \`GET /api/dhl/track\` - Fetch DHL shipments
- \`GET /health\` - Health check

The backend must have CORS enabled for your frontend domain.

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
- \`npm run eject\` - Eject from Create React App

## Troubleshooting

### Unable to connect to API backend

1. Check backend is running: \`curl https://your-backend.herokuapp.com/health\`
2. Verify REACT_APP_BACKEND_URL is set correctly
3. Check CORS configuration on backend
4. Look at browser console for specific errors

### Build fails

1. Run \`npm run build\` locally to see errors
2. Check for missing dependencies
3. Verify Node version matches package.json

### Environment variables not working

1. Ensure variable names start with \`REACT_APP_\`
2. Restart development server after changing .env files
3. For production, trigger new deployment after changing Heroku config vars

## Tech Stack

- **React** 18.2.0 - UI framework
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons
- **Express** - Production server
- **Create React App** - Build tooling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For issues or questions, check the browser console for errors or open an issue on GitHub.
\`\`\`

---

## Setup Instructions

### 1. Create React App

\`\`\`bash
npx create-react-app shipment-tracker-frontend
cd shipment-tracker-frontend
\`\`\`

### 2. Replace Files

Copy all the files above into your project, maintaining the directory structure.

### 3. Install Dependencies

\`\`\`bash
npm install lucide-react express
\`\`\`

### 4. Update Environment Variables

Edit `.env.production` and replace with your actual backend URL:
\`\`\`
REACT_APP_BACKEND_URL=https://your-actual-backend.herokuapp.com
\`\`\`

### 5. Test Locally

\`\`\`bash
npm start
\`\`\`

### 6. Deploy to GitHub & Heroku

Follow the deployment guide from the previous artifact.

---

## Complete! 🎉

You now have all the code needed for your frontend application.

**Next steps:**
1. Copy all files
2. Update .env.production with your backend URL
3. Test locally with \`npm start\`
4. Push to GitHub
5. Deploy to Heroku

Your app will be live at: \`https://shipment-tracker-frontend.herokuapp.com\`
