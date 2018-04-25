<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <section class="character-box">
    <img id="margeTalk" class="character-image" onclick="talk()" src="img/ned_flanders.png" alt="Picture of Ned Flanders from The Simpsons">
    <img id="margeFake" class="character-image fake hidden" src="img/ned_flanders.png" alt="Picture of Ned Flanders from The Simpsons">
  </section>

  <section id="dialogBox" class="dialog hidden">
    <div id="ned_name" class="dialog-character-name">Marge Simpson</div>
    <div class="dialog-box">
      <div id="div_dialog" class="dialog-textarea"></div>
      <div id="div_button" class="dialog-button-box"></div>
    </div>
  </section>

  <script src="js/howler.min.js"></script>
  <script src="js/typed.min.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
