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
          typeuser.on('value',userdoctor=> {
             var doctor = userdoctor.val();
             if(doctor.who=="doctor"){
              var searchall = document.getElementById('searchall').value;
              if(searchall =='' ){
               const  dataprofile = firebase.database().ref('datadoctor/'+doctor.id);           
               dataprofile.on('value', doctor=>{    
                   var datadoctor = doctor.val(); 
                   var fb =datadoctor.birthday;
                   var d = new Date(fb);
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
                   profile += "Firstname : "+datadoctor.firstname + "<br>";
                   profile += "Lastname : "+datadoctor.lastname + "<br>";
                   profile += "Department : "+datadoctor.department + "<br>";
                   profile += "Birthday : "+weekday[d.getDay()]+" "+d.getDate()+" "+month_name[d.getMonth()] +" "+d.getFullYear()+ "<br>";
                   profile += "Age : "+age + "<br>";
                   profile += "Telephone : "+datadoctor.Telephone + "<br>";
                   profile += '<a class="btn btn-large btn-primary" href="javascript:view('+doctor.key+');">';
                   profile +=	"View Case";
                   profile +=	'</a>';
                   profile +=	'<a class="btn btn-large btn-primary" href="javascript:edit('+doctor.key+');">';
                   profile +=		"EDIT"; 
                   profile +=	'</a>';
                   profile +='<a href="javascript:deleteDoctor('+doctor.key+');" class="btn btn-info">';
                   profile += "DELETE";
                   profile += '</a>';
                   profile += '</div>';
                   profile +=	'<br class="clr"/>';
                   profile += '</div>';
                   profile += '</div>';
                   profile += '<hr class="soft"/>';
                   profile += '<br>';
                document.querySelector("tagprofile").innerHTML += profile ;
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
  $("#loader").show();
  const type = firebase.database().ref('alluser').orderByChild('id');
      type.once('value',typesu=> {
        typesu.forEach(u=>{
          const typeuser= firebase.database().ref().child('alluser/'+u.key);
          typeuser.on('value',userdoctor=> {
             var k = userdoctor.val();
             var searchall = document.getElementById('searchall').value;
             const  sall = firebase.database().ref().child('datadoctor/'+k.id).orderByValue().equalTo(searchall);
             if(k.who=="doctor"){
              if(searchall!=null){
                  sall.on('value', pp=>{  
                    if(pp.val()!=null){
                      const  datadoctor = firebase.database().ref('datadoctor/'+pp.key);              
                   datadoctor.on('value', doctor=>{    
                   var datadoctor = doctor.val(); 
                   var fd =datadoctor.birthday;
                   var d = new Date(fd);
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
                   profile += "Firstname : "+datadoctor.firstname + "<br>";
                   profile += "Lastname : "+datadoctor.lastname + "<br>";
                   profile += "Department : "+datadoctor.department + "<br>";
                   profile += "Birthday : "+weekday[d.getDay()]+" "+d.getDate()+" "+month_name[d.getMonth()] +" "+d.getFullYear()+ "<br>";
                   profile += "Age : "+age + "<br>";
                   profile += "Telephone : "+datadoctor.Telephone + "<br>";
                   profile += '<a class="btn btn-large btn-primary" href="javascript:view('+doctor.key+');">';
                   profile +=	"View Case";
                   profile +=	'</a>';
                   profile +=	'<a class="btn btn-large btn-primary" href="javascript:edit('+doctor.key+');">';
                   profile +=	"EDIT"; 
                   profile +=	'</a>';
                   profile += '<a href="javascript:deleteDoctor('+doctor.key+');" class="btn btn-info">';
                   profile += "DELETE";
                   profile += '</a>';
                   profile += '</div>';
                   profile +=	'<br class="clr" />';
                   profile += '</div>';
                   profile += '</div>';
                   profile += '<hr class="soft" />';
                   profile += '<br>';
                    document.querySelector("tagprofile").innerHTML += profile;
                    $("#loader").hide();
                    });
                    }
                  });
              }
             }
          }); 
        }); 
      });
}

function view(doctorkey){
  console.log("test============>",doctorkey);
  document.querySelector("#dataview").innerHTML = '';
  document.querySelector("#demo").innerHTML = '';
  $("#viewcase").modal();
  $('#ts').css( 'display', 'none' );
      const typeuser= firebase.database().ref().child('case/'+doctorkey);
       typeuser.on('value',userpatient=> {

        if(userpatient.val() !=null){
          for (i = 0; i < userpatient.val().length; i++) {
          const  dataprofile = firebase.database().ref('dataprofile/'+userpatient.val()[i]);    
          dataprofile.on('value', patient=>{    
              var datapatient = patient.val(); 
              var d = new Date(datapatient.birthday);
              var month_name= ["January","February","March","April","May","June","July","August","September","October","November","December"];
              var weekday = [ "Sunday","Monday", "Tuesday","Wednesday", "Thursday" ,"Friday","Saturday"];
              var db = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
              var age = calculateAge(parseDate(db), new Date());
              var profile = "";
              profile +=  '<tr>';
              profile +=  '<td>'+patient.key+'</td>';
              profile += ' <td>'+datapatient.firstname + '</td>';
              profile += '<td>'+datapatient.lastname + '</td>';
              profile += '<td><a href="listheartratebydoctor.do?id=${pt.patient.patientId}&&doctorid=${doctorId}">View</a></td>';
              profile += '</tr>';
             document.querySelector("#dataview").innerHTML += profile;
             $('#ts').css( 'display', 'block' );
          });
      }
            }else {
              document.getElementById("demo").innerHTML = "No Case And Patient";
              $('#ts').css( 'display', 'none' );
            }
          });
}


function edit(doctorkey){
  $("#myModal").modal();
  const  doctorall = firebase.database().ref().child('datadoctor/'+doctorkey);
  doctorall.on('value',value=>{
    document.querySelector("#id").value = value.key;
    document.querySelector("#firstname").value = value.val().firstname;
    document.querySelector("#lastname").value = value.val().lastname;
    document.querySelector("#birthday").value = value.val().birthday;
    document.querySelector("#Telephone").value = value.val().Telephone;
    document.querySelector("#department").value = value.val().department;
  });
 }

 function newdoctor(){
  $("#newdoc").modal();
  $('#newdocbtn').on('click', function(){
   var fi =  $("#emaildoc").val();
   var pass = $("#newpassword").val();
   var passv = $("#checkpasswordv").val();
   var y = (new Date().getFullYear()+543).toString().substr(-2);
   var m =new Date().getMonth().toString().substr(-2);
   
   var iddoc = y+""+m+""+Math.floor( Math.random()*999 ) + 100 ;
    if(pass==passv && fi !=null){
    firebase.auth().createUserWithEmailAndPassword(fi, pass).then(function(user){
    
    user.uid = firebase.database().ref().child('alluser').push().key;
    var data ={
        id :  iddoc  ,
        who : "doctor"
    }

    var updates = {};
    updates['/alluser/'+user.uid] =data;
    firebase.database().ref().update(updates);
    newda(iddoc);
   
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

 function newda(iddoc){
  $('#newdoc').on('hidden.bs.modal', function (e) {
    $(this).find("input,textarea,select").val('').end()
      .find("input[type=checkbox], input[type=radio]")
         .prop("checked", "")
         .end();
  });
  $("#information").modal();
  $('#newdoc').css( 'display', 'none' );
  $('#savenewdocbtn').on('click', function(){
    var datainf ={
      firstname :  document.querySelector("#firstnamenew").value ,
      lastname : document.querySelector("#lastnamenew").value ,
      birthday : document.querySelector("#birthdaynew").value ,
      Telephone :  document.querySelector("#Telephonenew").value,
      department :  document.querySelector("#departmentnew").value
    }
  
  var updates = {};
  updates['/datadoctor/'+iddoc] =datainf;
  firebase.database().ref().update(updates);
  
  alert("The profile will be add.");
  location.reload();
  });
}

function deleteDoctor(doctorid) {
  const type = firebase.database().ref('alluser').orderByChild('id');
  type.once('value',typesu=> {
    typesu.forEach(u=>{
      const userdr = firebase.database().ref().child('alluser/'+u.key);
      userdr.on('value',perdoc=> {
        if(perdoc.val().id==doctorid.toString()){
          var  datadr = firebase.database().ref().child('datadoctor/'+doctorid);
          datadr.remove().then(function(){
            firebase.database().ref().child('case/'+doctorid).remove();
            firebase.database().ref().child('alluser/'+perdoc.key).remove();
            alert("The data doctor will  remove success.");
            location.reload();
            console.log("REMOVE SUCCESS.");
          }).catch(function(error){
            console.log("ERROR MESSAGE",error.message);
          });
        }
      });
    });
  });
 }

//convert the date string in the format of dd/mm/yyyy into a JS date object
function parseDate(dateStr) {
  var dateParts = dateStr.split("/");
  return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
}

//is valid date format
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

function bhome(){
  window.location.assign("home_admin");
 }

function isDate(txtDate) {
  var currVal = txtDate;
  if (currVal == '')
    return true;
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

function addCase() {
  $("#caseModal").modal();
}

function saveChanges(){
  $('#myModal').hide();
  var data ={
      firstname :  document.querySelector("#firstname").value ,
      lastname : document.querySelector("#lastname").value ,
      birthday : document.querySelector("#birthday").value ,
      Telephone :  document.querySelector("#Telephone").value,
      department :  document.querySelector("#department").value
  }

  var updates = {};
  updates['/datadoctor/'+document.querySelector("#id").value] =data;
  firebase.database().ref().update(updates);
 
  alert("The profile will be  change.");
  document.getElementById('searchall').value =  document.querySelector("#firstname").value;
  finddata();
}

