// Theme toggle functionality with leaves animation
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'theme-leaf';
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.animationDelay = `${Math.random() * 2}s`;
    leaf.style.fontSize = `${Math.random() * (24 - 16) + 16}px`;
    return leaf;
}

function addLeaves() {
    const container = document.getElementById('leavesContainer');
    container.innerHTML = '';
    
    // Add different types of leaf emojis
    const leaves = ['🍃', '🌿', '☘️'];
    for (let i = 0; i < 20; i++) {
        const leaf = createLeaf();
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        container.appendChild(leaf);
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Add leaves before theme change
    addLeaves();
    
    // Wait for leaves animation
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
    }, 300);

    // Remove leaves after animation
    setTimeout(() => {
        document.getElementById('leavesContainer').innerHTML = '';
    }, 2000);
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
