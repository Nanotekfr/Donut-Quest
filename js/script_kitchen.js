var i = 0;
var count = 0;
var text = '';
var selectedtext = '';

var sfx_blipmale = new Audio('../audio/sfx_blipmale.wav');
var sfx_blipfemale = new Audio('../audio/sfx_blipfemale.wav');

var homer = document.getElementById('homer');
var homer_fake = document.getElementById('homer_fake');
var homer_name = document.getElementById('homer_name');

var homer_greetings = document.getElementById('homer_greetings');
var homer_greetings_bis = document.getElementById('homer_greetings_bis');

var homer_bart_button = document.getElementById('homer_bart_button');
var homer_bart_bis_button = document.getElementById('homer_bart_bis_button');
var homer_bart_reply = document.getElementById('homer_bart_reply');

var homer_donut_button = document.getElementById('homer_donut_button');
var homer_donut_bis_button = document.getElementById('homer_donut_bis_button');
var homer_donut_reply = document.getElementById('homer_donut_reply');

var homer_bye_button = document.getElementById('homer_bye_button');
var homer_bye_bis_button = document.getElementById('homer_bye_bis_button');
var homer_bye_reply = document.getElementById('homer_bye_reply');

var homer_end_dialog_button = document.getElementById('homer_end_dialog_button');

//0

var homer_greetings_speech = ["Huuuuh... I'm hungry!"];
function homerChangeClass() {
  donut = localStorage.getItem('donut');
  homer.classList.add('hidden');
  homer_fake.classList.remove('hidden');
  homer_name.classList.remove('hidden');
  homer_greetings.classList.remove('hidden');
  selectedtext = homer_greetings_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(homerChangeClass, 25);
  sfx_blipmale.play();
  document.getElementById('homer_greetings_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    homer_bye_button.classList.remove('hidden');
    homer_bart_button.classList.remove('hidden');
    if (donut === '1') {
      homer_donut_button.classList.remove('hidden');
    } else {
      homer_donut_button.classList.add('hidden');
    }
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var homer_greetings_bis_speech = ["What now?"];
function bisChangeClass() {
  homer_greetings_bis.classList.remove('hidden');
  homer_bart_reply.classList.add('hidden');
  homer_donut_reply.classList.add('hidden');
  selectedtext = homer_greetings_bis_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(bisChangeClass, 25);
  sfx_blipmale.play();
  document.getElementById('homer_greetings_bis_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    homer_bye_bis_button.classList.remove('hidden');
    homer_donut_bis_button.classList.remove('hidden');
    homer_bart_bis_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var homer_bart_reply_speech = ["Bart, he's always saying butt-kisser like it's a bad thing!"];
function bartChangeClass() {
  homer_greetings.classList.add('hidden');
  homer_greetings_bis.classList.add('hidden');
  homer_bye_button.classList.add('hidden');
  homer_bart_button.classList.add('hidden');
  homer_donut_button.classList.add('hidden');
  homer_bart_reply.classList.remove('hidden');
  selectedtext = homer_bart_reply_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(bartChangeClass, 25);
  sfx_blipmale.play();
  document.getElementById('homer_bart_reply_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    homer_bart_end_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var homer_donut_reply_speech = ["God, I'm hungry!"];
function donutChangeClass() {
  homer_greetings.classList.add('hidden');
  homer_greetings_bis.classList.add('hidden');
  homer_bye_button.classList.add('hidden');
  homer_bart_button.classList.add('hidden');
  homer_donut_button.classList.add('hidden');
  homer_donut_reply.classList.remove('hidden');
  selectedtext = homer_donut_reply_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(donutChangeClass, 25);
  sfx_blipmale.play();
  document.getElementById('homer_donut_reply_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    homer_donut_end_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

var homer_bye_reply_speech = ["Donuts. Is there anything they can't do?"];
function byeChangeClass() {
  homer_greetings.classList.add('hidden');
  homer_greetings_bis.classList.add('hidden');
  homer_bye_button.classList.add('hidden');
  homer_donut_button.classList.add('hidden');
  homer_bart_button.classList.add('hidden');
  homer_bye_reply.classList.remove('hidden');
  selectedtext = homer_bye_reply_speech[count];
  text = selectedtext.slice(0, ++i);
  textspeed = setTimeout(byeChangeClass, 25);
  sfx_blipmale.play();
  document.getElementById('homer_bye_reply_speech').innerHTML = text;
  if (text.length === selectedtext.length) {
    homer_end_dialog_button.classList.remove('hidden');
    clearTimeout(textspeed);
    i = 0;
  }
}

//0

function endChangeClass() {
  homer_end_dialog_button.classList.add('hidden');
  homer_bye_reply.classList.add('hidden');
  homer_name.classList.add('hidden');
  homer_fake.classList.add('hidden');
  homer.classList.remove('hidden');
}
