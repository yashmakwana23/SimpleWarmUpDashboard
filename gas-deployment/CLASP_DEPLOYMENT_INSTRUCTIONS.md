# 🚀 Fitness Dashboard - Clasp Deployment Guide

## Prerequisites

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **Install Clasp (Google Apps Script CLI)**
   ```bash
   npm install -g @google/clasp
   ```

3. **Enable Google Apps Script API**
   - Go to: https://script.google.com/home/usersettings
   - Turn ON "Google Apps Script API"

## 🔧 Deployment Steps

### Step 1: Login to Google Account
```bash
clasp login
```
This will open a browser window to authenticate with your Google account.

### Step 2: Navigate to Deployment Folder
```bash
cd gas-deployment
```

### Step 3: Create New Google Apps Script Project
```bash
clasp create --title "Fitness Dashboard" --type webapp
```

This command will:
- Create a new Google Apps Script project
- Generate a Script ID
- Update the `.clasp.json` file automatically

### Step 4: Push All Files to Google Apps Script
```bash
clasp push
```

This uploads all your local files to the Google Apps Script project.

### Step 5: Deploy as Web App
```bash
clasp deploy --description "Initial deployment of Fitness Dashboard"
```

### Step 6: Open the Project (Optional)
```bash
clasp open
```
This opens the Google Apps Script editor in your browser.

## 📱 Web App Configuration

After deployment, in the Google Apps Script editor:

1. **Set Execution Settings:**
   - Execute as: "Me"
   - Who has access: "Anyone" (or "Anyone with Google account" for more security)

2. **Get Web App URL:**
   - Click "Deploy" → "Manage deployments"
   - Copy the Web app URL

## 🔄 Updating the App

When you make changes to the code:

1. **Push changes:**
   ```bash
   clasp push
   ```

2. **Create new deployment:**
   ```bash
   clasp deploy --description "Updated version"
   ```

## 📋 File Structure

The deployment folder contains:
- `index.html` - Main entry point
- `Code.gs` - Backend logic
- `*.html` - UI components and modules
- `appscript.json` - Project manifest
- `.clasp.json` - Clasp configuration

## 🔍 Troubleshooting

### Common Issues:

1. **"Script not found" error:**
   - Make sure Google Apps Script API is enabled
   - Check if you're logged in: `clasp login --status`

2. **Permission denied:**
   - Re-run `clasp login` to refresh authentication

3. **Push fails:**
   - Check if all files are valid
   - Ensure no syntax errors in Code.gs

### Useful Commands:

```bash
# Check clasp status
clasp login --status

# List your projects
clasp list

# Pull latest changes from Google Apps Script
clasp pull

# View deployment info
clasp deployments

# View project info
clasp open --webapp
```

## 🎯 Next Steps

1. Test the web app thoroughly
2. Configure Google Sheets backend (auto-created on first use)
3. Customize the app settings as needed
4. Share the web app URL with users

## 📞 Support

If you encounter any issues:
1. Check the Google Apps Script logs: `clasp logs`
2. Verify all files are properly formatted
3. Ensure Google Apps Script API is enabled
4. Try re-authentication: `clasp logout` then `clasp login`

---
**Your Fitness Dashboard is ready to deploy! 🏋️‍♂️** 