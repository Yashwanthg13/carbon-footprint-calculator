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

        // Update charts if they exist
        updateChartsTheme();
        
        // Ensure metric values remain visible
        updateMetricValuesVisibility();
        
        // Force text color based on theme
        const isDarkTheme = body.classList.contains('dark-theme');
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, label, .form-label, .metric-title, .help-text').forEach(el => {
            el.style.color = isDarkTheme ? '#ffffff' : '#333333';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.textShadow = isDarkTheme ? '0 0 2px rgba(255, 255, 255, 0.3)' : 'none';
        });
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
    }, 1800); // Much shorter total animation time // Longer duration for full animation effect
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Set default theme class if none exists
    if (!document.body.classList.contains('dark-theme') && !document.body.classList.contains('light-theme')) {
        document.body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
    }
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }
    
    // Force update of all metric values to ensure visibility
    setTimeout(updateMetricValuesVisibility, 100); // Slight delay to ensure DOM is fully loaded
    
    // Initialize charts with correct theme
    updateChartsTheme();
});

// Additional event listener specifically for ensuring metric values are visible after page load
window.addEventListener('load', function() {
    // Force metric values to be visible, especially important for dark theme
    setTimeout(function() {
        updateMetricValuesVisibility();
        
        // Apply direct styling to metric values to ensure visibility
        const metricValues = document.querySelectorAll('.metric-value');
        if (metricValues && metricValues.length > 0) {
            const isDark = document.body.classList.contains('dark-theme');
            metricValues.forEach(value => {
                // Force inline styles with !important to override any CSS
                value.setAttribute('style', 
                    `color: ${isDark ? '#000000' : '#333'} !important; 
                     visibility: visible !important; 
                     opacity: 1 !important; 
                     text-shadow: none !important;`);
            });
            console.log(`Forced visibility for ${metricValues.length} metric values on page load`);
        }
    }, 300); // Slightly longer delay to ensure everything is rendered
});

// Function to ensure metric values are visible in both themes
function updateMetricValuesVisibility() {
    const metricValues = document.querySelectorAll('.metric-value');
    if (metricValues && metricValues.length > 0) {
        const isDark = document.body.classList.contains('dark-theme');
        metricValues.forEach(value => {
            // Force inline styles to override any CSS that might be hiding the values
            const isDark = document.body.classList.contains('dark-theme');
            value.style.color = isDark ? '#ffffff' : '#333';
            value.style.textShadow = isDark ? '0 0 2px rgba(255, 255, 255, 0.3)' : 'none';
            value.style.visibility = 'visible';
            value.style.opacity = '1';
            value.style.padding = '2px 5px';
            value.style.borderRadius = '4px';
            value.style.border = isDark ? '1px solid #74c69d' : '1px solid #2d6a4f';
            
            // Add a data attribute to track that we've processed this element
            value.setAttribute('data-theme-processed', 'true');
        });
        console.log(`Updated visibility for ${metricValues.length} metric values`);
    }
    
    // Update all text elements based on theme
    const isDarkTheme = document.body.classList.contains('dark-theme');
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, label, .form-label, .metric-title, .help-text').forEach(el => {
        el.style.color = isDarkTheme ? '#ffffff' : '#333333';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.textShadow = isDarkTheme ? '0 0 2px rgba(255, 255, 255, 0.3)' : 'none';
    });
}

// Update chart colors based on theme
function updateChartsTheme() {
    if (typeof Chart !== 'undefined') {
        const isDark = document.body.classList.contains('dark-theme');
        
        // Update global chart defaults
        Chart.defaults.color = isDark ? '#000000' : '#333';
        Chart.defaults.plugins.tooltip.backgroundColor = isDark ? 
            'rgba(45, 106, 79, 0.95)' : 'rgba(0, 0, 0, 0.8)';
        
        // Set theme-specific fonts
        const darkThemeFont = "'Orbitron', 'Segoe UI', sans-serif";
        const lightThemeFont = "'Poppins', 'Segoe UI', sans-serif";
        const currentFont = isDark ? darkThemeFont : lightThemeFont;
        
        // Apply font to global defaults
        Chart.defaults.font.family = currentFont;
        
        // Update all chart instances
        if (Chart.instances && Chart.instances.length > 0) {
            Chart.instances.forEach(chart => {
                if (chart.options && chart.options.scales) {
                    // Update Y axis if it exists
                    if (chart.options.scales.y) {
                        chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                        chart.options.scales.y.ticks.color = isDark ? '#e8f1f5' : '#333';
                        chart.options.scales.y.ticks.font = { family: currentFont };
                    }
                    
                    // Update X axis if it exists
                    if (chart.options.scales.x) {
                        chart.options.scales.x.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                        chart.options.scales.x.ticks.color = isDark ? '#e8f1f5' : '#333';
                        chart.options.scales.x.ticks.font = { family: currentFont };
                    }
                }
                
                // Update tooltip text color and font for better visibility
                if (chart.options.plugins && chart.options.plugins.tooltip) {
                    chart.options.plugins.tooltip.titleColor = isDark ? '#ffffff' : '#333';
                    chart.options.plugins.tooltip.bodyColor = isDark ? '#ffffff' : '#333';
                    chart.options.plugins.tooltip.borderColor = isDark ? 'rgba(57, 255, 20, 0.8)' : 'rgba(0, 0, 0, 0.2)';
                    chart.options.plugins.tooltip.borderWidth = isDark ? 2 : 1;
                    
                    // Set tooltip fonts
                    if (chart.options.plugins.tooltip.titleFont) {
                        chart.options.plugins.tooltip.titleFont.family = currentFont;
                    }
                    if (chart.options.plugins.tooltip.bodyFont) {
                        chart.options.plugins.tooltip.bodyFont.family = currentFont;
                    }
                }
                
                // Update legend font if it exists
                if (chart.options.plugins && chart.options.plugins.legend && 
                    chart.options.plugins.legend.labels && 
                    chart.options.plugins.legend.labels.font) {
                    chart.options.plugins.legend.labels.font.family = currentFont;
                    chart.options.plugins.legend.labels.font.weight = isDark ? 'bold' : 'normal';
                }
                
                // Apply changes
                chart.update();
            });
        }
    }
    
    // Ensure metric values are visible in both themes
    const metricValues = document.querySelectorAll('.metric-value');
    if (metricValues) {
        const isDark = document.body.classList.contains('dark-theme');
        metricValues.forEach(value => {
            value.style.color = isDark ? '#e8f1f5' : '#333';
            value.style.textShadow = isDark ? '0 0 5px rgba(57, 255, 20, 0.5)' : 'none';
        });
    }
}
