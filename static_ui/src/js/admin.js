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
function defaultAdminInventoryView(){//done
  adminInventoryView();
}

//////////////////////USERS
function defaultAdminUsersView(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", root+'/getAllUsers', true);
    xhttp.onload = function(e){displayAllUsers(xhttp.responseText)};
    xhttp.withCredentials = true;
    xhttp.send(null);
}
function displayAllUsers(data){
  clearBottom();
  var adminUsersTemplate = Handlebars.compile($('#admin-users-template').html());
  $('#pageBody').html(adminUsersTemplate);
  //built container now need rows
  var users = data['rows'];
  var adminUserIndividualTemplate = Handlebars.compile($('#admin-users-individual-template').html());

  for(var i = 0; i < users.length; i++){
    var context = {
      id: users[i]['users_unique_id'],
      email: users[i]['users_email'],
      first: users[i]['users_firstname'],
      last: users[i]['users_lastname'],
      admin: users[i]['users_isadmin'],
    }
    $('#containerTarget').append(adminUserIndividualTemplate(context));
  }
  //view details listener //maybe need seperate thing for admins
  $('div[fieldcontent="viewdetails"]').click(getUserLog($(this).parent().attr("userid")));
}
/////////////////////PROFILE
function defaultAdminProfileView(){}//TODO
