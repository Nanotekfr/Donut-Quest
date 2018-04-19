<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/style_kitchen.css">
</head>
<body>
  <section class="character-box">
    <img id="homer" class="character-image" onclick="homerChangeClass()" src="img/homer_simpson.png" alt="#">
    <img id="homer_fake" class="character-image fake hidden" src="img/homer_simpson.png" alt="#">
    <img id="homer_donut" class="character-image fake hidden" src="img/homer_simpson_donut.png" alt="#">
    <img id="homer_donut_fake" class="character-image fake hidden" src="img/homer_simpson_donut.png" alt="#">
  </section>

  <section class="dialog">
    <div id="homer_name" class="dialog-character-name hidden">Homer Simpson</div>
    <div id="homer_greetings" class="dialog-box hidden">
      <div id="homer_greetings_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="homer_donut_button" class="dialog-button hidden" onclick="donutChangeClass()">Donut</a>
        <a id="homer_bart_button" class="dialog-button hidden" onclick="bartChangeClass()">Bart</a>
        <a id="homer_bye_button" class="dialog-button hidden" onclick="byeChangeClass()">Bye</a>
      </div>
    </div>

    <div id="homer_greetings_bis" class="dialog-box hidden">
      <div id="homer_greetings_bis_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="homer_donut_bis_button" class="dialog-button hidden" onclick="homerChangeClass()">Donut</a>
        <a id="homer_bart_bis_button" class="dialog-button hidden" onclick="bartChangeClass()">Bart</a>
        <a id="homer_bye_bis_button" class="dialog-button hidden" onclick="byeChangeClass()">Bye</a>
      </div>
    </div>

    <div id="homer_bart_reply" class="dialog-box hidden">
      <div id="homer_bart_reply_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="homer_bart_end_button" class="dialog-button hidden" onclick="bisChangeClass()">OK</a>
      </div>
    </div>

    <div id="homer_donut_reply" class="dialog-box hidden">
      <div id="homer_donut_reply_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="homer_donut_end_button" class="dialog-button hidden" onclick="bisChangeClass()">OK</a>
      </div>
    </div>

    <div id="homer_bye_reply" class="dialog-box hidden">
      <div id="homer_bye_reply_speech" class="dialog-textarea"></div>
      <div class="dialog-button-box">
        <a id="homer_end_dialog_button" class="dialog-button hidden" onclick="endChangeClass()">Fin</a>
      </div>
    </div>
  </section>

<a href="index.php">Go Outside</a>

  <script src="js/script.js"></script>
  <script src="js/script_kitchen.js"></script>

</body>
</html>
