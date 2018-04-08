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


    firebase.auth().onAuthStateChanged(firebaseUser=>{
        if(firebaseUser){
            var gh = firebaseUser.uid;
        console.log(firebaseUser);
        console.log(" Test ==> UID"+gh);
        }else{
            console.log('not log in');
        }
       });

})();