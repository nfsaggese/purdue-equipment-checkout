/////////////////////////////////ACTIONS

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

///////////////////////REGISTER
function adminActionsRegisterView(){
  $('[actionsNav="register"]').attr({"class":"page-navigation-tab-active"});
  var actionsRegisterScript = $('#admin-actions-register-template').html();
  var actionsRegisterTemplate = Handlebars.compile(actionsRegisterScript);
  $('#pageBody').html(actionsRegisterTemplate);
  $('#newItem').submit(function(event){
    event.preventDefault();
    var equipment_name = $('input[name="EQUIPMENT_NAME"]').val();
    var equipment_brand = $('input[name="EQUIPMENT_BRAND"]').val();
    var equipment_type = $('input[name="EQUIPMENT_TYPE"]').val();
    var equipment_description = $('input[name="EQUIPMENT_DESCRIPTION"]').val();
    var url = root + "/createNewItem" + "?" + "EQUIPMENT_NAME=" + equipment_name + "&EQUIPMENT_BRAND="+equipment_brand+"&EQUIPMENT_TYPE=" +equipment_type + "&EQUIPMENT_DESCRIPTION="+equipment_description;
    $.get(url,refreshAdminActionsRegisterView());
  });

  function refreshAdminActionsRegisterView(){
    alert("New Item Added to the Database!");
    adminActionsRegisterView();
  }
}

///////////////////////RETIRE
function adminActionsRetireView(){
  $('[actionsNav="retire"]').attr({"class":"page-navigation-tab-active"});
  var actionsRetireScript = $('#admin-actions-retire-template').html();
  var actionsRetireTemplate = Handlebars.compile(actionsRetireScript);
  $('#pageBody').html(actionsRetireTemplate);
  $('#retireItem').submit(function(event){
    event.preventDefault();
    var equipment_unique_id = $('input[name="EQUIPMENT_UNIQUE_ID"]').val();
    var data = {"EQUIPMENT_UNIQUE_ID":equipment_unique_id,};
    data = JSON.stringify();//ready for more secure post
    var url = root + "/retireItem?" + "EQUIPMENT_UNIQUE_ID=" + equipment_unique_id;
    $.post(url, refreshAdminActionsRetireView(data,status));
  });

  function refreshAdminActionsRetireView(data,status){

    alert("Retired Item from Service " + status);
    adminActionsRetireView();
  }
}

/////////////////////INVENTORY
function defaultAdminInventoryView(){}//TODO

//////////////////////USERS
function defaultAdminUsersView(){}//TODO

/////////////////////PROFILE
function defaultAdminProfileView(){}//TODO