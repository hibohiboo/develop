import { Elm } from '../elm/ElmTest';
(function(){
  const tmpNode: HTMLElement | null  =  document.getElementById('test');
  if(tmpNode  === null ){
    return;
  }
  const mountNode: HTMLElement =tmpNode;
  const app: any = Elm.Main.init({ node: mountNode });
  app.ports.log.subscribe(() => {
    console.log('test');
  });  
}());
