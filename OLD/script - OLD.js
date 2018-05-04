var i = 0;
var count = 0;
var text = '';
var selectedtext = '';

var sfx_blipfemale = new Audio('../audio/sfx_blipfemale.wav');
var sfx_blipmale = new Audio('../audio/sfx_blipmale.wav');

var ned_fake = document.getElementById('ned_fake');
var ned_name = document.getElementById('ned_name');
var ned = document.getElementById('ned');

var ned_greetings_bis = document.getElementById('ned_greetings_bis');
var ned_greetings = document.getElementById('ned_greetings');

var ned_bart_bis_button = document.getElementById('ned_bart_bis_button');
var ned_bart_button = document.getElementById('ned_bart_button');
var ned_bart_reply = document.getElementById('ned_bart_reply');

var ned_homer_yes_end_button = document.getElementById('ned_homer_yes_end_button');
var ned_homer_no_end_button = document.getElementById('ned_homer_no_end_button');
var ned_homer_donut_button = document.getElementById('ned_homer_donut_button');
var ned_homer_bis_button = document.getElementById('ned_homer_bis_button');
var ned_homer_yes_button = document.getElementById('ned_homer_yes_button');
var ned_homer_no_button = document.getElementById('ned_homer_no_button');
var ned_homer_reply_yes = document.getElementById('ned_homer_reply_yes');
var ned_homer_reply_no = document.getElementById('ned_homer_reply_no');
var ned_homer_button = document.getElementById('ned_homer_button');
var ned_homer_reply = document.getElementById('ned_homer_reply');
var ned_homer_donut = document.getElementById('ned_homer_donut');

var ned_bye_bis_button = document.getElementById('ned_bye_bis_button');
var ned_bye_button = document.getElementById('ned_bye_button');
var ned_bye_reply = document.getElementById('ned_bye_reply');

var ned_end_dialog_button = document.getElementById('ned_end_dialog_button');

var donutimg = document.getElementById('donutimg');

//0

