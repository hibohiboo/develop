(function(){
  const mountNode = document.getElementById('test');
  // @ts-ignore:
const app = Elm.Main.init({node: mountNode});
app.ports.logout.subscribe(()=> {
  console.log('test');
});

})();
