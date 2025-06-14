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
    
    // Initialize on page load
    const activeTab = document.querySelector('.active-tab') || document.querySelector('.tab');
    if (activeTab) {
        // Simulate a click on the active tab to load its content
        activeTab.click();
    }
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
        
        console.log(`Switched to tab: ${tabName}`);
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
        },
        {
            workoutType: "Lower Body Power",
            exercises: [
                {
                    name: "Squats",
                    video: "https://www.youtube.com/embed/ultWZbUMPL8",
                    targetSets: 4,
                    targetReps: 12,
                    weight: "185 lbs"
                },
                {
                    name: "Deadlifts",
                    video: "https://www.youtube.com/embed/ytGaGIn3SjE",
                    targetSets: 3,
                    targetReps: 6,
                    weight: "225 lbs"
                },
                {
                    name: "Lunges",
                    video: "https://www.youtube.com/embed/QE5MltF7Fy0",
                    targetSets: 3,
                    targetReps: 10,
                    weight: "Bodyweight"
                },
                {
                    name: "Calf Raises",
                    video: "https://www.youtube.com/embed/3UdnIF8qX_k",
                    targetSets: 4,
                    targetReps: 15,
                    weight: "50 lbs"
                }
            ]
        },
        {
            workoutType: "HIIT & Conditioning",
            exercises: [
                {
                    name: "Burpees",
                    video: "https://www.youtube.com/embed/818SkLY7KRM",
                    targetSets: 4,
                    targetReps: 8,
                    weight: "Bodyweight"
                },
                {
                    name: "Jump Squats",
                    video: "https://www.youtube.com/embed/A5f6RcjvJ2g",
                    targetSets: 3,
                    targetReps: 12,
                    weight: "Bodyweight"
                },
                {
                    name: "High Knees",
                    video: "https://www.youtube.com/embed/8opcQdC-V-U",
                    targetSets: 3,
                    targetReps: "30 sec",
                    weight: "Bodyweight"
                }
            ]
        },
        {
            workoutType: "Flexibility & Mobility",
            exercises: [
                {
                    name: "Cat-Cow Stretch",
                    video: "https://www.youtube.com/embed/kqnua4rHVVA",
                    targetSets: 2,
                    targetReps: "10 reps",
                    weight: "Bodyweight"
                },
                {
                    name: "Downward Dog",
                    video: "https://www.youtube.com/embed/yKzV7VkVmYE",
                    targetSets: 3,
                    targetReps: "30 sec",
                    weight: "Bodyweight"
                },
                {
                    name: "Pigeon Pose",
                    video: "https://www.youtube.com/embed/0_zPqA65Nok",
                    targetSets: 2,
                    targetReps: "45 sec",
                    weight: "Bodyweight"
                },
                {
                    name: "Child's Pose",
                    video: "https://www.youtube.com/embed/2PcnYsNL5P4",
                    targetSets: 1,
                    targetReps: "60 sec",
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
    
    // Initialize workout card timers
    initializeWorkoutCardTimers();
}

// Function to initialize workout card timers
function initializeWorkoutCardTimers() {
    const workoutTimers = document.querySelectorAll('.workout-timer');
    
    // Store timer data for each workout
    window.workoutTimers = window.workoutTimers || {};
    
    workoutTimers.forEach(timerEl => {
        const workoutIndex = timerEl.dataset.workoutIndex;
        const timeDisplay = document.getElementById(`workout-time-${workoutIndex}`);
        const timerIcon = document.getElementById(`workout-timer-icon-${workoutIndex}`);
        
        // Initialize timer data for this workout
        window.workoutTimers[workoutIndex] = {
            startTime: null,
            elapsedTime: 0,
            timerInterval: null,
            isRunning: false
        };
        
         // Add click event listener
         timerEl.addEventListener('click', function() {
             const timer = window.workoutTimers[workoutIndex];
             
             if (timer.isRunning) {
                 // Stop the timer
                 clearInterval(timer.timerInterval);
                 timer.isRunning = false;
                 
                 // Calculate elapsed time
                 if (timer.startTime) {
                     timer.elapsedTime += Date.now() - timer.startTime;
                 }
                 
                 // Update UI
                 timerEl.dataset.status = 'stopped';
                 timerEl.classList.remove('bg-brand-lime/10');
                 timerIcon.setAttribute('data-lucide', 'timer');
                 lucide.createIcons();
                 timerEl.title = "Click: start/stop | Double-click: reset";
             } else {
                 // Start the timer
                 timer.startTime = Date.now();
                 timer.isRunning = true;
                 
                 // Update UI
                 timerEl.dataset.status = 'running';
                 timerEl.classList.add('bg-brand-lime/10');
                 timerIcon.setAttribute('data-lucide', 'timer');
                 lucide.createIcons();
                 timerEl.title = "Click to pause | Double-click to reset";
                 
                 // Update the timer display
                 timer.timerInterval = setInterval(function() {
                     const currentTime = Date.now();
                     const totalElapsed = timer.elapsedTime + (currentTime - timer.startTime);
                     timeDisplay.textContent = formatTimeForDisplay(totalElapsed);
                 }, 1000);
             }
         });
        
         // Add double-click event to reset
         timerEl.addEventListener('dblclick', function(e) {
             e.preventDefault();
             
             const timer = window.workoutTimers[workoutIndex];
             
             // Clear any running interval
             clearInterval(timer.timerInterval);
             
             // Reset timer data
             timer.startTime = null;
             timer.elapsedTime = 0;
             timer.isRunning = false;
             
             // Update UI
             timerEl.dataset.status = 'stopped';
             timeDisplay.textContent = '00:00';
             timerEl.classList.remove('bg-brand-lime/10');
             timerIcon.setAttribute('data-lucide', 'timer');
             lucide.createIcons();
             
             // Add flash animation to indicate reset
             timeDisplay.classList.add('bg-gray-100');
             setTimeout(() => {
                 timeDisplay.classList.remove('bg-gray-100');
             }, 300);
         });
    });
}

// Helper function to format time in MM:SS format
function formatTimeForDisplay(timeInMs) {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function createWorkoutCard(workout, workoutIndex) {
    const card = document.createElement('div');
    card.className = 'bg-brand-surface rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 h-auto relative';
    
    card.innerHTML = `
        <!-- Workout Header -->
        <div class="flex flex-col mb-6">
            <div class="flex items-center">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-brand-lime rounded-lg flex items-center justify-center mr-3">
                        <i data-lucide="${getWorkoutTypeIcon(workout.workoutType)}" class="w-5 h-5 text-brand-text-primary"></i>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-semibold text-brand-text-primary">${workout.workoutType}</h3>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between mt-2">
                <p class="text-sm text-brand-text-secondary" id="workout-progress-${workoutIndex}">0/${workout.exercises.length} exercises</p>
                <div class="flex items-center cursor-pointer workout-timer" 
                    id="workout-timer-${workoutIndex}" 
                    data-workout-index="${workoutIndex}" 
                    data-status="stopped"
                    title="Click: start/stop | Double-click: reset">
                    <i id="workout-timer-icon-${workoutIndex}" data-lucide="timer" class="w-4 h-4 text-gray-600 mr-1"></i>
                    <span class="text-sm font-bold text-gray-700" id="workout-time-${workoutIndex}">00:00</span>
                </div>
            </div>
        </div>

        <!-- Exercise List -->
        <div class="space-y-4 mb-4" id="exercises-${workoutIndex}">
            ${workout.exercises.map((exercise, exerciseIndex) => createExerciseRow(exercise, workoutIndex, exerciseIndex)).join('')}
        </div>
        
        <!-- Simple Notes Link - Fixed to Bottom Right -->
        <div class="flex justify-end mt-6">
            <button 
                onclick="openWorkoutNotes(${workoutIndex})"
                id="workout-notes-btn-${workoutIndex}"
                class="text-xs text-brand-text-secondary hover:text-brand-text-primary transition-colors absolute bottom-4 right-6"
            >
                <i data-lucide="pencil" class="w-3 h-3 inline mr-1"></i>Click to add notes
            </button>
        </div>
        
        <!-- Workout Notes (Hidden by default) -->
        <div id="workout-notes-container-${workoutIndex}" class="hidden mt-3 pt-3 border-t border-gray-200">
            <label class="block text-sm font-medium text-brand-text-secondary mb-2">Workout Notes</label>
            <textarea 
                id="workout-notes-textarea-${workoutIndex}"
                placeholder="Add notes about this workout session..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-lime focus:border-transparent text-sm resize-none h-24"
            ></textarea>
            <div class="flex gap-2 mt-2">
                <button 
                    onclick="saveWorkoutNotes(${workoutIndex})"
                    class="px-3 py-1.5 bg-brand-lime text-brand-text-primary rounded-md text-sm hover:bg-opacity-90 transition-colors"
                >
                    Save Notes
                </button>
                <button 
                    onclick="closeWorkoutNotes(${workoutIndex})"
                    class="px-3 py-1.5 text-sm text-brand-text-secondary hover:text-brand-text-primary hover:bg-gray-100 rounded-md transition-colors"
                >
                    Close
                </button>
            </div>
        </div>

    `;

    return card;
}

function createExerciseRow(exercise, workoutIndex, exerciseIndex) {
    const exerciseId = `exercise-${workoutIndex}-${exerciseIndex}`;
    
    return `
        <div class="bg-gray-50 rounded-lg p-3 exercise-row" id="${exerciseId}">
            <!-- Mobile Layout: Optimized 2-Row -->
            <div class="md:hidden space-y-3">
                <!-- Row 1: Video Thumbnail + Exercise Name & Target Info -->
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
                    
                    <!-- Exercise Info -->
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-brand-text-primary text-sm truncate">${exercise.name}</h4>
                        <p class="text-xs text-brand-text-secondary truncate">Target: ${exercise.targetSets} × ${exercise.targetReps} • ${exercise.weight}</p>
                    </div>
                </div>

                <!-- Row 2: Input Fields + Action Buttons -->
                <div class="flex items-end gap-1">
                    <!-- Input Fields with Labels -->
                    <div class="flex-auto grid grid-cols-3 gap-1.5 mr-1">
                        <div class="text-center">
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1">Weight</label>
                            <input 
                                type="text" 
                                id="weight-${exerciseId}"
                                placeholder="${exercise.weight}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                            >
                        </div>
                        <div class="text-center">
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1">Sets</label>
                            <input 
                                type="number" 
                                id="sets-${exerciseId}"
                                placeholder="${exercise.targetSets}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                            >
                        </div>
                        <div class="text-center">
                            <label class="block text-xs font-medium text-brand-text-secondary mb-1">Reps</label>
                            <input 
                                type="text" 
                                id="reps-${exerciseId}"
                                placeholder="${exercise.targetReps}"
                                class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                            >
                        </div>
                    </div>

                    <!-- Action Button -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                        <button 
                            onclick="completeExercise('${exerciseId}', ${workoutIndex})"
                            id="complete-btn-${exerciseId}"
                            class="p-2 bg-brand-lime text-brand-text-primary rounded-md hover:bg-opacity-90 transition-colors"
                            title="Complete Exercise"
                        >
                            <i data-lucide="check" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tablet Layout: Hybrid approach -->
            <div class="hidden md:block lg:hidden">
                <!-- Top row: Video + Exercise name + Action buttons -->
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                        <!-- Video Thumbnail -->
                        <div class="flex-shrink-0">
                            <div class="relative group cursor-pointer" onclick="openExerciseVideo('${exercise.video}', '${exercise.name}')">
                                <div class="w-16 h-12 bg-gray-200 rounded-md overflow-hidden">
                                    <img 
                                        src="https://img.youtube.com/vi/${getYouTubeVideoId(exercise.video)}/maxresdefault.jpg" 
                                        alt="${exercise.name}"
                                        class="w-full h-full object-cover"
                                        onerror="this.src='https://img.youtube.com/vi/${getYouTubeVideoId(exercise.video)}/hqdefault.jpg'"
                                    >
                                </div>
                                <div class="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <i data-lucide="play" class="w-4 h-4 text-white"></i>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Exercise Info -->
                        <div class="flex-1 min-w-0">
                            <h4 class="font-semibold text-brand-text-primary text-base truncate">${exercise.name}</h4>
                            <p class="text-sm text-brand-text-secondary truncate">Target: ${exercise.targetSets} × ${exercise.targetReps} • ${exercise.weight}</p>
                        </div>
                    </div>
                    
                    <!-- Action Button -->
                    <div class="flex items-center gap-2 ml-4">
                        <button 
                            onclick="completeExercise('${exerciseId}', ${workoutIndex})"
                            id="complete-btn-${exerciseId}-tablet"
                            class="p-2 bg-brand-lime text-brand-text-primary rounded-md hover:bg-opacity-90 transition-colors"
                            title="Complete Exercise"
                        >
                            <i data-lucide="check" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Bottom row: Input fields -->
                <div class="grid grid-cols-3 gap-3">
                    <div class="text-center">
                        <label class="block text-sm font-medium text-brand-text-secondary mb-2">Weight</label>
                        <input 
                            type="text" 
                            id="weight-${exerciseId}-tablet"
                            placeholder="${exercise.weight}"
                            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                        >
                    </div>
                    <div class="text-center">
                        <label class="block text-sm font-medium text-brand-text-secondary mb-2">Sets</label>
                        <input 
                            type="number" 
                            id="sets-${exerciseId}-tablet"
                            placeholder="${exercise.targetSets}"
                            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                        >
                    </div>
                    <div class="text-center">
                        <label class="block text-sm font-medium text-brand-text-secondary mb-2">Reps</label>
                        <input 
                            type="text" 
                            id="reps-${exerciseId}-tablet"
                            placeholder="${exercise.targetReps}"
                            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-brand-lime focus:border-transparent text-center"
                        >
                    </div>
                </div>
            </div>

            <!-- Desktop Layout: Single Row -->
            <div class="hidden lg:flex lg:items-center lg:gap-3">
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

                <!-- Action Button -->
                <div class="flex items-center">
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
            
            // Update notes button state for both mobile and desktop
            updateNotesButtonState(exerciseId, true);
            
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

// Update notes button visual state
function updateNotesButtonState(exerciseId, hasNotes) {
    const notesBtnMobile = document.getElementById(`notes-btn-${exerciseId}`);
    const notesBtnTablet = document.getElementById(`notes-btn-${exerciseId}-tablet`);
    const notesBtnDesktop = document.getElementById(`notes-btn-${exerciseId}-desktop`);
    
    if (hasNotes) {
        // Show filled/highlighted state when notes are present
        const activeClass = 'p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors';
        const activeTitle = 'View/Edit Notes (Notes Added)';
        
        if (notesBtnMobile) {
            notesBtnMobile.className = activeClass;
            notesBtnMobile.title = activeTitle;
        }
        if (notesBtnTablet) {
            notesBtnTablet.className = activeClass;
            notesBtnTablet.title = activeTitle;
        }
        if (notesBtnDesktop) {
            notesBtnDesktop.className = activeClass;
            notesBtnDesktop.title = activeTitle;
        }
    } else {
        // Show default state when no notes
        const defaultClass = 'p-2 text-brand-text-secondary hover:text-brand-text-primary hover:bg-gray-100 rounded-md transition-colors';
        const defaultTitle = 'Add Notes';
        
        if (notesBtnMobile) {
            notesBtnMobile.className = defaultClass;
            notesBtnMobile.title = defaultTitle;
        }
        if (notesBtnTablet) {
            notesBtnTablet.className = defaultClass;
            notesBtnTablet.title = defaultTitle;
        }
        if (notesBtnDesktop) {
            notesBtnDesktop.className = defaultClass;
            notesBtnDesktop.title = defaultTitle;
        }
    }
}

function completeExercise(exerciseId, workoutIndex) {
    const exerciseRow = document.getElementById(exerciseId);
    const completeBtnMobile = document.getElementById(`complete-btn-${exerciseId}`);
    const completeBtnTablet = document.getElementById(`complete-btn-${exerciseId}-tablet`);
    const completeBtnDesktop = document.getElementById(`complete-btn-${exerciseId}-desktop`);
    
    if (exerciseRow) {
        // Mark as completed
        exerciseRow.classList.add('opacity-75');
        exerciseRow.setAttribute('data-completed', 'true');
        
        // Common completed button styles
        const completedIcon = '<i data-lucide="check-circle" class="w-4 h-4"></i>';
        const completedClass = 'p-2 bg-green-100 text-green-700 rounded-md cursor-default';
        const completedTitle = 'Exercise Completed';
        
        // Update mobile button
        if (completeBtnMobile) {
            completeBtnMobile.innerHTML = completedIcon;
            completeBtnMobile.className = completedClass;
            completeBtnMobile.disabled = true;
            completeBtnMobile.title = completedTitle;
        }
        
        // Update tablet button
        if (completeBtnTablet) {
            completeBtnTablet.innerHTML = completedIcon;
            completeBtnTablet.className = completedClass;
            completeBtnTablet.disabled = true;
            completeBtnTablet.title = completedTitle;
        }
        
        // Update desktop button
        if (completeBtnDesktop) {
            completeBtnDesktop.innerHTML = completedIcon;
            completeBtnDesktop.className = completedClass;
            completeBtnDesktop.disabled = true;
            completeBtnDesktop.title = completedTitle;
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
            workoutType: "Upper Body",
            workoutPlan: ['Push-ups: 3 sets x 10 reps', 'Squats: 3 sets x 15 reps', 'Plank: 3 sets x 30 seconds'],
            notes: 'Great workout! Felt strong today.'
        },
        {
            day: 2,
            date: new Date('2024-01-02'),
            workoutType: "Core & Cardio",
            workoutPlan: ['Lunges: 3 sets x 10 each leg', 'Mountain climbers: 3 sets x 20 reps', 'Burpees: 2 sets x 8 reps'],
            notes: 'Challenging but completed all sets.'
        },
        {
            day: 3,
            date: new Date('2024-01-03'),
            workoutType: "Rest Day",
            workoutPlan: ['Rest day - light stretching'],
            notes: 'Recovery day.'
        },
        {
            day: 4,
            date: new Date('2024-01-04'),
            workoutType: "Rest Day",
            workoutPlan: ['Rest day - light stretching'],
            notes: 'Recovery day.'
        },
        {
            day: 5,
            date: new Date('2024-01-05'),
            workoutType: "Upper Body",
            workoutPlan: ['Upper body strength: 4 exercises', 'Core workout: 15 minutes'],
            notes: 'Increased weight on bench press.'
        },
        {
            day: 6,
            date: new Date('2024-01-06'),
            workoutType: "HIIT",
            workoutPlan: ['Full body HIIT: 20 minutes', 'Cool down: 5 minutes'],
            notes: 'Intense session, good energy throughout.'
        },
        {
            day: 7,
            date: new Date('2024-01-07'),
            workoutType: "Cardio",
            workoutPlan: ['Swimming: 30 minutes', 'Stretching: 10 minutes'],
            notes: 'Recovery swim session.'
        },
        {
            day: 8,
            date: new Date('2024-01-08'),
            workoutType: "Lower Body",
            workoutPlan: ['Strength training: 45 minutes', 'Cardio: 15 minutes'],
            notes: 'Focused on form for squats.'
        }
    ];

    renderCalendar(workoutData);
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
    card.className = `day-card bg-brand-surface rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer transition-all hover:shadow-lg`;
    card.setAttribute('data-day', dayData.day);

    // Use theme color instead of type-based color
    card.innerHTML = `
        <div class="flex items-center space-x-2 mb-3">
            <div class="w-8 h-8 bg-brand-lime rounded-lg flex items-center justify-center">
                <span class="text-sm font-bold text-brand-text-primary">${dayData.day}</span>
            </div>
            <div>
                <h3 class="font-semibold text-brand-text-primary">${dayData.workoutType}</h3>
            </div>
        </div>
        <p class="text-xs text-brand-text-secondary mb-2">${formatCalendarDate(dayData.date)}</p>
        <div class="text-xs text-brand-text-secondary">
            <p class="mt-1 line-clamp-2">${dayData.workoutPlan[0] || 'No workout details'}</p>
        </div>
    `;

    card.addEventListener('click', () => openWorkoutModal(dayData));
    return card;
}

// Open Workout Modal
function openWorkoutModal(dayData) {
    const modal = document.getElementById('workout-modal');
    if (!modal) return;
    
    // Populate modal content
    document.getElementById('modal-day-title').textContent = `Day ${dayData.day}`;
    document.getElementById('modal-date').textContent = formatCalendarDate(dayData.date);
    
    // Workout type
    const statusBadge = document.getElementById('modal-status-badge');
    statusBadge.className = `flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-lime text-brand-text-primary`;
    document.getElementById('modal-status-icon').setAttribute('data-lucide', 'dumbbell');
    document.getElementById('modal-status-text').textContent = dayData.workoutType;
    
    // Workout plan
    const workoutPlanDiv = document.getElementById('modal-workout-plan');
    workoutPlanDiv.innerHTML = dayData.workoutPlan.map(exercise => 
        `<div class="flex items-center mb-2">
            <i data-lucide="activity" class="w-4 h-4 text-brand-lime mr-2"></i>
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
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Setup close button
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeWorkoutModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeWorkoutModal();
    });
    
    // Reinitialize icons
    lucide.createIcons();
}

// Planner Content Loader
function loadPlannerContent() {
    console.log('Loading planner content...');
    
    // Load plan cards
    loadPlanCards();
}

// Load Plan Cards
function loadPlanCards() {
    const planGrid = document.getElementById('plan-cards-grid');
    if (!planGrid) {
        console.error('Plan grid element not found!');
        return;
    }
    
    console.log('Getting plan data...');
    // Get plan data
    const planData = getPlanData();
    
    planGrid.innerHTML = '';
    
    console.log(`Creating ${planData.length} plan cards...`);
    // Create plan cards
    planData.forEach((plan, planIndex) => {
        const planCard = createPlanCard(plan, planIndex);
        planGrid.appendChild(planCard);
    });
    
    lucide.createIcons();
    console.log('Plan cards created and added to the grid.');
}

// Get Plan Data (Multiple plans with varying durations)
function getPlanData() {
    const plans = [
        { name: "Beginner Strength", duration: 30, startDate: "2024-01-01" },
        { name: "Advanced HIIT", duration: 45, startDate: "2024-01-15" },
        { name: "Weight Loss Challenge", duration: 60, startDate: "2024-02-01" },
        { name: "Muscle Building", duration: 90, startDate: "2024-03-01" }
    ];
    
    return plans.map((plan, planIndex) => {
        const dailyWorkouts = [];
        
        // Generate workout days for the plan duration
        for (let day = 0; day < plan.duration; day++) {
            const currentDayNumber = day + 1;
            const isRestDay = day === 0 || (day > 0 && day % 6 === 0); // Day 1 and every 6th day
            
            if (isRestDay) {
                dailyWorkouts.push({
                    day: currentDayNumber,
                    isRestDay: true,
                    workoutType: "Rest Day",
                    totalExercises: 0,
                    estimatedTime: "0 min",
                    exercises: [],
                    status: "rest"
                });
            } else {
                const workoutTypes = getPlanWorkoutTypes(plan.name);
                const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
                
                // Determine status based on day number
                const status = currentDayNumber < 8 ? "completed" : "upcoming";
                
                dailyWorkouts.push({
                    day: currentDayNumber,
                    isRestDay: false,
                    workoutType: workoutType,
                    totalExercises: Math.floor(Math.random() * 3) + 3,
                    estimatedTime: `${Math.floor(Math.random() * 30) + 30} min`,
                    exercises: getRandomExercises(workoutType),
                    status: status
                });
            }
        }
        
        return {
            planName: plan.name,
            planIndex: planIndex,
            duration: plan.duration,
            totalDays: plan.duration,
            workoutDays: dailyWorkouts.filter(d => !d.isRestDay).length,
            restDays: dailyWorkouts.filter(d => d.isRestDay).length,
            completed: dailyWorkouts.filter(d => d.status === "completed").length,
            upcoming: dailyWorkouts.filter(d => d.status === "upcoming").length,
            dailyWorkouts: dailyWorkouts,
            currentFilter: 'all' // Default filter
        };
    });
}

// Get plan specific workout types
function getPlanWorkoutTypes(planName) {
    const planTypes = {
        "Beginner Strength": ["Upper Body Strength", "Lower Body Power", "Full Body Circuit"],
        "Advanced HIIT": ["HIIT & Conditioning", "Core & Cardio", "Full Body Circuit"],
        "Weight Loss Challenge": ["Core & Cardio", "HIIT & Conditioning", "Full Body Circuit"],
        "Muscle Building": ["Upper Body Strength", "Lower Body Power", "Full Body Circuit"]
    };
    
    return planTypes[planName] || ["Full Body Circuit"];
}

// Helper function to get day name
function getDayName(dayIndex) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
}

