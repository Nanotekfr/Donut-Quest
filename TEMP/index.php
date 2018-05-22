<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Donut Quest</title>
  <link rel="stylesheet" href="css/fontawesome-all.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body onload="start()">

  <section id="blackScreen">
  </section>

  <section id="areaBox">
    <img class="area-image" :src="img">
  </section>


<section id="HUD">
  <button onclick="doSelectArea()">MAP</button>
  <button onclick="openBag()" id="closedBag">BAG</button>
  <button onclick="closeBag()" id="openedBag">BAG</button>
  <div id="map"></div>
  <div id="containerInventory">
    <div id="Inventory">
    </div>
    <div id="containerDescription">
    </div>
  </div>
</section>

  <section id="characterBox">
    <div id="characterPlace"></div>
  </section>

  <section id="dialogBox" class="dialog hidden">
    <div id="characterNameBox" class="dialog-character-name hidden"></div>
    <div class="dialog-box">
      <div id="divSentence" class="dialog-textarea"></div>
      <div id="divButton" class="dialog-button-box"></div>
    </div>
  </section>

  <!-- <script src="/js/json/characters.json"></script>
  <script src="/js/json/dialogs.json"></script>
  <script src="/js/json/areas.json"></script> -->
  <script src="/js/libraries/howler.min.js"></script>
  <script src="/js/libraries/axios.min.js"></script>
  <script src="/js/libraries/typed.min.js"></script>
  <script src="/js/libraries/vue.min.js"></script>
  <script src="/js/script.js"></script>
</body>
</html>
