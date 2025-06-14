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

                    <!-- Action Buttons (Icons Only) -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                        <button 
                            onclick="openExerciseNotes('${exerciseId}')"
                            id="notes-btn-${exerciseId}"
                            class="p-2 text-brand-text-secondary hover:text-brand-text-primary hover:bg-gray-100 rounded-md transition-colors"
                            title="Add Notes"
                        >
                            <i data-lucide="sticky-note" class="w-4 h-4"></i>
                        </button>
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
                    
                    <!-- Action Buttons -->
                    <div class="flex items-center gap-2 ml-4">
                        <button 
                            onclick="openExerciseNotes('${exerciseId}')"
                            id="notes-btn-${exerciseId}-tablet"
                            class="p-2 text-brand-text-secondary hover:text-brand-text-primary hover:bg-gray-100 rounded-md transition-colors"
                            title="Add Notes"
                        >
                            <i data-lucide="sticky-note" class="w-4 h-4"></i>
                        </button>
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

                <!-- Action Buttons (Icons Only) -->
                <div class="flex items-center gap-2">
                    <button 
                        onclick="openExerciseNotes('${exerciseId}')"
                        id="notes-btn-${exerciseId}-desktop"
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

    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', closeWorkoutModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeWorkoutModal();
    });
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
    
    // Store current day for status updates (not used now, but kept for future)
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
    
    // Load plan cards
    loadPlanCards();
}

