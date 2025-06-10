document.addEventListener('DOMContentLoaded', function () {

    // --- Elements ---
    const calendarToggleBtn = document.getElementById('calendar-toggle-btn');
    const mobileCalendarBtn = document.getElementById('mobile-calendar-btn');
    const rightSidebar = document.getElementById('right-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const calendarActiveIndicator = document.getElementById('calendar-active-indicator');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const leftSidebar = document.getElementById('left-sidebar');
    const leftSidebarToggle = document.getElementById('left-sidebar-toggle');

    // --- State Management ---
    let isRightSidebarOpen = false;
    let isLeftSidebarOpen = false;

    // --- Helper Functions ---
    function closeAllSidebars() {
        // Close right sidebar
        if (rightSidebar) {
            rightSidebar.classList.add('-right-full');
            rightSidebar.classList.remove('right-0', 'right-4', 'md:right-2', 'lg:right-6');
            isRightSidebarOpen = false;
        }
        // Close left sidebar
        if (leftSidebar) {
            leftSidebar.classList.add('-left-64');
            leftSidebar.classList.remove('left-4');
            isLeftSidebarOpen = false;
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('hidden');
        }
        if (calendarActiveIndicator) {
            calendarActiveIndicator.classList.add('opacity-0');
        }
        document.body.classList.remove('overflow-hidden');
    }

    function openRightSidebar() {
        // Close left sidebar first if open
        if (isLeftSidebarOpen && leftSidebar) {
            leftSidebar.classList.add('-left-64');
            leftSidebar.classList.remove('left-4');
            isLeftSidebarOpen = false;
        }
        
        if (rightSidebar) {
            rightSidebar.classList.remove('-right-full');
            // Different positioning for mobile vs desktop
            if (window.innerWidth < 768) {
                rightSidebar.classList.add('right-0');
            } else {
                rightSidebar.classList.add('right-4', 'md:right-2', 'lg:right-6');
            }
            isRightSidebarOpen = true;
            
            if (calendarActiveIndicator) {
                calendarActiveIndicator.classList.remove('opacity-0');
            }
        }
        
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('hidden');
        }
        document.body.classList.add('overflow-hidden');
    }

    function closeRightSidebar() {
        if (rightSidebar) {
            rightSidebar.classList.add('-right-full');
            rightSidebar.classList.remove('right-0', 'right-4', 'md:right-2', 'lg:right-6');
            isRightSidebarOpen = false;
            
            if (calendarActiveIndicator) {
                calendarActiveIndicator.classList.add('opacity-0');
            }
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('hidden');
        }
        document.body.classList.remove('overflow-hidden');
    }

    function openLeftSidebar() {
        // Close right sidebar first if open
        if (isRightSidebarOpen && rightSidebar) {
            rightSidebar.classList.add('-right-full');
            rightSidebar.classList.remove('right-0', 'right-4', 'md:right-2', 'lg:right-6');
            isRightSidebarOpen = false;
            if (calendarActiveIndicator) {
                calendarActiveIndicator.classList.add('opacity-0');
            }
        }
        
        if (leftSidebar) {
            leftSidebar.classList.remove('-left-64');
            leftSidebar.classList.add('left-4');
            isLeftSidebarOpen = true;
        }
        
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('hidden');
        }
        document.body.classList.add('overflow-hidden');
    }

    function closeLeftSidebar() {
        if (leftSidebar) {
            leftSidebar.classList.add('-left-64');
            leftSidebar.classList.remove('left-4');
            isLeftSidebarOpen = false;
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('hidden');
        }
        document.body.classList.remove('overflow-hidden');
    }

    // --- Right Sidebar (Calendar) Toggle ---
    function toggleRightSidebar(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (isRightSidebarOpen) {
            closeRightSidebar();
        } else {
            openRightSidebar();
        }
    }

    // --- Left Sidebar Toggle ---
    function toggleLeftSidebar(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (isLeftSidebarOpen) {
            closeLeftSidebar();
        } else {
            openLeftSidebar();
        }
    }

    // --- Event Listeners ---
    
    // Desktop calendar button
    if (calendarToggleBtn) {
        calendarToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleRightSidebar(e);
        });
    }

    // Mobile calendar FAB
    if (mobileCalendarBtn) {
        mobileCalendarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleRightSidebar(e);
        });
    }

    // Mobile menu button
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleLeftSidebar(e);
        });
    }

    // Close button
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeRightSidebar();
        });
    }

    // Overlay click - handle properly based on which sidebar is open
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close whichever sidebar is open
            if (isRightSidebarOpen) {
                closeRightSidebar();
            } else if (isLeftSidebarOpen) {
                closeLeftSidebar();
            }
        });

        // Also handle touch events for mobile
        sidebarOverlay.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (isRightSidebarOpen) {
                closeRightSidebar();
            } else if (isLeftSidebarOpen) {
                closeLeftSidebar();
            }
        });
    }

    // --- Left Sidebar (Desktop) Collapse ---
    if (leftSidebar && leftSidebarToggle) {
        const sidebarTexts = leftSidebar.querySelectorAll('.sidebar-text');
        const leftSidebarToggleIcon = leftSidebarToggle.querySelector('i');

        leftSidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // We need to make sure we are not on a mobile screen where the bar is full-width
            if (window.innerWidth > 768) {
                leftSidebar.classList.toggle('w-64');
                leftSidebar.classList.toggle('w-20');

                sidebarTexts.forEach(text => {
                    text.classList.toggle('hidden');
                });

                if (leftSidebarToggleIcon) {
                    leftSidebarToggleIcon.classList.toggle('rotate-180');
                }
            }
        });
    }

    // --- Handle window resize ---
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Desktop: ensure left sidebar is visible and close mobile overlays
            if (leftSidebar) {
                leftSidebar.classList.remove('-left-64', 'left-4');
                isLeftSidebarOpen = false;
            }
            // Adjust right sidebar positioning for desktop if open
            if (rightSidebar && isRightSidebarOpen) {
                rightSidebar.classList.remove('right-0');
                rightSidebar.classList.add('right-4', 'md:right-2', 'lg:right-6');
            } else if (rightSidebar) {
                rightSidebar.classList.add('-right-full');
                rightSidebar.classList.remove('right-0', 'right-4');
            }
            if (sidebarOverlay && !isRightSidebarOpen && !isLeftSidebarOpen) {
                sidebarOverlay.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        } else {
            // Mobile: ensure left sidebar is hidden by default
            if (leftSidebar && !isLeftSidebarOpen) {
                leftSidebar.classList.add('-left-64');
                leftSidebar.classList.remove('left-4');
                leftSidebar.classList.remove('w-20');
                leftSidebar.classList.add('w-64');
                
                // Show all text elements on mobile
                const sidebarTexts = leftSidebar.querySelectorAll('.sidebar-text');
                sidebarTexts.forEach(text => {
                    text.classList.remove('hidden');
                });
                
                // Reset toggle icon
                const leftSidebarToggleIcon = leftSidebarToggle?.querySelector('i');
                if (leftSidebarToggleIcon) {
                    leftSidebarToggleIcon.classList.remove('rotate-180');
                }
            }
            // Adjust right sidebar positioning for mobile if open
            if (rightSidebar && isRightSidebarOpen) {
                rightSidebar.classList.remove('right-4', 'md:right-2', 'lg:right-6');
                rightSidebar.classList.add('right-0');
            } else if (rightSidebar) {
                rightSidebar.classList.add('-right-full');
                rightSidebar.classList.remove('right-0', 'right-4', 'md:right-2', 'lg:right-6');
            }
        }
    });

    // --- Prevent clicks on sidebars from closing them ---
    if (rightSidebar) {
        rightSidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (leftSidebar) {
        leftSidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // --- Set Current Date in Calendar Button ---
    function setCurrentDate() {
        const currentFullDateEl = document.getElementById('current-full-date');
        
        if (currentFullDateEl) {
            const today = new Date();
            
            // Get full date in format "Wednesday, 11 June 2025"
            const options = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            };
            
            currentFullDateEl.textContent = today.toLocaleDateString('en-US', options);
        }
    }

    // --- Calendar Generation ---
    function generateCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const monthYearEl = document.getElementById('month-year');
        if (!calendarGrid || !monthYearEl) return;

        calendarGrid.innerHTML = '';

        const today = new Date(); 
        const month = today.getMonth();
        const year = today.getFullYear();

        monthYearEl.textContent = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDayOfMonth = new Date(year, month, 1);
        
        let dateIterator = new Date(firstDayOfMonth);
        dateIterator.setDate(dateIterator.getDate() - firstDayOfMonth.getDay());

        const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        dayHeaders.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'text-brand-text-secondary font-semibold text-xs';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });

        // Sample data for workout states - only completed and missed
        const currentDate = today.getDate();
        const workoutData = {};
        
        // Add some sample completed and missed workouts for past dates
        for (let i = 1; i < currentDate; i++) {
            if (i % 3 === 0) {
                workoutData[`${year}-${month + 1}-${i}`] = 'completed';
            } else if (i % 5 === 0) {
                workoutData[`${year}-${month + 1}-${i}`] = 'missed';
            }
        }

        for (let i = 0; i < 42; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm relative';
            dayCell.textContent = dateIterator.getDate();

            const dateKey = `${dateIterator.getFullYear()}-${dateIterator.getMonth() + 1}-${dateIterator.getDate()}`;
            const workoutStatus = workoutData[dateKey];

            if (dateIterator.getMonth() !== month) {
                dayCell.classList.add('text-gray-300');
            } else {
                dayCell.classList.add('text-brand-text-primary');
            }
            
            // Apply different styles based on workout status
            if (dateIterator.toDateString() === today.toDateString()) { 
                dayCell.classList.add('bg-brand-lime', 'font-bold');
                dayCell.classList.remove('text-brand-text-primary');
            } else if (workoutStatus === 'completed') {
                dayCell.classList.add('bg-green-100', 'text-green-700', 'font-semibold');
                // Add completed indicator
                const indicator = document.createElement('div');
                indicator.className = 'absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center';
                indicator.innerHTML = '<i data-lucide="check" class="w-2 h-2 text-white"></i>';
                dayCell.appendChild(indicator);
            } else if (workoutStatus === 'missed') {
                dayCell.classList.add('bg-red-100', 'text-red-700', 'font-semibold');
                // Add missed indicator  
                const indicator = document.createElement('div');
                indicator.className = 'absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center';
                indicator.innerHTML = '<i data-lucide="x" class="w-2 h-2 text-white"></i>';
                dayCell.appendChild(indicator);
            } else {
                dayCell.classList.add('hover:bg-gray-100');
            }
            
            calendarGrid.appendChild(dayCell);
            dateIterator.setDate(dateIterator.getDate() + 1);
        }
    }

    // --- Escape key handler ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (isRightSidebarOpen) {
                closeRightSidebar();
            } else if (isLeftSidebarOpen) {
                closeLeftSidebar();
            }
        }
    });

    // --- Initializer ---
    setCurrentDate();
    generateCalendar();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Trigger resize event to set initial state
    window.dispatchEvent(new Event('resize'));
});