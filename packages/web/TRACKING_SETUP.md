# Marketing Tracking Pixel Setup Guide

## Overview

This guide explains how to set up and configure the marketing tracking pixel for your HomeKnown application with secure environment variables.

## Security Features

### ✅ **Secure Implementation:**

1. **No Hardcoded URLs**: Cloud Function URL is completely hidden from the codebase
2. **Environment Variables Only**: All sensitive configuration is stored in `.env` files
3. **Fallback Protection**: Tracking pixel won't run if environment variables are missing
4. **Git Ignored**: `.env` files are excluded from version control

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the `packages/web` directory:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` with your actual values:

```env
# Your tracking endpoint URL (Cloud Function)
VITE_TRACKING_URL=https://us-central1-onyx-virtue-466622-d8.cloudfunctions.net/pixel-tracking

# Your site/agency ID
VITE_SITE_ID=1
```

### 2. Build and Deploy

The tracking pixel will automatically be included when you build your application:

```bash
npm run build
```

### 3. Testing the Tracking Pixel

#### Method 1: Browser Console

1. Open your website in a browser
2. Open Developer Tools (F12)
3. In the Console tab, run:

```javascript
import("./src/utils/tracking-test.js").then((module) =>
  module.testTrackingPixel()
);
```

#### Method 2: Network Tab

1. Open Developer Tools (F12)
2. Go to the Network tab
3. Refresh the page
4. Look for requests to your tracking URL
5. Check that the requests contain the expected data

#### Method 3: Application Tab

1. Open Developer Tools (F12)
2. Go to the Application tab
3. Check:
   - **Cookies**: Look for `_site_visitor_id`
   - **Local Storage**: Look for `_site_session`

## What the Tracking Pixel Does

### Data Collected:

- **Visitor ID**: Unique identifier stored in cookies
- **Session Data**: Page views, session duration, activity tracking
- **Page Information**: URL, title, referrer, URL parameters
- **Device Information**: User agent, screen resolution, timezone, language
- **User Behavior**: Time on site, activity patterns, page transitions

### Tracking Events:

1. **Page Views**: Triggered on page load and route changes
2. **Time Updates**: Sent every 30 seconds while user is active
3. **Session End**: Sent when user leaves the page or closes the browser
4. **Activity Tracking**: Monitors mouse, keyboard, scroll, and touch events

### Data Format:

```json
{
  "impressionId": "unique-impression-id",
  "siteId": "your_site_id",
  "visitorId": "unique-visitor-id",
  "sessionId": "unique-session-id",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "url": "https://your-site.com/page",
  "path": "/page",
  "title": "Page Title",
  "urlParameters": {},
  "referrer": "https://google.com",
  "referrerDomain": "google.com",
  "sessionPageViews": 1,
  "sessionStartTime": "2024-01-01T00:00:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "language": "en-US",
  "platform": "MacIntel",
  "cookieEnabled": true,
  "screenResolution": "1920x1080",
  "viewportSize": "1920x937",
  "timezone": "America/New_York",
  "timeOnSite": 0
}
```

## Troubleshooting

### Common Issues:

1. **"Tracking pixel not configured" warning**

   - Check that `.env` file exists and has correct values
   - Ensure environment variables start with `VITE_`
   - Restart the development server after changing `.env`

2. **No tracking requests in Network tab**

   - Verify the tracking URL is accessible
   - Check browser console for JavaScript errors
   - Ensure environment variables are properly set

3. **CORS errors**

   - Ensure your tracking endpoint allows requests from your domain
   - Check that the endpoint accepts POST requests with JSON content

4. **Tracking data not being sent**
   - Check browser privacy settings
   - Verify that cookies and localStorage are enabled
   - Check for ad blockers or privacy extensions

### Debug Commands:

```javascript
// Check if tracking variables are available
console.log("Tracking URL:", window.__TRACKING_URL__);
console.log("Site ID:", window.__SITE_ID__);

// Check visitor ID
console.log(
  "Visitor ID:",
  document.cookie
    .split("; ")
    .find((row) => row.startsWith("_site_visitor_id="))
    ?.split("=")[1]
);

// Check session data
console.log("Session:", localStorage.getItem("_site_session"));
```

## Security Considerations

1. **Data Privacy**: Ensure your tracking implementation complies with GDPR, CCPA, and other privacy regulations
2. **HTTPS**: Always use HTTPS in production to secure data transmission
3. **Data Minimization**: Only collect necessary data for your use case
4. **User Consent**: Consider implementing a consent management system
5. **Environment Variables**: Never commit `.env` files to version control
6. **URL Protection**: Cloud Function URLs are completely hidden from the codebase

## Deployment

### Development:

```bash
npm run dev
```

### Production:

```bash
npm run build
```

Make sure to set the environment variables in your production environment (Vercel, Netlify, etc.) with the same `VITE_` prefix.

## Support

If you're still having issues with the tracking pixel:

1. Check the browser console for error messages
2. Verify your tracking endpoint is working
3. Test with the provided test utility
4. Check that all environment variables are set correctly
5. Ensure `.env` file is in the correct location (`packages/web/.env`)
