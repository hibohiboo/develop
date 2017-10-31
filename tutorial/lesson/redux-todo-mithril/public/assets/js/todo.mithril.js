webpackJsonp([0],{

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _marked = /*#__PURE__*/regeneratorRuntime.mark(toggleCompletedTodoList),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(allCompletedTodoList),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(allIncompletedTodoList);

Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = __webpack_require__(34);
var effects_1 = __webpack_require__(65);
var storage_1 = __webpack_require__(67);
// ducks
// カテゴリごとに reducer, saga, actionType および actionCreator などを全部1つにまとめてしまう
/**
 * actionType
 */
exports.ALL_COMPLETED = 'ALL_COMPLETED';
exports.ALL_INCOMPLETED = 'ALL_INCOMPLETED';
/**
 * actionを発行
 */
exports.allCompleted = redux_actions_1.createAction(exports.ALL_COMPLETED);
exports.allIncompleted = redux_actions_1.createAction(exports.ALL_INCOMPLETED);
// Saga:ALL_COMPLETED Action によって起動するワーカー
function toggleCompletedTodoList(completed) {
    var todos, todoList;
    return regeneratorRuntime.wrap(function toggleCompletedTodoList$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return effects_1.select(function (state) {
                        return state.todos;
                    });

                case 2:
                    todos = _context.sent;
                    todoList = todos.map(function (todo) {
                        todo.completed = completed;return todo;
                    });
                    _context.next = 6;
                    return effects_1.put({ type: storage_1.PUT_REQUEST, payload: { todoList: todoList } });

                case 6:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked, this);
}
function allCompletedTodoList(action) {
    return regeneratorRuntime.wrap(function allCompletedTodoList$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return toggleCompletedTodoList(true);

                case 2:
                case "end":
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}
exports.allCompletedTodoList = allCompletedTodoList;
function allIncompletedTodoList(action) {
    return regeneratorRuntime.wrap(function allIncompletedTodoList$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return toggleCompletedTodoList(false);

                case 2:
                case "end":
                    return _context3.stop();
            }
        }
    }, _marked3, this);
}
exports.allIncompletedTodoList = allIncompletedTodoList;

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var uniqueId = function () {
    var count = 0;
    return function () {
        count += 1;
        return count;
    };
}();
/**
 * Todoの状態モデル
 *
 * @export
 * @class TodoState
 */

var TodoState =
/**
 *
 * @param id
 * @param text
 * @param completed
 */
function TodoState(data) {
    _classCallCheck(this, TodoState);

    this.completed = false;
    this.editing = false;
    this.id = uniqueId();
    this.text = data.text;
    this.completed = data.completed || false;
    this.editing = data.editing || false;
};

exports.default = TodoState;

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(57);
var page = __webpack_require__(120);
var App_1 = __webpack_require__(188);
var filter_1 = __webpack_require__(68);
var storage_1 = __webpack_require__(67);
var mithril_redux_1 = __webpack_require__(36);
var store_1 = __webpack_require__(246);
var root = document.getElementById('app');
store_1.default.dispatch(storage_1.getRequsetTodoList());
function render() {
    m.render(root, m(mithril_redux_1.default, { store: store_1.default }, m(App_1.default)));
}
page('/', function (ctx) {
    if (ctx.hash) {
        store_1.default.dispatch(filter_1.setVisibilityFilter(ctx.hash));
    }
});
page();
store_1.default.subscribe(render);

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var AddTodo_1 = __webpack_require__(189);
var AllCompleted_1 = __webpack_require__(234);
var VisibleTodoList_1 = __webpack_require__(238);
var Footer_1 = __webpack_require__(243);
/**
 * App
 *
 * @export
 * @class App
 * @implements {ClassComponent<IAttr>}
 */

var App = function () {
    function App() {
        _classCallCheck(this, App);
    }

    _createClass(App, [{
        key: "view",
        value: function view(vnode) {
            return m(
                "div",
                null,
                m(AddTodo_1.default, null),
                m(
                    "label",
                    null,
                    " check all: ",
                    m(AllCompleted_1.default, null),
                    " "
                ),
                m(VisibleTodoList_1.default, null),
                m(Footer_1.default, null)
            );
        }
    }]);

    return App;
}();

exports.default = App;

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(57);
var powerform = __webpack_require__(121);
var validatex_1 = __webpack_require__(83);
var todos_1 = __webpack_require__(58);
var mithril_redux_1 = __webpack_require__(36);
function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(text) {
            dispatch(todos_1.addTodo(text));
        }
    };
}

