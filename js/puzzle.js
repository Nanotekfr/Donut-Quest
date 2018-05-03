var box1 = document.getElementById('puzzle1');
var box2 = document.getElementById('puzzle2');
var box3 = document.getElementById('puzzle3');
var box4 = document.getElementById('puzzle4');
var cB = document.getElementById('cB');
var oB = document.getElementById('oB');
var bB = document.getElementById('dB');
var eB = document.getElementById('eB');
var resetB = document.getElementById('resetB');
var valid = 0;
var letter = "";
var clicked;

function put() {
  valid = 0;
  clicked.style.opacity = "0.25";
  clicked.style.pointerEvents = "none";
  if (box1.innerHTML == "") {
    box1.innerHTML = letter;
  }
  else if (box2.innerHTML == "") {
    box2.innerHTML = letter;
  }
  else if (box3.innerHTML == "") {
    box3.innerHTML = letter;
  }
  else if (box4.innerHTML == "") {
    box4.innerHTML = letter;
  }
  if (box1.innerHTML == "C" && box2.innerHTML == "O" && box3.innerHTML == "D" && box4.innerHTML == "E") {
    document.getElementById('section').style.background = "green";
    valid = 1;
  }
  if (box4.innerHTML !== "") {
    if (valid !== 1) {
      document.getElementById('section').style.background = "red";
    }
  }
}
function reset() {
  box1.innerHTML = "";
  box2.innerHTML = "";
  box3.innerHTML = "";
  box4.innerHTML = "";
  cB.style.opacity = "1";
  oB.style.opacity = "1";
  dB.style.opacity = "1";
  eB.style.opacity = "1";
  cB.style.pointerEvents = "visible";
  oB.style.pointerEvents = "visible";
  dB.style.pointerEvents = "visible";
  eB.style.pointerEvents = "visible";
  document.getElementById('section').style.background = "grey"
}
