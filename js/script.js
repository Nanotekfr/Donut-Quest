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
fetch('/js/json/dialogs.json')
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

var sfx_blipmale=new Howl({
  src:['../audio/sfx_blipmale.wav'],
  volume:.25,
  loop:true
});
var sfx_blipfemale=new Howl({
  src:['../audio/sfx_blipfemale.wav'],
  volume:.25,
  loop:true
});
var sfx_ambient_museum=new Howl({
  src:['../audio/sfx_ambient_museum.wav'],
  volume:0,
  loop:true,
  onplay:function(){
    sfx_ambient_museum.fade(0,1,1000);
  }
});
var sfx_locked_door=new Howl({
  src:['../audio/sfx_locked_door.wav'],
  volume:1
});
var sfx_footsteps=new Howl({
  src:['../audio/sfx_footsteps.wav'],
  volume:.25
});

var currentCharacter=localStorage.getItem('savedCharacter');
var currentStage=localStorage.getItem('savedStage');
var currentArea=localStorage.getItem('savedArea');
var currentSentence=0;
var selectedAction=0;
var currentDialog=0;
var currentItem=0;

function doNewGame(){
  localStorage.setItem('savedStage',0);
  localStorage.setItem('savedArea',10);
  localStorage.setItem('savedCharacter','null');
  localStorage.setItem('gotMap','false');
  localStorage.setItem('gotBag','false');
  localStorage.setItem('gotMask','false');
  localStorage.setItem('gotPhone','false');
  for(i=0;i<inventoryStep.bag.item.length;i++){
    bag=inventoryStep.bag;
    item=bag.item[i].name;
    localStorage.setItem(item,0);
  }
  currentStage=localStorage.getItem('savedStage');
  currentArea=localStorage.getItem('savedArea');
  currentCharacter=localStorage.getItem('savedCharacter');
  vueArea.img=areaStep.areas[currentArea].img;
  document.getElementById("HUD").style.marginTop="0";
  sfx_ambient_museum.play();
  setTimeout(function(){
    currentDialog=2;
    doTalk();
  },5000);
}
function doContinue(){
  currentStage=localStorage.getItem('savedStage');
  currentArea=localStorage.getItem('savedArea');
  vueArea.img=areaStep.areas[currentArea].img;
  if(localStorage.getItem('gotMap')=='true'){
    document.getElementById('mapIcon').innerHTML='<img src="/img/closed-map.png"/>';
  }
  if(localStorage.getItem('gotBag')=='true'){
    document.getElementById('bagIcon').innerHTML='<img src="/img/closed-bag.png"/>';
  }
  if(localStorage.getItem('gotMask')=='true'){
    document.getElementById('maskIcon').innerHTML='<img src="/img/closed-mask.png"/>';
  }
  if(localStorage.getItem('gotPhone')=='true'){
    document.getElementById('phoneIcon').innerHTML='<img src="/img/closed-phone.png"/>';
  }
  document.getElementById("HUD").style.marginTop="0";
  for(i=0;i<inventoryStep.bag.item.length;i++){
    bag=inventoryStep.bag;
    item=bag.item[i].name;
    icon=bag.item[i].icon;
    savedItem=localStorage.getItem(item);
    if(savedItem==1){
      document.getElementById('items').innerHTML += "<div id='item" + i + "' class='boxItem' onclick=\"selectedItem='" + i + "',doShowDescription()\">"+ icon + "</div>";
    }
  }
  if(currentStage>=2){
    areaStep.areas[1].locked='true';
    areaStep.areas[2].locked='true';
    areaStep.areas[3].locked='true';
  }
  if(currentStage==3){
    currentStage=2;
  }
  if(currentStage>=4){
    areaStep.areas[3].locked='false';
  }
  if(currentCharacter!='null'){
    currentCharacter=localStorage.getItem('savedCharacter');
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
  document.getElementById("dialogButton").innerHTML="";
  if(dialog.tag=='true'){
    currentCharacter=dialog.whoID;
    character=characterStep.characters[currentCharacter];
    document.getElementById(character.img).style.pointerEvents="none";
    document.getElementById(character.img).style.transform="translateX(25%)";
    document.getElementById("dialogName").style.display="block";
    if(dialog.showName=='true'){
      document.getElementById("dialogName").innerHTML=dialog.who;
    }
    else{
      document.getElementById("dialogName").innerHTML="???";
    }
  }
  else{
    document.getElementById("dialogName").style.display="none";
    document.getElementById("dialogName").innerHTML="";
  }
  document.getElementById("dialog").style.display="block";
  sfx_blipmale.play();
  speechtext= dialog.sentences[currentSentence].text;
  new Typed('#dialogSentence',{
    strings:[speechtext],
    typeSpeed:15,
    showCursor:false,
    onComplete(){
      sfx_blipmale.stop();
      if(currentSentence==(dialog.sentences.length-1)){
        for(i=0;i<dialog.actions.length;i++){
           document.getElementById("dialogButton").innerHTML += "<a id=\"button\" onclick=\"selectedAction=" + i + ",doAction(" + i + ")\">" + dialog.actions[i].text + "</a>"
        }
      }
      else{
        currentSentence++;
        document.getElementById("dialogButton").innerHTML += "<i id=\"button\" class=\"fas fa-caret-right\" onclick=\"doTalk()\"></i>";
      }
    }
  });
}
function doAction(selectedAction){
  dialog=talkStep.dialogs[currentDialog];
  action=dialog.actions[selectedAction];
  currentStage=action.nextStage;
  currentDialog=action.nextStep;
  currentSentence=0;
  if(typeof(action.nextStage)!="undefined"){
    doNextStage();
  }
  if(typeof(action.fade)!="undefined"){
    doFade();
  }
  if(typeof(action.showCharacter)!="undefined"){
    currentCharacter=action.showCharacter;
    doShowCharacter();
  }
  if(typeof(action.hideCharacter)!="undefined"){
    doHideCharacter();
  }
  if(typeof(action.changeCharacter)!="undefined"){
    currentCharacter=action.changeCharacter;
    doChangeCharacter();
  }
  if(typeof(action.addItem)!="undefined"){
    currentItem=action.addItem;
    doAddItem();
  }
  if(typeof(action.removeItem)!="undefined"){
    doRemoveItem();
  }
  if(typeof(action.hideDialogBox)!="undefined"){
    doHideDialogBox();
  }
  if(typeof(action.pause)!="undefined"){
    doPause();
  }
  else if(typeof(action.stopTalk)!="undefined"){
    doStopTalk();
  }
  else{
    doTalk();
  }
}

function doFade(){
  document.getElementById("blackScreen").style.transition="1s";
  if(action.fade=="in"){
    setTimeout(function(){
      document.getElementById("blackScreen").style.opacity="0";
    },action.fadeTime);
  }
}
function doShowCharacter(){
  localStorage.setItem('savedCharacter',currentCharacter);
  character=characterStep.characters[currentCharacter];
  setTimeout(function(){
    if(character.isGhost==1){
      document.getElementById(character.img).style.pointerEvents="none";
      document.getElementById(character.img).style.opacity=".025";
    }
    else{
      document.getElementById(character.img).style.opacity="1";
    }
  },1000);
}
function doHideCharacter(){
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
function doChangeArea(selectedArea){
  sfx_footsteps.play();
  document.getElementById("blackScreen").style.transition=".5s";
  document.getElementById('mapWindow').style.left="-100%";
  document.getElementById('blackScreen').style.opacity="1";
  currentArea=areaStep.areas[currentArea].canGoTo[selectedArea].nextArea;
  presentCharacter=areaStep.areas[currentArea].presentCharacter;
  setTimeout(function(){
    doCloseMap();
    vueArea.img=areaStep.areas[currentArea].img;
    localStorage.setItem('savedArea',currentArea);
    if(currentCharacter!='null'){
      character=characterStep.characters[currentCharacter];
      document.getElementById(character.img).style.display="none";
    }
    if(presentCharacter!='null'){
      currentCharacter=presentCharacter;
      character=characterStep.characters[currentCharacter];
      document.getElementById(character.img).style.display="block";
      if(characterStep.characters[currentCharacter].isGhost==1){
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
      localStorage.setItem('savedCharacter','null');
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
  localStorage.setItem(item,1);
}
function doRemoveItem(){
  currentItem=action.removeItem;
  var remove=document.getElementById('item' + currentItem + '');
  remove.parentNode.removeChild(remove);
  localStorage.setItem(item,'false');
}
function doHideDialogBox(){
  document.getElementById("dialog").style.display="none";

}
function doPause(){
  setTimeout(doTalk,action.pauseTime);
}
function doStopTalk(){
  currentDialog=0;
  currentSentence=0;
  if(dialog.tag=='true'){
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
      if(areaStep.areas[areaStep.areas[currentArea].canGoTo[i].nextArea].locked=='false'){
        document.getElementById('mapWindow').innerHTML += "" + areaStep.areas[currentArea].canGoTo[i].area + "<img id='selectArea' onclick='doChangeArea(" + i + ")' src='" + areaStep.areas[currentArea].canGoTo[i].img + "'/>";
        document.getElementById('mapIcon').innerHTML='<img src="/img/opened-map.png"/>';
      }
      else{
        document.getElementById('mapIcon').innerHTML='<img src="/img/opened-map.png"/>';
        if(areaStep.areas[areaStep.areas[currentArea].canGoTo[i].nextArea].check=='true'){
          document.getElementById('mapWindow').innerHTML += "" + areaStep.areas[currentArea].canGoTo[i].area + "<img id='selectArea' onclick='sfx_locked_door.play(),currentDialog=1,setTimeout(function(){doTalk()},2000)' src='" + areaStep.areas[currentArea].canGoTo[i].img + "'/>";
        }
        else{
          document.getElementById('mapWindow').innerHTML += "" + areaStep.areas[currentArea].canGoTo[i].area + "<img id='selectArea' onclick='sfx_locked_door.play(),currentDialog=0,setTimeout(function(){doTalk()},1000)' src='" + areaStep.areas[currentArea].canGoTo[i].img + "'/>";
        }
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
  hasMap=localStorage.getItem('gotMap');
  if(hasMap=='true'){
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
  hasBag=localStorage.getItem('gotBag');
  if(hasBag=='true'){
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
  hasPhone=localStorage.getItem('gotPhone');
  if(hasPhone=='true'){
    document.getElementById('phoneIcon').innerHTML='<img src="/img/closed-phone.png"/>';
  }
  phoneOpened=0;
}
function doOpenMask(){
  if(maskOpened==0){
    document.getElementById("blackScreen").style.transition=".15s";
    document.getElementById('maskIcon').innerHTML='<img src="/img/opened-mask.png"/>';
    document.getElementById('blackScreen').style.opacity="1";
    setTimeout(function(){
      document.getElementById('mask').style.opacity="1";
      if(areaStep.areas[currentArea].presentCharacter!='null'){
        character=characterStep.characters[currentCharacter];
        if(characterStep.characters[currentCharacter].isGhost==1){
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
  hasMask=localStorage.getItem('gotMask');
  if(hasMask=='true'){
    document.getElementById('maskIcon').innerHTML='<img src="/img/closed-mask.png"/>';
  }
  document.getElementById('blackScreen').style.opacity="1";
  setTimeout(function(){
    document.getElementById('mask').style.opacity="0";
    if(areaStep.areas[currentArea].presentCharacter!='null'){
      character=characterStep.characters[currentCharacter];
      if(characterStep.characters[currentCharacter].isGhost==1){
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
function doCloseAll(){
  doCloseMap();
  doCloseBag();
  doClosePhone();
}

function doNextStage(){
  localStorage.setItem('savedStage',action.nextStage);
  if(action.nextStage==1){
    localStorage.setItem('gotMap','true');
    document.getElementById('mapIcon').innerHTML='<img src="/img/closed-map.png"/>'
  }
  if(action.nextStage==2){
    areaStep.areas[1].locked='true';
    areaStep.areas[2].locked='true';
    areaStep.areas[3].locked='true';
  }
  if(action.nextStage==4){
    localStorage.setItem('savedCharacter','null');
    areaStep.areas[3].locked='false';
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
  if(currentStage==3 && currentArea==12){
    localStorage.setItem('savedCharacter','null');
    setTimeout(function(){
      currentDialog=6;
      doTalk();
    },1500);
  }
  if(currentStage==4 && currentArea==3){
    areaStep.areas[3].presentCharacter=3;
    setTimeout(function(){
      currentDialog=9;
      doTalk();
    },3000);
  }
}
