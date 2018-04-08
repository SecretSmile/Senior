
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
            console.log("Error happen====>",userideee.val());
                   if(userideee.val() !=null ){
                    const udoctor = firebase.database().ref().child('datadoctor/'+userideee.val());
                    udoctor.on('value',vdoctor=>{
                            var pro = vdoctor.val();
                            var ddoc = new Date(pro.birthday);
                            var dbdoc = ddoc.getDate()+"/"+ddoc.getMonth()+"/"+ddoc.getFullYear();
                            var profiledoctor="";
                            profiledoctor += '<p>FirstName :'+pro.firstname+'</p><br>';
                            profiledoctor += '<p>LastName : '+pro.lastname+'</p><br>';
                            profiledoctor += '<p>Birthday: '+dbdoc+'</p><br>';
                            profiledoctor += '<p>Department : '+pro.department+'</p><br>';
                            profiledoctor += '<p>Telephone : '+pro.Telephone+'</p><br>';
                            profiledoctor += '<p>Email : '+user.email+'</p><br>';
                            document.querySelector("#profiledoctor").innerHTML += profiledoctor;
                            
                    const alluser = firebase.database().ref('alluser').orderByChild('id');
                    alluser.once('value',upatient=> {
                      upatient.forEach(u=>{
                                const typeuser= firebase.database().ref().child('alluser/'+u.key);
                                typeuser.on('value',userpatient=> {
                                   var k = userpatient.val();
                                   if(k.who=="parent"){
                                     const  dataprofile = firebase.database().ref('dataprofile/'+k.id);           
                                     dataprofile.on('value', patient=>{   
                                       var datapatient = patient.val(); 
                                       var d = new Date(datapatient.birthday);
                                       var month_name= ["January","February","March","April","May","June","July","August","September","October","November","December"];
                                       var weekday = [ "Sunday","Monday", "Tuesday","Wednesday", "Thursday" ,"Friday","Saturday"];
                                       var db = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
                                       var profile="";
                                       profile +=  '<tr>';
                                       profile +=  '<td>'+patient.key+'</td>';
                                       profile +=  '<td>'+datapatient.firstname+'</td>';
                                       profile +=  '<td>'+datapatient.lastname+'</td>';
                                       profile +=  '<td>'+datapatient.nickname+'</td>';
                                       profile +=  '<td>'+weekday[d.getDay()]+" "+d.getDate()+" "+month_name[d.getMonth()] +" "+d.getFullYear()+ '</td>';
                                       profile +=  '<td><a href="javascript:viewData('+patient.key+');">View</a></td>'  ;     
                                       profile +=  '</tr>';
                                       document.querySelector("#profile").innerHTML += profile;
                                       $("#loading").hide();
                                     });
                                   }
                               });
                         });
                        });
                    });
              }else{
                user.delete().then(function() {
                    // User deleted.
                    window.location.assign("login_adhd");
                }).catch(function(error) {
                    // An error happened.
                    console.log("Error happen",error);
                    window.location.assign("login_adhd");
                });
              }
            });
        });  
      }else{
              window.location.assign("login_adhd");
      }
    });
})();

  function viewData(patientkey) {


  }

  function logout(){
    firebase.auth().signOut(); 
    window.location = "login_adhd";
  }

  function parseDate(dateStr) {
    var dateParts = dateStr.split("/");
    return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
  }

  function calculateAge (dateOfBirth, dateToCalculate) {
      var calculateYear = dateToCalculate.getFullYear();
      var calculateMonth = dateToCalculate.getMonth();
      var calculateDay = dateToCalculate.getDate();
  
      var birthYear = dateOfBirth.getFullYear();
      var birthMonth = dateOfBirth.getMonth();
      var birthDay = dateOfBirth.getDate();
  
      var age = calculateYear - birthYear;
      var ageMonth = calculateMonth - birthMonth;
      var ageDay = calculateDay - birthDay;
  
      if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
          age = parseInt(age) - 1;
      }
      return age;
  }
  
  function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
      return true;
  
    //Declare Regex
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?
  
    if (dtArray == null)
      return false;
    var dtDay = dtArray[1];
    var dtMonth = dtArray[3];
    var dtYear = dtArray[5];
  
    if (dtMonth < 1 || dtMonth > 12)
      return false;
    else if (dtDay < 1 || dtDay > 31)
      return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
      return false;
    else if (dtMonth == 2) {
      var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
      if (dtDay > 29 || (dtDay == 29 && !isleap))
        return false;
    }
  
    return true;
  }
  
  