var myPlot = document.getElementById('myPlot')

const dataSource = "https://drive.google.com/file/d/1xiJ8k8NZSaZgAonmYBOr3jLvQxZVrp2H/view?usp=sharing";

function loadData() {
  Plotly.d3.csv(dataSource, function(data){ processData(data) } );
};

function processData(allRows) {
  console.log(allRows);
  let date = [], childMortalityRate = [];
  for (let i=0; i<allRows.length; i++) {
    let row = allRows[i];
    date.push( row['Year'] );
    childMortalityRate.push( row['Child Mortality Rate'] );
  }
  makePlot( date, childMortalityRate );
}

function makePlot( x_ray, y_ray ){
  var traces = [{
    x: x_ray, 
    y: y_ray
    // mode: 
  }];
  Plotly.newPlot('myPlot', traces, 
    {title: 'World Child Mortality Rate'});
};
