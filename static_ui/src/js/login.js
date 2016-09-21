$(document).ready(function(){
  function index_submit(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    var theUrl = "ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/loginUser?USERS_USERNAME="+document.getElementById("email").value+"&USERS_PASSWORD="+document.getElementById("password").value;
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send();
  }
});
