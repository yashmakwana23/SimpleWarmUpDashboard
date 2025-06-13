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
    // Placeholder for calendar functionality
    // This will include calendar widget and workout logs
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