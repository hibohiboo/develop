const { Elm } = require("./App.elm");

class ElmApp extends HTMLElement {
  connectedCallback() {
    Elm.App.init({ node: this });
  }
}

customElements.define("elm-app", ElmApp);