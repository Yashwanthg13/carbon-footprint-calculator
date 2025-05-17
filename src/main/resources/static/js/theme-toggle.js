// Theme toggle functionality with enhanced leaves animation

/**
 * Global application state
 */
const appState = {
    isDarkTheme: false,
    transitionInProgress: false,
    soundsEnabled: localStorage.getItem('soundEffects') !== 'disabled',
    interactiveEnabled: localStorage.getItem('interactiveLeaves') !== 'disabled',
    currentSeason: null,
    mousePos: { x: 0, y: 0 },
    mouseMoved: false,
};

// Initialize seasons on load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize seasonal data
    if (window.EcoCalcSeasons) {
        appState.currentSeason = window.EcoCalcSeasons.getCurrentSeason();
        console.log(`Current season detected: ${appState.currentSeason.name}`);
        
        // Apply seasonal colors initially
        const isDark = document.body.classList.contains('dark-theme');
        window.EcoCalcSeasons.applySeasonalColors(appState.currentSeason, isDark);
    } else {
        console.warn('Seasons module not loaded');
    }
    
    // Track mouse position for interactive leaves
    if (appState.interactiveEnabled) {
        document.addEventListener('mousemove', handleMouseMove);
    }
});

/**
 * Track mouse movements for interactive leaves
 */
function handleMouseMove(event) {
    // Store the current position
    const prevPos = { ...appState.mousePos };
    
    // Update with new position
    appState.mousePos = { 
        x: event.clientX, 
        y: event.clientY 
    };
    
    // Calculate speed of mouse movement
    const dx = appState.mousePos.x - prevPos.x;
    const dy = appState.mousePos.y - prevPos.y;
    const speed = Math.sqrt(dx*dx + dy*dy);
    
    // If mouse moved fast enough, create wind effect
    if (speed > 30) {
        appState.mouseMoved = true;
        createWindEffect(appState.mousePos, { dx, dy }, speed);
    }
}

/**
 * Create wind effect when mouse moves quickly
 */
function createWindEffect(position, direction, speed) {
    // Find nearby leaves and apply wind force
    const leaves = document.querySelectorAll('.theme-leaf');
    const forceFactor = Math.min(speed * 0.1, 15); // Limit maximum force
    
    leaves.forEach(leaf => {
        // Calculate distance from mouse to leaf
        const leafRect = leaf.getBoundingClientRect();
        const leafCenter = {
            x: leafRect.left + leafRect.width/2,
            y: leafRect.top + leafRect.height/2
        };
        
        const dx = leafCenter.x - position.x;
        const dy = leafCenter.y - position.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        // Only affect leaves within proximity
        if (distance < 200) {
            const force = (1 - distance/200) * forceFactor;
            const windX = direction.dx * force;
            const windY = direction.dy * force;
            
            // Apply wind force
            leaf.style.transition = 'transform 0.3s cubic-bezier(0,0,0.2,1)';
            const currentTransform = leaf.style.transform || '';
            leaf.style.transform = `${currentTransform} translate(${windX}px, ${windY}px)`;
            
            // Reset after animation
            setTimeout(() => {
                leaf.style.transition = 'transform 1s cubic-bezier(0.2,0.9,0.3,1)';
                leaf.style.transform = currentTransform;
            }, 300);
        }
    });
}

/**
 * Create a leaf element for animation
 */
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'theme-leaf';
    
    // Distribute leaves across the full screen (both horizontally and vertically)
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.top = `${Math.random() * 100}vh`; // Position leaves throughout the screen
    
    // Stagger animation timing for smoother overall effect (with shorter duration)
    leaf.style.animationDelay = `${Math.random() * 0.8}s`;
    leaf.style.animationDuration = `${Math.random() * 2 + 1.5}s`; // 1.5-3.5 seconds duration for quicker animation
    
    // Randomize size with wider range
    const size = Math.random() * (40 - 12) + 12;
    leaf.style.fontSize = `${size}px`;
    
    // Add random initial rotation and scale for variety
    const initialRotation = Math.random() * 360;
    const initialScale = 0.3 + Math.random() * 0.7; // 0.3-1.0 scale
    leaf.style.transform = `rotate(${initialRotation}deg) scale(${initialScale})`;
    
    // Add z-index variation for depth effect
    leaf.style.zIndex = Math.floor(Math.random() * 10) + 990; // Between 990-999
    
    // Make leaves interactive if enabled
    if (appState.interactiveEnabled) {
        leaf.addEventListener('mouseover', (e) => {
            // Add a little bounce or spin when hovered
            const currentTransform = leaf.style.transform || '';
            const spin = Math.random() > 0.5 ? 'spin' : 'bounce';
            leaf.classList.add(`leaf-${spin}`);
            
            // Remove animation class after it completes
            setTimeout(() => {
                leaf.classList.remove(`leaf-${spin}`);
            }, 500);
        });
    }
    
    return leaf;
}