// Helper function to get random exercises based on workout type
function getRandomExercises(workoutType) {
    const exerciseLibrary = {
        "Upper Body Strength": [
            { name: "Push-ups", subtitle: "Chest, Shoulders, Triceps", targetSets: 3, targetReps: 12, targetWeight: "Bodyweight" },
            { name: "Bench Press", subtitle: "Chest, Shoulders, Triceps", targetSets: 4, targetReps: 8, targetWeight: "135 lbs" },
            { name: "Pull-ups", subtitle: "Back, Biceps", targetSets: 3, targetReps: 8, targetWeight: "Bodyweight" },
            { name: "Overhead Press", subtitle: "Shoulders, Triceps", targetSets: 3, targetReps: 10, targetWeight: "95 lbs" }
        ],
        "Core & Cardio": [
            { name: "Plank", subtitle: "Core Stability", targetSets: 3, targetReps: "45 sec", targetWeight: "Bodyweight" },
            { name: "Mountain Climbers", subtitle: "Cardio, Core", targetSets: 3, targetReps: 20, targetWeight: "Bodyweight" },
            { name: "Russian Twists", subtitle: "Obliques, Core", targetSets: 3, targetReps: 15, targetWeight: "Bodyweight" }
        ],
        "Lower Body Power": [
            { name: "Squats", subtitle: "Quads, Glutes, Hamstrings", targetSets: 4, targetReps: 12, targetWeight: "185 lbs" },
            { name: "Deadlifts", subtitle: "Hamstrings, Glutes, Back", targetSets: 3, targetReps: 6, targetWeight: "225 lbs" },
            { name: "Lunges", subtitle: "Quads, Glutes, Balance", targetSets: 3, targetReps: 10, targetWeight: "Bodyweight" },
            { name: "Calf Raises", subtitle: "Calves", targetSets: 4, targetReps: 15, targetWeight: "50 lbs" }
        ],
        "HIIT & Conditioning": [
            { name: "Burpees", subtitle: "Full Body HIIT", targetSets: 4, targetReps: 8, targetWeight: "Bodyweight" },
            { name: "Jump Squats", subtitle: "Explosive Lower Body", targetSets: 3, targetReps: 12, targetWeight: "Bodyweight" },
            { name: "High Knees", subtitle: "Cardio, Core", targetSets: 3, targetReps: "30 sec", targetWeight: "Bodyweight" }
        ],
        "Full Body Circuit": [
            { name: "Push-ups", subtitle: "Chest, Shoulders, Triceps", targetSets: 3, targetReps: 10, targetWeight: "Bodyweight" },
            { name: "Squats", subtitle: "Quads, Glutes, Hamstrings", targetSets: 3, targetReps: 12, targetWeight: "Bodyweight" },
            { name: "Plank", subtitle: "Core Stability", targetSets: 2, targetReps: "30 sec", targetWeight: "Bodyweight" },
            { name: "Jumping Jacks", subtitle: "Cardio, Coordination", targetSets: 3, targetReps: 20, targetWeight: "Bodyweight" }
        ]
    };
    
    const exercises = exerciseLibrary[workoutType] || exerciseLibrary["Full Body Circuit"];
    const numExercises = Math.floor(Math.random() * 2) + 3; // 3-4 exercises
    return exercises.slice(0, numExercises);
}

