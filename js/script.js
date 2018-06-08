fetch('/js/json/areas.json')
  .then(function(areas){
    return areas.json();
  })
  .then(function(areaJSON){
    areaStep=areaJSON;
  });
fetch('/js/json/characters.json')
  .then(function(characters){
    return characters.json();
  })
  .then(function(characterJSON){
    characterStep=characterJSON;
  });
fetch('/js/json/dialogsBACKUP.json')
  .then(function(dialogs){
    return dialogs.json();
  })
  .then(function(dialogJSON){
    talkStep=dialogJSON;
  });
fetch('/js/json/inventory.json')
  .then(function(inventory){
    return inventory.json();
  })
  .then(function(inventoryJSON){
    inventoryStep=inventoryJSON;
  });
fetch('/js/json/scenery.json')
  .then(function(scenery){
    return scenery.json();
  })
  .then(function(sceneryJSON){
    sceneryStep=sceneryJSON;
  });

var sfx_blipmale=new Howl({
  src:['../audio/sfx_blipmale.wav'],
  preload:true,
  volume:.1,
  loop:true
});
var sfx_blipfemale=new Howl({
  src:['../audio/sfx_blipfemale.wav'],
  preload:true,
  volume:.1,
  loop:true
});
var sfx_ambient_museum=new Howl({
  src:['../audio/sfx_ambient_museum.wav'],
  preload:true,
  volume:0,
  loop:true,
  onplay:function(){
    sfx_ambient_museum.fade(0,1,1000);
  }
});
var sfx_locked_door=new Howl({
  src:['../audio/sfx_locked_door.wav'],
  preload:true,
  volume:1
});
var sfx_footsteps=new Howl({
  src:['../audio/sfx_footsteps.wav'],
  preload:true,
  volume:.25
});
var currentCharacter=JSON.parse(localStorage.getItem('savedCharacter'));
var currentStage=JSON.parse(localStorage.getItem('savedStage'));
var currentArea=JSON.parse(localStorage.getItem('savedArea'));
var currentSentence=0;
var selectedAction=0;
var currentDialog=0;
var currentItem=0;

function doLoad(){
  document.getElementById('homeScreen').style.opacity='1';
  if(JSON.parse(localStorage.getItem('canContinue'))==true){
    document.getElementById('continue').style.opacity='1';
    document.getElementById('continue').style.pointerEvents='auto';
  }
}
function doNewGame(){
  document.getElementById('homeScreen').style.opacity='0';
  document.getElementById('homeScreen').style.pointerEvents='none';
  sfx_ambient_museum.play();
  localStorage.setItem('canContinue',true);
  localStorage.setItem('savedStage',0);
  localStorage.setItem('savedArea',10);
  localStorage.setItem('savedCharacter',null);
  localStorage.setItem('gotMap',false);
  localStorage.setItem('gotBag',false);
  localStorage.setItem('gotMask',false);
  localStorage.setItem('gotPhone',false);
  for(i=0;i<inventoryStep.bag.item.length;i++){
    bag=inventoryStep.bag;
    item=bag.item[i].name;
    localStorage.setItem(item,false);
  }
  currentStage=JSON.parse(localStorage.getItem('savedStage'));
  currentArea=JSON.parse(localStorage.getItem('savedArea'));
  currentCharacter=JSON.parse(localStorage.getItem('savedCharacter'));
  vueArea.img=areaStep.areas[currentArea].img;
  document.getElementById("HUD").style.marginTop="0";
  setTimeout(function(){
    currentDialog=2;
    doTalk();
  },5000);
}
function doContinue(){
  document.getElementById('homeScreen').style.opacity='0';
  document.getElementById('homeScreen').style.pointerEvents='none';
  currentStage=JSON.parse(localStorage.getItem('savedStage'));
  currentArea=JSON.parse(localStorage.getItem('savedArea'));
  vueArea.img=areaStep.areas[currentArea].img;
  if(JSON.parse(localStorage.getItem('gotMap'))==true){
    document.getElementById('mapIcon').style.pointerEvents='auto';
    document.getElementById('mapIcon').innerHTML='<img src="/img/closed-map.png"/>';
  }
  if(JSON.parse(localStorage.getItem('gotBag'))==true){
    document.getElementById('bagIcon').style.pointerEvents='auto';
    document.getElementById('bagIcon').innerHTML='<img src="/img/closed-bag.png"/>';
  }
  if(JSON.parse(localStorage.getItem('gotMask'))==true){
    document.getElementById('maskIcon').style.pointerEvents='auto';
    document.getElementById('maskIcon').innerHTML='<img src="/img/closed-mask.png"/>';
  }
  if(JSON.parse(localStorage.getItem('gotPhone'))==true){
    document.getElementById('phoneIcon').style.pointerEvents='auto';
    document.getElementById('phoneIcon').innerHTML='<img src="/img/closed-phone.png"/>';
  }
  document.getElementById("HUD").style.marginTop="0";
  for(i=0;i<inventoryStep.bag.item.length;i++){
    bag=inventoryStep.bag;
    item=bag.item[i].name;
    icon=bag.item[i].icon;
    savedItem=JSON.parse(localStorage.getItem(item));
    if(savedItem==true){
      document.getElementById('items').innerHTML += "<div id='item" + i + "' class='boxItem' onclick=\"selectedItem='" + i + "',doShowDescription()\">"+ icon + "</div>";
    }
  }
  if(currentStage>=2){
    areaStep.areas[1].locked=true;
    areaStep.areas[2].locked=true;
    areaStep.areas[3].locked=true;
  }
  if(currentStage==3){
    document.getElementById("scenery").style.opacity="1";
    vueScenery.url=sceneryStep.sceneries[0].url;
    localStorage.setItem('savedCharacter',null);
    currentStage=2;
  }
  if(currentStage>=4){
    areaStep.areas[3].presentCharacter=3;
    areaStep.areas[3].locked=false;
  }
  if(currentCharacter!=-1){
    currentCharacter=JSON.parse(localStorage.getItem('savedCharacter'));
    doShowCharacter();
  }
  setTimeout(function(){
    document.getElementById('blackScreen').style.opacity="0";
  },1500);
}
function doQuit(){
  location.reload();
}

