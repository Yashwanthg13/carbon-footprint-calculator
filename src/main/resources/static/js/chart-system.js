/**
 * EcoCalc Chart System
 * A complete implementation for carbon footprint visualization
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chart system initializing...');
    
    // Initialize charts when DOM is ready
    initializeCharts();
    
    // Add window resize handler for responsiveness
    window.addEventListener('resize', function() {
        // Debounce resize events
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function() {
            console.log('Window resized, adjusting charts...');
            adjustChartsForScreenSize();
        }, 300);
    });
});

/**
 * Initialize all charts with default or actual data
 */
function initializeCharts() {
    // Check if we have actual result data
    const hasActualData = document.getElementById('electricityEmissions') !== null;
    
    // Data for charts
    let chartData;
    
    if (hasActualData) {
        // Get actual data from hidden inputs
        chartData = {
            electricity: parseFloat(document.getElementById('electricityEmissions').value) || 0,
            travel: parseFloat(document.getElementById('travelEmissions').value) || 0,
            food: parseFloat(document.getElementById('foodEmissions').value) || 0,
            waste: parseFloat(document.getElementById('wasteEmissions').value) || 0
        };
        chartData.total = parseFloat(document.getElementById('totalEmissions').value) || 0;
        chartData.perPerson = parseFloat(document.getElementById('perPersonEmissions').value) || 0;
    } else {
        // Use sample data for demonstration
        chartData = {
            electricity: 120.5,
            travel: 85.3,
            food: 65.7,
            waste: 30.2
        };
        chartData.total = chartData.electricity + chartData.travel + chartData.food + chartData.waste;
        chartData.perPerson = chartData.total / 2; // Assuming 2 people household
    }
    
    console.log('Chart data:', chartData);
    
    // Define chart colors - neon theme
    const chartColors = {
        backgroundColor: [
            'rgba(57, 255, 20, 0.8)',    // Neon Green
            'rgba(255, 41, 117, 0.8)',   // Neon Pink
            'rgba(0, 234, 255, 0.8)',    // Neon Blue
            'rgba(255, 215, 0, 0.8)'     // Gold
        ],
        borderColor: [
            'rgba(57, 255, 20, 1)',
            'rgba(255, 41, 117, 1)',
            'rgba(0, 234, 255, 1)',
            'rgba(255, 215, 0, 1)'
        ],
        tooltipBackground: 'rgba(0, 0, 0, 0.9)',
        tooltipBorder: 'rgba(57, 255, 20, 0.8)',
        tooltipText: '#39ff14',
        gridLines: 'rgba(57, 255, 20, 0.1)',
        ticksColor: '#ffffff'
    };
    
    // Create charts
    createDoughnutChart('emissionsChart', chartData, chartColors);
    createBarChart('comparisonChart', chartData, chartColors);
    
    // Adjust for current screen size
    adjustChartsForScreenSize();
    
    console.log('All charts initialized successfully');
}

/**
 * Create concentric circle graph for emissions breakdown
 */
