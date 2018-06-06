<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'/>
  <meta name="mobile-web-app-capable" content="no">
  <link rel="stylesheet" href="/css/fontawesome-all.css">
  <link rel="stylesheet" href="/css/style.css">
  <title>Donut-Quest</title>
</head>
<body>
  <section id="buttonStart">
    <button onclick="doNewGame()">new game</button>
    <button onclick="doContinue()">continue</button>
  </section>

  <section id="blackScreen"></section>


  <section id="HUD">
    <!-- <hud></hud> -->
    <div class="vue">
      <div id="icons">
        <div id="mapIcon" onclick="doOpenMap()"></div>
        <div id="bagIcon" onclick="doOpenBag()"></div>
        <div id="maskIcon" onclick="doOpenMask()"></div>
        <div id="phoneIcon" onclick="doOpenPhone()"></div>
      </div>
      <div id="mapWindow"></div>
      <div id="bagWindow">
        <div id="items"></div>
        <div id="description"></div>
      </div>
      <div id="phoneWindow">
        <div id="screen">
          <a>EFFECTS VOLUME</a>
          <a>MUSIC VOLUME</a>
          <a onclick="doQuit()">QUIT GAME</a>
        </div>
      </div>
  </section>

  <section id="dialog">
    <div class="vue">
      <div></div>
      <div id="dialogBox">
        <div id="dialogName"></div>
        <div id="dialogText">
          <div id="dialogSentence"></div>
        </div>
      </div>
      <div></div>
      <div></div>
      <div id="dialogButton"></div>
    </div>
  </section>

  <section id="mask"><img src="/img/mask.png"></section>

  <section id="character">
    <!-- <characters></characters> -->
    <div class="vue">
      <div></div>
      <div id="characterBox">
        <img id="tomStageXX" src="/img/character-homer.png" onclick="currentDialog=14,doTalk()"/>
        <img id="terrilStage03" src="/img/terril.png" onclick="currentDialog=11,doTalk()"/>
        <img id="djarStageXX" src="/img/character-marge.png" onclick="currentDialog=4,doTalk()"/>
      </div>
    </div>
  </section>

  <section id="area" onclick="doCloseAll()">
    <img :src="img">
  </section>

  <script src="/js/libraries/howler.js"></script>
  <script src="/js/libraries/typed.js"></script>
  <script src="/js/libraries/vue.js"></script>
  <script src="/js/vue/components.js"></script>
  <script src="/js/script.js"></script>
</body>
</html>
