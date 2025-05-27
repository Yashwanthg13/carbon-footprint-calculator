// Chart initialization script
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for demonstration
    const electricityEmissions = 120.5;
    const travelEmissions = 85.3;
    const foodEmissions = 65.7;
    const wasteEmissions = 30.2;
    const totalEmissions = electricityEmissions + travelEmissions + foodEmissions + wasteEmissions;
    const perPersonEmissions = totalEmissions / 2; // Assuming 2 people household
    
    // Check if chart elements exist
    const emissionsChartElement = document.getElementById('emissionsChart');
    const comparisonChartElement = document.getElementById('comparisonChart');
    
    if (!emissionsChartElement || !comparisonChartElement) {
        console.error('Chart elements not found in the DOM');
        return;
    }
    
    // Set up colors with transparency for charts - neon theme
    const chartColors = {
        electricity: 'rgba(57, 255, 20, 0.8)',    // Neon Green
        travel: 'rgba(255, 41, 117, 0.8)',        // Neon Pink
        food: 'rgba(0, 234, 255, 0.8)',           // Neon Blue
        waste: 'rgba(255, 215, 0, 0.8)',          // Gold
        border: {
            electricity: 'rgba(57, 255, 20, 1)',
            travel: 'rgba(255, 41, 117, 1)',
            food: 'rgba(0, 234, 255, 1)',
            waste: 'rgba(255, 215, 0, 1)'
        }
    };
    
    try {
        // Create doughnut chart for emissions breakdown
        const pieCtx = emissionsChartElement.getContext('2d');
        const pieChart = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Electricity', 'Travel', 'Food', 'Waste'],
                datasets: [{
                    data: [electricityEmissions, travelEmissions, foodEmissions, wasteEmissions],
                    backgroundColor: [
                        chartColors.electricity,
                        chartColors.travel,
                        chartColors.food,
                        chartColors.waste
                    ],
                    borderColor: [
                        chartColors.border.electricity,
                        chartColors.border.travel,
                        chartColors.border.food,
                        chartColors.border.waste
                    ],
                    borderWidth: 1,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // Mobile-specific adjustments
                onResize: function(chart, size) {
                    if (window.innerWidth < 768) {
                        chart.options.plugins.legend.labels.font.size = 10;
                        chart.options.plugins.legend.labels.padding = 10;
                    } else {
                        chart.options.plugins.legend.labels.font.size = 12;
                        chart.options.plugins.legend.labels.padding = 20;
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                size: 12
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
                        borderColor: 'rgba(57, 255, 20, 0.8)',
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
                                return '#39ff14'; // Neon green text for better visibility
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
        });
        
        // Create bar chart for emissions comparison
        const barCtx = comparisonChartElement.getContext('2d');
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Electricity', 'Travel', 'Food', 'Waste'],
                datasets: [{
                    label: 'Emissions (kg CO₂)',
                    data: [electricityEmissions, travelEmissions, foodEmissions, wasteEmissions],
                    backgroundColor: [
                        chartColors.electricity,
                        chartColors.travel,
                        chartColors.food,
                        chartColors.waste
                    ],
                    borderColor: [
                        chartColors.border.electricity,
                        chartColors.border.travel,
                        chartColors.border.food,
                        chartColors.border.waste
                    ],
                    borderWidth: 1,
                    borderRadius: 5,
                    maxBarThickness: 50
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // Mobile-specific adjustments
                onResize: function(chart, size) {
                    if (window.innerWidth < 768) {
                        chart.options.scales.y.ticks.font.size = 10;
                        chart.options.scales.x.ticks.font.size = 10;
                        chart.data.datasets[0].maxBarThickness = 30;
                    } else {
                        chart.options.scales.y.ticks.font.size = 12;
                        chart.options.scales.x.ticks.font.size = 12;
                        chart.data.datasets[0].maxBarThickness = 50;
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(57, 255, 20, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff',
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
                            color: '#ffffff',
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
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
                        borderColor: 'rgba(57, 255, 20, 0.8)',
                        borderWidth: 2,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                // Use full precision for calculations
                                const value = context.raw || 0;
                                const percentage = Math.round((value / totalEmissions) * 100);
                                // Display with only one digit after decimal point
                                return `${value.toFixed(1)} kg CO₂ (${percentage}%)`;
                            },
                            labelTextColor: function() {
                                return '#39ff14'; // Neon green text for better visibility
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
        });
        
        console.log('Charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
    
    // Animation for charts on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if(position.top < window.innerHeight && position.bottom >= 0) {
                element.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    };
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
});
