# Backend Integration Plan: InMotion Dashboard (Single User)

## Overview

This document outlines the plan to integrate the InMotion Dashboard frontend with a Google Apps Script backend and Google Sheets database. The application is designed for a single user with no authentication requirements. All implementation will conform to Apps Script limitations (only HTML and GS files supported).

## Data Architecture

### Google Sheets Structure

We'll organize data using multiple sheets within a single Google Sheets workbook:

1. **Workouts**
   - WorkoutID (Primary Key)
   - WorkoutDate
   - WorkoutType
   - Completed (Boolean)
   - Notes

2. **Exercises**
   - ExerciseID (Primary Key)
   - WorkoutID (Foreign Key)
   - ExerciseName
   - VideoURL
   - TargetSets
   - TargetReps
   - Weight
   - CompletedSets
   - CompletedReps
   - ActualWeight
   - Notes
   - IsCompleted (Boolean)

3. **Plans**
   - PlanID (Primary Key)
   - PlanName
   - StartDate
   - Duration
   - Status

4. **PlanWorkouts**
   - PlanWorkoutID (Primary Key)
   - PlanID (Foreign Key)
   - Day (Number)
   - WorkoutType
   - IsRestDay (Boolean)
   - Status (upcoming, completed, rest)

5. **Goals**
   - GoalID (Primary Key)
   - GoalType
   - TargetValue
   - CurrentValue
   - StartDate
   - TargetDate
   - Status (active, completed)

6. **Measurements**
   - MeasurementID (Primary Key)
   - Date
   - Weight
   - BodyFat
   - Chest
   - Waist
   - Hips
   - Biceps
   - Thighs
   - CustomMeasurements (JSON)

## Google Apps Script Implementation

### Structure

Since Apps Script only supports HTML and GS files (not separate JS or CSS files), we'll implement:

1. **HTML Files**:
   - `index.html`: Main application HTML with embedded CSS and JS
   - No separate CSS or JS files

2. **GS Files**:
   - `Code.gs`: Main backend logic and API endpoints
   - `DataService.gs`: Data access functions for Google Sheets

### API Endpoints in Code.gs

```javascript
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('InMotion Dashboard');
}

function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.postData.contents);
  
  switch (action) {
    case 'getWorkouts':
      return getWorkouts();
    case 'getTodayWorkouts':
      return getTodayWorkouts();
    case 'getPlans':
      return getPlans();
    case 'saveWorkout':
      return saveWorkout(data);
    case 'completeExercise':
      return completeExercise(data);
    case 'saveNotes':
      return saveNotes(data);
    // Other endpoints...
    default:
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Invalid action'
      })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Frontend Integration

Since all code will be in the HTML file with embedded JS, we'll include the API communication functions directly in the HTML file:

```javascript
// In index.html
<script>
  // API Communication functions
  function callServerFunction(functionName, params) {
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        [functionName](params);
    });
  }
  
  // Page-specific functions for each tab
  async function loadTodayContent() {
    showLoadingIndicator();
    try {
      const workoutData = await callServerFunction('getTodayWorkouts');
      renderTodayWorkout(workoutData);
    } catch (error) {
      showError('Failed to load today\'s workouts');
      console.error(error);
    } finally {
      hideLoadingIndicator();
    }
  }
  
  // Add similar functions for other pages
</script>
```

## Page-by-Page Integration

### 1. Today's Plan Page

**Integration Functions:**

```javascript
// In Code.gs
function getTodayWorkouts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Workouts');
  const today = new Date();
  const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  
  // Get today's workouts
  const workouts = getWorkoutsByDate(todayStr);
  
  // For each workout, get its exercises
  workouts.forEach(workout => {
    workout.exercises = getExercises(workout.workoutId);
  });
  
  return workouts;
}

function completeExercise(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Exercises');
  const exerciseId = data.exerciseId;
  
  // Find the row with this exercise
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === exerciseId) {
      // Update completion status
      sheet.getRange(i + 1, 12).setValue(data.completed);
      
      // Update sets, reps, weight if provided
      if (data.completedSets) sheet.getRange(i + 1, 8).setValue(data.completedSets);
      if (data.completedReps) sheet.getRange(i + 1, 9).setValue(data.completedReps);
      if (data.actualWeight) sheet.getRange(i + 1, 10).setValue(data.actualWeight);
      break;
    }
  }
  
  return {success: true};
}
```

### 2. Workout Logs / Calendar Page

**Integration Functions:**

```javascript
// In Code.gs
function getWorkouts(month, year) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Workouts');
  const data = sheet.getDataRange().getValues();
  const header = data.shift(); // Remove header row
  
  // Filter by date range if provided
  const filteredData = data.filter(row => {
    if (!month && !year) return true;
    
    const workoutDate = new Date(row[1]); // Assuming column B is WorkoutDate
    if (month && workoutDate.getMonth() + 1 !== month) return false;
    if (year && workoutDate.getFullYear() !== year) return false;
    
    return true;
  });
  
  // Map to response structure
  const workouts = filteredData.map(row => ({
    workoutId: row[0],
    date: row[1],
    workoutType: row[2],
    completed: row[3],
    notes: row[4]
  }));
  
  return workouts;
}
```

### 3. Complete Planner Page

**Integration Functions:**

```javascript
// In Code.gs
function getPlans() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Plans');
  const data = sheet.getDataRange().getValues();
  const header = data.shift(); // Remove header row
  
  // Map to response structure
  const plans = data.map(row => {
    const planId = row[0];
    const plan = {
      planId: planId,
      planName: row[1],
      startDate: row[2],
      duration: row[3],
      status: row[4]
    };
    
    // Get plan workouts
    plan.dailyWorkouts = getPlanWorkouts(planId);
    
    return plan;
  });
  
  return plans;
}

