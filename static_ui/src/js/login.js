
function submitLogin(){
  var theUrl = "http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/loginUser?USERS_EMAIL="+document.getElementById("email").value+"&USERS_PASSWORD="+document.getElementById("password").value;

  $.ajax({
    method: 'GET',
    url: theUrl,
    xhrFields: { withCredentials: true },
    crossDomain: true,
    success: function(data){
      console.log(data);
      var isAdmin=JSON.parse(data).rows[0].users_isadmin;
      if(isAdmin === true){
          window.location = "admin.html";
      }else{
          window.location = "user.html";
      }
    },
    error: function(){
      alert("Email and password combination incorrect.");
    }
  });
}

$(document).ready(function(){
  $('#submit').click(function(){
    console.log("called");
    submitLogin();
  });
});
