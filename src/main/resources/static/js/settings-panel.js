/**
 * Settings panel functionality for the Carbon Footprint Calculator
 */

// Initialize settings panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSettingsPanel();
    initSeasonIndicator();
});

/**
 * Initialize the settings panel and toggle functionality
 */
function initSettingsPanel() {
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const soundToggle = document.getElementById('soundToggle');
    const interactiveToggle = document.getElementById('interactiveToggle');
    const seasonSelect = document.getElementById('seasonSelect');
    
    // Set initial toggle states from localStorage
    soundToggle.checked = localStorage.getItem('soundEffects') !== 'disabled';
    interactiveToggle.checked = localStorage.getItem('interactiveLeaves') !== 'disabled';
    
    // Initialize season selection
    const savedSeason = localStorage.getItem('seasonOverride') || 'auto';
    seasonSelect.value = savedSeason;
    
    // Toggle settings panel visibility
    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
        
        // Add animation to settings toggle
        settingsToggle.classList.add('spin-animation');
        setTimeout(() => settingsToggle.classList.remove('spin-animation'), 500);
    });
    
    // Sound toggle handler
    soundToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            localStorage.removeItem('soundEffects'); // Enable sounds (default)
            appState.soundsEnabled = true;
            
            // Play a test sound
            try {
                const soundEffect = new Audio();
                soundEffect.src = '/audio/toggle-click.mp3';
                soundEffect.volume = 0.2;
                soundEffect.play().catch(e => console.log('Audio not supported or enabled'));
            } catch (e) {
                console.log('Audio playback not supported');
            }
        } else {
            localStorage.setItem('soundEffects', 'disabled');
            appState.soundsEnabled = false;
        }
    });
    
    // Interactive leaves toggle handler
    interactiveToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            localStorage.removeItem('interactiveLeaves'); // Enable interactive leaves (default)
            appState.interactiveEnabled = true;
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            localStorage.setItem('interactiveLeaves', 'disabled');
            appState.interactiveEnabled = false;
            document.removeEventListener('mousemove', handleMouseMove);
        }
    });
    
    // Season override handler
    seasonSelect.addEventListener('change', (e) => {
        const selectedSeason = e.target.value;
        
        if (selectedSeason === 'auto') {
            localStorage.removeItem('seasonOverride');
            
            // Use current detected season
            if (window.EcoCalcSeasons) {
                appState.currentSeason = window.EcoCalcSeasons.getCurrentSeason();
                updateSeasonalTheme();
            }
        } else {
            // Use selected season
            localStorage.setItem('seasonOverride', selectedSeason);
            
            if (window.EcoCalcSeasons && window.EcoCalcSeasons.SEASONS[selectedSeason]) {
                appState.currentSeason = {
                    key: selectedSeason,
                    ...window.EcoCalcSeasons.SEASONS[selectedSeason]
                };
                updateSeasonalTheme();
            }
        }
    });
    
    // Click outside to close settings panel
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });
}

/**
 * Update seasonal theme based on current season
 */
function updateSeasonalTheme() {
    if (!appState.currentSeason) return;
    
    // Update season indicator
    initSeasonIndicator();
    
    // Apply seasonal colors
    const isDark = document.body.classList.contains('dark-theme');
    window.EcoCalcSeasons.applySeasonalColors(appState.currentSeason, isDark);
    
    // Update body class for season-specific styles
    document.body.classList.remove('season-spring', 'season-summer', 'season-autumn', 'season-winter');
    document.body.classList.add(`season-${appState.currentSeason.key}`);
    
    console.log(`Applied theme for ${appState.currentSeason.name} season`);
}

/**
 * Initialize the season indicator in the theme toggle button
 */
function initSeasonIndicator() {
    const seasonIndicator = document.getElementById('seasonIndicator');
    
    if (!seasonIndicator || !appState.currentSeason) return;
    
    // Show appropriate season emoji
    let seasonEmoji = '🌿'; // default
    
    switch(appState.currentSeason.key) {
        case 'spring': seasonEmoji = '🌱'; break;
        case 'summer': seasonEmoji = '☀️'; break;
        case 'autumn': seasonEmoji = '🍂'; break;
        case 'winter': seasonEmoji = '❄️'; break;
    }
    
    seasonIndicator.textContent = seasonEmoji;
    seasonIndicator.title = `Current theme: ${appState.currentSeason.name}`;
}

// Add spin animation for settings icon
document.head.insertAdjacentHTML('beforeend', `
<style>
.spin-animation {
    animation: spin-settings 0.5s ease-out;
}
@keyframes spin-settings {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`);