function doTalk(){
  doCloseMap();
  doCloseBag();
  dialog=talkStep.dialogs[currentDialog];
  document.getElementById("HUD").style.marginTop="-100%";
  document.getElementById("dialogSentence").innerHTML="";
  document.getElementById("dialogButtonBox").innerHTML="";
  document.getElementById("buttonBox").style.display="none";
  document.getElementById("buttonBox").innerHTML="";
  if(dialog.tag==true){
    currentCharacter=dialog.whoID;
    character=characterStep.characters[currentCharacter];
    document.getElementById(character.img).style.pointerEvents="none";
    document.getElementById(character.img).style.transform="translateX(25%)";
    document.getElementById("dialogText").style.borderRadius="0 .5vw .5vw .5vw";
    document.getElementById("dialogName").style.display="block";
    if(dialog.showName==true){
      document.getElementById("dialogName").innerHTML=dialog.who;
    }
    else{
      document.getElementById("dialogName").innerHTML="???";
    }
  }
  else{
    document.getElementById("dialogText").style.borderRadius=".5vw .5vw .5vw .5vw";
    document.getElementById("dialogName").style.display="none";
    document.getElementById("dialogName").innerHTML="";
  }
  document.getElementById("dialog").style.display="block";
  sfx_blipmale.play();
  speechtext= dialog.sentences[currentSentence].text;
  new Typed('#dialogSentence',{
    strings:[speechtext],
    typeSpeed:dialog.sentences[currentSentence].speed,
    showCursor:false,
    onTypingPaused(){sfx_blipmale.stop();},
    onTypingResumed(){sfx_blipmale.play();},
    onComplete(){
      sfx_blipmale.stop();
      if(currentSentence==(dialog.sentences.length-1)){
        for(i=0;i<dialog.actions.length;i++){
          if(talkStep.dialogs[currentDialog].actions[i].choice!=null){
            document.getElementById("buttonBox").style.display="block";
            document.getElementById("buttonBox").innerHTML += "<button id=\"button\" onclick=\"selectedAction=" + i + ",doAction(" + i + ")\">" + dialog.actions[i].choice + "</button>";
          }
          else{
            document.getElementById("dialogButtonBox").innerHTML += "<i id=\"nextButton\" class=\"fas fa-caret-right\"onclick=\"selectedAction=" + i + ",doAction(" + i + ")\"></i>";
          }
        }
      }
      else{
        document.getElementById("dialogButtonBox").innerHTML += "<i id=\"nextButton\" class=\"fas fa-caret-right\" onclick=\"doTalk()\"></i>";
      }
      if(dialog.sentences[currentSentence].skip!=null){
        setTimeout(function(){
          currentSentence++;
          document.getElementById("nextButton").click();
        },dialog.sentences[currentSentence].skip);
      }
      else{
        currentSentence++;
      }
    }
  });
}
function doAction(selectedAction){
  dialog=talkStep.dialogs[currentDialog];
  action=dialog.actions[selectedAction];
  currentStage=action.nextStage;
  currentDialog=action.nextDialog;
  currentSentence=0;
  if(action.nextStage!=null){
    doNextStage();
  }
  if(action.fadeIn!=null){
    doFadeIn();
  }
  if(action.fadeOut!=null){
    doFadeOut();
  }
  if(action.showCharacter!=null){
    currentCharacter=action.showCharacter;
    doShowCharacter();
  }
  if(action.hideCharacter!=null){
    doHideCharacter();
  }
  if(action.changeCharacter!=null){
    currentCharacter=action.changeCharacter;
    doChangeCharacter();
  }
  if(action.showScenery!=null){
    doShowScenery();
  }
  if(action.hideScenery!=false){
    doHideScenery();
  }
  if(action.addItem!=null){
    currentItem=action.addItem;
    doAddItem();
  }
  if(action.removeItem!=null){
    doRemoveItem();
  }
  if(action.pause!=null){
    doPause();
  }
  else if(action.stopTalk!=false){
    doStopTalk();
  }
  else{
    doTalk();
  }
}

