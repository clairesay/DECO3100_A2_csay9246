// Common layout for all charts - will be altered according to each chart's individual configuration
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
    x: 0.05,
    xanchor: 'left',
    y: 0.05,
  },
  yaxis2: {
    showgrid: false,
    overlaying: 'y',
    side: 'right'
  },
  plot_bgcolor:"transparent",
  paper_bgcolor:"transparent",
};

// currentIndex of the info-plot in view
var currentIndex;
scrollContainer.addEventListener('scroll', function() {
  currentIndex = Math.round(this.scrollTop/sectionHeight) - 1
  console.log(currentIndex)
})

// all info-plots
var wholeSections = document.getElementsByClassName('info-plot');

// the graphic half within the info-plot
var graphicHalf = document.getElementsByClassName('graphic-half')

// creating divs for a plot in each graphic half space. This is where we'll directly plot stuff
for (let i = 0; i < wholeSections.length; i ++) {
  var myPlot = document.createElement('div');
  myPlot.setAttribute('class', 'plot')
  graphicHalf[i].appendChild(myPlot)
}

// getting all the plotspaces
var plotSpace = document.querySelectorAll('.graphic-half div')

// populate this with ALL of our data, according to how many info-plots there are
var dataBranch = [];

// creating an object for each of the sections in the array
var paragraphSections = document.getElementsByClassName('paragraph')
for (let i = 0; i < paragraphSections.length; i ++) {
  // making space in the data branches
  dataBranch.push({x: [], y: [], plotType: '', trace:[]})
}

// array of all the data
const dataAll = [
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-child-mortality.csv", 
    index: 2, 
    section: 2,
    piggyIndex: 2,
    plotType: 'new',
    plot: 'scatter',
    title: 'World Child Mortality Rate'
  },
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-poverty.csv",
    index: 3,
    section: 2,
    piggyIndex: 2,
    plotType: 'build',
    plot: 'scatter',
    title: 'Percentage of World living in Extreme Poverty'
  },
  {
    source: "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/ssafrica-refugee.csv",
    index: 6,
    section: 4,
    piggyIndex: 6,
    plotType: 'new',
    plot: 'scatter',
    title: 'Refugee Numbers in Sub-Saharan Africa'
  },
]

var addOnce = 0;

// ////////////// LOADING THE CSVS /////////////// //
function loadData(dataSource) {
  Plotly.d3.csv(dataSource.source, function(data){ processData(data, dataSource.index, dataSource.piggyIndex, dataSource.section, dataSource.plotType, dataSource.plot, dataSource.title) } );
};

// ///////////// PROCESSING THE DATA ///////////////
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
  
  // CHECK IF WE'RE CREATING A NEW PLOT OR BUILDING ON TOP OF AN EXISTING ONE
  if (plotType == 'new') {
    plotThis(index, piggyIndex, section, xKey, yKey, title)
  } else if (plotType == 'build') {
    addThis(index, piggyIndex, section, yKey)
  }

  scrollContainer.addEventListener('scroll', function() {
    if (currentIndex + 1 == index) {
      styleUpdate(index, piggyIndex, section)
    }
  })
}

// CREATE THE PLOTS
function plotThis(index, piggyIndex, section, xLegend, yLegend, title) {
  // pushing the data
  dataBranch[index].trace.push({
    x: dataBranch[index].x, 
    y: dataBranch[index].y,
    name: yLegend + '      ',
    hoverinfo: 'none',
    type: 'scatter',
    mode: 'lines',
    line: {
      shape: 'spline',
      color: '#904E55',
      width: 3
    },
  });
  layout.title = title
  layout.xaxis.title = xLegend
  layout.yaxis.title = yLegend
  Plotly.newPlot(plotSpace[section], dataBranch[index].trace, layout, {displayModeBar: false})
}

// ADD TRACES TO THE PLOTS
function addThis(index, piggyIndex, section, yLegend) {
  dataBranch[piggyIndex].trace.push({
    x: dataBranch[index].x, 
    y: dataBranch[index].y,
    yaxis: 'y2',
    name: yLegend + '      ',
    type: 'scatter',
    mode: 'lines',
    opacity: 0.1,
    line: {
      shape: 'spline',
      color: '#BFB48F',
      width: 3
    },

  });
  layout.yaxis2.title = yLegend
  Plotly.update(plotSpace[section], dataBranch[piggyIndex].trace, layout, {displayModeBar: false})
}

