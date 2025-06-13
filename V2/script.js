// FitMove Dashboard V2 - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize the dashboard
    initializeDashboard();
    initializeNavigation();
    initializeMobileFeatures();
    initializeSidebarCollapse();
    updateDateTime();
    
    // Update date/time every minute
    setInterval(updateDateTime, 60000);
});

// Dashboard Initialization
function initializeDashboard() {
    console.log('FitMove Dashboard V2 Initialized');
    
    // Set initial active tab
    const defaultTab = 'today';
    switchTab(defaultTab);
    
    // Add any initialization logic here
    loadUserPreferences();
}

// Navigation System
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
            
            // Close mobile sidebar if open
            if (window.innerWidth < 1024) {
                closeMobileSidebar();
            }
        });
    });
}

// Tab Switching Function
function switchTab(tabName) {
    // Remove active class from all nav items and set inactive state
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    navItems.forEach(item => {
        // Remove active styles
        item.classList.remove('bg-brand-lime', 'text-brand-text-primary', 'rounded-full');
        // Add inactive styles
        item.classList.add('text-brand-text-secondary', 'hover:bg-gray-100', 'rounded-lg');
    });
    
    // Add active class to current nav item
    const activeNavItem = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeNavItem) {
        // Remove inactive styles
        activeNavItem.classList.remove('text-brand-text-secondary', 'hover:bg-gray-100', 'rounded-lg');
        // Add active styles
        activeNavItem.classList.add('bg-brand-lime', 'text-brand-text-primary', 'rounded-full');
    }
    
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('fade-in');
    });
    
    // Show the selected tab content
    const targetContent = document.getElementById(`${tabName}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        targetContent.classList.add('fade-in');
        
        // Update page header based on tab
        updatePageHeader(tabName);
        
        // Load content for the tab if needed
        loadTabContent(tabName);
    }
}

// Sidebar Collapse Functionality
function initializeSidebarCollapse() {
    console.log('Initializing sidebar collapse...');
    
    const collapseBtn = document.getElementById('left-sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    console.log('Collapse button:', collapseBtn);
    console.log('Sidebar:', sidebar);
    
    if (collapseBtn && sidebar) {
        console.log('Adding click event listener to collapse button');
        collapseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Collapse button clicked!');
            toggleSidebarCollapse();
        });
    } else {
        console.error('Collapse button or sidebar not found!');
    }
}

function toggleSidebarCollapse() {
    console.log('Toggle sidebar collapse called');
    
    const sidebar = document.getElementById('sidebar');
    const collapseIcon = document.querySelector('#left-sidebar-toggle svg');
    
    console.log('Sidebar element:', sidebar);
    console.log('Collapse icon:', collapseIcon);
    
    if (sidebar && collapseIcon) {
        // Toggle collapsed class
        sidebar.classList.toggle('collapsed');
        
        const isCollapsed = sidebar.classList.contains('collapsed');
        console.log('Sidebar is now:', isCollapsed ? 'collapsed' : 'expanded');
        
        // Update icon based on state
        if (isCollapsed) {
            // Sidebar is now collapsed, show right arrow to expand
            collapseIcon.setAttribute('data-lucide', 'chevrons-right');
            console.log('Changed icon to chevrons-right');
        } else {
            // Sidebar is now expanded, show left arrow to collapse
            collapseIcon.setAttribute('data-lucide', 'chevrons-left');
            console.log('Changed icon to chevrons-left');
        }
        
        // Reinitialize Lucide icons to update the icon
        lucide.createIcons();
        console.log('Lucide icons recreated');
    } else {
        console.error('Sidebar or collapse icon not found!');
        console.log('Available icons in button:', document.querySelectorAll('#left-sidebar-toggle *'));
    }
}

// Update Page Header Based on Active Tab
function updatePageHeader(tabName) {
    const titleEl = document.getElementById('page-title');
    const subtitleEl = document.getElementById('page-subtitle');
    
    if (!titleEl || !subtitleEl) return;
    
    const headerConfig = {
        today: {
            title: "Today's Workout 💪",
            subtitle: "Let's crush today's fitness goals!"
        },
        calendar: {
            title: "Workout Calendar 📅", 
            subtitle: "Track your progress and stay on schedule"
        },
        planner: {
            title: "Workout Planner ✏️",
            subtitle: "Design and customize your fitness routine"
        },
        goals: {
            title: "Goals & Assessment 🎯",
            subtitle: "Monitor progress and set new targets"
        }
    };
    
    const config = headerConfig[tabName] || headerConfig.today;
    titleEl.textContent = config.title;
    subtitleEl.textContent = config.subtitle;
}

// Load Tab Content (placeholder for future content loading)
function loadTabContent(tabName) {
    console.log(`Loading content for tab: ${tabName}`);
    
    switch(tabName) {
        case 'today':
            loadTodayContent();
            break;
        case 'calendar':
            loadCalendarContent();
            break;
        case 'planner':
            loadPlannerContent();
            break;
        case 'goals':
            loadGoalsContent();
            break;
    }
}

// Today's Content Loader
function loadTodayContent() {
    console.log('Loading today\'s content...');
    
    // Sample workout data for today's plan
    const todayWorkoutData = [
        {
            workoutType: "Upper Body Strength",
            exercises: [
                {
                    name: "Push-ups",
                    video: "https://www.youtube.com/embed/IODxDxX7oi4",
                    targetSets: 3,
                    targetReps: 12,
                    weight: "Bodyweight"
                },
                {
                    name: "Bench Press",
                    video: "https://www.youtube.com/embed/rT7DgCr-3pg",
                    targetSets: 4,
                    targetReps: 8,
                    weight: "135 lbs"
                },
                {
                    name: "Pull-ups",
                    video: "https://www.youtube.com/embed/eGo4IYlbE5g",
                    targetSets: 3,
                    targetReps: 8,
                    weight: "Bodyweight"
                }
            ]
        },
        {
            workoutType: "Core & Cardio",
            exercises: [
                {
                    name: "Plank",
                    video: "https://www.youtube.com/embed/pSHjTRCQxIw",
                    targetSets: 3,
                    targetReps: "45 sec",
                    weight: "Bodyweight"
                },
                {
                    name: "Mountain Climbers",
                    video: "https://www.youtube.com/embed/kLh-uczlPLg",
                    targetSets: 3,
                    targetReps: 20,
                    weight: "Bodyweight"
                }
            ]
        }
    ];

    renderTodayWorkout(todayWorkoutData);
}

function renderTodayWorkout(workoutData) {
    const container = document.getElementById('today-workout-cards');
    if (!container) return;
    
    container.innerHTML = '';

    workoutData.forEach((workout, workoutIndex) => {
        const workoutCard = createWorkoutCard(workout, workoutIndex);
        container.appendChild(workoutCard);
    });

    lucide.createIcons();
}

function createWorkoutCard(workout, workoutIndex) {
    const card = document.createElement('div');
    card.className = 'bg-brand-surface rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6';
    
    card.innerHTML = `
        <!-- Workout Header -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
                <div class="w-10 h-10 bg-brand-lime rounded-lg flex items-center justify-center mr-3">
                    <i data-lucide="dumbbell" class="w-5 h-5 text-brand-text-primary"></i>
                </div>
                <div>
                    <h3 class="text-lg md:text-xl font-semibold text-brand-text-primary">${workout.workoutType}</h3>
                    <p class="text-sm text-brand-text-secondary" id="workout-progress-${workoutIndex}">0/${workout.exercises.length} exercises</p>
                </div>
            </div>
            <div class="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center" id="workout-circle-${workoutIndex}">
                <span class="text-sm font-bold text-brand-text-secondary" id="workout-percentage-${workoutIndex}">0%</span>
            </div>
        </div>

        <!-- Exercise List -->
        <div class="space-y-4" id="exercises-${workoutIndex}">
            ${workout.exercises.map((exercise, exerciseIndex) => createExerciseRow(exercise, workoutIndex, exerciseIndex)).join('')}
        </div>


    `;

    return card;
}

function createExerciseRow(exercise, workoutIndex, exerciseIndex) {
    const exerciseId = `exercise-${workoutIndex}-${exerciseIndex}`;
    
    return `
        <div class="bg-gray-50 rounded-lg p-3 exercise-row" id="${exerciseId}">
            <div class="flex items-center gap-3">
                <!-- Small Video Thumbnail -->
                <div class="flex-shrink-0">
                    <div class="relative group cursor-pointer" onclick="openExerciseVideo('${exercise.video}', '${exercise.name}')">
                        <div class="w-14 h-10 bg-gray-200 rounded-md overflow-hidden">
                            <img 
                                src="https://img.youtube.com/vi/${getYouTubeVideoId(exercise.video)}/maxresdefault.jpg" 
                                alt="${exercise.name}"
                                class="w-full h-full object-cover"
                                onerror="this.src='https://img.youtube.com/vi/${getYouTubeVideoId(exercise.video)}/hqdefault.jpg'"
                            >
                        </div>
                        <div class="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <i data-lucide="play" class="w-3 h-3 text-white"></i>
                        </div>
                    </div>
                </div>

                <!-- Mobile Layout: Stacked -->
                <div class="flex-1 min-w-0 lg:hidden">
                    <!-- Exercise Name & Target -->
                    <div class="mb-3">
                        <h4 class="font-semibold text-brand-text-primary text-sm">${exercise.name}</h4>
                        <p class="text-xs text-brand-text-secondary">Target: ${exercise.targetSets} × ${exercise.targetReps} • ${exercise.weight}</p>
                    </div>

                    <!-- Input Fields -->
                    <div class="grid grid-cols-3 gap-2 mb-3">
                        <div>
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1">Weight</label>
                            <input 
                                type="text" 
                                id="weight-${exerciseId}"
                                placeholder="${exercise.weight}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent"
                            >
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1">Sets</label>
                            <input 
                                type="number" 
                                id="sets-${exerciseId}"
                                placeholder="${exercise.targetSets}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent"
                            >
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1">Reps</label>
                            <input 
                                type="text" 
                                id="reps-${exerciseId}"
                                placeholder="${exercise.targetReps}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent"
                            >
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex items-center gap-2">
                        <button 
                            onclick="openExerciseNotes('${exerciseId}')"
                            class="flex items-center gap-1 px-3 py-1.5 text-xs text-brand-text-secondary hover:text-brand-text-primary hover:bg-gray-100 rounded-md transition-colors"
                            title="Add Notes"
                        >
                            <i data-lucide="sticky-note" class="w-3 h-3"></i>
                            <span>Notes</span>
                        </button>
                        <button 
                            onclick="completeExercise('${exerciseId}', ${workoutIndex})"
                            id="complete-btn-${exerciseId}"
                            class="flex items-center gap-1 px-3 py-1.5 bg-brand-lime text-brand-text-primary rounded-md font-medium hover:bg-opacity-90 transition-colors text-xs"
                        >
                            <i data-lucide="check" class="w-3 h-3"></i>
                            <span>Complete</span>
                        </button>
                    </div>
                </div>

                <!-- Desktop Layout: Single Row -->
                <div class="hidden lg:flex lg:items-center lg:flex-1 lg:min-w-0 lg:gap-4">
                    <!-- Exercise Name & Target Info -->
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-brand-text-primary text-sm truncate">${exercise.name}</h4>
                        <p class="text-xs text-brand-text-secondary truncate">Target: ${exercise.targetSets} × ${exercise.targetReps} • ${exercise.weight}</p>
                    </div>

                    <!-- Input Fields (Inline) -->
                    <div class="flex items-center gap-3">
                        <div class="w-20">
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1 text-center">Weight</label>
                            <input 
                                type="text" 
                                id="weight-${exerciseId}-desktop"
                                placeholder="${exercise.weight}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                            >
                        </div>
                        <div class="w-16">
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1 text-center">Sets</label>
                            <input 
                                type="number" 
                                id="sets-${exerciseId}-desktop"
                                placeholder="${exercise.targetSets}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                            >
                        </div>
                        <div class="w-16">
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1 text-center">Reps</label>
                            <input 
                                type="text" 
                                id="reps-${exerciseId}-desktop"
                                placeholder="${exercise.targetReps}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                            >
                        </div>
                    </div>

                    <!-- Action Buttons (Icons Only) -->
                    <div class="flex items-center gap-2">
                        <button 
                            onclick="openExerciseNotes('${exerciseId}')"
                            class="p-2 text-brand-text-secondary hover:text-brand-text-primary hover:bg-gray-100 rounded-md transition-colors"
                            title="Add Notes"
                        >
                            <i data-lucide="sticky-note" class="w-4 h-4"></i>
                        </button>
                        <button 
                            onclick="completeExercise('${exerciseId}', ${workoutIndex})"
                            id="complete-btn-${exerciseId}-desktop"
                            class="p-2 bg-brand-lime text-brand-text-primary rounded-md hover:bg-opacity-90 transition-colors"
                            title="Complete Exercise"
                        >
                            <i data-lucide="check" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Exercise Notes (Hidden by default) -->
            <div id="notes-${exerciseId}" class="hidden mt-3 pt-3 border-t border-gray-200">
                <label class="block text-sm font-medium text-brand-text-secondary mb-2">Exercise Notes</label>
                <textarea 
                    id="notes-textarea-${exerciseId}"
                    placeholder="Add notes about this exercise..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-lime focus:border-transparent text-sm resize-none h-16"
                ></textarea>
                <div class="flex gap-2 mt-2">
                    <button 
                        onclick="saveExerciseNotes('${exerciseId}')"
                        class="px-3 py-1.5 bg-brand-lime text-brand-text-primary rounded-md text-sm hover:bg-opacity-90 transition-colors"
                    >
                        Save Notes
                    </button>
                    <button 
                        onclick="closeExerciseNotes('${exerciseId}')"
                        class="px-3 py-1.5 text-sm text-brand-text-secondary hover:text-brand-text-primary hover:bg-gray-100 rounded-md transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getYouTubeVideoId(url) {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
}

