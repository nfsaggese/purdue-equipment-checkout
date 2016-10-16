
function submitLogin(){
  var theUrl = "http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/createUser?USERS_FIRSTNAME="
  + document.getElementById("first name").value + "&USERS_LASTNAME=" + document.getElementById("last name").value +
  "&USERS_EMAIL=" + document.getElementById("email").value + "&USERS_USERNAME" + document.getElementById("email").value+
  "&USERS_PASSWORD="+document.getElementById("password").value + "&USERS_ISADMIN=false";

  $.ajax({
    method: 'GET',
    url: theUrl,
    xhrFields: { withCredentials: true },
    crossDomain: true,
    success: function(data){
      console.log(data);
      window.location = "index.html";
    },
    error: function(){
      console.log("Error");
    }
  });
}

$(document).ready(function(){
  $('#submit').click(function(){
    console.log("called");
    submitLogin();
  });
});
