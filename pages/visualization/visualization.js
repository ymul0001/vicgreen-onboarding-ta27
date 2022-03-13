/**
 * Declare all element constants
 */
const yieldCostDropdown = document.querySelector('#yield-cost-option');
const kerbsideRecycleableDropdown = document.querySelector('#kerbside-recycleable-option');

/**
 * Declare all pre-rendered graph canvas
 */

//contamination rate graph pre-data render starts here
let contaminationRateChartData = {
    labels: ['2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'],
    datasets: [{
        label: 'Contamination rate (%)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    }]
};

let contaminationRateConfig = {
    type: 'line',
    data: contaminationRateChartData,
    maintainAspectRatio: false,
    options: {
        plugins: {
            legend: {
              display: false
            }
        },
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 14,
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Contamination Rate'
                }
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Year'
                }
            }
        }
    }
};

const contaminationRateTempChart = new Chart(
    document.getElementById('contamination-rate-graph'),
    contaminationRateConfig
);
//contamination rate graph pre-data render starts here

//yield cost pre-rendered graph starts here
 let yieldCostData = {
    labels: [
      '80',
      '120',
      '140',
      '240'
    ],
    datasets: [{
      label: 'cost',
      data: [50, 50, 50, 50],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)'
      ],
      borderWidth: 2
    }]
};

let yieldDataConfig = {
    type: 'bar',
    data: yieldCostData,
    maintainAspectRatio: false,
    options: {
        plugins: {
            legend: {
              display: false
            }
        },
        responsive: true,
        scales: {
            y: {
                    min: 0,
                    max: 300,
                    grid: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Australian Dollar (AUD)'
                    }
            },
            x: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Collection System'
                }
            }
        }
    }
};

const yieldCostTempChart = new Chart(
    document.getElementById('yield-cost-graph'),
    yieldDataConfig
);
//yield cost pre-rendered graph ends here

//kerbside recycleables graph starts here
let kerbsideRecycleableChartData = {
    labels: ['2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'],
    datasets: [
        {
            label: 'total tonnes collected',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        },
        {
            label: 'total tonnes sorted',
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: 'rgb(0, 0, 0)',
            data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        }
    ]
};

let kerbsideRecycleableConfig = {
    type: 'line',
    data: kerbsideRecycleableChartData,
    options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 650000,
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Total Tonnes'
                }
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Year'
                }
            }
        }
    }
};

const kerbsideRecycleableTempChart = new Chart(
    document.getElementById('kerbside-recycleable-graph'),
    kerbsideRecycleableConfig
);
//kerbside recycleables graph ends here

/**
 * Declare all additional functions
 */



/**
 * Declare all graph functions
 */

const findContaminationRate = () => {
    axios.get('https://onboarding-ta27.herokuapp.com/v1/contaminationrate/findAllContaminationRate')
    .then(result => {
        //contamination rate graph re-render
        const contaminationRate = result.data.message;
        const labels = contaminationRate.map(item => item.year.toString());
        const contaminationRateData = contaminationRate.map(item => item.contamination_rate);
        contaminationRateChartData.labels = labels;
        contaminationRateChartData.datasets[0].data = contaminationRateData;
        contaminationRateTempChart.update();
    }).catch((error) => {
        console.log(error);
    });
}


const findAverageYieldCost = () => {
    axios.get('https://onboarding-ta27.herokuapp.com/v1/averageyieldcost/findAllAverageYieldCost')
    .then(result => {
        const collectionSystemLabels = result.data.message.map(item => item.collection_system_litre + ' L');
        const costPerPropertyServiced = result.data.message.map(item => item.cost_per_property_serviced_dollars);
        const costPerTonne = result.data.message.map(item => item.cost_per_tonne_dollars);
        yieldCostData.labels = collectionSystemLabels;
        if (yieldCostDropdown.value == "cost per tonne") {
            yieldCostData.datasets[0].data = costPerTonne;
        }
        else if (yieldCostDropdown.value == "cost per property serviced") {
            yieldCostData.datasets[0].data = costPerPropertyServiced;
        }
        yieldCostTempChart.update();
    }).catch((error) => {
        console.log(error);
    });
}

const findKerbsideRecycleable = () => {
    axios.get('https://onboarding-ta27.herokuapp.com/v1/kerbsiderecycleable/findAllKerbsideRecycleable')
    .then(result => {
        const kerbsideRecycleable = result.data.message;
        const labels = kerbsideRecycleable.map(item => item.year.toString());
        const metroTonnesCollected = kerbsideRecycleable.map(item => item.metro_tonnes_collected);
        const metroTonnesSorted = kerbsideRecycleable.map(item => item.metro_tonnes_sorted);
        const nonMetroTonnesCollected = kerbsideRecycleable.map(item => item.non_metro_tonnes_collected);
        const nonMetroTonnesSorted = kerbsideRecycleable.map(item => item.non_metro_tonnes_sorted);
        const stateTonnesCollected = kerbsideRecycleable.map(item => item.state_tonnes_collected);
        const stateTonnesSorted = kerbsideRecycleable.map(item => item.state_tonnes_sorted);
        kerbsideRecycleableChartData.labels = labels;
        if (kerbsideRecycleableDropdown.value == "metro") {
            kerbsideRecycleableChartData.datasets[0].data = metroTonnesCollected;
            kerbsideRecycleableChartData.datasets[1].data = metroTonnesSorted;
        }
        else if (kerbsideRecycleableDropdown.value == "non metro") {
            kerbsideRecycleableChartData.datasets[0].data = nonMetroTonnesCollected;
            kerbsideRecycleableChartData.datasets[1].data = nonMetroTonnesSorted;
        }
        else if (kerbsideRecycleableDropdown.value == "state") {
            kerbsideRecycleableChartData.datasets[0].data = stateTonnesCollected;
            kerbsideRecycleableChartData.datasets[1].data = stateTonnesSorted;
        }
        kerbsideRecycleableTempChart.update();
    }).catch((error) => {
        console.log(error);
    })
}

/**
 * Event listeners for dropdowns
 */
yieldCostDropdown.addEventListener("change", () => {
    findAverageYieldCost();
})

kerbsideRecycleableDropdown.addEventListener("change", () => {
    findKerbsideRecycleable();
})






//call functions here
findContaminationRate();
findAverageYieldCost();
findKerbsideRecycleable();