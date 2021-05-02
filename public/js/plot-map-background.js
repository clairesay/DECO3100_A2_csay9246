// collecting all plotspaces
var plotSpace = document.querySelectorAll('.graphic-half div')

// loading data
const dataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-conflict-shaded.csv"
function loadMapData() {
  Plotly.d3.csv(dataSource, function (data) { processMap(data) });
};

// recording the values from the csv
function processMap(allRows) {
  var country = [], value = [], falseValue = [];
  for (let i = 0; i < allRows.length; i++) {
    let row = allRows[i];
    country.push(row['Country'])
    value.push(row['Conflict'])
    falseValue.push(row['Shaded Value'])
  }
  createMap(country, value, falseValue);
}

// creating a map specifically from the data
function createMap(country, value, falseValue) {
  // push the value and false value traces
  var mapData = [{
    type: 'choropleth',
    locationmode: 'country names',
    locations: country,
    z: value,
    text: country,
    colorscale: [[0, '#C3C9CE'], [1, '#904E55']],
    showscale: false,
    marker: {
      line: {
        color: '#303030',
        width: 1
      }
    }
  },
  {
    type: 'choropleth',
    locationmode: 'country names',
    locations: country,
    z: falseValue,
    text: country,
    colorscale: [[0, '#0e1318AF'], [1, 'transparent']],
    showscale: false,
    marker: {
      line: {
        color: '#303030',
        width: 1
      },
      opacity: 0,
    }
  }
  ];
  // set the layout
  var mapLayout = {
    geo: {
      projection: {
        type: ''
      },
      lonaxis: { range: [-180, 180] },
      lataxis: { range: [-90, 90] },
      bgcolor: 'transparent',
    },
    bordercolor: 'transparent',
    plot_bgcolor: "#303030",
    paper_bgcolor: "#303030",
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
    }
  };
  // appending the legend to the right spot
  var conflictLegend = document.getElementById('legend-conflict')
  conflictLegend.style.visibility = 'visible';
  plotSpace[3].appendChild(conflictLegend);
  // create the plot
  Plotly.newPlot(plotSpace[3], mapData, mapLayout, { displayModeBar: false });
}

loadMapData()