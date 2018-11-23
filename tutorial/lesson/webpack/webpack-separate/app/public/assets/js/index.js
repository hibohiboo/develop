/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _ElmTest = __webpack_require__(2); // cssを読み込む。（実際にはwebpackで分離される)


(function () {
  const tmpNode = document.getElementById('test');

  if (tmpNode === null) {
    return;
  }

  const mountNode = tmpNode;

  const app = _ElmTest.Elm.Main.init({
    node: mountNode
  });

  app.ports.log.subscribe(() => {
    console.log('test');
  });
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


!function (r) {
  "use strict";

  function n(r, n, e) {
    return e.a = r, e.f = n, e;
  }

  function t(e) {
    return n(2, e, function (n) {
      return function (r) {
        return e(n, r);
      };
    });
  }

  function e(t) {
    return n(3, t, function (e) {
      return function (n) {
        return function (r) {
          return t(e, n, r);
        };
      };
    });
  }

  function u(u) {
    return n(4, u, function (t) {
      return function (e) {
        return function (n) {
          return function (r) {
            return u(t, e, n, r);
          };
        };
      };
    });
  }

  function a(a) {
    return n(5, a, function (u) {
      return function (t) {
        return function (e) {
          return function (n) {
            return function (r) {
              return a(u, t, e, n, r);
            };
          };
        };
      };
    });
  }

  function l(r, n, e) {
    return 2 === r.a ? r.f(n, e) : r(n)(e);
  }

  function s(r, n, e, t) {
    return 3 === r.a ? r.f(n, e, t) : r(n)(e)(t);
  }

  function b(r, n, e, t, u) {
    return 4 === r.a ? r.f(n, e, t, u) : r(n)(e)(t)(u);
  }

  function i(r, n, e, t, u, a) {
    return 5 === r.a ? r.f(n, e, t, u, a) : r(n)(e)(t)(u)(a);
  }

  var d = {
    $: 0
  };

  function h(r, n) {
    return {
      $: 1,
      a: r,
      b: n
    };
  }

  var f = t(h);

  function g(r) {
    for (var n = d, e = r.length; e--;) n = h(r[e], n);

    return n;
  }

  function o(r, n, e) {
    if ("object" != typeof r) return r === n ? 0 : r < n ? -1 : 1;
    if (!r.$) return (e = o(r.a, n.a)) ? e : (e = o(r.b, n.b)) ? e : o(r.c, n.c);

    for (; r.b && n.b && !(e = o(r.a, n.a)); r = r.b, n = n.b);

    return e || (r.b ? 1 : n.b ? -1 : 0);
  }

  var c = 0;

  function $(r, n) {
    return {
      a: r,
      b: n
    };
  }

  var v = e(function (r, n, e) {
    for (var t = Array(r), u = 0; u < r; u++) t[u] = e(n + u);

    return t;
  }),
      p = t(function (r, n) {
    for (var e = Array(r), t = 0; t < r && n.b; t++) e[t] = n.a, n = n.b;

    return e.length = t, $(e, n);
  });

  function m(r) {
    throw Error("https://github.com/elm/core/blob/1.0.0/hints/" + r + ".md");
  }

  var y = Math.ceil,
      A = Math.floor,
      j = Math.log;
  var k = t(function (r, n) {
    return _(r, q(n));
  });

  function _(r, n) {
    switch (r.$) {
      case 3:
        return "boolean" == typeof n ? un(n) : E("a BOOL", n);

      case 2:
        return "number" != typeof n ? E("an INT", n) : -2147483647 < n && n < 2147483647 && (0 | n) === n ? un(n) : !isFinite(n) || n % 1 ? E("an INT", n) : un(n);

      case 4:
        return "number" == typeof n ? un(n) : E("a FLOAT", n);

      case 6:
        return "string" == typeof n ? un(n) : n instanceof String ? un(n + "") : E("a STRING", n);

      case 9:
        return null === n ? un(r.c) : E("null", n);

      case 5:
        return un(T(n));

      case 7:
        return Array.isArray(n) ? w(r.b, n, g) : E("a LIST", n);

      case 8:
        return Array.isArray(n) ? w(r.b, n, N) : E("an ARRAY", n);

      case 10:
        var e = r.d;
        if ("object" != typeof n || null === n || !(e in n)) return E("an OBJECT with a field named `" + e + "`", n);

        var t = _(r.b, n[e]);

        return Sr(t) ? t : tn(l(fn, e, t.a));

      case 11:
        var u = r.e;
        if (!Array.isArray(n)) return E("an ARRAY", n);
        if (n.length <= u) return E("a LONGER array. Need index " + u + " but only see " + n.length + " entries", n);
        t = _(r.b, n[u]);
        return Sr(t) ? t : tn(l(on, u, t.a));

      case 12:
        if ("object" != typeof n || null === n || Array.isArray(n)) return E("an OBJECT", n);
        var a = d;

        for (var i in n) if (n.hasOwnProperty(i)) {
          t = _(r.b, n[i]);
          if (!Sr(t)) return tn(l(fn, i, t.a));
          a = h($(i, t.a), a);
        }

        return un(Wr(a));

      case 13:
        for (var f = r.f, o = r.g, c = 0; c < o.length; c++) {
          t = _(o[c], n);
          if (!Sr(t)) return t;
          f = f(t.a);
        }

        return un(f);

      case 14:
        t = _(r.b, n);
        return Sr(t) ? _(r.h(t.a), n) : t;

      case 15:
        for (var v = d, s = r.g; s.b; s = s.b) {
          t = _(s.a, n);
          if (Sr(t)) return t;
          v = h(t.a, v);
        }

        return tn(cn(Wr(v)));

      case 1:
        return tn(l(an, r.a, T(n)));

      case 0:
        return un(r.a);
    }
  }

  function w(r, n, e) {
    for (var t = n.length, u = Array(t), a = 0; a < t; a++) {
      var i = _(r, n[a]);

      if (!Sr(i)) return tn(l(on, a, i.a));
      u[a] = i.a;
    }

    return un(e(u));
  }

  function N(n) {
    return l(en, n.length, function (r) {
      return n[r];
    });
  }

  function E(r, n) {
    return tn(l(an, "Expecting " + r, T(n)));
  }

  function C(r, n) {
    if (r === n) return !0;
    if (r.$ !== n.$) return !1;

    switch (r.$) {
      case 0:
      case 1:
        return r.a === n.a;

      case 3:
      case 2:
      case 4:
      case 6:
      case 5:
        return !0;

      case 9:
        return r.c === n.c;

      case 7:
      case 8:
      case 12:
        return C(r.b, n.b);

      case 10:
        return r.d === n.d && C(r.b, n.b);

      case 11:
        return r.e === n.e && C(r.b, n.b);

      case 13:
        return r.f === n.f && L(r.g, n.g);

      case 14:
        return r.h === n.h && C(r.b, n.b);

      case 15:
        return L(r.g, n.g);
    }
  }

  function L(r, n) {
    var e = r.length;
    if (e !== n.length) return !1;

    for (var t = 0; t < e; t++) if (!C(r[t], n[t])) return !1;

    return !0;
  }

  function T(r) {
    return r;
  }

  function q(r) {
    return r;
  }

  T(null);

  function O(r) {
    return {
      $: 0,
      a: r
    };
  }

  function x(r) {
    return {
      $: 2,
      b: r,
      c: null
    };
  }

  var F = t(function (r, n) {
    return {
      $: 3,
      b: r,
      d: n
    };
  });
  var z = 0;

  function B(r) {
    var n = {
      $: 0,
      e: z++,
      f: r,
      g: null,
      h: []
    };
    return D(n), n;
  }

  function R(n) {
    return x(function (r) {
      r(O(B(n)));
    });
  }

  function S(r, n) {
    r.h.push(n), D(r);
  }

  var M = !1,
      I = [];

  function D(r) {
    if (I.push(r), !M) {
      for (M = !0; r = I.shift();) P(r);

      M = !1;
    }
  }

  function P(n) {
    for (; n.f;) {
      var r = n.f.$;

      if (0 === r || 1 === r) {
        for (; n.g && n.g.$ !== r;) n.g = n.g.i;

        if (!n.g) return;
        n.f = n.g.b(n.f.a), n.g = n.g.i;
      } else {
        if (2 === r) return void (n.f.c = n.f.b(function (r) {
          n.f = r, D(n);
        }));

        if (5 === r) {
          if (0 === n.h.length) return;
          n.f = n.f.b(n.h.shift());
        } else n.g = {
          $: 3 === r ? 0 : 1,
          b: n.f.b,
          i: n.g
        }, n.f = n.f.d;
      }
    }
  }

  function G(r, n, e, t, u, a) {
    var i = l(k, r, T(n ? n.flags : void 0));
    Sr(i) || m(2);

    var f = {},
        o = (i = e(i.a)).a,
        c = a(s, o),
        v = function (r, n) {
      var e;

      for (var t in J) {
        var u = J[t];
        u.a && ((e = e || {})[t] = u.a(t, n)), r[t] = Y(u, n);
      }

      return e;
    }(f, s);

    function s(r, n) {
      c(o = (i = l(t, r, o)).a, n), Q(f, i.b, u(o));
    }

    return Q(f, i.b, u(o)), v ? {
      ports: v
    } : {};
  }

  var J = {};

  function Y(r, n) {
    var t = {
      g: n,
      h: void 0
    },
        u = r.c,
        a = r.d,
        i = r.e,
        f = r.f;

    function o(e) {
      return l(F, o, {
        $: 5,
        b: function (r) {
          var n = r.a;
          return 0 === r.$ ? s(a, t, n, e) : i && f ? b(u, t, n.i, n.j, e) : s(u, t, i ? n.i : n.j, e);
        }
      });
    }

    return t.h = B(l(F, o, r.b));
  }

  var K = t(function (n, e) {
    return x(function (r) {
      n.g(e), r(O(c));
    });
  });

  function W(n) {
    return function (r) {
      return {
        $: 1,
        k: n,
        l: r
      };
    };
  }

  function H(r) {
    return {
      $: 2,
      m: r
    };
  }

  function Q(r, n, e) {
    var t = {};

    for (var u in U(!0, n, t, null), U(!1, e, t, null), r) S(r[u], {
      $: "fx",
      a: t[u] || {
        i: d,
        j: d
      }
    });
  }

  function U(r, n, e, t) {
    switch (n.$) {
      case 1:
        var u = n.k,
            a = function (r, n, e, t) {
          function u(r) {
            for (var n = e; n; n = n.q) r = n.p(r);

            return r;
          }

          return l(r ? J[n].e : J[n].f, u, t);
        }(r, u, t, n.l);

        return void (e[u] = function (r, n, e) {
          return e = e || {
            i: d,
            j: d
          }, r ? e.i = h(n, e.i) : e.j = h(n, e.j), e;
        }(r, a, e[u]));

      case 2:
        for (var i = n.m; i.b; i = i.b) U(r, i.a, e, t);

        return;

      case 3:
        return void U(r, n.o, e, {
          p: n.n,
          q: t
        });
    }
  }

  var V;
  var X = "undefined" != typeof document ? document : {};

  function Z(r, n) {
    r.appendChild(n);
  }

  function rr(r) {
    return {
      $: 0,
      a: r
    };
  }

  var nr = t(function (a, i) {
    return t(function (r, n) {
      for (var e = [], t = 0; n.b; n = n.b) {
        var u = n.a;
        t += u.b || 0, e.push(u);
      }

      return t += e.length, {
        $: 1,
        c: i,
        d: ar(r),
        e: e,
        f: a,
        b: t
      };
    });
  })(void 0);
  t(function (a, i) {
    return t(function (r, n) {
      for (var e = [], t = 0; n.b; n = n.b) {
        var u = n.a;
        t += u.b.b || 0, e.push(u);
      }

      return t += e.length, {
        $: 2,
        c: i,
        d: ar(r),
        e: e,
        f: a,
        b: t
      };
    });
  })(void 0);
  var er = t(function (r, n) {
    return {
      $: "a0",
      n: r,
      o: n
    };
  }),
      tr = t(function (r, n) {
    return {
      $: "a3",
      n: r,
      o: n
    };
  });
  var ur;

  function ar(r) {
    for (var n = {}; r.b; r = r.b) {
      var e = r.a,
          t = e.$,
          u = e.n,
          a = e.o;

      if ("a2" !== t) {
        var i = n[t] || (n[t] = {});
        "a3" === t && "class" === u ? ir(i, u, a) : i[u] = a;
      } else "className" === u ? ir(n, u, q(a)) : n[u] = q(a);
    }

    return n;
  }

  function ir(r, n, e) {
    var t = r[n];
    r[n] = t ? t + " " + e : e;
  }

  function fr(r, n) {
    var e = r.$;
    if (5 === e) return fr(r.k || (r.k = r.m()), n);
    if (0 === e) return X.createTextNode(r.a);

    if (4 === e) {
      for (var t = r.k, u = r.j; 4 === t.$;) "object" != typeof u ? u = [u, t.j] : u.push(t.j), t = t.k;

      var a = {
        j: u,
        p: n
      };
      return (i = fr(t, a)).elm_event_node_ref = a, i;
    }

    if (3 === e) return or(i = r.h(r.g), n, r.d), i;
    var i = r.f ? X.createElementNS(r.f, r.c) : X.createElement(r.c);
    V && "a" == r.c && i.addEventListener("click", V(i)), or(i, n, r.d);

    for (var f = r.e, o = 0; o < f.length; o++) Z(i, fr(1 === e ? f[o] : f[o].b, n));

    return i;
  }

  function or(r, n, e) {
    for (var t in e) {
      var u = e[t];
      "a1" === t ? cr(r, u) : "a0" === t ? lr(r, n, u) : "a3" === t ? vr(r, u) : "a4" === t ? sr(r, u) : ("value" !== t || "checked" !== t || r[t] !== u) && (r[t] = u);
    }
  }

  function cr(r, n) {
    var e = r.style;

    for (var t in n) e[t] = n[t];
  }

  function vr(r, n) {
    for (var e in n) {
      var t = n[e];
      t ? r.setAttribute(e, t) : r.removeAttribute(e);
    }
  }

  function sr(r, n) {
    for (var e in n) {
      var t = n[e],
          u = t.f,
          a = t.o;
      a ? r.setAttributeNS(u, e, a) : r.removeAttributeNS(u, e);
    }
  }

  function lr(r, n, e) {
    var t = r.elmFs || (r.elmFs = {});

    for (var u in e) {
      var a = e[u],
          i = t[u];

      if (a) {
        if (i) {
          if (i.q.$ === a.$) {
            i.q = a;
            continue;
          }

          r.removeEventListener(u, i);
        }

        i = br(n, a), r.addEventListener(u, i, ur && {
          passive: sn(a) < 2
        }), t[u] = i;
      } else r.removeEventListener(u, i), t[u] = void 0;
    }
  }

  try {
    window.addEventListener("t", null, Object.defineProperty({}, "passive", {
      get: function () {
        ur = !0;
      }
    }));
  } catch (r) {}

  function br(v, r) {
    function s(r) {
      var n = s.q,
          e = _(n.a, r);

      if (Sr(e)) {
        for (var t, u = sn(n), a = e.a, i = u ? u < 3 ? a.a : a.k : a, f = 1 == u ? a.b : 3 == u && a.M, o = (f && r.stopPropagation(), (2 == u ? a.b : 3 == u && a.K) && r.preventDefault(), v); t = o.j;) {
          if ("function" == typeof t) i = t(i);else for (var c = t.length; c--;) i = t[c](i);
          o = o.p;
        }

        o(i, f);
      }
    }

    return s.q = r, s;
  }

  function dr(r, n) {
    return r.$ == n.$ && C(r.a, n.a);
  }

  function hr(r, n) {
    var e = [];
    return $r(r, n, e, 0), e;
  }

  function gr(r, n, e, t) {
    var u = {
      $: n,
      r: e,
      s: t,
      t: void 0,
      u: void 0
    };
    return r.push(u), u;
  }

  function $r(r, n, e, t) {
    if (r !== n) {
      var u = r.$,
          a = n.$;

      if (u !== a) {
        if (1 !== u || 2 !== a) return void gr(e, 0, t, n);
        n = function (r) {
          for (var n = r.e, e = n.length, t = Array(e), u = 0; u < e; u++) t[u] = n[u].b;

          return {
            $: 1,
            c: r.c,
            d: r.d,
            e: t,
            f: r.f,
            b: r.b
          };
        }(n), a = 1;
      }

      switch (a) {
        case 5:
          for (var i = r.l, f = n.l, o = i.length, c = o === f.length; c && o--;) c = i[o] === f[o];

          if (c) return void (n.k = r.k);
          n.k = n.m();
          var v = [];
          return $r(r.k, n.k, v, 0), void (0 < v.length && gr(e, 1, t, v));

        case 4:
          for (var s = r.j, l = n.j, b = !1, d = r.k; 4 === d.$;) b = !0, "object" != typeof s ? s = [s, d.j] : s.push(d.j), d = d.k;

          for (var h = n.k; 4 === h.$;) b = !0, "object" != typeof l ? l = [l, h.j] : l.push(h.j), h = h.k;

          return b && s.length !== l.length ? void gr(e, 0, t, n) : ((b ? function (r, n) {
            for (var e = 0; e < r.length; e++) if (r[e] !== n[e]) return !1;

            return !0;
          }(s, l) : s === l) || gr(e, 2, t, l), void $r(d, h, e, t + 1));

        case 0:
          return void (r.a !== n.a && gr(e, 3, t, n.a));

        case 1:
          return void pr(r, n, e, t, yr);

        case 2:
          return void pr(r, n, e, t, Ar);

        case 3:
          if (r.h !== n.h) return void gr(e, 0, t, n);
          var g = mr(r.d, n.d);
          g && gr(e, 4, t, g);
          var $ = n.i(r.g, n.g);
          return void ($ && gr(e, 5, t, $));
      }
    }
  }

  function pr(r, n, e, t, u) {
    if (r.c === n.c && r.f === n.f) {
      var a = mr(r.d, n.d);
      a && gr(e, 4, t, a), u(r, n, e, t);
    } else gr(e, 0, t, n);
  }

  function mr(r, n, e) {
    var t;

    for (var u in r) if ("a1" !== u && "a0" !== u && "a3" !== u && "a4" !== u) {
      if (u in n) {
        var a = r[u],
            i = n[u];
        a === i && "value" !== u && "checked" !== u || "a0" === e && dr(a, i) || ((t = t || {})[u] = i);
      } else (t = t || {})[u] = e ? "a1" === e ? "" : "a0" === e || "a3" === e ? void 0 : {
        f: r[u].f,
        o: void 0
      } : "string" == typeof r[u] ? "" : null;
    } else {
      var f = mr(r[u], n[u] || {}, u);
      f && ((t = t || {})[u] = f);
    }

    for (var o in n) o in r || ((t = t || {})[o] = n[o]);

    return t;
  }

  function yr(r, n, e, t) {
    var u = r.e,
        a = n.e,
        i = u.length,
        f = a.length;
    f < i ? gr(e, 6, t, {
      v: f,
      i: i - f
    }) : i < f && gr(e, 7, t, {
      v: i,
      e: a
    });

    for (var o = i < f ? i : f, c = 0; c < o; c++) {
      var v = u[c];
      $r(v, a[c], e, ++t), t += v.b || 0;
    }
  }

  function Ar(r, n, e, t) {
    for (var u = [], a = {}, i = [], f = r.e, o = n.e, c = f.length, v = o.length, s = 0, l = 0, b = t; s < c && l < v;) {
      var d = (N = f[s]).a,
          h = (E = o[l]).a,
          g = N.b,
          $ = E.b;

      if (d !== h) {
        var p = f[s + 1],
            m = o[l + 1];
        if (p) var y = p.a,
            A = p.b,
            j = h === y;
        if (m) var k = m.a,
            _ = m.b,
            w = d === k;
        if (w && j) $r(g, _, u, ++b), kr(a, u, d, $, l, i), b += g.b || 0, _r(a, u, d, A, ++b), b += A.b || 0, s += 2, l += 2;else if (w) b++, kr(a, u, h, $, l, i), $r(g, _, u, b), b += g.b || 0, s += 1, l += 2;else if (j) _r(a, u, d, g, ++b), b += g.b || 0, $r(A, $, u, ++b), b += A.b || 0, s += 2, l += 1;else {
          if (!p || y !== k) break;
          _r(a, u, d, g, ++b), kr(a, u, h, $, l, i), b += g.b || 0, $r(A, _, u, ++b), b += A.b || 0, s += 2, l += 2;
        }
      } else $r(g, $, u, ++b), b += g.b || 0, s++, l++;
    }

    for (; s < c;) {
      var N;
      _r(a, u, (N = f[s]).a, g = N.b, ++b), b += g.b || 0, s++;
    }

    for (; l < v;) {
      var E,
          C = C || [];
      kr(a, u, (E = o[l]).a, E.b, void 0, C), l++;
    }

    (0 < u.length || 0 < i.length || C) && gr(e, 8, t, {
      w: u,
      x: i,
      y: C
    });
  }

  var jr = "_elmW6BL";

  function kr(r, n, e, t, u, a) {
    var i = r[e];
    if (!i) return a.push({
      r: u,
      A: i = {
        c: 0,
        z: t,
        r: u,
        s: void 0
      }
    }), void (r[e] = i);

    if (1 === i.c) {
      a.push({
        r: u,
        A: i
      }), i.c = 2;
      var f = [];
      return $r(i.z, t, f, i.r), i.r = u, void (i.s.s = {
        w: f,
        A: i
      });
    }

    kr(r, n, e + jr, t, u, a);
  }

  function _r(r, n, e, t, u) {
    var a = r[e];

    if (a) {
      if (0 === a.c) {
        a.c = 2;
        var i = [];
        return $r(t, a.z, i, u), void gr(n, 9, u, {
          w: i,
          A: a
        });
      }

      _r(r, n, e + jr, t, u);
    } else {
      var f = gr(n, 9, u, void 0);
      r[e] = {
        c: 1,
        z: t,
        r: u,
        s: f
      };
    }
  }

  function wr(r, n, e, t) {
    !function r(n, e, t, u, a, i, f) {
      var o = t[u];
      var c = o.r;

      for (; c === a;) {
        var v = o.$;
        if (1 === v) wr(n, e.k, o.s, f);else if (8 === v) {
          o.t = n, o.u = f;
          var s = o.s.w;
          0 < s.length && r(n, e, s, 0, a, i, f);
        } else if (9 === v) {
          o.t = n, o.u = f;
          var l = o.s;

          if (l) {
            l.A.s = n;
            var s = l.w;
            0 < s.length && r(n, e, s, 0, a, i, f);
          }
        } else o.t = n, o.u = f;
        if (!(o = t[++u]) || (c = o.r) > i) return u;
      }

      var b = e.$;

      if (4 === b) {
        for (var d = e.k; 4 === d.$;) d = d.k;

        return r(n, d, t, u, a + 1, i, n.elm_event_node_ref);
      }

      var h = e.e;
      var g = n.childNodes;

      for (var $ = 0; $ < h.length; $++) {
        var p = 1 === b ? h[$] : h[$].b,
            m = ++a + (p.b || 0);
        if (a <= c && c <= m && (u = r(g[$], p, t, u, a, m, f), !(o = t[u]) || (c = o.r) > i)) return u;
        a = m;
      }

      return u;
    }(r, n, e, 0, 0, n.b, t);
  }

  function Nr(r, n, e, t) {
    return 0 === e.length ? r : (wr(r, n, e, t), Er(r, e));
  }

  function Er(r, n) {
    for (var e = 0; e < n.length; e++) {
      var t = n[e],
          u = t.t,
          a = Cr(u, t);
      u === r && (r = a);
    }

    return r;
  }

  function Cr(r, n) {
    switch (n.$) {
      case 0:
        return function (r, n, e) {
          var t = r.parentNode,
              u = fr(n, e);
          u.elm_event_node_ref || (u.elm_event_node_ref = r.elm_event_node_ref);
          t && u !== r && t.replaceChild(u, r);
          return u;
        }(r, n.s, n.u);

      case 4:
        return or(r, n.u, n.s), r;

      case 3:
        return r.replaceData(0, r.length, n.s), r;

      case 1:
        return Er(r, n.s);

      case 2:
        return r.elm_event_node_ref ? r.elm_event_node_ref.j = n.s : r.elm_event_node_ref = {
          j: n.s,
          p: n.u
        }, r;

      case 6:
        for (var e = n.s, t = 0; t < e.i; t++) r.removeChild(r.childNodes[e.v]);

        return r;

      case 7:
        for (var u = (e = n.s).e, a = r.childNodes[t = e.v]; t < u.length; t++) r.insertBefore(fr(u[t], n.u), a);

        return r;

      case 9:
        if (!(e = n.s)) return r.parentNode.removeChild(r), r;
        var i = e.A;
        return void 0 !== i.r && r.parentNode.removeChild(r), i.s = Er(r, e.w), r;

      case 8:
        return function (r, n) {
          var e = n.s,
              t = function (r, n) {
            if (!r) return;

            for (var e = X.createDocumentFragment(), t = 0; t < r.length; t++) {
              var u = r[t],
                  a = u.A;
              Z(e, 2 === a.c ? a.s : fr(a.z, n.u));
            }

            return e;
          }(e.y, n);

          r = Er(r, e.w);

          for (var u = e.x, a = 0; a < u.length; a++) {
            var i = u[a],
                f = i.A,
                o = 2 === f.c ? f.s : fr(f.z, n.u);
            r.insertBefore(o, r.childNodes[i.r]);
          }

          t && Z(r, t);
          return r;
        }(r, n);

      case 5:
        return n.s(r);

      default:
        m(10);
    }
  }

  function Lr(r) {
    if (3 === r.nodeType) return rr(r.textContent);
    if (1 !== r.nodeType) return rr("");

    for (var n = d, e = r.attributes, t = e.length; t--;) {
      var u = e[t];
      n = h(l(tr, u.name, u.value), n);
    }

    var a = r.tagName.toLowerCase(),
        i = d,
        f = r.childNodes;

    for (t = f.length; t--;) i = h(Lr(f[t]), i);

    return s(nr, a, n, i);
  }

  var Tr = u(function (n, r, e, f) {
    return G(r, f, n.as, n.aA, n.ay, function (t, r) {
      var u = n.aC,
          a = f.node,
          i = Lr(a);
      return Or(r, function (r) {
        var n = u(r),
            e = hr(i, n);
        a = Nr(a, i, e, t), i = n;
      });
    });
  }),
      qr = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : function (r) {
    setTimeout(r, 1e3 / 60);
  };

  function Or(e, t) {
    t(e);
    var u = 0;

    function a() {
      u = 1 === u ? 0 : (qr(a), t(e), 1);
    }

    return function (r, n) {
      e = r, n ? (t(e), 2 === u && (u = 1)) : (0 === u && qr(a), u = 2);
    };
  }

  var xr = {
    addEventListener: function () {},
    removeEventListener: function () {}
  };
  "undefined" != typeof document && document, "undefined" != typeof window && window;

  var Fr,
      zr = f,
      Br = t(function (r, n) {
    return r ? n - 1 : n + 1;
  }),
      Rr = function (r) {
    return r + "";
  },
      Sr = function (r) {
    return !r.$;
  },
      Mr = u(function (r, n, e, t) {
    return {
      $: 0,
      a: r,
      b: n,
      c: e,
      d: t
    };
  }),
      Ir = y,
      Dr = t(function (r, n) {
    return j(n) / j(r);
  }),
      Pr = Ir(l(Dr, 2, 32)),
      Gr = [],
      Jr = b(Mr, 0, Pr, Gr, Gr),
      Yr = p,
      Kr = e(function (r, n, e) {
    for (;;) {
      if (!e.b) return n;
      var t = e.b,
          u = r,
          a = l(r, e.a, n);
      r = u, n = a, e = t;
    }
  }),
      Wr = function (r) {
    return s(Kr, zr, d, r);
  },
      Hr = t(function (r, n) {
    for (;;) {
      var e = l(Yr, 32, r),
          t = e.b,
          u = l(zr, {
        $: 0,
        a: e.a
      }, n);
      if (!t.b) return Wr(u);
      r = t, n = u;
    }
  }),
      Qr = t(function (r, n) {
    for (;;) {
      var e = Ir(n / 32);
      if (1 === e) return l(Yr, 32, r).a;
      r = l(Hr, r, d), n = e;
    }
  }),
      Ur = A,
      Vr = t(function (r, n) {
    return 0 < o(r, n) ? r : n;
  }),
      Xr = function (r) {
    return r.length;
  },
      Zr = t(function (r, n) {
    if (n.a) {
      var e = 32 * n.a,
          t = Ur(l(Dr, 32, e - 1)),
          u = r ? Wr(n.d) : n.d,
          a = l(Qr, u, n.a);
      return b(Mr, Xr(n.c) + e, l(Vr, 5, t * Pr), a, n.c);
    }

    return b(Mr, Xr(n.c), Pr, Gr, n.c);
  }),
      rn = v,
      nn = a(function (r, n, e, t, u) {
    for (;;) {
      if (n < 0) return l(Zr, !1, {
        d: t,
        a: e / 32 | 0,
        c: u
      });
      var a = {
        $: 1,
        a: s(rn, 32, n, r)
      };
      r = r, n = n - 32, e = e, t = l(zr, a, t), u = u;
    }
  }),
      en = t(function (r, n) {
    if (0 < r) {
      var e = r % 32;
      return i(nn, n, r - e - 32, r, d, s(rn, e, r - e, n));
    }

    return Jr;
  }),
      tn = function (r) {
    return {
      $: 1,
      a: r
    };
  },
      un = function (r) {
    return {
      $: 0,
      a: r
    };
  },
      an = t(function (r, n) {
    return {
      $: 3,
      a: r,
      b: n
    };
  }),
      fn = t(function (r, n) {
    return {
      $: 0,
      a: r,
      b: n
    };
  }),
      on = t(function (r, n) {
    return {
      $: 1,
      a: r,
      b: n
    };
  }),
      cn = function (r) {
    return {
      $: 2,
      a: r
    };
  },
      vn = function (r) {
    return {
      $: 0,
      a: r
    };
  },
      sn = function (r) {
    switch (r.$) {
      case 0:
        return 0;

      case 1:
        return 1;

      case 2:
        return 2;

      default:
        return 3;
    }
  },
      ln = nr("button"),
      bn = nr("div"),
      dn = rr,
      hn = er,
      gn = t(function (r, n) {
    return l(hn, r, {
      $: 0,
      a: n
    });
  }),
      $n = function (r) {
    return l(gn, "click", vn(r));
  },
      pn = H(d),
      mn = H(d),
      yn = O,
      An = yn(0),
      jn = u(function (r, n, e, t) {
    if (t.b) {
      var u = t.a,
          a = t.b;

      if (a.b) {
        var i = a.a,
            f = a.b;

        if (f.b) {
          var o = f.a,
              c = f.b;

          if (c.b) {
            var v = c.b;
            return l(r, u, l(r, i, l(r, o, l(r, c.a, 500 < e ? s(Kr, r, n, Wr(v)) : b(jn, r, n, e + 1, v)))));
          }

          return l(r, u, l(r, i, l(r, o, n)));
        }

        return l(r, u, l(r, i, n));
      }

      return l(r, u, n);
    }

    return n;
  }),
      kn = e(function (r, n, e) {
    return b(jn, r, n, 0, e);
  }),
      _n = t(function (e, r) {
    return s(kn, t(function (r, n) {
      return l(zr, e(r), n);
    }), d, r);
  }),
      wn = F,
      Nn = t(function (n, r) {
    return l(wn, function (r) {
      return yn(n(r));
    }, r);
  }),
      En = e(function (e, r, t) {
    return l(wn, function (n) {
      return l(wn, function (r) {
        return yn(l(e, n, r));
      }, t);
    }, r);
  }),
      Cn = K,
      Ln = t(function (r, n) {
    var e = n;
    return R(l(wn, Cn(r), e));
  });

  J.Task = {
    b: An,
    c: e(function (r, n) {
      return l(Nn, function () {
        return 0;
      }, (e = l(_n, Ln(r), n), s(kn, En(zr), yn(d), e)));
      var e;
    }),
    d: e(function () {
      return yn(0);
    }),
    e: t(function (r, n) {
      return l(Nn, r, n);
    }),
    f: Fr
  };
  W("Task");
  var Tn,
      qn,
      On = (Tn = {
    as: 0,
    aA: Br,
    aC: function (r) {
      return l(bn, d, g([l(ln, g([$n(1)]), g([dn("-")])), l(bn, d, g([dn(Rr(r))])), l(ln, g([$n(0)]), g([dn("+")]))]));
    }
  }, Tr({
    as: function () {
      return $(Tn.as, pn);
    },
    ay: function () {
      return mn;
    },
    aA: t(function (r, n) {
      return $(l(Tn.aA, r, n), pn);
    }),
    aC: Tn.aC
  }));
  qn = {
    Main: {
      init: On(vn(0))(0)
    }
  }, r.Elm ? function r(n, e) {
    for (var t in e) t in n ? "init" == t ? m(6) : r(n[t], e[t]) : n[t] = e[t];
  }(r.Elm, qn) : r.Elm = qn;
}(void 0);

/***/ })
/******/ ]);