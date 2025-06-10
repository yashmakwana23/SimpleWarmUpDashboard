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

    // --- Content Management ---
    function showDashboard() {
        // Hide assessments content
        const assessmentsContent = document.getElementById('assessments-content');
        if (assessmentsContent) {
            assessmentsContent.classList.add('hidden');
        }
        
        // Show dashboard content
        const workoutOptions = document.querySelector('.workout-cards-grid').parentElement;
        const exercisePlayground = document.getElementById('exercise-playground').parentElement;
        if (workoutOptions) workoutOptions.classList.remove('hidden');
        if (exercisePlayground) exercisePlayground.classList.remove('hidden');
        
        // Update navigation active states
        updateNavigation('dashboard');
    }
    
    function showAssessments() {
        // Hide dashboard content
        const workoutOptions = document.querySelector('.workout-cards-grid').parentElement;
        const exercisePlayground = document.getElementById('exercise-playground').parentElement;
        const exerciseDetails = document.getElementById('exercise-details');
        if (workoutOptions) workoutOptions.classList.add('hidden');
        if (exercisePlayground) exercisePlayground.classList.add('hidden');
        if (exerciseDetails) exerciseDetails.classList.add('hidden');
        
        // Show assessments content
        const assessmentsContent = document.getElementById('assessments-content');
        if (assessmentsContent) {
            assessmentsContent.classList.remove('hidden');
        }
        
        // Update navigation active states
        updateNavigation('assessments');
    }
    
    function updateNavigation(activeTab) {
        // Remove active state from all nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('bg-brand-lime');
            item.classList.add('text-brand-text-secondary', 'hover:bg-gray-100');
            item.classList.remove('text-brand-text-primary');
        });
        
        // Add active state to selected nav item
        const activeNav = document.getElementById(`${activeTab}-nav`);
        if (activeNav) {
            activeNav.classList.add('bg-brand-lime');
            activeNav.classList.remove('text-brand-text-secondary', 'hover:bg-gray-100');
            activeNav.classList.add('text-brand-text-primary');
        }
    }

    // --- Event Listeners ---
    
    // Navigation
    const dashboardNav = document.getElementById('dashboard-nav');
    const assessmentsNav = document.getElementById('assessments-nav');
    
    if (dashboardNav) {
        dashboardNav.addEventListener('click', (e) => {
            e.preventDefault();
            showDashboard();
            // Close left sidebar on mobile after navigation
            if (window.innerWidth < 768 && isLeftSidebarOpen) {
                closeLeftSidebar();
            }
        });
    }
    
    if (assessmentsNav) {
        assessmentsNav.addEventListener('click', (e) => {
            e.preventDefault();
            showAssessments();
            // Close left sidebar on mobile after navigation
            if (window.innerWidth < 768 && isLeftSidebarOpen) {
                closeLeftSidebar();
            }
        });
    }
    
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

    // --- Workout Selection and Exercise Management ---
    const workoutOptions = document.querySelectorAll('.workout-option');
    const exerciseDetails = document.getElementById('exercise-details');
    const workoutTitle = document.getElementById('workout-title');
    const exercisesContainer = document.getElementById('exercises-container');
    const backToOptionsBtn = document.getElementById('back-to-options');
    
    // Get the correct workout selection and playground sections
    const workoutSelectionSection = document.querySelector('main > div:first-child'); // First div in main containing workout options
    
    // Find playground section by going up from exercise-playground element
    const exercisePlayground = document.getElementById('exercise-playground');
    const playgroundSection = exercisePlayground?.closest('main > div'); // Find the closest main > div ancestor

    // Exercise data
    const workoutData = {
        strength: {
            title: "Strength Training Workout",
            exercises: [
                {
                    name: "Bench Press",
                    video: "https://www.youtube.com/embed/rT7DgCr-3pg",
                    videoId: "rT7DgCr-3pg"
                },
                {
                    name: "Deadlift",
                    video: "https://www.youtube.com/embed/op9kVnSso6Q", 
                    videoId: "op9kVnSso6Q"
                },
                {
                    name: "Pull-ups",
                    video: "https://www.youtube.com/embed/eGo4IYlbE5g",
                    videoId: "eGo4IYlbE5g"
                },
                {
                    name: "Overhead Press",
                    video: "https://www.youtube.com/embed/qEwKCR5JCog",
                    videoId: "qEwKCR5JCog"
                },
                {
                    name: "Barbell Rows",
                    video: "https://www.youtube.com/embed/FWJR5Ve8bnQ",
                    videoId: "FWJR5Ve8bnQ"
                }
            ]
        },
        cardio: {
            title: "HIIT Cardio Workout",
            exercises: [
                {
                    name: "Burpees",
                    video: "https://www.youtube.com/embed/auBLPXO8Fww",
                    videoId: "auBLPXO8Fww"
                },
                {
                    name: "Mountain Climbers",
                    video: "https://www.youtube.com/embed/kLh-uczlPLg",
                    videoId: "kLh-uczlPLg"
                },
                {
                    name: "Jump Squats",
                    video: "https://www.youtube.com/embed/A-cFYWvaHr0", 
                    videoId: "A-cFYWvaHr0"
                },
                {
                    name: "High Knees",
                    video: "https://www.youtube.com/embed/8opcQdC-V-U",
                    videoId: "8opcQdC-V-U"
                },
                {
                    name: "Plank Jacks",
                    video: "https://www.youtube.com/embed/51U8pDtCekc",
                    videoId: "51U8pDtCekc"
                },
                {
                    name: "Sprint Intervals",
                    video: "https://www.youtube.com/embed/knC7S4VdEps",
                    videoId: "knC7S4VdEps"
                }
            ]
        },
        functional: {
            title: "Functional Movement Workout",
            exercises: [
                {
                    name: "Bodyweight Squats",
                    video: "https://www.youtube.com/embed/aclHkVaku9U",
                    videoId: "aclHkVaku9U"
                },
                {
                    name: "Push-ups",
                    video: "https://www.youtube.com/embed/IODxDxX7oi4",
                    videoId: "IODxDxX7oi4"
                },
                {
                    name: "Lunges",
                    video: "https://www.youtube.com/embed/3XDriUn0udo",
                    videoId: "3XDriUn0udo"
                },
                {
                    name: "Plank",
                    video: "https://www.youtube.com/embed/pSHjTRCQxIw",
                    videoId: "pSHjTRCQxIw"
                }
            ]
        },
        flexibility: {
            title: "Flexibility & Yoga Workout",
            exercises: [
                {
                    name: "Downward Dog",
                    video: "https://www.youtube.com/embed/VpOOcr1KcyU",
                    videoId: "VpOOcr1KcyU"
                },
                {
                    name: "Cat-Cow Stretch",
                    video: "https://www.youtube.com/embed/K9bK0BwKFjs",
                    videoId: "K9bK0BwKFjs"
                },
                {
                    name: "Warrior Pose",
                    video: "https://www.youtube.com/embed/DqYOIcweZY8",
                    videoId: "DqYOIcweZY8"
                },
                {
                    name: "Child's Pose",
                    video: "https://www.youtube.com/embed/2Y1tjU_XkgQ",
                    videoId: "2Y1tjU_XkgQ"
                }
            ]
        }
    };

    // Function to create exercise card
    function createExerciseCard(exercise, index) {
        return `
            <div class="bg-brand-surface rounded-xl md:rounded-2xl shadow-sm p-4 md:p-5">
                <!-- Exercise Name at Top -->
                <div class="mb-4">
                    <h3 class="text-lg md:text-xl font-semibold text-brand-text-primary mb-3">${exercise.name}</h3>
                    <div class="h-px bg-gray-200 w-full"></div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <!-- Video Section -->
                    <div class="relative">
                        <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden relative max-w-xs mx-auto md:max-w-none">
                            <iframe 
                                src="${exercise.video}?rel=0&modestbranding=1&showinfo=0" 
                                title="${exercise.name}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                class="w-full h-full">
                            </iframe>
                        </div>
                    </div>
                    
                    <!-- Input Section -->
                    <div class="space-y-4">
                        <div class="grid grid-cols-3 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-brand-text-secondary mb-2">Weight (lbs)</label>
                                <input type="number" 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-lime focus:border-transparent text-sm" 
                                       placeholder="0"
                                       id="weight-${index}">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-brand-text-secondary mb-2">Sets</label>
                                <input type="number" 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-lime focus:border-transparent text-sm" 
                                       placeholder="0"
                                       id="sets-${index}">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-brand-text-secondary mb-2">Reps</label>
                                <input type="number" 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-lime focus:border-transparent text-sm" 
                                       placeholder="0"
                                       id="reps-${index}">
                            </div>
                        </div>
                        
                        <!-- Progress Tracking -->
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-xs font-medium text-brand-text-secondary">Progress</span>
                                <span class="text-xs text-brand-text-secondary" id="progress-text-${index}">0/0 sets</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-brand-lime h-2 rounded-full transition-all duration-300" id="progress-bar-${index}" style="width: 0%"></div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="grid grid-cols-2 gap-3">
                            <button class="bg-brand-lime hover:bg-yellow-400 text-brand-text-primary font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-sm" onclick="markSetComplete(${index})">
                                Complete Set
                            </button>
                            <button class="bg-gray-200 hover:bg-gray-300 text-brand-text-primary font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-sm" onclick="resetExercise(${index})">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to show workout exercises
    function showWorkoutExercises(workoutType) {
        const workout = workoutData[workoutType];
        
        if (!workout || !workoutTitle || !exercisesContainer || !exerciseDetails) return;

        // Update title
        workoutTitle.textContent = workout.title;
        
        // Generate exercise cards
        exercisesContainer.innerHTML = workout.exercises
            .map((exercise, index) => createExerciseCard(exercise, index))
            .join('');
        
        // Hide workout selection and playground sections, show exercise details
        if (workoutSelectionSection) {
            workoutSelectionSection.classList.add('hidden');
        }
        if (playgroundSection) {
            playgroundSection.classList.add('hidden');
            // Remove any responsive classes that might interfere
            playgroundSection.classList.remove('lg:block');
        }
        exerciseDetails.classList.remove('hidden');
        
        // Re-initialize Lucide icons for new content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Function to go back to workout options
    function showWorkoutOptions() {
        if (!exerciseDetails) return;
        
        // Hide exercise details, show workout selection and playground
        exerciseDetails.classList.add('hidden');
        if (workoutSelectionSection) {
            workoutSelectionSection.classList.remove('hidden');
        }
        if (playgroundSection) {
            playgroundSection.classList.remove('hidden');
            // Restore responsive class
            playgroundSection.classList.add('lg:block');
        }
    }

    // Event listeners for workout options
    workoutOptions.forEach(option => {
        option.addEventListener('click', () => {
            const workoutType = option.dataset.workout;
            showWorkoutExercises(workoutType);
        });
    });

    // Initialize all workout visualizations on page load
    function initializeAllWorkoutVisualizations() {
        console.log('Initializing workout visualizations...');
        Object.keys(visualizationData).forEach(workoutType => {
            console.log(`Generating visualization for: ${workoutType}`);
            generateWorkoutVisualization(workoutType);
        });
    }

    // Event listener for back button
    if (backToOptionsBtn) {
        backToOptionsBtn.addEventListener('click', showWorkoutOptions);
    }

    // Global functions for exercise interaction (accessible from inline onclick)
    window.markSetComplete = function(exerciseIndex) {
        const setsInput = document.getElementById(`sets-${exerciseIndex}`);
        const progressText = document.getElementById(`progress-text-${exerciseIndex}`);
        const progressBar = document.getElementById(`progress-bar-${exerciseIndex}`);
        
        if (!setsInput || !progressText || !progressBar) return;
        
        const totalSets = parseInt(setsInput.value) || 0;
        if (totalSets === 0) {
            alert('Please enter the number of sets first!');
            return;
        }
        
        // Get current completed sets from the progress text
        const currentProgress = progressText.textContent.match(/(\d+)\/\d+/);
        const completedSets = currentProgress ? parseInt(currentProgress[1]) : 0;
        
        if (completedSets < totalSets) {
            const newCompletedSets = completedSets + 1;
            const progressPercentage = (newCompletedSets / totalSets) * 100;
            
            progressText.textContent = `${newCompletedSets}/${totalSets} sets completed`;
            progressBar.style.width = `${progressPercentage}%`;
            
            if (newCompletedSets === totalSets) {
                // Exercise completed
                progressBar.classList.add('bg-green-500');
                progressBar.classList.remove('bg-brand-lime');
                
                // Show completion message
                setTimeout(() => {
                    if (confirm('🎉 Exercise completed! Well done!')) {
                        // Could add logic here to move to next exercise
                    }
                }, 100);
            }
        } else {
            alert('All sets completed for this exercise!');
        }
    };

    window.resetExercise = function(exerciseIndex) {
        const progressText = document.getElementById(`progress-text-${exerciseIndex}`);
        const progressBar = document.getElementById(`progress-bar-${exerciseIndex}`);
        
        if (!progressText || !progressBar) return;
        
        progressText.textContent = '0/0 sets completed';
        progressBar.style.width = '0%';
        progressBar.classList.add('bg-brand-lime');
        progressBar.classList.remove('bg-green-500');
    };

    // --- Dynamic Workout Visualization ---
    
    // Sample workout data for visualization (this would come from backend)
    const visualizationData = {
        strength: [
            { name: 'Bench Press', url: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
            { name: 'Deadlift', url: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
            { name: 'Pull-ups', url: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
            { name: 'Overhead Press', url: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
            { name: 'Barbell Rows', url: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ' }
        ],
        cardio: [
            { name: 'Burpees', url: 'https://www.youtube.com/watch?v=auBLPXO8Fww' },
            { name: 'Jump Squats', url: 'https://www.youtube.com/watch?v=A-cFYWvaHr0' },
            { name: 'High Knees', url: 'https://www.youtube.com/watch?v=8opcQdC-V-U' },
            { name: 'Mt. Climbers', url: 'https://www.youtube.com/watch?v=kLh-uczlPLg' }
        ],
        functional: [
            { name: 'Squats', url: 'https://www.youtube.com/watch?v=aclHkVaku9U' },
            { name: 'Push-ups', url: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
            { name: 'Lunges', url: 'https://www.youtube.com/watch?v=3XDriUn0udo' },
            { name: 'Plank', url: 'https://www.youtube.com/watch?v=pSHjTRCQxIw' }
        ],
        flexibility: [
            { name: 'Downward Dog', url: 'https://www.youtube.com/watch?v=VpOOcr1KcyU' },
            { name: 'Cat-Cow', url: 'https://www.youtube.com/watch?v=K9bK0BwKFjs' },
            { name: 'Warrior Pose', url: 'https://www.youtube.com/watch?v=DqYOIcweZY8' }
        ]
    };

    function generateWorkoutVisualization(workoutType) {
        // This function is no longer needed for individual workout cards
        // The playground will be generated separately
    }

    function createDashedPath(totalCards) {
        // Create a straight vertical line path from top to bottom
        const centerX = 50;
        const startY = 10;
        const endY = 90;
        
        // Simple straight line path
        return `M ${centerX} ${startY} L ${centerX} ${endY}`;
    }

    function getFlowPosition(totalCards, index) {
        // Position cards in a single straight line down the center
        const progress = index / (totalCards - 1);
        const startY = 15;
        const endY = 85;
        const y = startY + (endY - startY) * progress;
        
        // All cards in center line
        const centerX = 50;
        
        return { x: centerX, y };
    }

    function getColorHex(colorName) {
        const colorMap = {
            blue: '#3B82F6',
            red: '#EF4444', 
            green: '#10B981',
            purple: '#8B5CF6'
        };
        return colorMap[colorName] || '#3B82F6';
    }

    function showExercisePopup(exercise, index, workoutType) {
        // Create popup overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        overlay.id = 'exercise-popup-overlay';
        
        // Color scheme
        const colorScheme = {
            strength: 'blue',
            cardio: 'red',
            functional: 'green',
            flexibility: 'purple'
        };
        const color = colorScheme[workoutType] || 'blue';
        
        // Get video ID from URL
        const videoId = exercise.url.includes('youtube.com') ? 
            exercise.url.split('v=')[1]?.split('&')[0] || 
            exercise.url.split('youtu.be/')[1]?.split('?')[0] : '';
        
        overlay.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800">${exercise.name}</h3>
                    <button id="close-popup" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <!-- Content -->
                <div class="p-6 space-y-6">
                    <!-- Video Section -->
                    <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <iframe 
                            src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" 
                            title="${exercise.name}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            class="w-full h-full">
                        </iframe>
                    </div>
                    
                    <!-- Input Section -->
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
                            <input type="number" 
                                   id="popup-weight-${index}"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500" 
                                   placeholder="0">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Sets</label>
                            <input type="number" 
                                   id="popup-sets-${index}"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500" 
                                   placeholder="0">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Reps</label>
                            <input type="number" 
                                   id="popup-reps-${index}"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500" 
                                   placeholder="0">
                        </div>
                    </div>
                    
                    <!-- Progress Section -->
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-gray-700">Progress</span>
                            <span class="text-sm text-gray-600" id="popup-progress-text-${index}">0/0 sets completed</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-${color}-500 h-3 rounded-full transition-all duration-300" id="popup-progress-bar-${index}" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex gap-3">
                        <button id="complete-set-btn-${index}" class="flex-1 bg-${color}-500 hover:bg-${color}-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                            Complete Set
                        </button>
                        <button id="reset-exercise-btn-${index}" class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add event listeners
        document.getElementById('close-popup').addEventListener('click', closeExercisePopup);
        document.getElementById(`complete-set-btn-${index}`).addEventListener('click', () => markPopupSetComplete(index));
        document.getElementById(`reset-exercise-btn-${index}`).addEventListener('click', () => resetPopupExercise(index));
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeExercisePopup();
            }
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeExercisePopup() {
        const overlay = document.getElementById('exercise-popup-overlay');
        if (overlay) {
            overlay.remove();
            document.body.style.overflow = '';
        }
    }

    function markPopupSetComplete(exerciseIndex) {
        const setsInput = document.getElementById(`popup-sets-${exerciseIndex}`);
        const progressText = document.getElementById(`popup-progress-text-${exerciseIndex}`);
        const progressBar = document.getElementById(`popup-progress-bar-${exerciseIndex}`);
        
        if (!setsInput || !progressText || !progressBar) return;
        
        const totalSets = parseInt(setsInput.value) || 0;
        if (totalSets === 0) {
            alert('Please enter the number of sets first!');
            return;
        }
        
        const currentProgress = progressText.textContent.match(/(\d+)\/\d+/);
        const completedSets = currentProgress ? parseInt(currentProgress[1]) : 0;
        
        if (completedSets < totalSets) {
            const newCompletedSets = completedSets + 1;
            const progressPercentage = (newCompletedSets / totalSets) * 100;
            
            progressText.textContent = `${newCompletedSets}/${totalSets} sets completed`;
            progressBar.style.width = `${progressPercentage}%`;
            
            if (newCompletedSets === totalSets) {
                progressBar.classList.remove('bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500');
                progressBar.classList.add('bg-green-500');
                
                setTimeout(() => {
                    if (confirm('🎉 Exercise completed! Well done!')) {
                        closeExercisePopup();
                    }
                }, 100);
            }
        } else {
            alert('All sets completed for this exercise!');
        }
    }

    function resetPopupExercise(exerciseIndex) {
        const progressText = document.getElementById(`popup-progress-text-${exerciseIndex}`);
        const progressBar = document.getElementById(`popup-progress-bar-${exerciseIndex}`);
        const weightInput = document.getElementById(`popup-weight-${exerciseIndex}`);
        const setsInput = document.getElementById(`popup-sets-${exerciseIndex}`);
        const repsInput = document.getElementById(`popup-reps-${exerciseIndex}`);
        
        if (progressText) progressText.textContent = '0/0 sets completed';
        if (progressBar) progressBar.style.width = '0%';
        if (weightInput) weightInput.value = '';
        if (setsInput) setsInput.value = '';
        if (repsInput) repsInput.value = '';
    }

    // --- Exercise Playground ---
    
    // Enhanced exercise data with benefits - using consistent icons with workout plan options
    const exerciseData = {
        strength: [
            { name: 'Bench Press', icon: 'dumbbell', benefits: 'Builds chest, shoulders & tricep strength. Improves pushing power.', url: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
            { name: 'Deadlift', icon: 'dumbbell', benefits: 'Full-body strength. Builds back, glutes & hamstrings. Improves posture.', url: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
            { name: 'Pull-ups', icon: 'dumbbell', benefits: 'Upper body strength. Targets lats, biceps & rear delts. Builds V-taper.', url: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
            { name: 'Overhead Press', icon: 'dumbbell', benefits: 'Shoulder strength & stability. Improves core strength & posture.', url: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
            { name: 'Barbell Rows', icon: 'dumbbell', benefits: 'Back thickness. Improves pulling strength & counteracts bench press.', url: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ' }
        ],
        cardio: [
            { name: 'Burpees', icon: 'zap', benefits: 'Full-body cardio. Burns calories fast. Improves endurance & strength.', url: 'https://www.youtube.com/watch?v=auBLPXO8Fww' },
            { name: 'Jump Squats', icon: 'zap', benefits: 'Explosive leg power. Burns fat. Improves athletic performance.', url: 'https://www.youtube.com/watch?v=A-cFYWvaHr0' },
            { name: 'High Knees', icon: 'zap', benefits: 'Heart rate booster. Improves coordination & leg speed.', url: 'https://www.youtube.com/watch?v=8opcQdC-V-U' },
            { name: 'Mt. Climbers', icon: 'zap', benefits: 'Core & cardio combo. Improves agility & burns belly fat.', url: 'https://www.youtube.com/watch?v=kLh-uczlPLg' }
        ],
        functional: [
            { name: 'Squats', icon: 'activity', benefits: 'Daily movement pattern. Builds leg & glute strength. Improves mobility.', url: 'https://www.youtube.com/watch?v=aclHkVaku9U' },
            { name: 'Push-ups', icon: 'activity', benefits: 'Upper body endurance. Can be done anywhere. Builds functional strength.', url: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
            { name: 'Lunges', icon: 'activity', benefits: 'Single-leg stability. Improves balance & corrects imbalances.', url: 'https://www.youtube.com/watch?v=3XDriUn0udo' },
            { name: 'Plank', icon: 'activity', benefits: 'Core stability. Improves posture & reduces back pain.', url: 'https://www.youtube.com/watch?v=pSHjTRCQxIw' }
        ],
        flexibility: [
            { name: 'Downward Dog', icon: 'heart', benefits: 'Full-body stretch. Relieves tension. Improves circulation.', url: 'https://www.youtube.com/watch?v=VpOOcr1KcyU' },
            { name: 'Cat-Cow', icon: 'heart', benefits: 'Spine mobility. Relieves back tension. Improves posture.', url: 'https://www.youtube.com/watch?v=K9bK0BwKFjs' },
            { name: 'Warrior Pose', icon: 'heart', benefits: 'Hip flexibility. Builds leg strength. Improves balance & focus.', url: 'https://www.youtube.com/watch?v=DqYOIcweZY8' }
        ]
    };

    function createExercisePlayground() {
        const playground = document.getElementById('floating-exercises');
        const tooltip = document.getElementById('benefit-tooltip');
        const tooltipContent = document.getElementById('tooltip-content');
        
        if (!playground || !tooltip || !tooltipContent) return;

        // Clear existing content
        playground.innerHTML = '';

        // Collect all exercises
        const allExercises = [];
        Object.keys(exerciseData).forEach(workoutType => {
            exerciseData[workoutType].forEach(exercise => {
                allExercises.push({ ...exercise, type: workoutType });
            });
        });

        // Shuffle exercises for random distribution
        const shuffledExercises = allExercises.sort(() => Math.random() - 0.5);

        // Create floating exercise bubbles with better spacing
        const positions = [];
        
        shuffledExercises.forEach((exercise, index) => {
            const floatingDiv = document.createElement('div');
            floatingDiv.className = 'floating-exercise';
            
            // Generate non-overlapping positions
            let x, y, attempts = 0;
            let validPosition = false;
            
            while (!validPosition && attempts < 50) {
                x = 15 + Math.random() * 65; // 15% to 80% to avoid edges and title
                y = 25 + Math.random() * 45; // 25% to 70% to avoid edges and keep cards visible
                
                // Check if position is too close to existing positions
                validPosition = positions.every(pos => {
                    const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                    return distance > 12; // Slightly reduced minimum distance for better distribution
                });
                
                attempts++;
            }
            
            // Fallback to grid-based positioning if random fails
            if (!validPosition) {
                const gridCol = index % 4;
                const gridRow = Math.floor(index / 4);
                x = 20 + gridCol * 18; // Adjusted to stay within bounds
                y = 30 + gridRow * 20; // Adjusted to stay within bounds
                
                // Ensure grid positions don't exceed bounds
                if (y > 65) {
                    y = 30 + (gridRow % 2) * 20; // Wrap to first two rows
                }
            }
            
            positions.push({ x, y });
            
            floatingDiv.style.left = `${x}%`;
            floatingDiv.style.top = `${y}%`;
            floatingDiv.style.setProperty('--delay', `${Math.random() * 4}s`);
            
            floatingDiv.innerHTML = `
                <div class="exercise-bubble ${exercise.type}">
                    <i data-lucide="${exercise.icon}"></i>
                    ${exercise.name}
                </div>
            `;

            // Hover events for tooltip
            floatingDiv.addEventListener('mouseenter', (e) => {
                tooltipContent.textContent = exercise.benefits;
                tooltip.style.opacity = '1';
                
                // Position tooltip
                const rect = floatingDiv.getBoundingClientRect();
                const playgroundRect = playground.getBoundingClientRect();
                
                const tooltipX = rect.left - playgroundRect.left + (rect.width / 2);
                const tooltipY = rect.top - playgroundRect.top - 10;
                
                tooltip.style.left = `${tooltipX}px`;
                tooltip.style.top = `${tooltipY}px`;
                tooltip.style.transform = 'translate(-50%, -100%)';
            });

            floatingDiv.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });

            // Click event for exercise popup
            floatingDiv.addEventListener('click', () => {
                const exerciseIndex = exerciseData[exercise.type].findIndex(ex => ex.name === exercise.name);
                showExercisePopup(exercise, exerciseIndex, exercise.type);
            });

            playground.appendChild(floatingDiv);
        });

        // Initialize lucide icons for new elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // --- Assessment Data Management ---
    
    // Sample data - in a real app, this would come from a database
    let goalsData = [
        { id: 1, title: 'Lose 10 lbs', target: 'Dec 31, 2024', progress: 70, color: 'blue' },
        { id: 2, title: 'Run 5K under 25 min', target: 'Current: 28:30 min', progress: 45, color: 'green' },
        { id: 3, title: 'Workout 5x/week', target: '4/5 workouts this week', progress: 80, color: 'purple' }
    ];
    
    let measurementsData = [
        { id: 1, type: 'Weight', value: 165, unit: 'lbs', change: '-3', color: 'red', icon: 'scale' },
        { id: 2, type: 'Body Fat', value: 15.2, unit: '%', change: '-1.5', color: 'teal', icon: 'percent' },
        { id: 3, type: 'Muscle Mass', value: 125, unit: 'lbs', change: '+2', color: 'indigo', icon: 'zap' },
        { id: 4, type: 'Chest', value: 42, unit: 'inches', change: '+0.5', color: 'blue', icon: 'maximize' }
    ];
    
    let currentEditingGoal = null;
    let currentEditingMeasurement = null;
    
    // --- Popup Management ---
    
    function showGoalPopup(goalId = null) {
        const popup = document.getElementById('goal-popup');
        const popupContent = document.getElementById('goal-popup-content');
        const title = document.getElementById('goal-popup-title');
        const form = document.getElementById('goal-form');
        
        if (!popup || !popupContent) return;
        
        currentEditingGoal = goalId;
        
        if (goalId) {
            const goal = goalsData.find(g => g.id === goalId);
            if (goal) {
                title.textContent = 'Edit Goal';
                document.getElementById('goal-title').value = goal.title;
                document.getElementById('goal-target').value = goal.target;
                document.getElementById('goal-progress').value = goal.progress;
                selectGoalColor(goal.color);
            }
        } else {
            title.textContent = 'Add New Goal';
            form.reset();
            selectGoalColor('blue'); // Default color
        }
        
        popup.classList.remove('hidden');
        setTimeout(() => {
            popupContent.classList.remove('scale-95', 'opacity-0');
            popupContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
    
    function hideGoalPopup() {
        const popup = document.getElementById('goal-popup');
        const popupContent = document.getElementById('goal-popup-content');
        
        if (!popup || !popupContent) return;
        
        popupContent.classList.remove('scale-100', 'opacity-100');
        popupContent.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            popup.classList.add('hidden');
            currentEditingGoal = null;
        }, 300);
    }
    
    function showMeasurementPopup(measurementId = null) {
        const popup = document.getElementById('measurement-popup');
        const popupContent = document.getElementById('measurement-popup-content');
        const title = document.getElementById('measurement-popup-title');
        const form = document.getElementById('measurement-form');
        const customContainer = document.getElementById('custom-type-container');
        
        if (!popup || !popupContent) return;
        
        currentEditingMeasurement = measurementId;
        
        if (measurementId) {
            const measurement = measurementsData.find(m => m.id === measurementId);
            if (measurement) {
                title.textContent = 'Edit Measurement';
                document.getElementById('measurement-type').value = measurement.type.toLowerCase().replace(' ', '-');
                document.getElementById('measurement-value').value = measurement.value;
                document.getElementById('measurement-unit').value = measurement.unit;
                document.getElementById('measurement-date').value = new Date().toISOString().split('T')[0];
            }
        } else {
            title.textContent = 'Add Measurement';
            form.reset();
            document.getElementById('measurement-date').value = new Date().toISOString().split('T')[0];
            customContainer.classList.add('hidden');
        }
        
        popup.classList.remove('hidden');
        setTimeout(() => {
            popupContent.classList.remove('scale-95', 'opacity-0');
            popupContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
    
    function hideMeasurementPopup() {
        const popup = document.getElementById('measurement-popup');
        const popupContent = document.getElementById('measurement-popup-content');
        
        if (!popup || !popupContent) return;
        
        popupContent.classList.remove('scale-100', 'opacity-100');
        popupContent.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            popup.classList.add('hidden');
            currentEditingMeasurement = null;
        }, 300);
    }
    
    // --- Goal Management ---
    
    function selectGoalColor(color) {
        const colorBtns = document.querySelectorAll('.goal-color-btn');
        colorBtns.forEach(btn => {
            btn.classList.remove('border-gray-400');
            btn.classList.add('border-transparent');
        });
        
        const selectedBtn = document.querySelector(`[data-color="${color}"]`);
        if (selectedBtn) {
            selectedBtn.classList.remove('border-transparent');
            selectedBtn.classList.add('border-gray-400');
        }
    }
    
    function saveGoal(formData) {
        const goalData = {
            title: formData.get('title'),
            target: formData.get('target'),
            progress: parseInt(formData.get('progress')) || 0,
            color: document.querySelector('.goal-color-btn.border-gray-400')?.dataset.color || 'blue'
        };
        
        if (currentEditingGoal) {
            // Edit existing goal
            const goalIndex = goalsData.findIndex(g => g.id === currentEditingGoal);
            if (goalIndex !== -1) {
                goalsData[goalIndex] = { ...goalsData[goalIndex], ...goalData };
            }
        } else {
            // Add new goal
            const newId = Math.max(...goalsData.map(g => g.id), 0) + 1;
            goalsData.push({ id: newId, ...goalData });
        }
        
        renderGoals();
        hideGoalPopup();
    }
    
    function deleteGoal(goalId) {
        if (confirm('Are you sure you want to delete this goal?')) {
            goalsData = goalsData.filter(g => g.id !== goalId);
            renderGoals();
        }
    }
    
    function renderGoals() {
        const container = document.getElementById('goals-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        goalsData.forEach(goal => {
            const goalElement = document.createElement('div');
            goalElement.className = `bg-gradient-to-r from-${goal.color}-50 to-${goal.color}-100 rounded-2xl p-4`;
            goalElement.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-brand-text-primary">${goal.title}</h4>
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-medium text-${goal.color}-600 bg-${goal.color}-200 px-2 py-1 rounded-full">${goal.progress}%</span>
                        <button onclick="showGoalPopup(${goal.id})" class="text-${goal.color}-600 hover:text-${goal.color}-800 transition-colors">
                            <i data-lucide="edit-2" class="w-3 h-3"></i>
                        </button>
                        <button onclick="deleteGoal(${goal.id})" class="text-red-500 hover:text-red-700 transition-colors">
                            <i data-lucide="trash-2" class="w-3 h-3"></i>
                        </button>
                    </div>
                </div>
                <div class="bg-white rounded-full h-2 mb-2">
                    <div class="bg-${goal.color}-500 h-2 rounded-full" style="width: ${goal.progress}%"></div>
                </div>
                <p class="text-xs text-brand-text-secondary">${goal.target}</p>
            `;
            container.appendChild(goalElement);
        });
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // --- Measurement Management ---
    
    function saveMeasurement(formData) {
        const measurementType = formData.get('type');
        const customType = formData.get('customType');
        const finalType = measurementType === 'custom' ? customType : measurementType;
        
        const measurementData = {
            type: finalType.charAt(0).toUpperCase() + finalType.slice(1).replace('-', ' '),
            value: parseFloat(formData.get('value')) || 0,
            unit: formData.get('unit'),
            date: formData.get('date'),
            notes: formData.get('notes'),
            color: getColorForMeasurementType(finalType),
            icon: getIconForMeasurementType(finalType)
        };
        
        if (currentEditingMeasurement) {
            // Edit existing measurement
            const measurementIndex = measurementsData.findIndex(m => m.id === currentEditingMeasurement);
            if (measurementIndex !== -1) {
                measurementsData[measurementIndex] = { ...measurementsData[measurementIndex], ...measurementData };
            }
        } else {
            // Add new measurement
            const newId = Math.max(...measurementsData.map(m => m.id), 0) + 1;
            measurementsData.push({ id: newId, change: '+0', ...measurementData });
        }
        
        renderMeasurements();
        hideMeasurementPopup();
    }
    
    function deleteMeasurement(measurementId) {
        if (confirm('Are you sure you want to delete this measurement?')) {
            measurementsData = measurementsData.filter(m => m.id !== measurementId);
            renderMeasurements();
        }
    }
    
    function getColorForMeasurementType(type) {
        const colorMap = {
            'weight': 'red',
            'body-fat': 'teal',
            'muscle-mass': 'indigo',
            'chest': 'blue',
            'waist': 'yellow',
            'hips': 'purple',
            'bicep': 'green',
            'thigh': 'orange'
        };
        return colorMap[type] || 'gray';
    }
    
    function getIconForMeasurementType(type) {
        const iconMap = {
            'weight': 'scale',
            'body-fat': 'percent',
            'muscle-mass': 'zap',
            'chest': 'maximize',
            'waist': 'minimize',
            'hips': 'circle',
            'bicep': 'flexbox',
            'thigh': 'move'
        };
        return iconMap[type] || 'ruler';
    }
    
    function renderMeasurements() {
        const container = document.getElementById('measurements-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        measurementsData.forEach(measurement => {
            const measurementElement = document.createElement('div');
            measurementElement.className = `bg-gradient-to-br from-${measurement.color}-50 to-${measurement.color}-100 rounded-2xl p-4 text-center relative`;
            measurementElement.innerHTML = `
                <div class="absolute top-2 right-2 flex space-x-1">
                    <button onclick="showMeasurementPopup(${measurement.id})" class="text-${measurement.color}-600 hover:text-${measurement.color}-800 transition-colors">
                        <i data-lucide="edit-2" class="w-3 h-3"></i>
                    </button>
                    <button onclick="deleteMeasurement(${measurement.id})" class="text-red-500 hover:text-red-700 transition-colors">
                        <i data-lucide="trash-2" class="w-3 h-3"></i>
                    </button>
                </div>
                <div class="bg-${measurement.color}-200 p-2 rounded-full w-fit mx-auto mb-3">
                    <i data-lucide="${measurement.icon}" class="w-4 h-4 text-${measurement.color}-600"></i>
                </div>
                <h4 class="font-semibold text-brand-text-primary text-sm">${measurement.type}</h4>
                <p class="text-lg font-bold text-${measurement.color}-600">${measurement.value} ${measurement.unit}</p>
                <p class="text-xs text-brand-text-secondary">${measurement.change} ${measurement.unit} this month</p>
            `;
            container.appendChild(measurementElement);
        });
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // --- Event Listeners for Popups ---
    
    // Goal popup events
    const addGoalBtn = document.getElementById('add-goal-btn');
    const closeGoalPopup = document.getElementById('close-goal-popup');
    const cancelGoal = document.getElementById('cancel-goal');
    const goalForm = document.getElementById('goal-form');
    const goalPopup = document.getElementById('goal-popup');
    
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', () => showGoalPopup());
    }
    
    if (closeGoalPopup) {
        closeGoalPopup.addEventListener('click', hideGoalPopup);
    }
    
    if (cancelGoal) {
        cancelGoal.addEventListener('click', hideGoalPopup);
    }
    
    if (goalForm) {
        goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(goalForm);
            saveGoal(formData);
        });
    }
    
    if (goalPopup) {
        goalPopup.addEventListener('click', (e) => {
            if (e.target === goalPopup) hideGoalPopup();
        });
    }
    
    // Goal color selection
    const colorBtns = document.querySelectorAll('.goal-color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectGoalColor(btn.dataset.color);
        });
    });
    
    // Measurement popup events
    const addMeasurementBtn = document.getElementById('add-measurement-btn');
    const closeMeasurementPopup = document.getElementById('close-measurement-popup');
    const cancelMeasurement = document.getElementById('cancel-measurement');
    const measurementForm = document.getElementById('measurement-form');
    const measurementPopup = document.getElementById('measurement-popup');
    const measurementTypeSelect = document.getElementById('measurement-type');
    const customTypeContainer = document.getElementById('custom-type-container');
    
    if (addMeasurementBtn) {
        addMeasurementBtn.addEventListener('click', () => showMeasurementPopup());
    }
    
    if (closeMeasurementPopup) {
        closeMeasurementPopup.addEventListener('click', hideMeasurementPopup);
    }
    
    if (cancelMeasurement) {
        cancelMeasurement.addEventListener('click', hideMeasurementPopup);
    }
    
    if (measurementForm) {
        measurementForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(measurementForm);
            saveMeasurement(formData);
        });
    }
    
    if (measurementPopup) {
        measurementPopup.addEventListener('click', (e) => {
            if (e.target === measurementPopup) hideMeasurementPopup();
        });
    }
    
    if (measurementTypeSelect && customTypeContainer) {
        measurementTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                customTypeContainer.classList.remove('hidden');
            } else {
                customTypeContainer.classList.add('hidden');
            }
        });
    }
    
    // Make functions available globally for onclick handlers
    window.showGoalPopup = showGoalPopup;
    window.deleteGoal = deleteGoal;
    window.showMeasurementPopup = showMeasurementPopup;
    window.deleteMeasurement = deleteMeasurement;

    // Initialize everything
    setCurrentDate();
    generateCalendar();
    createExercisePlayground();
    renderGoals();
    renderMeasurements();
    
    // Initialize all workout visualizations with a small delay to ensure DOM is ready
    setTimeout(() => {
        initializeAllWorkoutVisualizations();
    }, 100);
});