"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

// 変数宣言
var variable = 'test';
console.log("[Debug]: ".concat(variable)); // オブジェクトコピー

var srcObj = {
  test: 'new!'
};
var destObj = {};
Object.assign(destObj, srcObj); //オブジェクトのスプレッド演算子サポート

var destObj2 = _objectSpread({}, srcObj);

var Parent =
/*#__PURE__*/
function () {
  function Parent() {
    _classCallCheck(this, Parent);

    this.animaltype = "動物";
  }

  _createClass(Parent, [{
    key: "say",
    value: function say() {
      console.log("".concat(this.animalType, "\u3060\u3051\u3069MS\u306E\u4E2D\u306B\u6C38\u3089\u304F\u5C45\u305FBOM\u4FE1\u8005\u306E\u5168\u8EAB\u306E\u6BDB\u3092\u3080\u3057\u308A\u305F\u3044"));
    }
  }]);

  return Parent;
}();

var SmallAnimal =
/*#__PURE__*/
function (_Parent) {
  _inherits(SmallAnimal, _Parent);

  function SmallAnimal() {
    var _this;

    _classCallCheck(this, SmallAnimal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SmallAnimal).call(this));
    _this.animaltype = "ポメラニアン";
    return _this;
  }

  return SmallAnimal;
}(Parent);

var a = new SmallAnimal();
a.say(); // 非同期処理をawaitで待つ

var fetchData =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url) {
    var resp, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);

          case 2:
            resp = _context.sent;
            _context.next = 5;
            return resp.json();

          case 5:
            json = _context.sent;
            console.log(json);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var f = function f(a, b, c) {
  console.log(a, b, c);
}; // a=1, b=2, c=3として実行される


f.apply(void 0, [1, 2, 3]); // 可変長配列の新しいコード

var f2 = function f2(a, b) {
  for (var _len = arguments.length, c = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    c[_key - 2] = arguments[_key];
  }

  console.log(a, b, c);
};

f2(1, 2, 3, 4, 5, 6); // 1, 2, [3, 4, 5, 6];
// デフォルト引数

var f3 = (name = (_readOnlyError("name"), "小動物"), favorite = "ストロングゼロ"); // 新しいループ

var iterable = [10, 20, 30];

for (var _i = 0; _i < iterable.length; _i++) {
  var value = iterable[_i];
  console.log(value);
} // async await
// for (let value of iterable) {
//   await doSomething(value);
// }
// map


var map = new Map([["五反田", "約束の地"], ["戸越銀座", "TGSGNZ"]]);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2),
        key = _step$value[0],
        _value = _step$value[1];

    console.log("".concat(key, " : ").concat(_value));
  } // keyだけでループしたい場合（以前同様）

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = map.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var key = _step2.value;
    ;
  } // valueだけでループしたい場合

} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = map.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _value2 = _step3.value;
    ;
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

var thinking = {
  name: "小動物",
  mind: "Python3と寝たい",
  reason: "`raise e from cause` べんりですよ"
}; // 分割代入

var _thinking$name = thinking.name,
    name = _thinking$name === void 0 ? "約束の地の住人" : _thinking$name,
    mind = thinking.mind,
    reason = thinking.reason;
console.log("".concat(name, "\u3060\u3051\u3069").concat(reason, " ").concat(mind, "\u7406\u7531\u306E\u4E00\u3064\u3067\u3059")); //分割代入の左辺にスプレッド演算子をおくことで、「残りの要素」を扱う
//オブジェクトのスプレッド演算子はECMAScript 2018で公式の仕様に仲間入り
// 配列

var _array = array,
    _array2 = _toArray(_array),
    aa = _array2[0],
    bb = _array2[1],
    rest = _array2.slice(2); // オブジェクト


var _obj = obj,
    aaa = _obj.aaa,
    bbb = _obj.bbb,
    rest2 = _objectWithoutProperties(_obj, ["aaa", "bbb"]);