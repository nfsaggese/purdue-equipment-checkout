var root = 'http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080';
var webroot = 'http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com'
//todo create back and forwards variables stacks with closures to store prior and future views

//init
$(document).ready(function() {
    var currentPage = window.location.pathname;
    console.log(currentPage);
    checkCookie();
    if(currentPage == '/user.html'){
      console.log('getting here');
      userGlobalNav();
    }else{
      console.log('getting here');
      adminGlobalNav();
    }
});
function checkCookie(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/validCookie', true);
  xhttp.onload = function(e){evaluateCookie(xhttp.responseText)};
  xhttp.withCredentials = true;
  xhttp.send(null);
}
function evaluateCookie(data){
  data = JSON.parse(data);
  console.log("this is the response to check cookie");
  console.log(data);
  if(data == false){
    window.location.assign(window.location.hostname);
  }
}
/* todo

- Checkout items in user
  --no response integrated--DONE

-view item history from admin inventory views
  -- still isn't working, route is down //view still needs to be built once json is available
-user/admin profile integration
-check for valid cookie else redirect

-admin users view -> view user history
  --tabular view done...individual user view still needs to be finished.-->FINISHED

*/
