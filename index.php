<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'/>
  <link rel="stylesheet" href="/css/fontawesome-all.css">
  <link rel="stylesheet" href="/css/style.css">
  <title>Donut-Quest</title>
</head>
<body>
  <section id="buttonStart">
    <button class="game" onclick="doNewGame()">new game</button>
    <button class="game" onclick="doContinue()">continue</button>
    <button class="game" onclick="doQuit()">quit</button>
  </section>

  <section id="blackScreen"></section>

  <section id="HUD">
    <!-- <hud></hud> -->
    <div class="vue">
      <div id="icons">
        <div id="mapIcon" onclick="doOpenMap()"><img src="/img/closed-map.png"/></div>
        <div id="bagIcon" onclick="doOpenBag()"><img src="/img/closed-bag.png"/></div>
        <div id="talismanIcon" onclick="doTeleport()"></div>
        <div id="optionsIcon" onclick="doShowOptions()"></div>
      </div>
      <div id="mapWindow"></div>
      <div id="bagWindow">
        <div id="items"></div>
        <div id="description"></div>
      </div>
  </section>

  <section id="dialog">
    <div class="vue">
      <div></div>
      <div id="dialogBox">
        <div id="dialogName"></div>
        <div id="dialogText">
          <div id="dialogSentence"></div>
          <div id="dialogButton"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="character">
    <!-- <characters></characters> -->
    <div class="vue">
      <div></div>
      <div id="characterBox">
        <img id="homerSimpsonStage02" src="/img/character-homer.png" onclick="currentDialog=11,doTalk()"/>
        <img id="homerSimpsonStage03" src="/img/character-homer.png" onclick="currentDialog=14,doTalk()"/>
        <img id="margeSimpsonStage02" src="/img/character-marge.png" onclick="currentDialog=4,doTalk()"/>
        <img id="bartSimpsonStage04" src="/img/character-bart.png" onclick="currentDialog=14,doTalk()"/>
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
