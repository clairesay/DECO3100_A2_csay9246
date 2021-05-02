    var refugeeDataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/ssafrica-refugee-full.csv"
    function loadRefugeeMapData() {
        Plotly.d3.csv(refugeeDataSource, function(data){ processRefugeeMap(data) } );
    };
      
    // recording the values from the csv
    function processRefugeeMap(allRows) {
        var country = [], refugees = [], refugeesLabel = [];
        for (let i = 0; i < allRows.length; i++) {
            let row = allRows[i];
            country.push(row['Country Code'])
            refugees.push(row['1994']/18000)
            refugeesLabel.push(row['Country Name'] + ': ' + row['1994'])
        }
        createRefugeeMap(country, refugees, refugeesLabel);
    }

    function createRefugeeMap(country, refugees, refugeesLabel) {
    var data = [
        {
            type: 'choropleth',
            locationmode: 'country names',
            locations: ['Morocco', 'Tunisia', 'Algeria', 'Libya', 'Egypt', 'Western Sahara'],
            z: [0, 0, 0, 0, 0, 0],
            colorscale: [[0, '#fafafa'], [1, '#fafafa']],
            hoverinfo: 'none',
            showscale: false,
            marker: {
              line:{
                  color: '#eeeeee',
                  width: 1
              }
          }
        },
        {
      type: 'scattergeo',
      mode: 'markers',
      hovertext: refugeesLabel,
      hoverinfo: 'text',
      locations: country,
      marker: {
          color: '#BFB48F',
          size: refugees,
          showscale: false,
          line: {
            color: '#eeeeee',
              width: 1
          }
      },
    
  },

];
  
  var lay = {
      geo: {
          scope: 'africa',
          bgcolor: 'transparent',
        //   lonaxis: {range: [-30, 60]},
        //   lataxis: {range: [-45, 45]}, 
        countrycolor: '#303030'
      },
      dragmode: false,
      
      plot_bgcolor:"transparent",
      paper_bgcolor:"transparent",
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,

    }
    
  };
//   var miniMapData = [{
      
//     type: 'choropleth',
//     locationmode: 'country names',
//     locations: ['Mozambique', 'Burundi', 'Rwanda'],
//     z: [1, 1, 1],
//     text: ['Mozambique', 'Burundi', 'Rwanda'],
//     showscale: false,
//     marker: {
//         line: {
//             color: 'red'
//         }
//     }

// }];
// var miniMapLayout = {
//     geo: {
//         scope: 'africa',
//         bgcolor: 'transparent',
//       //   lonaxis: {range: [-30, 60]},
//       //   lataxis: {range: [-45, 45]},  
//       countrycolor: '#fefefe'
//     },
//     dragmode: false,

//     plot_bgcolor:"#303030",
//     paper_bgcolor:"#303030",
//     margin: {
//       l: 0,
//       r: 0,
//       b: 0,
//       t: 0,
//     },

//     shapes: [
//         {
//             type: 'circle',
//             // x-reference is assigned to the x-values
//             xref: 'paper',
//             // y-reference is assigned to the plot paper [0,1]
//             yref: 'paper',
//             // lonaxis: {range: [25, 45]},
//             // lataxis: {range: [-32, -5]}, 
//             // x0: 25,
//             // y0: -32,
//             // x1: 45,
//             // y1: -5,
//             x0: 0.60,
//             y0: 0.18,
//             x1: 0.84,
//             y1: 0.42,
//             fillcolor: '#d3d3d3',
//             opacity: 0.2,
//             // line: {
//             //     width: 0
//             // }
//         },
//                 {
//             type: 'circle',
//             // x-reference is assigned to the x-values
//             xref: 'paper',
//             // y-reference is assigned to the plot paper [0,1]
//             yref: 'paper',
//             // lonaxis: {range: [25, 45]},
//             // lataxis: {range: [-32, -5]}, 
//             // x0: 25,
//             // y0: -32,
//             // x1: 45,
//             // y1: -5,
//             x0: 0.59,
//             y0: 0.40,
//             x1: 0.74,
//             y1: 0.55,
//             fillcolor: '#d3d3d3',
//             opacity: 0.2,
//             // line: {
//             //     width: 0
//             // }
//         },
//     ]

    
  
// };
//   var miniMap = document.createElement('div')
// miniMap.setAttribute('id', 'mini-map')
// miniMap.classList.add('plot')
// plotSpace[6].parentElement.style.position = 'sticky'
//   plotSpace[6].parentElement.appendChild(miniMap)
//   var miniMap = document.getElementById('mini-map')
//   Plotly.newPlot(miniMap, miniMapData, miniMapLayout, {displayModeBar: false})
  Plotly.newPlot(plotSpace[6], data, lay, {displayModeBar: false});
    }
    loadRefugeeMapData()
  ///// construction 

  // document.getElementById('capsi').addEventListener('click', 
  // function(e){
  //     e.preventDefault()
  //   console.log('zooming')
    
  //   Plotly.animate(plotSpace[6], {
  //     layout: {
  //       geo: {
  //           scope: 'africa',
  //           bgcolor: 'transparent',
  //           lonaxis: {range: [20, 40]},
  //           lataxis: {range: [-10, 10]},    
  //       }

  //     }
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
  // )