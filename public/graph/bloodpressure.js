google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable(
    [
      ["Mon", 68, 68, 120, 120],
      ["Tue", 67, 67, 113, 113],
      ["Wed", 62, 62, 110, 110],
      ["Thu", 40, 40, 131, 131],
      ["Fri", 66, 66, 101, 101]
      // Treat the first row as data.
    ],
    true
  );

  var options = {
    legend: "none",
    bar: { groupWidth: "100%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" } // green
    }
  };

  var chart = new google.visualization.CandlestickChart(
    document.getElementById("chart_bloodpressure")
  );
  chart.draw(data, options);
}
