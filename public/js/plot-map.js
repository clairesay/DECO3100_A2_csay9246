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

      locations: ['MOZ', 'BDI', 'RWA', 'ESP'],
      marker: {
          size: [20, 30, 15, 10],
          color: [10, 20, 40, 50],
          cmin: 0,
          cmax: 50,
          colorscale: 'Greens',
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