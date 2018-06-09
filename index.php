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
    <h1>"DONUT-QUEST"</h1>
    <button id="newGame" onclick="doNewGame()">NEW GAME</button>
    <button id="continue" onclick="doContinue()">CONTINUE</button>
    <h1>WORK IN PROGRESS<br>GAME UNDER DEVELOPMENT</h1>
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
    <img :src="url">
  </section>

  <section id="character">
    <!-- <characters></characters> -->
    <div class="vue">
      <div></div>
      <div id="characterBox">
        <img id="tomStageXX" src="/img/template.png" onclick=""/>
        <img id="terrilStage03" src="/img/terril.png" onclick="currentDialog=11,doTalk()"/>
        <img id="djarStageXX" src="/img/template.png" onclick=""/>
        <img id="sphinxStage05" src="/img/template.png" onclick="currentDialog=23,doTalk()"/>
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
