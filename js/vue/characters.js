Vue.component('characters', {
  template:`
  <div>
    <img id="homerSimpson" src="/img/character-homer.png" onclick="currentDialog=4,doTalk()"/>
    <img id="margeSimpson" src="/img/character-marge.png" onclick="currentDialog=4,doTalk()"/>
  </div>`
});
var vueCharacter = new Vue({
  el: '#characterBox'
});
