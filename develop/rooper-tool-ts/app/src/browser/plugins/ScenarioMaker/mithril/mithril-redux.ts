import * as m from 'mithril';
let store;

/**
 * ラップしたコンポーネントにstore情報を渡す
 * connect関数が使用できるようにする。
 *
 * @class Provider
 * @implements {m.Component<{}, {}>}
 */
export default class Provider implements m.Component<{}, {}> {
  /**
   * storeをセットしてconnect関数を使用可能にする。
   * 
   * @param {any} vnode 
   * @memberof Provider
   */
  oninit(vnode){
    store = vnode.attrs.store;
  }
  /**
   * App内でstateを参照できるようにする。
   *
   * @param {Vnode} vnode
   * @returns
   * @memberof Provider
   */
  public view(vnode) {
    const app = vnode.children[0].children;
    return m(app, {
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
  return (vnode) => {
    return {
      view() {
        const props = getProps(mapStateToProps, mapDispatchToProps);
        return m(vnode, { props });
      },
    };
  };
}

/**
 * propsにstateを渡す
 * @param props
 * @param mapStateToProps
 */
const stateToProps = (props, mapStateToProps) => {
  const map = mapStateToProps(store.getState());
  Object.assign(props, map);
  return props;
};

/**
 * propsにdispatchを渡す
 * @param props
 * @param mapDispatchToProps
 */
const dispatchToProps = (props, mapDispatchToProps) => {
  const map = mapDispatchToProps(store.dispatch);
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
 */
function getProps(mapStateToProps, mapDispatchToProps) {
  let props: any = { };

  props = stateToProps(props, mapStateToProps);
  props = dispatchToProps(props, mapDispatchToProps);
  return props;
}
