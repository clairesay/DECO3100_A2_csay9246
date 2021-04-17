var layout = {
  title: "WORLD CHILD MORTALITY RATE",
  font: {
  size: 12,
  family: "Source Sans Pro, Arial, sans-serif",
  color: "#303030"
  },

  xaxis: {
  title: "Year",
  showgrid: false,
  },
  yaxis: {
  title: "Child Mortality Rate",
  showgrid: false,
  },
  showGrid: false,
  showLegend: false,
  // legend: {
  // x: 0.1,
  // xanchor: "left",
  // y: 0.9
  // }
};

// entire page
// var scrollContainer = document.getElementById('scroll-container')
var currentIndex;
scrollContainer.addEventListener('scroll', function() {
  currentIndex = Math.round(this.scrollTop/sectionHeight) - 1
  // console.log(currentIndex)
})


var graphicHalf = document.getElementsByClassName('graphic-half')



var dataBranch = [];

// creating an object for each of the sections in the array
var paragraphSections = document.getElementsByClassName('paragraph')
for (let i = 0; i < paragraphSections.length; i ++) {
  dataBranch.push({x: [], y: [], plotType: ''})
}

var wholeSections = document.getElementsByClassName('info-plot')
// console.log(wholeSections.length)
// console.log(graphicHalf.length)
for (let i = 0; i < wholeSections.length; i ++) {
  // wholeSections[1].style.backgroundColor = 'olive'
  var myPlot = document.createElement('div');
  myPlot.setAttribute('class', 'plot')
  graphicHalf[i].appendChild(myPlot)
}

var plotSpace = document.querySelectorAll('.graphic-half div')

const dataAll = [
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-child-mortality.csv?token=ANVXV7RBM6SN3VKHKVL6AQTAQNEQQ", 
    section: 2, 
    plotType: 'new',
    plotNum: 0
  },
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-poverty.csv?token=ANVXV7VYVGAZPFACOUNQIOLAQNJB4",
    section: 3,
    plotType: 'build',
    plotNum: 0
  }
]

// var traces = []
function loadData(dataSource) {
  Plotly.d3.csv(dataSource.source, function(data){ processData(data, dataSource.section, dataSource.plotType) } );
};
var traces = []
var solidSection;

function processData(allRows, section, plotType) {
  // accessing the keys in the object
  var xKey = Object.keys(allRows[section])[0];
  var yKey = Object.keys(allRows[section])[1];
  for (let i=0; i<allRows.length; i++) {
    let row = allRows[i];
    dataBranch[section].x.push( row[xKey] );
    dataBranch[section].y.push( row[yKey] );
    dataBranch[section].plotType = plotType;
  }
  if (plotType == 'new') {
    traces = []
    solidSection = section;
    // create a new trace array
    traces.push({
      x: dataBranch[section].x, 
      y: dataBranch[section].y,
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        shape: 'spline',
        color: '#904E55',
        width: 3
      }
    });
    Plotly.newPlot(plotSpace[section], traces, layout, {displayModeBar: false})
  } 
  
  else if (plotType == 'build') {
    
    // console.log(currentIndex)
    // if (currentIndex == section - 1) {
    // push to the previous trace array
    traces.push({
      x: dataBranch[section].x, 
      y: dataBranch[section].y,
      type: 'scatter',
      mode: 'lines',
      line: {
        shape: 'spline',
        color: 'transparent',
        width: 3
      }
    });
    
    Plotly.update(plotSpace[solidSection], traces, layout, {displayModeBar: false})
    // }

  }
  scrollContainer.addEventListener('scroll', function() {
    if (plotType == 'build' && currentIndex == section - 1) {
    // traces[1].line.color = 'blue'
    // console.log('yeah')
    // console.log(traces[1])
    //   traces[1] = {
    //     x: dataBranch[section].x, 
    //     y: dataBranch[section].y,
    //     type: 'scatter',
    //     mode: 'lines',
    //     line: {
    //       shape: 'spline',
    //       color: 'blue',
    //       width: 3
    //   }
    // }
    // console.log(traces[1])
    console.log(section)
    traces[section - 2].line.color = 'blue'
    Plotly.animate(plotSpace[solidSection], {
      traces: [section - 2],
    }, {
      transition: {
        duration: 5000,
        easing: 'cubic-in-out'
      },
      frame: {
        duration: 5000
      }
    })
    // Plotly.update(plotSpace[solidSection], traces, layout, {displayModeBar: false})
    }
  })

}


for (let i = 0; i < dataAll.length; i ++) {
  loadData(dataAll[i]);
}