import { Elm } from '../elm/ElmTest';
const mountNode = document.getElementById('test');
const app = Elm.Main.init({ node: mountNode });
app.ports.log.subscribe(() => {
    console.log('test');
});
