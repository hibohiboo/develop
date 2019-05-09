class TsApp extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');
    const info = document.createElement('span');
    info.setAttribute('class', 'info');
    info.textContent = 'ts-app';
    shadow.appendChild(wrapper);
    wrapper.appendChild(info);
  }
}
customElements.define('ts-app', TsApp);
