//USER FUNCTIONS
function defaultUserProfileView(){
  clearBottom();
  $('#pageBody').html('<iframe frameBorder="0" onload="this.width=screen.width;this.height=screen.height"; src="/profile.html"></iframe>');
}
function defaultUserHistoryView(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/getUserLog', true);
  xhttp.onload = function(e){displayUserHistory(xhttp.responseText)};
  xhttp.withCredentials = true;
  xhttp.send(null);
}

function checkin(id){
    var condition = -1;
    while((condition === null)||(condition < 0) || (condition > 10))
      condition = parseInt(prompt("Checking In: Please describe the condition of this item on a scale 1-10.", "10"));
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", root+'/checkInItem?EQUIPMENT_ID='+id+"&LOG_EQUIPMENTCONDITION="+condition, true);
    xhttp.onload = function(e){defaultUserHistoryView()};
    xhttp.withCredentials = true;
    xhttp.send(null)
}

function displayCheckedOutItems(data){
  data = JSON.parse(data);
  data = data['rows'];
  console.log(data);
  var userContainerTemplate = Handlebars.compile($('#user-current-items-head').html());
  var userLogTemplate = Handlebars.compile($('#user-current-items-log').html());
  $('#containerTarget').before(userContainerTemplate);
  for(var i = 0; i < data.length; i++){
    var context = {
      name: data[i]['equipment_name'],
      id: data[i]['equipment_unique_id'],
    }//close context
    $('#containerTarget1').append(userLogTemplate(context));
  }
}
function displayUserHistory(data){
  //console.log(data);
  data = JSON.parse(data);
  // console.log(data);
  data = data['rows'];
  clearBottom();
  if(data.length == 0){
     $('#pageBody').html('<h1>This user has no history.</h1>');
     return;
  }
  var userContainerTemplate = Handlebars.compile($('#user-container-log-template').html());
  var userLogTemplate = Handlebars.compile($('#user-log-template').html());
  $('#pageBody').html(userContainerTemplate);
  for(var i = 0; i < data.length; i++){
    var context = {
      equipment_name: data[i]['equipment_name'],
      date: data[i]['log_entrydate'],
      condition: data[i]['log_equipmentcondition'],
      outin: data[i]['log_ischeckingout'],
    }//close context
    $('#containerTarget').append(userLogTemplate(context));
  }//close for
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", root+'/getCheckedOutItems', true);
  xhttp.onload = function(e){displayCheckedOutItems(xhttp.responseText)};
  xhttp.withCredentials = true;
  xhttp.send(null);
}
