//USER FUNCTIONS
function defaultUserProfileView(){}
function defaultUserHistoryView(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/getUserLog', true);
  xhttp.onload = function(e){displayUserHistory(xhttp.responseText)};
  xhttp.withCredentials = true;
  xhttp.send(null);
}
function displayUserHistory(data){
  console.log(data);
  data = JSON.parse(data);
  console.log(data);
}
