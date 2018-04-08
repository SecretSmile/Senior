google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Heart Rate');

    data.addRows([
        [1, 67], [2, 72], [3, 78], [4, 80], [5, 82],
        [6, 79], [7, 83], [8, 90], [9, 89], [10, 78], [11, 75],
        [12, 78], [13, 70], [14, 68], [15, 69], [16, 66], [17, 70],
        [18, 72], [19, 75], [20, 72], [21, 70], [22, 68], [23, 66],
        [24, 67], [25, 72], [26, 69], [27, 70], [28, 72], [29, 69],
        [30, 68]
    ]);

    var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'bpm'
        },
        series: {
          1: {curveType: 'function'}
        },
        colors: ['#a52714'],
        trendlines: {
          0: {type: 'linear', color: '#111', opacity: 1},
          1: {type: 'linear', color: '#333', opacity: .3}
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_heartrate'));
    chart.draw(data, options);
}