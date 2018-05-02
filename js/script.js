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
var startJSON = `{
"id": 1,
"dialogs": [
  {
  "id":1,
  "sentences":[
    {"id":1,"text":"We should see a black screen there, right?"}],
  "actions":[
    {"id":1,"text":"YES","nextStep":1},
    {"id":2,"text":"NOPE","nextStep":-1}]
  },
  {
  "id":2,
  "sentences":[
    {"id":1,"text":"Great! Now let's go outside!"}],
  "actions":[
    {"id":1,"text":"OK","nextStep":2}]
  },
  {
  "id":3
  },
  {
  "id":4,
  "sentences":[
    {"id":1,"text":"Smell that fresh air? Now let's go inside!"},
    {"id":2,"text":"Wait, looks like someone is coming your way..."}],
  "actions":[
    {"id":1,"text":"NEXT","nextStep":4}]
  },
  {
  "id":5
  },
  {
  "id":6,
  "sentences":[
    {"id":1,"text":"Hey, that's Marge Simpson, your neighbor!"},
    {"id":2,"text":"Why not introduce yourself?"},
    {"id":3,"text":"Just click on her to start a conversation."}],
  "actions":[
    {"id":1,"text":"OK","nextStep":6}]
  },
  {
  "id":6
  }]
}`;
var MargeJSON = `{
"id": 1,
"dialogs": [
  {
  "id":1,
  "sentences":[
    {"id":1,"text":"Oh hi there neighbor, what can I do for you?"}],
  "actions":[
    {"id":1,"text":"HOMER","nextStep": 1},
    {"id":2,"text":"BART","nextStep": 4},
    {"id":3,"text":"NOTHING","nextStep": 5}]
  },
  {
  "id":2,
  "sentences":[
    {"id":1,"text":"HOMER, he's been out all night... again!"},
    {"id":2,"text":"By the way. I have this BOX OF DONUTS."},
    {"id":3,"text":"Could you give it to him? That way you two could meet each other!"}],
  "actions":[
    {"id":1,"text":"ACCEPT","nextStep": 2},
    {"id":2,"text":"REFUSE","nextStep": 3}]
  },
  {
  "id":3,
  "sentences":[
    {"id":1,"text":"Great, thank you!"},
    {"id":2,"text":"He should be in the KITCHEN, come in! The door's open."}],
  "actions":[
    {"id":1,"text":"END","nextStep": -1}]
  },
  {
  "id":4,
  "sentences":[
    {"id":1,"text":"Oh alright, nevermind then."}],
  "actions":[
    {"id":1,"text":"NEXT","nextStep": 6}]
  },
  {
  "id":5,
  "sentences":[
    {"id":1,"text":"BART lost his shorts last week, he said some guy ate them..."},
    {"id":2,"text":"If someone did eat BART’s shorts they’d have a tummy-full of pocket garbage."}],
  "actions":[
    {"id":1,"text":"NEXT","nextStep": 6}]
  },
  {
  "id":6,
  "sentences":[
    {"id":1,"text":"Ok then, have a nice day!"}],
  "actions":[
    {"id":1,"text":"END","nextStep": -1}]
  },
  {
  "id":7,
  "sentences":[
    {"id":1,"text":"Anything else?"}],
  "actions":[
    {"id":1,"text":"HOMER","nextStep": 1},
    {"id":2,"text":"BART","nextStep": 4},
    {"id":3,"text":"NOTHING","nextStep": 5}]
  }
]
}`;

var timeoutValue = 0;
var currentDialog = 0;
var currentSentence = 0;
var loadStep = JSON.parse(startJSON);
var margeStep = JSON.parse(MargeJSON);

document.addEventListener("DOMContentLoaded", function() {
  localStorage.setItem('pageIsLoaded', '0');
  pageIsLoaded = localStorage.getItem('pageIsLoaded');
  if (pageIsLoaded == 0) {
    setTimeout(function() {
      loadTalk.call();
      localStorage.setItem('pageIsLoaded', '1');
    }, 2000);
  }
});

function loadTalk() {
  var dialog = loadStep.dialogs[currentDialog];
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
  if (currentDialog == 2) {
    dialogBox.classList.add('hidden');
    document.getElementById("blackScreen").style.opacity = "0";
    document.getElementById("blackScreen").style.zIndex = "-1";
    sfx_blipmale.stop();
    currentDialog = 3;
    setTimeout(function() {
      dialogBox.classList.remove('hidden');
      loadTalk.call();
    }, 2000);
  }
  if (currentDialog == 4) {
    sfx_blipmale.stop();
    dialogBox.classList.add('hidden');
    currentDialog = 5;
    setTimeout(function() {
      document.getElementById("margeTalk").style.opacity = "1";
      document.getElementById("margeTalk").style.zIndex = "1";
    }, 500);
    setTimeout(function() {
      dialogBox.classList.remove('hidden');
      loadTalk.call();
    }, 2000);
  }
  if (currentDialog == 6) {
    sfx_blipmale.stop();
    dialogBox.classList.add('hidden');
    document.getElementById("margeTalk").style.pointerEvents = "visible";
    currentDialog = 0;
    currentSentence = 0;
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
          document.getElementById("div_button").innerHTML += "<a class=\"dialog-button\" onclick=\"currentSentence=0; currentDialog=" + dialog.actions[i].nextStep + "; loadTalk()\">" + dialog.actions[i].text + "</a>"
        }
      }
      else {
        currentSentence++;
        document.getElementById("div_button").innerHTML += "<i class=\"fas fa-caret-right dialog-button-arrow\" onclick=\"loadTalk()\"></i>";
      }
    }
  });
}

function talkToMarge() {
  var dialog = margeStep.dialogs[currentDialog];
  document.getElementById("div_sentence").innerHTML = "";
  document.getElementById("div_button").innerHTML = "";
  dialogBox.classList.remove('hidden');
  document.getElementById("margeNameBox").classList.remove('hidden');
  document.getElementById("margeTalk").style.pointerEvents = "none";
  sfx_blipfemale.play();
  if (currentDialog == -1) {
    currentDialog = 0;
    currentSentence = 0;
    dialogBox.classList.add('hidden');
    document.getElementById("margeTalk").style.pointerEvents = "visible";
    sfx_blipfemale.stop();
  }
  speechtext = dialog.sentences[currentSentence].text;
  new Typed('#div_sentence', {
    strings: [speechtext],
    typeSpeed: 0,
    showCursor: false,
    onComplete() {
      sfx_blipfemale.stop();
      if (currentSentence == (dialog.sentences.length-1)) {
        for (i=0;i < dialog.actions.length;i++) {
          document.getElementById("div_button").innerHTML += "<a class=\"dialog-button\" onclick=\"currentSentence=0; currentDialog=" + dialog.actions[i].nextStep + "; talkToMarge()\">" + dialog.actions[i].text + "</a>"
        }
      }
      else {
        currentSentence++;
        document.getElementById("div_button").innerHTML += "<i class=\"fas fa-caret-right dialog-button-arrow\" onclick=\"talkToMarge()\"></i>";
      }
    }
  });
}