var AddTodoComponent = function () {
    function AddTodoComponent() {
        _classCallCheck(this, AddTodoComponent);

        this.form = powerform({
            todo: [validatex_1.required(true)]
        }, true);
    }

    _createClass(AddTodoComponent, [{
        key: "view",
        value: function view(vnode) {
            var _this = this;

            var onClick = vnode.attrs.props.onClick;

            return m(
                "div",
                null,
                m("input", { className: "toggle", oninput: m.withAttr('value', function (value) {
                        return _this.value = value;
                    }), value: this.value }),
                m(
                    "button",
                    { onclick: function onclick() {
                            _this.form.todo(_this.value);
                            if (!_this.form.isValid()) {
                                return;
                            }
                            var val = _this.value;
                            _this.value = '';
                            onClick(val); // dispatchのタイミングで画面が更新される。
                        } },
                    "Add Todo"
                )
            );
        }
    }]);

    return AddTodoComponent;
}();

exports.default = mithril_redux_1.connect(null, mapDispatchToProps)(AddTodoComponent);

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var mithril_redux_1 = __webpack_require__(36);
var allCompoeted_1 = __webpack_require__(139);
var mapStateToProps = function mapStateToProps(store) {
    return { completed: store.todos.every(function (todo) {
            return todo.completed;
        }) };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(completed) {
            if (completed) {
                dispatch(allCompoeted_1.allIncompleted());
                return;
            }
            dispatch(allCompoeted_1.allCompleted());
        }
    };
};

var AllCompleted = function () {
    function AllCompleted() {
        _classCallCheck(this, AllCompleted);
    }

    _createClass(AllCompleted, [{
        key: "view",
        value: function view(vnode) {
            var _vnode$attrs$props = vnode.attrs.props,
                completed = _vnode$attrs$props.completed,
                onClick = _vnode$attrs$props.onClick;

            return m("input", { className: "toggle", type: "checkbox", onclick: function onclick() {
                    return onClick(completed);
                }, checked: completed });
        }
    }]);

    return AllCompleted;
}();

exports.default = mithril_redux_1.connect(mapStateToProps, mapDispatchToProps)(AllCompleted);

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = __webpack_require__(68);
var todos_1 = __webpack_require__(58);
var TodoList_1 = __webpack_require__(239);
var mithril_redux_1 = __webpack_require__(36);
var getVisibleTodos = function getVisibleTodos(todos, filter) {
    switch (filter) {
        case filter_1.ALL:
            return todos;
        case filter_1.COMPLETED:
            return todos.filter(function (t) {
                return t.completed;
            });
        case filter_1.ACTIVE:
            return todos.filter(function (t) {
                return !t.completed;
            });
    }
};
var mapStateToProps = function mapStateToProps(store) {
    return { todos: getVisibleTodos(store.todos, store.visibilityFilter) };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onTodoClick: function onTodoClick(id) {
            dispatch(todos_1.toggleTodo(id));
        }
    };
};
exports.default = mithril_redux_1.connect(mapStateToProps, mapDispatchToProps)(TodoList_1.default);

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Todo_1 = __webpack_require__(240);
/**
 * Todoのリストを返す
 *
 * @export
 * @class TodoList
 * @implements {ClassComponent<IAttr>}
 */

var TodoList = function () {
    function TodoList() {
        _classCallCheck(this, TodoList);
    }

    _createClass(TodoList, [{
        key: "view",
        value: function view(_ref) {
            var props = _ref.attrs.props;
            var todos = props.todos,
                onTodoClick = props.onTodoClick;

            return m(
                "ul",
                { id: "todo-list" },
                todos.map(function (todo) {
                    return m(Todo_1.default, _extends({}, todo, { onClick: function onClick() {
                            onTodoClick(todo.id);
                        } }));
                })
            );
        }
    }]);

    return TodoList;
}();

exports.default = TodoList;

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var DeleteTodo_1 = __webpack_require__(241);
var EditTodo_1 = __webpack_require__(242);

var Todo = function () {
    function Todo() {
        _classCallCheck(this, Todo);
    }

    _createClass(Todo, [{
        key: "view",

        /**
         *
         * @param vnode
         */
        value: function view(_ref) {
            var attrs = _ref.attrs;
            var id = attrs.id,
                text = attrs.text,
                completed = attrs.completed,
                editing = attrs.editing,
                onClick = attrs.onClick;

            var classes = (completed ? 'completed ' : '') + (editing ? 'editing ' : '');
            return m(
                "li",
                { "class": classes },
                m(
                    "div",
                    { "class": "view" },
                    m("input", { "class": "toggle", type: "checkbox", onclick: onClick, checked: completed }),
                    m(EditTodo_1.default, { text: text, id: id, editing: editing }),
                    m(DeleteTodo_1.default, { id: id })
                )
            );
        }
    }]);

    return Todo;
}();

