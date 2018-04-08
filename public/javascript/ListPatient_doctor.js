(function(){
    var config = {
        apiKey: "AIzaSyAvWbldozNvwHus9BHTI1CVYtupGAkZjoI",
        authDomain: "adhd-monitor.firebaseapp.com",
        databaseURL: "https://adhd-monitor.firebaseio.com",
        projectId: "adhd-monitor",
        storageBucket: "adhd-monitor.appspot.com",
        messagingSenderId: "770484970077"
      };
    firebase.initializeApp(config);
    
    $("#loadinger").show();
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            const type = firebase.database().ref('alluser').orderByChild('id');
            type.once('value',typesu=> {
              typesu.forEach(u=>{
                const typeuser= firebase.database().ref().child('alluser/'+u.key);
                typeuser.on('value',userpatient=> {
                   var k = userpatient.val();
                   if(k.who=="parent"){
                    var searchall = document.getElementById('searchall').value;
                   
                    if(searchall =='' ){
                     const  dataprofile = firebase.database().ref('dataprofile/'+k.id);           
                     dataprofile.on('value', patient=>{    
                         var datapatient = patient.val(); 
                         var d = new Date(datapatient.birthday);
                         var month_name= ["January","February","March","April","May","June","July","August","September","October","November","December"];
                         var weekday = [ "Sunday","Monday", "Tuesday","Wednesday", "Thursday" ,"Friday","Saturday"];
                         var db = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
                         var age = calculateAge(parseDate(db), new Date());
                         var profile = "";
                         profile +=  '<div class="row">';
                         profile +=  '<div class="span2" align="left">';
                         profile += '<img src="img/people.png" alt="" style="height:100px; width:100px;"/>';
                         profile += '</div>';
                         profile += '<br>';
                         profile +=  '<div class="span4" align="left">';
                         profile += '<div align="left" >';
                         profile += "Firstname : "+datapatient.firstname + "<br>";
                         profile += "Lastname : "+datapatient.lastname + "<br>";
                         profile += "Nickname : "+datapatient.nickname + "<br>";
                         profile += "Birthday : "+weekday[d.getDay()]+" "+d.getDate()+" "+month_name[d.getMonth()] +" "+d.getFullYear()+ "<br>";
                         profile += "Age : "+age + "<br>";
                         profile += "Gender : "+datapatient.sex + "<br>";
                         profile +='<a href="listheartratebydoctor.do?id=${pat.patientId}&&doctorid=${doctorId}">View detail Data</a>';
                         profile += '</div>';
                         profile +=	'<br class="clr" />';
                         profile += 	'</div>';
                         profile += 	'</div>';
                         profile += 	'<hr class="soft" />';
                         profile += '<br>';
                      document.querySelector("tagprofile").innerHTML += profile;
                      $("#loadinger").hide();
                     });
                    }else{
                      console.log("searchall======111111111===>>",searchall);
                      finddatadd();
                    }
                    }
                }); 
              });
            });
         
        }else{
            window.location.assign("login_adhd");
        }
    });
})();
function finddatadd() {
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
    document.querySelector("tagprofile").innerHTML = '';
    const type = firebase.database().ref('alluser').orderByChild('id');
        type.once('value',typesu=> {
          typesu.forEach(u=>{
            const typeuser= firebase.database().ref().child('alluser/'+u.key);
            typeuser.on('value',userpatient=> {
               var k = userpatient.val();
               var searchall = document.getElementById('searchall').value;
               console.log("tsthjkl;'j",searchall);
               if(searchall!=null  || searchall !='' || searchall != undefined){
               const  sall = firebase.database().ref().child('dataprofile/'+k.id).orderByValue().equalTo(searchall);
               if(k.who=="parent"){
                
                    sall.on('value', pp=>{  
                      if(pp.val()!=null){
                        const  dataprofile = firebase.database().ref('dataprofile/'+pp.key);              
                     dataprofile.on('value', patient=>{    
                     var datapatient = patient.val(); 
                     var d = new Date(datapatient.birthday);
                     var month_name= ["January","February","March","April","May","June","July","August","September","October","November","December"];
                     var weekday = [ "Sunday","Monday", "Tuesday","Wednesday", "Thursday" ,"Friday","Saturday"];
                     var db = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
                     var age = calculateAge(parseDate(db), new Date());
                     var profile = "";
                     profile +=  '<div class="row">';
                     profile +=  '<div class="col-lg-1" align="center" style="height:50%; width:50%;">';
                     profile += '<img src="img/people.png" alt="" style="height:100px; width:100px;"/>';
                     profile += '</div>';
                     profile += '<br>';
                     profile +=  '<div class="col-lg-2" align="right"  style="height:50%; width:50%;">';
                     profile += '<div align="left" >';
                     profile += "Firstname : "+datapatient.firstname + "<br>";
                     profile += "Lastname : "+datapatient.lastname + "<br>";
                     profile += "Nickname : "+datapatient.nickname + "<br>";
                     profile += "Birthday : "+weekday[d.getDay()]+" "+d.getDate()+" "+month_name[d.getMonth()] +" "+d.getFullYear()+ "<br>";
                     profile += "Age : "+age + "<br>";
                     profile += "Gender : "+datapatient.sex + "<br>";
                     profile +='<a href="listheartratebydoctor.do?id=${pat.patientId}&&doctorid=${doctorId}">View detail Data</a>';
                     profile += '</div>';
                     profile +=	'<br class="clr" />';
                     profile += 	'</div>';
                     profile += 	'</div>';
                     profile += 	'<hr class="soft" />';
                     profile += '<br>';
                  document.querySelector("tagprofile").innerHTML += profile;
           
                 });
                      }
                    });
                }
               }else{
                location.reload();
              }
            }); 
          }); 
        });
      }else{
          window.location.assign("login_adhd");
      }
    });
  }

function logout(){
    firebase.auth().signOut(); 
    location.reload();
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
  
  