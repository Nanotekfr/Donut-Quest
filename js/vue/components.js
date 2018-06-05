Vue.component('hud', {
  template:`
  <div class="vue">
    <div id="icons">
      <div id="mapIcon" onclick="doOpenMap()"><img src="/img/closed-map.png"/></div>
      <div id="bagIcon" onclick="doOpenBag()"></div>
      <div id="maskIcon" onclick="doOpenMask()"></div>
      <div id="phoneIcon" onclick="doOpenPhone()"><img src="/img/closed-phone.png"/></div>
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
    </div>`
});
Vue.component('characters', {
  template:`
  <div class="vue">
    <div></div>
    <div id="characterBox">
      <img id="tomStageXX" src="/img/character-homer.png" onclick="currentDialog=14,doTalk()"/>
      <img id="terrilStage03" src="/img/character-homer.png" onclick="currentDialog=11,doTalk()"/>
      <img id="djarStageXX" src="/img/character-marge.png" onclick="currentDialog=4,doTalk()"/>
    </div>
  </div>`
});

var vueHUD = new Vue({
  el: '#HUD'
});
var vueDialog = new Vue({
  el: '#dialog'
});
var vueCharacter = new Vue({
  el: '#character'
});
var vueArea = new Vue({
  el: '#area',
  data: {
    img: '',
  }
});
