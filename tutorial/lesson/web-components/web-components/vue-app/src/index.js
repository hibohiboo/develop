import Vue from 'vue';
import App from './App';
import vueCustomElement from 'vue-custom-element';

Vue.use(vueCustomElement);

Vue.customElement('vue-app', App);
