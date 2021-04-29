// console.log('map')
///// construction site
    // for (let i = 0; i < allRows.length; i++) {
    //   let row = allRows[i];
    //   dataBranch[index].x.push( row[xKey] );
    //   dataBranch[index].y.push( row[yKey] );
    //   dataBranch[index].plotType = plotType;
    // }
    var data = [{
      type: 'scattergeo',
      mode: 'markers',

      locations: ['MOZ', 'BDI', 'RWA'],
      marker: {
        //  refugees: [1500000, 870000, 2000000],
        // childmortalityrate: [226.8, 191.3, 191.9],
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
      },
      dragmode: false,

      plot_bgcolor:"transparent",
      paper_bgcolor:"transparent",
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        // pad: 2
    }
    
  };
  
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