function doFadeIn(){
  document.getElementById("blackScreen").style.transition="1s";
  setTimeout(function(){
    document.getElementById("blackScreen").style.opacity="1";
  },action.fadeIn);
}
function doFadeOut(){
  document.getElementById("blackScreen").style.transition="1s";
  setTimeout(function(){
    document.getElementById("blackScreen").style.opacity="0";
  },action.fadeOut);
}
function doShowCharacter(){
  localStorage.setItem('savedCharacter',currentCharacter);
  character=characterStep.characters[currentCharacter];
  setTimeout(function(){
    if(character.isGhost==true){
      document.getElementById(character.img).style.pointerEvents="none";
      document.getElementById(character.img).style.opacity=".025";
    }
    else{
      document.getElementById(character.img).style.opacity="1";
    }
  },1000);
}
function doHideCharacter(){
  localStorage.setItem('savedCharacter',null);
  character=characterStep.characters[currentCharacter];
  document.getElementById(character.img).style.opacity="0";
  setTimeout(function(){
    document.getElementById(character.img).style.pointerEvents="none";
  },1000);
}
function doChangeCharacter(){
  document.getElementById(character.img).style.opacity="0";
  setTimeout(function(){
    document.getElementById(character.img).style.display="none";
    character=characterStep.characters[currentCharacter];
    document.getElementById(character.img).style.display="block";
  },1000);
  setTimeout(function(){
    document.getElementById(character.img).style.opacity="1";
  },1500);
}
function doShowScenery(){
  document.getElementById("blackScreen").style.transition=".5s";
  document.getElementById("blackScreen").style.opacity="1";
  setTimeout(function(){
    document.getElementById("scenery").style.opacity="1";
    vueScenery.url=sceneryStep.sceneries[action.showScenery].url;
  },525);
  setTimeout(function(){
    document.getElementById('blackScreen').style.opacity="0";
  },550);
}
function doHideScenery(){
  document.getElementById("blackScreen").style.transition=".5s";
  document.getElementById("blackScreen").style.opacity="1";
  setTimeout(function(){
    document.getElementById("scenery").style.opacity="0";
  },525);
  setTimeout(function(){
    document.getElementById('blackScreen').style.opacity="0";
  },550);
}
function doChangeArea(selectedArea){
  sfx_footsteps.play();
  document.getElementById('mapWindow').style.left="-100%";
  document.getElementById("blackScreen").style.transition=".5s";
  document.getElementById('blackScreen').style.opacity="1";
  currentArea=areaStep.areas[currentArea].canGoTo[selectedArea].nextArea;
  presentCharacter=areaStep.areas[currentArea].presentCharacter;
  setTimeout(function(){
    doCloseMap();
    vueArea.img=areaStep.areas[currentArea].img;
    localStorage.setItem('savedArea',currentArea);
    if(currentCharacter!=null){
      character=characterStep.characters[currentCharacter];
      document.getElementById(character.img).style.display="none";
    }
    if(presentCharacter!=null){
      currentCharacter=presentCharacter;
      character=characterStep.characters[currentCharacter];
      document.getElementById(character.img).style.display="block";
      if(characterStep.characters[currentCharacter].isGhost==true){
        if(maskOpened==1){
          document.getElementById(character.img).style.pointerEvents="auto";
          document.getElementById(character.img).style.opacity="1";
        }
        else{
          document.getElementById(character.img).style.pointerEvents="none";
          document.getElementById(character.img).style.opacity=".025";
        }
      }
      else{
        document.getElementById(character.img).style.pointerEvents="auto";
        document.getElementById(character.img).style.opacity="1";
      }
      localStorage.setItem('savedCharacter',currentCharacter);
    }
    else{
      localStorage.setItem('savedCharacter',null);
    }
  },1000);
  setTimeout(function(){
    document.getElementById('blackScreen').style.opacity="0";
  },2000);
  doCheckStage();
}
function doAddItem(){
  bag=inventoryStep.bag;
  item=bag.item[currentItem].name;
  icon=bag.item[currentItem].icon;
  document.getElementById('items').innerHTML += "<div id='item" + currentItem + "' onclick=\"selectedItem='" + currentItem + "',doShowDescription()\">"+ icon + "</div>";
  localStorage.setItem(item,true);
}
function doRemoveItem(){
  currentItem=action.removeItem;
  var remove=document.getElementById('item' + currentItem + '');
  remove.parentNode.removeChild(remove);
  localStorage.setItem(item,true);
}
function doPause(){
  document.getElementById("dialog").style.display="none";
  setTimeout(doTalk,action.pause);
}
function doStopTalk(){
  currentDialog=0;
  currentSentence=0;
  if(dialog.tag==true){
    character=characterStep.characters[currentCharacter];
    document.getElementById(character.img).style.transform="translateX(0)";
    document.getElementById(character.img).style.pointerEvents="auto";
  }
  document.getElementById("dialog").style.display="none";
  document.getElementById("HUD").style.marginTop="0";
  sfx_blipmale.stop();
  doCheckStage();
}

