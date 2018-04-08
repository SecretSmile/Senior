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
            console.log("test--------------------> UID",user.uid);
        const  userid = firebase.database().ref('alluser').child(user.uid+'/id');
        userid.on('value',snap=> {
            console.log("test--------------------> key",snap.key);
            console.log("test--------------------> value",snap.val());
            const  nick = firebase.database().ref().child('dataprofile/'+snap.val()+'/nickname');
            const  firstname_child = firebase.database().ref().child('dataprofile/'+snap.val()+'/firstname');
            nick.on('value', p=>{                
                const nickname = document.getElementById('nickname');
                nickname.innerText = "Welcome "+p.val()+"\n"+"ADHD Monitoring"+"\n"+"Attention Deficit Hyperactive Disorder Monitoring";
            });
            firstname_child.on('value', p=>{             
                const firstname = document.getElementById('firstname');
                firstname.innerText = "Profile of "+p.val();
            });
        });
    }else{
        window.location = "login_adhd";
    }
    });
    
    })();

function logout(){
    firebase.auth().signOut(); 
    window.location = "https://adhd-monitor.firebaseapp.com";
}

