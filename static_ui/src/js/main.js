var inventoryTabs = '<div class="page-navigation-wrapper">\
  <div class="container">\
    <nav class="page-navigation full-width">\
      <div id="all-inventory" class="page-navigation-tab">ALL</div>\
      <div id="available-inventory" class="page-navigation-tab">AVAILABLE</div>\
    </nav>\
  </div>\
<div>';

var root = 'http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080'
function getAllInventory(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/getAllDevices', true);
  xhttp.onload = function(e){displayInventory(xhttp.responseText)};
  xhttp.send(null);
};

function getAvailableInventory(){};

function displayInventory(data){//takes inventory from the api and renders to screen
  var inventory = JSON.parse(data);
  inventory = inventory['rows'];

  $("#pageBody").html('<div id="inventoryContainer" class="container"></div>');
  var rowTemplateScript = $('#inventory-row-template').html();//gets row template from index.html
  var rowTemplate = Handlebars.compile(rowTemplateScript);
  var inventoryItemTemplateScript = $('#inventory-item-template').html();
  var inventoryItemTemplate = Handlebars.compile(inventoryItemTemplateScript);

  var rowID = 0;
  var itemAppendTarget = "";
  for(var i = 0; i < inventory.length; i++){
    //console.log("we get in here");
    if(i == 0){//If its the first row we want to insert inside of our container
      var row = "inventoryRow" + rowID.toString();
      itemAppendTarget = "#" + row; //the row where items are appended
      var context = {"id": row};
      var rowTemplateHTML = rowTemplate(context);

      //console.log(rowTemplateHTML);
      $("#inventoryContainer").html(rowTemplateHTML);
    } else if((i % 4) == 0){
      console.log("row printed")
      //Determining Row ID to attach to and new one to insert
      var oldRow = "#inventoryRow" + rowID.toString();
      console.log(oldRow);
      rowID++;
      var newRow = "inventoryRow" + rowID.toString();
      itemAppendTarget = "#" + newRow; //the row where items are appended
      var context = {"id": newRow};

      var rowTemplateHTML = rowTemplate(context);

      $(oldRow).after(rowTemplateHTML);
    }
    var currentRow = "#inventoryRow" + rowID.toString();
    //define text status
    var availabilityTXT,checkoutTXT,availabilityStyle,checkoutStyle;
    if(inventory[i]["equipment_ischeckedout"] == false){
      availabilityTXT = "Available";
      checkoutTXT = 'Check Out';
      availabilityStyle = "inventoryItemStatusA";
      checkoutStyle = "inventoryItemCheckOut";
    }else{
      availabilityTXT = "Out of Stock";
      checkoutTXT = 'Not Available';
      availabilityStyle = "inventoryItemStatusB";
      checkoutStyle = "inventoryItemOutofStock";
    }
    var context = {
      id: "inventoryItem" + i.toString(),
      item: {
        id:inventory[i]["equipment_unique_id"],
        title:inventory[i]["equipment_name"],
      },
      availability: {
        text:availabilityTXT,
        style:availabilityStyle,
      },
      checkout: {
        text:checkoutTXT,
        style:checkoutStyle,
      }
    };
    var inventoryItemHTML = inventoryItemTemplate(context);
    if(itemAppendTarget.startsWith("#inventoryRow")){
      $(itemAppendTarget).append(inventoryItemHTML);//if our previous element was a row we need to append to place html inside it
    }else{
      $(itemAppendTarget).after(inventoryItemHTML);//previous element inserted was a item, thus use after to place element same level
    }//close else
    itemAppendTarget = "#inventoryItem" + i.toString();
  }//close for loop
}//close displayInventory()

$(document).ready(function(){
  //default content
  $('#pageNavigation').html(inventoryTabs);
  //Swap Inventory Tabs
  $('#all-inventory').click(function(){
    $('#pageBody').html(getAllInventory());
  });
  $('#available-inventory').click(function(){
    $('#pageBody').html(getAvailableInventory());
  });
});
