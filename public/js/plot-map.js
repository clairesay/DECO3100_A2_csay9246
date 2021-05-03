var refugeeDataSource = "https://raw.githubusercontent.com/clairesay/DECO3100_A2_csay9246/main/public/data/ssafrica-refugee-full.csv"
function loadRefugeeMapData() {
    Plotly.d3.csv(refugeeDataSource, function (data) { processRefugeeMap(data) });
};

// recording the values from the csv
function processRefugeeMap(allRows) {
    var country = [], refugees = [], refugeesLabel = [];
    for (let i = 0; i < allRows.length; i++) {
        let row = allRows[i];
        country.push(row['Country Code'])
        refugees.push(row['1994'] / 18000)
        refugeesLabel.push(row['Country Name'] + ': ' + row['1994'])
    }
    createRefugeeMap(country, refugees, refugeesLabel);
}

// creating the plot, setting the details for the data and layout
function createRefugeeMap(country, refugees, refugeesLabel) {

    var data = [
        // this first trace is for a choropleth map that hides countries that are a part of the African continent,
        // but not part of Sub-Saharan Africa
        {
            type: 'choropleth',
            locationmode: 'country names',
            locations: ['Morocco', 'Tunisia', 'Algeria', 'Libya', 'Egypt', 'Western Sahara'],
            z: [0, 0, 0, 0, 0, 0],
            colorscale: [[0, '#fafafa'], [1, '#fafafa']],
            hoverinfo: 'none',
            showscale: false,
            marker: {
                line: {
                    color: '#eeeeee',
                    width: 1
                }
            }
        },
        // this second trace is for the actual scatter plot on the map to create a 'bubble map'
        {
            type: 'scattergeo',
            mode: 'markers',
            hovertext: refugeesLabel,
            hoverinfo: 'text',
            locations: country,
            marker: {
                color: '#BFB48F',
                size: refugees,
                showscale: false,
                line: {
                    color: '#eeeeee',
                    width: 1
                }
            },

        },

    ];

    var lay = {
        geo: {
            scope: 'africa',
            bgcolor: 'transparent',
            countrycolor: '#303030'
        },
        dragmode: false,

        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
        },
    };

    // revealing the bubble legend on load
    var bubbleLegend = document.getElementById('legend')
    bubbleLegend.style.visibility = 'visible';
    plotSpace[6].appendChild(bubbleLegend);
    Plotly.newPlot(plotSpace[6], data, lay, { displayModeBar: false, responsive: true });

}
loadRefugeeMapData()