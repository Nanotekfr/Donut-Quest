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
<body onload="document.getElementById('buttonStart').style.display='block'">
  <section id="load">
    <div class="vue">
      <audio src="/audio/sfx_ambient_museum.wav"/>
      <audio src="/audio/sfx_blipfemale.wav"/>
      <audio src="/audio/sfx_blipmale.wav"/>
      <audio src="/audio/sfx_footsteps.wav"/>
      <audio src="/audio/sfx_locked_door.wav"/>
      <img src="/img/a1.png"alt="fileToLoad"/>
      <img src="/img/a2.png"alt="fileToLoad"/>
      <img src="/img/a3.png"alt="fileToLoad"/>
      <img src="/img/a4.png"alt="fileToLoad"/>
      <img src="/img/a5.png"alt="fileToLoad"/>
      <img src="/img/a6.png"alt="fileToLoad"/>
      <img src="/img/a7.png"alt="fileToLoad"/>
      <img src="/img/a8.png"alt="fileToLoad"/>
      <img src="/img/a9.png"alt="fileToLoad"/>
      <img src="/img/closed-bag.png"alt="fileToLoad"/>
      <img src="/img/closed-map.png"alt="fileToLoad"/>
      <img src="/img/closed-mask.png"alt="fileToLoad"/>
      <img src="/img/closed-phone.png"alt="fileToLoad"/>
      <img src="/img/denim.png"alt="fileToLoad"/>
      <img src="/img/mask.png"alt="fileToLoad"/>
      <img src="/img/opened-bag.png"alt="fileToLoad"/>
      <img src="/img/opened-map.png"alt="fileToLoad"/>
      <img src="/img/opened-mask.png"alt="fileToLoad"/>
      <img src="/img/opened-phone.png"alt="fileToLoad"/>
      <img src="/img/phone.png"alt="fileToLoad"/>
      <img src="/img/template.png"alt="fileToLoad"/>
      <img src="/img/terril.png"alt="fileToLoad"/>
    </div>
  </section>

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
          <div id="dialogButtonBox"></div>
        </div>
      </div>
      <div></div>
      <div></div>
      <div id="buttonBox">
      </div>
    </div>
  </section>

  <section id="mask"><img src="/img/mask.png"></section>

  <section id="character">
    <!-- <characters></characters> -->
    <div class="vue">
      <div></div>
      <div id="characterBox">
        <img id="tomStageXX" src="" onclick="currentDialog=14,doTalk()"/>
        <img id="terrilStage03" src="/img/terril.png" onclick="currentDialog=11,doTalk()"/>
        <img id="djarStageXX" src="" onclick="currentDialog=4,doTalk()"/>
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
