fetch('/js/json/areas.json')
  .then(function(areas) {
    return areas.json();
  })
  .then(function(areaJSON) {
    areaStep = areaJSON;
  });
fetch('/js/json/characters.json')
  .then(function(characters) {
    return characters.json();
  })
  .then(function(characterJSON) {
    characterStep = characterJSON;
  });
fetch('/js/json/dialogs.json')
  .then(function(dialogs) {
    return dialogs.json();
  })
  .then(function(dialogJSON) {
    talkStep = dialogJSON;
  });

var sfx_blipmale = new Howl({
  src: ['../audio/sfx_blipmale.wav'],
  volume: 0.25,
  buffer: false,
  loop: true
  });
var sfx_blipfemale = new Howl({
  src: ['../audio/sfx_blipfemale.wav'],
  volume: 0.25,
  buffer: false,
  loop: true
  });

var vueArea = new Vue({
  el: '#areaBox',
  data: {
    img: '../img/area-kitchen.png',
  }
});

var currentStage = 0;
var currentArea = 1;
var currentCharacter = 0;
var currentDialog = 0;
var currentSentence = 0;
var selectedAction = 0;

function start() {
  setTimeout(function() {
    doTalk();
  }, 2000);
}
function doTalk() {
  dialog = talkStep.dialogs[currentDialog];
  document.getElementById("divSentence").innerHTML = "";
  document.getElementById("divButton").innerHTML = "";
  document.getElementById("HUD").classList.add('hidden');
  dialogBox.classList.remove('hidden');
  sfx_blipmale.play();
  speechtext =  dialog.sentences[currentSentence].text;
  new Typed('#divSentence', {
    strings: [speechtext],
    typeSpeed: 0,
    showCursor: false,
    onComplete() {
      sfx_blipmale.stop();
      if (currentSentence == (dialog.sentences.length-1)) {
        for (i=0;i < dialog.actions.length;i++) {
           document.getElementById("divButton").innerHTML += "<a class=\"dialog-button\" onclick=\"selectedAction=" + i + ", doAction(" + i + ")\">" + dialog.actions[i].text + "</a>"
        }
      }
      else {
        currentSentence++;
        document.getElementById("divButton").innerHTML += "<i class=\"fas fa-caret-right dialog-button-arrow\" onclick=\"doTalk()\"></i>";
      }
    }
  });
}
function doAction(selectedAction) {
  dialog=talkStep.dialogs[currentDialog];
  action=dialog.actions[selectedAction];
  if (typeof(action.nextStage) != "undefined") {
    if (action.nextStage == 1) {
    }
    if (action.nextStage == 2) {
      areaStep.areas[0].presentCharacter = 1;
    }
    if (action.nextStage == 3) {
      areaStep.areas[1].presentCharacter = 0;
    }
    currentStage=action.nextStage;
  }
  currentDialog=action.nextStep;
  currentSentence=0;
  if (typeof(action.showCharacter) != "undefined") {
    currentCharacter=action.showCharacter;
    doShowCharacter();
  }
  if (typeof(action.hideCharacter) != "undefined") {
    doHideCharacter();
  }
  if (typeof(action.changeCharacter) != "undefined") {
    currentCharacter=action.changeCharacter;
    doChangeCharacter();
  }
  if (typeof(action.hideDialogBox) != "undefined") {
    doHideDialogBox();
  }
  if (typeof(action.pause) != "undefined") {
    doPause();
  }
  else if (typeof(action.stopTalk) != "undefined") {
    doStopTalk();
  }
  else {
    doTalk();
  }
}
function doPause() {
  setTimeout(doTalk, action.time);
}
function doStopTalk() {
  currentDialog = 0;
  currentSentence = 0;
  document.getElementById('dialogBox').classList.add('hidden');
  document.getElementById("HUD").classList.remove('hidden');
  sfx_blipmale.stop();
}
function doHideDialogBox() {
  document.getElementById('dialogBox').classList.add('hidden');
}
function doShowCharacter() {
  character = characterStep.characters[currentCharacter].img;
  document.getElementById(character).style.display = "block";
  setTimeout(function() {
    document.getElementById(character).style.opacity = "1";
  }, 1000);
}
function doHideCharacter() {
  character = characterStep.characters[currentCharacter].img;
  document.getElementById(character).style.opacity = "0";
  setTimeout(function() {
    document.getElementById(character).style.display = "none";
  }, 1000);
}
function doChangeCharacter() {
  document.getElementById(character).style.opacity = "0";
  setTimeout(function() {
    document.getElementById(character).style.display = "none";
    character = characterStep.characters[currentCharacter].img;
    document.getElementById(character).style.display = "block";
  }, 1000);
  setTimeout(function() {
    document.getElementById(character).style.opacity = "1";
  }, 1500);
}
function doSelectArea() {
  if (document.getElementById("map").innerHTML == "") {
    for (i=0;i < areaStep.areas[currentArea].canGoTo.length;i++) {
      document.getElementById("map").innerHTML += "<a class=\"dialog-button\" onclick=\"doChangeArea(" + i + ")\">" + areaStep.areas[currentArea].canGoTo[i].area + "</a>"
    }
  }
  else {
    document.getElementById("map").innerHTML = "";
  }
}
function doChangeArea(selectedArea) {
  document.getElementById("map").innerHTML = "";
  document.getElementById('blackScreen').style.opacity = "1";
  currentArea=areaStep.areas[currentArea].canGoTo[selectedArea].nextArea;
  presentCharacter=areaStep.areas[currentArea].presentCharacter;
  setTimeout(function() {
    vueArea.img=areaStep.areas[currentArea].img;
    character=characterStep.characters[currentCharacter].img;
    document.getElementById(character).style.display = "none";
    if (presentCharacter != null) {
      currentCharacter=presentCharacter;
      document.getElementById(character).style.display = "block";
      document.getElementById(character).style.opacity = "1";
    }
  }, 1000);
  setTimeout(function() {
    document.getElementById('blackScreen').style.opacity = "0";
  }, 2000);
  doCheckStage();
}

function doCheckStage() {
  if (currentStage == 1 && currentArea == 0) {
    setTimeout(function() {
      currentDialog=2;
      doTalk();
    }, 4000);
  }
}