function openExerciseVideo(videoUrl, exerciseName) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75';
    modal.innerHTML = `
        <div class="bg-brand-surface rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div class="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-brand-text-primary">${exerciseName}</h3>
                <button onclick="this.closest('.fixed').remove()" class="p-2 hover:bg-gray-100 rounded-lg">
                    <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                </button>
            </div>
            <div class="p-4">
                <div class="aspect-video">
                    <iframe 
                        src="${videoUrl}?autoplay=1&rel=0&modestbranding=1" 
                        title="${exerciseName}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        class="w-full h-full rounded-lg">
                    </iframe>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    lucide.createIcons();
}

function openExerciseNotes(exerciseId) {
    const notesDiv = document.getElementById(`notes-${exerciseId}`);
    if (notesDiv) {
        notesDiv.classList.remove('hidden');
    }
}

function closeExerciseNotes(exerciseId) {
    const notesDiv = document.getElementById(`notes-${exerciseId}`);
    if (notesDiv) {
        notesDiv.classList.add('hidden');
    }
}

function saveExerciseNotes(exerciseId) {
    const textarea = document.getElementById(`notes-textarea-${exerciseId}`);
    const notesDiv = document.getElementById(`notes-${exerciseId}`);
    
    if (textarea) {
        const notes = textarea.value.trim();
        
        if (notes) {
            // Store the notes (you can expand this to save to localStorage or server)
            console.log(`Saving notes for ${exerciseId}:`, notes);
            
            // Visual feedback - show success message
            const originalLabel = notesDiv.querySelector('label');
            const originalText = originalLabel.textContent;
            originalLabel.textContent = 'Exercise Notes (Saved ✓)';
            originalLabel.className = 'block text-sm font-medium text-green-600 mb-2';
            
            // Store in exercise data attribute for persistence
            const exerciseRow = document.getElementById(exerciseId);
            if (exerciseRow) {
                exerciseRow.setAttribute('data-notes', notes);
            }
            
            // Reset label after 2 seconds
            setTimeout(() => {
                originalLabel.textContent = originalText;
                originalLabel.className = 'block text-sm font-medium text-brand-text-secondary mb-2';
            }, 2000);
            
        } else {
            // Show message if no notes entered
            const originalLabel = notesDiv.querySelector('label');
            const originalText = originalLabel.textContent;
            originalLabel.textContent = 'Please enter some notes first';
            originalLabel.className = 'block text-sm font-medium text-red-600 mb-2';
            
            setTimeout(() => {
                originalLabel.textContent = originalText;
                originalLabel.className = 'block text-sm font-medium text-brand-text-secondary mb-2';
            }, 2000);
        }
    }
}

function completeExercise(exerciseId, workoutIndex) {
    const exerciseRow = document.getElementById(exerciseId);
    const completeBtnMobile = document.getElementById(`complete-btn-${exerciseId}`);
    const completeBtnDesktop = document.getElementById(`complete-btn-${exerciseId}-desktop`);
    
    if (exerciseRow) {
        // Mark as completed
        exerciseRow.classList.add('opacity-75');
        exerciseRow.setAttribute('data-completed', 'true');
        
        // Update mobile button
        if (completeBtnMobile) {
            completeBtnMobile.innerHTML = '<i data-lucide="check-circle" class="w-3 h-3"></i><span>Completed</span>';
            completeBtnMobile.className = 'flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-md font-medium cursor-default text-xs';
            completeBtnMobile.disabled = true;
        }
        
        // Update desktop button
        if (completeBtnDesktop) {
            completeBtnDesktop.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i>';
            completeBtnDesktop.className = 'p-2 bg-green-100 text-green-700 rounded-md cursor-default';
            completeBtnDesktop.disabled = true;
            completeBtnDesktop.title = 'Exercise Completed';
        }
        
        // Update workout progress
        updateWorkoutProgress(workoutIndex);
        
        lucide.createIcons();
    }
}

function updateWorkoutProgress(workoutIndex) {
    const exercisesContainer = document.getElementById(`exercises-${workoutIndex}`);
    const totalExercises = exercisesContainer.querySelectorAll('.exercise-row').length;
    const completedExercises = exercisesContainer.querySelectorAll('.exercise-row[data-completed="true"]').length;
    
    const percentage = Math.round((completedExercises / totalExercises) * 100);
    
    // Update progress text
    document.getElementById(`workout-progress-${workoutIndex}`).textContent = `${completedExercises}/${totalExercises} exercises`;
    document.getElementById(`workout-percentage-${workoutIndex}`).textContent = `${percentage}%`;
    
    // Update progress circle
    const circle = document.getElementById(`workout-circle-${workoutIndex}`);
    if (percentage === 100) {
        circle.className = 'w-12 h-12 rounded-full border-4 border-green-500 bg-green-50 flex items-center justify-center';
        circle.querySelector('span').className = 'text-sm font-bold text-green-600';
    } else {
        const hue = (percentage / 100) * 120; // 0 = red, 120 = green
        circle.style.borderColor = `hsl(${hue}, 60%, 50%)`;
    }
}

function completeWorkout(workoutIndex) {
    const workoutCard = document.getElementById(`complete-workout-${workoutIndex}`).closest('.bg-brand-surface');
    const notesTextarea = document.getElementById(`workout-notes-${workoutIndex}`);
    
    // Get workout data
    const notes = notesTextarea.value;
    
    // Mark entire workout as completed
    workoutCard.classList.add('ring-2', 'ring-green-200', 'bg-green-50');
    
    // Update button
    const completeBtn = document.getElementById(`complete-workout-${workoutIndex}`);
    completeBtn.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4 mr-2 inline"></i>Workout Completed!';
    completeBtn.className = 'w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium cursor-default';
    completeBtn.disabled = true;
    
    console.log(`Workout ${workoutIndex} completed with notes: ${notes}`);
    
    lucide.createIcons();
}

// Calendar Content Loader
function loadCalendarContent() {
    console.log('Loading calendar content...');
    
    // Sample workout data - Replace with actual data source
    const workoutData = [
        {
            day: 1,
            date: new Date('2024-01-01'),
            status: 'completed',
            workoutPlan: ['Push-ups: 3 sets x 10 reps', 'Squats: 3 sets x 15 reps', 'Plank: 3 sets x 30 seconds'],
            notes: 'Great workout! Felt strong today.',
            stats: { duration: '25 minutes', calories: '150 cal', heartRate: '140 bpm avg' }
        },
        {
            day: 2,
            date: new Date('2024-01-02'),
            status: 'completed',
            workoutPlan: ['Lunges: 3 sets x 10 each leg', 'Mountain climbers: 3 sets x 20 reps', 'Burpees: 2 sets x 8 reps'],
            notes: 'Challenging but completed all sets.',
            stats: { duration: '30 minutes', calories: '180 cal', heartRate: '145 bpm avg' }
        },
        {
            day: 3,
            date: new Date('2024-01-03'),
            status: 'missed',
            workoutPlan: ['Yoga flow: 20 minutes', 'Stretching routine: 10 minutes'],
            notes: 'Missed due to work meeting.',
            stats: null
        },
        {
            day: 4,
            date: new Date('2024-01-04'),
            status: 'rest',
            workoutPlan: ['Rest day - light stretching'],
            notes: 'Recovery day.',
            stats: null
        },
        {
            day: 5,
            date: new Date('2024-01-05'),
            status: 'upcoming',
            workoutPlan: ['Upper body strength: 4 exercises', 'Core workout: 15 minutes'],
            notes: null,
            stats: null
        },
        {
            day: 6,
            date: new Date('2024-01-06'),
            status: 'upcoming',
            workoutPlan: ['Full body HIIT: 20 minutes', 'Cool down: 5 minutes'],
            notes: null,
            stats: null
        },
        {
            day: 7,
            date: new Date('2024-01-07'),
            status: 'upcoming',
            workoutPlan: ['Swimming: 30 minutes', 'Stretching: 10 minutes'],
            notes: null,
            stats: null
        },
        {
            day: 8,
            date: new Date('2024-01-08'),
            status: 'upcoming',
            workoutPlan: ['Strength training: 45 minutes', 'Cardio: 15 minutes'],
            notes: null,
            stats: null
        }
    ];

    renderCalendar(workoutData);
    updateCalendarStats(workoutData);
    initializeCalendarFilters(workoutData);
    initializeWorkoutModal(workoutData);
}

function renderCalendar(workoutData) {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    workoutData.forEach(day => {
        const dayCard = createDayCard(day);
        grid.appendChild(dayCard);
    });

    lucide.createIcons();
}

function createDayCard(dayData) {
    const card = document.createElement('div');
    card.className = `day-card bg-brand-surface rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer transition-all hover:shadow-lg ${getStatusClass(dayData.status)}`;
    card.setAttribute('data-status', dayData.status);
    card.setAttribute('data-day', dayData.day);

    const statusConfig = getStatusConfig(dayData.status);
    
    card.innerHTML = `
        <div class="flex items-center space-x-2 mb-3">
            <div class="w-8 h-8 ${statusConfig.bgColor} rounded-lg flex items-center justify-center">
                <i data-lucide="${statusConfig.icon}" class="w-4 h-4 ${statusConfig.iconColor}"></i>
            </div>
            <div>
                <h3 class="font-semibold text-brand-text-primary">Day ${dayData.day}</h3>
            </div>
        </div>
        <p class="text-xs text-brand-text-secondary mb-2">${formatCalendarDate(dayData.date)}</p>
        <div class="text-xs text-brand-text-secondary">
            <p class="mt-1 line-clamp-2">${dayData.workoutPlan[0] || 'No workout planned'}</p>
        </div>
    `;

    card.addEventListener('click', () => openWorkoutModal(dayData));
    return card;
}

function getStatusConfig(status) {
    const configs = {
        completed: {
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
            icon: 'check',
            statusBg: 'bg-green-500',
            statusIcon: 'check',
            statusIconColor: 'text-white',
            label: 'Completed',
            textColor: 'text-green-600'
        },
        missed: {
            bgColor: 'bg-red-100',
            iconColor: 'text-red-600',
            icon: 'x',
            statusBg: 'bg-red-500',
            statusIcon: 'x',
            statusIconColor: 'text-white',
            label: 'Missed',
            textColor: 'text-red-600'
        },
        upcoming: {
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            icon: 'clock',
            statusBg: 'bg-yellow-500',
            statusIcon: 'clock',
            statusIconColor: 'text-white',
            label: 'Upcoming',
            textColor: 'text-yellow-600'
        },
        rest: {
            bgColor: 'bg-gray-100',
            iconColor: 'text-gray-600',
            icon: 'coffee',
            statusBg: 'bg-gray-500',
            statusIcon: 'coffee',
            statusIconColor: 'text-white',
            label: 'Rest Day',
            textColor: 'text-gray-600'
        }
    };
    return configs[status] || configs.upcoming;
}

function getStatusClass(status) {
    const classes = {
        completed: 'border-green-200 hover:border-green-300',
        missed: 'border-red-200 hover:border-red-300',
        upcoming: 'border-yellow-200 hover:border-yellow-300',
        rest: 'border-gray-200 hover:border-gray-300'
    };
    return classes[status] || classes.upcoming;
}

function formatCalendarDate(date) {
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function updateCalendarStats(workoutData) {
    const completed = workoutData.filter(d => d.status === 'completed').length;
    const missed = workoutData.filter(d => d.status === 'missed').length;
    const upcoming = workoutData.filter(d => d.status === 'upcoming').length;
    const rest = workoutData.filter(d => d.status === 'rest').length;

    const completedEl = document.getElementById('completed-count');
    const missedEl = document.getElementById('missed-count');  
    const upcomingEl = document.getElementById('upcoming-count');
    const restEl = document.getElementById('rest-count');

    if (completedEl) completedEl.textContent = completed;
    if (missedEl) missedEl.textContent = missed;
    if (upcomingEl) upcomingEl.textContent = upcoming;
    if (restEl) restEl.textContent = rest;
}

function initializeCalendarFilters(workoutData) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-brand-lime', 'text-brand-text-primary');
                b.classList.add('text-brand-text-secondary');
            });
            this.classList.add('active', 'bg-brand-lime', 'text-brand-text-primary');
            this.classList.remove('text-brand-text-secondary');

            // Filter cards
            const filter = this.getAttribute('data-filter');
            filterCalendarCards(filter);
        });
    });
}

function filterCalendarCards(filter) {
    const cards = document.querySelectorAll('.day-card');
    
    cards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        
        if (filter === 'all' || cardStatus === filter) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
}

function initializeWorkoutModal(workoutData) {
    const modal = document.getElementById('workout-modal');
    const closeBtn = document.getElementById('close-modal');
    const markCompleted = document.getElementById('mark-completed');
    const markMissed = document.getElementById('mark-missed');

    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', closeWorkoutModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeWorkoutModal();
    });

    if (markCompleted) markCompleted.addEventListener('click', () => updateWorkoutStatus('completed', workoutData));
    if (markMissed) markMissed.addEventListener('click', () => updateWorkoutStatus('missed', workoutData));
}

function openWorkoutModal(dayData) {
    const modal = document.getElementById('workout-modal');
    if (!modal) return;
    
    // Populate modal content
    document.getElementById('modal-day-title').textContent = `Day ${dayData.day}`;
    document.getElementById('modal-date').textContent = formatCalendarDate(dayData.date);
    
    // Status badge
    const statusConfig = getStatusConfig(dayData.status);
    const statusBadge = document.getElementById('modal-status-badge');
    statusBadge.className = `flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${statusConfig.statusBg}`;
    document.getElementById('modal-status-icon').setAttribute('data-lucide', statusConfig.statusIcon);
    document.getElementById('modal-status-text').textContent = statusConfig.label;
    
    // Workout plan
    const workoutPlanDiv = document.getElementById('modal-workout-plan');
    workoutPlanDiv.innerHTML = dayData.workoutPlan.map(exercise => 
        `<div class="flex items-center mb-2">
            <i data-lucide="activity" class="w-4 h-4 text-brand-accent mr-2"></i>
            <span class="text-sm">${exercise}</span>
        </div>`
    ).join('');
    
    // Notes
    if (dayData.notes) {
        document.getElementById('modal-notes-section').classList.remove('hidden');
        document.getElementById('modal-notes').textContent = dayData.notes;
    } else {
        document.getElementById('modal-notes-section').classList.add('hidden');
    }
    
    // Stats
    if (dayData.stats) {
        document.getElementById('modal-stats-section').classList.remove('hidden');
        const statsDiv = document.getElementById('modal-stats');
        statsDiv.innerHTML = `
            <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                    <div class="text-lg font-semibold text-brand-text-primary">${dayData.stats.duration}</div>
                    <div class="text-xs text-brand-text-secondary">Duration</div>
                </div>
                <div>
                    <div class="text-lg font-semibold text-brand-text-primary">${dayData.stats.calories}</div>
                    <div class="text-xs text-brand-text-secondary">Calories</div>
                </div>
                <div>
                    <div class="text-lg font-semibold text-brand-text-primary">${dayData.stats.heartRate}</div>
                    <div class="text-xs text-brand-text-secondary">Heart Rate</div>
                </div>
            </div>
        `;
    } else {
        document.getElementById('modal-stats-section').classList.add('hidden');
    }
    
    // Store current day for status updates
    modal.setAttribute('data-current-day', dayData.day);
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Reinitialize icons
    lucide.createIcons();
}

function closeWorkoutModal() {
    const modal = document.getElementById('workout-modal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function updateWorkoutStatus(newStatus, workoutData) {
    const modal = document.getElementById('workout-modal');
    if (!modal) return;
    
    const dayNumber = parseInt(modal.getAttribute('data-current-day'));
    
    // Find and update the workout data
    const dayData = workoutData.find(d => d.day === dayNumber);
    if (dayData) {
        dayData.status = newStatus;
        
        // Update the UI
        renderCalendar(workoutData);
        updateCalendarStats(workoutData);
        closeWorkoutModal();
        
        console.log(`Day ${dayNumber} marked as ${newStatus}`);
    }
}

// Planner Content Loader
function loadPlannerContent() {
    console.log('Loading planner content...');
    // Placeholder for complete planner features
    // This will include workout builders and templates
}

// Goals Content Loader
function loadGoalsContent() {
    console.log('Loading goals content...');
    // Placeholder for goals and assessment features
    // This will include progress tracking and goal setting
}

// Mobile Features
function initializeMobileFeatures() {
    const sidebarToggle = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    // Sidebar toggle for mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            toggleMobileSidebar();
        });
    }
    
    // Close sidebar when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            closeMobileSidebar();
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            closeMobileSidebar();
            // Reset collapse state on larger screens
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('collapsed')) {
                // Keep collapse state on desktop
            }
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileSidebar();
        }
    });
}

// Toggle Mobile Sidebar
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (sidebar && mobileOverlay) {
        sidebar.classList.toggle('open');
        mobileOverlay.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close Mobile Sidebar
function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (sidebar && mobileOverlay) {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Update Date and Time
function updateDateTime() {
    const currentDateElement = document.getElementById('current-full-date');
    
    if (currentDateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        };
        const dateString = now.toLocaleDateString('en-US', options);
        currentDateElement.textContent = dateString;
    }
}

// User Preferences (placeholder)
function loadUserPreferences() {
    // Load user preferences from localStorage or API
    const preferences = localStorage.getItem('fitmove-preferences');
    
    if (preferences) {
        try {
            const parsedPreferences = JSON.parse(preferences);
            console.log('Loaded user preferences:', parsedPreferences);
            // Apply preferences to the UI
        } catch (e) {
            console.error('Error parsing user preferences:', e);
        }
    }
}

// Save User Preferences
function saveUserPreferences(preferences) {
    try {
        localStorage.setItem('fitmove-preferences', JSON.stringify(preferences));
        console.log('User preferences saved');
    } catch (e) {
        console.error('Error saving user preferences:', e);
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Placeholder for notification system
    console.log(`${type.toUpperCase()}: ${message}`);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);
}

// API Functions (placeholder for future API integration)
async function fetchWorkoutData() {
    // Placeholder for API calls
    console.log('Fetching workout data...');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                today: { workouts: [], completed: 0, total: 0 },
                week: { completed: 0, total: 0 },
                goals: []
            });
        }, 1000);
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Expose functions for debugging
window.FitMove = {
    switchTab,
    toggleMobileSidebar,
    toggleSidebarCollapse,
    loadTabContent,
    showNotification
}; 