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

    // --- Workout Selection and Exercise Management ---
    const workoutOptions = document.querySelectorAll('.workout-option');
    const exerciseDetails = document.getElementById('exercise-details');
    const workoutTitle = document.getElementById('workout-title');
    const exercisesContainer = document.getElementById('exercises-container');
    const backToOptionsBtn = document.getElementById('back-to-options');
    const workoutSelectionDiv = exerciseDetails?.previousElementSibling;

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
        if (!workout || !workoutTitle || !exercisesContainer || !exerciseDetails || !workoutSelectionDiv) return;

        // Update title
        workoutTitle.textContent = workout.title;
        
        // Generate exercise cards
        exercisesContainer.innerHTML = workout.exercises
            .map((exercise, index) => createExerciseCard(exercise, index))
            .join('');
        
        // Show exercise details and hide workout selection
        workoutSelectionDiv.classList.add('hidden');
        exerciseDetails.classList.remove('hidden');
        
        // Re-initialize Lucide icons for new content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Function to go back to workout options
    function showWorkoutOptions() {
        if (!exerciseDetails || !workoutSelectionDiv) return;
        
        exerciseDetails.classList.add('hidden');
        workoutSelectionDiv.classList.remove('hidden');
    }

    // Event listeners for workout options
    workoutOptions.forEach(option => {
        option.addEventListener('click', () => {
            const workoutType = option.dataset.workout;
            showWorkoutExercises(workoutType);
        });
    });

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
});