// Load Plan Cards
function loadPlanCards() {
    const planGrid = document.getElementById('plan-cards-grid');
    if (!planGrid) return;
    
    // Get plan data
    const planData = getPlanData();
    
    planGrid.innerHTML = '';
    
    // Create plan cards
    planData.forEach((plan, planIndex) => {
        const planCard = createPlanCard(plan, planIndex);
        planGrid.appendChild(planCard);
    });
    
    lucide.createIcons();
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
        const startDate = new Date(plan.startDate);
        
        // Generate workout days for the plan duration
        for (let day = 0; day < plan.duration; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + day);
            
            const dayOfWeek = currentDate.getDay();
            const isRestDay = dayOfWeek === 0 || (day > 0 && day % 6 === 0); // Sundays and every 6th day
            
            if (isRestDay) {
                dailyWorkouts.push({
                    day: day + 1,
                    date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    dayName: getDayName(dayOfWeek),
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
                
                // Determine status based on current date
                const today = new Date();
                const status = currentDate < today ? 
                    (Math.random() > 0.2 ? "completed" : "missed") : 
                    "upcoming";
                
                dailyWorkouts.push({
                    day: day + 1,
                    date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    dayName: getDayName(dayOfWeek),
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
            missed: dailyWorkouts.filter(d => d.status === "missed").length,
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
    const planCard = document.createElement('div');
    planCard.className = 'bg-brand-surface rounded-2xl shadow-sm border border-gray-100 overflow-hidden';
    planCard.id = `plan-card-${planIndex}`;
    
    planCard.innerHTML = `
        <div class="p-4 md:p-6">
            <!-- Plan Header -->
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="text-base md:text-lg font-bold text-brand-text-primary">${planData.planName}</h3>
                    <p class="text-xs md:text-sm text-brand-text-secondary">${planData.duration} days • ${planData.workoutDays} workout days • ${planData.restDays} rest days</p>
                </div>
                <button class="plan-toggle-btn p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-brand-lime" 
                        onclick="togglePlanCard(${planIndex})">
                    <i data-lucide="chevron-up" class="w-4 md:w-5 h-4 md:h-5 plan-toggle-icon"></i>
                </button>
            </div>
            
            <!-- Plan Stats (Clickable for filtering) -->
            <div class="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                <div class="text-center p-2 md:p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" 
                     onclick="filterPlan(${planIndex}, 'completed')">
                    <div class="text-sm md:text-lg font-bold text-green-600">${planData.completed}</div>
                    <div class="text-xs text-green-600">Completed</div>
                </div>
                <div class="text-center p-2 md:p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors" 
                     onclick="filterPlan(${planIndex}, 'missed')">
                    <div class="text-sm md:text-lg font-bold text-red-600">${planData.missed}</div>
                    <div class="text-xs text-red-600">Missed</div>
                </div>
                <div class="text-center p-2 md:p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors" 
                     onclick="filterPlan(${planIndex}, 'upcoming')">
                    <div class="text-sm md:text-lg font-bold text-yellow-600">${planData.upcoming}</div>
                    <div class="text-xs text-yellow-600">Upcoming</div>
                </div>
            </div>
            
            <!-- Filter indicator -->
            <div class="filter-indicator hidden mb-3">
                <div class="flex items-center justify-between bg-blue-50 rounded-lg p-2">
                    <span class="text-xs md:text-sm text-blue-700">Filter: <span class="filter-text font-medium"></span></span>
                    <button onclick="clearFilter(${planIndex})" class="text-blue-700 hover:text-blue-900">
                        <i data-lucide="x" class="w-3 md:w-4 h-3 md:h-4"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Plan Content (Collapsible) -->
        <div class="plan-card-content border-t border-gray-100">
            <div class="p-2 md:p-3 space-y-1 md:space-y-2 max-h-96 md:max-h-[500px] overflow-y-auto plan-days-container">
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
                        <div class="flex items-center justify-between mb-2">
                            <div>
                                <h4 class="text-sm font-medium text-brand-text-primary">${dayData.dayName}</h4>
                                <p class="text-xs text-brand-text-secondary opacity-75">${dayData.date}</p>
                            </div>
                            ${!dayData.isRestDay ? `<div class="text-xs ${statusConfig.textColor} font-medium">${statusConfig.label}</div>` : ''}
                        </div>
                        
                        ${!dayData.isRestDay ? `
                            <div class="mb-2">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getWorkoutTypeClass(dayData.workoutType)} mb-2">
                                    ${dayData.workoutType}
                                </span>
                            </div>
                            <div class="space-y-1">
                                ${dayData.exercises.slice(0, 4).map(exercise => `
                                    <div class="text-xs text-brand-text-secondary">
                                        • ${exercise.name}
                                    </div>
                                `).join('')}
                                ${dayData.exercises.length > 4 ? `<div class="text-xs text-brand-text-secondary opacity-75">+${dayData.exercises.length - 4} more...</div>` : ''}
                            </div>
                        ` : `
                            <div class="text-sm text-brand-text-secondary">Rest & Recovery</div>
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
                            <div class="flex items-center space-x-2 mb-2">
                                <h4 class="text-sm font-medium text-brand-text-primary">${dayData.dayName}</h4>
                                <span class="text-xs text-brand-text-secondary opacity-75">${dayData.date}</span>
                                ${!dayData.isRestDay ? `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getWorkoutTypeClass(dayData.workoutType)}">${dayData.workoutType}</span>` : ''}
                            </div>
                            
                            ${!dayData.isRestDay ? `
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-1 text-xs text-brand-text-secondary">
                                    ${dayData.exercises.map(exercise => `
                                        <div class="flex items-center">
                                            <span class="truncate">• ${exercise.name}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="mt-2 text-xs text-brand-text-secondary opacity-75">
                                    Total: ${dayData.estimatedTime} • ${dayData.totalExercises} exercises
                                </div>
                            ` : `
                                <div class="text-sm text-brand-text-secondary">Rest & Recovery</div>
                            `}
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 ml-4">
                        ${!dayData.isRestDay ? `
                            <div class="text-xs ${statusConfig.textColor} font-medium">${statusConfig.label}</div>
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
        planCard.classList.remove('hidden');
        toggleBtn.classList.add('bg-brand-lime');
        toggleIcon.setAttribute('data-lucide', 'chevron-up');
    } else {
        planCard.classList.add('hidden');
        toggleBtn.classList.remove('bg-brand-lime');
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
        if (status === 'missed') return day.status === 'missed';
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
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                    <h3 class="text-xl font-bold text-brand-text-primary">${dayData.dayName}, ${dayData.date}</h3>
                    <p class="text-sm text-brand-text-secondary mt-1">${dayData.workoutType}</p>
                </div>
                <button onclick="closeDayDetailsModal()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <i data-lucide="x" class="w-5 h-5 text-brand-text-secondary"></i>
                </button>
            </div>

            <!-- Modal Content -->
            <div class="p-6">
                <!-- Workout Info -->
                <div class="mb-6">
                    <div class="flex items-center space-x-4 mb-4">
                        <div class="flex items-center space-x-2">
                            <i data-lucide="clock" class="w-4 h-4 text-brand-text-secondary"></i>
                            <span class="text-sm text-brand-text-secondary">${dayData.estimatedTime}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <i data-lucide="activity" class="w-4 h-4 text-brand-text-secondary"></i>
                            <span class="text-sm text-brand-text-secondary">${dayData.totalExercises} exercises</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full ${getStatusConfig(dayData.status).bgColor.replace('bg-', '')} bg-opacity-20"></div>
                            <span class="text-sm font-medium ${getStatusConfig(dayData.status).textColor}">${getStatusConfig(dayData.status).label}</span>
                        </div>
                    </div>
                </div>

                <!-- Exercise List -->
                <div class="space-y-4">
                    <h4 class="font-semibold text-brand-text-primary mb-3">Exercise Details</h4>
                    ${dayData.exercises.map((exercise, index) => `
                        <div class="bg-gray-50 rounded-xl p-4">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex-1">
                                    <h5 class="font-medium text-brand-text-primary">${exercise.name}</h5>
                                    <p class="text-sm text-brand-text-secondary">${exercise.subtitle}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span class="text-brand-text-secondary block">Sets</span>
                                    <span class="font-medium text-brand-text-primary">${exercise.targetSets}</span>
                                </div>
                                <div>
                                    <span class="text-brand-text-secondary block">Reps</span>
                                    <span class="font-medium text-brand-text-primary">${exercise.targetReps}</span>
                                </div>
                                <div>
                                    <span class="text-brand-text-secondary block">Weight</span>
                                    <span class="font-medium text-brand-text-primary">${exercise.targetWeight}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                    ${dayData.status === 'upcoming' ? `
                        <button class="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            <i data-lucide="check" class="w-4 h-4 mr-2 inline"></i>
                            Mark as Completed
                        </button>
                        <button class="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                            <i data-lucide="x" class="w-4 h-4 mr-2 inline"></i>
                            Mark as Missed
                        </button>
                    ` : `
                        <button class="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            <i data-lucide="edit" class="w-4 h-4 mr-2 inline"></i>
                            Edit Workout
                        </button>
                    `}
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