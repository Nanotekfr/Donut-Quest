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

var talkJSON = `{
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
    {"id":1,"text":"Homer","nextStep": 1},
    {"id":2,"text":"Bart","nextStep": 4},
    {"id":3,"text":"Nothing","nextStep": 5}]
  }
]
}`;

var currentDialog = 0;
var currentSentence = 0;
var step = JSON.parse(talkJSON);

function talk() {
  var dialog = step.dialogs[currentDialog];
  document.getElementById("div_dialog").innerHTML = "";
  document.getElementById("div_button").innerHTML = "";
  margeTalk.classList.add('hidden');
  margeFake.classList.remove('hidden');
  dialogBox.classList.remove('hidden');
  sfx_blipfemale.play();
  if (currentDialog == -1) {
    currentDialog = 0;
    currentSentence = 0;
    margeTalk.classList.remove('hidden');
    margeFake.classList.add('hidden');
    dialogBox.classList.add('hidden');
    sfx_blipfemale.stop();
  }
  speechtext = dialog.sentences[currentSentence].text;
  new Typed('#div_dialog', {
    strings: [speechtext],
    typeSpeed: 0,
    showCursor: false,
    onComplete: function talk() {
      sfx_blipfemale.stop();
      if (currentSentence == (dialog.sentences.length-1)) {
        for (var i=0;i < dialog.actions.length;i++) {
          document.getElementById("div_button").innerHTML += "<a class=\"dialog-button\" onclick=\"currentSentence=0; currentDialog=" + dialog.actions[i].nextStep + "; talk()\">" + dialog.actions[i].text + "</a>"
        }
      }
      else {
        currentSentence++;
        document.getElementById("div_button").innerHTML += "<a class=\"dialog-button-arrow\" onclick=\"talk()\"> > </a>";
      }
    }
  });
}