function getPlanWorkouts(planId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PlanWorkouts');
  const data = sheet.getDataRange().getValues();
  const header = data.shift(); // Remove header row
  
  // Filter by planId
  const filteredData = data.filter(row => row[1] === planId);
  
  // Map to response structure
  const planWorkouts = filteredData.map(row => ({
    planWorkoutId: row[0],
    day: row[2],
    workoutType: row[3],
    isRestDay: row[4],
    status: row[5],
    exercises: getRandomExercises(row[3]) // Generate sample exercises based on type
  }));
  
  return planWorkouts;
}
```

### 4. Assessment & Goals Page 

**Integration Functions:**

```javascript
// In Code.gs
function getGoals() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Goals');
  const data = sheet.getDataRange().getValues();
  const header = data.shift(); // Remove header row
  
  // Map to response structure
  const goals = data.map(row => ({
    goalId: row[0],
    goalType: row[1],
    targetValue: row[2],
    currentValue: row[3],
    startDate: row[4],
    targetDate: row[5],
    status: row[6]
  }));
  
  return goals;
}

function getMeasurements() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Measurements');
  const data = sheet.getDataRange().getValues();
  const header = data.shift(); // Remove header row
  
  // Map to response structure
  const measurements = data.map(row => ({
    measurementId: row[0],
    date: row[1],
    weight: row[2],
    bodyFat: row[3],
    chest: row[4],
    waist: row[5],
    hips: row[6],
    biceps: row[7],
    thighs: row[8],
    customMeasurements: row[9] ? JSON.parse(row[9]) : {}
  }));
  
  return measurements;
}

function saveMeasurement(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Measurements');
  
  // Generate ID if new measurement
  const measurementId = data.measurementId || Utilities.getUuid();
  
  // Format the data for sheet insertion
  let rowData = [
    measurementId,
    data.date || new Date(),
    data.weight || '',
    data.bodyFat || '',
    data.chest || '',
    data.waist || '',
    data.hips || '',
    data.biceps || '',
    data.thighs || '',
    data.customMeasurements ? JSON.stringify(data.customMeasurements) : ''
  ];
  
  // If existing measurement, update the row
  if (data.measurementId) {
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === measurementId) {
        // Update row
        for (let j = 0; j < rowData.length; j++) {
          if (rowData[j] !== '') {
            sheet.getRange(i + 1, j + 1).setValue(rowData[j]);
          }
        }
        break;
      }
    }
  } else {
    // Add new row
    sheet.appendRow(rowData);
  }
  
  return {success: true, measurementId: measurementId};
}
```

## Implementation Roadmap

### Phase 1: Setup and Data Structure
1. Create Google Sheets with the defined structure
2. Implement basic Apps Script endpoints
3. Setup HTML template with embedded CSS/JS

### Phase 2: Today's Plan Integration
1. Create data access functions for workouts
2. Implement exercise completion API
3. Add notes functionality

### Phase 3: Calendar/Logs Integration
1. Implement workout history retrieval
2. Add date filtering functionality
3. Enable past workout viewing

### Phase 4: Planner Integration
1. Setup plan data structure
2. Implement plan retrieval and display
3. Add plan day details functionality

### Phase 5: Goals & Assessments Integration
1. Implement measurement tracking
2. Add goal setting and progress tracking
3. Create visualization for body metrics

## Testing

Create a testing protocol for each feature:
1. Unit test each Apps Script function
2. Verify data storage and retrieval
3. Test UI updates based on data changes
4. Ensure proper error handling

## Deployment

1. Deploy the Apps Script as a web app
2. Set access to "Anyone, even anonymous"
3. Publish app URL for end user access

## Notes & Considerations

1. **Offline Support**: Consider implementing client-side storage for offline usage
2. **Performance**: Be mindful of Apps Script quotas - minimize API calls when possible
3. **Data Backup**: Implement periodic backup of Google Sheets data
4. **Mobile Responsiveness**: Ensure UI works well on mobile devices
5. **Apps Script Limitations**: Be aware of execution time limits (6 minutes per execution)

## Conclusion

This integration plan provides a roadmap for connecting the InMotion Dashboard frontend with Google Apps Script and Sheets backend, specifically designed for a single user without authentication requirements. The implementation respects Apps Script limitations by using only HTML and GS files.
