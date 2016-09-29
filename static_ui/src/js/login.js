
function submitLogin(){
  var theUrl = "http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/loginUser?USERS_EMAIL="+document.getElementById("username").value+"&USERS_PASSWORD="+document.getElementById("password").value;

  $.get(theUrl, function(data){//getDevices from the server
    console.log(data);
    var info = JSON.parse(data);
    number = info['rows'];
    if(number.length == 1){
      sessionStorage.setItem("email", document.getElementById("email").value);
      window.location = "index.html";
    }
    else{

    }
  });
}

$(document).ready(function(){
  $('#submit').click(function(){
    console.log("called");
    submitLogin();
  });
});
