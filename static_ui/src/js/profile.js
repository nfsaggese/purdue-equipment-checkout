var password;
var isAdmin;
function getData(){
  var theUrl = "http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/getUserInfo";
  $.ajax({
    method: 'GET',
    url: theUrl,
    xhrFields: { withCredentials: true },
    crossDomain: true,
    success: function(data){
      console.log(data);
      var firstname=JSON.parse(data).rows[0].users_firstname;
      var lastname=JSON.parse(data).rows[0].users_lastname;
      var phone=JSON.parse(data).rows[0].users_phone;
      var email=JSON.parse(data).rows[0].users_email;
      password = JSON.parse(data).rows[0].users_password;
      isAdmin = JSON.parse(data).rows[0].users_isadmin;
      document.getElementById("fname").value = firstname;
      document.getElementById("lname").value = lastname;
      document.getElementById("phone").value = phone;
      document.getElementById("email").value = email;
    },
    error: function(){
      alert("Data not retrieved.");
    }
  });
}
function submitChange(){
  var theUrl = "http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/updateUser?USERS_FIRSTNAME="
  + document.getElementById("fname").value + "&USERS_LASTNAME=" + document.getElementById("lname").value +
  "&USERS_EMAIL=" + document.getElementById("email").value + "&USERS_PHONE=" + document.getElementById("phone").value +
  "&USERS_PASSWORD=" + password;
  $.ajax({
    method: 'GET',
    url: theUrl,
    xhrFields: { withCredentials: true },
    crossDomain: true,
    success: function(data){
      alert("Your profile information was successfully updated.");
    },
    error: function(){
      alert("Unable to update information, server may be down.");
    }
  });
}

function cancel{
  if(isAdmin === true){
      window.location = "admin.html";
  }else{
      window.location = "user.html";
  }
}

$(document).ready(function(){
  //console.log("Ready!");
  getData();
  $('#submit').click(function(){
    //console.log("called");
    submitChange();
  });
  $('#cancel').click(function(){
    //console.log("called");
    cancel();
  });
});
