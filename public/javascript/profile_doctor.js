var ds;

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
            const  userid = firebase.database().ref().child('alluser/'+user.uid).orderByValue().equalTo("doctor");
            userid.on('value',snap=> {
                 const u = firebase.database().ref().child('alluser/'+snap.key+'/id');
                 u.on('value',userideee=>{
                    const udoctor = firebase.database().ref().child('datadoctor/'+userideee.val());
                    udoctor.on('value',vdoctor=>{
                            var pro = vdoctor.val();
                            var ddoc = new Date(pro.birthday);
                            var month_name= ["January","February","March","April","May","June","July","August","September","October","November","December"];
                            var dbdoc = ddoc.getDate()+"/"+month_name[ddoc.getMonth()]+"/"+ddoc.getFullYear();
                            var profiledoctor="";
                            profiledoctor += '<tr>';
                            profiledoctor += '<td>My ID :</td>';
                            profiledoctor += '<td>'+userideee.val()+'</td>';
                            profiledoctor += '</tr>';
                            profiledoctor += '<tr>';
                            profiledoctor += '<td>FirstName :</td>';
                            profiledoctor += '<td>'+pro.firstname+'</td>';
                            profiledoctor += '</tr>';
                            profiledoctor += '<tr>';
                            profiledoctor += '<td>LastName :</td>';
                            profiledoctor += '<td>'+pro.lastname+'</td>';
                            profiledoctor += '</tr>';
                            profiledoctor += '<tr>';
                            profiledoctor += '<td>Birthday :</td>';
                            profiledoctor += '<td>'+dbdoc+'</td>';
                            profiledoctor += '</tr>';
                            profiledoctor += '<tr>';
                            profiledoctor += '<td>Department :</td>';
                            profiledoctor += '<td>'+pro.department+'</td>';
                            profiledoctor += '</tr>';
                            profiledoctor += '<tr>';
                            profiledoctor += '<td>Telephone :</td>';
                            profiledoctor += '<td>'+pro.Telephone+'</td>';
                            profiledoctor += '</tr>';
                            profiledoctor += '<tr>';
                            profiledoctor += '<td>Email :</td>';
                            profiledoctor += '<td>'+user.email+'</td>';
                            profiledoctor += '</tr>';
                            document.querySelector("#doctordata").innerHTML += profiledoctor;
                            ds = ""+userideee.val();
                            $("#loading").hide();
                    });
                 });
            });
        }else{
            window.location.assign("login_adhd");
        }
    });
})();

function editdotor(){
    $('#myModal').modal();
    const udoctor = firebase.database().ref().child('datadoctor/'+ds);
    udoctor.on('value',value=>{
        document.querySelector("#id").value = value.key;
        document.querySelector("#firstname").value = value.val().firstname;
        document.querySelector("#lastname").value = value.val().lastname;
        document.querySelector("#bb").value = value.val().birthday;
        document.querySelector("#Telephone").value = value.val().Telephone;
        document.querySelector("#department").value = value.val().department;
    });
}

function saveChanges(){
    $('#myModal').hide();
    var data ={
        firstname :  document.querySelector("#firstname").value ,
        lastname : document.querySelector("#lastname").value ,
        birthday : document.querySelector("#bb").value ,
        Telephone :  document.querySelector("#Telephone").value,
        department :  document.querySelector("#department").value
    }

    var updates = {};
    updates['/datadoctor/'+ds] =data;
    firebase.database().ref().update(updates);
   
   alert("The profile will be  change.");
   location.reload();
}

function logout(){
    firebase.auth().signOut(); 
    location.reload();
}
