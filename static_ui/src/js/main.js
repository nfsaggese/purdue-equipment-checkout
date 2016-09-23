$.getScript("./js/helper.js", function(){
  console.log("Helper Loaded.")
});
$.getScript("./js/inventory.js", function(){
  console.log("inventory Loaded.")
});
$.getScript("./js/item.js", function(){
  console.log("item js loaded");
});
var root = 'http://ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080'
//todo create back and forwards variables stacks with closures to store prior and future views
$(document).ready(function(){
  defaultInventoryView();
});
