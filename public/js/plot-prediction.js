
var plotSpacer = document.querySelectorAll('#prediction .plot')[0]
const refData = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/ssafrica-refugee.csv"
function loadRefData() {
    Plotly.d3.csv(refData, function(data){ processRef(data) } );
};
  
function processRef(allRows) {
  var year = [], refugees = []
    // var country = [], value = [], falseValue = [];

    for (let i = 0; i < allRows.length; i++) {
        let row = allRows[i];
        year.push(row['Year'])
        refugees.push(row['Refugee Population'])
        // falseValue.push(row['Shaded Value'])
    }

    createRef(year, refugees);
}

function createRef(year, refugees) {
  var refData = [{
    x: year,
    y: refugees,
    name: 'Refugee Population',
    hoverinfo: 'none',
    type: 'scatter',
    mode: 'lines',
    line: {
      shape: 'spline',
      color: '#BFB48F',
      width: 3
    },
  }
];

var refLayout = {
  title: 'Refugee Population in Sub-Saharan Africa',
  font: {
    size: 12,
    family: "Source Sans Pro, sans-serif",
    color: "#303030"
    },
  // Plotly.relayout(plotSpace[section], {
    shapes: [
      // 1st highlight during 1994
      {
          type: 'rect',
          // x-reference is assigned to the x-values
          xref: 'x',
          // y-reference is assigned to the plot paper [0,1]
          yref: 'paper',
          x0: '1990',
          y0: 0,
          x1: '1998',
          y1: 1,
          fillcolor: '#d3d3d3',
          opacity: 0.2,
          line: {
              width: 0
          }
      },
      {
        type: 'rect',
        // x-reference is assigned to the x-values
        xref: 'x',
        // y-reference is assigned to the plot paper [0,1]
        yref: 'paper',
        x0: '2013',
        y0: 0,
        x1: '2019',
        y1: 1,
        fillcolor: '#d3d3d3',
        opacity: 0.2,
        line: {
            width: 0
        }
    },

    ],
    xaxis: {showgrid: false, range: [1990, 2020] }, 
    yaxis: {title:'Refugee Population', showgrid: false,  range: [2500000, 8000000]},
    plot_bgcolor:"transparent",
    paper_bgcolor:"transparent",
    annotations: [
    {
      x: 1994,
      y: 6727751,
      xref: 'x',
      yref: 'y',
      text: '1994: 6.7 million refugees',
      font: {
        size: 12,
        color: '#fefefe'
      },
      align: 'center',
      arrowcolor: '#303030',
      width: 160,
      bgcolor: '#303030',
      showarrow: true,
      arrowhead: 6,
      ax: 0,
      ay: -40,
      xanchor: 'left',
      yanchor: 'bottom'
    },
    {
      x: 2019,
      y: 7304831,
      xref: 'x',
      yref: 'y',
      text: 'Today: 7.3 million refugees',
      font: {
        // family: 'Courier New, monospace',
        size: 12,
        color: '#fefefe'
      },
      align: 'center',
      arrowcolor: '#303030',
      width: 180,
      bgcolor: '#303030',
      showarrow: true,
      arrowhead: 6,
      ax: 0,
      ay: -40,
      xanchor: 'right',
      yanchor: 'bottom'
    }
  ]
// })
}

  Plotly.newPlot(plotSpacer, refData, refLayout, {displayModeBar: false});
}

///////// ALL FUNCTIONS EXECUTED BY THE LOAD DATA FUNCTION - CALLS ALL DATA SETS ///////////////////
loadRefData()