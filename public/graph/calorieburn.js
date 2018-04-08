google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Calorie Burn');

    data.addRows([
        [0, 1456], [1, 2378], [2, 2362], [3, 1407], [4, 1398], [5, 1428],
        [6, 1387], [7, 2418], [8, 1400], [9, 2398], [10, 1397], [11, 1387],
        [12, 2397], [13, 2380], [14, 2368], [15, 1419], [16, 1466], [17, 1370],
        [18, 1417], [19, 2385], [20, 2372], [21, 1380], [22, 1368], [23, 1366],
        [24, 2416], [25, 1402], [26, 2369], [27, 2370], [28, 1372], [29, 1369],
        [30, 1376]
    ]);

    var options = {
        hAxis: {
          title: 'Day'
        },
        vAxis: {
          title: 'cal'
        },
        series: {
          1: {curveType: 'function'}
        },
        colors: ['#00BFFF']
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_calorieburn'));
    chart.draw(data, options);
}