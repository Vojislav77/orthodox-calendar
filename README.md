# Православни календар 2026 (Orthodox Calendar 2026)

A complete Orthodox liturgical calendar web application for the year 2026, following the Serbian Orthodox Church calendar. This single-page application provides a comprehensive view of all ecclesiastical feasts, saints' days, fasting rules, and liturgical commemorations throughout the year.

The application displays both New Style (Gregorian) and Old Style (Julian) dates, includes detailed fasting guidelines, highlights major feasts, and features an intelligent search system for saints and feast days.

![License](https://img.shields.io/badge/license-MIT-purple)
![PWA](https://img.shields.io/badge/PWA-enabled-blue)

<img width="1184" height="159" alt="pc" src="https://github.com/user-attachments/assets/1f2549ad-77b2-4474-b4a8-dc05ec71c315" />


## Features

**Calendar Display**

Complete annual calendar with all twelve months displayed in a grid layout
Each day shows the New Style and Old Style dates
Saints and feasts listed for each day
Visual indicators for fasting levels (strict, oil, fish, etc.)
Special notes for important liturgical commemorations

**Fasting Guide**

Five fasting categories displayed with color-coded indicators:

Strict fasting (dry eating)
No oil
Oil and wine
Fish, oil, and wine
Non-fasting (all foods allowed)

Interactive legend explaining each fasting type
Collapsible legend section for compact viewing

**Navigation and Interaction**

Month-by-month navigation with previous/next buttons
Quick jump to any month via month name buttons
Today button to scroll to the current date
Keyboard shortcuts for power users

**Search Functionality**

Search for saints and feasts by name
Results displayed in a dropdown list with date information
Matching days highlighted directly in the calendar
Support for both Cyrillic and Latin script search
Search terms highlighted within results

**Visual Themes**

Light and dark themes with persistent preference storage
Clean, modern design with purple accent colors
Responsive layout optimized for all screen sizes
Print-friendly styles for physical copies

**Technical Features**

Progressive Web App (PWA) support with offline caching
Service Worker registration for offline access
Smooth scrolling and transitions
Keyboard navigation support
Mobile-optimized touch interactions
No external dependencies required

## Technical Implementation

**Architecture**

The application is built as a single HTML file with embedded CSS and JavaScript, making it easy to deploy and maintain. All calendar data is stored in a JavaScript array structure, allowing for easy updates and modifications.

**Technologies Used**

Pure HTML5
CSS3 with CSS custom properties for theming
Vanilla JavaScript (ES6+)
Service Worker API for offline support
Local Storage for theme persistence
Web App Manifest for PWA capabilities

**Data Structure**

The calendar data is organized by month, with each month containing:
Month name (in Serbian)
First day of the month (0-6 for Sunday-Saturday)
Array of days with properties:
Date (New Style and Old Style)
Saint or feast name
Fasting level (0-4)
Feast flag (true/false)
Special notes

## Live Demo

[Click here to try it live](https://vojislav77.github.io/orthodox-calendar/)

## Usage

**Basic Navigation**

Click on month names in the navigation bar to jump to a specific month
Use the arrow buttons to move between months
Press the "Today" button to scroll to the current date

**Searching**

Type a saint's name or feast name in the search bar
Results will appear in a dropdown list
Click on a result to scroll to the relevant month
Matching days will be highlighted in the calendar

**Keyboard Shortcuts**

T - Toggle between light and dark themes
P - Open print dialog
D - Scroll to today's date
Esc - Close search results

**Printing**

Click the "Print" button or use the P keyboard shortcut
Print styles are optimized for paper output
Navigation elements and controls are hidden in print view

## Installation

    1. Clone the repository:
       git clone https://github.com/Vojislav77/orthodox-calendar-2026.git
    2. Navigate to the project directory:
       cd orthodox-calendar-2026
    3. Open index.html in your web browser.
    No server or build process is required. The application runs entirely client-side.

## Customization

**Adding New Data**

To add or modify calendar data, edit the months array in the JavaScript section. Each month object follows this structure:

    {
      name: "JANUARY", // Month name in uppercase
      firstDay: 4,     // Day of week (0-6, Sunday-Saturday)
      days: [
        {
          n: 1,        // Day number (New Style)
          o: 19,       // Day number (Old Style)
          s: "Saint name", // Saint or feast name
          f: 0,        // Fasting level (0-4)
          feast: true, // Optional, marks major feast
          note: "Special note" // Optional
        }
      ]
    }

**Styling Customization**

The CSS uses custom properties (CSS variables) for theming. To modify colors or other visual aspects, edit the :root and [data-theme="dark"] sections in the CSS.

**Browser Support**

The application supports all modern browsers:
Chrome 60+
Firefox 55+
Safari 12+
Edge 79+
Opera 50+
Mobile browsers (iOS Safari 12+, Android Chrome 60+)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! 
Areas that could benefit from community input:

Adding more saints and feast days
Improving translation accuracy
Adding additional liturgical notes
Enhancing accessibility
Optimizing performance

Please submit pull requests with clear descriptions of changes made.

**Acknowledgments**

Calendar data compiled from traditional Serbian Orthodox Church sources
Design inspired by Orthodox liturgical traditions
Built with a focus on accessibility and user experience

**Contact**

For questions, suggestions, or issues, please contact the project maintainer.

---

**Made with ❤️ for the Orthodox Christian community**

This application is provided as a reference tool for the Orthodox Christian community. While efforts have been made to ensure accuracy, users are encouraged to consult their local parish for official liturgical guidance.
