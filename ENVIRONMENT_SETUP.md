# Environment Variables Setup for Production

## The Problem

Your contact form is failing in production because environment variables (EMAIL_USER and EMAIL_PASS) are not configured on your hosting platform.

## Solution for Vercel (Recommended)

### Step 1: Access Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Find and click on your portfolio project

### Step 2: Add Environment Variables

1. Click on the "Settings" tab
2. Click on "Environment Variables" in the left sidebar
3. Add these variables:

**Variable 1:**

- Name: `EMAIL_USER`
- Value: `sthaprabe20@gmail.com`
- Environment: Production, Preview, Development (select all)

**Variable 2:**

- Name: `EMAIL_PASS`
- Value: `uvmj cpfn iilq ugiy`
- Environment: Production, Preview, Development (select all)

### Step 3: Redeploy

1. Go to the "Deployments" tab
2. Click on the latest deployment
3. Click "Redeploy" button
4. Or simply push a new commit to GitHub

## Alternative Solutions

### If using Netlify:

1. Go to https://app.netlify.com/
2. Select your site
3. Go to "Site settings" → "Environment variables"
4. Add the same EMAIL_USER and EMAIL_PASS variables

### If using other hosting:

Look for "Environment Variables", "Config Vars", or "Build Environment" in your hosting platform settings.

## Testing

After adding environment variables and redeploying:

1. Visit your live site
2. Try the contact form
3. Check browser developer tools for any remaining errors

## Backup Plan

If environment variables still don't work, we can implement a client-side email solution using EmailJS as a fallback.
