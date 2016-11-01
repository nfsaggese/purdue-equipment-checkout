/* funtion to check if the user input matching password for signup */

function checkPassword(){
  if(document.getElementById("password").value === document.getElementById("confirm password").value){
    return true;
  }
  else{
    alert("Password does not match.");
    return false;
  }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateNumber(number) {
    return /^[0-9]+$/.test(number);
}

function validateLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}
function checkAllInputs(){
  if(document.getElementById("first name").value === "" || document.getElementById("last name").value === "" ||
  document.getElementById("email").value === "" || document.getElementById("number").value === "" ||
  document.getElementById("password").value === "" || document.getElementById("confirm password").value === ""){
    alert("Invalid field");
    return false;
  }
  else if(!validateEmail(document.getElementById("email").value)){
    alert("Invalid email");
    return false;
  }
  else if(!validateNumber(document.getElementById("number").value)){
    alert("Invalid phone number");
    return false;
  }
  else if(!validateLetters(document.getElementById("first name").value) || !validateLetters(document.getElementById("last name").value)){
    alert("Invalid name");
    return false
  }
  else{
    return true;
  }
}
/*  function to get a response from server when user clicks create account */

function submitLogin(){
  var theUrl = "http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/createUser?USERS_FIRSTNAME="
  + document.getElementById("first name").value + "&USERS_LASTNAME=" + document.getElementById("last name").value +
  "&USERS_EMAIL=" + document.getElementById("email").value + "&USERS_PHONE=" + document.getElementById("number").value +
  "&USERS_USERNAME=" + document.getElementById("email").value+ "&USERS_PASSWORD="+document.getElementById("password").value + "&USERS_ISADMIN=false";

  $.ajax({
    method: 'GET',
    url: theUrl,
    xhrFields: { withCredentials: true },
    crossDomain: true,
    success: function(data){
      console.log(data);
      if(data === "invalid cookie"){
        alert("Email already registered");
      }else{
        alert("Account successfully created, please login!");
        window.location = "index.html";
      }
    },
    error: function(){
      console.log("Error");
    }
  });
}

$(document).ready(function(){
  $('#submit').click(function(){
    console.log("called");
    if(checkPassword() && checkAllInputs()){
      submitLogin();
    }
  });
});
