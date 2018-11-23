import { Elm } from '../elm/ElmTest';
const mountNode: Element = document.getElementById('test');
const app: any = Elm.Main.init({ node: mountNode });
app.ports.log.subscribe(() => {
  console.log('test');
});
