var myPlot = document.getElementById('myPlot')

const dataSourceA = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-child-mortality.csv?token=ANVXV7RBM6SN3VKHKVL6AQTAQNEQQ";
const dataSourceB = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-poverty.csv?token=ANVXV7VYVGAZPFACOUNQIOLAQNJB4"

var layout = {
  title: "WORLD CHILD MORTALITY RATE",
  font: {
  size: 12,
  family: "Source Sans Pro, Arial, sans-serif",
  color: "#303030"
  },

  xaxis: {
  title: "Year",
  showgrid: false,
  },
  yaxis: {
  title: "Child Mortality Rate",
  showgrid: false,
  },
  showGrid: false,
  showLegend: false,
  legend: {
  x: 0.1,
  xanchor: "left",
  y: 0.9
  }
};

var traces = []

function loadData(dataSource) {
  Plotly.d3.csv(dataSource, function(data){ processData(data) } );
};

function loadData2(dataSource) {
  Plotly.d3.csv(dataSource, function(data){ processData2(data) } );
}

function processData(allRows) {
  console.log(allRows);
  let yearA = [], worldCmrA = [];
  for (let i=0; i<allRows.length; i++) {
    let row = allRows[i];
    yearA.push( row['Year'] );
    worldCmrA.push( row['Child Mortality Rate'] );
  }
  makePlot( yearA, worldCmrA );
}

function processData2(allRows) {
  console.log(allRows);
  let yearA = [], worldPovertyA = [];
  for (let i=0; i<allRows.length; i++) {
    let row = allRows[i];
    yearA.push( row['Year'] );
    worldPovertyA.push( row['World'] );
  }
  makePlot( yearA, worldPovertyA );
}

function makePlot( x, y ){
  traces.push({
    x: x, 
    y: y,
    type: 'scatter',
    mode: 'lines',
    line: {
      shape: 'spline',
      color: '#904E55',
      width: 3
    }
  });
 
  Plotly.newPlot(myPlot, traces, layout, {displayModeBar: false})
    console.log('running')
    Plotly.animate(myPlot, 
      {
        data: [{y: [Math.random(), Math.random(), Math.random()], line:{color:'white'}}],
    traces: [0],
    layout: {}}, 
    {
      transition: {
        duration: 1000
      },
      frame: {
        duration: 1000,
        redraw: false
      }
  });

};

loadData(dataSourceA)
// loadData(dataSourceB)

document.getElementById('capsi').addEventListener('click', function(e) {
  e.preventDefault();
  // traces.push()
  loadData2(dataSourceB)
  // Plotly.react(myPlot, traces, layout, {displayModeBar: false});
  Plotly.animate(myPlot, 
    {
      data: [{y: [Math.random(), Math.random(), Math.random()], line:{color:'yellow'}}],
  traces: [0],
  layout: {}}, 
  {
    transition: {
      duration: 1000
    },
    frame: {
      duration: 1000,
      redraw: false
    }
});
})


// Plotly.newPlot('myDiv', [{
//   x: [1, 2, 3],
//   y: [0, 0.5, 1],
//   line: {simplify: false},
// }]);

// function randomize() {
//   Plotly.animate('myDiv', {
//     data: [{y: [Math.random(), Math.random(), Math.random()]}],
//     traces: [0],
//     layout: {}
//   }, {
//     transition: {
//       duration: 500,
//       easing: 'cubic-in-out'
//     },
//     frame: {
//       duration: 500
//     }
//   })
// }





// Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/2014_apple_stock.csv", function(err, rows){

//   function unpack(rows, key) {
//   return rows.map(function(row) { return row[key]; });
// }
  
//   var frames = []
//   var x = unpack(rows, 'AAPL_x')
//   var y = unpack(rows, 'AAPL_y')

//   var n = 100;
//   for (var i = 0; i < n; i++) { 
//     frames[i] = {data: [{x: [], y: []}]}
//     frames[i].data[0].x = x.slice(0, i+1);
//     frames[i].data[0].y = y.slice(0, i+1);
//   }

//   Plotly.newPlot('myDiv', [{
//     x: frames[1].data[0].x,
//     y: frames[1].data[0].y,
//     fill: 'tozeroy',
//     type: 'scatter',
//     mode: 'lines',
//     line: {color: 'green'}
//   }], {
//     xaxis: {
//       type: 'date', 
//       range: [
//         frames[99].data[0].x[0], 
//         frames[99].data[0].x[99]
//       ],
//       showgrid: false,
//       showline: false,
//       showticklabels: false,
//       zeroline: false
//     },
//     yaxis: {
//       range: [
//         0, 
//         90
//       ],
//       showgrid: false,
//       showline: false,
//       showticklabels: false,
//       zeroline: false
//     },
//     annotations: [{
//       showarrow: false,
//       text: "<b>TESTING</b>",
//       font: {
//         family: 'Gravitas One',
//         size: 48,
//         color: 'white'
//       },
//       xref: 'paper',
//       yref: 'paper',
//       x: 0.5,
//       y: 0.5
//     }, {
//       showarrow: false,
//       text: "testing | testing | testing",
//       font: {
//         family: 'Gravitas One',
//         size: 16,
//         color: 'white'
//       },
//       xref: 'paper',
//       yref: 'paper',
//       x: 0.5,
//       y: 0.35
//     }]
//   })
  
// }) 