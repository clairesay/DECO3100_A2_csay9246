

// d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2010_alcohol_consumption_by_country.csv', function(err, rows){
//       function unpack(rows, key) {
//           return rows.map(function(row) { return row[key]; });
//       }

//     var data = [{
//         type: 'choropleth',
//         locationmode: 'country names',
//         locations: unpack(rows, 'location'),
//         z: unpack(rows, 'alcohol'),
//         text: unpack(rows, 'location'),
//         autocolorscale: true
//     }];

//     var layout = {
//       title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
//       geo: {
//           projection: {
//               type: 'robinson'
//           }
//       }
//     };

//     Plotly.newPlot("myDiv", data, layout, {showLink: false});

// });

// currentIndex of the info-plot in view
var currentIndex;
scrollContainer.addEventListener('scroll', function() {
  currentIndex = Math.round(this.scrollTop/sectionHeight) - 1
})

// all info-plots
// var wholeSections = document.getElementsByClassName('info-plot')
// the graphic half within the info-plot
// var graphicHalf = document.getElementsByClassName('graphic-half')
var plotSpace = document.querySelectorAll('.graphic-half div')

function loadData(dataSource) {
    Plotly.d3.csv(dataSource.source, function(data){ processData(data) } );
};
  
function processData(allRows) {
    var country = [], value = [];

    for (let i = 0; i < allRows.length; i++) {
        let row = allRows[i];
        country.push(row['Country'])
        value.push(row['Conflict'])
    }

    createMap(country, value);
}

function createMap(country, value) {
  var data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: country,
      z: value,
      text: country,
      autocolorscale: true
  }];
  var layout = {
    title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
    geo: {
        projection: {
            type: 'robinson'
        }
    }
  };
  Plotly.newPlot(plotSpace[4], data, layout, {displayModeBar: false});
}



///////// ALL FUNCTIONS EXECUTED BY THE LOAD DATA FUNCTION - CALLS ALL DATA SETS ///////////////////
loadData()