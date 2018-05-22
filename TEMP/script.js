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
// Vue.component('marge', {
//   template: "<img src='/img/character-marge.png' class='character-image' onclick='currentDialog=4,doTalk()'/>"
// });
// Vue.component('homer', {
//   template: "<img src='/img/character-homer.png' class='character-image' onclick='currentDialog=4,doTalk()'/>"
// });
// var vueCharacter = new Vue({
//   el: '#characterBox'
// });

const homerSimpson = {
  template: "<img src='/img/character-homer.png' class='character-image' onclick='currentDialog=4,doTalk()'/>",
};
const margeSimpson = {
  template: "<img src='/img/character-marge.png' class='character-image' onclick='currentDialog=4,doTalk()'/>",
};

var areaJSON = {
  areas:[
    {
      id:1,
      name:"STREET",
      img:"../img/area-outside.png",
      canGoTo:[
        {id:1,area:"KITCHEN",nextArea:1},
        {id:2,area:"LIVING ROOM",nextArea:2},
        {id:3,area:"GARDEN",nextArea:3}
      ],
      presentCharacter:-1
    },
    {
      id:2,
      name:"KITCHEN",
      img:"../img/area-kitchen.png",
      canGoTo:[
        {id:1,area:"LIVING ROOM",nextArea:2},
        {id:2,area:"STREET",nextArea:0}
      ],
      presentCharacter:-1
    },
    {
      id:3,
      name:"LIVING ROOM",
      img:"../img/area-living-room.png",
      canGoTo:[
        {id:1,area:"KITCHEN",nextArea:1},
        {id:2,area:"STREET",nextArea:0}
      ],
      presentCharacter:-1
    },
    {
      id:4,
      name:"GARDEN",
      img:"../img/area-garden.png",
      canGoTo:[
        {id:2,area:"STREET",nextArea:0}
      ],
      presentCharacter:-1
    }
  ]
};
var characterJSON = {
  characters:[
    {id:1,name:"Homer Simpson",img:homerSimpson},
    {id:2,name:"Marge Simpson",img:margeSimpson}
  ]
};
var talkJSON = {
  dialogs: [
    {
      id:1,
      sentences:[
        {id:1,text:"<mark>What are you doing in the <mark class='bis'>KITCHEN</mark>? Let's go outside!</mark>"}
      ],
      actions:[
        {id:1,text:"OK",nextStep:1},
        {id:2,text:"NOPE",stopTalk:true}
      ]
    },
    {
      id:2,
      sentences:[
        {id:1,text:"<mark>Great! Come on then!</mark>"},
        {id:2,text:"<mark>Click on the map to go to another location.</mark>"}
      ],
      actions:[
        {id:1,text:"NEXT",stopTalk:true,nextStage:1}
      ]
    },
    {
      id:3,
      sentences:[
        {id:1,text:"</mark><mark>Smell that fresh air? Don't you feel better?</mark>"},
        {id:2,text:"</mark><mark>Wait, looks like someone is coming your way...</mark>"}
      ],
      actions:[
        {id:1,text:"NEXT",nextStep:3,hideDialogBox:true,pause:true,showCharacter:1,time:3000}
      ]
    },
    {
      id:4,
      sentences:[
        {id:1,text:"<mark>Hey, that's <mark class='bis'>MARGE SIMPSON</mark>, your neighbor!</mark>"},
        {id:2,text:"<mark>Why not introduce yourself?</mark>"},
        {id:3,text:"<mark>Just click on her to start a conversation.</mark>"}
      ],
      actions:[
        {id:1,text:"OK",stopTalk:true,nextStage:2}
      ]
    },
    {
      id:5,
      sentences:[
        {id:1,text:"Oh hi there neighbor, what can I do for you?"}
      ],
      actions:[
        {id:1,text:"HOMER",nextStep:5},
        {id:2,text:"BART",nextStep:8},
        {id:3,text:"NOTHING",nextStep:9}
      ]
    },
    {
      id:6,
      sentences:[
        {id:1,text:"<mark class='bis'>HOMER</mark>, he's been out all night... again!"},
        {id:2,text:"By the way. I have this <mark class='bis'>BOX OF DONUTS</mark>."},
        {id:3,text:"Could you give it to him? That way you two could meet each other!"}
      ],
      actions:[
        {id:1,text:"ACCEPT",nextStep:6},
        {id:2,text:"REFUSE",nextStep:7}
      ]
    },
    {
      id:7,
      sentences:[
        {id:1,text:"Great, thank you!"},
        {id:2,text:"He should be in the <mark class='bis'>KITCHEN</mark>, come in! The door's open."}
      ],
      actions:[
        {id:1,text:"END",stopTalk:true,nextStage:3, addItem:0}
      ]
    },
    {
      id:8,
      sentences:[
        {id:1,text:"Oh alright, nevermind then."}
      ],
      actions:[
        {id:1,text:"NEXT",nextStep:10}
      ]
    },
    {
      id:9,
      sentences:[
        {id:1,text:"<mark class='bis'>BART</mark> lost his shorts last week, he said some guy ate them..."},
        {id:2,text:"If someone did eat BART’s shorts they’d have a tummy-full of pocket garbage."}
      ],
      actions:[
        {id:1,text:"NEXT",nextStep:10}
      ]
    },
    {
      id:10,
      sentences:[
        {id:1,text:"Ok then, have a nice day!"}
      ],
      actions:[
        {id:1,text:"END",stopTalk:true}
      ]
    },
    {
      id:11,
      sentences:[
        {id:1,text:"Anything else?"}
      ],
      actions:[
        {id:1,text:"HOMER",nextStep: 5},
        {id:2,text:"BART",nextStep: 8},
        {id:3,text:"NOTHING",nextStep: 9}
      ]
    }
  ]
};
var inventoryJSON = {
  "bag":{
    "item":[
      {
        "id":1,
        "name":"DONUTS",
        "description":"This is a fucking Donuts.",
        "price":5,
        "weight":0.2,},
      {
        "id":2,
        "name":"armor",
        "description":"This is an armor made of leather.",
        "price":300,
        "weight":50},
      {
        "id":3,
        "name":"shield",
        "description":"This is a shield made of iron.",
        "price":500,
        "weight":50},
      {
        "id":4,
        "name":"potion",
        "description":"Hell yeah ! This is a fucking potion fucking usefull ! Fuck !",
        "price":1000,
        "weight": 2}
    ]
  }
}

