var talkJSON = `{
  "id":1,
  "sentences":[{"id":1,"text":"Hello World!"},{"id":2,"text":"How are you?"}],
  "actions":[{"id":1,"text":"I'm fine","nextStep":-1},{"id":1,"text":"Bad...", "nextStep":1}]
}`;

  function talk() {
  var dialogs = JSON.parse(talkJSON);
  console.log(dialogs);
  console.log("sentences:");
  console.log(dialogs.sentences);
  for (sentence of dialogs.sentences) {
    console.log(sentence);
    document.getElementById("dialog").innerHTML += sentence.text;
  }
  console.log("actions:");
  console.log(dialogs.actions);
  for (action of dialogs.actions) {
    console.log(action);
    document.getElementById("dialog").innerHTML += "<button>" + action.text + "</button>";
  }
}