exports.default = Todo;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var todos_1 = __webpack_require__(58);
var mithril_redux_1 = __webpack_require__(36);
function mapDispatchToProps(dispatch, _ref) {
    var id = _ref.id;

    return {
        onClick: function onClick() {
            dispatch(todos_1.deleteTodo(id));
        }
    };
}

var DeleteTodoComponent = function () {
    function DeleteTodoComponent() {
        _classCallCheck(this, DeleteTodoComponent);
    }

    _createClass(DeleteTodoComponent, [{
        key: "view",
        value: function view(vnode) {
            var onClick = vnode.attrs.props.onClick;

            return m("button", { className: "destroy", onclick: onClick });
        }
    }]);

    return DeleteTodoComponent;
}();

exports.default = mithril_redux_1.connect(null, mapDispatchToProps)(DeleteTodoComponent);

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(57);
var todos_1 = __webpack_require__(58);
var mithril_redux_1 = __webpack_require__(36);
var mapStateToProps = function mapStateToProps(store, _ref) {
    var text = _ref.text,
        editing = _ref.editing;

    return { text: text, editing: editing };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
    var id = _ref2.id;

    return {
        onDoubleClick: function onDoubleClick() {
            dispatch(todos_1.editingTodo(id));
        },
        onBlur: function onBlur(text) {
            dispatch(todos_1.doneEditingTodo(id, text));
        }
    };
};

var EditTodoComponent = function () {
    function EditTodoComponent() {
        _classCallCheck(this, EditTodoComponent);
    }

    _createClass(EditTodoComponent, [{
        key: "view",
        value: function view(vnode) {
            var _this = this;

            var _vnode$attrs$props = vnode.attrs.props,
                onDoubleClick = _vnode$attrs$props.onDoubleClick,
                onBlur = _vnode$attrs$props.onBlur,
                text = _vnode$attrs$props.text,
                editing = _vnode$attrs$props.editing;

            this.value = text;
            var cancelEditing = function cancelEditing() {
                _this.value = text;
                onBlur(text);
            };
            var doneEditing = function doneEditing() {
                var val = _this.value;
                if (val === '') {
                    return cancelEditing();
                }
                _this.value = '';
                onBlur(val);
            };
            return m(
                "div",
                null,
                m(
                    "label",
                    { ondblclick: onDoubleClick },
                    text
                ),
                m("input", { className: "edit", value: this.value, onupdate: function onupdate(node) {
                        if (editing) {
                            var element = node.dom;
                            element.focus();
                        }
                    }, oninput: m.withAttr('value', function (value) {
                        return _this.value = value;
                    }), onblur: doneEditing, onkeyup: function onkeyup(e) {
                        if (e.key === 'Enter') {
                            doneEditing();
                        } else if (e.key === 'Escape') {
                            cancelEditing();
                        }
                    } })
            );
        }
    }]);

    return EditTodoComponent;
}();

exports.default = mithril_redux_1.connect(mapStateToProps, mapDispatchToProps)(EditTodoComponent);

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = __webpack_require__(68);
var FilterLink_1 = __webpack_require__(244);

var Footer = function () {
  function Footer() {
    _classCallCheck(this, Footer);
  }

  _createClass(Footer, [{
    key: "view",
    value: function view(_ref) {
      var children = _ref.children;

      return m(
        "p",
        null,
        "Show:",
        ' ',
        m(
          FilterLink_1.default,
          { filter: filter_1.ALL },
          "All"
        ),
        ', ',
        m(
          FilterLink_1.default,
          { filter: filter_1.ACTIVE },
          "Active"
        ),
        ', ',
        m(
          FilterLink_1.default,
          { filter: filter_1.COMPLETED },
          "Completed"
        )
      );
    }
  }]);

  return Footer;
}();

exports.default = Footer;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Link_1 = __webpack_require__(245);
var mithril_redux_1 = __webpack_require__(36);
var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        active: ownProps.filter === state.visibilityFilter,
        filter: ownProps.filter
    };
};
exports.default = mithril_redux_1.connect(mapStateToProps, null)(Link_1.default);

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Link = function () {
    function Link() {
        _classCallCheck(this, Link);
    }

    _createClass(Link, [{
        key: "view",
        value: function view(_ref) {
            var children = _ref.children,
                props = _ref.attrs.props;

            if (props.active) {
                return m(
                    "span",
                    null,
                    children
                );
            }
            return m(
                "a",
                { href: "/#" + props.filter },
                children
            );
        }
    }]);

    return Link;
}();

