dialog {
  dialogs:[
    {id:1,sentences:[{id:1,text:"Hello World!"},{id:2,text:"How are you?"}],
    actions:[{id:1,text:"I'm fine",nextStep:-1},{id:1,text:"Bad...", nextStep:1}]}]
  }

var dialog = JSON.parse("dialog");

for sentence of dialogs.sentences {
  document.getElementById("dialog")innerHTML = dialog.dialogs.sentences[0].text;
  next
}
for sentence of dialogs.actions {
  document.getElementById("dialog")innerHTML = dialog.dialogs.actions[0].text;
  next
}