function addLeaves(customContainer) {
    // Use customContainer if provided, otherwise use default container
    const container = customContainer || document.getElementById('leavesContainer');
    container.innerHTML = '';
    
    // Choose leaves based on current season if available
    let leaves = ['🍃', '🌿', '☘️', '🍂', '🍁', '🌱', '🌴', '🌳', '🌷', '🪴', '🍀', '🌲', '🌹', '🎄'];
    let primaryLeaves = ['🍃', '🌿', '☘️', '🍂', '🍁'];
    
    // Use seasonal leaves if available
    if (appState.currentSeason && window.EcoCalcSeasons) {
        leaves = appState.currentSeason.leaves;
        primaryLeaves = appState.currentSeason.primaryLeaves;
        console.log(`Using seasonal leaves for ${appState.currentSeason.name}`);
    }
    
    // Create many more leaves for full screen coverage - increase density for fullscreen mode
    const isFullscreen = customContainer !== undefined;
    const densityFactor = isFullscreen ? 2 : 1; // Double the leaf count for fullscreen mode
    const leafCount = Math.max(150, Math.floor(window.innerWidth * window.innerHeight / (8000 / densityFactor)));
    
    console.log(`Creating ${leafCount} leaves for ${isFullscreen ? 'fullscreen' : 'regular'} mode`);
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = createLeaf();
        
        // Add variety by occasionally using different leaf types with different weights
        // Favor primary seasonal leaves
        const leafIndex = Math.random() < 0.7 ?
            // Primary leaves from the season (more common)
            Math.floor(Math.random() * primaryLeaves.length) :
            // All seasonal leaves (less common) 
            Math.floor(Math.random() * leaves.length);
            
        leaf.textContent = Math.random() < 0.7 ? 
            primaryLeaves[leafIndex % primaryLeaves.length] : 
            leaves[leafIndex % leaves.length];
        
        // Vary opacity for depth effect
        leaf.style.opacity = (Math.random() * 0.6 + 0.4).toString(); // 0.4-1.0 opacity
        
        // Add special class for fullscreen mode
        if (isFullscreen) {
            leaf.classList.add('fullscreen-leaf');
        }
        
        // Add data attribute for interactive effects
        if (appState.interactiveEnabled) {
            leaf.setAttribute('data-interactive', 'true');
        }
        
        // Generate leaves almost immediately with minimal staggering for faster appearance
        setTimeout(() => {
            container.appendChild(leaf);
        }, i % 10 * 10); // Very fast staggering with smaller batches
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Disable the toggle button temporarily to prevent multiple clicks
    themeToggle.disabled = true;
    
    // Make button pulse to indicate theme change is happening
    themeToggle.classList.add('theme-toggle-pulse');
    
    // Create a full screen overlay for the leaves animation
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    
    // Create separate leaves container for fullscreen effect
    const fullscreenLeaves = document.createElement('div');
    fullscreenLeaves.className = 'fullscreen-leaves-container';
    document.body.appendChild(fullscreenLeaves);
    
    // Prepare for animation by adding class to body
    body.classList.add('theme-changing');
    
    // Add leaves across the whole screen for dramatic effect
    const originalContainer = document.getElementById('leavesContainer');
    const savedHTML = originalContainer.innerHTML;
    originalContainer.innerHTML = '';
    
    // Use the fullscreen container for our leaves
    document.getElementById('leavesContainer').style.display = 'none';
    addLeaves.call(null, fullscreenLeaves);
    
    // Get the new theme state
    const willBeDarkTheme = !body.classList.contains('dark-theme');
    
    // Get seasonal audio if available
    let audioFile = willBeDarkTheme ? '/audio/dark-mode.mp3' : '/audio/light-mode.mp3';
    
    // Use seasonal sounds if available
    if (appState.currentSeason && appState.soundsEnabled && window.EcoCalcSeasons) {
        audioFile = `/audio/${appState.currentSeason.key}-toggle.mp3`;
        console.log(`Using seasonal sound effect: ${audioFile}`);
    }
    
    // Play a subtle sound effect if enabled
    if (appState.soundsEnabled) {
        try {
            const soundEffect = new Audio();
            soundEffect.src = audioFile;
            soundEffect.volume = 0.2;
            soundEffect.play().catch(e => console.log('Audio not supported or enabled'));
        } catch (e) {
            console.log('Audio playback not supported');
        }
    }
    
    // Wait briefly before changing theme
    setTimeout(() => {
        // Toggle theme
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }

        // Apply seasonal colors if available
        if (appState.currentSeason && window.EcoCalcSeasons) {
            const isDark = body.classList.contains('dark-theme');
            window.EcoCalcSeasons.applySeasonalColors(appState.currentSeason, isDark);
        }

        // Update charts if they exist
        updateChartsTheme();
    }, 500); // Much faster theme change

    // Remove leaves and cleanup after animation completes
    setTimeout(() => {
        // Clean up all animation elements
        fullscreenLeaves.innerHTML = '';
        document.body.removeChild(fullscreenLeaves);
        document.body.removeChild(overlay);
        
        // Restore normal state
        body.classList.remove('theme-changing');
        themeToggle.disabled = false;
        themeToggle.classList.remove('theme-toggle-pulse');
        
        // Restore original container
        document.getElementById('leavesContainer').style.display = '';
        document.getElementById('leavesContainer').innerHTML = savedHTML;
    }, 1800); // Much shorter total animation time
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// Update chart colors based on theme
function updateChartsTheme() {
    if (typeof Chart !== 'undefined') {
        const isDark = document.body.classList.contains('dark-theme');
        
        Chart.defaults.color = isDark ? '#e8f1f5' : '#333';
        Chart.defaults.plugins.tooltip.backgroundColor = isDark ? 
            'rgba(45, 106, 79, 0.95)' : 'rgba(0, 0, 0, 0.8)';
        
        Chart.instances.forEach(chart => {
            chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            chart.options.scales.x.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            chart.options.scales.y.ticks.color = isDark ? '#e8f1f5' : '#333';
            chart.options.scales.x.ticks.color = isDark ? '#e8f1f5' : '#333';
            chart.update();
        });
    }
}