exports.default = Link;

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(92);
var redux_saga_1 = __webpack_require__(145);
var redux_logger_1 = __webpack_require__(256);
var reducers_1 = __webpack_require__(257);
var sagas_1 = __webpack_require__(260);
// Saga ミドルウェアを作成する
var sagaMiddleware = redux_saga_1.default();
// Store にマウントする
var store = redux_1.createStore(reducers_1.default, redux_1.applyMiddleware(sagaMiddleware, redux_logger_1.createLogger()));
// Saga を起動する
sagaMiddleware.run(sagas_1.default);
exports.default = store;

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(e,t){ true?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.reduxLogger=e.reduxLogger||{})}(this,function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function n(e,t,r){n.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function o(e,t){o.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function f(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function u(e){var t="undefined"==typeof e?"undefined":N(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,c,s,d,p){s=s||[],p=p||[];var g=s.slice(0);if("undefined"!=typeof d){if(c){if("function"==typeof c&&c(g,d))return;if("object"===("undefined"==typeof c?"undefined":N(c))){if(c.prefilter&&c.prefilter(g,d))return;if(c.normalize){var h=c.normalize(g,d,e,t);h&&(e=h[0],t=h[1])}}}g.push(d)}"regexp"===u(e)&&"regexp"===u(t)&&(e=e.toString(),t=t.toString());var y="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new o(g,t));else if(!m&&b)r(new i(g,e));else if(u(e)!==u(t))r(new n(g,e,t));else if("date"===u(e)&&e-t!==0)r(new n(g,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter(function(t){return t.lhs===e}).length)e!==t&&r(new n(g,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;e.length;for(w=0;w<e.length;w++)w>=t.length?r(new a(g,w,new i(void 0,e[w]))):l(e[w],t[w],r,c,g,w,p);for(;w<t.length;)r(new a(g,w,new o(void 0,t[w++])))}else{var x=Object.keys(e),S=Object.keys(t);x.forEach(function(n,o){var i=S.indexOf(n);i>=0?(l(e[n],t[n],r,c,g,n,p),S=f(S,i)):l(e[n],void 0,r,c,g,n,p)}),S.forEach(function(e){l(void 0,t[e],r,c,g,e,p)})}p.length=p.length-1}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new n(g,e,t)))}function c(e,t,r,n){return n=n||[],l(e,t,function(e){e&&n.push(e)},r),n.length?n:void 0}function s(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":s(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":s(e[t],r.index,r.item);break;case"D":e=f(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":s(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":o[r.path[n]]=r.lhs;break;case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e[t]=r.lhs;break;case"E":e[t]=r.lhs;break;case"N":e=f(e,t)}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":p(i[r.path[n]],r.index,r.item);break;case"D":i[r.path[n]]=r.lhs;break;case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}}function h(e,t,r){if(e&&t){var n=function(n){r&&!r(e,t,n)||d(e,t,n)};l(e,t,n)}}function y(e){return"color: "+F[e].color+"; font-weight: bold"}function v(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"→",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}function b(e,t,r,n){var o=c(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach(function(e){var t=e.kind,n=v(e);r.log.apply(r,["%c "+F[t].text,y(t)].concat(P(n)))}):r.log("—— no diff ——");try{r.groupEnd()}catch(e){r.log("—— diff end —— ")}}function m(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,P(r)):e[n];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function x(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?w(t):o,a=t.collapsed,f=t.colors,u=t.level,l=t.diff,c="undefined"==typeof t.titleFormatter;e.forEach(function(o,s){var d=o.started,p=o.startedTime,g=o.action,h=o.prevState,y=o.error,v=o.took,w=o.nextState,x=e[s+1];x&&(w=x.prevState,v=x.started-d);var S=n(g),k="function"==typeof a?a(function(){return w},g,o):a,j=D(p),E=f.title?"color: "+f.title(S)+";":"",A=["color: gray; font-weight: lighter;"];A.push(E),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var O=i(S,j,v);try{k?f.title&&c?r.groupCollapsed.apply(r,["%c "+O].concat(A)):r.groupCollapsed(O):f.title&&c?r.group.apply(r,["%c "+O].concat(A)):r.group(O)}catch(e){r.log(O)}var N=m(u,S,[h],"prevState"),P=m(u,S,[S],"action"),C=m(u,S,[y,h],"error"),F=m(u,S,[w],"nextState");if(N)if(f.prevState){var L="color: "+f.prevState(h)+"; font-weight: bold";r[N]("%c prev state",L,h)}else r[N]("prev state",h);if(P)if(f.action){var T="color: "+f.action(S)+"; font-weight: bold";r[P]("%c action    ",T,S)}else r[P]("action    ",S);if(y&&C)if(f.error){var M="color: "+f.error(y,h)+"; font-weight: bold;";r[C]("%c error     ",M,y)}else r[C]("error     ",y);if(F)if(f.nextState){var _="color: "+f.nextState(w)+"; font-weight: bold";r[F]("%c next state",_,w)}else r[F]("next state",w);l&&b(h,w,r,k);try{r.groupEnd()}catch(e){r.log("—— log end ——")}})}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,f=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var r=e.getState;return function(e){return function(l){if("function"==typeof i&&!i(r,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=n(r()),c.action=l;var s=void 0;if(a)try{s=e(l)}catch(e){c.error=o(e)}else s=e(l);c.took=O.now()-c.started,c.nextState=n(r());var d=t.diff&&"function"==typeof f?f(r,l):t.diff;if(x(u,Object.assign({},t,{diff:d})),u.length=0,c.error)throw c.error;return s}}}}var k,j,E=function(e,t){return new Array(t+1).join(e)},A=function(e,t){return E("0",t-e.toString().length)+e},D=function(e){return A(e.getHours(),2)+":"+A(e.getMinutes(),2)+":"+A(e.getSeconds(),2)+"."+A(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},C=[];k="object"===("undefined"==typeof global?"undefined":N(global))&&global?global:"undefined"!=typeof window?window:{},j=k.DeepDiff,j&&C.push(function(){"undefined"!=typeof j&&k.DeepDiff===c&&(k.DeepDiff=j,j=void 0)}),t(n,r),t(o,r),t(i,r),t(a,r),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:h,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof j},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e()}),C=null),c},enumerable:!0}});var F={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?S()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=L,e.createLogger=S,e.logger=T,e.default=T,Object.defineProperty(e,"__esModule",{value:!0})});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(92);
var todos_1 = __webpack_require__(258);
var visibilityFilter_1 = __webpack_require__(259);
exports.default = redux_1.combineReducers({
    todos: todos_1.default,
    visibilityFilter: visibilityFilter_1.default
});

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _redux_actions_1$hand;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = __webpack_require__(34);
var storage_1 = __webpack_require__(67);
var TodoState_1 = __webpack_require__(148);
exports.default = redux_actions_1.handleActions((_redux_actions_1$hand = {}, _defineProperty(_redux_actions_1$hand, storage_1.GET_SUCCESS, function (state, _ref) {
    var todoList = _ref.payload.todoList;

    return todoList.map(function (todo) {
        return new TodoState_1.default(todo);
    });
}), _defineProperty(_redux_actions_1$hand, storage_1.PUT_SUCCESS, function (state, _ref2) {
    var todoList = _ref2.payload.todoList;

    return todoList;
}), _redux_actions_1$hand), []);

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = __webpack_require__(34);
var filter_1 = __webpack_require__(68);
exports.default = redux_actions_1.handleActions(_defineProperty({}, filter_1.SET_VISIBILITY, function (state, _ref) {
    var filter = _ref.payload.filter;

    return filter;
}), filter_1.ALL);

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _marked = /*#__PURE__*/regeneratorRuntime.mark(mySaga);

Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = __webpack_require__(65);
var allCompoeted_1 = __webpack_require__(139);
var todos_1 = __webpack_require__(261);
function mySaga() {
    return regeneratorRuntime.wrap(function mySaga$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return effects_1.takeEvery(allCompoeted_1.ALL_COMPLETED, allCompoeted_1.allCompletedTodoList);

                case 2:
                    _context.next = 4;
                    return effects_1.takeEvery(allCompoeted_1.ALL_INCOMPLETED, allCompoeted_1.allIncompletedTodoList);

                case 4:
                    _context.next = 6;
                    return todos_1.default();

                case 6:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked, this);
}
exports.default = mySaga;

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _marked = /*#__PURE__*/regeneratorRuntime.mark(addTodoList),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(toggleTodo),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(putTodoList),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(getTodoList),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(deleteTodo),
    _marked6 = /*#__PURE__*/regeneratorRuntime.mark(editingTodo),
    _marked7 = /*#__PURE__*/regeneratorRuntime.mark(doneEditingTodo),
    _marked8 = /*#__PURE__*/regeneratorRuntime.mark(default_1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = __webpack_require__(65);
var storage_1 = __webpack_require__(67);
var todos_1 = __webpack_require__(58);
var storage_2 = __webpack_require__(262);
var TodoState_1 = __webpack_require__(148);
// ワーカー Saga:GET_REQUEST Action によって起動する
function addTodoList(action) {
    var todos, text, todoList;
    return regeneratorRuntime.wrap(function addTodoList$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return effects_1.select(function (state) {
                        return state.todos;
                    });

                case 2:
                    todos = _context.sent;
                    text = action.payload.text;
                    todoList = [].concat(_toConsumableArray(todos), [new TodoState_1.default({ text: text })]);
                    _context.next = 7;
                    return effects_1.put({ type: storage_1.PUT_REQUEST, payload: { todoList: todoList } });

                case 7:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked, this);
}
exports.addTodoList = addTodoList;
function toggleTodo(action) {
    var todos, id, todoList;
    return regeneratorRuntime.wrap(function toggleTodo$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return effects_1.select(function (state) {
                        return state.todos;
                    });

                case 2:
                    todos = _context2.sent;
                    id = action.payload.id;
                    todoList = todos.map(function (t) {
                        // actionCreatorに渡したidと一致するtodoのみ処理
                        if (t.id !== id) {
                            return t;
                        }
                        // completedだけを反転
                        t.completed = !t.completed;
                        return new TodoState_1.default(t);
                    });
                    _context2.next = 7;
                    return effects_1.put({ type: storage_1.PUT_REQUEST, payload: { todoList: todoList } });

                case 7:
                case "end":
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}
exports.toggleTodo = toggleTodo;
// ワーカー Saga:PUT_REQUEST Action によって起動する
function putTodoList(action) {
    return regeneratorRuntime.wrap(function putTodoList$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return effects_1.call(storage_2.put, action.payload.todoList);

                case 3:
                    _context3.next = 5;
                    return effects_1.put({ type: storage_1.PUT_SUCCESS, payload: { todoList: action.payload.todoList } });

                case 5:
                    _context3.next = 11;
                    break;

                case 7:
                    _context3.prev = 7;
                    _context3.t0 = _context3["catch"](0);
                    _context3.next = 11;
                    return effects_1.put({ type: storage_1.PUT_FAILED, message: _context3.t0.message });

                case 11:
                case "end":
                    return _context3.stop();
            }
        }
    }, _marked3, this, [[0, 7]]);
}
exports.putTodoList = putTodoList;
// ワーカー Saga:GET_REQUEST Action によって起動する
function getTodoList(action) {
    var todoList;
    return regeneratorRuntime.wrap(function getTodoList$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    _context4.prev = 0;
                    _context4.next = 3;
                    return effects_1.call(storage_2.get);

                case 3:
                    todoList = _context4.sent;
                    _context4.next = 6;
                    return effects_1.put({ type: storage_1.GET_SUCCESS, payload: { todoList: todoList } });

                case 6:
                    _context4.next = 12;
                    break;

                case 8:
                    _context4.prev = 8;
                    _context4.t0 = _context4["catch"](0);
                    _context4.next = 12;
                    return effects_1.put({ type: storage_1.GET_FAILED, message: _context4.t0.message });

                case 12:
                case "end":
                    return _context4.stop();
            }
        }
    }, _marked4, this, [[0, 8]]);
}
exports.getTodoList = getTodoList;
function deleteTodo(action) {
    var todos, id, todoList;
    return regeneratorRuntime.wrap(function deleteTodo$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    _context5.next = 2;
                    return effects_1.select(function (state) {
                        return state.todos;
                    });

                case 2:
                    todos = _context5.sent;
                    id = action.payload.id;
                    todoList = todos.filter(function (t) {
                        return t.id !== id;
                    });
                    _context5.next = 7;
                    return effects_1.put({ type: storage_1.PUT_REQUEST, payload: { todoList: todoList } });

                case 7:
                case "end":
                    return _context5.stop();
            }
        }
    }, _marked5, this);
}
exports.deleteTodo = deleteTodo;
function editingTodo(action) {
    var todos, id, todoList;
    return regeneratorRuntime.wrap(function editingTodo$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    _context6.next = 2;
                    return effects_1.select(function (store) {
                        return store.todos;
                    });

                case 2:
                    todos = _context6.sent;
                    id = action.payload.id;
                    todoList = todos.map(function (t) {
                        // actionCreatorに渡したidと一致するtodoのみ処理
                        if (t.id !== id) {
                            return t;
                        }
                        // editingをtrueに
                        t.editing = true;
                        return new TodoState_1.default(t);
                    });
                    _context6.next = 7;
                    return effects_1.put({ type: storage_1.PUT_REQUEST, payload: { todoList: todoList } });

                case 7:
                case "end":
                    return _context6.stop();
            }
        }
    }, _marked6, this);
}
exports.editingTodo = editingTodo;
function doneEditingTodo(action) {
    var todos, _action$payload, id, text, todoList;

    return regeneratorRuntime.wrap(function doneEditingTodo$(_context7) {
        while (1) {
            switch (_context7.prev = _context7.next) {
                case 0:
                    _context7.next = 2;
                    return effects_1.select(function (store) {
                        return store.todos;
                    });

                case 2:
                    todos = _context7.sent;
                    _action$payload = action.payload, id = _action$payload.id, text = _action$payload.text;
                    todoList = todos.map(function (t) {
                        // actionCreatorに渡したidと一致するtodoのみ処理
                        if (t.id !== id) {
                            return t;
                        }
                        t.editing = false;
                        t.text = text;
                        return new TodoState_1.default(t);
                    });
                    _context7.next = 7;
                    return effects_1.put({ type: storage_1.PUT_REQUEST, payload: { todoList: todoList } });

                case 7:
                case "end":
                    return _context7.stop();
            }
        }
    }, _marked7, this);
}
exports.doneEditingTodo = doneEditingTodo;
function default_1() {
    return regeneratorRuntime.wrap(function default_1$(_context8) {
        while (1) {
            switch (_context8.prev = _context8.next) {
                case 0:
                    _context8.next = 2;
                    return effects_1.takeEvery(todos_1.ADD, addTodoList);

                case 2:
                    _context8.next = 4;
                    return effects_1.takeEvery(todos_1.TOGGLE, toggleTodo);

                case 4:
                    _context8.next = 6;
                    return effects_1.takeEvery(todos_1.DELETE, deleteTodo);

                case 6:
                    _context8.next = 8;
                    return effects_1.takeEvery(storage_1.GET_REQUEST, getTodoList);

                case 8:
                    _context8.next = 10;
                    return effects_1.takeEvery(storage_1.PUT_REQUEST, putTodoList);

                case 10:
                    _context8.next = 12;
                    return effects_1.takeEvery(todos_1.EDITING, editingTodo);

                case 12:
                    _context8.next = 14;
                    return effects_1.takeEvery(todos_1.DONE_EDITING, doneEditingTodo);

                case 14:
                case "end":
                    return _context8.stop();
            }
        }
    }, _marked8, this);
}
exports.default = default_1;

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var get = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt("return", JSON.parse(localStorage.getItem(STORAGE_ID) || '[]'));

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function get() {
        return _ref.apply(this, arguments);
    };
}();

