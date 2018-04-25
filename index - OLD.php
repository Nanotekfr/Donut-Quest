<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <section class="character-box">
    <img id="ned" class="character-image" onclick="nedChangeClass()" src="img/ned_flanders.png" alt="#">
    <img id="ned_fake" class="character-image fake hidden" src="img/ned_flanders.png" alt="#">
  </section>

  <section class="dialog">
    <div id="ned_name" class="dialog-character-name hidden">Ned Flanders</div>
    <div id="ned_greetings" class="dialog-box hidden">
      <div id="ned_greetings_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_homer_button" class="dialog-button hidden" onclick="homerChangeClass()">Homer</a>
        <a id="ned_bart_button" class="dialog-button hidden" onclick="bartChangeClass()">Bart</a>
        <a id="ned_bye_button" class="dialog-button hidden" onclick="byeChangeClass()">Bye</a>
      </div>
    </div>

    <div id="ned_greetings_bis" class="dialog-box hidden">
      <div id="ned_greetings_bis_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_homer_bis_button" class="dialog-button hidden" onclick="homerChangeClass()">Homer</a>
        <a id="ned_bart_bis_button" class="dialog-button hidden" onclick="bartChangeClass()">Bart</a>
        <a id="ned_bye_bis_button" class="dialog-button hidden" onclick="byeChangeClass()">Bye</a>
      </div>
    </div>

    <div id="ned_bart_reply" class="dialog-box hidden">
      <div id="ned_bart_reply_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_bart_end_button" class="dialog-button hidden" onclick="bisChangeClass()">OK</a>
      </div>
    </div>

    <div id="ned_homer_reply" class="dialog-box hidden">
      <div id="ned_homer_reply_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_homer_next_button" class="dialog-button hidden" onclick="homernextChangeClass()">></a>
      </div>
    </div>

    <div id="ned_homer_reply_next" class="dialog-box hidden">
      <div id="ned_homer_reply_next_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_homer_yes_button" class="dialog-button hidden" onclick="homeryesChangeClass()">ACCEPT</a>
        <a id="ned_homer_no_button" class="dialog-button hidden" onclick="homernoChangeClass()">REFUSE</a>
      </div>
    </div>

    <div id="ned_homer_reply_yes" class="dialog-box hidden">
      <div id="ned_homer_reply_yes_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_homer_donut_button" class="dialog-button hidden" onclick="donutChangeClass()">></a>
      </div>
    </div>

    <div id="ned_homer_donut" class="dialog-box hidden">
      <div id="ned_homer_donut_prompt" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_homer_yes_end_button" class="dialog-button hidden" onclick="endChangeClass()">OK</a>
      </div>
    </div>

    <div id="ned_homer_reply_no" class="dialog-box hidden">
      <div id="ned_homer_reply_no_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_homer_no_end_button" class="dialog-button hidden" onclick="bisChangeClass()">OK</a>
      </div>
    </div>

    <div id="ned_bye_reply" class="dialog-box hidden">
      <div id="ned_bye_reply_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="ned_end_dialog_button" class="dialog-button hidden" onclick="endChangeClass()">Ok</a>
      </div>
    </div>
  </section>

  <a href="kitchen.php">Go To Kitchen</a>
  <img id="donutimg" class="donutimg hidden" src="img/donut.png">

  <script src="js/script.js"></script>

</body>
</html>
