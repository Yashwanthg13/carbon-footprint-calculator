// Theme toggle functionality with enhanced leaves animation
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'theme-leaf';
    
    // Distribute leaves across the full screen (both horizontally and vertically)
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.top = `${Math.random() * 100}vh`; // Position leaves throughout the screen
    
    // Stagger animation timing for smoother overall effect
    leaf.style.animationDelay = `${Math.random() * 1.5}s`;
    leaf.style.animationDuration = `${Math.random() * 4 + 3}s`; // 3-7 seconds duration for smoother motion
    
    // Randomize size with wider range
    const size = Math.random() * (40 - 12) + 12;
    leaf.style.fontSize = `${size}px`;
    
    // Add random initial rotation and scale for variety
    const initialRotation = Math.random() * 360;
    const initialScale = 0.3 + Math.random() * 0.7; // 0.3-1.0 scale
    leaf.style.transform = `rotate(${initialRotation}deg) scale(${initialScale})`;
    
    // Add z-index variation for depth effect
    leaf.style.zIndex = Math.floor(Math.random() * 10) + 990; // Between 990-999
    
    return leaf;
}

function addLeaves(customContainer) {
    // Use customContainer if provided, otherwise use default container
    const container = customContainer || document.getElementById('leavesContainer');
    container.innerHTML = '';
    
    // Expanded variety of leaf and nature emojis for more visual interest
    const leaves = ['🍃', '🌿', '☘️', '🍂', '🍁', '🌱', '🌴', '🌳', '🌷', '🪴', '🍀', '🌲', '🌹', '🎄'];
    
    // Create many more leaves for full screen coverage - increase density for fullscreen mode
    const isFullscreen = customContainer !== undefined;
    const densityFactor = isFullscreen ? 2 : 1; // Double the leaf count for fullscreen mode
    const leafCount = Math.max(150, Math.floor(window.innerWidth * window.innerHeight / (8000 / densityFactor)));
    
    console.log(`Creating ${leafCount} leaves for ${isFullscreen ? 'fullscreen' : 'regular'} mode`);
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = createLeaf();
        
        // Add variety by occasionally using different leaf types with different weights
        const leafIndex = Math.random() < 0.7 ?
            Math.floor(Math.random() * 5) : // More common leaves (first 5)
            Math.floor(Math.random() * leaves.length); // All leaves
            
        leaf.textContent = leaves[leafIndex];
        
        // Vary opacity for depth effect
        leaf.style.opacity = (Math.random() * 0.6 + 0.4).toString(); // 0.4-1.0 opacity
        
        // Add special class for fullscreen mode
        if (isFullscreen) {
            leaf.classList.add('fullscreen-leaf');
        }
        
        // Generate fresh leaves in batches for smoother appearance
        // Use smaller batch delays for smoother appearance
        setTimeout(() => {
            container.appendChild(leaf);
        }, i % 20 * 25); // Stagger leaf creation in smaller batches
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
    
    // Play a subtle sound effect if available
    const soundEffect = new Audio();
    try {
        soundEffect.src = body.classList.contains('dark-theme') 
            ? '/audio/light-mode.mp3' 
            : '/audio/dark-mode.mp3';
        soundEffect.volume = 0.2;
        soundEffect.play().catch(e => console.log('Audio not supported or enabled'));
    } catch (e) {
        console.log('Audio playback not supported');
    }
    
    // Wait for leaves animation to get going before changing theme
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

        // Update charts if they exist
        updateChartsTheme();
    }, 1500); // Longer delay for better visual effect

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
    }, 5000); // Longer duration for full animation effect
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
