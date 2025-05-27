/**
 * Fix for dark theme visibility issues
 * Ensures metric values remain visible in dark theme, even after page refresh
 */

// Run immediately when script is loaded
(function() {
    // Function to force visibility of metric values
    function forceMetricValuesVisibility() {
        console.log('Forcing visibility of metric values...');
        
        // Target all metric values
        const metricValues = document.querySelectorAll('.metric-value');
        if (metricValues && metricValues.length > 0) {
            const isDark = document.body.classList.contains('dark-theme');
            const textColor = isDark ? '#ffffff' : '#333';
            const textShadow = isDark ? '0 0 2px rgba(255, 255, 255, 0.3)' : 'none';
            
            metricValues.forEach(value => {
                // Apply inline styles with !important to override any conflicting CSS
                value.style.cssText = `
                    color: ${isDark ? '#ffffff' : '#333333'} !important; 
                    visibility: visible !important; 
                    opacity: 1 !important;
                    display: block !important;
                    text-shadow: ${isDark ? '0 0 2px rgba(255, 255, 255, 0.3)' : 'none'} !important;
                    font-weight: bold !important;
                `;
                
                // Add a data attribute to track that we've processed this element
                value.setAttribute('data-visibility-fixed', 'true');
                
                // Check if this is the total emissions value by looking at its content
                const text = value.textContent || value.innerText;
                if (text && text.includes('kg CO₂')) {
                    console.log('Found total emissions value:', text);
                    // Apply even stronger styling for total emissions
                    value.style.cssText = `
                        color: ${isDark ? '#ffffff' : '#333333'} !important; 
                        visibility: visible !important; 
                        opacity: 1 !important;
                        display: block !important;
                        text-shadow: ${isDark ? '0 0 2px rgba(255, 255, 255, 0.3)' : 'none'} !important;
                        font-weight: bold !important;
                        font-size: 1.2em !important;
                        padding: 2px 5px !important;
                        border-radius: 4px !important;
                        border: ${isDark ? '1px solid #74c69d' : '1px solid #2d6a4f'} !important;
                    `;
                }
            });
            
            console.log(`Applied visibility fix to ${metricValues.length} metric values`);
        }
        
        // Specifically target the total emissions value by looking at its container
        const metricTitles = document.querySelectorAll('.metric-title');
        metricTitles.forEach(title => {
            if (title.textContent.includes('Total Household Emissions')) {
                console.log('Found Total Household Emissions title');
                const metricValue = title.nextElementSibling;
                if (metricValue && metricValue.classList.contains('metric-value')) {
                    console.log('Applying special styling to Total Household Emissions value');
                    metricValue.style.cssText = `
                        color: ${isDark ? '#ffffff' : '#333333'} !important; 
                        visibility: visible !important; 
                        opacity: 1 !important;
                        display: block !important;
                        text-shadow: ${isDark ? '0 0 2px rgba(255, 255, 255, 0.3)' : 'none'} !important;
                        font-weight: bold !important;
                        font-size: 1.2em !important;
                        padding: 2px 5px !important;
                        border-radius: 4px !important;
                        border: ${isDark ? '1px solid #74c69d' : '1px solid #2d6a4f'} !important;
                    `;
                }
            }
        });
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(forceMetricValuesVisibility, 100);
        });
    } else {
        setTimeout(forceMetricValuesVisibility, 100);
    }
    
    // Also run when window is fully loaded
    window.addEventListener('load', function() {
        setTimeout(forceMetricValuesVisibility, 300);
    });
    
    // Run again after a delay to catch any late-rendered elements
    setTimeout(forceMetricValuesVisibility, 1000);
    setTimeout(forceMetricValuesVisibility, 2000);
    
    // Create a MutationObserver to watch for changes to the DOM
    const observer = new MutationObserver(function(mutations) {
        setTimeout(forceMetricValuesVisibility, 100);
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
})();