// UPDATING ANY STYLES OF THE TRACES OR LAYOUT
function styleUpdate(index, piggyIndex, section) {
  // CHILD MORTALITY X EXTREME POVERTY
  if (piggyIndex == 2) {
    if (index == 2) {
      Plotly.restyle(plotSpace[section], {opacity: 0.1, hoverinfo: 'none'}, 1);
      Plotly.restyle(plotSpace[section], {opacity: 1, hoverinfo: 'x+y'}, 0);
      Plotly.relayout(plotSpace[section], {title: 'Child Mortality and Extreme Poverty', yaxis: {color:"#303030", showgrid:false, title:'Child Mortality Rate', range:[0, 90]}, yaxis2: {color:"#30303050", showgrid:false, overlaying:'y', side:'right', title:'% of World Population living in Extreme Poverty', range:[0, 40]}})
    } else if (index == 3) {
      Plotly.restyle(plotSpace[section], {opacity: 1, hoverinfo: 'x+y'}, 1);
      Plotly.restyle(plotSpace[section], {opacity: 0.1, hoverinfo: 'none'}, 0);
      Plotly.relayout(plotSpace[section], {title: 'Child Mortality and Extreme Poverty', yaxis: {color:"#30303050", showgrid:false, title:'Child Mortality Rate', range:[0, 90]}, yaxis2: {color:"#303030", showgrid:false, overlaying:'y', side:'right', title:'% of World Population living in Extreme Poverty', range:[0, 40]}})
    }
  // MAP OF CONFLICT SITUATIONS AROUND THE WORLD
  } else if (piggyIndex == 4) {
    if (index == 4) {
      Plotly.restyle(plotSpace[section], {marker: {opacity: 0}, hoverinfo: 'none'}, 1);
      Plotly.relayout(plotSpace[section], {geo: {
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
    }})
    } else if (index == 5) {

      Plotly.restyle(plotSpace[section], {marker: {opacity: 1}, hoverinfo: 'none'}, 1);
      Plotly.relayout(plotSpace[section], {geo: {
        projection: {
            type: ''
        },
        lonaxis: {range:[-150, 120]},
        lataxis: {range:[-60, 60]},
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
    }})
    }
  // REFUGEE POPULATIONS 1
  } else if (piggyIndex == 6) {
    Plotly.restyle(plotSpace[section], {line:{color: '#BFB48F', shape: 'spline', width: 3}, hoverinfo: 'x+y'}, 0);
    Plotly.relayout(plotSpace[section], {title: 'Refugees Originating from Sub-Saharan Africa', yaxis: {color:"#303030", showgrid:false, title:'Refugee Population'}, yaxis2: {color:"#30303050", showgrid:false, overlaying:'y', side:'right', title:'Extreme Poverty % of Population'}})
    if (index == 5 || index == 6) {
      Plotly.relayout(plotSpace[section], {
        shapes: [],
        xaxis: {showgrid: false, range: [1990, 2020] }, 
        yaxis: {title:'Refugee Population', showgrid: false,  range: [2500000, 8000000]},
        annotations: [
        {
          x: 1994,
          y: 6727751,
          xref: 'x',
          yref: 'y',
          text: '1994: 6.7 million refugees',
          font: {
            size: 12,
            color: 'transparent'
          },
          align: 'center',
          arrowcolor: 'transparent',
          width: 160,
          bgcolor: 'transparent',
          showarrow: true,
          arrowhead: 6,
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
            size: 12,
            color: 'transparent'
          },
          align: 'center',
          arrowcolor: 'transparent',
          width: 180,
          bgcolor: 'transparent',
          showarrow: true,
          arrowhead: 6,
          ax: 0,
          ay: -40,
          xanchor: 'right',
          yanchor: 'bottom'
        }
      ]})
    } else if (index == 7) {
      Plotly.relayout(plotSpace[section], {
        shapes: [
          // 1st highlight during 1994
          {
              type: 'rect',
              // x-reference is assigned to the x-values
              xref: 'x',
              // y-reference is assigned to the plot paper [0,1]
              yref: 'paper',
              x0: '1990',
              y0: 0,
              x1: '1998',
              y1: 1,
              fillcolor: '#d3d3d3',
              opacity: 0.2,
              line: {
                  width: 0
              }
          },
          {
            type: 'rect',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '2013',
            y0: 0,
            x1: '2019',
            y1: 1,
            fillcolor: '#d3d3d3',
            opacity: 0.2,
            line: {
                width: 0
            }
        },

        ],
        xaxis: {showgrid: false, range: [1990, 2020] }, 
        yaxis: {title:'Refugee Population', showgrid: false,  range: [2500000, 8000000]},
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
          arrowhead: 6,
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
            size: 12,
            color: '#fefefe'
          },
          align: 'center',
          arrowcolor: '#303030',
          width: 180,
          bgcolor: '#303030',
          showarrow: true,
          arrowhead: 6,
          ax: 0,
          ay: -40,
          xanchor: 'right',
          yanchor: 'bottom'
        }
      ]})
    } else if (index == 8) {
      Plotly.relayout(plotSpace[section], {
        shapes: [
          // 1st highlight during 1994
          {
              type: 'rect',
              // x-reference is assigned to the x-values
              xref: 'x',
              // y-reference is assigned to the plot paper [0,1]
              yref: 'paper',
              x0: '1990',
              y0: 0,
              x1: '1998',
              y1: 1,
              fillcolor: '#d3d3d3',
              opacity: 0.2,
              line: {
                  width: 0
              }
          },
        ],
        xaxis: {showgrid: false, range: [1990, 2020] }, 
        yaxis: {title:'Refugee Population', showgrid: false, range: [2500000, 8000000]},
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
          arrowhead: 6,
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
            size: 12,
            color: 'transparent'
          },
          align: 'center',
          arrowcolor: 'transparent',
          width: 180,
          bgcolor: 'transparent',
          showarrow: true,
          arrowhead: 6,
          ax: 0,
          ay: -40,
          xanchor: 'right',
          yanchor: 'bottom'
        }
      ]})
    }
  // PREDICTION PLOT
  } else if (index == 20 || index == 21) {
    if (index == 20) {          
      Plotly.restyle(document.querySelectorAll('#prediction .plot')[0], {line:{dash: 'dot', color: '#564E58', shape: 'spline', width: 3}, hoverinfo: 'x+y'}, 1);
      Plotly.restyle(document.querySelectorAll('#prediction .plot')[0], {line:{dash: 'dot', color: '#904E5530', shape: 'spline', width: 3}, hoverinfo: 'x+y'}, 2);
      Plotly.relayout(document.querySelectorAll('#prediction .plot')[0], 
      {
      shapes: [],
      title: 'Child Mortality in Sub-Saharan Africa',
      xaxis:{
          range:[1990, 2026],
          showgrid: false,
      },
      yaxis:{
          range:[20, 100],
          showgrid: false,
          title: 'Child Mortality'
      },
      font: {
          size: 12,
          family: "Source Sans Pro, sans-serif",
          color: "#303030"
          }, 
      plot_bgcolor:"transparent",
      paper_bgcolor:"transparent",
    })
    } else if (index == 21) {
      Plotly.restyle(document.querySelectorAll('#prediction .plot')[0], {line:{dash: 'dot', color: '#564E5830', shape: 'spline', width: 3}, hoverinfo: 'x+y'}, 1);
      Plotly.restyle(document.querySelectorAll('#prediction .plot')[0], {line:{dash: 'dot', color: '#904E55', shape: 'spline', width: 3}, hoverinfo: 'x+y'}, 2);
      Plotly.relayout(document.querySelectorAll('#prediction .plot')[0], 
      {
      shapes: [
        // 1st highlight during 1994
        {
            type: 'rect',
            // x-reference is assigned to the x-values
            xref: 'x',
            // y-reference is assigned to the plot paper [0,1]
            yref: 'paper',
            x0: '1995',
            y0: 0,
            x1: '2005',
            y1: 1,
            fillcolor: '#d3d3d3',
            opacity: 0.2,
            line: {
                width: 0
            }
        },
        {
          type: 'rect',
          // x-reference is assigned to the x-values
          xref: 'x',
          // y-reference is assigned to the plot paper [0,1]
          yref: 'paper',
          x0: '2017',
          y0: 0,
          x1: '2025',
          y1: 1,
          fillcolor: '#d3d3d3',
          opacity: 0.2,
          line: {
              width: 0
          }
      }
      ],
      title: 'Child Mortality in Sub-Saharan Africa',
      xaxis:{
          range:[1990, 2026],
          showgrid: false,
      },
      yaxis:{
          range:[20, 100],
          showgrid: false,
          title: 'Child Mortality'
      },
      font: {
          size: 12,
          family: "Source Sans Pro, sans-serif",
          color: "#303030"
          }, 
      plot_bgcolor:"transparent",
      paper_bgcolor:"transparent",
    })
    }
  }
}

