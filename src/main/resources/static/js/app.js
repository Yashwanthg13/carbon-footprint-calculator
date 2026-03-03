(function () {
    if (!window.ecoCalcData) {
        return;
    }

    const ctx = document.getElementById('emissionsChart');
    if (!ctx) {
        return;
    }

    const values = [
        window.ecoCalcData.electricity,
        window.ecoCalcData.travel,
        window.ecoCalcData.food,
        window.ecoCalcData.waste
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Electricity', 'Travel', 'Food', 'Waste'],
            datasets: [{
                data: values,
                borderRadius: 10,
                backgroundColor: ['#4c9f70', '#2f7d57', '#66b88a', '#90cfa9']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw} kg CO₂`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => `${value} kg`
                    }
                }
            }
        }
    });
})();
