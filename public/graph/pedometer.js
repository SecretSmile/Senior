google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Pedometer');

    data.addRows([
        [0, 4560], [1, 3789], [2, 3672], [3, 4078], [4, 3980], [5, 4282],
        [6, 3879], [7, 4183], [8, 4090], [9, 3989], [10, 3978], [11, 3875],
        [12, 3978], [13, 3870], [14, 3968], [15, 4169], [16, 4066], [17, 3770],
        [18, 4172], [19, 3875], [20, 3672], [21, 3870], [22, 3968], [23, 3866],
        [24, 4167], [25, 4072], [26, 3969], [27, 3770], [28, 3772], [29, 3869],
        [30, 3768]
    ]);

    var options = {
        hAxis: {
          title: 'Day'
        },
        vAxis: {
          title: 'Step'
        },
        series: {
          1: {curveType: 'function'}
        },
        colors: ['#000000']
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_pedometer'));
    chart.draw(data, options);
}