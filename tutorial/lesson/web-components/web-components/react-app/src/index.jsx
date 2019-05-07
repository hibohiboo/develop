import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <div>React-app</div>;
  }
}

// Custom ElementとするためにHTMLElementを継承
class CustomElementsApp extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    ReactDOM.render(<App />, mountPoint);
  }
}

customElements.define('react-app', CustomElementsApp);