
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
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onload = function(e){refreshAdminActionsRegisterView()};
    xhttp.withCredentials = true;
    xhttp.send(null);
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
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.onload = function(e){refreshAdminActionsRetireView(data,status)};
    xhttp.withCredentials = true;
    xhttp.send(null);
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
  data = JSON.parse(data);
  var users = data['rows'];
  console.log(users);
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
  $(document).on("click",'div[fieldcontent="viewdetails"]',adUsDetails);
}
var adUsDetails = function adminUserDetailsListener(){
  var id = $(this).parent().attr("userid");
  getAdminUserLog(id);
};
function getAdminUserLog(id){//TODO
  //var id = $(selector).parent().attr("userid");
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/getUserAdminLog?USERID='+id, true);
  xhttp.onload = function(e){displayAdminUserLog(xhttp.responseText)};
  xhttp.withCredentials = true;
  xhttp.send(null);
}
function displayAdminUserLog(data){
  clearBottom();
  data = JSON.parse(data);
  var userData = data['rows'];
  if(userData.length == 0){
    $('#pageBody').html('<h1>This item has no history.</h1>');
    return;
  }
  var baseTemplate = Handlebars.compile($('#admin-users-container-log-template').html());
  $('#pageBody').html(baseTemplate);
  var adminUserIndividualTemplate = Handlebars.compile($('#admin-users-log-template').html());

  for(var i = 0; i < userData.length; i++){
    var context = {
      equipid: userData[i]['log_equipmentid'],
      date: userData[i]['log_entrydate'],
      condition: userData[i]['log_equipmentcondition'],
      outin: userData[i]['log_ischeckingout'],
    }
    $('#containerTarget').append(adminUserIndividualTemplate(context));
  }
}
/////////////////////PROFILE
function defaultAdminProfileView(){
  clearBottom();
  $('#pageBody').html('<iframe frameBorder="0" onload="this.width=screen.width;this.height=screen.height"; src="/profile.html"></iframe>');
}
