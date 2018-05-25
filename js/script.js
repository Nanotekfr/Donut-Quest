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
var currentItem = 0;

function doNewGame() {
  localStorage.setItem('savedStage',0);
  localStorage.setItem('savedArea',1);
  localStorage.setItem('savedCharacter','null');
  for (i=0;i<inventoryStep.bag.item.length;i++) {
    bag=inventoryStep.bag;
    item=bag.item[i].name;
    localStorage.setItem(item,0);
  }
  currentStage = localStorage.getItem('savedStage');
  currentArea = localStorage.getItem('savedArea');
  currentCharacter = localStorage.getItem('savedCharacter');
  vueArea.img=areaStep.areas[currentArea].img;
  document.getElementById("HUD").style.marginTop = "0";
  setTimeout(function() {
    document.getElementById('blackScreen').style.opacity = "0";
  }, 1000);
  setTimeout(function() {
    doTalk();
  }, 2000);
}
function doContinue() {
  currentCharacter = localStorage.getItem('savedCharacter');
  currentStage = localStorage.getItem('savedStage');
  currentArea = localStorage.getItem('savedArea');
  vueArea.img=areaStep.areas[currentArea].img;
  document.getElementById("HUD").style.marginTop = "0";
  for (i=0;i<inventoryStep.bag.item.length;i++) {
    bag=inventoryStep.bag;
    item=bag.item[i].name;
    icon=bag.item[i].icon;
    savedItem = localStorage.getItem(item);
    if(savedItem == 1){
      document.getElementById('items').innerHTML += "<div id='item" + i + "' class='boxItem' onclick=\"selectedItem='" + i + "', doShowDescription()\">"+ icon + "</div>";
    }
  }
  if (currentCharacter != 'null') {
    doShowCharacter();
  }
  if (currentStage == 2) {
    areaStep.areas[0].presentCharacter = 2;
    areaStep.areas[1].presentCharacter = 0;
  }
  if (currentStage == 3) {
    areaStep.areas[0].presentCharacter = 2;
    areaStep.areas[1].presentCharacter = 1;
  }
  setTimeout(function() {
    document.getElementById('blackScreen').style.opacity = "0";
  }, 1500);
}
function doQuit() {
  location.reload();
}

function doTalk() {
  doCloseMap();
  doCloseBag();
  dialog = talkStep.dialogs[currentDialog];
  document.getElementById("HUD").style.marginTop = "-100%";
  document.getElementById("dialogSentence").innerHTML = "";
  document.getElementById("dialogButton").innerHTML = "";
  if (dialog.who != "VOICE-OVER") {
    character = characterStep.characters[currentCharacter].img;
    document.getElementById(character).style.transform = "translateX(50%)";
    document.getElementById("dialogName").style.display = "block";
    document.getElementById("dialogName").innerHTML = dialog.who;
  }
  else {
    document.getElementById("dialogName").style.display = "none";
    document.getElementById("dialogName").innerHTML = "";
  }
  document.getElementById("dialog").style.display = "block";
  sfx_blipmale.play();
  speechtext =  dialog.sentences[currentSentence].text;
  new Typed('#dialogSentence', {
    strings: [speechtext],
    typeSpeed: 0,
    showCursor: false,
    onComplete() {
      sfx_blipmale.stop();
      if (currentSentence == (dialog.sentences.length-1)) {
        for (i=0;i<dialog.actions.length;i++) {
           document.getElementById("dialogButton").innerHTML += "<a id=\"button\" onclick=\"selectedAction=" + i + ", doAction(" + i + ")\">" + dialog.actions[i].text + "</a>"
        }
      }
      else {
        currentSentence++;
        document.getElementById("dialogButton").innerHTML += "<i id=\"button\" class=\"fas fa-caret-right\" onclick=\"doTalk()\"></i>";
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
  localStorage.setItem('savedCharacter',currentCharacter);
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
  document.getElementById('mapWindow').style.left = "-100%";
  document.getElementById('blackScreen').style.opacity = "1";
  currentArea=areaStep.areas[currentArea].canGoTo[selectedArea].nextArea;
  presentCharacter=areaStep.areas[currentArea].presentCharacter;
  setTimeout(function() {
    doCloseMap();
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
  icon=bag.item[currentItem].icon;
  document.getElementById('items').innerHTML += "<div id='item" + currentItem + "' onclick=\"selectedItem='" + currentItem + "', doShowDescription()\">"+ icon + "</div>";
  localStorage.setItem(item,1);
}
function doRemoveItem() {
  currentItem = action.removeItem;
  var remove = document.getElementById('item' + currentItem + '');
  remove.parentNode.removeChild(remove);
  localStorage.setItem(item, false);
}
function doHideDialogBox() {
  document.getElementById("dialog").style.display = "none";

}
function doPause() {
  setTimeout(doTalk, action.time);
}
function doStopTalk() {
  currentDialog = 0;
  currentSentence = 0;
  if (dialog.who != "VOICE-OVER") {
    character = characterStep.characters[currentCharacter].img;
    document.getElementById(character).style.transform = "translateX(0)";
  }
  document.getElementById("dialog").style.display = "none";
  document.getElementById("HUD").style.marginTop = "0";
  sfx_blipmale.stop();
}

var bagOpened = 0;
var mapOpened = 0;
function doOpenMap() {
  if (mapOpened == 0) {
    document.getElementById('mapWindow').innerHTML = "";
    for (i=0;i<areaStep.areas[currentArea].canGoTo.length;i++) {
      doCloseBag();
      document.getElementById('mapWindow').style.left = "0";
      document.getElementById('mapWindow').innerHTML += "" + areaStep.areas[currentArea].canGoTo[i].area + "<img id='selectArea' onclick='doChangeArea(" + i + ")' src='" + areaStep.areas[currentArea].canGoTo[i].img + "'/>";
      document.getElementById('mapIcon').innerHTML = '<img src="/img/opened-map.png"/>';
      mapOpened=1;
    }
  }
  else {
    doCloseMap();
  }
}
function doCloseMap() {
  document.getElementById('mapWindow').style.left = "-100%";
  document.getElementById('mapIcon').innerHTML = '<img src="/img/closed-map.png"/>';
  mapOpened=0;
}
function doOpenBag() {
  if (bagOpened == 0) {
    doCloseMap();
    document.getElementById('description').innerHTML = "";
    document.getElementById('bagWindow').style.bottom = '0';
    document.getElementById('bagIcon').innerHTML = '<img src="/img/opened-bag.png"/>';
    bagOpened=1;
  }
  else {
    doCloseBag();
  }
}
function doCloseBag() {
  document.getElementById('bagWindow').style.bottom = '-100%';
  document.getElementById('bagIcon').innerHTML = '<img src="/img/closed-bag.png"/>';
  bagOpened=0;
}
function doShowDescription() {
  currentItem = selectedItem;
  icon=bag.item[currentItem].icon;
  description=bag.item[currentItem].description;
  document.getElementById('description').innerHTML = icon + description;
}
function doCloseAll() {
  doCloseMap();
  doCloseBag();
}

function doNextStage() {
  localStorage.setItem('savedStage',action.nextStage);
  if (action.nextStage == 2) {
    areaStep.areas[0].presentCharacter = 2;
    areaStep.areas[1].presentCharacter = 0;
  }
  if (action.nextStage == 3) {
    areaStep.areas[1].presentCharacter = 1;
  }
  if (action.nextStage == 4) {
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
