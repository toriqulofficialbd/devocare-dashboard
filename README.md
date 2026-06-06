# 🏥 DevoCare (NurtureOS) - Premium Care Scheduling Dashboard

DevoCare is an ultra-luxurious, pixel-perfect Enterprise-Grade Scheduling & Care Management Dashboard engineered for modern healthcare workflows. Designed with the aesthetics of **Untitled UI** and powered by fluid **Framer Motion** animations, this module provides an intuitive, high-performance calendar engine across Month, Week, and Day views.

🔗 **Live Deployment:** [devocare-dashboard.vercel.app](https://devocare-dashboard.vercel.app/)

---

## ✨ Core Features & UI Highlights

### 🗓️ Unified Multi-View Calendar Engine
- **Month, Week, & Day Views:** Seamlessly switch between micro and macro duty planning with full synchronized states.
- **Macaron-Style Drag & Drop:** Intuitive calendar cards can be dragged and rescheduled across day borders without grid overlaps or collision bugs.
- **Active Plus Hovers:** Modern interactive grid cells featuring hover-triggered contextual `+` creation nodes styled with dynamic violet glow states.

### ⏰ Apple-Style Dual Scroll Time Wheels
- **Adaptive Prefills:** Dragging any empty grid slot or editing an active card instantly extracts and prefills hours and periods (AM/PM).
- **Time String Parser:** An intelligent string clipping regex engine captures, computes, and dynamically adjusts event heights based on shift durations.

### 📅 Universal Lip-Month Edge Calculator
- **Boundary Proof Syncing:** Solves the multi-month crossover trap (e.g., May 31 overlapping into June grid rows) flawlessly.
- **Indexed Option Mapper:** Uses a pure index-mapped dropdown selector inside the modal to completely eliminate standard browser `<select>` option display overflows.
- **Real-Time Date Focus:** Live header notice tags mutate immediately upon form changes, syncing headers with dropdown data states simultaneously.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React.js (Functional Components & Custom Hooks architecture)
- **Styling & Theme:** Tailwind CSS (Type-safe global variables & CSS grid coordinate structures)
- **Animations:** Framer Motion (AnimatePresence layout shifts & fade-in scaling)
- **Icons:** Lucide React
- **Deployment:** Vercel

---

## 📦 File Structure (Calendar Module Focus)

```text
src/
├── Components/
│   └── Calender/
│       ├── CalendarHeader.jsx          # Premium control bar, global search and view switches
│       ├── CalendarModal.jsx           # Master scheduler with Apple-style dual wheel triggers
│       ├── ModalDateNotice.jsx         # Live header tracker for dates & ranges
│       ├── ModalDateDropdowns.jsx      # Index-mapped type-safe month edge selectors
│       ├── ModalTimeWheels.jsx         # Luxury custom shift hour and AM/PM toggle pill box
│       ├── WeekMultiDayBanners.jsx    # Dynamic vertical height compiler for long assignments
│       └── CalenderGrid/
│           ├── CalendarGrid.jsx        # View dispatcher and transition wrapper
│           ├── MonthDayCell.jsx        # Group-hover responsive click cell
│           └── WeekViewGrid.jsx        # Hour-to-Y mapping layout orchestrator
└── Pages/
    └── CalendarView.jsx                # Core data store, filter arrays & state synchronization
```

---

## ⚡ Getting Started & Local Setup

Follow these quick steps to launch the DevoCare dashboard locally on your machine:

1. **Clone the Repository**
   ```bash
   git clone https://github.com
   cd devocare-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` on your browser to view the application.

4. **Production Build**
   ```bash
   npm run build
   ```

---

## 🤝 Contribution & Quality Guidelines
This module complies strictly with **React Lifecycle Best Practices** and **ESLint standard type-safe patterns**. Global `window` mutation blocks are avoided to guarantee zero memory leaks during fast multi-view navigation.

Developed with 💜 for premium healthcare experience automation.
