/* Function Objective:  show data of doctor and list all data patient
     Input parameters : user from login
     Function description: Home of doctor show dta about doctor and list all data patient
     Return Value : value
     Created By : Supawan 
     Create Date: 1/1/2018
     Revised By: Supawan 
     Revised Date: 28/3/2018
*/
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
    firebase.auth().onAuthStateChanged(login_user=>{                
      if(login_user){
        var DOCTORTYPE = "doctor"; 
        const  uid_user = firebase.database().ref().child('alluser/'+login_user.uid).orderByValue().equalTo(DOCTORTYPE);
        uid_user.on('value',all_user=> {
          const  key_user= firebase.database().ref().child('alluser/'+all_user.key+'/id');
          key_user.on('value',user_doctor=>{
                //consider value not equal null  be data of doctor  
                if(user_doctor.val() !=null ){
                    const data_doctor = firebase.database().ref().child('datadoctor/'+user_doctor.val());
                    data_doctor.on('value',doctor_type=>{
                            var profile_doctor = doctor_type.val();
                            var i_day_doctor = new Date(profile_doctor.birthday);
                            var dt_birth_doc = dt_birth_doc.getDate()+"/"+dt_birth_doc.getMonth()+"/"+dt_birth_doc.getFullYear();
                            var profile_typedoctor="";
                            profile_typedoctor += '<p>FirstName :'+profile_doctor.firstname+'</p><br>';
                            profile_typedoctor += '<p>LastName : '+profile_doctor.lastname+'</p><br>';
                            profile_typedoctor += '<p>Birthday: '+dt_birth_doc+'</p><br>';
                            profile_typedoctor += '<p>Department : '+profile_doctor.department+'</p><br>';
                            profile_typedoctor += '<p>Telephone : '+profile_doctor.Telephone+'</p><br>';
                            profile_typedoctor += '<p>Email : '+login_user.email+'</p><br>';
                            document.querySelector("#profiledoctor").innerHTML += profile_typedoctor;
                            
                            //get all data patient 
                            const patient_type = firebase.database().ref('alluser').orderByChild('id');
                            patient_type.once('value',allpatient_type=> {
                              allpatient_type.forEach(allpatient_user=>{
                                const patientuser_type= firebase.database().ref().child('alluser/'+allpatient_user.key);
                                patientuser_type.on('value',user_patient=> {
                                   var data_patient = user_patient.val();
                                   var  PATIENT_TYPE = "parent"; 
                                   //consider data about data of patient.
                                   if(data_patient.who == PATIENT_TYPE){
                                     const  profile_patienttype = firebase.database().ref('dataprofile/'+data_patient.id);           
                                     profile_patienttype.on('value', profile_patient=>{   
                                       var patient_data = profile_patient.val(); 
                                       var dt_Birth_patient = new Date(patient_data.birthday);
                                       var str_month_patient = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                                       var str_weekday_patient = [ "Sunday","Monday", "Tuesday","Wednesday", "Thursday" ,"Friday","Saturday"];
                                       var str_Birth_patient = dt_Birth_patient.getDate()+"/"+dt_Birth_patient.getMonth()+"/"+dt_Birth_patient.getFullYear();
                                       var str_profile_patienttype ="";
                                       str_profile_patienttype +=  '<tr>';
                                       str_profile_patienttype +=  '<td>'+profile_patient.key+'</td>';
                                       str_profile_patienttype +=  '<td>'+patient_data.firstname+'</td>';
                                       str_profile_patienttype +=  '<td>'+patient_data.lastname+'</td>';
                                       str_profile_patienttype +=  '<td>'+patient_data.nickname+'</td>';
                                       str_profile_patienttype +=  '<td>'+str_weekday_patient[dt_Birth_patient.getDay()]+" "+dt_Birth_patient.getDate()+" "+str_month_patient[dt_Birth_patient.getMonth()] +" "+dt_Birth_patient.getFullYear()+ '</td>';
                                       str_profile_patienttype +=  '<td><a href="javascript:viewData('+profile_patient.key+');">View</a></td>'  ;     
                                       str_profile_patienttype +=  '</tr>';
                                       document.querySelector("#profile").innerHTML += str_profile_patienttype;
                                       $("#loading").hide();
                                     });
                                    
                                   }
                               });
                         });
                        });
                    });
              }else{
                //considered with don't have data of user that login
                login_user.delete().then(function() {
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
          //considered with don't have user login
          var stateon_user = firebase.auth().currentUser;
          stateon_user.delete().then(function() {
              // User deleted.
              window.location.assign("login_adhd");
          }).catch(function(error) {
              // An error happened.
              console.log("Error happen",error);
          });
        }
    });
})();
/* Function Objective: view data of patient send to next page/
     Input parameters : key_patienttype
     Function description: view data of patient 
     Return Value : page and data
     Created By : Supawan 
     Create Date: 1/1/2018
     Revised By: Supawan 
     Revised Date: 28/3/2018
*/
function viewData(key_patienttype) {
    window.location.assign("graph_doctor");
}

/* Function Objective: logout
    Function description: signout 
     Return Value : page and data
     Created By : Supawan 
     Create Date: 1/1/2018
     Revised By: Supawan 
     Revised Date: 28/3/2018
*/
function logout(){
    firebase.auth().signOut(); 
    window.location = "login_adhd";
}

/* Function Objective: translate date to use calculate age
    Function description: translate date  
     Return Value : date
     Created By : Ekarin
     Create Date: 1/1/2018
     Revised By: Ekarin 
     Revised Date: 28/3/2018
*/
function parseDate(dateStr) {
    var dateParts = dateStr.split("/");
    return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
}

/* Function Objective: calculate age
    inputparameter : date of bithday and new date
    Function description: calculate Age 
     Return Value : age
     Created By : Supawan 
     Create Date: 1/1/2018
     Revised By: Supawan 
     Revised Date: 28/3/2018
*/
  function calculateAge (dt_Birth, dt_Calculate_Day) {
      var dt_calculate_Year = dt_Calculate_Day.getFullYear();
      var dt_calculate_Month = dt_Calculate_Day.getMonth();
      var dt_calculate_Day = dt_Calculate_Day.getDate();
  
      var dt_birthYear = dt_Birth.getFullYear();
      var dt_birthMonth = dt_Birth.getMonth();
      var dt_birthDay = dt_Birth.getDate();
  
      var age_Year = dt_calculate_Year - dt_birthYear;
      var age_Month = dt_calculate_Month - dt_birthMonth;
      var age_Day = dt_calculate_Day - dt_birthDay;
  
      if (age_Month < 0 || (age_Month == 0 && age_Day < 0)) {
          age_Year = parseInt(age_Year) - 1;
      }
      return age_Year;
  }
  
  /* Function Objective: parese date check
    inputparameter : string date
    Function description: parse date 
     Return Value : true or false
     Created By : Thitaporn
     Create Date: 1/1/2018
     Revised By: Thitaporn
     Revised Date: 28/3/2018
*/
  function isDate(str_Date) {
    var str_curr_Val = str_Date;
    if (str_curr_Val == '')
      return true;
  
    //Declare Regex
    var dt_Pattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var bl_dtArray = str_curr_Val.match(dt_Pattern); // is format OK?
  
    if (bl_dtArray == null)
      return false;
    var bl_dtDay = bl_dtArray[1];
    var bl_dtMonth = bl_dtArray[3];
    var bl_dtYear = bl_dtArray[5];
  
    // consider date 
    if (bl_dtMonth < 1 || bl_dtMonth > 12)
      return false;
    else if (bl_dtDay < 1 || bl_dtDay > 31)
      return false;
    else if ((bl_dtMonth == 4 || bl_dtMonth == 6 || bl_dtMonth == 9 || bl_dtMonth == 11) && bl_dtDay == 31)
      return false;
    else if (bl_dtMonth == 2) {
      var bl_isleap = (bl_dtYear % 4 == 0 && (bl_dtYear % 100 != 0 || bl_dtYear % 400 == 0));
      if (bl_dtDay > 29 || (bl_dtDay == 29 && !bl_isleap))
        return false;
    }
  
    return true;
  }
  
  