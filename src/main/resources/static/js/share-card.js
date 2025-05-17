/**
 * Instagram Share Card functionality for Carbon Footprint Calculator
 */

// Initialize share card functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initShareCard();
});

/**
 * Initialize the Instagram share card functionality
 */
function initShareCard() {
    const downloadCardBtn = document.getElementById('downloadCardBtn');
    const shareInstagramBtn = document.getElementById('shareInstagramBtn');
    const instagramCard = document.getElementById('instagramCard');
    
    if (!downloadCardBtn || !shareInstagramBtn || !instagramCard) return;
    
    // Download card as image
    downloadCardBtn.addEventListener('click', () => {
        generateAndDownloadCard();
    });
    
    // Share to Instagram
    shareInstagramBtn.addEventListener('click', () => {
        shareToInstagram();
    });
    
    // Customize card with user data
    customizeCard();
}

/**
 * Customize the Instagram card with user data
 */
function customizeCard() {
    // You can add more customization here based on user preferences
    // For example, changing colors based on the current theme or season
    
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const instagramCardInner = document.querySelector('.instagram-card-inner');
    
    if (isDarkTheme && instagramCardInner) {
        // Apply a different gradient for dark theme
        instagramCardInner.style.background = 'linear-gradient(135deg, #457b9d 0%, #1d3557 100%)';
    }
    
    // Add current date to the card
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    const footerElement = document.querySelector('.instagram-card-footer');
    if (footerElement) {
        const dateElement = document.createElement('div');
        dateElement.className = 'instagram-card-date';
        dateElement.textContent = formattedDate;
        dateElement.style.fontSize = '0.8rem';
        dateElement.style.opacity = '0.8';
        footerElement.appendChild(dateElement);
    }
}

/**
 * Generate and download the Instagram card as an image
 */
function generateAndDownloadCard() {
    const instagramCard = document.getElementById('instagramCard');
    if (!instagramCard) return;
    
    // Show loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.className = 'card-loading';
    loadingElement.innerHTML = '<div class="card-loading-spinner"></div>';
    instagramCard.appendChild(loadingElement);
    
    // Use html2canvas to convert the card to an image
    html2canvas(instagramCard, {
        allowTaint: true,
        useCORS: true,
        scale: 2, // Higher resolution
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
            // Remove loading indicator from the clone
            const clonedLoading = clonedDoc.querySelector('.card-loading');
            if (clonedLoading) clonedLoading.remove();
        }
    }).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(blob => {
            // Create download link
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'my-carbon-footprint.png';
            
            // Trigger download
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Clean up
            URL.revokeObjectURL(url);
            instagramCard.removeChild(loadingElement);
            
            // Show success animation
            showSuccessAnimation(downloadCardBtn);
        });
    }).catch(error => {
        console.error('Error generating image:', error);
        instagramCard.removeChild(loadingElement);
    });
}

/**
 * Share the Instagram card to Instagram
 * Note: Direct sharing to Instagram requires a mobile device
 * This function will generate the image and guide the user
 */
function shareToInstagram() {
    const instagramCard = document.getElementById('instagramCard');
    if (!instagramCard) return;
    
    // Show loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.className = 'card-loading';
    loadingElement.innerHTML = '<div class="card-loading-spinner"></div>';
    instagramCard.appendChild(loadingElement);
    
    // Use html2canvas to convert the card to an image
    html2canvas(instagramCard, {
        allowTaint: true,
        useCORS: true,
        scale: 2, // Higher resolution
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
            // Remove loading indicator from the clone
            const clonedLoading = clonedDoc.querySelector('.card-loading');
            if (clonedLoading) clonedLoading.remove();
        }
    }).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(blob => {
            // Create download link
            const url = URL.createObjectURL(blob);
            
            // Check if it's a mobile device
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            if (isMobile) {
                // Try to open Instagram with the image
                // Note: This only works on mobile devices with Instagram app installed
                const instagramUrl = `instagram://library?AssetPath=${encodeURIComponent(url)}`;
                window.location.href = instagramUrl;
                
                // Fallback in case the Instagram app doesn't open
                setTimeout(() => {
                    // If Instagram didn't open, just download the image
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.download = 'my-carbon-footprint.png';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    
                    // Show instructions modal
                    showInstagramInstructions();
                }, 2000);
            } else {
                // On desktop, download the image and show instructions
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = 'my-carbon-footprint.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                // Show instructions modal
                showInstagramInstructions();
            }
            
            // Clean up
            URL.revokeObjectURL(url);
            instagramCard.removeChild(loadingElement);
            
            // Show success animation
            showSuccessAnimation(shareInstagramBtn);
        });
    }).catch(error => {
        console.error('Error generating image:', error);
        instagramCard.removeChild(loadingElement);
    });
}

/**
 * Show instructions for sharing to Instagram
 */
function showInstagramInstructions() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'instagramModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'instagramModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="instagramModalLabel">Share to Instagram</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Your image has been downloaded. To share on Instagram:</p>
                    <ol>
                        <li>Open the Instagram app</li>
                        <li>Tap the + icon to create a new post</li>
                        <li>Select the downloaded image from your gallery</li>
                        <li>Add a caption and share!</li>
                    </ol>
                    <p class="text-muted small">Suggested caption: "I just calculated my carbon footprint with EcoCalc! My total emissions are ${getTotalEmissions()} kg CO₂. Calculate yours and help fight climate change! #CarbonFootprint #ClimateAction #Sustainability"</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Show modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Remove modal when hidden
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

/**
 * Get total emissions value for sharing
 */
function getTotalEmissions() {
    const totalEmissionsElement = document.getElementById('totalEmissionsValue');
    return totalEmissionsElement ? totalEmissionsElement.textContent : '0.0 kg CO₂';
}

/**
 * Show success animation on button
 */
function showSuccessAnimation(button) {
    if (!button) return;
    
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Success!';
    button.classList.add('success-animation');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('success-animation');
    }, 2000);
}

// Add success animation style
document.head.insertAdjacentHTML('beforeend', `
<style>
.success-animation {
    background-color: #28a745 !important;
    animation: successPulse 0.5s ease;
}

@keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
</style>
`);