var currentStage = 0;
var currentItem = 0;
var currentArea = 1;
var currentCharacter = 0;
var currentDialog = 0;
var currentSentence = 0;
var selectedAction = 0;
var areaStep = areaJSON;
var characterStep = characterJSON;
var talkStep = talkJSON;
var containerD = document.getElementById('containerDescription');
var inventory = document.getElementById('Inventory');

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
  if (typeof(action.addItem) != "undefined") {
    doAddItem();
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
  document.getElementById('characterBox').innerHTML = "<div id='characterPlace'></div>";
  character = characterStep.characters[currentCharacter].img;
  characterCtor = Vue.extend(character);
  new characterCtor({
    }).$mount('#characterPlace');
  setTimeout(function() {
    document.querySelector('.character-image').style.opacity = "1";
  }, 1000);
}
function doHideCharacter() {
  document.querySelector('.character-image').style.opacity = "0";
}
function doChangeCharacter() {
  document.querySelector('.character-image').style.opacity = "0";
  setTimeout(function() {
    document.getElementById('characterBox').innerHTML = "<div id='characterPlace'></div>";
    character = characterStep.characters[currentCharacter].img;
    characterCtor = Vue.extend(character);
    new characterCtor({
    }).$mount('#characterPlace');
  }, 1000);
  setTimeout(function() {
    document.querySelector('.character-image').style.opacity = "1";
  }, 1500);
}
function doSelectArea() {
  document.getElementById("map").innerHTML = "";
  for (i=0;i < areaStep.areas[currentArea].canGoTo.length;i++) {
    document.getElementById("map").innerHTML += "<a class=\"dialog-button\" onclick=\"doChangeArea(" + i + ")\">" + areaStep.areas[currentArea].canGoTo[i].area + "</a>"
  }
}
function doChangeArea(selectedArea) {
  document.getElementById("map").innerHTML = "";
  document.getElementById('blackScreen').style.opacity = "1";
  currentArea=areaStep.areas[currentArea].canGoTo[selectedArea].nextArea;
  presentCharacter=areaStep.areas[currentArea].presentCharacter;
  setTimeout(function() {
    vueArea.img=areaStep.areas[currentArea].img;
    if (presentCharacter != -1) {
      currentCharacter=presentCharacter;
      character=characterStep.characters[currentCharacter].img;
      characterCtor=Vue.extend(character);
      new characterCtor({
      }).$mount('#characterPlace');
      document.querySelector('.character-image').style.opacity = "1";
    }
    else {
      document.getElementById('characterBox').innerHTML = "<div id='characterPlace'></div>";
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

function doAddItem() {
  currentItem = action.addItem;
  bag=inventoryJSON.bag;
  item=bag.item[currentItem].name;
  inventory.innerHTML += "<div id='item" + currentItem + "' class='boxItem' onclick=\"selectedItem='" + currentItem + "', addDescription()\">"+ item + "</div>";
}

function addDescription() {
  currentItem = selectedItem;
  description=bag.item[currentItem].description;
  containerD.innerHTML = "<div id='item" + currentItem + "'>"+ description + "</div>";
  document.getElementById('containerDescription').style.display = 'flex';
}

function removeItem() {
  currentItem = selectedItem;
  var remove = document.getElementById('item' + currentItem + '');
  remove.parentNode.removeChild(remove);
}

function openBag() {
  document.getElementById('closedBag').style.display = 'none';
  document.getElementById('openedBag').style.display = 'flex';
  document.getElementById('containerInventory').style.display = 'flex';
}
function closeBag() {
  document.getElementById('containerInventory').style.display = 'none';
  document.getElementById('containerDescription').style.display = 'none';
  document.getElementById('closedBag').style.display = 'flex';
  document.getElementById('openedBag').style.display = 'none';
  containerD.innerHTML = "";
}
