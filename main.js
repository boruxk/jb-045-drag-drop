//drag and drop
function dragStart(ev) {
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
  ev.dataTransfer.setDragImage(ev.target, 0, 0);
  return true;
}
function dragEnter(ev) {
  ev.preventDefault();
  return true;
}
function dragOver(ev) {
  return false;
}
function dragDrop(ev, el) {
  var src = ev.dataTransfer.getData("Text");
  el.appendChild(document.getElementById(src));
  ev.stopPropagation();
  if (jer.parentNode == weather) {
    sendToWeather('jerusalem');
  } else if (par.parentNode == weather) {
    sendToWeather('paris');
  } else if (sto.parentNode == weather) {
    sendToWeather('stockholm');
  } else if (ber.parentNode == weather) {
    sendToWeather('berlin');
  }
  return false;
}

//callback weather
function sendToWeather(selectedCity) {
  url = 'http://api.openweathermap.org/data/2.5/weather?q=' + selectedCity + '&units=metric&appid=b0d46848da9a08af9d4c35847e2702bd';
  var req = new XMLHttpRequest();
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if (req.status == 200) {
        var obj = JSON.parse(this.responseText)
        console.log(obj);
        if (jer.parentNode == weather) {
          jer.innerHTML = '<div id="jer">' + obj.name + ': ' + obj.main.temp + '<div>';
          document.getElementById("jer").removeAttribute("id");
        } else if (par.parentNode == weather) {
          par.innerHTML = '<div id="par">' + obj.name + ': ' + obj.main.temp + '<div>';
          document.getElementById("par").removeAttribute("id");
        } else if (sto.parentNode == weather) {
          sto.innerHTML = '<div id="sto">' + obj.name + ': ' + obj.main.temp + '<div>';
          document.getElementById("sto").removeAttribute("id");
        } else if (ber.parentNode == weather) {
          ber.innerHTML = '<div id="ber">' + obj.name + ': ' + obj.main.temp + '<div>';
          document.getElementById("ber").removeAttribute("id");
        }
      }
    }
  };
  req.open("GET", url);
  req.send();
}






