import { Elm } from './Main'; //  eslint-disable-line import/no-unresolved

const flags = {};

// elmのＤＯＭを作成する元となるＤＯＭ要素
const mountNode = document.getElementById('app');

// 初期値を与える
const app = Elm.Main.init({ node: mountNode, flags });


