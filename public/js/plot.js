var myPlot = document.getElementById('myPlot')

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
  legend: {
  x: 0.1,
  xanchor: "left",
  y: 0.9
  }
};

// entire page
// var scrollContainer = document.getElementById('scroll-container')
var currentIndex;
scrollContainer.addEventListener('scroll', function() {
  currentIndex = Math.round(this.scrollTop/sectionHeight) - 1
  console.log(currentIndex)
})

var dataBranch = [];

// creating an object for each of the sections in the array
for (let i = 0; i < sections.length; i ++) {
  dataBranch.push({x: '', y: '', plotType: ''})
}
console.log(dataBranch)
// var dataBranch = [
//   {plotType: 'none'},  //0
//   {plotType: 'none'}, //1
//   {plotType: 'new', x: [], y:[]}, //2
//   {plotType: 'build', x: [], y:[]}, //3 
//   {}
// ]


const dataSourceA = {source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-child-mortality.csv?token=ANVXV7RBM6SN3VKHKVL6AQTAQNEQQ", section: 2, plotType: 'new'};
// const dataSourceB = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-poverty.csv?token=ANVXV7VYVGAZPFACOUNQIOLAQNJB4"

var traces = []

function loadData(dataSource) {
  Plotly.d3.csv(dataSource.source, function(data){ processData(data, dataSource.section, dataSource.plotType) } );
};

function processData(allRows, section, plotType) {
  console.log(allRows);
  console.log('this section is ' + section);
   console.log('this plot type is' + plotType)
  let yearA = [], worldCmrA = [];
  for (let i=0; i<allRows.length; i++) {
    let row = allRows[i];
    yearA.push( row['Year'] );
    worldCmrA.push( row['Child Mortality Rate'] );
  }
  makePlot( yearA, worldCmrA );
}

function makePlot( x, y ){
  traces.push({
    x: x, 
    y: y,
    type: 'scatter',
    mode: 'lines',
    line: {
      shape: 'spline',
      color: '#904E55',
      width: 3
    }
  });
 
  Plotly.newPlot(myPlot, traces, layout, {displayModeBar: false})
};

loadData(dataSourceA)

// document.getElementById('capsi').addEventListener('click', function(e) {
//   e.preventDefault();
//   // traces.push()
//   // Plotly.react(myPlot, traces, layout, {displayModeBar: false});
// })

// console.log('running')
// Plotly.animate(myPlot, 
//   {
//     data: [{y: [Math.random(), Math.random(), Math.random()], line:{color:'white'}}],
// traces: [0],
// layout: {}}, 
// {
//   transition: {
//     duration: 1000
//   },
//   frame: {
//     duration: 1000,
//     redraw: false
//   }
// });