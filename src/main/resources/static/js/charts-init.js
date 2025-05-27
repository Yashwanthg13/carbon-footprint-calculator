// Simple chart initialization that will definitely work
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing charts');
    
    // Wait a bit to ensure everything is loaded
    setTimeout(function() {
        try {
            // Sample data for demonstration
            const electricityEmissions = 120.5;
            const travelEmissions = 85.3;
            const foodEmissions = 65.7;
            const wasteEmissions = 30.2;
            const totalEmissions = electricityEmissions + travelEmissions + foodEmissions + wasteEmissions;
            
            // Check if chart elements exist
            const emissionsChartElement = document.getElementById('emissionsChart');
            const comparisonChartElement = document.getElementById('comparisonChart');
            
            console.log('Emissions chart element:', emissionsChartElement);
            console.log('Comparison chart element:', comparisonChartElement);
            
            if (!emissionsChartElement || !comparisonChartElement) {
                console.error('Chart elements not found in the DOM');
                return;
            }
            
            // Neon theme colors
            const chartColors = [
                'rgba(57, 255, 20, 0.8)',    // Neon Green
                'rgba(255, 41, 117, 0.8)',   // Neon Pink
                'rgba(0, 234, 255, 0.8)',    // Neon Blue
                'rgba(255, 215, 0, 0.8)'     // Gold
            ];
            
            const chartBorderColors = [
                'rgba(57, 255, 20, 1)',
                'rgba(255, 41, 117, 1)',
                'rgba(0, 234, 255, 1)',
                'rgba(255, 215, 0, 1)'
            ];
            
            // Create doughnut chart
            new Chart(emissionsChartElement, {
                type: 'doughnut',
                data: {
                    labels: ['Electricity', 'Travel', 'Food', 'Waste'],
                    datasets: [{
                        data: [electricityEmissions, travelEmissions, foodEmissions, wasteEmissions],
                        backgroundColor: chartColors,
                        borderColor: chartBorderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#ffffff',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value.toFixed(1)} kg CO₂`;
                                }
                            }
                        }
                    }
                }
            });
            
            // Create bar chart
            new Chart(comparisonChartElement, {
                type: 'bar',
                data: {
                    labels: ['Electricity', 'Travel', 'Food', 'Waste'],
                    datasets: [{
                        label: 'Emissions (kg CO₂)',
                        data: [electricityEmissions, travelEmissions, foodEmissions, wasteEmissions],
                        backgroundColor: chartColors,
                        borderColor: chartBorderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw || 0;
                                    return `${value.toFixed(1)} kg CO₂`;
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('Charts initialized successfully');
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }, 500); // Short delay to ensure DOM is fully ready
});
