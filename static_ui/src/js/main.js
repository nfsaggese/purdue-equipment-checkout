var root = 'http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080';

//todo create back and forwards variables stacks with closures to store prior and future views

//init
$(document).ready(function() {
    var currentPage = window.location.pathname;
    console.log(currentPage);
    if((currentPage == '/') || (currentPage == '/index.html')){
      console.log('getting here');
      userGlobalNav();
    }else{
      console.log('getting here');
      adminGlobalNav();
    }
});
