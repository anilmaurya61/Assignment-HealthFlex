# ⏱️ React Native Timer App

A customizable multi-timer app built with **React Native + TypeScript**, designed for productivity and task management. The app supports **multiple timers**, **category grouping**, **progress visualization**, and **bulk actions** — all with a clean and intuitive UI.

---

## 🚀 Features

### ✅ Core Functionalities

1. **Add Timer**
   - Create new timers with:
     - `Name` (e.g., "Workout Timer")
     - `Duration` (in seconds)
     - `Category` (e.g., "Workout", "Study", "Break")
   - Timers are saved locally using `AsyncStorage`.

2. **Timer List with Grouping**
   - All timers are displayed under their respective **categories**.
   - Categories are **expandable/collapsible**.
   - For each timer, display:
     - Name
     - Remaining Time
     - Status: Running | Paused | Completed

3. **Timer Management**
   - Individual timer controls:
     - Start
     - Pause
     - Reset
   - Timers auto-marked as **Completed** when they reach zero.

4. **Progress Visualization**
   - Timers display a **progress bar** or **percentage** indicating remaining time.

5. **Bulk Actions**
   - At the category level:
     - Start all timers
     - Pause all timers
     - Reset all timers

6. **User Feedback**
   - When a timer completes:
     - Show a **modal** with a **congratulatory message** and the timer’s name.

---

## 📦 Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **AsyncStorage** for local persistence
- **React Navigation** for navigation
- **Styled Components** or inline styles (clean and minimal)
- **Minimal third-party dependencies**

---

## 🛠️ Getting Started

# TimerApp Setup Guide

### 1. 📥 Clone the Repository

```bash
git clone git@github.com:anilmaurya61/Assignment-HealthFlex.git
cd timerapp
```
### 1. Install Dependencies
```bash
npm install
```

### 2. Run the App
```bash
npm run web
```

## ✅ Coming Soon / Bonus Features

- Export timer history as JSON  
- Category filtering in history  
- Custom themes (light/dark mode)
