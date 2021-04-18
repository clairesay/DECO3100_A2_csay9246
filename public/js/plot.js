// Common layout for all charts
var layout = {
  font: {
  size: 12,
  family: "Source Sans Pro, sans-serif",
  color: "#303030"
  },
  xaxis: {
  showgrid: false,
  range: [1990, 2020],
  },
  yaxis: {
  showgrid: false,
  },
  showgrid: false,
  showLegend: true,
  legend: {
    x: 0.5,
    xanchor: 'center',
    // y: 0
  },
  yaxis2: {
    showgrid: false,
    overlaying: 'y',
    side: 'right'
  },
  plot_bgcolor:"transparent",
  paper_bgcolor:"#fefefe",

};

// currentIndex of the info-plot in view
var currentIndex;
scrollContainer.addEventListener('scroll', function() {
  currentIndex = Math.round(this.scrollTop/sectionHeight) - 1
})

// all info-plots
var wholeSections = document.getElementsByClassName('info-plot')
// the graphic half within the info-plot
var graphicHalf = document.getElementsByClassName('graphic-half')

// creating divs for a plot in each graphic half space. This is where we'll directly plot stuff
for (let i = 0; i < wholeSections.length; i ++) {
  var myPlot = document.createElement('div');
  myPlot.setAttribute('class', 'plot')
  graphicHalf[i].appendChild(myPlot)
}

// 
var plotSpace = document.querySelectorAll('.graphic-half div')

// populate this with ALL of our data, according to how many info-plots there are
var dataBranch = [];

// creating an object for each of the sections in the array
var paragraphSections = document.getElementsByClassName('paragraph')
for (let i = 0; i < paragraphSections.length; i ++) {
  // making space
  dataBranch.push({x: [], y: [], plotType: '', trace:[]})
}

const dataAll = [
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-child-mortality.csv?token=ANVXV7RJSB3WATDZ7SODRE3AQOD7C", 
    index: 2, 
    section: 2,
    piggyIndex: 2,
    plotType: 'new',
    plot: 'scatter',
    title: 'World Child Mortality Rate'
  },
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-poverty.csv?token=ANVXV7RE4UHNUHN2EN6ZYJ3AQOD3I",
    index: 3,
    section: 2,
    piggyIndex: 2,
    plotType: 'build',
    plot: 'scatter',
    title: 'Percentage of World living in Extreme Poverty'
  },
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/ssafrica-refugee.csv?token=ANVXV7WFHTPMPU4LZRR7DBTAQOD5U",
    index: 7,
    section: 4,
    piggyIndex: 7,
    plotType: 'new',
    plot: 'scatter',
    title: 'Refugee Numbers in Sub-Saharan Africa'
  },
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/ssafrica-childmortality.csv?token=ANVXV7R7IVEN37QJX4BV2K3AQPURA",
    index: 12,
    section: 8,
    piggyIndex: 12,
    plotType: 'new',
    plot: 'scatter',
    title: 'Sub-Saharan Africa Child Mortality Rate'
  }
]

// ////////////// LOADING THE CSVS /////////////// //
function loadData(dataSource) {
  Plotly.d3.csv(dataSource.source, function(data){ processData(data, dataSource.index, dataSource.piggyIndex, dataSource.section, dataSource.plotType, dataSource.plot, dataSource.title) } );
};

// var traces = []
var solidSection;
// var counter = 1

function processData(allRows, index, piggyIndex, section, plotType, plot, title) {
  // GETTING THE DATA TITLES
  var xKey = Object.keys(allRows[index])[0];
  var yKey = Object.keys(allRows[index])[1];

  // PUSHING THE RELEVANT DATA TO THE DATABRANCH ARRAY/OBJECT TREE
  for (let i = 0; i < allRows.length; i++) {
    let row = allRows[i];
    dataBranch[index].x.push( row[xKey] );
    dataBranch[index].y.push( row[yKey] );
    dataBranch[index].plotType = plotType;
  }
  
  if (plotType == 'new') {
    // traces = []
    plotThis(index, piggyIndex, section, xKey, yKey, title)
    // plotThis(section, dataBranch[index].trace, dataBranch[index].x, dataBranch[index].y, plot, xKey, yKey, title)
  } else if (plotType == 'build') {
    addThis(index, piggyIndex, section, yKey)
  }
  scrollContainer.addEventListener('scroll', function() {
    if (currentIndex + 1 == index) {
      styleUpdate(index, piggyIndex, section)
    }
  })
}

