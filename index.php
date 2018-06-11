<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'/>
  <link rel="stylesheet" href="/css/fontawesome-all.css">
  <link rel="stylesheet" href="/css/style.css">
  <title>Donut-Quest</title>
</head>
<body onload="doLoad()">

  <section id="homeScreen">
    <h1>"DONUT-QUEST"<br>DEMO</h1>
    <button id="newGame" onclick="sfx_blip_select.play(),doNewGame()">NEW GAME</button>
    <button id="continue" onclick="sfx_blip_select.play(),doContinue()">CONTINUE</button>
    <h1>WORK IN PROGRESS</h1>
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
          <a onclick="doQuit()">QUIT GAME</a>
        </div>
      </div>
  </section>

  <section id="dialog">
    <div class="vue">
      <div id="buttonBoxLeft"></div>
      <div id="dialogBox">
        <div id="dialogName"></div>
        <div id="dialogText">
          <div id="dialogSentence"></div>
          <div id="dialogButtonBox"></div>
        </div>
      </div>
      <div id="buttonBoxRight"></div>
    </div>
  </section>

  <section id="mask"><img src="/img/mask.png"></section>

  <section id="scenery" onclick="doCloseAll()">
    <div id="blackScreen02"></div>
    <img :src="url">
  </section>

  <section id="character">
    <!-- <characters></characters> -->
    <div class="vue">
      <div></div>
      <div id="characterBox">
        <img id="tomStageXX" src="/img/template.png"/>
        <img id="terrilStageXX" src="/img/terril.png"/>
        <img id="djarStageXX" src="/img/template.png"/>
        <img id="sphinxStageXX" src="/img/sphinx.png"/>
        <img id="sphinxStage05" src="/img/sphinx.png" onclick="currentDialog=23,doTalk()"/>
        <img id="sphinxStage06" src="/img/sphinx.png" onclick="currentDialog=36,doTalk()"/>
      </div>
    </div>
  </section>

  <section id="area" onclick="doCloseAll()">
    <div id="blackScreen03"></div>
    <img :src="img">
  </section>

  <script src="/js/libraries/howler.js"></script>
  <script src="/js/libraries/typed.js"></script>
  <script src="/js/libraries/vue.js"></script>
  <script src="/js/vue/components.js"></script>
  <script src="/js/script.js"></script>
</body>
</html>
