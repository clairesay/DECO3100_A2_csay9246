// Common layout for all charts
var layout = {
  font: {
  size: 12,
  family: "Source Sans Pro, Arial, sans-serif",
  color: "#303030"
  },
  xaxis: {
  showgrid: false,
  range: [1990, 2020]
  },
  yaxis: {
  showgrid: false,
  },
  showGrid: false,
  showLegend: true,
  legend: {
    x: 1.15,
    xanchor: 'left',
    // y: 0
  },
  yaxis2: {
    overlaying: 'y',
    side: 'right'
  }
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
  dataBranch.push({x: [], y: [], plotType: ''})
}

const dataAll = [
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-child-mortality.csv?token=ANVXV7RJSB3WATDZ7SODRE3AQOD7C", 
    index: 2, 
    section: 2,
    plotType: 'new',
    plot: 'scatter',
    title: 'World Child Mortality Rate'
  },
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-poverty.csv?token=ANVXV7RE4UHNUHN2EN6ZYJ3AQOD3I",
    index: 3,
    section: 2,
    plotType: 'build',
    plot: 'scatter',
    title: 'Percentage of World living in Extreme Poverty'
  },
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/ssafrica-refugee.csv?token=ANVXV7WFHTPMPU4LZRR7DBTAQOD5U",
    index: 7,
    section: 4,
    plotType: 'new',
    plot: 'scatter',
    title: 'Refugee Numbers in Sub-Saharan Africa'
  }
]

// ////////////// LOADING THE CSVS /////////////// //
function loadData(dataSource) {
  Plotly.d3.csv(dataSource.source, function(data){ processData(data, dataSource.index, dataSource.section, dataSource.plotType, dataSource.plot, dataSource.title) } );
};

var traces = []
var solidSection;


function processData(allRows, index, section, plotType, plot, title) {
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
  if (plot == 'scatter') {
// if we're creating a new plot
if (plotType == 'new') {

  // temporary traces array clears if we're starting a new data set
  traces = []
  solidSection = section;

  // pushing the data
  traces.push({
    x: dataBranch[index].x, 
    y: dataBranch[index].y,
    name: yKey,
    type: plot,
    mode: 'lines',
    line: {
      shape: 'spline',
      color: '#904E55',
      width: 3
    }
  });

  // setting the title, x and y axes
  layout.title = title
  layout.xaxis.title = xKey
  layout.yaxis.title = yKey

  // creating the new plot
  Plotly.newPlot(plotSpace[section], traces, layout, {displayModeBar: false})
} 
// if we're adding something to an existing plot
// we need to know which plot we're working with
else if (plotType == 'build' && section == solidSection) {

  // pushing the data
  traces.push({
    x: dataBranch[index].x, 
    y: dataBranch[index].y,
    yaxis: 'y2',
    name: yKey,
    type: plot,
    mode: 'lines',
    line: {
      shape: 'spline',
      color: '#564E58',
      width: 3
    }
  });

  layout.yaxis2.title = yKey
  
  Plotly.update(plotSpace[solidSection], traces, layout, {displayModeBar: false})
}
  }
  

  scrollContainer.addEventListener('scroll', function() {
    // check if this is an add-on data set
    if (currentIndex + 1 == index && plotType == 'build') {
      // hardcoded!
      switch(index) {
        case 3:
          console.log('3')
          // for the first chart, we want to show the chart on scroll
          break;
        
        case 8:
          console.log('8')
          // for the second chart, we want to zoom into the chart on scroll
          break;
        
        default:
          break;
      }
    
    }
  })
}



// document.getElementById('capsi').addEventListener('click', function(e) {
//   e.preventDefault();
//   layout.xaxis.range = [1990, 1999]
//   console.log(solidSection)
//   console.log(currentIndex)
//   console.log(dataBranch)
//   Plotly.update(plotSpace[solidSection], traces, layout, {displayModeBar: false})
//   console.log(layout)
// })

///////// ALL FUNCTIONS EXECUTED BY THE LOAD DATA FUNCTION - CALLS ALL DATA SETS ///////////////////
for (let i = 0; i < dataAll.length; i ++) {
  loadData(dataAll[i]);
}