///////// ALL FUNCTIONS EXECUTED BY THE LOAD DATA FUNCTION - THIS CALLS ALL DATA SETS ///////////////////
for (let i = 0; i < dataAll.length; i ++) {
  if (dataAll[i] !== undefined) {
    loadData(dataAll[i]);
  }
}

// PEOPLE GRAPH & DOT CONTAINER
var people = document.getElementsByClassName('people')[0]
// SELECTING THE DOT CONTAINER
var dotContainer = document.getElementsByClassName('dot-container')[0]

// SCROLL EVENTS FROM NON DATA CALLS
scrollContainer.addEventListener('scroll', function() {
  // 
  if (currentIndex + 1 == 7) {
    styleUpdate(currentIndex + 1, 6, 4)
  } else if (currentIndex + 1 == 8) {
    styleUpdate(currentIndex + 1, 6, 4)
  } else if (currentIndex + 1 == 4) {
    styleUpdate(currentIndex + 1, 4, 3)
  } else if (currentIndex + 1 == 5) {
    styleUpdate(currentIndex + 1, 4, 3)

  // SUB-SAHARAN AFRICA MAP
  } else if (currentIndex + 1 == 10 || currentIndex + 1 == 11 || currentIndex + 1 == 12 || currentIndex + 1 == 13){
      if (currentIndex == 9) {
        Plotly.relayout(plotSpace[6], {
          geo: {
              scope: 'africa',
              bgcolor: 'transparent',
              // lonaxis: {range: [-20, 40]},
              // lataxis: {range: [-10, 10]},    
          }
        })
      } else if (currentIndex == 10) {
        Plotly.relayout(plotSpace[6], {
          geo: {
              scope: 'africa',
              bgcolor: 'transparent',
              // lonaxis: {range: [8, 50]},
              // lataxis: {range: [-10, 10]},    
          }
        })
      } else if (currentIndex == 11) {
        Plotly.relayout(plotSpace[6], {
          geo: {
              scope: 'africa',
              bgcolor: 'transparent',
              // lonaxis: {range: [0, 40]},
              // lataxis: {range: [-10, 10]},    
          }
        })
      } else if (currentIndex == 12) {
        Plotly.relayout(plotSpace[6], {
          geo: {
              scope: 'africa',
              bgcolor: 'transparent',
              // lonaxis: {range: [20, 40]},
              // lataxis: {range: [-10, 10]},    
          }
        })
      }

  // BUBBLE CHART
  } else if (currentIndex + 1 == 14) {
    if (addOnce == 1) {
      var bubble = document.getElementsByClassName('bubble')
      for (let i = 0; i < bubble.length; i ++) {
        bubble[i].classList.remove('offset')
      }
      addOnce = 0
    }

  }
  else if (currentIndex + 1 == 15) {
    if (addOnce == 0) {
      var bubble = document.getElementsByClassName('bubble')
      for (let i = 0; i < bubble.length; i ++) {
        bubble[i].classList.add('offset')
      }
      addOnce = 1
    }

  // PEOPLE GRAPH
  } else if (currentIndex + 1 == 16) {
    people.classList.remove('active')
  } else if (currentIndex + 1 == 17) {
    people.classList.add('active')
  } else if (currentIndex + 1 == 20) {

  // PREDICTION CHART
    styleUpdate(currentIndex + 1, 0, 0)
  } else if (currentIndex + 1 == 21) {
    styleUpdate(currentIndex + 1, 0, 0)
  }


    var labels = document.querySelectorAll('.dot-container label h6')
    // check index for location i.e. if its first or last, completely hide the dot containers
    if (currentIndex != -1 && currentIndex != 21) {
      if (currentIndex == 14) {
        labels.forEach(function(object) {
          object.style.opacity = 0
        })
      } else {
        labels.forEach(function(object) {
          object.style.opacity = 1
        })
      }
      dotContainer.style.opacity = 1;

      // if this section is 'centered', meaning it has a coloured background, set the dot containers to white
      if (paragraphSections[currentIndex].parentElement.parentElement.classList.contains('centered')) {
        dotContainer.classList.add('white')
      } else if (paragraphSections[currentIndex].parentElement.parentElement.classList.contains('txt-centered')) {
        dotContainer.classList.add('white')
      } else {
        dotContainer.classList.remove('white')
      }
    } else if (currentIndex == 21) {
      dotContainer.style.opacity = 0;
      labels.forEach(function(object) {
        object.style.opacity = 1
      })
    }
})

// populate people chart with people
for (let i = 0; i < 31 * 10 + 2; i ++) {
  var person = document.createElement('img')
  person.setAttribute('src', '../public/images/child.svg')
  people.appendChild(person)
}