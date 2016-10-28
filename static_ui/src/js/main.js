var root = 'http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080';
//todo create back and forwards variables stacks with closures to store prior and future views

//init
$(document).ready(function() {
    var currentPage = window.location.pathname;
    console.log(currentPage);
    checkCookie();
    if(currentPage == '/user.html'){
      console.log('getting here');
      userGlobalNav();
      var showing = function(){
        var id = $(this).parent().attr("itemID");
        getSingleItem(id);
      };
      var checkout = function(){
        console.log('click listener for checkout fired');
        var id = $(this).parent().attr("itemID");
        checkOutItem(id);
      };

      var checkinlisten = function(){
        var id = $(this).attr("itemID");
        checkin(id);
      };

      $(document).on("click",".inventoryItemTitle, .inventoryItemDetails",showing);
      //$(".inventoryItemCheckOut").unbind();
      $(document).on("click",".inventoryItemCheckOut",checkout);
      $(document).on("click",'div[button="checkin"]',checkinlisten);
    }else{
      if(currentPage == '/admin.html'){
        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var xxhttp = new XMLHttpRequest();
        xxhttp.open("GET", root+'/getUserAdminLog?USERID=1', true);
          xxhttp.onload = function (e){
            console.log(xxhttp.responseText);
            console.log(e);
            if(xxhttp.responseText === "invalid cookie"){
              window.location = "user.html";
            }
          };
      }
      console.log('getting here');
      adminGlobalNav();
      //trigger to item details page
      $(document).on("click",".inventoryItemTitle, .inventoryItemDetails", function(){
        var id = $(this).parent().attr("itemID");
        getItemHistory(id);
      });
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
    window.location.assign('index.html');
  }
}
/* todo

- Checkout items in user
  --no response integrated--DONE
  --fixed multi checkout bug
-view item history from admin inventory views
  -- still isn't working, route is down //view still needs to be built once json is available --done
-user/admin profile integration
-check for valid cookie else redirect
--done
--checkin item
---waiting on route for items a user curerntly has out
  --working
-admin users view -> view user history
  --tabular view done...individual user view still needs to be finished.-->FINISHED

*/
