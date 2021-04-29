
function make_plot(csv_data){
    let country_data = csv_data.filter(d => d.country == "Southern Sub-Saharan Africa");

    //To normalise our data, we need to know the minimum and maximum values
    //Math.min doesn't work with strings so we need to convert
    let mortality_data = country_data.map(d => Number(d.mortality))
    let min_mortality = Math.min(...mortality_data)
    let max_mortality = Math.max(...mortality_data)

    //This regression library needs values stored in arrays
    //We are using the strech function to normalise our data
    let regression_data = country_data.map(d => [stretch(d.year, 2005, 2017, 0, 1),
                                                 stretch(d.mortality, min_mortality, max_mortality, 0, 1)])

    //Here is where we train our regressor, experiment with the order value
    let regression_result = regression.polynomial(regression_data, {order: 3});

    let regression_data2 = country_data.map(d => [stretch(d.year, 1995, 2000, 0, 1),
        stretch(d.mortality, min_mortality, max_mortality, 0, 1)])

    //Here is where we train our regressor, experiment with the order value
    let regression_result2 = regression.polynomial(regression_data2, {order: 6});

    //Now we have a trained predictor, lets actually use it!
    let extension_x = [];
    let extension_y = [];
    // let extension_x2 = [];
    let extension_y2 = [];
    for(let year = 2017; year < 2026; year++){
        //We've still got to work in the normalised scale
        let prediction = regression_result.predict(stretch(year, 2005, 2017, 0, 1))[1]

        extension_x.push(year);
        //Make sure to un-normalise for displaying on the plot
        extension_y.push(stretch(prediction, 0, 1, min_mortality, max_mortality));


        //We've still got to work in the normalised scale
        let prediction2 = regression_result2.predict(stretch(year, 1995, 2000, 0, 1))[1]

        // extension_x2.push(year);
        //Make sure to un-normalise for displaying on the plot
        extension_y2.push(stretch(prediction2, 0, 1, min_mortality, max_mortality));


    }

    for (let i = 0; i < extension_y2.length; i ++) {
        extension_y[i] = extension_y[i] - 8.2
    }

    for (let i = 0; i < extension_y2.length; i ++) {
        extension_y2[i] = extension_y2[i] - 45
    }
    
    let dataP = [{
        x: country_data.map(d => d.year),
        y: country_data.map(d => d.mortality),
        name: 'Recorded',
        mode: 'lines',
        type: 'scatter',
        line: {
          shape: 'spline',
          color: '#904E55',
          width: 3
        },
    },
    //adding our extension as a second trace
    {
        x: extension_x,
        y: extension_y,
        name: 'Trendline',
        mode: 'lines',
        type: 'scatter',
        line: {
          dash: 'dot',
          shape: 'spline',
          color: 'transparent',
          width: 3
        },
    }, 
    {
        x: extension_x,
        y: extension_y2,
        name: 'Projection',
        mode: 'lines',
        type: 'scatter',
        line: {
          dash: 'dot',
          shape: 'spline',
          color: 'transparent',
          width: 3
        },
    }]

    var preLayout = {
        legend: {
            x: 0.05,
            xanchor: 'left',
            y: 0.05,
            itemwidth: 20,
            // "orientation": "h"
            // y: 0
        },
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
    }
    const plotSpaceP = document.querySelectorAll('#prediction .plot')[0]
    Plotly.newPlot(plotSpaceP, dataP, preLayout, {displayModeBar: false});
}


Plotly.d3.csv("https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/mortality.csv", make_plot);

//This stretch function is actually just the map function from p5.js
function stretch(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};