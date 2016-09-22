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
  var block = '';
  var startRow = '<div class="row">' //start a row of columns
  var endRow ='</div>' //end a row
  block += '<div class="container">'//start container
  $.get(root+'/getDevices', function(data){//getDevices from the server
    console.log(data);
  });
  block += '</div>' //close container
  return block;
};
function getAvailableInventory(){};

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
