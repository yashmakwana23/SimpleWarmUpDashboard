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
    // Placeholder for today's content
    // This will be populated with actual content later
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