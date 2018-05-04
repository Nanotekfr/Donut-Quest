var sfx_blipmale = new Howl({
  src: ['../audio/sfx_blipmale.wav'],
  volume: 0.25,
  loop: true
  });
var sfx_blipfemale = new Howl({
  src: ['../audio/sfx_blipfemale.wav'],
  volume: 0.25,
  loop: true
  });

var area = new Vue({
  el: '#areaBox',
  data: {
    areaURL: '',
  }
});
var character = new Vue({
  el: '#characterBox',
  data: {
    characterURL: '',
  }
});

var areaJSON = {
  "names":[
    {"id":1,"text":"outside"},
    {"id":2,"text":"kitchen"}
  ],
  "imgLinks":[
    {"id":1,"url":"../img/area_outside.png"},
    {"id":2,"url":"../img/area_kitchen.png"}
  ]
};
var characterJSON = {
  "names":[
    {"id":1,"text":"Homer Simpson"},
    {"id":2,"text":"Marge Simpson"}
  ],
  "imgLinks":[
    {"id":1,"url":"../img/character_homer.png"},
    {"id":2,"url":"../img/character_marge.png"}
  ]
};
var talkJSON = {
  "id": 1,
  "dialogs": [
    {
      "id":1,
      "sentences":[
        {"id":1,"text":"We should see a black screen there, right?"}
      ],
      "actions":[
        {"id":1,"text":"YES","nextStep":1},
        {"id":2,"text":"NOPE","nextStep":-1}
      ]
    },
    {
      "id":2,
      "sentences":[
        {"id":1,"text":"Great! Now let's go outside!"}
      ],
      "actions":[
        {"id":1,"text":"OK","nextStep":2,"hideDialogBox":true,"changeArea":0,"pause":true,"time":3000}
      ]
    },
    {
      "id":3,
      "sentences":[
        {"id":1,"text":"Smell that fresh air? Now let's go inside!"},
        {"id":2,"text":"Wait, looks like someone is coming your way..."}
      ],
      "actions":[
        {"id":1,"text":"NEXT","nextStep":3,"hideDialogBox":true,"pause":true,"changeCharacter":1,"time":3000}
      ]
    },
    {
      "id":4,
      "sentences":[
        {"id":1,"text":"Hey, that's Marge Simpson, your neighbor!"},
        {"id":2,"text":"Why not introduce yourself?"},
        {"id":3,"text":"Just click on her to start a conversation."}
      ],
      "actions":[
        {"id":1,"text":"OK","nextStep":-1}
      ]
    },
    {
      "id":5,
      "sentences":[
        {"id":1,"text":"Oh hi there neighbor, what can I do for you?"}
      ],
      "actions":[
        {"id":1,"text":"HOMER","nextStep": 5},
        {"id":2,"text":"BART","nextStep": 8},
        {"id":3,"text":"NOTHING","nextStep": 9}
      ]
    },
    {
      "id":6,
      "sentences":[
        {"id":1,"text":"HOMER, he's been out all night... again!"},
        {"id":2,"text":"By the way. I have this BOX OF DONUTS."},
        {"id":3,"text":"Could you give it to him? That way you two could meet each other!"}
      ],
      "actions":[
        {"id":1,"text":"ACCEPT","nextStep": 6,"addItem":"donut"},
        {"id":2,"text":"REFUSE","nextStep": 7}
      ]
    },
    {
      "id":7,
      "sentences":[
        {"id":1,"text":"Great, thank you!"},
        {"id":2,"text":"He should be in the KITCHEN, come in! The door's open."}
      ],
      "actions":[
        {"id":1,"text":"END","nextStep": -1}
      ]
    },
    {
      "id":8,
      "sentences":[
        {"id":1,"text":"Oh alright, nevermind then."}
      ],
      "actions":[
        {"id":1,"text":"NEXT","nextStep": 10}
      ]
    },
    {
      "id":9,
      "sentences":[
        {"id":1,"text":"BART lost his shorts last week, he said some guy ate them..."},
        {"id":2,"text":"If someone did eat BART’s shorts they’d have a tummy-full of pocket garbage."}
      ],
      "actions":[
        {"id":1,"text":"NEXT","nextStep": 10}
      ]
    },
    {
      "id":10,
      "sentences":[
        {"id":1,"text":"Ok then, have a nice day!"}
      ],
      "actions":[
        {"id":1,"text":"END","nextStep": -1}
      ]
    },
    {
      "id":11,
      "sentences":[
        {"id":1,"text":"Anything else?"}
      ],
      "actions":[
        {"id":1,"text":"HOMER","nextStep": 5},
        {"id":2,"text":"BART","nextStep": 8},
        {"id":3,"text":"NOTHING","nextStep": 9}
      ]
    }
  ]
};

