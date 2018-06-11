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
    <button id="manual" onclick="sfx_blip_select.play(),doShowManual()">MANUAL</button>
    <button id="credits" onclick="sfx_blip_select.play(),doShowCredits()">CREDITS</button>
    <img id="manualUrl" src="/img/manual.png"/>
    <img id="creditsUrl" src="/img/credits.png"/>
    <h1>"DONUT-QUEST"<br>PRE-ALPHA DEMO</h1>
    <button id="newGame" onclick="sfx_blip_select.play(),doNewGame()">NEW GAME</button>
    <button id="continue" onclick="sfx_blip_select.play(),doContinue()">CONTINUE</button>
    <h1>WORK IN PROGRESS</h1>
    <p>The current aspect is not definitive.<br>Elements such as areas, characters and sound effects will change and will be improved as the development progress.</p>
    <h1>GAME BY</h1>
    <div class="credits"><div>FLORIAN LUDOWICZ<a href="http://nehred.com/">NEHRED.COM</a><a href="http://cv.nehred.com/en-US/">CV.NEHRED.COM</a></div><div>JIMMY HENOCQ<a href="http://cv.henocq.fr/">CV.HENOCQ.FR</a></div></div>
  </section>

  <section id="blackScreen"></section>

  <section id="HUD">
    <vhud></vhud>
  </section>

  <section id="dialog">
    <vdialog></vdialog>
  </section>

  <section id="mask"><img src="/img/mask.png"></section>

  <section id="scenery" onclick="doCloseAll()">
    <div id="blackScreen02"></div>
    <img :src="url">
  </section>

  <section id="character">
    <vcharacter></vcharacter>
  </section>

  <section id="area" onclick="doCloseAll()">
    <div id="blackScreen03"></div>
    <img :src="url">
  </section>

  <script src="/js/libraries/howler.js"></script>
  <script src="/js/libraries/typed.js"></script>
  <script src="/js/libraries/vue.js"></script>
  <script src="/js/vue/components.js"></script>
  <script src="/js/script.js"></script>
</body>
</html>