var mapOpened=0;
var bagOpened=0;
var maskOpened=0;
var phoneOpened=0;
function doOpenMap(){
  doCloseBag();
  doClosePhone();
  if(mapOpened==0){
    document.getElementById('mapWindow').innerHTML="";
    document.getElementById('mapWindow').style.left="0";
    for(i=0;i<areaStep.areas[currentArea].canGoTo.length;i++){
      if(areaStep.areas[areaStep.areas[currentArea].canGoTo[i].nextArea].locked==false){
        document.getElementById('mapWindow').innerHTML += "" + areaStep.areas[currentArea].canGoTo[i].area + "<img id='selectArea' onclick='doChangeArea(" + i + ")' src='" + areaStep.areas[currentArea].canGoTo[i].img + "'/>";
        document.getElementById('mapIcon').innerHTML='<img src="/img/opened-map.png"/>';
      }
      else{
        document.getElementById('mapIcon').innerHTML='<img src="/img/opened-map.png"/>';
        document.getElementById('mapWindow').innerHTML += "" + areaStep.areas[currentArea].canGoTo[i].area + "<img id='selectArea' onclick='sfx_locked_door.play(),currentDialog=" + areaStep.areas[currentArea].canGoTo[i].trigger + ",setTimeout(function(){doTalk()},2000)' src='" + areaStep.areas[currentArea].canGoTo[i].img + "'/>";
      }
    }
    mapOpened=1;
  }
  else{
    doCloseMap();
  }
}
function doCloseMap(){
  document.getElementById('mapWindow').style.left="-100%";
  hasMap=JSON.parse(localStorage.getItem('gotMap'));
  if(hasMap==true){
    document.getElementById('mapIcon').innerHTML='<img src="/img/closed-map.png"/>';
  }
  mapOpened=0;
}
function doOpenBag(){
  doCloseMap();
  doClosePhone();
  if(bagOpened==0){
    document.getElementById('description').innerHTML="";
    document.getElementById('bagWindow').style.bottom='0';
    document.getElementById('bagIcon').innerHTML='<img src="/img/opened-bag.png"/>';
    bagOpened=1;
  }
  else{
    doCloseBag();
  }
}
function doCloseBag(){
  document.getElementById('bagWindow').style.bottom='-100%';
  hasBag=JSON.parse(localStorage.getItem('gotBag'));
  if(hasBag==true){
    document.getElementById('bagIcon').innerHTML='<img src="/img/closed-bag.png"/>';
  }
  bagOpened=0;
}
function doShowDescription(){
  currentItem=selectedItem;
  icon=bag.item[currentItem].icon;
  description=bag.item[currentItem].description;
  document.getElementById('description').innerHTML=icon + description;
}
function doOpenMask(){
  if(maskOpened==0){
    document.getElementById("blackScreen").style.transition=".15s";
    document.getElementById('maskIcon').innerHTML='<img src="/img/opened-mask.png"/>';
    document.getElementById('blackScreen').style.opacity="1";
    setTimeout(function(){
      document.getElementById('mask').style.opacity="1";
      if(areaStep.areas[currentArea].presentCharacter!=null){
        character=characterStep.characters[currentCharacter];
        if(characterStep.characters[currentCharacter].isGhost==true){
          document.getElementById(character.img).style.pointerEvents="auto";
          document.getElementById(character.img).style.opacity="1";
        }
      }
    },175);
    setTimeout(function(){
      document.getElementById('blackScreen').style.opacity="0";
    },700);
    maskOpened=1;
  }
  else{
    doCloseMask();
  }
}
function doCloseMask(){
  document.getElementById("blackScreen").style.transition=".15s";
  hasMask=JSON.parse(localStorage.getItem('gotMask'));
  if(hasMask==1){
    document.getElementById('maskIcon').innerHTML='<img src="/img/closed-mask.png"/>';
  }
  document.getElementById('blackScreen').style.opacity="1";
  setTimeout(function(){
    document.getElementById('mask').style.opacity="0";
    if(areaStep.areas[currentArea].presentCharacter!=null){
      character=characterStep.characters[currentCharacter];
      if(characterStep.characters[currentCharacter].isGhost==true){
        document.getElementById(character.img).style.pointerEvents="none";
        document.getElementById(character.img).style.opacity=".025";
      }
    }
  },175);
  setTimeout(function(){
    document.getElementById('blackScreen').style.opacity="0";
  },700);
  maskOpened=0;
}
function doOpenPhone(){
  doCloseMap();
  doCloseBag();
  if(phoneOpened==0){
    document.getElementById('phoneWindow').style.right='1vw';
    document.getElementById('phoneIcon').innerHTML='<img src="/img/opened-phone.png"/>';
    phoneOpened=1;
  }
  else{
    doClosePhone();
  }
}
function doClosePhone(){
  document.getElementById('phoneWindow').style.right='-100%';
  hasPhone=JSON.parse(localStorage.getItem('gotPhone'));
  if(hasPhone==true){
    document.getElementById('phoneIcon').innerHTML='<img src="/img/closed-phone.png"/>';
  }
  phoneOpened=0;
}
function doCloseAll(){
  doCloseMap();
  doCloseBag();
  doClosePhone();
}

