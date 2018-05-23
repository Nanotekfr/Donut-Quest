Vue.component('hud', {
  template:`
  <div class="hud-box">
    <div class="hud-icons">
      <div id="mapIcon" onclick="doSelectArea()"><img src="/img/closed-map.png"/></div>
      <div id="bagIcon" onclick="doOpenBag()"><img src="/img/closed-bag.png"/></div>
    </div>
    <div class="hud-windows">
      <div id="map"></div>
      <div id="inventory">
        <div id="items"></div>
        <div id="description"></div>
      </div>
    </div>
  </div>`
});
var vueHUD = new Vue({
  el: '#HUD'
});

var vueArea = new Vue({
  el: '#areaBox',
  data: {
    img: '',
  }
});

Vue.component('characters', {
  template:`
  <div>
    <img id="homerSimpson" src="/img/character-homer.png" onclick="currentDialog=11,doTalk()"/>
    <img id="margeSimpson" src="/img/character-marge.png" onclick="currentDialog=4,doTalk()"/>
  </div>`
});
var vueCharacter = new Vue({
  el: '#characterBox'
});