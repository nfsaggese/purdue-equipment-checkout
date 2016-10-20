var root = 'http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080';
//todo create back and forwards variables stacks with closures to store prior and future views

//init
$(document).ready(function() {
    var currentPage = window.location.pathname;
    console.log(currentPage);
    if((currentPage == '/') || (currentPage == '/user.html')){
      console.log('getting here');
      userGlobalNav();
    }else{
      console.log('getting here');
      adminGlobalNav();
    }
});

/* todo

- Checkout items in user
  --no response integrated
-view item history from admin inventory views
  -- still isn't working, route is down //view still needs to be built once json is available
-user/admin profile integration
-check for valid cookie else redirect
-admin users view -> view user history
  --tabular view done...individual user view still needs to be finished.

*/
