<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Donut Quest</title>
  <link rel="stylesheet" href="css/fontawesome-all.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <section id="areaBox">
    <img class="area-image" :src="areaURL">
  </section>

  <section id="characterBox">
    <img class="character-image" onclick="doTalk()" :src="characterURL">
  </section>

  <section id="dialogBox" class="dialog hidden">
    <div id="margeNameBox" class="dialog-character-name hidden">Marge Simpson</div>
    <div class="dialog-box">
      <div id="div_sentence" class="dialog-textarea"></div>
      <div id="div_button" class="dialog-button-box"></div>
    </div>
  </section>

  <script src="js/howler.min.js"></script>
  <script src="js/typed.min.js"></script>
  <script src="js/vue.min.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
