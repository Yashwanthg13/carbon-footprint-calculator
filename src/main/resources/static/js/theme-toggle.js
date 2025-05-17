// Theme toggle functionality with enhanced leaves animation
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'theme-leaf';
    
    // Randomize position, size, rotation and animation properties
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.animationDelay = `${Math.random() * 0.5}s`;
    leaf.style.animationDuration = `${Math.random() * 3 + 2}s`; // 2-5 seconds duration
    
    // Randomize size more dramatically
    const size = Math.random() * (36 - 16) + 16;
    leaf.style.fontSize = `${size}px`;
    
    // Add random rotation
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    return leaf;
}

function addLeaves() {
    const container = document.getElementById('leavesContainer');
    container.innerHTML = '';
    
    // Expanded variety of leaf and nature emojis for more visual interest
    const leaves = ['🍃', '🌿', '☘️', '🍂', '🍁', '🌱', '🌴', '🌳', '🌷', '🪴', '🍀'];
    
    // Create more leaves for a denser effect
    for (let i = 0; i < 50; i++) {
        const leaf = createLeaf();
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        
        // Add slight opacity variation
        leaf.style.opacity = (Math.random() * 0.5 + 0.5).toString(); // 0.5-1.0 opacity
        
        container.appendChild(leaf);
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
    
    // Add leaves before theme change for dramatic effect
    addLeaves();
    
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
    
    // Wait for leaves animation to get going
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
    }, 800); // Longer delay for better visual effect

    // Remove leaves and enable button after animation completes
    setTimeout(() => {
        document.getElementById('leavesContainer').innerHTML = '';
        themeToggle.disabled = false;
        themeToggle.classList.remove('theme-toggle-pulse');
        
        // Remove the overlay
        document.body.removeChild(overlay);
    }, 3000); // Longer duration for full animation effect
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
