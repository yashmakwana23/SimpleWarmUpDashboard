### 📋 Project Overview: Fitness Dashboard (Google Apps Script Web App)
We're building a **Fitness Dashboard** using **Google Sheets** + **Google Apps Script Web App**, with a clean UI and optimal performance. The original version is built using plain HTML/CSS/JS in a single file—this version breaks it into modular components using `.html` and `.gs` files as per Apps Script limitations.

### 📁 File & Structure Guidelines
1. **Apps Script Constraints**
   * Only `.html` and `.gs` files are allowed.
   * No direct use of `.css` or `.js` files—scripts and styles must be embedded or imported inline inside `.html` files.

2. **Modular Design**
   * Each page should have its own separate HTML file (e.g., `home.html`, `progress.html`, etc.).
   * Use shared components (like header, footer, nav, toast, utility functions) in separate partial files (`header.html`, `utils.js`, etc.) and include using `<?= ?>`.

3. **Global Utilities**
   * Create and import shared utility files:
     * `utils.html` → UI helpers, local time formatting, toast, loaders
     * `storage.html` → Local storage handling
     * `api.html` → Fetch and update data from server/backend

### ⚙️ Functional Requirements
1. **Optimized Load Experience**
   * On launch, **fetch and display the first visible screen/page immediately**.
   * Load additional data progressively—don't block the UI waiting for all data.
   * Use **skeleton loaders** on each card/item while fetching.

2. **Performance Optimization**
   * Use **LocalStorage or session caching** to prevent re-fetching static or semi-static data (e.g., user config, progress data).
   * Data should **not be re-fetched** on every tab/page switch unless necessary.

3. **Live UI Updates Without Page Refresh**
   * Any updates to inputs or fields should:
     * Instantly reflect in the UI.
     * Trigger an async call to Apps Script to update the backend.
     * Show a toast/snackbar with status (`success`, `error`, etc.).
   * Avoid full-page reloads—use JavaScript DOM updates.

4. **Lightweight Client-Side Computation**
   * Offload heavy/calculated logic to client-side (JS) wherever possible.
   * Examples: total streaks, goal completions, XP level, etc.

5. **Timezone Handling**
   * Always use **user's local time** for all time-related displays and logic.
   * Avoid using raw Apps Script/Sheet times—they're in different timezones and formats.
   * Convert all timestamps accordingly (watch for Sheet format quirks).

---
### 📱 UI & Responsiveness

* Must replicate the **original UI exactly** as per the HTML mockup.
* Responsive for:
  * Mobile
  * Tablet
  * Desktop
* Prioritize **mobile-first styling**, then scale up.
* Use `flexbox`, `grid`, and relative units (`%`, `vh`, `vw`, `rem`) for layout.

---
### 🔁 Reusability & Maintenance
* **Reusables**: Keep UI components like buttons, cards, loaders, modals in standalone includes.
* **Avoid Duplication**: Use templating (`<?!= include('file') ?>`) to inject shared parts.
* **Consistent Naming**: Keep JS functions, CSS classes, and ID names modular and readable.

---
Here’s a much more structured and clear version of your **webapp architecture and logic plan**, refined for clarity and technical guidance. It’s suitable for both documentation and sharing with developers working on your Google Apps Script-based fitness dashboard webapp.

---

## 🧾 Webapp Structure & Functional Tabs

### 1. **Today’s Plan**

* Displays workout plans for the **current day (by sequence, not calendar)**.
* Each plan contains:

  * A list of exercises
  * Option to:

    * ✅ Mark as complete
    * ⏱️ Start/record a timer
    * 📝 Add notes
* Logic:

  * Based on completed days (not calendar dates)
  * If Day 1 is completed today, Day 2 shows only from the next login/day
  * Always show the **first uncompleted day** from the master plan

---

### 2. **Workout Logs**

* Shows a history of **completed workout days**.
* Each log entry includes:

  * 📅 Day Number
  * date of completing
  * 🕒 Time spent (if recorded)
  * 📝 Notes
  * ✅ Completed exercises
* Source:

  * Pulled from the workout log sheet (see Backend section)

---

### 3. **Complete Planner**

* Full overview of the **entire workout program**, including:

  * All days and exercises
  * Ability to **modify exercises** for any day

---

### 4. **Assessment & Goals**

* Allows the user to set and review:

  * 🎯 Goals
  * 📏 Body measurements / tracking of weight etc
  * 📝 Notes
  * 📎 File uploads (if needed, can store Drive links)
* Data will be stored in a separate sheet

---

## 🔧 Functional Workflow & Logic

### 🗓️ Day Progress Logic

* We do **not** use fixed calendar dates.
* Instead, user progress is tracked by **Day Numbers** (e.g., Day 1, Day 2...).
* The system:

  * Only shows the **next uncompleted day** in “Today’s Plan”
  * Prevents repetition—does **not** allow completing the same day twice in one session
  * Moves forward only after prior day is marked complete