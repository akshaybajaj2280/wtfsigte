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
  if (id == "price"){
        document.getElementById("priceok").style.display = "block";
        document.getElementById("pricebad").style.display = "none";
  }
  else if (id=="distance"){
        document.getElementById("distanceok").style.display = "block";
        document.getElementById("distancebad").style.display = "none";
  }
  else{
        document.getElementById("typeok").style.display = "block";
        document.getElementById("typebad").style.display = "none";
  }
}