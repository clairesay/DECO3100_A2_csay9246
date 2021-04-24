
var plotSpace = document.querySelectorAll('.graphic-half div')
const dataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-conflict.csv"

function loadMapData() {
    Plotly.d3.csv(dataSource, function(data){ processMap(data) } );
};
  
function processMap(allRows) {
    var country = [], value = [];

    for (let i = 0; i < allRows.length; i++) {
        let row = allRows[i];
        country.push(row['Country'])
        value.push(row['Conflict'])
    }

    createMap(country, value);
}

function createMap(country, value) {
  var mapData = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: country,
      z: value,
      text: country,
      autocolorscale: false,
      colorscale: [[0, '#C3C9CE'], [1, '#904E55']],
      colorbar: {
          thickness: 0,
            opacity: 0
      },
      showscale: false
  }];
  var mapLayout = {
    // title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
    geo: {
        projection: {
            type: ''
        },
        bgcolor: 'transparent',
    },
    bordercolor: 'transparent',
    plot_bgcolor:"#303030",
    paper_bgcolor:"#303030",
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        // pad: 2
    }
  
    // colorbar:
  };
  Plotly.newPlot(plotSpace[3], mapData, mapLayout, {displayModeBar: false});
}



///////// ALL FUNCTIONS EXECUTED BY THE LOAD DATA FUNCTION - CALLS ALL DATA SETS ///////////////////
loadMapData()