// Create Plan Card
function createPlanCard(planData, planIndex) {
    console.log(`Creating plan card ${planIndex}: ${planData.planName}`);
    
    const planCard = document.createElement('div');
    planCard.className = 'bg-brand-surface rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-auto';
    planCard.id = `plan-card-${planIndex}`;
    
    planCard.innerHTML = `
        <div class="p-4 md:p-6 bg-gray-50 border-b border-gray-200">
            <!-- Plan Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-brand-lime rounded-lg flex items-center justify-center mr-3">
                        <i data-lucide="calendar" class="w-5 h-5 text-brand-text-primary"></i>
                    </div>
                    <div>
                        <h3 class="text-base md:text-lg font-bold text-brand-text-primary">${planData.planName}</h3>
                        <p class="text-xs md:text-sm text-brand-text-secondary">${planData.duration} days • ${planData.workoutDays} workout days • ${planData.restDays} rest days</p>
                    </div>
                </div>
                <button class="plan-toggle-btn p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-brand-lime" 
                        onclick="togglePlanCard(${planIndex})">
                    <i data-lucide="chevron-up" class="w-4 md:w-5 h-4 md:h-5 plan-toggle-icon"></i>
                </button>
            </div>
        </div>
        
        <!-- Plan Content (Collapsible) -->
        <div class="plan-card-content">
            <div class="p-3 md:p-4 space-y-2 max-h-96 md:max-h-[500px] overflow-y-auto plan-days-container">
                ${planData.dailyWorkouts.map((day, dayIndex) => createDayRow(day, planIndex, dayIndex)).join('')}
            </div>
        </div>
    `;
    
    return planCard;
}

// Create Day Row
function createDayRow(dayData, planIndex, dayIndex) {
    const statusConfig = getStatusConfig(dayData.status);
    const dayClass = dayData.isRestDay ? 'bg-gray-50' : 'bg-white hover:bg-gray-50';
    
    return `
        <div class="day-row ${dayClass} rounded-lg border border-gray-100 transition-colors" 
             ${dayData.isRestDay ? '' : `onclick="showDayDetails(${planIndex}, ${dayIndex})"`}>
            
            <!-- Mobile Layout -->
            <div class="md:hidden p-3">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 rounded-full ${statusConfig.bgColor} flex items-center justify-center">
                            <span class="text-sm font-bold ${statusConfig.textColor}">${dayData.day}</span>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        ${!dayData.isRestDay ? `
                            <div class="mb-2">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getWorkoutTypeClass(dayData.workoutType)}">
                                    ${dayData.workoutType}
                                </span>
                            </div>
                            <div class="space-y-1">
                                ${dayData.exercises.slice(0, 3).map(exercise => `
                                    <div class="text-xs text-brand-text-secondary">
                                        • ${exercise.name}
                                    </div>
                                `).join('')}
                                ${dayData.exercises.length > 3 ? `<div class="text-xs text-brand-text-secondary opacity-75">+${dayData.exercises.length - 3} more...</div>` : ''}
                            </div>
                        ` : `
                            <div class="flex items-center h-full">
                                <span class="text-sm text-brand-text-secondary font-medium">Rest & Recovery</span>
                            </div>
                        `}
                    </div>
                </div>
            </div>

            <!-- Desktop Layout -->
            <div class="hidden md:block p-3 ${dayData.isRestDay ? '' : 'cursor-pointer'}">
                <div class="flex items-start justify-between">
                    <div class="flex items-start space-x-3 flex-1">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full ${statusConfig.bgColor} flex items-center justify-center">
                                <span class="text-sm font-bold ${statusConfig.textColor}">${dayData.day}</span>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            ${!dayData.isRestDay ? `
                                <div class="mb-2">
                                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getWorkoutTypeClass(dayData.workoutType)}">
                                        ${dayData.workoutType}
                                    </span>
                                </div>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-1 text-xs text-brand-text-secondary">
                                    ${dayData.exercises.map((exercise, idx) => idx < 4 ? `
                                        <div class="flex items-center">
                                            <span class="truncate">• ${exercise.name}</span>
                                        </div>
                                    ` : '').join('')}
                                    ${dayData.exercises.length > 4 ? `
                                        <div class="flex items-center text-xs text-brand-text-secondary opacity-75">
                                            <span class="truncate">• +${dayData.exercises.length - 4} more exercises...</span>
                                        </div>
                                    ` : ''}
                                </div>
                            ` : `
                                <div class="flex items-center h-full py-2">
                                    <span class="text-sm text-brand-text-secondary font-medium">Rest & Recovery</span>
                                </div>
                            `}
                        </div>
                    </div>
                    <div class="flex items-center ml-4">
                        ${!dayData.isRestDay ? `
                            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Get Monthly Workout Data
function getMonthlyWorkoutData() {
    // Return detailed workout plans with full exercise data like Today's Plan
    const monthlyPlans = [
        {
            day: 1,
            date: "Jan 1, 2024",
            dayName: "Monday",
            workoutType: "Upper Body Strength",
            totalExercises: 4,
            estimatedTime: "45 min",
            exercises: [
                {
                    name: "Push-ups",
                    subtitle: "Chest, Shoulders, Triceps",
                    videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
                    targetSets: 3,
                    targetReps: 12,
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Bench Press",
                    subtitle: "Chest, Shoulders, Triceps",
                    videoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
                    targetSets: 4,
                    targetReps: 8,
                    targetWeight: "135 lbs",
                    notes: ""
                },
                {
                    name: "Pull-ups",
                    subtitle: "Back, Biceps",
                    videoUrl: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
                    targetSets: 3,
                    targetReps: 8,
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Overhead Press",
                    subtitle: "Shoulders, Triceps",
                    videoUrl: "https://www.youtube.com/watch?v=2yjwXTZQDDI",
                    targetSets: 3,
                    targetReps: 10,
                    targetWeight: "95 lbs",
                    notes: ""
                }
            ]
        },
        {
            day: 2,
            date: "Jan 2, 2024",
            dayName: "Tuesday",
            workoutType: "Core & Cardio",
            totalExercises: 3,
            estimatedTime: "30 min",
            exercises: [
                {
                    name: "Plank",
                    subtitle: "Core Stability",
                    videoUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
                    targetSets: 3,
                    targetReps: "45 sec",
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Mountain Climbers",
                    subtitle: "Cardio, Core",
                    videoUrl: "https://www.youtube.com/watch?v=kLh-uczlPLg",
                    targetSets: 3,
                    targetReps: 20,
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Russian Twists",
                    subtitle: "Obliques, Core",
                    videoUrl: "https://www.youtube.com/watch?v=wkD8rjkodUI",
                    targetSets: 3,
                    targetReps: 15,
                    targetWeight: "Bodyweight",
                    notes: ""
                }
            ]
        },
        {
            day: 3,
            date: "Jan 3, 2024",
            dayName: "Wednesday",
            workoutType: "Lower Body Power",
            totalExercises: 4,
            estimatedTime: "50 min",
            exercises: [
                {
                    name: "Squats",
                    subtitle: "Quads, Glutes, Hamstrings",
                    videoUrl: "https://www.youtube.com/watch?v=ultWZbUMPL8",
                    targetSets: 4,
                    targetReps: 12,
                    targetWeight: "185 lbs",
                    notes: ""
                },
                {
                    name: "Deadlifts",
                    subtitle: "Hamstrings, Glutes, Back",
                    videoUrl: "https://www.youtube.com/watch?v=ytGaGIn3SjE",
                    targetSets: 3,
                    targetReps: 6,
                    targetWeight: "225 lbs",
                    notes: ""
                },
                {
                    name: "Lunges",
                    subtitle: "Quads, Glutes, Balance",
                    videoUrl: "https://www.youtube.com/watch?v=QE_hU9_dJCk",
                    targetSets: 3,
                    targetReps: 10,
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Calf Raises",
                    subtitle: "Calves",
                    videoUrl: "https://www.youtube.com/watch?v=gwLzBJYoWlI",
                    targetSets: 4,
                    targetReps: 15,
                    targetWeight: "50 lbs",
                    notes: ""
                }
            ]
        },
        {
            day: 4,
            date: "Jan 4, 2024",
            dayName: "Thursday",
            workoutType: "HIIT & Conditioning",
            totalExercises: 3,
            estimatedTime: "25 min",
            exercises: [
                {
                    name: "Burpees",
                    subtitle: "Full Body HIIT",
                    videoUrl: "https://www.youtube.com/watch?v=auBLPXO8Fww",
                    targetSets: 4,
                    targetReps: 8,
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Jump Squats",
                    subtitle: "Explosive Lower Body",
                    videoUrl: "https://www.youtube.com/watch?v=A2jzBkKCgaQ",
                    targetSets: 3,
                    targetReps: 12,
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "High Knees",
                    subtitle: "Cardio, Core",
                    videoUrl: "https://www.youtube.com/watch?v=8opcQdC-V-U",
                    targetSets: 3,
                    targetReps: "30 sec",
                    targetWeight: "Bodyweight",
                    notes: ""
                }
            ]
        },
        {
            day: 5,
            date: "Jan 5, 2024",
            dayName: "Friday",
            workoutType: "Flexibility & Mobility",
            totalExercises: 4,
            estimatedTime: "35 min",
            exercises: [
                {
                    name: "Cat-Cow Stretch",
                    subtitle: "Spine Mobility",
                    videoUrl: "https://www.youtube.com/watch?v=kqnua4rHVVA",
                    targetSets: 2,
                    targetReps: "10 reps",
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Downward Dog",
                    subtitle: "Full Body Stretch",
                    videoUrl: "https://www.youtube.com/watch?v=gLEXOGGcLlk",
                    targetSets: 3,
                    targetReps: "30 sec",
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Pigeon Pose",
                    subtitle: "Hip Flexibility",
                    videoUrl: "https://www.youtube.com/watch?v=0_zPqA65Nok",
                    targetSets: 2,
                    targetReps: "45 sec",
                    targetWeight: "Bodyweight",
                    notes: ""
                },
                {
                    name: "Child's Pose",
                    subtitle: "Relaxation, Back Stretch",
                    videoUrl: "https://www.youtube.com/watch?v=2Y8gSBg0aAA",
                    targetSets: 1,
                    targetReps: "60 sec",
                    targetWeight: "Bodyweight",
                    notes: ""
                }
            ]
        }
    ];
    
    return monthlyPlans;
}

