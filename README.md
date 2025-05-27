# Student Time Sheet Viewer

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

### Core Functionality

- **Student ID Authentication**: Simple login system using student ID
- **Weekly Schedule Display**: Clean, responsive table view of all classes
- **Real-time Class Tracking**: Automatically highlights current or next upcoming class
- **Smart Time Logic**: Intelligent handling of early morning hours (before 6 AM)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Architecture Highlights

- **Facade Pattern**: Clean separation between UI and business logic
- **Strategy Pattern**: Flexible data access layer with swappable implementations
- **Angular Signals**: Modern reactive state management using Angular 17's Signals
- **Lazy Loading**: Optimized performance with route-based code splitting
- **TypeScript**: Fully typed with comprehensive interfaces and models

## Tech Stack

- **Framework**: Angular 19 (Standalone Components)
- **Styling**: Tailwind CSS
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient with custom interceptors
- **Testing**: Jasmine & Karma

## AI Usage

- **Code Scaffolding**: Basic project structure and file creation
- **Data Models & interfaces Creation**: Model files and interfaces creation
- **Code Review**: Code review and improvements suggestions
- **Unit Testing**: Boilerplate code generation for unit tests

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

\`\`\`bash
npm install -g @angular/cli@17
\`\`\`

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd student-schedule-viewer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Install & Initialize Tailwind CSS (if not already done)**
   \`\`\`bash
   npm install tailwindcss @tailwindcss/postcss postcss
   npx tailwindcss init
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   ng serve
   \`\`\`

5. **Open your browser**
   Navigate to \`http://localhost:4200\`

### Demo Credentials

Use these sample student IDs to test the application:

- **Student ID: 12345**

  - Computer Science student
  - Classes: Intro to CS, Calculus I, Physics 101, English Composition, Data Structures, Chemistry Lab

- **Student ID: 67890**
  - Advanced Computer Science student
  - Classes: Advanced Programming, Linear Algebra, Database Systems, Web Development, Software Engineering

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
