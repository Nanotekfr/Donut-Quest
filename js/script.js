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
fetch('/js/json/inventory.json')
  .then(function(inventory) {
    return inventory.json();
  })
  .then(function(inventoryJSON) {
    inventoryStep = inventoryJSON;
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

var currentCharacter = localStorage.getItem('savedCharacter');
var currentStage = localStorage.getItem('savedStage');
var currentArea = localStorage.getItem('savedArea');
var currentSentence = 0;
var selectedAction = 0;
var currentDialog = 0;
var bagOpened=0;

function doNewGame() {
  localStorage.setItem('savedStage',0);
  localStorage.setItem('savedArea',1);
  localStorage.setItem('savedCharacter','null');
  currentStage = localStorage.getItem('savedStage');
  currentArea = localStorage.getItem('savedArea');
  currentCharacter = localStorage.getItem('savedCharacter');
  vueArea.img=areaStep.areas[currentArea].img;
  document.getElementById("HUD").classList.remove('hidden');
  setTimeout(function() {
    document.getElementById('blackScreen').style.opacity = "0";
  }, 1000);
  setTimeout(function() {
    doTalk();
  }, 2000);
}
function doContinue() {
  currentStage = localStorage.getItem('savedStage');
  currentArea = localStorage.getItem('savedArea');
  currentCharacter = localStorage.getItem('savedCharacter');
  vueArea.img=areaStep.areas[currentArea].img;
  document.getElementById("HUD").classList.remove('hidden');
  if (currentCharacter != 'null') {
    doShowCharacter();
  }
  if (currentStage == 2) {
    areaStep.areas[0].presentCharacter = 1;
  }
  if (currentStage == 3) {
    areaStep.areas[0].presentCharacter = 1;
    areaStep.areas[1].presentCharacter = 0;
  }
  setTimeout(function() {
    document.getElementById('blackScreen').style.opacity = "0";
  }, 1500);
}
function doQuit() {
  location.reload();
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
  currentStage=action.nextStage;
  currentDialog=action.nextStep;
  currentSentence=0;
  if (typeof(action.nextStage) != "undefined") {
    doNextStage();
  }
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
  if (typeof(action.addItem) != "undefined") {
    currentItem = action.addItem;
    doAddItem();
  }
  if (typeof(action.removeItem) != "undefined") {
    doRemoveItem();
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
function doChangeArea(selectedArea) {
  document.getElementById("map").style.display = "none";
  document.getElementById("map").innerHTML = "";
  document.getElementById('blackScreen').style.opacity = "1";
  currentArea=areaStep.areas[currentArea].canGoTo[selectedArea].nextArea;
  presentCharacter=areaStep.areas[currentArea].presentCharacter;
  setTimeout(function() {
    document.getElementById('mapIcon').innerHTML = '<img src="/img/closed-map.png"/>';
    vueArea.img=areaStep.areas[currentArea].img;
    localStorage.setItem('savedArea',currentArea);
    if (currentCharacter != 'null') {
      character=characterStep.characters[currentCharacter].img;
      document.getElementById(character).style.display = "none";
    }
    if (presentCharacter != 'null') {
      currentCharacter=presentCharacter;
      character=characterStep.characters[currentCharacter].img;
      document.getElementById(character).style.display = "block";
      document.getElementById(character).style.opacity = "1";
      localStorage.setItem('savedCharacter',currentCharacter);
    }
    else {
      localStorage.setItem('savedCharacter','null');
    }
  }, 1000);
  setTimeout(function() {
    document.getElementById('blackScreen').style.opacity = "0";
  }, 2000);
  doCheckStage();
}
function doAddItem() {
  bag=inventoryStep.bag;
  item=bag.item[currentItem].name;
  document.getElementById('items').innerHTML += "<div id='item" + currentItem + "' class='boxItem' onclick=\"selectedItem='" + currentItem + "', doShowDescription()\">"+ item + "</div>";
  localStorage.setItem(item, true);
}
function doRemoveItem() {
  currentItem = action.removeItem;
  var remove = document.getElementById('item' + currentItem + '');
  remove.parentNode.removeChild(remove);
  localStorage.setItem(item, false);
}
function doHideDialogBox() {
  document.getElementById('dialogBox').classList.add('hidden');
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

function doSelectArea() {
  if (document.getElementById("map").innerHTML == "") {
    for (i=0;i < areaStep.areas[currentArea].canGoTo.length;i++) {
      document.getElementById("map").style.display = "flex";
      document.getElementById("map").innerHTML += "<div class=\"dialog-button\" onclick=\"doChangeArea(" + i + ")\">" + areaStep.areas[currentArea].canGoTo[i].area + "</div>";
      document.getElementById('mapIcon').innerHTML = '<img src="/img/opened-map.png"/>';
    }
  }
  else {
    document.getElementById("map").style.display = "none";
    document.getElementById("map").innerHTML = "";
    document.getElementById('mapIcon').innerHTML = '<img src="/img/closed-map.png"/>';
  }
}
function doOpenBag() {
  if (bagOpened == 0) {
    document.getElementById('inventory').style.display = 'flex';
    document.getElementById('bagIcon').innerHTML = '<img src="/img/opened-bag.png"/>';
    bagOpened=1;
  }
  else {
    document.getElementById('inventory').style.display = 'none';
    document.getElementById('description').innerHTML = "";
    document.getElementById('description').style.display = 'none';
    document.getElementById('bagIcon').innerHTML = '<img src="/img/closed-bag.png"/>';
    bagOpened=0;
  }
}
function doShowDescription() {
  currentItem = selectedItem;
  description=bag.item[currentItem].description;
  document.getElementById('description').style.display = 'flex';
  document.getElementById('description').innerHTML = "<div id='item" + currentItem + "'>"+ description + "</div>";
}

function doNextStage() {
  if (action.nextStage == 1) {
    localStorage.setItem('savedStage',1);
  }
  if (action.nextStage == 2) {
    localStorage.setItem('savedStage',2);
    localStorage.setItem('savedCharacter',1);
    areaStep.areas[0].presentCharacter = 1;
    areaStep.areas[1].presentCharacter = 0;
  }
  if (action.nextStage == 3) {
    localStorage.setItem('savedStage',3);
    areaStep.areas[1].presentCharacter = 2;
  }
  if (action.nextStage == 4) {
    localStorage.setItem('savedStage',4);
    areaStep.areas[2].presentCharacter = 3;
    areaStep.areas[0].presentCharacter = 'null';
  }
}
function doCheckStage() {
  if (currentStage == 1 && currentArea == 0) {
    setTimeout(function() {
      currentDialog=2;
      doTalk();
    }, 4000);
  }
}