// Toggle Plan Card
function togglePlanCard(planIndex) {
    const planCard = document.querySelectorAll('.plan-card-content')[planIndex];
    const toggleBtn = document.querySelectorAll('.plan-toggle-btn')[planIndex];
    const toggleIcon = document.querySelectorAll('.plan-toggle-icon')[planIndex];
    
    if (planCard.classList.contains('hidden')) {
        // Expand the card
        planCard.classList.remove('hidden');
        toggleBtn.classList.add('bg-brand-lime');
        toggleBtn.classList.remove('bg-gray-200');
        toggleIcon.setAttribute('data-lucide', 'chevron-up');
        
        // Smooth animation to scroll the newly opened content into view
        setTimeout(() => {
            planCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        // Collapse the card
        planCard.classList.add('hidden');
        toggleBtn.classList.remove('bg-brand-lime');
        toggleBtn.classList.add('bg-gray-200');
        toggleIcon.setAttribute('data-lucide', 'chevron-down');
    }
    
    lucide.createIcons();
}

// Filter Plan by Status
function filterPlan(planIndex, status) {
    const planData = getPlanData();
    const plan = planData[planIndex];
    const planCard = document.getElementById(`plan-card-${planIndex}`);
    const daysContainer = planCard.querySelector('.plan-days-container');
    const filterIndicator = planCard.querySelector('.filter-indicator');
    const filterText = planCard.querySelector('.filter-text');
    
    // Update filter status
    plan.currentFilter = status;
    
    // Show filter indicator
    filterIndicator.classList.remove('hidden');
    filterText.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    
    // Filter days
    const filteredDays = plan.dailyWorkouts.filter(day => {
        if (status === 'completed') return day.status === 'completed';
        if (status === 'upcoming') return day.status === 'upcoming';
        return true;
    });
    
    // Re-render filtered days
    daysContainer.innerHTML = filteredDays.map((day, dayIndex) => {
        const originalIndex = plan.dailyWorkouts.findIndex(d => d.day === day.day);
        return createDayRow(day, planIndex, originalIndex);
    }).join('');
    
    lucide.createIcons();
}

// Clear Filter
function clearFilter(planIndex) {
    const planData = getPlanData();
    const plan = planData[planIndex];
    const planCard = document.getElementById(`plan-card-${planIndex}`);
    const daysContainer = planCard.querySelector('.plan-days-container');
    const filterIndicator = planCard.querySelector('.filter-indicator');
    
    // Clear filter status
    plan.currentFilter = 'all';
    
    // Hide filter indicator
    filterIndicator.classList.add('hidden');
    
    // Re-render all days
    daysContainer.innerHTML = plan.dailyWorkouts.map((day, dayIndex) => 
        createDayRow(day, planIndex, dayIndex)
    ).join('');
    
    lucide.createIcons();
}

// Show Day Details
function showDayDetails(planIndex, dayIndex) {
    const planData = getPlanData();
    const dayData = planData[planIndex].dailyWorkouts[dayIndex];
    
    if (dayData.isRestDay) return;
    
    // Create and show day details modal
    showDayDetailsModal(dayData);
}

// Show Day Details Modal
function showDayDetailsModal(dayData) {
    // Create modal backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'day-details-modal';
    modalBackdrop.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    modalBackdrop.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onclick="closeDayDetailsModal()"></div>
        <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-brand-lime rounded-lg flex items-center justify-center mr-4">
                        <span class="text-xl font-bold text-brand-text-primary">${dayData.day}</span>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-brand-text-primary">${dayData.workoutType}</h3>
                        <p class="text-sm text-brand-text-secondary mt-1">${dayData.exercises.length} exercises</p>
                    </div>
                </div>
                <button onclick="closeDayDetailsModal()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                </button>
            </div>

            <!-- Modal Content -->
            <div class="p-6">
                <!-- Exercise List -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${dayData.exercises.map((exercise, index) => `
                        <div class="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex-1">
                                    <h5 class="font-medium text-brand-text-primary flex items-center">
                                        <span class="inline-flex items-center justify-center bg-brand-lime w-5 h-5 rounded-full text-xs font-bold mr-2">${index + 1}</span>
                                        ${exercise.name}
                                    </h5>
                                    <p class="text-xs text-brand-text-secondary mt-1">${exercise.subtitle}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-2 text-sm">
                                <div class="bg-white p-2 rounded-lg">
                                    <span class="text-xs text-brand-text-secondary block">Sets</span>
                                    <span class="font-medium text-brand-text-primary">${exercise.targetSets}</span>
                                </div>
                                <div class="bg-white p-2 rounded-lg">
                                    <span class="text-xs text-brand-text-secondary block">Reps</span>
                                    <span class="font-medium text-brand-text-primary">${exercise.targetReps}</span>
                                </div>
                                <div class="bg-white p-2 rounded-lg">
                                    <span class="text-xs text-brand-text-secondary block">Weight</span>
                                    <span class="font-medium text-brand-text-primary">${exercise.targetWeight}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                    <button class="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        <i data-lucide="edit" class="w-4 h-4 mr-2 inline"></i>
                        Edit Workout
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalBackdrop);
    lucide.createIcons();
}

// Close Day Details Modal
function closeDayDetailsModal() {
    const modal = document.getElementById('day-details-modal');
    if (modal) {
        modal.remove();
    }
}

// Create Planner Workout Card (Like Today's Plan)
function createPlannerWorkoutCard(dailyPlan, planIndex) {
    const card = document.createElement('div');
    card.className = 'bg-brand-surface rounded-xl md:rounded-2xl shadow-sm border border-gray-100';
    
    card.innerHTML = `
        <div class="p-4 md:p-6">
            <!-- Workout Header -->
            <div class="flex items-center justify-between mb-4 md:mb-6">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-brand-lime rounded-xl flex items-center justify-center mr-3 md:mr-4">
                        <span class="text-sm font-bold text-brand-text-primary">${dailyPlan.day}</span>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-semibold text-brand-text-primary">${dailyPlan.date}</h3>
                        <p class="text-brand-text-secondary">${dailyPlan.dayName} • ${dailyPlan.workoutType}</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm font-medium text-brand-text-primary">${dailyPlan.totalExercises} exercises</div>
                    <div class="text-sm text-brand-text-secondary">${dailyPlan.estimatedTime}</div>
                </div>
            </div>

            <!-- Exercises List -->
            <div class="space-y-4">
                ${dailyPlan.exercises.map((exercise, exerciseIndex) => 
                    createPlannerExerciseRow(exercise, planIndex, exerciseIndex)
                ).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Create Planner Exercise Row (View Only)
function createPlannerExerciseRow(exercise, planIndex, exerciseIndex) {
    const videoId = getYouTubeVideoId(exercise.videoUrl);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : 'https://via.placeholder.com/320x180?text=No+Video';
    
    return `
        <div class="exercise-row bg-white rounded-lg border border-gray-100 p-3">
            <!-- Desktop Layout -->
            <div class="hidden md:flex md:items-center md:gap-4">
                <!-- Video Thumbnail and Exercise Info -->
                <div class="flex items-center gap-3 flex-1">
                    <div class="relative flex-shrink-0">
                        <img src="${thumbnailUrl}" alt="${exercise.name}" class="w-16 h-10 object-cover rounded-lg">
                        <div class="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                            <i data-lucide="play" class="w-4 h-4 text-white"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-semibold text-brand-text-primary text-sm">${exercise.name}</h4>
                        <p class="text-brand-text-secondary text-xs">${exercise.subtitle}</p>
                    </div>
                </div>

                <!-- Exercise Details -->
                <div class="flex items-center gap-4 text-xs text-brand-text-secondary">
                    <span>${exercise.targetWeight}</span>
                    <span>${exercise.targetSets} sets</span>
                    <span>${exercise.targetReps} reps</span>
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="md:hidden">
                <!-- Exercise Info -->
                <div class="flex items-center gap-3 mb-2">
                    <div class="relative flex-shrink-0">
                        <img src="${thumbnailUrl}" alt="${exercise.name}" class="w-12 h-8 object-cover rounded-lg">
                        <div class="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                            <i data-lucide="play" class="w-3 h-3 text-white"></i>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-brand-text-primary text-sm truncate">${exercise.name}</h4>
                        <p class="text-brand-text-secondary text-xs truncate">${exercise.subtitle}</p>
                    </div>
                </div>

                <!-- Exercise Details -->
                <div class="flex items-center gap-3 text-xs text-brand-text-secondary">
                    <span>${exercise.targetWeight}</span>
                    <span>${exercise.targetSets} sets</span>
                    <span>${exercise.targetReps} reps</span>
                </div>
            </div>
        </div>
    `;
}



// Get Planner Workouts (Mock Data)
function getPlannerWorkouts(year, month, day) {
    // Mock data - replace with actual data source
    const mockWorkouts = {
        1: [{ name: 'Upper Body', type: 'strength' }],
        3: [{ name: 'Cardio', type: 'cardio' }],
        5: [{ name: 'Lower Body', type: 'strength' }, { name: 'Core', type: 'core' }],
        8: [{ name: 'HIIT', type: 'hiit' }],
        10: [{ name: 'Yoga', type: 'flexibility' }],
        12: [{ name: 'Full Body', type: 'strength' }],
        15: [{ name: 'Running', type: 'cardio' }],
        17: [{ name: 'Arms & Chest', type: 'strength' }],
        19: [{ name: 'Pilates', type: 'flexibility' }],
        22: [{ name: 'Legs & Glutes', type: 'strength' }],
        24: [{ name: 'HIIT Circuit', type: 'hiit' }],
        26: [{ name: 'Swim', type: 'cardio' }],
        29: [{ name: 'Full Body', type: 'strength' }, { name: 'Stretching', type: 'flexibility' }]
    };
    
    return mockWorkouts[day] || [];
}

// Get Workout Type Class
function getWorkoutTypeClass(type) {
    const classes = {
        'Upper Body Strength': 'bg-blue-100 text-blue-700',
        'Core & Cardio': 'bg-red-100 text-red-700',
        'Lower Body Power': 'bg-green-100 text-green-700',
        'HIIT & Conditioning': 'bg-orange-100 text-orange-700',
        'Full Body Circuit': 'bg-purple-100 text-purple-700',
        'strength': 'bg-blue-100 text-blue-700',
        'cardio': 'bg-red-100 text-red-700',
        'hiit': 'bg-orange-100 text-orange-700',
        'flexibility': 'bg-green-100 text-green-700',
        'core': 'bg-purple-100 text-purple-700'
    };
    return classes[type] || 'bg-gray-100 text-gray-700';
}



// Get Workout Type Icon
function getWorkoutTypeIcon(type) {
    const icons = {
        'strength': 'dumbbell',
        'cardio': 'heart',
        'hiit': 'zap',
        'flexibility': 'flower-2',
        'core': 'target'
    };
    return icons[type] || 'activity';
}

// Show Create Plan Modal (Placeholder)
function showCreatePlanModal() {
    console.log('Opening create plan modal...');
    showNotification('Create Plan feature coming soon!', 'info');
}

// Show Templates Modal (Placeholder)
function showTemplatesModal() {
    console.log('Opening templates modal...');
    showNotification('Template management coming soon!', 'info');
}

// Show Day Plan Modal (Placeholder)
function showDayPlanModal(year, month, day, workouts) {
    console.log(`Opening day plan for ${month + 1}/${day}/${year}`, workouts);
    showNotification(`Day planning for ${month + 1}/${day}/${year} coming soon!`, 'info');
}

// Use Workout Template (Placeholder)
function useWorkoutTemplate(template) {
    console.log('Using template:', template);
    showNotification(`"${template.name}" template selected! Add to calendar?`, 'info');
}

// Switch Planner View (Placeholder)
function switchPlannerView(viewType) {
    console.log('Switching to', viewType, 'view');
    showNotification(`${viewType} view coming soon!`, 'info');
}

// Goals Content Loader
function loadGoalsContent() {
    console.log('Loading goals content...');
    
    // Get the main content container
    const contentContainer = document.querySelector('#goals-content .grid');
    if (contentContainer) {
        // Clear existing content
        contentContainer.innerHTML = '';
        
        // Add assessment section
        const assessmentContainer = document.createElement('div');
        assessmentContainer.className = 'assessment-section';
        assessmentContainer.innerHTML = createAssessmentContent();
        contentContainer.appendChild(assessmentContainer);
        
        // Add goals section
        const goalsContainer = document.createElement('div');
        goalsContainer.className = 'goals-section';
        goalsContainer.innerHTML = createGoalsContent();
        contentContainer.appendChild(goalsContainer);
    }
    
    // Initialize icons
    lucide.createIcons();
    
    // Initialize modals
    initializeGoalsModals();
}

// Get Mock Goals Data
function getMockGoalsData() {
    return {
        currentGoals: [
            {
                id: 1,
                title: "Lose Weight",
                target: "10 lbs",
                progress: 40,
                deadline: "June 30, 2024",
                startDate: "January 15, 2024"
            },
            {
                id: 2,
                title: "Run 5K",
                target: "Under 30 min",
                progress: 65,
                deadline: "May 15, 2024",
                startDate: "February 1, 2024"
            },
            {
                id: 3,
                title: "Strength Training",
                target: "3x weekly",
                progress: 80,
                deadline: "Ongoing",
                startDate: "January 5, 2024"
            }
        ],
        completedGoals: [
            {
                id: 4,
                title: "Drink More Water",
                target: "2L daily",
                completedDate: "March 1, 2024"
            }
        ]
    };
}

// Get Mock Assessment Data
function getMockAssessmentData() {
    return {
        weight: [
            { date: new Date('2024-01-01'), value: 185 },
            { date: new Date('2024-01-15'), value: 183 },
            { date: new Date('2024-02-01'), value: 181 },
            { date: new Date('2024-02-15'), value: 180 },
            { date: new Date('2024-03-01'), value: 178 },
            { date: new Date('2024-03-15'), value: 176 }
        ],
        bodyFat: [
            { date: new Date('2024-01-01'), value: 22 },
            { date: new Date('2024-02-01'), value: 21 },
            { date: new Date('2024-03-01'), value: 20 }
        ],
        metrics: {
            chest: 40,
            waist: 34,
            hips: 38,
            thighs: 22,
            arms: 14
        },
        lastUpdated: new Date('2024-03-15')
    };
}

// Render Goals Section
function renderGoalsSection(goalsData) {
    const goalsContainer = document.querySelector('#goals-content .grid > div:first-child');
    if (!goalsContainer) return;
    
    goalsContainer.innerHTML = `
        <h2 class="text-lg font-semibold text-brand-text-primary mb-4">Goals & Targets</h2>
        <div class="space-y-5">
            <div class="current-goals">
                ${goalsData.currentGoals.map(goal => createGoalCard(goal)).join('')}
            </div>
            
            <div class="completed-goals mt-6 pt-4 border-t border-gray-200">
                <h3 class="text-md font-medium text-brand-text-primary mb-3 flex items-center">
                    <i data-lucide="check-circle" class="w-4 h-4 mr-2 text-green-500"></i>
                    Completed Goals
                </h3>
                ${goalsData.completedGoals.length > 0 ? 
                    goalsData.completedGoals.map(goal => createCompletedGoalItem(goal)).join('') : 
                    '<p class="text-sm text-brand-text-secondary">No completed goals yet.</p>'
                }
            </div>
            
            <div class="add-goal-section mt-5 pt-5">
                <button class="w-full py-3 px-4 bg-brand-lime text-brand-text-primary rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center" onclick="showAddGoalModal()">
                    <i data-lucide="plus" class="w-4 h-4 mr-2"></i>
                    Add New Goal
                </button>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

// Create Goal Card
function createGoalCard(goal) {
    return `
        <div class="goal-card bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-medium text-brand-text-primary">${goal.title}</h3>
                    <p class="text-sm text-brand-text-secondary">Target: ${goal.target}</p>
                </div>
                <div class="dropdown">
                    <button class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" onclick="toggleGoalOptions(${goal.id})">
                        <i data-lucide="more-vertical" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            
            <div class="mt-3">
                <div class="flex justify-between items-center text-xs text-brand-text-secondary mb-1">
                    <span>Progress</span>
                    <span>${goal.progress}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-brand-lime h-2 rounded-full" style="width: ${goal.progress}%"></div>
                </div>
            </div>
            
            <div class="text-xs text-brand-text-secondary mt-3 flex justify-between">
                <span>Started: ${goal.startDate}</span>
                <span>Target: ${goal.deadline}</span>
            </div>
        </div>
    `;
}

// Create Completed Goal Item
function createCompletedGoalItem(goal) {
    return `
        <div class="completed-goal flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg mb-2">
            <div class="flex items-center">
                <i data-lucide="trophy" class="w-4 h-4 text-yellow-500 mr-2"></i>
                <div>
                    <h4 class="text-sm font-medium text-brand-text-primary">${goal.title}</h4>
                    <p class="text-xs text-brand-text-secondary">Target: ${goal.target}</p>
                </div>
            </div>
            <div class="text-xs text-brand-text-secondary">
                Completed on ${goal.completedDate}
            </div>
        </div>
    `;
}

// Render Assessment Section
function renderAssessmentSection(assessmentData) {
    const assessmentContainer = document.querySelector('#goals-content .grid > div:last-child');
    if (!assessmentContainer) return;
    
    assessmentContainer.innerHTML = `
        <h2 class="text-lg font-semibold text-brand-text-primary mb-4">Body Assessment</h2>
        <div class="space-y-5">
            <!-- Weight Tracker Card -->
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-medium text-brand-text-primary flex items-center">
                        <i data-lucide="scale" class="w-4 h-4 mr-2 text-brand-lime"></i>
                        Weight Tracker
                    </h3>
                    <span class="text-xs text-brand-text-secondary">Last updated: ${formatDate(assessmentData.lastUpdated)}</span>
                </div>
                
                <div class="weight-chart h-32 bg-gray-50 rounded-lg mb-3 relative overflow-hidden">
                    ${createWeightChart(assessmentData.weight)}
                </div>
                
                <div class="flex justify-between items-center">
                    <div class="text-sm">
                        <span class="text-brand-text-secondary">Current:</span>
                        <span class="font-medium text-brand-text-primary">${assessmentData.weight[assessmentData.weight.length - 1].value} lbs</span>
                    </div>
                    <div class="text-sm">
                        <span class="text-brand-text-secondary">Target:</span>
                        <span class="font-medium text-green-600">165 lbs</span>
                    </div>
                    <button class="text-xs bg-brand-lime text-brand-text-primary py-1 px-3 rounded-lg" onclick="showUpdateWeightModal()">
                        Update
                    </button>
                </div>
            </div>
            
            <!-- Body Metrics Card -->
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-medium text-brand-text-primary flex items-center">
                        <i data-lucide="ruler" class="w-4 h-4 mr-2 text-brand-lime"></i>
                        Body Measurements
                    </h3>
                    <button class="text-xs bg-brand-lime text-brand-text-primary py-1 px-3 rounded-lg" onclick="showUpdateMeasurementsModal()">
                        Update
                    </button>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    ${createMeasurementsGrid(assessmentData.metrics)}
                </div>
            </div>
            
            <!-- Body Fat Card -->
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-medium text-brand-text-primary flex items-center">
                        <i data-lucide="activity" class="w-4 h-4 mr-2 text-brand-lime"></i>
                        Body Fat Percentage
                    </h3>
                    <button class="text-xs bg-brand-lime text-brand-text-primary py-1 px-3 rounded-lg" onclick="showUpdateBodyFatModal()">
                        Update
                    </button>
                </div>
                
                <div class="flex items-center">
                    <div class="w-16 h-16 rounded-full bg-brand-lime bg-opacity-20 flex items-center justify-center mr-4">
                        <span class="text-xl font-bold text-brand-text-primary">${assessmentData.bodyFat[assessmentData.bodyFat.length - 1].value}%</span>
                    </div>
                    <div class="text-sm text-brand-text-secondary">
                        <p>Current body fat percentage</p>
                        <p class="mt-1">Down ${assessmentData.bodyFat[0].value - assessmentData.bodyFat[assessmentData.bodyFat.length - 1].value}% from initial measurement</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

// Create Weight Chart
function createWeightChart(weightData) {
    // Simple visual representation of weight data
    const minWeight = Math.min(...weightData.map(d => d.value));
    const maxWeight = Math.max(...weightData.map(d => d.value));
    const range = maxWeight - minWeight;
    
    let lines = '';
    for (let i = 0; i < weightData.length - 1; i++) {
        const x1 = (i / (weightData.length - 1)) * 100;
        const x2 = ((i + 1) / (weightData.length - 1)) * 100;
        const y1 = 100 - (((weightData[i].value - minWeight) / (range || 1)) * 80 + 10);
        const y2 = 100 - (((weightData[i+1].value - minWeight) / (range || 1)) * 80 + 10);
        
        lines += `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" stroke="#D4FF4F" stroke-width="2" />`;
    }
    
    let points = '';
    weightData.forEach((d, i) => {
        const x = (i / (weightData.length - 1)) * 100;
        const y = 100 - (((d.value - minWeight) / (range || 1)) * 80 + 10);
        points += `
            <circle cx="${x}%" cy="${y}%" r="3" fill="#D4FF4F" stroke="white" stroke-width="1" />
        `;
    });
    
    return `
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${lines}
            ${points}
        </svg>
        <div class="absolute bottom-1 left-2 text-xs text-gray-400">${minWeight} lbs</div>
        <div class="absolute top-1 left-2 text-xs text-gray-400">${maxWeight} lbs</div>
    `;
}

// Create Measurements Grid
function createMeasurementsGrid(metrics) {
    return Object.entries(metrics).map(([key, value]) => `
        <div class="bg-gray-50 rounded-lg p-3 text-center">
            <div class="text-xs text-brand-text-secondary mb-1">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
            <div class="font-medium text-brand-text-primary">${value} in</div>
        </div>
    `).join('');
}

// Modal Functions - These would be connected to actual modals in a real implementation
function showAddGoalModal() {
    addGoalModal(); // Use the actual modal function
}

function toggleGoalOptions(goalId) {
    showNotification(`Options for goal #${goalId}`, 'info');
}

function showUpdateWeightModal() {
    showNotification('Update Weight feature coming soon!', 'info');
}

function showUpdateMeasurementsModal() {
    showNotification('Update Measurements feature coming soon!', 'info');
}

function showUpdateBodyFatModal() {
    showNotification('Update Body Fat feature coming soon!', 'info');
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

// Format calendar date
function formatCalendarDate(date) {
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

// Close workout modal
function closeWorkoutModal() {
    const modal = document.getElementById('workout-modal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Status configuration for planner cards
function getStatusConfig(status) {
    const configs = {
        completed: {
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
            label: 'Completed',
            textColor: 'text-green-600'
        },
        upcoming: {
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            label: 'Upcoming', 
            textColor: 'text-yellow-600'
        },
        rest: {
            bgColor: 'bg-gray-100',
            iconColor: 'text-gray-600',
            label: 'Rest Day',
            textColor: 'text-gray-600'
        }
    };
    return configs[status] || configs.upcoming;
}

// Get status-based class for styling
function getStatusClass(status) {
    const classes = {
        completed: 'border-green-200 hover:border-green-300',
        upcoming: 'border-yellow-200 hover:border-yellow-300',
        rest: 'border-gray-200 hover:border-gray-300'
    };
    return classes[status] || classes.upcoming;
}

// Create Goals Content with Linked Measurements
function createGoalsContent() {
    return `
        <!-- Goals & Targets Section (Now as separate card) -->
        <div class="bg-brand-surface rounded-xl p-5 shadow-lg border border-gray-100 mb-6">
            <div class="flex items-center mb-4">
                <div class="bg-brand-lime/20 p-2 rounded-lg mr-3">
                    <i data-lucide="target" class="w-5 h-5 text-brand-lime"></i>
                </div>
                <h2 class="text-lg font-semibold text-brand-text-primary">Goals & Targets</h2>
            </div>
            
            <div class="space-y-5">
                <!-- Current Goals -->
                <div class="mb-6">
                    <h3 class="text-md font-medium mb-3">Current Goals</h3>
                    
                    <div class="space-y-3 md:space-y-4">
                        <!-- Goal 1: Weight Loss -->
                        <div class="goal-card bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                            <div class="flex flex-wrap sm:flex-nowrap justify-between items-start">
                                <div class="w-full sm:w-auto mb-2 sm:mb-0">
                                    <div class="flex items-center">
                                        <i data-lucide="scale" class="w-4 h-4 mr-2 text-brand-lime"></i>
                                        <h4 class="font-medium text-brand-text-primary">Weight Loss</h4>
                                    </div>
                                    <p class="text-sm text-brand-text-secondary">Target: 165 lbs</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full mr-2">
                                        In Progress
                                    </div>
                                    <button class="p-1.5 hover:bg-gray-100 rounded-full" onclick="editGoalModal(1)">
                                        <i data-lucide="pencil" class="w-3.5 h-3.5 text-gray-500"></i>
                                    </button>
                                    <button class="p-1.5 hover:bg-gray-100 rounded-full" onclick="deleteGoalModal(1)">
                                        <i data-lucide="trash" class="w-3.5 h-3.5 text-gray-500"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-3">
                                <div class="flex justify-between items-center text-xs text-brand-text-secondary mb-1">
                                    <span>Progress</span>
                                    <span>45%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-brand-lime h-2 rounded-full" style="width: 45%"></div>
                                </div>
                            </div>
                            
                            <div class="text-xs text-brand-text-secondary mt-3 flex flex-wrap justify-between">
                                <span>Current: 176 lbs</span>
                                <span>Target: June 30, 2024</span>
                            </div>
                        </div>
                        
                        <!-- Goal 2: Waist Measurement -->
                        <div class="goal-card bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                            <div class="flex flex-wrap sm:flex-nowrap justify-between items-start">
                                <div class="w-full sm:w-auto mb-2 sm:mb-0">
                                    <div class="flex items-center">
                                        <i data-lucide="ruler" class="w-4 h-4 mr-2 text-brand-lime"></i>
                                        <h4 class="font-medium text-brand-text-primary">Waist Measurement</h4>
                                    </div>
                                    <p class="text-sm text-brand-text-secondary">Target: 32 inches</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mr-2">
                                        On Track
                                    </div>
                                    <button class="p-1.5 hover:bg-gray-100 rounded-full" onclick="editGoalModal(2)">
                                        <i data-lucide="pencil" class="w-3.5 h-3.5 text-gray-500"></i>
                                    </button>
                                    <button class="p-1.5 hover:bg-gray-100 rounded-full" onclick="deleteGoalModal(2)">
                                        <i data-lucide="trash" class="w-3.5 h-3.5 text-gray-500"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-3">
                                <div class="flex justify-between items-center text-xs text-brand-text-secondary mb-1">
                                    <span>Progress</span>
                                    <span>50%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-brand-lime h-2 rounded-full" style="width: 50%"></div>
                                </div>
                            </div>
                            
                            <div class="text-xs text-brand-text-secondary mt-3 flex flex-wrap justify-between">
                                <span>Current: 34 inches</span>
                                <span>Target: May 15, 2024</span>
                            </div>
                        </div>
                        
                        <!-- Goal 3: Weight Gain (Muscle) -->
                        <div class="goal-card bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                            <div class="flex flex-wrap sm:flex-nowrap justify-between items-start">
                                <div class="w-full sm:w-auto mb-2 sm:mb-0">
                                    <div class="flex items-center">
                                        <i data-lucide="dumbbell" class="w-4 h-4 mr-2 text-brand-lime"></i>
                                        <h4 class="font-medium text-brand-text-primary">Arm Size</h4>
                                    </div>
                                    <p class="text-sm text-brand-text-secondary">Target: 16 inches</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2">
                                        Muscle Gain
                                    </div>
                                    <button class="p-1.5 hover:bg-gray-100 rounded-full" onclick="editGoalModal(3)">
                                        <i data-lucide="pencil" class="w-3.5 h-3.5 text-gray-500"></i>
                                    </button>
                                    <button class="p-1.5 hover:bg-gray-100 rounded-full" onclick="deleteGoalModal(3)">
                                        <i data-lucide="trash" class="w-3.5 h-3.5 text-gray-500"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-3">
                                <div class="flex justify-between items-center text-xs text-brand-text-secondary mb-1">
                                    <span>Progress</span>
                                    <span>40%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 40%"></div>
                                </div>
                            </div>
                            
                            <div class="text-xs text-brand-text-secondary mt-3 flex flex-wrap justify-between">
                                <span>Current: 14 inches</span>
                                <span>Target: August 15, 2024</span>
                            </div>
                        </div>
                        
                        <!-- Goal 4: Custom Goal -->
                        <div class="goal-card bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                            <div class="flex flex-wrap sm:flex-nowrap justify-between items-start">
                                <div class="w-full sm:w-auto mb-2 sm:mb-0">
                                    <div class="flex items-center">
                                        <i data-lucide="timer" class="w-4 h-4 mr-2 text-brand-lime"></i>
                                        <h4 class="font-medium text-brand-text-primary">Strength Training</h4>
                                    </div>
                                    <p class="text-sm text-brand-text-secondary">Target: 3x weekly</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mr-2">
                                        On Track
                                    </div>
                                    <button class="p-1.5 hover:bg-gray-100 rounded-full" onclick="editGoalModal(4)">
                                        <i data-lucide="pencil" class="w-3.5 h-3.5 text-gray-500"></i>
                                    </button>
                                    <button class="p-1.5 hover:bg-gray-100 rounded-full" onclick="deleteGoalModal(4)">
                                        <i data-lucide="trash" class="w-3.5 h-3.5 text-gray-500"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-3">
                                <div class="flex justify-between items-center text-xs text-brand-text-secondary mb-1">
                                    <span>Progress</span>
                                    <span>80%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-brand-lime h-2 rounded-full" style="width: 80%"></div>
                                </div>
                            </div>
                            
                            <div class="text-xs text-brand-text-secondary mt-3 flex flex-wrap justify-between">
                                <span>Started: January 5, 2024</span>
                                <span>Target: Ongoing</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Completed Goals -->
                <div class="completed-goals mt-5 pt-4 border-t border-gray-200">
                    <h3 class="text-md font-medium mb-3 flex items-center">
                        <i data-lucide="check-circle" class="w-4 h-4 mr-2 text-green-500"></i>
                        Completed Goals
                    </h3>
                    <div class="completed-goal flex flex-wrap sm:flex-nowrap items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                            <i data-lucide="trophy" class="w-4 h-4 text-yellow-500 mr-2"></i>
                            <div>
                                <h4 class="text-sm font-medium text-brand-text-primary">Drink More Water</h4>
                                <p class="text-xs text-brand-text-secondary">Target: 2L daily</p>
                            </div>
                        </div>
                        <div class="flex w-full sm:w-auto justify-between sm:justify-end items-center">
                            <div class="text-xs text-brand-text-secondary">
                                Completed on March 1, 2024
                            </div>
                            <button class="p-1.5 hover:bg-gray-100 rounded-full ml-2" onclick="deleteCompletedGoalModal(4)">
                                <i data-lucide="trash" class="w-3.5 h-3.5 text-gray-500"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Add Goal Button -->
                <div class="add-goal-section mt-5 pt-4">
                    <button class="w-full py-3 px-4 bg-brand-lime text-brand-text-primary rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center" onclick="addGoalModal()">
                        <i data-lucide="plus" class="w-4 h-4 mr-2"></i>
                        Add New Goal
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    
    // Set classes based on type
    let bgColor = 'bg-green-500';
    let icon = 'check-circle';
    
    switch(type) {
        case 'error':
            bgColor = 'bg-red-500';
            icon = 'alert-circle';
            break;
        case 'info':
            bgColor = 'bg-blue-500';
            icon = 'info';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            icon = 'alert-triangle';
            break;
    }
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50 transform transition-all duration-300 translate-x-full opacity-0`;
    
    // Set HTML content
    notification.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5 mr-2"></i>
        <span>${message}</span>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Initialize icon
    lucide.createIcons();
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
    }, 10);
    
    // Animate out after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Create Assessment Content
function createAssessmentContent() {
    return `
        <!-- Body Assessment Section (With dedicated card) -->
        <div class="bg-brand-surface rounded-xl p-5 shadow-lg border border-gray-100 mb-6">
            <div class="flex items-center mb-4">
                <div class="bg-blue-100 p-2 rounded-lg mr-3">
                    <i data-lucide="activity" class="w-5 h-5 text-blue-600"></i>
                </div>
                <h2 class="text-lg font-semibold text-brand-text-primary">Body Assessment</h2>
            </div>
            
            <div class="space-y-5">
                <!-- Weight Tracker Card -->
                <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                    <div class="flex flex-wrap sm:flex-nowrap justify-between items-start mb-3 sm:mb-4">
                        <h3 class="font-medium text-brand-text-primary flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                            <i data-lucide="scale" class="w-4 h-4 mr-2 text-brand-lime"></i>
                            Weight Tracker
                        </h3>
                        <div class="flex items-center justify-between w-full sm:w-auto">
                            <button class="text-xs bg-gray-100 text-brand-text-secondary py-1 px-2 rounded-lg mr-2" onclick="viewWeightHistory()">
                                <i data-lucide="history" class="w-3 h-3 mr-1 inline"></i> History
                            </button>
                            <span class="text-xs text-brand-text-secondary">Last: Mar 15</span>
                            <button class="ml-3 text-xs bg-brand-lime text-brand-text-primary py-1 px-2 sm:px-3 rounded-lg" onclick="updateWeightModal()">
                                Update
                            </button>
                        </div>
                    </div>
                    
                    <div class="weight-chart h-24 sm:h-32 bg-gray-50 rounded-lg mb-3 p-2 flex items-end">
                        <div class="w-1/6 h-[50%] bg-brand-lime rounded-md mx-0.5"></div>
                        <div class="w-1/6 h-[55%] bg-brand-lime rounded-md mx-0.5"></div>
                        <div class="w-1/6 h-[60%] bg-brand-lime rounded-md mx-0.5"></div>
                        <div class="w-1/6 h-[65%] bg-brand-lime rounded-md mx-0.5"></div>
                        <div class="w-1/6 h-[70%] bg-brand-lime rounded-md mx-0.5"></div>
                        <div class="w-1/6 h-[75%] bg-brand-lime rounded-md mx-0.5"></div>
                    </div>
                    
                    <div class="flex justify-between items-center flex-wrap sm:flex-nowrap">
                        <div class="text-sm mb-2 sm:mb-0">
                            <span class="text-brand-text-secondary">Current:</span>
                            <span class="font-medium text-brand-text-primary">176 lbs</span>
                        </div>
                        <div class="text-sm mb-2 sm:mb-0">
                            <span class="text-brand-text-secondary">Target:</span>
                            <span class="font-medium text-green-600">165 lbs</span>
                        </div>
                        <div class="text-sm text-green-600">
                            <span>-9 lbs</span>
                            <span class="text-xs text-brand-text-secondary">since Jan 1</span>
                        </div>
                    </div>
                </div>
                
                <!-- Body Metrics Card -->
                <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                    <div class="flex flex-wrap sm:flex-nowrap justify-between items-start mb-3 sm:mb-4">
                        <h3 class="font-medium text-brand-text-primary flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                            <i data-lucide="ruler" class="w-4 h-4 mr-2 text-brand-lime"></i>
                            Body Measurements
                        </h3>
                        <div class="flex items-center">
                            <button class="text-xs bg-gray-100 text-brand-text-secondary py-1 px-2 rounded-lg mr-2" onclick="viewMeasurementsHistory()">
                                <i data-lucide="history" class="w-3 h-3 mr-1 inline"></i> History
                            </button>
                            <button class="text-xs bg-brand-lime text-brand-text-primary py-1 px-2 sm:px-3 rounded-lg" onclick="updateMeasurementsModal()">
                                Update
                            </button>
                        </div>
                    </div>
                    
                    <div id="measurements-container" class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        <div class="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
                            <div class="text-xs text-brand-text-secondary mb-1">Chest</div>
                            <div class="font-medium text-brand-text-primary">40 in</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
                            <div class="text-xs text-brand-text-secondary mb-1">Waist</div>
                            <div class="font-medium text-brand-text-primary">34 in</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
                            <div class="text-xs text-brand-text-secondary mb-1">Hips</div>
                            <div class="font-medium text-brand-text-primary">38 in</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
                            <div class="text-xs text-brand-text-secondary mb-1">Thighs</div>
                            <div class="font-medium text-brand-text-primary">22 in</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-2 sm:p-3 text-center">
                            <div class="text-xs text-brand-text-secondary mb-1">Arms</div>
                            <div class="font-medium text-brand-text-primary">14 in</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-2 sm:p-3 text-center cursor-pointer hover:bg-gray-100" onclick="addMeasurementModal()">
                            <div class="h-full flex items-center justify-center">
                                <i data-lucide="plus" class="w-5 h-5 text-brand-text-secondary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize Goal Modals
function initializeGoalsModals() {
    // Add HTML for modals to the page
    if (!document.getElementById('goal-modals-container')) {
        const modalsContainer = document.createElement('div');
        modalsContainer.id = 'goal-modals-container';
        document.body.appendChild(modalsContainer);
        
        // Add modal HTML
        modalsContainer.innerHTML = `
            <!-- Add Goal Modal -->
            <div id="add-goal-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
                <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-brand-text-primary">Add New Goal</h3>
                            <button class="close-modal p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                            </button>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6">
                            <form id="add-goal-form" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Goal Type</label>
                                    <select id="goal-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                        <option value="weight">Weight Goal</option>
                                        <option value="measurement">Measurement Goal</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Goal Title</label>
                                    <input type="text" id="goal-title" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Lose Weight">
                                </div>
                                
                                <div id="weight-goal-fields" class="hidden">
                                    <div class="flex space-x-2 mb-3">
                                        <div class="w-1/2">
                                            <label class="block text-sm font-medium text-brand-text-secondary mb-2">Target Weight</label>
                                            <input type="number" id="target-weight" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="170">
                                        </div>
                                        <div class="w-1/2">
                                            <label class="block text-sm font-medium text-brand-text-secondary mb-2">Goal Type</label>
                                            <select id="weight-goal-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                                <option value="lose">Weight Loss</option>
                                                <option value="gain">Weight Gain</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div id="measurement-goal-fields" class="hidden">
                                    <div class="flex space-x-2 mb-3">
                                        <div class="w-1/2">
                                            <label class="block text-sm font-medium text-brand-text-secondary mb-2">Measurement</label>
                                            <select id="measurement-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                                <option value="">Select a measurement</option>
                                                <option value="chest">Chest</option>
                                                <option value="waist">Waist</option>
                                                <option value="hips">Hips</option>
                                                <option value="thighs">Thighs</option>
                                                <option value="arms">Arms</option>
                                            </select>
                                        </div>
                                        <div class="w-1/2">
                                            <label class="block text-sm font-medium text-brand-text-secondary mb-2">Target Value</label>
                                            <div class="flex">
                                                <input type="number" id="target-measurement" class="w-full px-3 py-2 border border-gray-300 rounded-l-lg" placeholder="32">
                                                <span class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-lg">in</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Custom goal fields removed -->
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Target Date</label>
                                    <input type="date" id="goal-date" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                </div>
                                
                                <div class="pt-4 border-t border-gray-200">
                                    <button type="button" class="w-full py-3 px-4 bg-brand-lime text-brand-text-primary rounded-lg font-medium" onclick="saveNewGoal()">
                                        Add Goal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Delete Goal Modal -->
            <div id="delete-goal-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
                <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-brand-text-primary">Delete Goal</h3>
                            <button class="close-modal p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                            </button>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6">
                            <p class="text-center mb-6">Are you sure you want to delete this goal? This action cannot be undone.</p>
                            
                            <div class="flex space-x-4">
                                <button class="w-1/2 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium close-modal">
                                    Cancel
                                </button>
                                <button class="w-1/2 py-3 px-4 bg-red-500 text-white rounded-lg font-medium" onclick="confirmDeleteGoal()">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Edit Goal Modal -->
                                        <div id="edit-goal-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
                <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-brand-text-primary">Edit Goal</h3>
                            <button class="close-modal p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                            </button>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6">
                            <form id="edit-goal-form" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Goal Title</label>
                                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg" id="edit-goal-title">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Target</label>
                                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg" id="edit-goal-target">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Target Date</label>
                                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg" id="edit-goal-date">
                                </div>
                                
                                <!-- Progress info removed as requested -->
                                
                                <div class="pt-4 border-t border-gray-200">
                                    <button type="button" class="w-full py-3 px-4 bg-brand-lime text-brand-text-primary rounded-lg font-medium" onclick="saveEditedGoal()">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Update Weight Modal -->
            <div id="update-weight-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
                <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-brand-text-primary">Update Weight</h3>
                            <button class="close-modal p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                            </button>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6">
                            <form class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Current Weight (lbs)</label>
                                    <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="176">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Weight Goal Type</label>
                                    <div class="flex space-x-2">
                                        <label class="flex items-center flex-1 p-3 border rounded-lg cursor-pointer">
                                            <input type="radio" name="weight-goal" value="lose" class="mr-2" checked>
                                            <span>Weight Loss</span>
                                        </label>
                                        <label class="flex items-center flex-1 p-3 border rounded-lg cursor-pointer">
                                            <input type="radio" name="weight-goal" value="gain" class="mr-2">
                                            <span>Weight Gain</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Target Weight (lbs)</label>
                                    <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="165">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Date</label>
                                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                </div>
                                
                                <div class="pt-4 border-t border-gray-200">
                                    <button type="button" class="w-full py-3 px-4 bg-brand-lime text-brand-text-primary rounded-lg font-medium" onclick="saveWeight()">
                                        Save Weight
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Weight History Modal -->
            <div id="weight-history-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
                <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-brand-text-primary">Weight History</h3>
                            <button class="close-modal p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                            </button>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6">
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 15, 2024</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">176 lbs</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">-2 lbs</td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 1, 2024</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">178 lbs</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">-3 lbs</td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Feb 15, 2024</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">181 lbs</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">-2 lbs</td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Feb 1, 2024</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">183 lbs</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">-2 lbs</td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2024</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">185 lbs</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">+0 lbs</td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 1, 2024</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">185 lbs</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Update Measurements Modal -->
            <div id="update-measurements-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
                <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-brand-text-primary">Update Body Measurements</h3>
                            <button class="close-modal p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                            </button>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6">
                            <form id="measurements-form" class="space-y-4">
                                <div id="measurement-fields">
                                    <!-- Existing measurements will be added here -->
                                </div>
                                
                                <div class="pt-2">
                                    <button type="button" class="w-full py-2 px-4 border border-dashed border-gray-300 text-brand-text-secondary rounded-lg font-medium flex items-center justify-center" onclick="addMeasurementField()">
                                        <i data-lucide="plus" class="w-4 h-4 mr-2"></i>
                                        Add New Measurement
                                    </button>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Date</label>
                                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                </div>
                                
                                <div class="pt-4 border-t border-gray-200">
                                    <button type="button" class="w-full py-3 px-4 bg-brand-lime text-brand-text-primary rounded-lg font-medium" onclick="saveMeasurements()">
                                        Save Measurements
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Measurements History Modal -->
            <div id="measurements-history-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
                <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-brand-text-primary">Measurements History</h3>
                            <button class="close-modal p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                            </button>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6">
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-brand-text-secondary mb-2">Select Measurement</label>
                                <select id="history-measurement-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg" onchange="showMeasurementHistory(this.value)">
                                    <option value="chest">Chest</option>
                                    <option value="waist">Waist</option>
                                    <option value="hips">Hips</option>
                                    <option value="thighs">Thighs</option>
                                    <option value="arms">Arms</option>
                                </select>
                            </div>
                            
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Measurement</th>
                                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                        </tr>
                                    </thead>
                                    <tbody id="measurement-history-table" class="bg-white divide-y divide-gray-200">
                                        <!-- History data will be loaded here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Add New Measurement Modal -->
            <div id="add-measurement-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
                <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="bg-brand-surface rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 class="text-lg font-semibold text-brand-text-primary">Add New Measurement</h3>
                            <button class="close-modal p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                            </button>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6">
                            <form class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Measurement Name</label>
                                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Calves, Neck, etc.">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-brand-text-secondary mb-2">Initial Value</label>
                                    <div class="flex">
                                        <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-l-lg" placeholder="0">
                                        <span class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-lg">in</span>
                                    </div>
                                </div>
                                
                                <div class="pt-4 border-t border-gray-200">
                                    <button type="button" class="w-full py-3 px-4 bg-brand-lime text-brand-text-primary rounded-lg font-medium" onclick="saveNewMeasurement()">
                                        Add Measurement
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize icons in modals
        lucide.createIcons();
        
        // Add event listeners for closing modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });
        
        // Add event listener for goal type selection
        const goalTypeSelect = document.getElementById('goal-type');
        if (goalTypeSelect) {
            goalTypeSelect.addEventListener('change', function() {
                const weightFields = document.getElementById('weight-goal-fields');
                const measurementFields = document.getElementById('measurement-goal-fields');
                
                // Hide all fields first
                weightFields.classList.add('hidden');
                measurementFields.classList.add('hidden');
                
                // Show fields based on selection
                if (this.value === 'weight') {
                    weightFields.classList.remove('hidden');
                } else if (this.value === 'measurement') {
                    measurementFields.classList.remove('hidden');
                }
            });
        }
    }
}

// Modal Functions
function addGoalModal() {
    const modal = document.getElementById('add-goal-modal');
    if (modal) {
        // Populate the measurement dropdown with available measurements
        const measurementSelect = document.getElementById('measurement-type');
        if (measurementSelect) {
            // Get assessment data to populate with actual measurements
            const assessmentData = getMockAssessmentData();
            
            // Clear existing options
            measurementSelect.innerHTML = '<option value="">Select a measurement</option>';
            
            // Add options based on available metrics
            for (const [key, value] of Object.entries(assessmentData.metrics)) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                measurementSelect.appendChild(option);
            }
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function editGoalModal(goalId) {
    const modal = document.getElementById('edit-goal-modal');
    if (modal) {
        // In a real app, you would fetch the goal data based on goalId
        // For now, we'll prefill with some mock data
        switch(goalId) {
            case 1:
                document.getElementById('edit-goal-title').value = "Lose Weight";
                document.getElementById('edit-goal-target').value = "10 lbs";
                document.getElementById('edit-goal-date').value = "2024-06-30";
                break;
            case 2:
                document.getElementById('edit-goal-title').value = "Run 5K";
                document.getElementById('edit-goal-target').value = "Under 30 min";
                document.getElementById('edit-goal-date').value = "2024-05-15";
                break;
            case 3:
                document.getElementById('edit-goal-title').value = "Strength Training";
                document.getElementById('edit-goal-target').value = "3x weekly";
                document.getElementById('edit-goal-date').value = "2024-12-31";
                break;
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function deleteGoalModal(goalId) {
    const modal = document.getElementById('delete-goal-modal');
    if (modal) {
        // Store the goalId to use when confirming delete
        modal.setAttribute('data-goal-id', goalId);
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function deleteCompletedGoalModal(goalId) {
    deleteGoalModal(goalId); // Reuse the same modal
}

function updateWeightModal() {
    const modal = document.getElementById('update-weight-modal');
    if (modal) {
        // Pre-select weight loss by default
        const weightLossRadio = modal.querySelector('input[value="lose"]');
        if (weightLossRadio) {
            weightLossRadio.checked = true;
        }
        
        // Get the current weight and target fields
        const currentWeightInput = modal.querySelector('input[type="number"]:first-of-type');
        const targetWeightInput = modal.querySelector('input[placeholder="165"]');
        
        // Populate with current values
        if (currentWeightInput) {
            currentWeightInput.value = 176; // In a real app, this would come from actual data
        }
        
        if (targetWeightInput) {
            targetWeightInput.value = 165; // In a real app, this would come from actual data
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function viewWeightHistory() {
    const modal = document.getElementById('weight-history-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function updateMeasurementsModal() {
    const modal = document.getElementById('update-measurements-modal');
    if (modal) {
        // Populate measurement fields
        const measurementFields = document.getElementById('measurement-fields');
        if (measurementFields) {
            measurementFields.innerHTML = `
                <div class="measurement-input mb-3">
                    <div class="flex justify-between items-center mb-1">
                        <label class="text-sm font-medium text-brand-text-secondary">Chest</label>
                        <button type="button" class="text-xs text-red-500 hover:text-red-700" onclick="removeMeasurementField(this)">Remove</button>
                    </div>
                    <div class="flex">
                        <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-l-lg" value="40">
                        <span class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-lg">in</span>
                    </div>
                </div>
                
                <div class="measurement-input mb-3">
                    <div class="flex justify-between items-center mb-1">
                        <label class="text-sm font-medium text-brand-text-secondary">Waist</label>
                        <button type="button" class="text-xs text-red-500 hover:text-red-700" onclick="removeMeasurementField(this)">Remove</button>
                    </div>
                    <div class="flex">
                        <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-l-lg" value="34">
                        <span class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-lg">in</span>
                    </div>
                </div>
                
                <div class="measurement-input mb-3">
                    <div class="flex justify-between items-center mb-1">
                        <label class="text-sm font-medium text-brand-text-secondary">Hips</label>
                        <button type="button" class="text-xs text-red-500 hover:text-red-700" onclick="removeMeasurementField(this)">Remove</button>
                    </div>
                    <div class="flex">
                        <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-l-lg" value="38">
                        <span class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-lg">in</span>
                    </div>
                </div>
                
                <div class="measurement-input mb-3">
                    <div class="flex justify-between items-center mb-1">
                        <label class="text-sm font-medium text-brand-text-secondary">Thighs</label>
                        <button type="button" class="text-xs text-red-500 hover:text-red-700" onclick="removeMeasurementField(this)">Remove</button>
                    </div>
                    <div class="flex">
                        <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-l-lg" value="22">
                        <span class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-lg">in</span>
                    </div>
                </div>
                
                <div class="measurement-input mb-3">
                    <div class="flex justify-between items-center mb-1">
                        <label class="text-sm font-medium text-brand-text-secondary">Arms</label>
                        <button type="button" class="text-xs text-red-500 hover:text-red-700" onclick="removeMeasurementField(this)">Remove</button>
                    </div>
                    <div class="flex">
                        <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-l-lg" value="14">
                        <span class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-lg">in</span>
                    </div>
                </div>
            `;
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Show Measurement History
function viewMeasurementsHistory() {
    const modal = document.getElementById('measurements-history-modal');
    if (modal) {
        // Show history for the first measurement by default
        showMeasurementHistory('chest');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Show measurement history data
function showMeasurementHistory(measurementType) {
    const historyTable = document.getElementById('measurement-history-table');
    if (historyTable) {
        // Clear current history
        historyTable.innerHTML = '';
        
        // Add mock data based on measurement type
        let mockData;
        switch(measurementType) {
            case 'chest':
                mockData = [
                    { date: 'Mar 15, 2024', value: '40 in', change: '-0.5 in' },
                    { date: 'Mar 1, 2024', value: '40.5 in', change: '-0.5 in' },
                    { date: 'Feb 15, 2024', value: '41 in', change: '-0.5 in' },
                    { date: 'Feb 1, 2024', value: '41.5 in', change: '-0.5 in' },
                    { date: 'Jan 15, 2024', value: '42 in', change: '-0 in' },
                    { date: 'Jan 1, 2024', value: '42 in', change: '-' }
                ];
                break;
            case 'waist':
                mockData = [
                    { date: 'Mar 15, 2024', value: '34 in', change: '-0.5 in' },
                    { date: 'Mar 1, 2024', value: '34.5 in', change: '-0.5 in' },
                    { date: 'Feb 15, 2024', value: '35 in', change: '-0.5 in' },
                    { date: 'Feb 1, 2024', value: '35.5 in', change: '-0.5 in' },
                    { date: 'Jan 15, 2024', value: '36 in', change: '-0 in' },
                    { date: 'Jan 1, 2024', value: '36 in', change: '-' }
                ];
                break;
            case 'hips':
                mockData = [
                    { date: 'Mar 15, 2024', value: '38 in', change: '-0.5 in' },
                    { date: 'Mar 1, 2024', value: '38.5 in', change: '-0.5 in' },
                    { date: 'Feb 15, 2024', value: '39 in', change: '-0 in' },
                    { date: 'Feb 1, 2024', value: '39 in', change: '-0 in' },
                    { date: 'Jan 15, 2024', value: '39 in', change: '-0 in' },
                    { date: 'Jan 1, 2024', value: '39 in', change: '-' }
                ];
                break;
            case 'thighs':
                mockData = [
                    { date: 'Mar 15, 2024', value: '22 in', change: '-0.25 in' },
                    { date: 'Mar 1, 2024', value: '22.25 in', change: '-0.25 in' },
                    { date: 'Feb 15, 2024', value: '22.5 in', change: '-0 in' },
                    { date: 'Feb 1, 2024', value: '22.5 in', change: '-0.25 in' },
                    { date: 'Jan 15, 2024', value: '22.75 in', change: '-0 in' },
                    { date: 'Jan 1, 2024', value: '22.75 in', change: '-' }
                ];
                break;
            case 'arms':
                mockData = [
                    { date: 'Mar 15, 2024', value: '14 in', change: '+0.25 in' },
                    { date: 'Mar 1, 2024', value: '13.75 in', change: '+0.25 in' },
                    { date: 'Feb 15, 2024', value: '13.5 in', change: '+0.25 in' },
                    { date: 'Feb 1, 2024', value: '13.25 in', change: '+0 in' },
                    { date: 'Jan 15, 2024', value: '13.25 in', change: '+0 in' },
                    { date: 'Jan 1, 2024', value: '13.25 in', change: '-' }
                ];
                break;
            default:
                mockData = [];
        }
        
        // Add rows to the table
        mockData.forEach(item => {
            const row = document.createElement('tr');
            
            // Format the change cell
            let changeClass = 'text-gray-500';
            if (item.change.startsWith('+')) {
                changeClass = 'text-blue-600'; // Blue for muscle growth
            } else if (item.change.startsWith('-') && item.change !== '-') {
                changeClass = 'text-green-600'; // Green for fat loss
            }
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.value}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${changeClass}">${item.change}</td>
            `;
            
            historyTable.appendChild(row);
        });
    }
}

function addMeasurementModal() {
    const modal = document.getElementById('add-measurement-modal');
    if (modal) {
        // Reset form fields
        const nameInput = modal.querySelector('input[type="text"]');
        const valueInput = modal.querySelector('input[type="number"]');
        
        if (nameInput) nameInput.value = '';
        if (valueInput) valueInput.value = '';
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('[id$="-modal"]');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = '';
}

// Helper functions for measurements
function addMeasurementField() {
    const measurementFields = document.getElementById('measurement-fields');
    if (measurementFields) {
        const newField = document.createElement('div');
        newField.className = 'measurement-input mb-3';
        newField.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <label class="text-sm font-medium text-brand-text-secondary">
                    <input type="text" class="px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Measurement name">
                </label>
                <button type="button" class="text-xs text-red-500 hover:text-red-700" onclick="removeMeasurementField(this)">Remove</button>
            </div>
            <div class="flex">
                <input type="number" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-l-lg" placeholder="0">
                <span class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-lg">in</span>
            </div>
        `;
        measurementFields.appendChild(newField);
    }
}

function removeMeasurementField(button) {
    const field = button.closest('.measurement-input');
    if (field) {
        field.remove();
    }
}

function showMeasurementHistory(measurementType) {
    const historyTable = document.getElementById('measurement-history-table');
    if (historyTable) {
        // Clear current history
        historyTable.innerHTML = '';
        
        // Add mock data based on measurement type
        let mockData;
        switch(measurementType) {
            case 'chest':
                mockData = [
                    { date: 'Mar 15, 2024', value: '40 in', change: '-0.5 in' },
                    { date: 'Mar 1, 2024', value: '40.5 in', change: '-0.5 in' },
                    { date: 'Feb 15, 2024', value: '41 in', change: '-0.5 in' },
                    { date: 'Feb 1, 2024', value: '41.5 in', change: '-0.5 in' },
                    { date: 'Jan 15, 2024', value: '42 in', change: '-0 in' },
                    { date: 'Jan 1, 2024', value: '42 in', change: '-' }
                ];
                break;
            case 'waist':
                mockData = [
                    { date: 'Mar 15, 2024', value: '34 in', change: '-0.5 in' },
                    { date: 'Mar 1, 2024', value: '34.5 in', change: '-0.5 in' },
                    { date: 'Feb 15, 2024', value: '35 in', change: '-0.5 in' },
                    { date: 'Feb 1, 2024', value: '35.5 in', change: '-0.5 in' },
                    { date: 'Jan 15, 2024', value: '36 in', change: '-0 in' },
                    { date: 'Jan 1, 2024', value: '36 in', change: '-' }
                ];
                break;
            case 'hips':
                mockData = [
                    { date: 'Mar 15, 2024', value: '38 in', change: '-0.5 in' },
                    { date: 'Mar 1, 2024', value: '38.5 in', change: '-0.5 in' },
                    { date: 'Feb 15, 2024', value: '39 in', change: '-0 in' },
                    { date: 'Feb 1, 2024', value: '39 in', change: '-0 in' },
                    { date: 'Jan 15, 2024', value: '39 in', change: '-0 in' },
                    { date: 'Jan 1, 2024', value: '39 in', change: '-' }
                ];
                break;
            case 'thighs':
                mockData = [
                    { date: 'Mar 15, 2024', value: '22 in', change: '-0.25 in' },
                    { date: 'Mar 1, 2024', value: '22.25 in', change: '-0.25 in' },
                    { date: 'Feb 15, 2024', value: '22.5 in', change: '-0 in' },
                    { date: 'Feb 1, 2024', value: '22.5 in', change: '-0.25 in' },
                    { date: 'Jan 15, 2024', value: '22.75 in', change: '-0 in' },
                    { date: 'Jan 1, 2024', value: '22.75 in', change: '-' }
                ];
                break;
            case 'arms':
                mockData = [
                    { date: 'Mar 15, 2024', value: '14 in', change: '+0.25 in' },
                    { date: 'Mar 1, 2024', value: '13.75 in', change: '+0.25 in' },
                    { date: 'Feb 15, 2024', value: '13.5 in', change: '+0.25 in' },
                    { date: 'Feb 1, 2024', value: '13.25 in', change: '+0 in' },
                    { date: 'Jan 15, 2024', value: '13.25 in', change: '+0 in' },
                    { date: 'Jan 1, 2024', value: '13.25 in', change: '-' }
                ];
                break;
            default:
                mockData = [];
        }
        
        // Add rows to the table
        mockData.forEach(item => {
            const row = document.createElement('tr');
            
            // Format the change cell
            let changeClass = 'text-gray-500';
            if (item.change.startsWith('+')) {
                changeClass = 'text-blue-600'; // Blue for muscle growth
            } else if (item.change.startsWith('-') && item.change !== '-') {
                changeClass = 'text-green-600'; // Green for fat loss
            }
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.value}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${changeClass}">${item.change}</td>
            `;
            
            historyTable.appendChild(row);
        });
    }
}

// Save Functions (for demonstration)
function saveNewGoal() {
    showNotification('New goal added successfully!', 'success');
    closeAllModals();
}

function saveEditedGoal() {
    showNotification('Goal updated successfully!', 'success');
    closeAllModals();
}

function confirmDeleteGoal() {
    const modal = document.getElementById('delete-goal-modal');
    const goalId = modal.getAttribute('data-goal-id');
    
    showNotification(`Goal deleted successfully!`, 'success');
    closeAllModals();
}

function saveWeight() {
    const modal = document.getElementById('update-weight-modal');
    if (modal) {
        // In a real app, you would get these values and save them to your data store
        const currentWeight = modal.querySelector('input[type="number"]:first-of-type').value;
        const targetWeight = modal.querySelector('input[placeholder="165"]').value;
        const goalType = modal.querySelector('input[name="weight-goal"]:checked').value;
        
        console.log('Saving weight data:', { currentWeight, targetWeight, goalType });
        
        // Update UI with new values (in a real app)
        const currentWeightElements = document.querySelectorAll('.weight-chart + div .text-brand-text-primary');
        const targetWeightElements = document.querySelectorAll('.weight-chart + div .text-green-600');
        
        currentWeightElements.forEach(el => {
            if (el.textContent.includes('lbs')) {
                el.textContent = `${currentWeight} lbs`;
            }
        });
        
        targetWeightElements.forEach(el => {
            if (el.textContent.includes('lbs')) {
                el.textContent = `${targetWeight} lbs`;
            }
        });
    }
    
    showNotification('Weight updated successfully!', 'success');
    closeAllModals();
}

function saveMeasurements() {
    showNotification('Measurements updated successfully!', 'success');
    closeAllModals();
}

function saveNewMeasurement() {
    showNotification('New measurement added successfully!', 'success');
    closeAllModals();
    
    // In a real app, you would refresh the measurements display
    // For now, we'll just reload the goals content
    loadGoalsContent();
}

// Progress bar update for edit form
document.addEventListener('DOMContentLoaded', function() {
    const progressSlider = document.getElementById('edit-goal-progress');
    const progressValue = document.getElementById('edit-goal-progress-value');
    
    if (progressSlider && progressValue) {
        progressSlider.addEventListener('input', function() {
            progressValue.textContent = this.value + '%';
        });
    }
});

// Tab Navigation
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active-tab'));
        
        // Add active class to clicked tab
        tab.classList.add('active-tab');
        
        // Get the target content id
        const target = tab.getAttribute('data-tab');
        
        // Hide all tab contents
        tabContents.forEach(content => content.classList.add('hidden'));
        
        // Show selected content
        const selectedContent = document.getElementById(target);
        selectedContent.classList.remove('hidden');
        
        // Load appropriate content based on the tab
        if (target === 'planner-content') {
            loadPlannerContent();
        } else if (target === 'logs-content') {
            loadLogsContent();
        } else if (target === 'goals-content') {
            loadGoalsContent();
        }
    });
});

// Workout Notes Functions
function openWorkoutNotes(workoutIndex) {
    const notesContainer = document.getElementById(`workout-notes-container-${workoutIndex}`);
    if (notesContainer) {
        notesContainer.classList.remove('hidden');
    }
}

function closeWorkoutNotes(workoutIndex) {
    const notesContainer = document.getElementById(`workout-notes-container-${workoutIndex}`);
    if (notesContainer) {
        notesContainer.classList.add('hidden');
    }
}

function saveWorkoutNotes(workoutIndex) {
    const textarea = document.getElementById(`workout-notes-textarea-${workoutIndex}`);
    const notesContainer = document.getElementById(`workout-notes-container-${workoutIndex}`);
    const notesButton = document.getElementById(`workout-notes-btn-${workoutIndex}`);
    
    if (textarea) {
        const notes = textarea.value.trim();
        
        if (notes) {
            // Store the notes (you can expand this to save to localStorage or server)
            console.log(`Saving workout notes for workout ${workoutIndex}:`, notes);
            
            // Visual feedback - show success message
            const originalLabel = notesContainer.querySelector('label');
            const originalText = originalLabel.textContent;
            originalLabel.textContent = 'Workout Notes (Saved ✓)';
            originalLabel.className = 'block text-sm font-medium text-green-600 mb-2';
            
            // Update notes button state to show notes are present
            notesButton.className = 'text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors absolute bottom-4 right-6';
            notesButton.innerHTML = '<i data-lucide="pencil" class="w-3 h-3 inline mr-1"></i>View/edit notes';
            lucide.createIcons();
            notesButton.title = 'View/Edit Workout Notes';
            
            // Reset label after 2 seconds
            setTimeout(() => {
                originalLabel.textContent = originalText;
                originalLabel.className = 'block text-sm font-medium text-brand-text-secondary mb-2';
            }, 2000);
            
        } else {
            // Show message if no notes entered
            const originalLabel = notesContainer.querySelector('label');
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

document.addEventListener('DOMContentLoaded', function() {
    const progressSlider = document.getElementById('edit-goal-progress');
    const progressValue = document.getElementById('edit-goal-progress-value');
});