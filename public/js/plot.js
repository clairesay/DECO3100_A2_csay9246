var myPlot = document.getElementById('myPlot')

const dataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/world-child-mortality.csv?token=ANVXV7WUDOZ5KKYPK3YDBWLAQK3EC";

function loadData() {
  Plotly.d3.csv(dataSource, function(data){ processData(data) } );
};

function processData(allRows) {
  console.log(allRows);
  let foo = [], bar = [];
  for (let i=0; i<allRows.length; i++) {
    let row = allRows[i];
    foo.push( row['Year'] );
    bar.push( row['Child Mortality Rate'] );
  }
  makePlot( foo, bar );
}

function makePlot( x, y ){
  var traces = [{
    x: x, 
    y: y,
    type: 'markers',
    mode: 'scatter',
  }];
  
  Plotly.newPlot(myPlot, traces);
};

loadData()