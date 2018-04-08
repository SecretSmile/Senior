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
    $("#loading").show();
    firebase.auth().onAuthStateChanged(user=>{                
      if(user){
        const  userid = firebase.database().ref().child('dataprofile/'+localStorage.getItem("keyView"));
         
      }else{
              window.location.assign("login_adhd");
      }
    });
})();