var ned_greetings_speech = ["Hi diddly ho neighborinos! How may I help you?"];
function nedChangeClass() {
  ned.classList.add('hidden');
  ned_fake.classList.remove('hidden');
  ned_name.classList.remove('hidden');

  ned_greetings.classList.remove('hidden');
  selectedtext = ned_greetings_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(nedChangeClass, 0);
  sfx_blipmale.play();
  document.getElementById('ned_greetings_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    ned_homer_button.classList.remove('hidden');

    ned_bart_button.classList.remove('hidden');

    ned_bye_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var ned_greetings_bis_speech = ["Now what can I ding dong diddly do for you?"];
function bisChangeClass() {
  ned_name.classList.remove('hidden');

  ned_homer_reply_yes.classList.add('hidden');
  ned_homer_reply_no.classList.add('hidden');
  ned_homer_reply.classList.add('hidden');
  ned_homer_donut.classList.add('hidden');
  ned_homer_yes_end_button.classList.add('hidden');

  ned_bart_bis_button.classList.add('hidden');
  ned_bart_reply.classList.add('hidden');
  ned_bart_button.classList.add('hidden');
  ned_bart_end_button.classList.add('hidden');

  ned_greetings_bis.classList.remove('hidden');

  donutimg.classList.add('hidden');
  selectedtext = ned_greetings_bis_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(bisChangeClass, 0025);
  sfx_blipmale.play();
  document.getElementById('ned_greetings_bis_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    ned_homer_bis_button.classList.remove('hidden');

    ned_bart_bis_button.classList.remove('hidden');

    ned_bye_bis_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var ned_homer_reply_speech = ["Homer Simpson, I show him pity, and how does he repay me? With a kick in the kididdlehopper!"];
function homerChangeClass() {
  ned_greetings.classList.add('hidden');
  ned_greetings_bis.classList.add('hidden');

  ned_homer_button.classList.add('hidden');
  ned_homer_bis_button.classList.add('hidden');
  ned_homer_reply.classList.remove('hidden');

  ned_bart_button.classList.add('hidden');
  ned_bart_bis_button.classList.add('hidden');

  ned_bye_button.classList.add('hidden');
  ned_bye_bis_button.classList.add('hidden');
  selectedtext = ned_homer_reply_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(homerChangeClass, 0025);
  sfx_blipmale.play();
  document.getElementById('ned_homer_reply_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    ned_homer_next_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var ned_homer_reply_next_speech = ["Oh by he way, I have this donut for him, could you give it to him for me?"];
function homernextChangeClass() {
  ned_homer_reply.classList.add('hidden');
  ned_homer_next_button.classList.add('hidden');
  ned_homer_reply_next.classList.remove('hidden');
  selectedtext = ned_homer_reply_next_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(homernextChangeClass, 0025);
  sfx_blipmale.play();
  document.getElementById('ned_homer_reply_next_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    ned_homer_yes_button.classList.remove('hidden');
    ned_homer_no_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var ned_homer_reply_no_speech = ["Oh, nevermind then..."];
function homernoChangeClass() {
  ned_homer_yes_button.classList.add('hidden');
  ned_homer_no_button.classList.add('hidden');
  ned_homer_reply_next.classList.add('hidden');
  ned_homer_reply_no.classList.remove('hidden');
  selectedtext = ned_homer_reply_no_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(homernoChangeClass, 0025);
  sfx_blipmale.play();
  document.getElementById('ned_homer_reply_no_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    ned_homer_no_end_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var ned_homer_reply_yes_speech = ["Great, here take it! Thanks a lot!"];
function homeryesChangeClass() {
  ned_homer_yes_button.classList.add('hidden');
  ned_homer_no_button.classList.add('hidden');
  ned_homer_reply_next.classList.add('hidden');
  ned_homer_reply_yes.classList.remove('hidden');
  selectedtext = ned_homer_reply_yes_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(homeryesChangeClass, 0025);
  sfx_blipmale.play();
  document.getElementById('ned_homer_reply_yes_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    ned_homer_donut_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0
var ned_homer_donut_prompt = ["You're received a DONUT"];
function donutChangeClass() {
  ned_name.classList.add('hidden');

  ned_homer_donut_button.classList.add('hidden');
  ned_homer_reply_yes.classList.add('hidden');
  ned_homer_donut.classList.remove('hidden');
  document.getElementById('ned_homer_donut_prompt').innerHTML = ned_homer_donut_prompt;
  ned_homer_yes_end_button.classList.remove('hidden');
  donutimg.classList.remove('hidden');
  localStorage.setItem('donut', '1');
}

//0

var ned_bart_reply_speech = ["Bart Simpson? Why, he lives right next door to me. Yeah, when they made him, they did not skimp on the puppy dog tails."];
function bartChangeClass() {
  ned_greetings.classList.add('hidden');
  ned_greetings_bis.classList.add('hidden');

  ned_homer_button.classList.add('hidden');
  ned_homer_bis_button.classList.add('hidden');

  ned_bart_button.classList.add('hidden');
  ned_bart_bis_button.classList.add('hidden');
  ned_bart_reply.classList.remove('hidden');

  ned_bye_button.classList.add('hidden');
  ned_bye_bis_button.classList.add('hidden');
  selectedtext = ned_bart_reply_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(bartChangeClass, 0025);
  sfx_blipmale.play();
  document.getElementById('ned_bart_reply_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    ned_bart_end_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var ned_bye_reply_speech = ["When you meet Jesus, be sure to call him Mr. Christ!"];
function byeChangeClass() {
  ned_greetings.classList.add('hidden');
  ned_greetings_bis.classList.add('hidden');

  ned_homer_button.classList.add('hidden');
  ned_homer_bis_button.classList.add('hidden');

  ned_bart_button.classList.add('hidden');
  ned_bart_bis_button.classList.add('hidden');

  ned_bye_button.classList.add('hidden');
  ned_bye_reply.classList.remove('hidden');
  selectedtext = ned_bye_reply_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(byeChangeClass, 0025);
  sfx_blipmale.play();
  document.getElementById('ned_bye_reply_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    ned_end_dialog_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

function endChangeClass() {
  ned_homer_yes_end_button.classList.add('hidden');
  ned_end_dialog_button.classList.add('hidden');
  ned_homer_donut.classList.add('hidden');
  ned_bye_reply.classList.add('hidden');
  ned_name.classList.add('hidden');
  ned_fake.classList.add('hidden');
  donutimg.classList.add('hidden');
  ned.classList.remove('hidden');
}
