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
}
