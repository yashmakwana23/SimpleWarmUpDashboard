# InMotion Fitness Dashboard - Deployment Guide

## Overview
This guide will walk you through deploying the InMotion Fitness Dashboard as a Google Apps Script Web App with Google Sheets as the backend database.

## Prerequisites
- Google Account
- Access to Google Apps Script (script.google.com)
- Access to Google Sheets
- Basic understanding of web development

## Architecture Overview
- **Frontend**: Modular HTML/CSS/JavaScript files
- **Backend**: Google Apps Script (.gs file)
- **Database**: Google Sheets with multiple tabs
- **Authentication**: Google Account authentication
- **Hosting**: Google Apps Script Web App

## Step-by-Step Deployment

### Step 1: Create a New Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Rename the project to "InMotion Fitness Dashboard"

### Step 2: Add All Files to the Project

#### 2.1 Add the Main HTML File
1. Delete the default `Code.gs` content
2. Copy the content from `Code.gs` in this project
3. Paste it into the script editor

#### 2.2 Add HTML Files
For each HTML file in the project, create a new HTML file in Apps Script:

1. Click the "+" button next to "Files"
2. Select "HTML"
3. Name it exactly as the filename (without .html extension)
4. Copy and paste the content from each file:

**Required HTML Files:**
- `index` (from index.html)
- `styles` (from styles.html)
- `sidebar` (from sidebar.html)
- `header` (from header.html)
- `today-plan` (from today-plan.html)
- `workout-logs` (from workout-logs.html)
- `complete-planner` (from complete-planner.html)
- `goals-assessment` (from goals-assessment.html)
- `modals` (from modals.html)
- `toast` (from toast.html)
- `utils` (from utils.html)
- `storage` (from storage.html)
- `api` (from api.html)
- `main-script` (from main-script.html)

### Step 3: Configure the Backend

#### 3.1 Set Up Google Sheets Integration
1. In the Apps Script editor, go to `Code.gs`
2. Find the `CONFIG` object at the top
3. The `SPREADSHEET_ID` will be automatically set when you first run the app

#### 3.2 Set Permissions
1. In the Apps Script editor, click on "Permissions" (lock icon)
2. Review and approve the required permissions:
   - Google Sheets access
   - Google Drive access (for file uploads)
   - External service access (for CDN resources)

### Step 4: Deploy the Web App

#### 4.1 Deploy Settings
1. Click "Deploy" > "New deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Configure the deployment:
   - **Description**: "InMotion Fitness Dashboard v1.0"
   - **Execute as**: "Me"
   - **Who has access**: Choose based on your needs:
     - "Only myself" (for personal use)
     - "Anyone with Google account" (for team use)
     - "Anyone" (for public use - not recommended)

#### 4.2 Deploy
1. Click "Deploy"
2. Authorize the application when prompted
3. Copy the Web App URL provided

### Step 5: Initialize the Database

#### 5.1 First Run Setup
1. Open the deployed Web App URL
2. The app will automatically create the necessary Google Sheets structure
3. Check your Google Drive for a new spreadsheet named "InMotion Fitness Dashboard Data"

#### 5.2 Verify Sheets Structure
The following sheets should be created automatically:
- Users
- Workouts
- WorkoutPlans
- ExerciseLibrary
- UserProgress
- Goals
- Assessments
- Notes
- Settings

### Step 6: Testing and Verification

#### 6.1 Basic Functionality Test
1. Open the web app
2. Navigate through all tabs:
   - Today's Plan
   - Workout Logs
   - Complete Planner
   - Assessment & Goals
3. Test basic interactions:
   - Complete an exercise
   - Add a goal
   - Update weight
   - Add a note

#### 6.2 Data Verification
1. Check the Google Sheets to ensure data is being saved
2. Verify user authentication is working
3. Test responsive design on mobile devices

## Configuration Options

### Customizing the App

#### 6.1 Branding
- Update the logo URL in `sidebar.html`
- Modify colors in the Tailwind config in `index.html`
- Customize the app name in various locations

#### 6.2 Default Workouts
- Modify the `createDefaultWorkout` function in `Code.gs`
- Add your own exercise library in the `ExerciseLibrary` sheet

#### 6.3 Timezone Settings
- Update the `CONFIG.TIMEZONE` in `Code.gs`
- Ensure it matches your users' timezone

### Performance Optimization

#### 6.1 Caching
- The app uses localStorage for caching
- Adjust cache durations in `storage.html`
- Monitor API call frequency

#### 6.2 Data Management
- Regularly clean up old data in sheets
- Consider archiving completed workouts
- Monitor sheet size limits

## Security Considerations

### 6.1 Access Control
- Use "Anyone with Google account" for team deployments
- Implement additional user validation if needed
- Consider domain restrictions for enterprise use

### 6.2 Data Privacy
- All data is stored in the user's Google Sheets
- No external data sharing by default
- Users own their fitness data

### 6.3 API Security
- All API calls are authenticated through Google
- No external API keys required
- Rate limiting handled by Google Apps Script

## Maintenance and Updates

### 6.1 Updating the App
1. Make changes to the code in Apps Script
2. Create a new deployment version
3. Update the web app URL if needed

### 6.2 Backup Strategy
- Google Sheets data is automatically backed up by Google
- Export sheets periodically for additional backup
- Version control your Apps Script code

### 6.3 Monitoring
- Check Apps Script execution logs regularly
- Monitor user feedback and error reports
- Track usage through Google Analytics (optional)

## Troubleshooting

### Common Issues

#### 6.1 "Script function not found" Error
- Ensure all function names match exactly
- Check for typos in function calls
- Verify all files are properly included

#### 6.2 Permission Denied Errors
- Re-authorize the application
- Check sharing settings on the spreadsheet
- Verify deployment permissions

#### 6.3 Loading Issues
- Check browser console for JavaScript errors
- Verify all HTML files are included
- Test with different browsers

#### 6.4 Data Not Saving
- Check Google Sheets permissions
- Verify user authentication
- Review Apps Script execution logs

### Performance Issues

#### 6.1 Slow Loading
- Optimize image sizes
- Review API call frequency
- Consider lazy loading for large datasets

#### 6.2 Script Timeout
- Break large operations into smaller chunks
- Use batch operations for bulk updates
- Consider asynchronous processing

## Advanced Customization

### 6.1 Adding New Features
1. Create new HTML components
2. Add corresponding backend functions
3. Update the API layer
4. Test thoroughly before deployment

### 6.2 Integrating External APIs
- Use Google Apps Script's UrlFetchApp
- Handle authentication securely
- Consider rate limiting

### 6.3 Custom Reports
- Create additional sheets for reports
- Add visualization using Google Charts
- Export functionality for data analysis

## Support and Resources

### Documentation
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community
- Google Apps Script Community Forums
- Stack Overflow (apps-script tag)
- GitHub Issues (for this project)

## Version History

### v1.0.0 (Current)
- Initial release
- Basic fitness tracking functionality
- Google Sheets integration
- Responsive design
- Mobile-first approach

### Planned Features (Future Versions)
- Exercise video integration
- Advanced analytics
- Social sharing features
- Workout reminders
- Progress photos
- Nutrition tracking

---

## Quick Start Checklist

- [ ] Create Google Apps Script project
- [ ] Add all HTML files
- [ ] Copy Code.gs content
- [ ] Configure deployment settings
- [ ] Deploy as web app
- [ ] Test basic functionality
- [ ] Verify data storage
- [ ] Customize branding (optional)
- [ ] Share with users

**Estimated deployment time**: 30-45 minutes

For additional support or questions, please refer to the project documentation or create an issue in the project repository. 