import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
let store;

interface IAttr {
  store: any,
 }
/**
 * ラップしたコンポーネントにstore情報を渡す
 * connect関数が使用できるようにする。
 * 
 * @export
 * @class Provider
 * @implements {ClassComponent<IAttr>}
 */
export default class Provider implements  ClassComponent<IAttr> {
  /**
   * storeをセットしてconnect関数を使用可能にする。
   * 
   * @param {any} vnode 
   * @memberof Provider
   */
  oninit(vnode:Vnode<IAttr, {}>){
    store = vnode.attrs.store;
  }
  /**
   * App内でstateを参照できるようにする。
   *
   * @param {Vnode} vnode
   * @returns
   * @memberof Provider
   */
  public view(vnode:Vnode<IAttr, {}>) {
    const app = vnode.children[0];
    return m(app.tag, {
      props: {
        state: store.getState(),
      },
    });
  }
}


/**
 * ReduxとMithrilをバインディングする。
 * 
 * @export
 * @param {*} [mapStateToProps=(state) => ({ state })] vnode.attrs.props.stateにアクセス可能となる
 * @param {*} [mapDispatchToProps=(dispatch) => ({ dispatch })] vnode.attrs.props.dispatchにアクセス可能となる
 * @returns 
 */
export function connect(
  mapStateToProps: any = (state) => ({ state }),
  mapDispatchToProps: any = (dispatch) => ({ dispatch }),
) {
  if(!mapStateToProps){
    mapStateToProps = (state) => ({ state });
  }
  if(!mapDispatchToProps){
    mapDispatchToProps =  (dispatch) => ({ dispatch });
  }
  return (vnode) => {
    return class implements  ClassComponent<{}> {
      view({attrs, children}:Vnode<{},{}>) {
        const props = getProps(mapStateToProps, mapDispatchToProps, attrs);
        return m(vnode, { props }, children);
      }
    };
  };
}

/**
 * propsにstateを渡す
 * @param props
 * @param mapStateToProps
 * @param ownProps バインディングされたコンポーネントの属性
 */
const stateToProps = (props, mapStateToProps, ownProps) => {
  const map = mapStateToProps(store.getState(), ownProps);
  Object.assign(props, map);
  return props;
};

/**
 * propsにdispatchを渡す
 * @param props
 * @param mapDispatchToProps
 * @param ownProps
 */
const dispatchToProps = (props, mapDispatchToProps, ownProps) => {
  const map = mapDispatchToProps(store.dispatch, ownProps);
  for (const prop in map) {
    props[prop] = map[prop];
  }
  return props;
};

/**
 * propsを作成。
 *
 * @param {any} mapStateToProps
 * @param {any} mapDispatchToProps
 * @param {any} ownProps
 */
function getProps(mapStateToProps, mapDispatchToProps, ownProps) {
  let props = { };

  props = stateToProps(props, mapStateToProps, ownProps);
  props = dispatchToProps(props, mapDispatchToProps, ownProps);
  return props;
}
