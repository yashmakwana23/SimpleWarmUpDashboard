# 🛠️ Development Commands - Fitness Dashboard

## 📁 Current Directory: `gas-deployment`
**This is your main development folder for the Fitness Dashboard project.**

## 🚀 Essential Clasp Commands

### **Push Changes**
```bash
clasp push
```
*Upload all local changes to Google Apps Script*

### **Deploy New Version**
```bash
clasp deploy --description "Your update description"
```
*Create a new deployment with your changes*

### **View Deployments**
```bash
clasp deployments
```
*See all deployment versions and IDs*

### **Check Status**
```bash
clasp status
```
*See which files have changed*

### **View Logs**
```bash
clasp logs
```
*Debug any runtime errors*

### **Pull Changes** (if working with multiple developers)
```bash
clasp pull
```
*Download latest changes from Google Apps Script*

## 🌐 **Current URLs**
- **Live Web App:** https://script.google.com/macros/s/AKfycbyfvE7ssOWQ5eFpFeXPtHA0s3cGpT5FZ5SMOrKsMxI/exec
- **Script Editor:** https://script.google.com/d/1BiaAFOTSz31283J42hSXcr5S8D-KG_P2tYi0CnrfiMrs8nqNOds015X2/edit

## 📝 **Development Workflow**

1. **Make Changes** to HTML/GS files in this folder
2. **Test Locally** (if possible)
3. **Push Changes:** `clasp push`
4. **Deploy:** `clasp deploy --description "Your changes"`
5. **Test Live:** Visit the web app URL
6. **Debug:** Use `clasp logs` if issues occur

## 🗂️ **File Structure**
```
gas-deployment/
├── index.html              # Main entry point
├── Code.gs                 # Backend Google Apps Script
├── styles.html             # All CSS styles
├── main-script.html        # Main JavaScript logic
├── api.html               # API integration layer
├── storage.html           # LocalStorage management
├── utils.html             # Utility functions
├── toast.html             # Notification system
├── modals.html            # Modal dialogs
├── sidebar.html           # Navigation sidebar
├── header.html            # Page header
├── today-plan.html        # Today's workout tab
├── workout-logs.html      # Workout history tab
├── complete-planner.html  # Workout planner tab
├── goals-assessment.html  # Goals & assessment tab
├── appscript.json         # App manifest
├── .clasp.json           # Clasp configuration
└── DEPLOYMENT_STATUS.md   # Current status
```

## ⚠️ **Important Notes**
- Always test after deployment
- Keep HTML files with proper `<script>` tags for JavaScript
- Backend database auto-creates on first use
- Check `DEPLOYMENT_STATUS.md` for current status

## 🔧 **Troubleshooting**
- **Push fails?** Check file syntax and permissions
- **Deployment errors?** Use `clasp logs` to debug
- **Web app not working?** Clear browser cache and try again
- **Need to restart?** Use `clasp logout` then `clasp login` 