// var talkJSON = `{
//   "id":1,
//   "sentences":[{"id":1,"text":"Hello World!"},{"id":2,"text":"How are you?"}],
//   "actions":[{"id":1,"text":"I'm fine","nextStep":-1},{"id":2,"text":"Bad...", "nextStep":1}]
// }`;
//
// function talk() {
//   var dialogs = JSON.parse(talkJSON);
//   console.log(dialogs);
//   console.log("sentences:");
//   console.log(dialogs.sentences);
//   for (sentence of dialogs.sentences) {
//     console.log(sentence);
//     document.getElementById("dialog").innerHTML += sentence.text;
//   }
//   console.log("actions:");
//   console.log(dialogs.actions);
//   for (action of dialogs.actions) {
//     console.log(action);
//     document.getElementById("dialog").innerHTML += "<button>" + action.text + "</button>";
//   }
// }

var sfx_blipfemale = new Audio('../audio/sfx_blipfemale.wav');
var sfx_blipmale = new Audio('../audio/sfx_blipmale.wav');
var i = 0;
var x = 0;

var talkJSON = `{
  "id":1,
  "sentences":[{"id":0,"text":"Hello World!"},{"id":1,"text":"How are you?"}],
  "actions":[{"id":0,"text":">","nextStep":-1},{"id":1,"text":"I'm fine","nextStep":-1},{"id":2,"text":"Bad...", "nextStep":1}]
}`;

function talk() {
  var dialogs = JSON.parse(talkJSON);
  var sentence = dialogs.sentences;
  var button = dialogs.actions;
  speechtext = sentence[x].text;
  if (i < speechtext.length) {
    setTimeout(talk, 50);
    sfx_blipmale.play();
    document.getElementById("dialog").innerHTML += speechtext.charAt(i);
    ++i;
  } else if (i === speechtext.length || x === 0) {
    i = 0;
    document.getElementById("button").innerHTML += "<br>" + "<button onclick=\"next()\">" + button[0].text + "</button>";
  } else if (i === speechtext.length || x === 1) {
    i = 0;
    document.getElementById("button").innerHTML += "<br>" + "<button onclick=\"next()\">" + button[1].text + "</button>" + "<button onclick=\"next()\">" + button[2].text + "</button>";
  }
}

function next() {
  ++x;
  document.getElementById("dialog").innerHTML = "";
  document.getElementById("button").innerHTML = "";
  setTimeout(talk, 50);
}