function plotThis(index, piggyIndex, section, xLegend, yLegend, title) {
   
      // pushing the data
      dataBranch[index].trace.push({
        x: dataBranch[index].x, 
        y: dataBranch[index].y,
        name: yLegend,
        type: 'scatter',
        mode: 'lines',
        line: {
          shape: 'spline',
          color: '#904E55',
          width: 5
        },
        // id: counter
      });
      // counter += 1
      // setting the title, x and y axes
      layout.title = title
      layout.xaxis.title = xLegend
      layout.yaxis.title = yLegend
      Plotly.newPlot(plotSpace[section], dataBranch[index].trace, layout, {displayModeBar: false})
    // } 
    // scrollContainer.addEventListener('scroll', function() {
    //   if (currentIndex + 1 == index) {
    //     styleUpdate(index, piggyIndex, section)
    //   }
    // })
}

function addThis(index, piggyIndex, section, yLegend) {
  dataBranch[piggyIndex].trace.push({
    x: dataBranch[index].x, 
    y: dataBranch[index].y,
    yaxis: 'y2',
    name: yLegend,
    type: 'scatter',
    mode: 'lines',
    opacity: 0.1,
    line: {
      shape: 'spline',
      color: 'purple',
      width: 5
    },

  });
  dataBranch[piggyIndex].trace.text = ['blue'];
  layout.yaxis2.title = yLegend
  
  Plotly.update(plotSpace[section], dataBranch[piggyIndex].trace, layout, {displayModeBar: false})
  // scrollContainer.addEventListener('scroll', function() {
  //   if (currentIndex + 1 == index) {
  //     styleUpdate(index, piggyIndex, section)
  //   }
  // })
}

function styleUpdate(index, piggyIndex, section) {
  if (piggyIndex == 2) {
    if (index == 2) {
      Plotly.restyle(plotSpace[section], {opacity: 0.1}, 1);
      Plotly.restyle(plotSpace[section], {opacity: 1}, 0);
    } else if (index == 3) {
      Plotly.restyle(plotSpace[section], {opacity: 1}, 1);
      Plotly.restyle(plotSpace[section], {opacity: 0.1}, 0);
    }
  } else if (piggyIndex == 7) {
    if (index == 7) {
      Plotly.update(plotSpace[section], {}, {xaxis: {range: [1990, 2020] }, annotations:[]})
    } else if (index == 8) {
      Plotly.update(plotSpace[section], {}, {
        xaxis: {range: [1990, 2020] }, 
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
          arrowhead: 2,
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
          arrowhead: 2,
          ax: 0,
          ay: -40,
          xanchor: 'right',
          yanchor: 'bottom'
        }
      ]})
    } else if (index == 9) {
      Plotly.update(plotSpace[section], {}, {xaxis: {range: [1990, 2000] }})
    }
  }
}

///////// ALL FUNCTIONS EXECUTED BY THE LOAD DATA FUNCTION - CALLS ALL DATA SETS ///////////////////
for (let i = 0; i < dataAll.length; i ++) {
  if (dataAll[i] !== undefined) {
    loadData(dataAll[i]);
  }
}


////// SELECTING THE DOT CONTAINER
var dotContainer = document.getElementsByClassName('dot-container')[0]
// SCROLL EVENTS FROM NON DATA CALLS
scrollContainer.addEventListener('scroll', function() {
  if (currentIndex + 1 == 8) {
    styleUpdate(currentIndex + 1, 7, 4)
  } else if (currentIndex + 1 == 9) {
    styleUpdate(currentIndex + 1, 7, 4)
  }

// ///// if this section is 'centred', set as white
  // while (currentIndex) {
    if (currentIndex != -1) {
      if (paragraphSections[currentIndex].parentElement.parentElement.classList.contains('centered')) {
        dotContainer.classList.add('white')
      } else {
        dotContainer.classList.remove('white')
      }
    }

  // }
})


