var priceclicked;
var distanceclicked;
var typeclicked;
var counter;

function hover(obj){
  var id = obj.id;
  if (id == "price"){
        document.getElementById("priceok").style.display = "none";
        document.getElementById("pricebad").style.display = "block";
  }
  else if (id=="distance"){
        document.getElementById("distanceok").style.display = "none";
        document.getElementById("distancebad").style.display = "block";
  }
  else{
        document.getElementById("typeok").style.display = "none";
        document.getElementById("typebad").style.display = "block";
  }
}

function hoverout(obj){
  var id = obj.id;
  if (id == "price" && priceclicked===0){
        document.getElementById("priceok").style.display = "block";
        document.getElementById("pricebad").style.display = "none";
  }
  else if (id=="distance" && distanceclicked===0){
        document.getElementById("distanceok").style.display = "block";
        document.getElementById("distancebad").style.display = "none";
  }
  else if (id=="type" && typeclicked===0){
        document.getElementById("typeok").style.display = "block";
        document.getElementById("typebad").style.display = "none";
  }
  else{
    return;
  }
}

function block(obj){
  var id = obj.id;
  if (id == "price" && priceclicked===0){
        priceclicked=1;
        var currprice = document.getElementById("priceok").innerHTML;
        var html = 'PRICES > ' + currprice;
        var newli = document.createElement('li');
        newli.setAttribute("class", "list-group-item");
        newli.innerHTML = html;
        document.getElementById("blocklist").appendChild(newli);

        document.getElementById("priceok").style.display = "none";
        document.getElementById("pricebad").style.display = "block";
  }
  else if (id=="distance" && distanceclicked===0){
        distanceclicked=1;
        var currdist = document.getElementById("distanceok").innerHTML;
        var html = 'DISTANCES > ' + currdist;
        var newli = document.createElement('li');
        newli.setAttribute("class", "list-group-item");
        newli.innerHTML = html;
        document.getElementById("blocklist").appendChild(newli);

        document.getElementById("distanceok").style.display = "none";
        document.getElementById("distancebad").style.display = "block";
  }
  else if(id=="type" && typeclicked===0){
        typeclicked=1;
        var currtype = document.getElementById("typeok").innerHTML;
        var html = 'TYPE: '+ currtype.toUpperCase();
        var newli = document.createElement('li');
        newli.setAttribute("class", "list-group-item");
        newli.innerHTML = html;
        document.getElementById("blocklist").appendChild(newli);

        document.getElementById("typeok").style.display = "none";
        document.getElementById("typebad").style.display = "block";
  }
  else if(id=="blockplace"){
        var name = document.getElementById("restaurant-name").innerHTML;
        var html = name.toUpperCase();
        var newli = document.createElement('li');
        newli.setAttribute("class", "list-group-item");
        newli.innerHTML = html;
        document.getElementById("blocklist").appendChild(newli);
  }
  else{
    return;
  }
  
}

function maybe(){
  var name = document.getElementById("restaurant-name").innerHTML;
  var spanid = name.toLowerCase();
  spanid = spanid.replace(/ /g,'');
  var html = name.toUpperCase() + '<span id=' + spanid + ' class="glyphicon glyphicon-remove badge-remove" onclick="removeFromMaybe(this)"></span>';
  var newli = document.createElement('li');
  newli.setAttribute("class", "list-group-item");
  newli.setAttribute("id", "list"+spanid);
  newli.innerHTML = html;
  document.getElementById("maybelist").appendChild(newli);
  counter++;
}

function removeFromMaybe(obj){
  var id = obj.id;
  var listid = "list" + id;
  var listitem = document.getElementById(listid);
  listitem.parentNode.removeChild(listitem);
}

$(document).ready(function() {
  counter = 0;
  priceclicked=0;
  distanceclicked=0;
  typeclicked=0;
});