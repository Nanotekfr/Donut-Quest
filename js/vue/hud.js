Vue.component('hud', {
  template:`
  <div class="HUD-box">
    <div id="mapIcon" onclick="doSelectArea()"><img src="/img/donut2.png"/></div>
    <div id="bagIcon" onclick="doOpenBag()"><img src="/img/donut2.png"/></div>
    <div id="map"></div>
    <div id="containerInventory">
      <div id="Inventory">
      </div>
      <div id="containerDescription">
      </div>
    </div>
  </div>`
});
var vueHUD = new Vue({
  el: '#HUD'
});
