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
      const type = firebase.database().ref('alluser').orderByChild('id');
      $("#loader").show();
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
                   profile +=  '<div class="col-lg-1" align="center" style="height:50%; width:50%;">';
									 profile += '<img src="img/people.png" alt="" style="height:100px; width:100px;"/>';
                   profile += '</div>';
                   profile += '<br>';
                   profile += '<div class="col-lg-2" align="right"  style="height:50%; width:50%;">';
                   profile += '<div align="left" >';
                   profile += "Firstname : "+datapatient.firstname + "<br>";
                   profile += "Lastname : "+datapatient.lastname + "<br>";
                   profile += "Nickname : "+datapatient.nickname + "<br>";
                   profile += "Birthday : "+weekday[d.getDay()]+" "+d.getDate()+" "+month_name[d.getMonth()] +" "+d.getFullYear()+ "<br>";
                   profile += "Age : "+age + "<br>";
                   profile += "Gender : "+datapatient.sex + "<br>";
                   profile += '<a class="btn btn-large btn-primary"  data-target="#viewdpate" data-toggle="modal" >';
                   profile +=	"View Data";
                   profile +=	'</a>';
                   profile +=	'<input type="hidden" id="patientkeye" value="'+patient.key+'">';
                   profile +=	'<a class="btn btn-large btn-primary" href="javascript:edit();">';
                   profile +=	"EDIT"; 
                   profile +=	'</a>';
                   profile += '<a href="deletePatient.do?id=${pat.patientId}&caseid=${pat.patientId}" class="btn btn-info">';
                   profile += "DELETE";
                   profile += '</a>';
                   profile += '</div>';
                   profile +=	'<br class="clr" />';
                   profile += '</div>';
                   profile += '</div>';
                   profile += '<hr class="soft" />';
                   profile += '<br>';
                document.querySelector("tagprofile").innerHTML += profile;
                viewpid();
                $("#loader").hide();
               });
              }else{
                finddata();
              }
              }
          }); 
        });
      });
})();

