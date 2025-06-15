/**
 * InMotion Fitness Dashboard - Google Apps Script Backend
 * Handles data storage and processing using Google Sheets
 */

// Configuration
const CONFIG = {
  SPREADSHEET_ID: '', // Will be set when deployed
  SHEETS: {
    USERS: 'Users',
    WORKOUTS: 'Workouts',
    WORKOUT_PLANS: 'WorkoutPlans',
    EXERCISE_LIBRARY: 'ExerciseLibrary',
    USER_PROGRESS: 'UserProgress',
    GOALS: 'Goals',
    ASSESSMENTS: 'Assessments',
    NOTES: 'Notes',
    SETTINGS: 'Settings'
  },
  TIMEZONE: 'America/New_York' // Default timezone
};

/**
 * Initialize the web app
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

/**
 * Include other HTML files (for modular structure)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Initialize spreadsheet structure if it doesn't exist
 */
function initializeSpreadsheet() {
  try {
    let spreadsheet;
    
    if (CONFIG.SPREADSHEET_ID) {
      spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    } else {
      spreadsheet = SpreadsheetApp.create('InMotion Fitness Dashboard Data');
      CONFIG.SPREADSHEET_ID = spreadsheet.getId();
    }
    
    // Create necessary sheets
    Object.values(CONFIG.SHEETS).forEach(sheetName => {
      let sheet = spreadsheet.getSheetByName(sheetName);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(sheetName);
        initializeSheetHeaders(sheet, sheetName);
      }
    });
    
    return { success: true, spreadsheetId: spreadsheet.getId() };
  } catch (error) {
    console.error('Error initializing spreadsheet:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Initialize headers for each sheet
 */
function initializeSheetHeaders(sheet, sheetName) {
  const headers = getSheetHeaders(sheetName);
  if (headers.length > 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
}

/**
 * Get headers for each sheet type
 */
function getSheetHeaders(sheetName) {
  const headerMap = {
    [CONFIG.SHEETS.USERS]: ['userId', 'email', 'name', 'createdAt', 'preferences', 'timezone'],
    [CONFIG.SHEETS.WORKOUTS]: ['workoutId', 'userId', 'day', 'title', 'exercises', 'status', 'completedAt', 'duration', 'notes'],
    [CONFIG.SHEETS.WORKOUT_PLANS]: ['planId', 'name', 'description', 'difficulty', 'duration', 'exercises', 'createdAt'],
    [CONFIG.SHEETS.EXERCISE_LIBRARY]: ['exerciseId', 'name', 'category', 'equipment', 'instructions', 'videoUrl', 'difficulty'],
    [CONFIG.SHEETS.USER_PROGRESS]: ['progressId', 'userId', 'currentDay', 'completedDays', 'streak', 'totalWorkouts', 'totalMinutes', 'lastUpdated'],
    [CONFIG.SHEETS.GOALS]: ['goalId', 'userId', 'title', 'target', 'current', 'unit', 'deadline', 'status', 'createdAt', 'completedAt'],
    [CONFIG.SHEETS.ASSESSMENTS]: ['assessmentId', 'userId', 'type', 'value', 'unit', 'notes', 'recordedAt'],
    [CONFIG.SHEETS.NOTES]: ['noteId', 'userId', 'title', 'content', 'category', 'attachments', 'createdAt', 'updatedAt'],
    [CONFIG.SHEETS.SETTINGS]: ['key', 'value', 'description', 'updatedAt']
  };
  
  return headerMap[sheetName] || [];
}

/**
 * Get or create current user
 */
function getCurrentUser() {
  const email = Session.getActiveUser().getEmail();
  const usersSheet = getSheet(CONFIG.SHEETS.USERS);
  
  // Check if user exists
  const users = getSheetData(usersSheet);
  const existingUser = users.find(user => user.email === email);
  
  if (existingUser) {
    return existingUser;
  }
  
  // Create new user
  const newUser = {
    userId: Utilities.getUuid(),
    email: email,
    name: email.split('@')[0], // Default name from email
    createdAt: new Date().toISOString(),
    preferences: JSON.stringify({}),
    timezone: CONFIG.TIMEZONE
  };
  
  addRowToSheet(usersSheet, newUser);
  return newUser;
}

/**
 * Helper function to get sheet
 */
function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  return spreadsheet.getSheetByName(sheetName);
}

/**
 * Helper function to get sheet data as objects
 */
function getSheetData(sheet) {
  if (!sheet || sheet.getLastRow() <= 1) return [];
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

/**
 * Helper function to add row to sheet
 */
function addRowToSheet(sheet, data) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(header => data[header] || '');
  sheet.appendRow(row);
}

/**
 * Helper function to update row in sheet
 */
function updateRowInSheet(sheet, rowIndex, data) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(header => data[header] || '');
  sheet.getRange(rowIndex + 1, 1, 1, row.length).setValues([row]); // +1 because headers are row 1
}

/**
 * API ENDPOINTS
 */

/**
 * Get today's workout for the current user
 */
function getTodayWorkout(data = {}) {
  try {
    const user = getCurrentUser();
    const progressSheet = getSheet(CONFIG.SHEETS.USER_PROGRESS);
    const workoutsSheet = getSheet(CONFIG.SHEETS.WORKOUTS);
    
    // Get user progress
    const progressData = getSheetData(progressSheet);
    const userProgress = progressData.find(p => p.userId === user.userId);
    const currentDay = userProgress ? userProgress.currentDay : 1;
    
    // Get workout for current day
    const workouts = getSheetData(workoutsSheet);
    const todayWorkout = workouts.find(w => w.userId === user.userId && w.day == currentDay);
    
    if (todayWorkout) {
      return {
        success: true,
        data: {
          day: parseInt(todayWorkout.day),
          title: todayWorkout.title,
          exercises: JSON.parse(todayWorkout.exercises || '[]'),
          status: todayWorkout.status,
          notes: todayWorkout.notes
        }
      };
    } else {
      // Create default workout for the day
      const defaultWorkout = createDefaultWorkout(currentDay);
      return {
        success: true,
        data: defaultWorkout
      };
    }
    
  } catch (error) {
    console.error('Error getting today\'s workout:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Create a default workout for a given day
 */
function createDefaultWorkout(day) {
  const workoutTypes = ['Upper Body', 'Lower Body', 'Cardio', 'Full Body', 'Core'];
  const workoutType = workoutTypes[(day - 1) % workoutTypes.length];
  
  const exercisesByType = {
    'Upper Body': [
      { name: 'Push-ups', sets: 3, reps: '10-15', duration: null, completed: false, videoUrl: '' },
      { name: 'Planks', sets: 3, reps: null, duration: 30, completed: false, videoUrl: '' },
      { name: 'Mountain Climbers', sets: 3, reps: '20', duration: null, completed: false, videoUrl: '' }
    ],
    'Lower Body': [
      { name: 'Squats', sets: 3, reps: '15-20', duration: null, completed: false, videoUrl: '' },
      { name: 'Lunges', sets: 3, reps: '10 each leg', duration: null, completed: false, videoUrl: '' },
      { name: 'Wall Sit', sets: 3, reps: null, duration: 30, completed: false, videoUrl: '' }
    ],
    'Cardio': [
      { name: 'Jumping Jacks', sets: 3, reps: null, duration: 45, completed: false, videoUrl: '' },
      { name: 'High Knees', sets: 3, reps: null, duration: 30, completed: false, videoUrl: '' },
      { name: 'Burpees', sets: 3, reps: '5-10', duration: null, completed: false, videoUrl: '' }
    ],
    'Full Body': [
      { name: 'Burpees', sets: 3, reps: '5-8', duration: null, completed: false, videoUrl: '' },
      { name: 'Push-ups', sets: 2, reps: '8-12', duration: null, completed: false, videoUrl: '' },
      { name: 'Squats', sets: 3, reps: '12-15', duration: null, completed: false, videoUrl: '' },
      { name: 'Planks', sets: 2, reps: null, duration: 45, completed: false, videoUrl: '' }
    ],
    'Core': [
      { name: 'Planks', sets: 3, reps: null, duration: 45, completed: false, videoUrl: '' },
      { name: 'Bicycle Crunches', sets: 3, reps: '20 each side', duration: null, completed: false, videoUrl: '' },
      { name: 'Dead Bug', sets: 3, reps: '10 each side', duration: null, completed: false, videoUrl: '' }
    ]
  };
  
  return {
    day: day,
    title: `${workoutType} - Day ${day}`,
    exercises: exercisesByType[workoutType] || exercisesByType['Full Body']
  };
}

/**
 * Get workout history for the current user
 */
function getWorkoutHistory(data = {}) {
  try {
    const user = getCurrentUser();
    const workoutsSheet = getSheet(CONFIG.SHEETS.WORKOUTS);
    
    const workouts = getSheetData(workoutsSheet);
    const userWorkouts = workouts
      .filter(w => w.userId === user.userId && w.status === 'completed')
      .map(w => ({
        day: parseInt(w.day),
        date: w.completedAt,
        title: w.title,
        status: w.status,
        duration: parseInt(w.duration) || 0
      }))
      .sort((a, b) => b.day - a.day);
    
    return { success: true, data: userWorkouts };
    
  } catch (error) {
    console.error('Error getting workout history:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Complete an exercise
 */
function completeExercise(data) {
  try {
    const user = getCurrentUser();
    const { exerciseId, workoutDay, notes } = data;
    
    // Log exercise completion (you could store this in a separate sheet for detailed tracking)
    console.log(`User ${user.userId} completed exercise ${exerciseId} on day ${workoutDay}`);
    
    return { success: true, message: 'Exercise completed successfully' };
    
  } catch (error) {
    console.error('Error completing exercise:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Complete a workout
 */
function completeWorkout(data) {
  try {
    const user = getCurrentUser();
    const { workoutDay, stats } = data;
    
    const workoutsSheet = getSheet(CONFIG.SHEETS.WORKOUTS);
    const progressSheet = getSheet(CONFIG.SHEETS.USER_PROGRESS);
    
    // Update or create workout record
    const workouts = getSheetData(workoutsSheet);
    const existingWorkoutIndex = workouts.findIndex(w => w.userId === user.userId && w.day == workoutDay);
    
    const workoutData = {
      workoutId: Utilities.getUuid(),
      userId: user.userId,
      day: workoutDay,
      title: `Day ${workoutDay} Workout`,
      exercises: JSON.stringify([]),
      status: 'completed',
      completedAt: new Date().toISOString(),
      duration: stats.duration || 0,
      notes: stats.notes || ''
    };
    
    if (existingWorkoutIndex >= 0) {
      updateRowInSheet(workoutsSheet, existingWorkoutIndex + 1, workoutData);
    } else {
      addRowToSheet(workoutsSheet, workoutData);
    }
    
    // Update user progress
    const progressData = getSheetData(progressSheet);
    const userProgressIndex = progressData.findIndex(p => p.userId === user.userId);
    
    let progressRecord;
    if (userProgressIndex >= 0) {
      progressRecord = progressData[userProgressIndex];
      const completedDays = JSON.parse(progressRecord.completedDays || '[]');
      if (!completedDays.includes(workoutDay)) {
        completedDays.push(workoutDay);
        progressRecord.completedDays = JSON.stringify(completedDays.sort((a, b) => a - b));
        progressRecord.currentDay = Math.max(...completedDays) + 1;
        progressRecord.totalWorkouts = (parseInt(progressRecord.totalWorkouts) || 0) + 1;
        progressRecord.totalMinutes = (parseInt(progressRecord.totalMinutes) || 0) + (stats.duration || 0);
        progressRecord.lastUpdated = new Date().toISOString();
        
        updateRowInSheet(progressSheet, userProgressIndex + 1, progressRecord);
      }
    } else {
      progressRecord = {
        progressId: Utilities.getUuid(),
        userId: user.userId,
        currentDay: workoutDay + 1,
        completedDays: JSON.stringify([workoutDay]),
        streak: 1,
        totalWorkouts: 1,
        totalMinutes: stats.duration || 0,
        lastUpdated: new Date().toISOString()
      };
      
      addRowToSheet(progressSheet, progressRecord);
    }
    
    return { success: true, message: 'Workout completed successfully!' };
    
  } catch (error) {
    console.error('Error completing workout:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get all workout plans
 */
function getAllPlans(data = {}) {
  try {
    const plansSheet = getSheet(CONFIG.SHEETS.WORKOUT_PLANS);
    const plans = getSheetData(plansSheet);
    
    // If no plans exist, create default ones
    if (plans.length === 0) {
      createDefaultPlans();
      return getAllPlans(); // Recursive call to get the newly created plans
    }
    
    return { success: true, data: plans };
    
  } catch (error) {
    console.error('Error getting plans:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Create default workout plans
 */
function createDefaultPlans() {
  const plansSheet = getSheet(CONFIG.SHEETS.WORKOUT_PLANS);
  
  const defaultPlans = [
    {
      planId: Utilities.getUuid(),
      name: 'Beginner Full Body',
      description: '4-week beginner-friendly full body workout plan',
      difficulty: 'Beginner',
      duration: '4 weeks',
      exercises: JSON.stringify([]),
      createdAt: new Date().toISOString()
    },
    {
      planId: Utilities.getUuid(),
      name: 'Intermediate Strength',
      description: '6-week intermediate strength building program',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      exercises: JSON.stringify([]),
      createdAt: new Date().toISOString()
    },
    {
      planId: Utilities.getUuid(),
      name: 'Advanced HIIT',
      description: '8-week advanced high-intensity interval training',
      difficulty: 'Advanced',
      duration: '8 weeks',
      exercises: JSON.stringify([]),
      createdAt: new Date().toISOString()
    }
  ];
  
  defaultPlans.forEach(plan => addRowToSheet(plansSheet, plan));
}

/**
 * Get user goals
 */
function getGoals(data = {}) {
  try {
    const user = getCurrentUser();
    const goalsSheet = getSheet(CONFIG.SHEETS.GOALS);
    
    const goals = getSheetData(goalsSheet);
    const userGoals = goals.filter(g => g.userId === user.userId);
    
    const activeGoals = userGoals.filter(g => g.status !== 'completed');
    const completedGoals = userGoals.filter(g => g.status === 'completed');
    
    return {
      success: true,
      data: {
        active: activeGoals.map(g => ({
          ...g,
          progress: calculateGoalProgress(g)
        })),
        completed: completedGoals
      }
    };
    
  } catch (error) {
    console.error('Error getting goals:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Calculate goal progress
 */
function calculateGoalProgress(goal) {
  if (!goal.target || !goal.current) return 0;
  return Math.min(Math.round((goal.current / goal.target) * 100), 100);
}

/**
 * Add a new goal
 */
function addGoal(data) {
  try {
    const user = getCurrentUser();
    const goalsSheet = getSheet(CONFIG.SHEETS.GOALS);
    
    const goalData = {
      goalId: Utilities.getUuid(),
      userId: user.userId,
      title: data.title,
      target: data.target,
      current: 0,
      unit: data.unit,
      deadline: data.deadline,
      status: 'active',
      createdAt: new Date().toISOString(),
      completedAt: ''
    };
    
    addRowToSheet(goalsSheet, goalData);
    
    return { success: true, message: 'Goal added successfully!' };
    
  } catch (error) {
    console.error('Error adding goal:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Update a goal
 */
function updateGoal(data) {
  try {
    const user = getCurrentUser();
    const goalsSheet = getSheet(CONFIG.SHEETS.GOALS);
    const { goalId, updates } = data;
    
    const goals = getSheetData(goalsSheet);
    const goalIndex = goals.findIndex(g => g.goalId === goalId && g.userId === user.userId);
    
    if (goalIndex >= 0) {
      const goal = { ...goals[goalIndex], ...updates };
      goal.updatedAt = new Date().toISOString();
      
      updateRowInSheet(goalsSheet, goalIndex + 1, goal);
      return { success: true, message: 'Goal updated successfully!' };
    } else {
      return { success: false, error: 'Goal not found' };
    }
    
  } catch (error) {
    console.error('Error updating goal:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Delete a goal
 */
function deleteGoal(data) {
  try {
    const user = getCurrentUser();
    const goalsSheet = getSheet(CONFIG.SHEETS.GOALS);
    const { goalId } = data;
    
    const goals = getSheetData(goalsSheet);
    const goalIndex = goals.findIndex(g => g.goalId === goalId && g.userId === user.userId);
    
    if (goalIndex >= 0) {
      goalsSheet.deleteRow(goalIndex + 2); // +2 because of header row and 0-based index
      return { success: true, message: 'Goal deleted successfully!' };
    } else {
      return { success: false, error: 'Goal not found' };
    }
    
  } catch (error) {
    console.error('Error deleting goal:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get assessment data
 */
function getAssessmentData(data = {}) {
  try {
    const user = getCurrentUser();
    const assessmentSheet = getSheet(CONFIG.SHEETS.ASSESSMENTS);
    
    const assessments = getSheetData(assessmentSheet);
    const userAssessments = assessments.filter(a => a.userId === user.userId);
    
    // Group by type
    const assessmentData = {
      weight: userAssessments.filter(a => a.type === 'weight').sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt)),
      bodyFat: userAssessments.filter(a => a.type === 'bodyFat').sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt)),
      measurements: userAssessments.filter(a => a.type === 'measurements').sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt)),
      photos: userAssessments.filter(a => a.type === 'photo').sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt))
    };
    
    return { success: true, data: assessmentData };
    
  } catch (error) {
    console.error('Error getting assessment data:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Update weight
 */
function updateWeight(data) {
  try {
    const user = getCurrentUser();
    const assessmentSheet = getSheet(CONFIG.SHEETS.ASSESSMENTS);
    
    const weightData = {
      assessmentId: Utilities.getUuid(),
      userId: user.userId,
      type: 'weight',
      value: data.weight,
      unit: data.unit,
      notes: data.notes || '',
      recordedAt: new Date().toISOString()
    };
    
    addRowToSheet(assessmentSheet, weightData);
    
    return { success: true, message: 'Weight updated successfully!' };
    
  } catch (error) {
    console.error('Error updating weight:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Update measurements
 */
function updateMeasurements(data) {
  try {
    const user = getCurrentUser();
    const assessmentSheet = getSheet(CONFIG.SHEETS.ASSESSMENTS);
    
    const measurementData = {
      assessmentId: Utilities.getUuid(),
      userId: user.userId,
      type: 'measurements',
      value: JSON.stringify(data.measurements),
      unit: 'cm',
      notes: data.notes || '',
      recordedAt: new Date().toISOString()
    };
    
    addRowToSheet(assessmentSheet, measurementData);
    
    return { success: true, message: 'Measurements updated successfully!' };
    
  } catch (error) {
    console.error('Error updating measurements:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get weight history
 */
function getWeightHistory(data = {}) {
  try {
    const user = getCurrentUser();
    const assessmentSheet = getSheet(CONFIG.SHEETS.ASSESSMENTS);
    
    const assessments = getSheetData(assessmentSheet);
    const weightHistory = assessments
      .filter(a => a.userId === user.userId && a.type === 'weight')
      .sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt))
      .map(w => ({
        date: w.recordedAt,
        weight: parseFloat(w.value),
        unit: w.unit,
        notes: w.notes
      }));
    
    return { success: true, data: weightHistory };
    
  } catch (error) {
    console.error('Error getting weight history:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get notes
 */
function getNotes(data = {}) {
  try {
    const user = getCurrentUser();
    const notesSheet = getSheet(CONFIG.SHEETS.NOTES);
    
    const notes = getSheetData(notesSheet);
    const userNotes = notes
      .filter(n => n.userId === user.userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return { success: true, data: userNotes };
    
  } catch (error) {
    console.error('Error getting notes:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Add a note
 */
function addNote(data) {
  try {
    const user = getCurrentUser();
    const notesSheet = getSheet(CONFIG.SHEETS.NOTES);
    
    const noteData = {
      noteId: Utilities.getUuid(),
      userId: user.userId,
      title: data.title,
      content: data.content,
      category: data.category,
      attachments: JSON.stringify(data.attachments || []),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addRowToSheet(notesSheet, noteData);
    
    return { success: true, message: 'Note added successfully!' };
    
  } catch (error) {
    console.error('Error adding note:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Update a note
 */
function updateNote(data) {
  try {
    const user = getCurrentUser();
    const notesSheet = getSheet(CONFIG.SHEETS.NOTES);
    const { noteId, updates } = data;
    
    const notes = getSheetData(notesSheet);
    const noteIndex = notes.findIndex(n => n.noteId === noteId && n.userId === user.userId);
    
    if (noteIndex >= 0) {
      const note = { ...notes[noteIndex], ...updates };
      note.updatedAt = new Date().toISOString();
      
      updateRowInSheet(notesSheet, noteIndex + 1, note);
      return { success: true, message: 'Note updated successfully!' };
    } else {
      return { success: false, error: 'Note not found' };
    }
    
  } catch (error) {
    console.error('Error updating note:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Delete a note
 */
function deleteNote(data) {
  try {
    const user = getCurrentUser();
    const notesSheet = getSheet(CONFIG.SHEETS.NOTES);
    const { noteId } = data;
    
    const notes = getSheetData(notesSheet);
    const noteIndex = notes.findIndex(n => n.noteId === noteId && n.userId === user.userId);
    
    if (noteIndex >= 0) {
      notesSheet.deleteRow(noteIndex + 2); // +2 because of header row and 0-based index
      return { success: true, message: 'Note deleted successfully!' };
    } else {
      return { success: false, error: 'Note not found' };
    }
    
  } catch (error) {
    console.error('Error deleting note:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get user progress
 */
function getProgress(data = {}) {
  try {
    const user = getCurrentUser();
    const progressSheet = getSheet(CONFIG.SHEETS.USER_PROGRESS);
    
    const progressData = getSheetData(progressSheet);
    const userProgress = progressData.find(p => p.userId === user.userId);
    
    if (userProgress) {
      return {
        success: true,
        data: {
          currentDay: parseInt(userProgress.currentDay) || 1,
          completedDays: JSON.parse(userProgress.completedDays || '[]'),
          streak: parseInt(userProgress.streak) || 0,
          totalWorkouts: parseInt(userProgress.totalWorkouts) || 0,
          totalMinutes: parseInt(userProgress.totalMinutes) || 0,
          lastUpdated: userProgress.lastUpdated
        }
      };
    } else {
      // Create default progress
      const defaultProgress = {
        progressId: Utilities.getUuid(),
        userId: user.userId,
        currentDay: 1,
        completedDays: JSON.stringify([]),
        streak: 0,
        totalWorkouts: 0,
        totalMinutes: 0,
        lastUpdated: new Date().toISOString()
      };
      
      addRowToSheet(progressSheet, defaultProgress);
      
      return {
        success: true,
        data: {
          currentDay: 1,
          completedDays: [],
          streak: 0,
          totalWorkouts: 0,
          totalMinutes: 0,
          lastUpdated: defaultProgress.lastUpdated
        }
      };
    }
    
  } catch (error) {
    console.error('Error getting progress:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Update progress
 */
function updateProgress(data) {
  try {
    const user = getCurrentUser();
    const progressSheet = getSheet(CONFIG.SHEETS.USER_PROGRESS);
    const { progress } = data;
    
    const progressData = getSheetData(progressSheet);
    const userProgressIndex = progressData.findIndex(p => p.userId === user.userId);
    
    const progressRecord = {
      progressId: progress.progressId || Utilities.getUuid(),
      userId: user.userId,
      currentDay: progress.currentDay,
      completedDays: JSON.stringify(progress.completedDays),
      streak: progress.streak,
      totalWorkouts: progress.totalWorkouts,
      totalMinutes: progress.totalMinutes,
      lastUpdated: new Date().toISOString()
    };
    
    if (userProgressIndex >= 0) {
      updateRowInSheet(progressSheet, userProgressIndex + 1, progressRecord);
    } else {
      addRowToSheet(progressSheet, progressRecord);
    }
    
    return { success: true, message: 'Progress updated successfully!' };
    
  } catch (error) {
    console.error('Error updating progress:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get user statistics
 */
function getStats(data = {}) {
  try {
    const user = getCurrentUser();
    const progressData = getProgress();
    const goalsData = getGoals();
    
    if (progressData.success && goalsData.success) {
      const stats = {
        totalWorkouts: progressData.data.totalWorkouts,
        totalMinutes: progressData.data.totalMinutes,
        currentStreak: progressData.data.streak,
        completedDays: progressData.data.completedDays.length,
        activeGoals: goalsData.data.active.length,
        completedGoals: goalsData.data.completed.length
      };
      
      return { success: true, data: stats };
    } else {
      return { success: false, error: 'Failed to get statistics' };
    }
    
  } catch (error) {
    console.error('Error getting stats:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get user profile
 */
function getUserProfile(data = {}) {
  try {
    const user = getCurrentUser();
    return { success: true, data: user };
    
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Update user preferences
 */
function updateUserPreferences(data) {
  try {
    const user = getCurrentUser();
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const { preferences } = data;
    
    const users = getSheetData(usersSheet);
    const userIndex = users.findIndex(u => u.userId === user.userId);
    
    if (userIndex >= 0) {
      const updatedUser = { ...users[userIndex] };
      updatedUser.preferences = JSON.stringify(preferences);
      
      updateRowInSheet(usersSheet, userIndex + 1, updatedUser);
      return { success: true, message: 'Preferences updated successfully!' };
    } else {
      return { success: false, error: 'User not found' };
    }
    
  } catch (error) {
    console.error('Error updating preferences:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Initialize the app on first run
 */
function onInstall() {
  initializeSpreadsheet();
} 