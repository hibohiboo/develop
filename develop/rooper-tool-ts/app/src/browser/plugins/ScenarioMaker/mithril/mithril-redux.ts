import * as m from 'mithril';

let store;

/**
 * 役割は2つ
 * 1. Mithrilコンポーネント内でreact-reduxのconnect()関数を使えるようにすること
 * 2. ラップしたコンポーネントにstore情報を渡すこと
 * 
 * @class Provider
 * @implements {m.Component<{}, {}>}
 */
export default class Provider implements m.Component<{}, {}> {
  private props;
  private app;
  
  constructor(vnode){
    this.props = {
      store: vnode.attrs.store
    };
    this.app = vnode.children[0];
  }
  /**
   * 
   * 
   * @param {Vnode} vnode 
   * @returns 
   * @memberof Provider
   */
  view(vnode) {
    return this.app;
  }
}