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

Since Apps Script only supports HTML and GS files (not separate JS or CSS files), we'll implement a multi-file structure:

1. **HTML Files (Frontend Pages)**:
   - `index.html`: Main entry point with navigation and shared UI components
   - `todayWorkout.html`: Today's workout plan page
   - `workoutLogs.html`: Workout logs and calendar page
   - `planner.html`: Complete workout planner
   - `goals.html`: Assessment and goals tracking

2. **GS Files (Backend Logic)**:
   - `Code.gs`: Main controller handling routing between pages and entry points
   - `Common.gs`: Shared utility functions and API communication logic
   - `TodayService.gs`: Functions related to today's workout
   - `LogsService.gs`: Functions for workout history and logs
   - `PlannerService.gs`: Planning and scheduling functions
   - `GoalsService.gs`: Goal setting and measurement tracking
   - `DataService.gs`: Core data access layer for Google Sheets

3. **HTML Includes**:
   - `SharedStyles.html`: Common CSS styles included in all pages
   - `SharedScripts.html`: Common JavaScript functions included in all pages
   - `Navigation.html`: Navigation menu included in all pages

### Page Navigation and Routing

```javascript
// In Code.gs
function doGet(e) {
  const page = e.parameter.page || 'today';
  
  switch(page) {
    case 'today':
      return HtmlService.createTemplateFromFile('todayWorkout')
        .evaluate()
        .setTitle('Today\'s Workout | InMotion Dashboard');
    case 'logs':
      return HtmlService.createTemplateFromFile('workoutLogs')
        .evaluate()
        .setTitle('Workout Logs | InMotion Dashboard');
    case 'planner':
      return HtmlService.createTemplateFromFile('planner')
        .evaluate()
        .setTitle('Workout Planner | InMotion Dashboard');
    case 'goals':
      return HtmlService.createTemplateFromFile('goals')
        .evaluate()
        .setTitle('Goals & Measurements | InMotion Dashboard');
    default:
      return HtmlService.createTemplateFromFile('todayWorkout')
        .evaluate()
        .setTitle('Today\'s Workout | InMotion Dashboard');
  }
}

// Include function for shared HTML components
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
```

### Common API Endpoints in Code.gs

```javascript
function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.postData.contents);
  
  switch (action) {
    // Today's workout
    case 'getTodayWorkouts':
      return TodayService.getTodayWorkouts();
    case 'completeExercise':
      return TodayService.completeExercise(data);
    case 'saveNotes':
      return TodayService.saveNotes(data);
      
    // Workout logs
    case 'getWorkouts':
      return LogsService.getWorkouts(data.month, data.year);
    case 'getWorkoutDetails':
      return LogsService.getWorkoutDetails(data.workoutId);
    
    // Planner
    case 'getPlans':
      return PlannerService.getPlans();
    case 'savePlan':
      return PlannerService.savePlan(data);
    
    // Goals & measurements
    case 'getGoals':
      return GoalsService.getGoals();
    case 'getMeasurements':
      return GoalsService.getMeasurements();
    case 'saveMeasurement':
      return GoalsService.saveMeasurement(data);
    
    default:
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Invalid action'
      })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Frontend Integration

Each HTML file includes shared components and page-specific logic:

### Shared Components Example

```html
<!-- In SharedScripts.html -->
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
  
  // Common UI functions
  function showLoadingIndicator() {
    document.getElementById('loading').style.display = 'flex';
  }
  
  function hideLoadingIndicator() {
    document.getElementById('loading').style.display = 'none';
  }
  
  function showError(message) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    setTimeout(() => {
      errorEl.style.display = 'none';
    }, 5000);
  }
  
  // Navigation functions
  function navigateTo(page) {
    window.location.href = '?page=' + page;
  }
</script>
```

### Page-specific Implementation Example

```html
<!-- In todayWorkout.html -->
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <?!= include('SharedStyles'); ?>
    <title>Today's Workout</title>
  </head>
  <body>
    <div id="loading" style="display: none;">Loading...</div>
    <div id="error-message" style="display: none;"></div>
    
    <?!= include('Navigation'); ?>
    
    <div class="container">
      <h1>Today's Workout</h1>
      <div id="today-content"></div>
    </div>
    
    <?!= include('SharedScripts'); ?>
    
    <script>
      // Page-specific functions
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
      
      function renderTodayWorkout(workoutData) {
        const container = document.getElementById('today-content');
        // Render workout data
      }
      
      // Initialize page
      document.addEventListener('DOMContentLoaded', loadTodayContent);
    </script>
  </body>
