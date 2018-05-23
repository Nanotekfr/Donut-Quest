<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Donut Quest</title>
  <link rel="stylesheet" href="/css/fontawesome-all.css">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body onload="start()">

  <section id="blackScreen">
  </section>

  <section id="areaBox">
    <img class="area-image" :src="img">
  </section>

  <section id="characterBox">
    <characters></characters>
  </section>

  <section id="HUD">
    <hud></hud>
  </section>

  <section id="dialogBox" class="dialog hidden">
    <div id="characterNameBox" class="dialog-character-name hidden"></div>
    <div class="dialog-box">
      <div id="divSentence" class="dialog-textarea"></div>
      <div id="divButton" class="dialog-button-box"></div>
    </div>
  </section>

  <script src="/js/libraries/howler.js"></script>
  <script src="/js/libraries/typed.js"></script>
  <script src="/js/libraries/vue.js"></script>
  <script src="/js/vue/components.js"></script>
  <script src="/js/script.js"></script>
</body>
</html>
