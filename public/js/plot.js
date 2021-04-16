var myPlot = document.getElementById('myPlot')

const dataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-child-mortality.csv?token=ANVXV7RBM6SN3VKHKVL6AQTAQNEQQ";

function loadData() {
  Plotly.d3.csv(dataSource, function(data){ processData(data) } );
};

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

function makePlot( x, y ){
  var traces = [{
    x: x, 
    y: y,
    type: 'scatter',
    mode: 'lines',
    line: {
      shape: 'spline',
      color: '#904E55',
      width: 3
    },
  }];

  var layout = {
    title: "WORLD CHILD MORTALITY RATE",
    font: {
    size: 12,
    family: "Source Sans Pro, Arial, sans-serif",
    color: "#303030"
    },

    xaxis: {
    title: "YEAR"
    },
    yaxis: {
    title: "CHILD MORTALITY RATE"
    },
    showGrid: false,
    showLegend: false,
    legend: {
    x: 0.1,
    xanchor: "left",
    y: 0.9
    }
  };
  
  Plotly.newPlot(myPlot, traces, layout, {displayModeBar: false});
};

loadData()