</html>
```

## Page-by-Page Integration

### 1. Today's Plan Page

**Backend Functions (TodayService.gs):**

```javascript
// In TodayService.gs
var TodayService = (function() {
  // Private functions
  function getWorkoutsByDate(dateStr) {
    return DataService.getWorkoutsByDate(dateStr);
  }
  
  function getExercises(workoutId) {
    return DataService.getExercisesByWorkoutId(workoutId);
  }
  
  // Public API
  return {
    getTodayWorkouts: function() {
      const today = new Date();
      const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      
      // Get today's workouts
      const workouts = getWorkoutsByDate(todayStr);
      
      // For each workout, get its exercises
      workouts.forEach(workout => {
        workout.exercises = getExercises(workout.workoutId);
      });
      
      return workouts;
    },
    
    completeExercise: function(data) {
      return DataService.updateExercise(data);
    },
    
    saveNotes: function(data) {
      return DataService.saveWorkoutNotes(data.workoutId, data.notes);
    }
  };
})();
```

### 2. Workout Logs / Calendar Page

**Backend Functions (LogsService.gs):**

```javascript
// In LogsService.gs
var LogsService = (function() {
  // Public API
  return {
    getWorkouts: function(month, year) {
      return DataService.getWorkouts(month, year);
    },
    
    getWorkoutDetails: function(workoutId) {
      const workout = DataService.getWorkoutById(workoutId);
      if (workout) {
        workout.exercises = DataService.getExercisesByWorkoutId(workoutId);
      }
      return workout;
    }
  };
})();
```

### 3. Complete Planner Page

**Backend Functions (PlannerService.gs):**

```javascript
// In PlannerService.gs
var PlannerService = (function() {
  // Private functions
  function getPlanWorkouts(planId) {
    return DataService.getPlanWorkouts(planId);
  }
  
  // Public API
  return {
    getPlans: function() {
      const plans = DataService.getPlans();
      
      // Get workouts for each plan
      plans.forEach(plan => {
        plan.dailyWorkouts = getPlanWorkouts(plan.planId);
      });
      
      return plans;
    },
    
    savePlan: function(planData) {
      // Save plan and its workouts
      const planId = DataService.savePlan(planData);
      
      if (planData.dailyWorkouts && planData.dailyWorkouts.length > 0) {
        DataService.savePlanWorkouts(planId, planData.dailyWorkouts);
      }
      
      return { success: true, planId: planId };
    }
  };
})();
```

### 4. Assessment & Goals Page 

**Backend Functions (GoalsService.gs):**

```javascript
// In GoalsService.gs
var GoalsService = (function() {
  // Public API
  return {
    getGoals: function() {
      return DataService.getGoals();
    },
    
    getMeasurements: function() {
      return DataService.getMeasurements();
    },
    
    saveMeasurement: function(data) {
      return DataService.saveMeasurement(data);
    },
    
    saveGoal: function(data) {
      return DataService.saveGoal(data);
    },
    
    updateGoalProgress: function(data) {
      return DataService.updateGoalProgress(data.goalId, data.currentValue);
    }
  };
})();
```

## Data Service Layer

```javascript
// In DataService.gs
var DataService = (function() {
  // Private utility functions
  function getSpreadsheet() {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
  
  function getSheet(sheetName) {
    return getSpreadsheet().getSheetByName(sheetName);
  }
  
  function generateId() {
    return Utilities.getUuid();
  }
  
  // Public API
  return {
    // Workout related functions
    getWorkoutsByDate: function(dateStr) {
      // Implementation...
    },
    
    getWorkouts: function(month, year) {
      // Implementation...
    },
    
    getWorkoutById: function(workoutId) {
      // Implementation...
    },
    
    getExercisesByWorkoutId: function(workoutId) {
      // Implementation...
    },
    
    updateExercise: function(data) {
      // Implementation...
    },
    
    saveWorkoutNotes: function(workoutId, notes) {
      // Implementation...
    },
    
    // Plan related functions
    getPlans: function() {
      // Implementation...
    },
    
    getPlanWorkouts: function(planId) {
      // Implementation...
    },
    
    savePlan: function(planData) {
      // Implementation...
    },
    
    savePlanWorkouts: function(planId, workouts) {
      // Implementation...
    },
    
    // Goals and measurements related functions
    getGoals: function() {
      // Implementation...
    },
    
    getMeasurements: function() {
      // Implementation...
    },
    
    saveMeasurement: function(data) {
      // Implementation...
    },
    
    saveGoal: function(data) {
      // Implementation...
    },
    
    updateGoalProgress: function(goalId, currentValue) {
      // Implementation...
    }
  };
})();
```

## Implementation Roadmap

### Phase 1: Setup and Data Structure
1. Create Google Sheets with the defined structure
2. Create file structure for HTML and GS files
3. Implement shared components and navigation
4. Setup DataService with core data access functions

### Phase 2: Today's Plan Integration
1. Implement todayWorkout.html page
2. Create TodayService.gs with required functions
3. Implement exercise completion functionality
4. Add notes functionality

### Phase 3: Calendar/Logs Integration
1. Implement workoutLogs.html page
2. Create LogsService.gs with required functions
3. Add date filtering and workout history viewing
4. Implement workout details view

### Phase 4: Planner Integration
1. Implement planner.html page
2. Create PlannerService.gs with required functions
3. Add plan creation and editing functionality
4. Implement workout scheduling features

### Phase 5: Goals & Assessments Integration
1. Implement goals.html page
2. Create GoalsService.gs with required functions
3. Add measurement tracking and visualization
4. Implement goal progress tracking

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

This integration plan provides a roadmap for connecting the InMotion Dashboard frontend with Google Apps Script and Sheets backend, specifically designed for a single user without authentication requirements. The implementation uses a modular structure with separate HTML pages and GS service files for better organization and maintainability.
