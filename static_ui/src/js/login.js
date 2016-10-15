
function submitLogin(){
  var theUrl = "http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/loginUser?USERS_EMAIL="+document.getElementById("email").value+"&USERS_PASSWORD="+document.getElementById("password").value;

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
