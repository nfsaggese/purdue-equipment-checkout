var inventoryTabs = '<div class="page-navigation-wrapper">\
  <div class="container">\
    <nav class="page-navigation full-width">\
      <div id="all-inventory" class="page-navigation-tab">ALL</div>\
      <div id="available-inventory" class="page-navigation-tab">AVAILABLE</div>\
    </nav>\
  </div>\
<div>';

function getAllInventory(){
  var block = '';
  var startRow = '<div class="row">' //start a row of columns
  var endRow ='</div>' //end a row
  block += '<div class="container">'//start container
  
  block += '</div>' //close container
  return block;
};
function getAvailableInventory(){};

$(document).ready(function(){
  //default content
  $('#pageNavigation').html(inventoryTabs);
  //Swap Inventory Tabs
  $('#all-inventory').click(function(){
    ('#pageBody').html(getAllInventory());
  });
  $('#available-inventory').click(function(){
    ('#pageBody').html(getAvailableInventory());
  });
});
