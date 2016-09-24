$.getScript("./js/helper.js", function(){
  console.log("Helper Loaded.")
});
$.getScript("./js/inventory.js", function(){
  console.log("inventory Loaded.")
});
$.getScript("./js/item.js", function(){
  console.log("item js loaded");
});
$.getScript("./js/globalNav.js", function(){
  console.log("global nav js loaded");
});
var root = 'http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080'
//todo create back and forwards variables stacks with closures to store prior and future views

function defaultActionsView(){
  adminActionsPageNav();
  adminActionsRegisterView();
}

function adminActionsPageNav(){
  var actionsPageNavigationScript = $('#admin-actions-page-navigation-template').html();
  var actionsPageNavigationTemplate = Handlebars.compile(actionsPageNavigationScript);
  $('#pageNavigation').html(actionsPageNavigationTemplate);
  $('[actionsNav="register"]').click(function(){
    $('.page-navigation-tab-active').attr({"class":"page-navigation-tab"});
    $('[actionsNav="register"]').attr({"class":"page-navigation-tab-active"});
    adminActionsRegisterView();
  });
  $('[actionsNav="retire"]').click(function(){
    $('.page-navigation-tab-active').attr({"class":"page-navigation-tab"});
    $('[actionsNav="retire"]').attr({"class":"page-navigation-tab-active"});
    adminActionsRetireView();
  });
}

function adminActionsRegisterView(){
  $('[actionsNav="register"]').attr({"class":"page-navigation-tab-active"});
  var actionsRegisterScript = $('#admin-actions-register-template').html();
  var actionsRegisterTemplate = Handlebars.compile(actionsRegisterScript);
  var context = {
    target: root + '/createNewItem',
  };
  $('#pageBody').html(actionsRegisterTemplate(context));

  $('#newItem').on("submit", processRegisterForm(e));

  function processRegisterForm(e){
    preventDefault();
    alert(e);
  }
}

//init
$(document).ready(function(){
  userGlobalNav();
});
