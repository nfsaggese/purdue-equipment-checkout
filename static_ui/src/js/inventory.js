//Inventory
function defaultInventoryView(){
  //default content
  console.log('default inventory view');
  clearBottom();
  var inventoryPageNavigationScript = $('#inventory-page-navigation-template').html();
  var inventoryPageNavigationTemplate = Handlebars.compile(inventoryPageNavigationScript);
  $('#pageNavigation').html(inventoryPageNavigationTemplate);
  $('#pageBody').html(getAllInventory());//load all inventory by default
  $('#all-inventory').attr({"class":"page-navigation-tab-active"})
  $('#all-inventory').click(function(){
    $('.page-navigation-tab-active').attr({"class":"page-navigation-tab"});
    $('#all-inventory').attr({"class":"page-navigation-tab-active"});
    $('#pageBody').html(getAllInventory());
  });
  $('#available-inventory').click(function(){
    $('.page-navigation-tab-active').attr({"class":"page-navigation-tab"});
    $('#available-inventory').attr({"class":"page-navigation-tab-active"});
    $('#pageBody').html(getAvailableInventory());
  });
  //trigger to item details page
  var showing = function(){
    var id = $(this).parent().attr("itemID");
    getSingleItem(id);
  };
  var checkout = function(){
    console.log('click listener for checkout fired');
    var id = $(this).parent().attr("itemID");
    checkOutItem(id);
  };
  $(".inventoryItemTitle, .inventoryItemDetails").off().click(showing);
  $(".inventoryItemCheckOut").off();
  $(".inventoryItemCheckOut").on("click",checkout);
  console.log('default inventory view end');
}

function adminInventoryView(){
  clearBottom();
  var inventoryPageNavigationScript = $('#inventory-page-navigation-template').html();
  var inventoryPageNavigationTemplate = Handlebars.compile(inventoryPageNavigationScript);
  $('#pageNavigation').html(inventoryPageNavigationTemplate);
  $('#pageBody').html(getAllInventory());//load all inventory by default
  $('#all-inventory').attr({"class":"page-navigation-tab-active"})
  $('#all-inventory').click(function(){
    $('.page-navigation-tab-active').attr({"class":"page-navigation-tab"});
    $('#all-inventory').attr({"class":"page-navigation-tab-active"});
    $('#pageBody').html(getAllInventory());
  });
  $('#available-inventory').click(function(){
    $('.page-navigation-tab-active').attr({"class":"page-navigation-tab"});
    $('#available-inventory').attr({"class":"page-navigation-tab-active"});
    $('#pageBody').html(getAvailableInventory());
  });
  //trigger to item details page
  $(document).on("click",".inventoryItemTitle, .inventoryItemDetails", function(){
    var id = $(this).parent().attr("itemID");
    getItemHistory(id);
  });
}

function getAllInventory(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/getAllDevices', true);
  xhttp.onload = function(e){displayInventory(xhttp.responseText)};
  xhttp.withCredentials = true;
  xhttp.send(null);

};

//WANT A ROUTE THAT GET RID OF ALL RETIRED / CHECKED OUT DEVICES TODO
function getAvailableInventory(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root+'/getAvailableInventory', true);
  xhttp.onload = function(e){displayInventory(xhttp.responseText)};
  xhttp.withCredentials = true;
  xhttp.send(null);
};

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

      $("#inventoryContainer").html(rowTemplateHTML);
    } else if((i % 4) == 0){
      //Determining Row ID to attach to and new one to insert
      var oldRow = "#inventoryRow" + rowID.toString();
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
