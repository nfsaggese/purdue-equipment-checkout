function getSingleItem(id){
  var params = "?EQUIPMENT_UNIQUE_ID=" + id;//add id to params ilst for get request
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", root + '/getSingleItem' + params, true);
  xhttp.onload = function(e){displayItem(xhttp.responseText)};
  xhttp.send(null);//only in use on post requests
}

function displayItem(data){
  clearPageNavigation();
  var item = JSON.parse(data)['rows'][0];
  //template operations
  var viewItemDetailsScript = $('#view-item-details-template').html();
  var viewItemDetailsTemplate = Handlebars.compile(viewItemDetailsScript);

  //building context to render
  var canCheckOut = "False";
  var checkOut = "Not Available";
  function stock(item){
    if(!item['equipment_ischeckedout']){
      canCheckOut = "True";
      checkOut = "Check Out";
      return "In Stock";
    }else{
      checkOut = "Not Available";
      canCheckOut = "False";
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
  };//close contex
  var viewItemDetailsHTML = viewItemDetailsTemplate(context);
  $("#pageContent").html(viewItemDetailsHTML);

  $(document).on("click",[canCheckOut='True'],function(){
    var id = $(this).attr("itemID");
    checkOutItem(id);
  })
}//close displayItem()

function checkoutItem(id){
  console.log("ready to checkout " + id);//setup an alert on checkout os it works on any page
}
