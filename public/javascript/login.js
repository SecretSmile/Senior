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
    const u = firebase.database().ref().child('alluser/'+user.uid+'/who');
            u.on('value',snap=> {
                var data = "parent";
                if(snap.val()==data){
                    window.location.assign("home_parent");
                }else if(snap.val()=="doctor"){
                    window.location.assign("home_doctor");
                }else if(snap.val()=="admin"){
                    window.location.assign("home_admin");
                }else{
                    var user = firebase.auth().currentUser;
                    user.delete().then(function() {
                        // User deleted.
                        alert('Invalid No Data');
                    }).catch(function(error) {
                        // An error happened.
                        console.log("Error happen",error);
                    });
                }
            });
    
}else{
    
 
const username = document.getElementById('username');
const password = document.getElementById('password');
const btnlogin = document.getElementById('login');
const btnregister = document.getElementById('signup');

btnlogin.addEventListener('click',e =>{
    const email = username.value;
    const pass = password.value;
    const auth = firebase.auth();
   
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if (reg.test(email) == false){
    alert('Invalid Email Address');
    return (false);
   }else if(email=="admin"&&pass=="admin"){
        window.location.assign("home_admin");
    }else{
        const promise = auth.signInWithEmailAndPassword(email,pass).then(value=>{
            const obwho = firebase.database().ref().child(value.uid+'/who');
            obwho.on('value',snap=> {
                var data = "parent";
                if(snap.val()==data){
                    window.location.assign("home_parent");
                }else if(snap.val()=="doctor"){
                    window.location.assign("home_doctor");
                }else{
                    window.location.assign("login_adhd");
                }
            });
           
        }).catch(e=> { 
        var user = auth.currentUser;
        user.delete().then(function() {
            // User deleted.
            window.alert("Email  or  password not correct.")
        }).catch(function(error) {
            // An error happened.
            window.alert("Email  or  password not sign up.")
        }); 
        });
    }
});

btnregister.addEventListener('click',e=>{
   register();
});
}
});

})();


function register(){
//get email and password

const username = document.getElementById('username');
const password = document.getElementById('password');
const email = username.value;
const pass = password.value;
const auth = firebase.auth();
var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//var address = document.getElementById[email].value;
if (reg.test(email) == false) 
{
   alert('Invalid Email Address');
   return (false);
}else if(email==""|| pass==""){
   window.alert("Fill  email  and password");
}else{
//signup
const sig = auth.createUserWithEmailAndPassword(email,pass) .then(value => {
   window.location.assign("register_parent");
 })
 .catch(err => {
   console.log('Something went wrong:',err.message);
 });    
 
}
}