function createDoughnutChart(canvasId, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas element with ID "${canvasId}" not found`);
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Calculate the total emissions for percentage calculations
    const totalEmissions = data.electricity + data.travel + data.food + data.waste;
    
    // Create datasets for concentric circles - from outer to inner
    const datasets = [
        {
            // Electricity - outermost circle
            data: [data.electricity, 0, 0, 0],
            backgroundColor: [colors.backgroundColor[0], 'transparent', 'transparent', 'transparent'],
            borderColor: [colors.borderColor[0], 'transparent', 'transparent', 'transparent'],
            borderWidth: 1,
            weight: 1,
            hoverOffset: 15
        },
        {
            // Travel - second circle
            data: [0, data.travel, 0, 0],
            backgroundColor: ['transparent', colors.backgroundColor[1], 'transparent', 'transparent'],
            borderColor: ['transparent', colors.borderColor[1], 'transparent', 'transparent'],
            borderWidth: 1,
            weight: 0.8,
            hoverOffset: 15
        },
        {
            // Food - third circle
            data: [0, 0, data.food, 0],
            backgroundColor: ['transparent', 'transparent', colors.backgroundColor[2], 'transparent'],
            borderColor: ['transparent', 'transparent', colors.borderColor[2], 'transparent'],
            borderWidth: 1,
            weight: 0.6,
            hoverOffset: 15
        },
        {
            // Waste - innermost circle
            data: [0, 0, 0, data.waste],
            backgroundColor: ['transparent', 'transparent', 'transparent', colors.backgroundColor[3]],
            borderColor: ['transparent', 'transparent', 'transparent', colors.borderColor[3]],
            borderWidth: 1,
            weight: 0.4,
            hoverOffset: 15
        }
    ];
    
    // Create chart configuration
    const config = {
        type: 'pie',
        data: {
            labels: ['Electricity', 'Travel', 'Food', 'Waste'],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '30%', // Center hole size
            radius: '90%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: colors.ticksColor,
                        font: {
                            family: document.body.classList.contains('dark-theme') ? 
                                "'Orbitron', 'Segoe UI', sans-serif" : 
                                "'Poppins', 'Segoe UI', sans-serif",
                            size: 12,
                            weight: document.body.classList.contains('dark-theme') ? 'bold' : 'normal'
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: colors.tooltipBackground,
                    titleFont: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 13,
                        weight: 'bold'
                    },
                    padding: 12,
                    borderColor: colors.tooltipBorder,
                    borderWidth: 2,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            // Use full precision for calculations
                            const value = context.raw || 0;
                            const percentage = Math.round((value / totalEmissions) * 100);
                            // Display with only one digit after decimal point
                            return `${label}: ${value.toFixed(1)} kg CO₂ (${percentage}%)`;
                        },
                        labelTextColor: function() {
                            return colors.tooltipText;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };
    
    try {
        // Create and return the chart
        return new Chart(ctx, config);
    } catch (error) {
        console.error('Error creating concentric circle graph:', error);
        return null;
    }
}

/**
 * Create bar chart for emissions comparison
 */
function createBarChart(canvasId, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas element with ID "${canvasId}" not found`);
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Create chart configuration
    const config = {
        type: 'bar',
        data: {
            labels: ['Electricity', 'Travel', 'Food', 'Waste'],
            datasets: [{
                label: 'Emissions (kg CO₂)',
                data: [data.electricity, data.travel, data.food, data.waste],
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor,
                borderWidth: 1,
                borderRadius: 5,
                maxBarThickness: 50
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.gridLines
                    },
                    ticks: {
                        color: colors.ticksColor,
                        font: {
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.ticksColor,
                        font: {
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: colors.tooltipBackground,
                    titleFont: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 13,
                        weight: 'bold'
                    },
                    padding: 12,
                    borderColor: colors.tooltipBorder,
                    borderWidth: 2,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            // Use full precision for calculations
                            const value = context.raw || 0;
                            const percentage = Math.round((value / data.total) * 100);
                            // Display with only one digit after decimal point
                            return `${value.toFixed(1)} kg CO₂ (${percentage}%)`;
                        },
                        labelTextColor: function() {
                            return colors.tooltipText;
                        }
                    }
                }
            },
            animation: {
                delay: function(context) {
                    return context.dataIndex * 100;
                },
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    };
    
    try {
        // Create and return the chart
        return new Chart(ctx, config);
    } catch (error) {
        console.error('Error creating bar chart:', error);
        return null;
    }
}

/**
 * Adjust charts for different screen sizes
 */
function adjustChartsForScreenSize() {
    const isMobile = window.innerWidth < 768;
    
    // Get all Chart instances
    if (typeof Chart === 'undefined' || !Chart.instances) {
        console.warn('Chart.js not loaded or no charts created yet');
        return;
    }
    
    Chart.instances.forEach(chart => {
        // Adjust legend font size
        if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
            chart.options.plugins.legend.labels.font.size = isMobile ? 10 : 12;
            chart.options.plugins.legend.labels.padding = isMobile ? 10 : 20;
        }
        
        // Adjust bar thickness for bar charts
        if (chart.config.type === 'bar' && chart.data.datasets && chart.data.datasets.length > 0) {
            chart.data.datasets[0].maxBarThickness = isMobile ? 30 : 50;
        }
        
        // Adjust axis font sizes for bar charts
        if (chart.config.type === 'bar' && chart.options.scales) {
            if (chart.options.scales.y && chart.options.scales.y.ticks) {
                chart.options.scales.y.ticks.font.size = isMobile ? 10 : 12;
            }
            if (chart.options.scales.x && chart.options.scales.x.ticks) {
                chart.options.scales.x.ticks.font.size = isMobile ? 10 : 12;
            }
        }
        
        // Update the chart with new options
        chart.update();
    });
    
    console.log(`Charts adjusted for ${isMobile ? 'mobile' : 'desktop'} view`);
}
