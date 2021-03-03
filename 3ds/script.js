var currentScroll = 0;

function scrollTap(event) {
  var goTo = Math.max(((event.clientX-19-14.5)/5.3), 0)
  goTo = Math.min(goTo, 48)
  //window.location.href = "/?scroll="+Math.floor(goTo)
  goTo = Math.floor(goTo)
  var curScroll = currentScroll
  var limiter = 0;
  for (var i = 1; i < 10; i++) {
    if (currentScroll!=goTo) {
      setTimeout(function timer() {
        curScroll += (goTo-curScroll)/4
        console.log(curScroll)
        refresh(Math.round(curScroll))
        limiter += 1;
      }, i * 10);
    }
  }
}

function scrollTo(goTo) {
  refresh(Math.floor(goTo))
}

function goLeft() {
  refresh(Math.floor(currentScroll-1))
}

function goRight() {
  refresh(Math.floor(currentScroll+1))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function refresh(scroll) {
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
  bracketClosed.setAttribute("class", "bracket");
  bracketClosed.setAttribute("closed", "1");
  var bracket = document.createElement("div");
  bracket.setAttribute("class", "bracket");
  var air = document.createElement("div");
  air.setAttribute("class", "air");

  if(scroll==0) {
    document.querySelector("#gameRow").appendChild(air);
  }
  if(scroll<=1) {
    document.querySelector("#gameRow").appendChild(bracket);
  }

  if(apps.length <= perPage) {
    if(amount > 0) {
      for (var index = 0; index < amount; index ++) {
        if (index == perPage-3) {
          var link = document.createElement("a");
          link.setAttribute("href", apps[scroll].link);
          var element = document.createElement("div");
          element.setAttribute("class", "gameSelected");
          var img = document.createElement("img");
          img.setAttribute("class", "icon");
          img.setAttribute("src", apps[scroll].icon);
          element.appendChild(img);
          link.appendChild(element);
          document.querySelector("#gameRow").appendChild(link);
        }else{
          var link = document.createElement("a");
          link.setAttribute("href", apps[scroll+(index-(perPage-3))].link);
          var element = document.createElement("div");
          element.setAttribute("class", "game");
          var img = document.createElement("img");
          img.setAttribute("class", "icon");
          img.setAttribute("src", apps[scroll+(index-(perPage-3))].icon);
          element.appendChild(img);
          link.appendChild(element);
          document.querySelector("#gameRow").appendChild(link);
        }
      }
    }
    var empty = document.createElement("div");
    empty.setAttribute("class", "empty");
    var emptySelected = document.createElement("div");
    emptySelected.setAttribute("class", "emptySelected");

    if(scroll>=47) {
      if(scroll==48) {
        document.querySelector("#gameRow").appendChild(empty);
        document.querySelector("#gameRow").appendChild(empty.cloneNode(true));
        document.querySelector("#gameRow").appendChild(emptySelected.cloneNode(true));

        document.querySelector("#gameRow").appendChild(bracketClosed);

        document.querySelector("#gameRow").appendChild(air);
      }else {
        document.querySelector("#gameRow").appendChild(empty);
        document.querySelector("#gameRow").appendChild(empty.cloneNode(true));
        document.querySelector("#gameRow").appendChild(emptySelected.cloneNode(true));
        document.querySelector("#gameRow").appendChild(empty.cloneNode(true));

        document.querySelector("#gameRow").appendChild(bracketClosed);
      }
    }else {
      for (var index = 0; index < Math.min((perPage - amount), perPage); index ++) {
        if (index == perPage-(3+Math.max(amount, 0))) {
          document.querySelector("#gameRow").appendChild(emptySelected.cloneNode(true));
        }else{
          document.querySelector("#gameRow").appendChild(empty.cloneNode(true));
        }

      }
    }
  }else{
    if(amount > 0) {
      for (var index = 0; index < amount; index ++) {
        if (index == perPage-3) {
          var link = document.createElement("a");
          link.setAttribute("href", apps[scroll+(index-(perPage-3))].link);
          var element = document.createElement("div");
          element.setAttribute("class", "gameSelected");
          var img = document.createElement("img");
          img.setAttribute("class", "icon");
          img.setAttribute("src", apps[scroll].icon);
          element.appendChild(img);
          link.appendChild(element);
          document.querySelector("#gameRow").appendChild(link);
        }
        if (index != perPage-3) {
          var link = document.createElement("a");
          link.setAttribute("href", apps[scroll+(index-(perPage-3))].link);
          var element = document.createElement("div");
          element.setAttribute("class", "game");
          var img = document.createElement("img");
          img.setAttribute("class", "icon");
          img.setAttribute("src", apps[scroll+(index-(perPage-3))].icon);
          element.appendChild(img);
          link.appendChild(element);
          document.querySelector("#gameRow").appendChild(link);
        }
      }
    }
  }


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
