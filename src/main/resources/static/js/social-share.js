/**
 * Social media sharing functionality for Carbon Footprint Calculator
 */

// Initialize social sharing when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSocialSharing();
});

/**
 * Initialize social sharing buttons and functionality
 */
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.social-share-btn');
    
    if (shareButtons.length === 0) return;
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = button.getAttribute('data-platform');
            shareResults(platform);
        });
    });
    
    // Initialize copy link button
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyResultsLink();
        });
    }
}

/**
 * Share results to specified social media platform
 * @param {string} platform - The social media platform to share on
 */
function shareResults(platform) {
    // Get results data
    const totalEmissions = document.getElementById('totalEmissionsValue') ? 
        document.getElementById('totalEmissionsValue').textContent : '';
    const perPersonEmissions = document.getElementById('perPersonEmissionsValue') ? 
        document.getElementById('perPersonEmissionsValue').textContent : '';
    
    // Create share text
    const shareText = `I just calculated my carbon footprint with EcoCalc! My total emissions are ${totalEmissions} kg CO₂ (${perPersonEmissions} kg per person). Calculate yours and help fight climate change! #CarbonFootprint #ClimateAction`;
    
    // Create share URL
    const shareUrl = encodeURIComponent(window.location.href);
    
    // Share based on platform
    let shareLink = '';
    
    switch(platform) {
        case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`;
            break;
        case 'facebook':
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`;
            break;
        case 'linkedin':
            shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
            break;
        case 'whatsapp':
            shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + decodeURIComponent(shareUrl))}`;
            break;
        default:
            console.error('Unknown social platform:', platform);
            return;
    }
    
    // Open share dialog
    window.open(shareLink, '_blank', 'width=600,height=400');
    
    // Track share event
    console.log(`Shared to ${platform}`);
    
    // Show success animation
    animateShareButton(platform);
}

/**
 * Copy results link to clipboard
 */
function copyResultsLink() {
    const shareUrl = window.location.href;
    const totalEmissions = document.getElementById('totalEmissionsValue') ? 
        document.getElementById('totalEmissionsValue').textContent : '';
    
    // Create share text
    const shareText = `Check out my carbon footprint results (${totalEmissions} kg CO₂) on EcoCalc: ${shareUrl}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareText)
        .then(() => {
            // Show success message
            const copyLinkBtn = document.getElementById('copyLinkBtn');
            const originalText = copyLinkBtn.innerHTML;
            
            copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyLinkBtn.classList.add('copy-success');
            
            setTimeout(() => {
                copyLinkBtn.innerHTML = originalText;
                copyLinkBtn.classList.remove('copy-success');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

/**
 * Animate share button after sharing
 * @param {string} platform - The social media platform
 */
function animateShareButton(platform) {
    const button = document.querySelector(`.social-share-btn[data-platform="${platform}"]`);
    if (!button) return;
    
    button.classList.add('share-success');
    
    setTimeout(() => {
        button.classList.remove('share-success');
    }, 1500);
}

/**
 * Generate a shareable image of results
 * This is a more advanced feature that would require canvas manipulation
 */
function generateShareableImage() {
    // This would be implemented using HTML2Canvas or a similar library
    console.log('Generating shareable image - feature not yet implemented');
}
