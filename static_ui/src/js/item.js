function getSingleItem(id){
  var params = "?EQUIPMENT_UNIQUE_ID=" + id;//add id to params ilst for get request
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root + '/getSingleItem' + params, true);
  xhttp.onload = function(e){displayItem(xhttp.responseText)};
  xhttp.withCredentials = true;
  xhttp.send(null);//dmin.htmlonly in use on post requests
}

function getItemHistory(id){//TODO WORKING ON THIS
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/getDeviceLog'+'?deviceID='+id, true);
  xhttp.onload = function(e){displayItemHistory(xhttp.responseText,id)};
  xhttp.withCredentials = true;
  xhttp.send(null);
}
function displayItemHistory(data,id){
    data = JSON.parse(data);
    console.log(data);
    var log = data['rows'];
    console.log(log);
    console.log(typeof(log));
    clearBottom();
    if(log.length == 0){
       $('#pageBody').html('<h3>Device ID: ' + String(id) + '</h3></br><i>This item has no history.</i>');
       return;
    }
    var adminEquipmentContainerLogTemplate = Handlebars.compile($('#admin-equipment-container-log-template').html());
    var adminEquipmentLog = Handlebars.compile($('#admin-equipment-log-template').html());
    $('#pageBody').html(adminEquipmentContainerLogTemplate);
    for(var i = 0; i < log.length; i++){
      var context = {
        userid: log[i]['log_userid'],
        date: log[i]['log_entrydate'],
        condition: log[i]['log_equipmentcondition'],
        outin: log[i]['log_ischeckingout'],
      }//close context

      $('#containerTarget').append(adminEquipmentLog(context));
      $('#containerTarget').prepend('<h3>Device ID: ' + String(id) + '</h3>');
    }//close for

function displayItem(data){
  console.log('display item');
  clearBottom();
  var item = JSON.parse(data);
  item = item['rows'][0];
  console.log(item);
  //template operations
  var viewItemDetailsScript = $('#view-item-details-template').html();
  var viewItemDetailsTemplate = Handlebars.compile(viewItemDetailsScript);

  //building context to render
  var canCheckOut = "False";
  var checkOut = "Not Available";
  var checkOutStyle = "action-button";
  function stock(item){
    if(!item['equipment_ischeckedout']){
      canCheckOut = "True";
      checkOut = "Check Out";
      checkOutStyle = "action-button";
      return "In Stock";
    }else{
      checkOut = "Not Available";
      canCheckOut = "False";
      checkOutStyle = "bad-action-button";
      return "Out of Stock";
    }
  }//close stock
  function inService(item){
    if(item['equipment_isactive']){
      return "In Service";
    }else{
      checkOut = "Not Available";
      canCheckOut = "False";
      return "Retired";
    }
  }//close inService()

  var context = {
    name: item['equipment_name'],
    type: item['equipment_type'],
    brand: item['equipment_brand'],
    description: item['equipment_description'],
    stock: stock(item),
    inService: inService(item),
    itemID: item['equipment_unique_id'],
    canCheckOut: canCheckOut,
    checkOut: checkOut,
    checkOutStyle: checkOutStyle,
  };//close contex
  var viewItemDetailsHTML = viewItemDetailsTemplate(context);
  $("#pageBody").html(viewItemDetailsHTML);

  $(document).on("click","div[canCheckOut='True']",function(){
    var id = $(this).attr("itemID");
    checkOutItem(id);
  });
}//close displayItem()

function checkOutItem(id){
  console.log('running check out item')
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/checkOutItem'+'?EQUIPMENT_ID='+id, true);
  xhttp.onload = function(e){afterCheckout(xhttp.responseText,id)};
  xhttp.withCredentials = true;
  xhttp.send(null);
}
var afterCheckout = function postCheckOut(data,id){
  console.log("Check Out Response" + String(data));
  alert('Item checked out.');
  getSingleItem(id);
}
