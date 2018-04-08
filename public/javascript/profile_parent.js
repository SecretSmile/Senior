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
    
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
        const  userid = firebase.database().ref().child(user.uid+'/id');
        userid.on('value',snap=> {
          
        });
    }else{
        window.location = "login_adhd";
    }
    });
    
    })();

function logout(){
    firebase.auth().signOut(); 
    location.reload();
}
function back(){
    window.location = "home_parent.html";
}