function finddata() {
  document.querySelector("tagprofile").innerHTML = '';
  const type = firebase.database().ref('alluser').orderByChild('id');
      type.once('value',typesu=> {
        typesu.forEach(u=>{
          const typeuser= firebase.database().ref().child('alluser/'+u.key);
          typeuser.on('value',userpatient=> {
             var k = userpatient.val();
             var searchall = document.getElementById('searchall').value;
             const  sall = firebase.database().ref().child('dataprofile/'+k.id).orderByValue().equalTo(searchall);
             if(k.who=="parent"){
              if(searchall!=null){
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
                   profile += '<div class="row">';
                   profile += '<div class="col-lg-1" align="center" style="height:50%; width:50%;">';
									 profile += '<img src="img/people.png" alt="" style="height:100px; width:100px;"/>';
                   profile += '</div>';
                   profile += '<br>';
                   profile += '<div class="col-lg-2" align="right"  style="height:50%; width:50%;">';
                   profile += '<div align="left" >';
                   profile += "Firstname : "+datapatient.firstname + "<br>";
                   profile += "Lastname : "+datapatient.lastname + "<br>";
                   profile += "Nickname : "+datapatient.nickname + "<br>";
                   profile += "Birthday : "+weekday[d.getDay()]+" "+d.getDate()+" "+month_name[d.getMonth()] +" "+d.getFullYear()+ "<br>";
                   profile += "Age : "+age + "<br>";
                   profile += "Gender : "+datapatient.sex + "<br>";
                   profile += '<a class="btn btn-large btn-primary"  data-target="#viewdpate" data-toggle="modal" >';
                   profile +=	"View Data";
                   profile +=	'</a>'; 
                   profile +=	'<input type="hidden" id="patientkeye" value="'+patient.key+'">';
                   profile +=	'<a class="btn btn-large btn-primary" href="javascript:edit();"  >';
                   profile +=	"EDIT"; 
                   profile +=	'</a>';
                   profile += '<a href="deletePatient.do?id=${pat.patientId}&caseid=${pat.patientId}" class="btn btn-info">';
                   profile += "DELETE";
                   profile += '</a>';
                   profile += '</div>';
                   profile +=	'<br class="clr" />';
                   profile += '</div>';
                   profile += '</div>';
                   profile += '<hr class="soft" />';
                   profile += '<br>';
                document.querySelector("tagprofile").innerHTML += profile;
               });
                    }
                  });
              }
             }
          }); 
        }); 
      });
}
function edit(){
  $("#editmyModal").modal();
  var patientkeyi = document.querySelector("#patientkeye").value;
  const  patientall = firebase.database().ref('dataprofile').child(patientkeyi);
  patientall.on('value',patient=>{
    document.querySelector("#firstname").value= patient.val().firstname;
    document.querySelector("#lastname").value= patient.val().lastname;
    document.querySelector("#weight").value = patient.val().weight;
    document.querySelector("#height").value = patient.val().high;
  });
 
 }
  function parseDate(dateStr) {
    var dateParts = dateStr.split("/");
    return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
  }
  function bhome(){
    window.location.assign("home_admin");
  }

 function newPatient(){
  $("#newpatient").modal();
  $('#newpatbtn').on('click', function(){
    var fi =  $("#emaildoc").val();
    var pass = $("#newpassword").val();
    var passv = $("#checkpasswordv").val();
    var fullYear = new Date();
    var y = (new Date().getFullYear()+543).toString().substr(-2);
    var m =new Date().getMonth().toString().substr(-2);
    var patuid = "P"+m+""+fullYear.getFullYear()+""+Math.floor( Math.random()*999 ) + 100 ;
     if(pass==passv && fi !=null){
     firebase.auth().createUserWithEmailAndPassword(fi, pass).then(function(user){
     user.uid = firebase.database().ref().child('alluser').push().key;
     var data ={
         id :  patuid  ,
         who : "parent"
     }
 
     var updates = {};
     updates['/alluser/'+user.uid] =data;
     firebase.database().ref().update(updates);
     newpat(patuid);
    
     }).catch(function(error) {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log("Error=====>",errorCode);
     });
    }else{
     alert('Password not correct...');
    }
   });
 }
 function newpat(idpatuid){
  $('#newpatient').modal('hide');
  console.log("Error=====>",idpatuid);
  $('#Signup').on('click', function(){
    datainf(idpatuid);
  });
 }

  function viewpid(){
    var pid = document.querySelector("#patientkeye").value;;
    const  patientpid = firebase.database().ref('dataprofile').child(pid);
    const  faall = firebase.database().ref('dataparent/father').child(pid);
    const  mmall = firebase.database().ref('dataparent/mother').child(pid);
    patientpid.on('value',userpatient=> {
      document.querySelector("#upafirstname").value= userpatient.val().firstname;
    document.querySelector("#upalastname").value= userpatient.val().lastname;
    document.querySelector("#upanickname").value = userpatient.val().nickname;
    document.querySelector("#upaweight").value = userpatient.val().weight;
    document.querySelector("#upaheight").value = userpatient.val().high;
    document.querySelector("#upagender").value = userpatient.val().sex;
    });
    faall.on('value',pfa=> {
      document.querySelector("#pfafirstname").value = pfa.val().firstname;
      document.querySelector("#pfalastname").value = pfa.val().lastname;
      document.querySelector("#pfatel").value = pfa.val().telephone;
      document.querySelector("#pfaaddress").value = pfa.val().address.city + "" +pfa.val().address.home +""+pfa.val().address.post +""+ pfa.val().address.country;
     
    });
    mmall.on('value',pmo=> {
      document.querySelector("#pmofirstname").value = pmo.val().firstname;
      document.querySelector("#pmolastname").value = pmo.val().lastname;
      document.querySelector("#pmotel").value = pmo.val().telephone;
      document.querySelector("#pmoaddress").value = pmo.val().address.city + "" +pmo.val().address.home +""+pmo.val().address.post +""+ pmo.val().address.country;
     
    });
  }
  
  function datainf(newidpat){
     var datapatient ={
         firstname :  document.getElementById("firstnameNw").value ,
         lastname : document.getElementById("lastnameNw").value,
         nickname : document.getElementById("nicknameNw").value,
         birthday : document.getElementById("biNw").value,
         high:  document.getElementById("highNw").value,
         weight: document.getElementById("weightNw").value,
         sex: document.getElementById("genNw").value
     }
     var datafather ={
      address : {
        city : document.getElementById("adrciNwfa").value,
        country : document.getElementById("adrcoNwfa").value,
        home : document.getElementById("adrhoNwfa").value,
        post : document.getElementById("adrpoNwfa").value
      },
      firstname : document.getElementById("firstnameNwfa").value,
      lastname : document.getElementById("lastnameNwfa").value,
      telephone : document.getElementById("telNwfa").value
    }
    var datamother ={
      address : {
        city : document.getElementById("adrciNwmo").value,
        country : document.getElementById("adrcoNwmo").value,
        home : document.getElementById("adrhoNwmo").value,
        post : document.getElementById("adrpoNwmo").value
      },
      firstname : document.getElementById("firstnameNwmo").value,
      lastname : document.getElementById("lastnameNwmo").value,
      telephone : document.getElementById("telNwmo").value
    }
     var updates = {};
     updates['/dataprofile/'+newidpat] =datapatient;
     firebase.database().ref().update(updates);
     var updatesfa = {};
     updatesfa['/dataparent/father/'+newidpat] =datafather;
     firebase.database().ref().update(updatesfa);
     var updatesmo = {};
     updatesmo['/dataparent/mother/'+newidpat] =datamother;
     firebase.database().ref().update(updatesmo);
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

  //Checks for dd/mm/yyyy format.
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

