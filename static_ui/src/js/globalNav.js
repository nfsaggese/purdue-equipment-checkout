function defaultUserView(){
  clearBottom();
  defaultInventoryView();
}
function defaultAdminView(){
  clearBottom();
  defaultActionsView();
}
function userGlobalNav(){
  var userGlobalNavigationScript = $("#user-global-navigation-template").html();
  var userGlobalNavigationTemplate = Handlebars.compile(userGlobalNavigationScript);
  $("#globalNavigation").html(userGlobalNavigationTemplate);
  defaultUserView();
  $("[userGlobalNavListener='userInventory']").click(function(){
    console.log('navigating to inventory view');
    defaultInventoryView();
  });
  $("[userGlobalNavListener='userHistory']").click(function(){
    defaultUserHistoryView();//TODO
  });
  $("[userGlobalNavListener='userProfile']").click(function(){
    defaultUserProfileView();
  });
  // $(document).on("click","[userGlobalNavListener='adminSwitch']",function(){
  //   adminGlobalNav();
  // });
}

function adminGlobalNav(){
  var adminGlobalNavigationScript = $("#admin-global-navigation-template").html();
  var adminGlobalNavigationTemplate = Handlebars.compile(adminGlobalNavigationScript);
  $("#globalNavigation").html(adminGlobalNavigationTemplate);
  defaultAdminView();
  // $(document).on("click","[adminGlobalNavListener='userSwitch']",function(){
  //   userGlobalNav();
  // });
  $("[adminGlobalNavlistener='actions']").click(function(){
    defaultActionsView();
  });
  $("[adminGlobalNavlistener='inventory']").click(function(){
    defaultAdminInventoryView();
  });
  $("[adminGlobalNavlistener='users']").click(function(){
    defaultAdminUsersView();
  });
  $("[adminGlobalNavlistener='profile']").click(function(){
    defaultAdminProfileView();
  });
}
