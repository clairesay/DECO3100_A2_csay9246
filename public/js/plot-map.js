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
          line: {
              color: 'black'
          }
      },
      name: 'europe data'
  }];
  
  var lay = {
      'geo': {
          'scope': 'africa',
          'resolution': 50
      },
      plot_bgcolor:"transparent",
      paper_bgcolor:"#fefefe",
    
  };
  
  Plotly.newPlot(plotSpace[6], data, lay, {displayModeBar: false});
  ///// construction 