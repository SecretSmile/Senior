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
  var patientcount =[] ;
  var mcount =[] ;
  var doccount =[] ;
  var doctorcount ;
  var mothercount ;
  var u= 0;
  var ld= 0;
  var ppall =0;
  const type = firebase.database().ref('dataprofile');
  const dd = firebase.database().ref('datadoctor');
  const pp = firebase.database().ref('dataparent');
  type.once('value',typesu=> {
    for (i in typesu.val()) {u++;}
    dd.once('value',typesud=> {
      for (i in typesud.val()) { ld++;}
      pp.once('value',pall=> {
        for (i in pall.val().father) { ppall++;}
        for (i in pall.val().mother) { ppall++;}
        graph(u,ppall,ld)
      });
    });
  });
})();

function  graph(pat,par,doc){
  var chart = AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "theme": "none",
    "dataProvider": [{"country": "Parent","value": parseInt(par)},
    { "country": "Doctor","value": parseInt(doc)},
    {"country": "Patient","value": parseInt(pat) }],
    "valueField": "value",
    "titleField": "country",
    "outlineAlpha": 0.4,
    "depth3D": 15,
    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    "angle": 30,
    "export": {"enabled": true }
    } );
}