import '../css/style.css'; // cssを読み込む。（実際にはwebpackで分離される)
import { Elm } from '../elm/ElmTest';
(function () {
    const tmpNode = document.getElementById('test');
    if (tmpNode === null) {
        return;
    }
    const mountNode = tmpNode;
    const app = Elm.Main.init({ node: mountNode });
    app.ports.log.subscribe(() => {
        console.log('test');
    });
}());
