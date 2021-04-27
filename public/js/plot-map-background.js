
var plotSpace = document.querySelectorAll('.graphic-half div')
// const dataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-conflict.csv"
// const dataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-conflict-gradient.csv"
const dataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-conflict-shaded.csv"
function loadMapData() {
    Plotly.d3.csv(dataSource, function(data){ processMap(data) } );
};
  
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

function createMap(country, value, falseValue) {
  var mapData = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: country,
      z: value,
      text: country,
    //   autocolorscale: true,
      colorscale: [[0, '#C3C9CE'], [1, '#904E55']],
      showscale: false,
      marker: {
        line:{
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
  //   autocolorscale: true,
    colorscale: [[0, '#0e1318AF'], [1, 'transparent']],
    showscale: false,
    marker: {
      line:{
          color: '#303030',
          width: 1
      },
    opacity: 0,
  }
}
];
  var mapLayout = {
    // title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
    geo: {
        projection: {
            type: ''
        },
        lonaxis: {range:[-180, 180]},
        lataxis: {range:[-90, 90]},
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

// function createFalseMap(country, value) {
//   var mapData = [{
//       type: 'choropleth',
//       locationmode: 'country names',
//       locations: country,
//       z: value,
//       text: country,
//     //   autocolorscale: true,
//       colorscale: [[0, 'transparent'], [1, '#FEFEFE50']],
//       showscale: false,
//       marker: {
//         line:{
//             color: '#303030',
//             width: 1
//         }
//     }
//   }];
//   var mapLayout = {
//     // title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
//     geo: {
//         projection: {
//             type: ''
//         },
//         lonaxis: {range:[-180, 180]},
//         lataxis: {range:[-90, 90]},
//         bgcolor: 'transparent',
//     },
//     bordercolor: 'transparent',
//     plot_bgcolor:"transparent",
//     paper_bgcolor:"transparent",
//     margin: {
//         l: 0,
//         r: 0,
//         b: 0,
//         t: 0,
//         // pad: 2
//     }
  
//     // colorbar:
//   };
//   Plotly.newPlot(plotSpace[3], mapData, mapLayout, {displayModeBar: false});
// }


///////// ALL FUNCTIONS EXECUTED BY THE LOAD DATA FUNCTION - CALLS ALL DATA SETS ///////////////////
loadMapData()

// } else if (piggyIndex == 4) {
//     if (index == 4) {
//       // Plotly.restyle(plotSpace[section], {}, 0)
//       Plotly.restyle(plotSpace[section], {autocolorscale:false, colorscale: [[0, '#C3C9CE'], [1, '#904E55']]}, 0)
//     } else if (index == 5) {
//       Plotly.restyle(plotSpace[section], {autocolorscale:false, colorscale: [[0, '#C3C9CE'], [1, '#904E55']]}, 0)
//     }