var currentArea = 0;
var currentCharacter = 0;
var currentDialog = 0;
var currentSentence = 0;
var areaStep = areaJSON;
var characterStep = characterJSON;
var talkStep = talkJSON;

document.addEventListener("DOMContentLoaded", function() {
  localStorage.setItem('pageIsLoaded', '0');
  pageIsLoaded = localStorage.getItem('pageIsLoaded');
  if (pageIsLoaded == 0) {
    setTimeout(function() {
      doTalk();
      localStorage.setItem('pageIsLoaded', '1');
    }, 2000);
  }
});

function doTalk() {
  var dialog = talkStep.dialogs[currentDialog];
  document.getElementById("div_sentence").innerHTML = "";
  document.getElementById("div_button").innerHTML = "";
  dialogBox.classList.remove('hidden');
  sfx_blipmale.play();
  if (currentDialog == -1) {
    currentDialog = 0;
    currentSentence = 0;
    dialogBox.classList.add('hidden');
    sfx_blipmale.stop();
  }
  speechtext = dialog.sentences[currentSentence].text;
  new Typed('#div_sentence', {
    strings: [speechtext],
    typeSpeed: 0,
    showCursor: false,
    onComplete() {
      sfx_blipmale.stop();
      if (currentSentence == (dialog.sentences.length-1)) {
        for (i=0;i < dialog.actions.length;i++) {
           document.getElementById("div_button").innerHTML += "<a class=\"dialog-button\" onclick=\"doAction(" + i + ")\">" + dialog.actions[i].text + "</a>"
        }
      }
      else {
        currentSentence++;
        document.getElementById("div_button").innerHTML += "<i class=\"fas fa-caret-right dialog-button-arrow\" onclick=\"doTalk()\"></i>";
      }
    }
  });
}

function doAction(actionIndex) {
  var dialog=talkStep.dialogs[currentDialog];
  action=dialog.actions[actionIndex];
  currentSentence=0;
  currentDialog=action.nextStep;
  currentArea=action.changeArea;
  currentCharacter=action.changeCharacter;
  if (typeof(action.changeArea) != "undefined") {
    doChangeArea();
  }
  if (typeof(action.hideCharacter) != "undefined") {
    doHideCharacter();
  }
  if (typeof(action.changeCharacter) != "undefined") {
    doChangeCharacter();
  }
  if (typeof(action.showCharacter) != "undefined") {
    doShowCharacter();
  }
  if (typeof(action.hideDialogBox) != "undefined") {
    doHideDialogBox();
  }
  if (typeof(action.pause) != "undefined") {
    doPause();
  }
  else {
    doTalk();
  }
}

function doChangeArea() {
  document.querySelector('.area-image').style.opacity = "0";
  setTimeout(function(){
    var areaIMG = areaStep.imgLinks[currentArea];
    area.areaURL = areaIMG.url;
  }, 1000);
  setTimeout(function(){
    document.querySelector('.area-image').style.opacity = "1";
  }, 2000);
}
function doHideCharacter() {
  document.querySelector('.character-image').style.opacity = "0";
}
function doShowCharacter() {
  document.querySelector('.character-image').style.opacity = "1";
}
function doChangeCharacter() {
  document.querySelector('.character-image').style.opacity = "0";
  setTimeout(function(){
    var characterIMG = characterStep.imgLinks[currentCharacter];
    character.characterURL = characterIMG.url;
  }, 1000);
  setTimeout(function(){
    document.querySelector('.character-image').style.opacity = "1";
  }, 2000);
}
function doHideDialogBox() {
  dialogBox.classList.add('hidden');
}
function doPause() {
  duration = action.time;
  setTimeout(doTalk, duration);
}