function doNextStage(){
  localStorage.setItem('savedStage',action.nextStage);
  if(action.nextStage==1){
    localStorage.setItem('gotMap',true);
    localStorage.setItem('gotPhone',true);
    document.getElementById('mapIcon').style.pointerEvents='auto';
    document.getElementById('phoneIcon').style.pointerEvents='auto';
    document.getElementById('mapIcon').innerHTML='<img src="/img/closed-map.png"/>';
    document.getElementById('phoneIcon').innerHTML='<img src="/img/closed-phone.png"/>';
  }
  if(action.nextStage==2){
    areaStep.areas[1].locked=true;
    areaStep.areas[2].locked=true;
    areaStep.areas[3].locked=true;
  }
  if(action.nextStage==4){
    areaStep.areas[3].presentCharacter=3;
    areaStep.areas[3].locked=false;
  }
}
function doCheckStage(){
  if(currentStage==1 && currentArea==9){
    setTimeout(function(){
      sfx_ambient_museum.fade(1,0,1000);
    },2000);
    setTimeout(function(){
      sfx_ambient_museum.stop();
      currentDialog=5;
      doTalk();
    },5000);
  }
  if(currentStage==2 && currentArea==12){
    setTimeout(function(){
      document.getElementById("scenery").style.opacity="1";
      vueScenery.url=sceneryStep.sceneries[0].url;
    },550);
  }
  if(currentStage==3 && currentArea==12){
    localStorage.setItem('savedCharacter',null);
    setTimeout(function(){
      currentDialog=6;
      doTalk();
    },1500);
  }
  if(currentStage==4 && currentArea==3){
    setTimeout(function(){
      currentDialog=10;
      doTalk();
    },3000);
  }
}

document.body.addEventListener('keyup', function(e) {
  if(e.keyCode==69||e.keyCode==39){
    document.getElementById("nextButton").click();
  }
  if(e.keyCode==77){
    doOpenMap();
  }
  if(e.keyCode==66){
    doOpenBag();
  }
  if(e.keyCode==70){
    doOpenMask();
  }
  if(e.keyCode==27){
    doOpenPhone();
  }
  // if(e.keyCode==123){
  //   location.href = 'https://youtu.be/dQw4w9WgXcQ';
  // }
});
