/**
 * Season-based theme management for EcoCalc
 */

// Season definitions with dates and theme characteristics
const SEASONS = {
    spring: {
        name: 'Spring',
        months: [2, 3, 4], // March, April, May
        leaves: ['🌿', '🌱', '🌷', '🌸', '🌺', '☘️', '🪴'],
        primaryLeaves: ['🌿', '🌱', '🌷'],
        colors: {
            light: {
                primary: '#74c69d',
                background: 'linear-gradient(135deg, #f0f7f4 0%, #e0f0ea 100%)',
                accent: '#2d6a4f'
            },
            dark: {
                primary: '#2d6a4f',
                background: 'linear-gradient(135deg, #081c15 0%, #1b4332 100%)',
                accent: '#74c69d'
            }
        },
        soundEffects: {
            toggle: 'spring-toggle.mp3',
            ambient: 'spring-ambient.mp3'
        }
    },
    summer: {
        name: 'Summer',
        months: [5, 6, 7], // June, July, August
        leaves: ['🌴', '🌳', '🌵', '🍃', '🌊', '🌞', '🌺'],
        primaryLeaves: ['🌴', '🌳', '🍃'],
        colors: {
            light: {
                primary: '#90e0ef',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f5ee 100%)',
                accent: '#0077b6'
            },
            dark: {
                primary: '#0077b6',
                background: 'linear-gradient(135deg, #03045e 0%, #023e8a 100%)',
                accent: '#90e0ef'
            }
        },
        soundEffects: {
            toggle: 'summer-toggle.mp3',
            ambient: 'summer-ambient.mp3'
        }
    },
    autumn: {
        name: 'Autumn',
        months: [8, 9, 10], // September, October, November
        leaves: ['🍂', '🍁', '🍄', '🌰', '🍊', '🎃', '🦊'],
        primaryLeaves: ['🍂', '🍁', '🍄'],
        colors: {
            light: {
                primary: '#e76f51',
                background: 'linear-gradient(135deg, #fff1e6 0%, #fde4cf 100%)',
                accent: '#bc6c25'
            },
            dark: {
                primary: '#bc6c25',
                background: 'linear-gradient(135deg, #7f5539 0%, #6c584c 100%)',
                accent: '#e76f51'
            }
        },
        soundEffects: {
            toggle: 'autumn-toggle.mp3',
            ambient: 'autumn-ambient.mp3'
        }
    },
    winter: {
        name: 'Winter',
        months: [11, 0, 1], // December, January, February
        leaves: ['❄️', '🌨️', '⛄', '🌲', '✨', '🌟', '🎄'],
        primaryLeaves: ['❄️', '🌨️', '🌲'],
        colors: {
            light: {
                primary: '#a8dadc',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                accent: '#457b9d'
            },
            dark: {
                primary: '#457b9d',
                background: 'linear-gradient(135deg, #1d3557 0%, #2b2d42 100%)',
                accent: '#a8dadc'
            }
        },
        soundEffects: {
            toggle: 'winter-toggle.mp3',
            ambient: 'winter-ambient.mp3'
        }
    }
};

/**
 * Determines the current season based on the local date
 * @returns {Object} The current season object
 */
function getCurrentSeason() {
    const now = new Date();
    const currentMonth = now.getMonth();
    
    for (const [seasonKey, season] of Object.entries(SEASONS)) {
        if (season.months.includes(currentMonth)) {
            return { key: seasonKey, ...season };
        }
    }
    
    // Default to spring if something goes wrong
    return { key: 'spring', ...SEASONS.spring };
}

/**
 * Applies seasonal colors to the application theme
 * @param {Object} season - The season object containing color schemes
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function applySeasonalColors(season, isDarkMode) {
    const colorScheme = isDarkMode ? season.colors.dark : season.colors.light;
    const root = document.documentElement;
    
    // Set CSS variables for theme colors
    root.style.setProperty('--accent-color-primary', colorScheme.primary);
    root.style.setProperty('--accent-color-light', isDarkMode ? season.colors.dark.accent : season.colors.light.primary);
    root.style.setProperty('--accent-color-dark', isDarkMode ? season.colors.dark.primary : season.colors.light.accent);
    
    // Update gradients
    if (!isDarkMode) {
        document.body.style.background = colorScheme.background;
    } else {
        document.body.style.background = colorScheme.background;
    }
}

// Export functions and constants
window.EcoCalcSeasons = {
    getCurrentSeason,
    applySeasonalColors,
    SEASONS
};
