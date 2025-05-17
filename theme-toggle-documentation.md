# Theme Toggle Feature Documentation

## Overview
The theme toggle feature allows users to switch between light and dark themes in the application.

## Implementation Components

### 1. HTML Structure (index.html)
```html
<button class="theme-toggle" onclick="toggleTheme()">
    <i class="fas fa-moon"></i>
    <span>Toggle Theme</span>
</button>
```

### 2. CSS Styling (themes.css)
```css
:root {
    --background-gradient-light: linear-gradient(135deg, #f0f7f4 0%, #e0f0ea 100%);
    --background-gradient-dark: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    --text-color-light: #333;
    --text-color-dark: #e0e0e0;
}

.theme-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    border: none;
    background: var(--accent-color-light);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

body.dark-theme {
    background: var(--background-gradient-dark);
    color: var(--text-color-dark);
}
```

### 3. JavaScript Logic (theme.js)
```javascript
function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector('.theme-toggle i');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Save preference
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}
```

## Features
1. Smooth transitions between themes
2. Persistent theme preference using localStorage
3. Adaptive icon changes (moon/sun)
4. Fixed position for easy access
5. Hover effects and animations

## Theme Properties
- **Light Theme**
  - Light background with subtle gradient
  - Dark text for readability
  - White component backgrounds

- **Dark Theme**
  - Dark background with gradient
  - Light text color
  - Dark component backgrounds
  - Adjusted contrast for better visibility

## Usage
1. Click the toggle button to switch themes
2. Theme preference is saved and restored on page reload
3. Icons change to reflect current theme (moon for light, sun for dark)

## Technical Notes
- Uses CSS custom properties (variables) for theme values
- Smooth transitions with CSS transitions
- Font Awesome icons for visual indicators
- LocalStorage for persistence
- Responsive design considerations
