(function(){
  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAvWbldozNvwHus9BHTI1CVYtupGAkZjoI",
      authDomain: "adhd-monitor.firebaseapp.com",
      databaseURL: "https://adhd-monitor.firebaseio.com",
      projectId: "adhd-monitor",
      storageBucket: "adhd-monitor.appspot.com",
      messagingSenderId: "770484970077"
    };
  firebase.initializeApp(config);
    
    var chart = AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "theme": "none",
    "dataProvider": [ 
      {
    "country": "Doctor",
    "value": parseInt("9")
    }, {
    "country": "Patient",
    "value": parseInt("8")
    }, {
    "country": "Parent",
    "value": parseInt("16")
    }],
    "valueField": "value",
    "titleField": "country",
    "outlineAlpha": 0.4,
    "depth3D": 15,
    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    "angle": 30,
    "export": {
    "enabled": true
    }
    } );
})();