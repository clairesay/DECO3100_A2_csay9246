// const { cyan } = require("color-name");

    var data = [{
      type: 'scattergeo',
      mode: 'markers',

      locations: ['MOZ', 'BDI', 'RWA'],
      marker: {

          size: [15, 8.7, 20],
          color: [227, 191, 192],
          cmin: 0,
          cmax: 250,
          colorscale: 'Reds',
          colorbar: {
              title: 'Some rate',
              ticksuffix: '%',
              showticksuffix: 'last'
          },
          showscale: false,
          line: {
              color: '#303030'
          }
      },
      name: 'europe data'
  }];
  
  var lay = {
      geo: {
          scope: 'africa',
          bgcolor: 'transparent',
        //   lonaxis: {range: [-30, 60]},
        //   lataxis: {range: [-45, 45]}, 
        showocean: true,
        oceancolor: '#303030',  
      },
      dragmode: false,

    //   plot_bgcolor:"green",
    //   paper_bgcolor:"cyan",
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,

    }
    
  };
//   var mapData = [{
//     type: 'choropleth',
//     locationmode: 'country names',
//     locations: country,
//     z: value,
//     text: country,
//     colorscale: [[0, '#C3C9CE'], [1, '#904E55']],
//     showscale: false,
//     marker: {
//       line:{
//           color: '#303030',
//           width: 1
//       }
//   }
// },

  var miniMapData = [{
      
    type: 'choropleth',
    locationmode: 'country names',
    locations: ['Mozambique', 'Burundi', 'Rwanda'],
    z: [1, 1, 1],
    text: ['Mozambique', 'Burundi', 'Rwanda'],
    showscale: false,
    marker: {
        line: {
            color: 'red'
        }
    }

}];
// var mapLayout = {
//     geo: {
//         projection: {
//             type: ''
//         },
//         lonaxis: {range:[-180, 180]},
//         lataxis: {range:[-90, 90]},
//         bgcolor: 'transparent',
//     },
//     bordercolor: 'transparent',
//     plot_bgcolor:"#303030",
//     paper_bgcolor:"#303030",
//     margin: {
//         l: 0,
//         r: 0,
//         b: 0,
//         t: 0,
//     }
//   };
var miniMapLayout = {
    geo: {
        scope: 'africa',
        bgcolor: 'transparent',
      //   lonaxis: {range: [-30, 60]},
      //   lataxis: {range: [-45, 45]},  
      countrycolor: '#fefefe'
    },
    dragmode: false,

    plot_bgcolor:"#303030",
    paper_bgcolor:"#303030",
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
    },

    shapes: [
        {
            type: 'circle',
            // x-reference is assigned to the x-values
            xref: 'paper',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            // lonaxis: {range: [25, 45]},
            // lataxis: {range: [-32, -5]}, 
            // x0: 25,
            // y0: -32,
            // x1: 45,
            // y1: -5,
            x0: 0.60,
            y0: 0.18,
            x1: 0.84,
            y1: 0.42,
            fillcolor: '#d3d3d3',
            opacity: 0.2,
            // line: {
            //     width: 0
            // }
        },
                {
            type: 'circle',
            // x-reference is assigned to the x-values
            xref: 'paper',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            // lonaxis: {range: [25, 45]},
            // lataxis: {range: [-32, -5]}, 
            // x0: 25,
            // y0: -32,
            // x1: 45,
            // y1: -5,
            x0: 0.59,
            y0: 0.40,
            x1: 0.74,
            y1: 0.55,
            fillcolor: '#d3d3d3',
            opacity: 0.2,
            // line: {
            //     width: 0
            // }
        },
    ]

    
  
};
  var miniMap = document.createElement('div')
miniMap.setAttribute('id', 'mini-map')
miniMap.classList.add('plot')
plotSpace[6].parentElement.style.position = 'sticky'
  plotSpace[6].parentElement.appendChild(miniMap)
  var miniMap = document.getElementById('mini-map')
  Plotly.newPlot(miniMap, miniMapData, miniMapLayout, {displayModeBar: false})
  Plotly.newPlot(plotSpace[6], data, lay, {displayModeBar: false});
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