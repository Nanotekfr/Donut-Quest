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

function putC() {
  valid = 0;
  cB.style.opacity = "0.25";
  cB.style.pointerEvents = "none";
  if (box1.innerHTML == "") {
    box1.innerHTML = "C";
  }
  else if (box2.innerHTML == "") {
    box2.innerHTML = "C";
  }
  else if (box3.innerHTML == "") {
    box3.innerHTML = "C";
  }
  else if (box4.innerHTML == "") {
    box4.innerHTML = "C";
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
function putO() {
  valid = 0;
  oB.style.opacity = "0.25";
  oB.style.pointerEvents = "none";
  if (box1.innerHTML == "") {
    box1.innerHTML = "O";
  }
  else if (box2.innerHTML == "") {
    box2.innerHTML = "O";
  }
  else if (box3.innerHTML == "") {
    box3.innerHTML = "O";
  }
  else if (box4.innerHTML == "") {
    box4.innerHTML = "O";
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
function putD() {
  valid = 0;
  dB.style.opacity = "0.25";
  dB.style.pointerEvents = "none";
  if (box1.innerHTML == "") {
    box1.innerHTML = "D";
  }
  else if (box2.innerHTML == "") {
    box2.innerHTML = "D";
  }
  else if (box3.innerHTML == "") {
    box3.innerHTML = "D";
  }
  else if (box4.innerHTML == "") {
    box4.innerHTML = "D";
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
function putE() {
  valid = 0;
  eB.style.opacity = "0.25";
  eB.style.pointerEvents = "none";
  if (box1.innerHTML == "") {
    box1.innerHTML = "E";
  }
  else if (box2.innerHTML == "") {
    box2.innerHTML = "E";
  }
  else if (box3.innerHTML == "") {
    box3.innerHTML = "E";
  }
  else if (box4.innerHTML == "") {
    box4.innerHTML = "E";
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
function confirm() {
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
