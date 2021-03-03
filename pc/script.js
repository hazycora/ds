var currentScroll = 0;
let currentHandle = 19;
let currentItem = 0;


function scrollTap(event) {
  let main = document.querySelector("#screen")
  var goTo = map(event.clientX-main.offsetLeft, 35, 287, 0, 3190, true)
  goTo = Math.floor(map(goTo, 0, 3190, 0, 55, true))
  goTo = map(goTo, 0, 55, 0, 3190, true)
  //window.location.href = "/?scroll="+Math.floor(goTo)
  goTo = Math.floor(goTo)
  scrollTo(goTo, event.clientX)
  update(constrain(goTo, 0, 2900))
}

function scrollTo(goTo) {
  document.querySelector("#gameRow").scroll(constrain(goTo, 0, 2900), 0)


  document.querySelector("#gameRow").setAttribute("scrollVal", goTo);
  //document.querySelector("#gameRow").scroll(100000, 0)

  //let scrollHandle = constrain(handle, 33.5, 272)

  let newHandle = map(goTo, 0, 3190, 34, 297)

  let scrollHandle = constrain(newHandle, 33.5, 272)

  scrollHandle = map(scrollHandle, 33.5, 272, 19, 272)

  scrollHandle = Math.round(scrollHandle/4)*4

  scrollHandle = map(scrollHandle, 19, 272, 18, 272)

  moveHandle(scrollHandle)
}

function moveHandle(scrollHandle) {

  document.querySelector("#handle").setAttribute("style", "left: "+scrollHandle+"px;");

}

function update(scroll) {

  scroll = Math.round(map(scroll, 0, 3190, 0, 55, true))

  var elements=document.querySelector("#gameRow").children

  var element=document.querySelector("#gameRow")

  for (let i = 0; i < 55; i ++) {

    var check = document.getElementById(i);
    if(check!=null){
      if(check.hasAttribute("selected")) {
        check.removeAttribute("selected");
      }
      if(i==scroll) {
        currentItem = scroll
        check.setAttribute("selected", "1");
        if(check.getAttribute("class").startsWith("game")) {

          document.querySelector("#gameDetails").setAttribute("style", "");
          document.querySelector("#gameDetails").innerHTML = apps[scroll].line1+"<br>"+apps[scroll].line2+"<br>"+apps[scroll].publisher;


        }else{
          document.querySelector("#gameDetails").setAttribute("style", "display:none;");
        }
      }
    }



  }

  //elements.item(scroll).setAttribute("selected", "1");

  if(scroll>0) {
    document.querySelector("#leftButton").setAttribute("onclick", "goLeft()");
  }else{
    if(document.querySelector("#leftButton").hasAttribute("onclick")) {
      document.querySelector("#leftButton").removeAttribute("onclick");
    }
  }

  if((parseInt(scroll)+1)<=50) {
    document.querySelector("#rightButton").setAttribute("onclick", "goRight()");
  }else{
    if(document.querySelector("#rightButton").hasAttribute("onclick")) {
      document.querySelector("#rightButton").removeAttribute("onclick");
    }
  }

}

function goLeft() {
  let goTo = Math.round(map(currentItem - 1, 0, 55, 0, 3190, true))
  scrollTo(goTo)
  update(constrain(goTo, 0, 2900))
}
function goRight() {
  let goTo = Math.round(map(currentItem + 1, 0, 55, 0, 3190, true))
  scrollTo(goTo)
  update(constrain(goTo, 0, 2900))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function map(n, start1, stop1, start2, stop2, withinBounds) {
  var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
};

function start(scroll) {
  currentScroll = scroll
  var perPage = Math.min(Math.max(parseInt(scroll)+3, 3), 5)
  var amount = Math.min((perPage - scroll + 2), perPage)

  if((parseInt(scroll)+1)<=apps.length) {
    document.querySelector("#gameDetails").setAttribute("style", "");
    document.querySelector("#gameDetails").innerHTML = apps[scroll].line1+"<br>"+apps[scroll].line2+"<br>"+apps[scroll].publisher;
  }else{
    document.querySelector("#gameDetails").setAttribute("style", "display:none;");
  }


  removeAllChildNodes(document.querySelector("#gameRow"))

  var bracketClosed = document.createElement("div");
  bracketClosed.setAttribute("class", "bracket object");
  bracketClosed.setAttribute("closed", "1");
  var bracket = document.createElement("div");
  bracket.setAttribute("class", "bracket object");
  var air = document.createElement("div");
  air.setAttribute("class", "air object");


  document.querySelector("#gameRow").appendChild(air.cloneNode(true));
  document.querySelector("#gameRow").appendChild(bracket.cloneNode(true));


  for (var i = 0; i < 51; i ++) {
    if (i<apps.length) {
      var link = document.createElement("a");
      link.setAttribute("href", apps[i].link);
      var element = document.createElement("div");
      element.setAttribute("class", "game object");
      element.setAttribute("id", i);
      if(i==0) {
        element.setAttribute("selected", "1");
      }
      var img = document.createElement("img");
      img.setAttribute("class", "icon");
      img.setAttribute("src", apps[i].icon);
      element.appendChild(img);
      link.appendChild(element);
      document.querySelector("#gameRow").appendChild(link);
    }else{
      var empty = document.createElement("div");
      empty.setAttribute("class", "empty object");
      empty.setAttribute("id", i);
      document.querySelector("#gameRow").appendChild(empty.cloneNode(true));
    }
  }

  document.querySelector("#gameRow").appendChild(bracketClosed);
  document.querySelector("#gameRow").appendChild(air);

  document.querySelector("#gameRow").appendChild(air.cloneNode(true));
  document.querySelector("#gameRow").appendChild(air.cloneNode(true));
  document.querySelector("#gameRow").appendChild(air.cloneNode(true));
  document.querySelector("#gameRow").appendChild(air.cloneNode(true));
  document.querySelector("#gameRow").appendChild(air.cloneNode(true));


  if(scroll>0) {
    document.querySelector("#leftButton").setAttribute("onclick", "goLeft()");
  }else{
    if(document.querySelector("#leftButton").hasAttribute("onclick")) {
      document.querySelector("#leftButton").removeAttribute("onclick");
    }
  }

  if((parseInt(scroll)+1)<=48) {
    document.querySelector("#rightButton").setAttribute("onclick", "goRight()");
  }else{
    if(document.querySelector("#rightButton").hasAttribute("onclick")) {
      document.querySelector("#rightButton").removeAttribute("onclick");
    }
  }

  document.querySelector("#handle").setAttribute("style", "left: "+((scroll*5.3)+19)+"px;");
}
