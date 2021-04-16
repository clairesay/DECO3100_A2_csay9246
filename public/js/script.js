// var plotDiv = document.getElementById('myPlot');

// const dataSource = "https://raw.githubusercontent.com/dongasr/DECO3100/main/covid-mobility-data.csv"

// function loadData() {
//   Plotly.d3.csv(dataSource, function(data) { processData(data)});
// };

// function processData(allRows) {
//   // console.log(allRows)
//   let date = [], driving = [], publicTransport = [], walking = [], confirmed = [];
//   // , deaths = [], tests = [], recovered = [], hospitalised = [], icu = [], vent = [];
//   for (let i = 0; i < allRows.length; i ++) {
//     let row = allRows[i];
//     date.push(row['date']);
//     driving.push(row['driving']);
//     publicTransport.push(row['public transport'])
//     walking.push(row['walking'])
//     confirmed.push(row['confirmed'])
//   }
//   makePlot(date, driving, publicTransport, walking, confirmed);
// }

// function makePlot(date, driving, publicTransport, walking, confirmed) {
//   var traces = [{
//     x: date,
//     y: driving,
//     name: 'Driving',
//   },
//   {
//     x: date,
//     y: publicTransport,
//     name: 'Public Transport'
//   },
//   {
//     x: date,
//     y: walking,
//     name: 'Walking'
//   },
//   {
//     x: date,
//     y: confirmed,
//     name: 'Confirmed COVID-19 Cases'
//   }]

//     var layout = {
//         // title: 'Hide the Modebar',
//         // showlegend: true
//     };

//     var config = {
//         responsive: true,
//         scrollZoom: true,
//         displayModeBar: false
//     };

//   Plotly.newPlot(plotDiv, traces, layout, config);
// }

// loadData()