var put = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(todos) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));

                    case 1:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function put(_x) {
        return _ref2.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var STORAGE_ID = 'todos-mithril';

exports.get = get;

exports.put = put;

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var m = __webpack_require__(57);
var store = void 0;
/**
 * ラップしたコンポーネントにstore情報を渡す
 * connect関数が使用できるようにする。
 *
 * @export
 * @class Provider
 * @implements {ClassComponent<IAttr>}
 */

var Provider = function () {
    function Provider() {
        _classCallCheck(this, Provider);
    }

    _createClass(Provider, [{
        key: "oninit",

        /**
         * storeをセットしてconnect関数を使用可能にする。
         *
         * @param {any} vnode
         * @memberof Provider
         */
        value: function oninit(vnode) {
            store = vnode.attrs.store;
        }
        /**
         * App内でstateを参照できるようにする。
         *
         * @param {Vnode} vnode
         * @returns
         * @memberof Provider
         */

    }, {
        key: "view",
        value: function view(vnode) {
            var app = vnode.children[0];
            return m(app.tag, {
                props: {
                    state: store.getState()
                }
            });
        }
    }]);

    return Provider;
}();

exports.default = Provider;
/**
 * ReduxとMithrilをバインディングする。
 *
 * @export
 * @param {*} [mapStateToProps=(state) => ({ state })] vnode.attrs.props.stateにアクセス可能となる
 * @param {*} [mapDispatchToProps=(dispatch) => ({ dispatch })] vnode.attrs.props.dispatchにアクセス可能となる
 * @returns
 */
function connect() {
    var mapStateToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (state) {
        return { state: state };
    };
    var mapDispatchToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (dispatch) {
        return { dispatch: dispatch };
    };

    if (!mapStateToProps) {
        mapStateToProps = function mapStateToProps(state) {
            return { state: state };
        };
    }
    if (!mapDispatchToProps) {
        mapDispatchToProps = function mapDispatchToProps(dispatch) {
            return { dispatch: dispatch };
        };
    }
    return function (vnode) {
        return function () {
            function _class() {
                _classCallCheck(this, _class);
            }

            _createClass(_class, [{
                key: "view",
                value: function view(_ref) {
                    var attrs = _ref.attrs,
                        children = _ref.children;

                    var props = getProps(mapStateToProps, mapDispatchToProps, attrs);
                    return m(vnode, { props: props }, children);
                }
            }]);

            return _class;
        }();
    };
}
exports.connect = connect;
/**
 * propsにstateを渡す
 * @param props
 * @param mapStateToProps
 * @param ownProps バインディングされたコンポーネントの属性
 */
var stateToProps = function stateToProps(props, mapStateToProps, ownProps) {
    var map = mapStateToProps(store.getState(), ownProps);
    Object.assign(props, map);
    return props;
};
/**
 * propsにdispatchを渡す
 * @param props
 * @param mapDispatchToProps
 * @param ownProps
 */
var dispatchToProps = function dispatchToProps(props, mapDispatchToProps, ownProps) {
    var map = mapDispatchToProps(store.dispatch, ownProps);
    for (var prop in map) {
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
    var props = {};
    props = stateToProps(props, mapStateToProps, ownProps);
    props = dispatchToProps(props, mapDispatchToProps, ownProps);
    return props;
}

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = __webpack_require__(34);
exports.ADD = 'ADD_TODO';
exports.TOGGLE = 'TOGGLE_TODO';
exports.DELETE = 'DELETE_TODO';
exports.EDITING = 'EDITING_TODO';
exports.DONE_EDITING = 'DONE_EDITING_TODO';
/**
 * actionを発行する関数。
 */
exports.addTodo = redux_actions_1.createAction(exports.ADD, function (text) {
  return { text: text };
});
exports.toggleTodo = redux_actions_1.createAction(exports.TOGGLE, function (id) {
  return { id: id };
});
exports.deleteTodo = redux_actions_1.createAction(exports.DELETE, function (id) {
  return { id: id };
});
exports.editingTodo = redux_actions_1.createAction(exports.EDITING, function (id) {
  return { id: id };
});
exports.doneEditingTodo = redux_actions_1.createAction(exports.DONE_EDITING, function (id, text) {
  return { id: id, text: text };
}); // tslint:disable-line max-line-length

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = __webpack_require__(34);
exports.GET_REQUEST = 'TODO_LIST_GET_REQUESTED';
exports.getRequsetTodoList = redux_actions_1.createAction(exports.GET_REQUEST);
exports.GET_FAILED = 'TODO_LIST_GET_FAILED';
exports.getFailureTodoList = redux_actions_1.createAction(exports.GET_FAILED, function (message) {
  return message;
});
exports.GET_SUCCESS = 'TODO_LIST_GET_SUCCEEDED';
exports.getSuccessTodoList = redux_actions_1.createAction(exports.GET_SUCCESS, function (todoList) {
  return { todoList: todoList };
});
exports.PUT_REQUEST = 'TODO_LIST_PUT_REQUESTED';
exports.putRequsetTodoList = redux_actions_1.createAction(exports.PUT_REQUEST, function (todoList) {
  return { todoList: todoList };
});
exports.PUT_FAILED = 'TODO_LIST_PUT_FAILED';
exports.putFailureTodoList = redux_actions_1.createAction(exports.PUT_FAILED, function (message) {
  return message;
});
exports.PUT_SUCCESS = 'TODO_LIST_PUT_SUCCEEDED';
exports.putSuccessTodoList = redux_actions_1.createAction(exports.PUT_SUCCESS, function (todoList) {
  return { todoList: todoList };
});
// export const DELETE_REQUEST = 'TODO_LIST_DELETE_REQUESTED';
// export const deleteRequsetTodoList = createAction(DELETE_REQUEST, todoList => ({ todoList }));
// export const DELETE_FAILED = 'TODO_LIST_DELETE_FAILED';
// export const deleteFailureTodoList = createAction(DELETE_FAILED, message => message);
// export const DELETE_SUCCESS = 'TODO_LIST_DELETE_SUCCEEDED';
// export const deleteSuccessTodoList = createAction(DELETE_SUCCESS, todoList => ({ todoList }));

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = __webpack_require__(34);
exports.SET_VISIBILITY = 'SET_VISIBILITY_FILTER';
exports.ALL = 'SHOW_ALL';
exports.COMPLETED = 'SHOW_COMPLETED';
exports.ACTIVE = 'SHOW_ACTIVE';
exports.setVisibilityFilter = redux_actions_1.createAction(exports.SET_VISIBILITY, function (filter) {
  return { filter: filter };
});

/***/ })

},[183]);
//# sourceMappingURL=todo.mithril.js.map