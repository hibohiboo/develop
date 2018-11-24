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

  function u(t) {
    return n(3, t, function (e) {
      return function (n) {
        return function (r) {
          return t(e, n, r);
        };
      };
    });
  }

  function e(u) {
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

  var v = u(function (r, n, e) {
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
    return _(r, O(n));
  });

  function _(r, n) {
    switch (r.$) {
      case 3:
        return "boolean" == typeof n ? fn(n) : E("a BOOL", n);

      case 2:
        return "number" != typeof n ? E("an INT", n) : -2147483647 < n && n < 2147483647 && (0 | n) === n ? fn(n) : !isFinite(n) || n % 1 ? E("an INT", n) : fn(n);

      case 4:
        return "number" == typeof n ? fn(n) : E("a FLOAT", n);

      case 6:
        return "string" == typeof n ? fn(n) : n instanceof String ? fn(n + "") : E("a STRING", n);

      case 9:
        return null === n ? fn(r.c) : E("null", n);

      case 5:
        return fn(C(n));

      case 7:
        return Array.isArray(n) ? w(r.b, n, g) : E("a LIST", n);

      case 8:
        return Array.isArray(n) ? w(r.b, n, N) : E("an ARRAY", n);

      case 10:
        var e = r.d;
        if ("object" != typeof n || null === n || !(e in n)) return E("an OBJECT with a field named `" + e + "`", n);

        var t = _(r.b, n[e]);

        return on(t) ? t : an(l(vn, e, t.a));

      case 11:
        var u = r.e;
        if (!Array.isArray(n)) return E("an ARRAY", n);
        if (n.length <= u) return E("a LONGER array. Need index " + u + " but only see " + n.length + " entries", n);
        t = _(r.b, n[u]);
        return on(t) ? t : an(l(sn, u, t.a));

      case 12:
        if ("object" != typeof n || null === n || Array.isArray(n)) return E("an OBJECT", n);
        var a = d;

        for (var i in n) if (n.hasOwnProperty(i)) {
          t = _(r.b, n[i]);
          if (!on(t)) return an(l(vn, i, t.a));
          a = h($(i, t.a), a);
        }

        return fn(Qr(a));

      case 13:
        for (var f = r.f, o = r.g, c = 0; c < o.length; c++) {
          t = _(o[c], n);
          if (!on(t)) return t;
          f = f(t.a);
        }

        return fn(f);

      case 14:
        t = _(r.b, n);
        return on(t) ? _(r.h(t.a), n) : t;

      case 15:
        for (var v = d, s = r.g; s.b; s = s.b) {
          t = _(s.a, n);
          if (on(t)) return t;
          v = h(t.a, v);
        }

        return an(ln(Qr(v)));

      case 1:
        return an(l(cn, r.a, C(n)));

      case 0:
        return fn(r.a);
    }
  }

  function w(r, n, e) {
    for (var t = n.length, u = Array(t), a = 0; a < t; a++) {
      var i = _(r, n[a]);

      if (!on(i)) return an(l(sn, a, i.a));
      u[a] = i.a;
    }

    return fn(e(u));
  }

  function N(n) {
    return l(un, n.length, function (r) {
      return n[r];
    });
  }

  function E(r, n) {
    return an(l(cn, "Expecting " + r, C(n)));
  }

  function T(r, n) {
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
        return T(r.b, n.b);

      case 10:
        return r.d === n.d && T(r.b, n.b);

      case 11:
        return r.e === n.e && T(r.b, n.b);

      case 13:
        return r.f === n.f && L(r.g, n.g);

      case 14:
        return r.h === n.h && T(r.b, n.b);

      case 15:
        return L(r.g, n.g);
    }
  }

  function L(r, n) {
    var e = r.length;
    if (e !== n.length) return !1;

    for (var t = 0; t < e; t++) if (!T(r[t], n[t])) return !1;

    return !0;
  }

  function C(r) {
    return r;
  }

  function O(r) {
    return r;
  }

  C(null);

  function q(r) {
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
      r(q(B(n)));
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
    var i = l(k, r, C(n ? n.flags : void 0));
    on(i) || m(2);

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
      n.g(e), r(q(c));
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

  function V(r) {
    J[r] && m(3);
  }

  var X = t(function (r, n) {
    return n;
  });

  function Z(r) {
    var e,
        a = [],
        i = J[r].r,
        f = (e = 0, x(function (r) {
      var n = setTimeout(function () {
        r(q(c));
      }, e);
      return function () {
        clearTimeout(n);
      };
    }));
    return J[r].b = f, J[r].c = u(function (r, n) {
      for (; n.b; n = n.b) for (var e = a, t = O(i(n.a)), u = 0; u < e.length; u++) e[u](t);

      return f;
    }), {
      subscribe: function (r) {
        a.push(r);
      },
      unsubscribe: function (r) {
        var n = (a = a.slice()).indexOf(r);
        n < 0 || a.splice(n, 1);
      }
    };
  }

  var rr;
  var nr = "undefined" != typeof document ? document : {};

  function er(r, n) {
    r.appendChild(n);
  }

  function tr(r) {
    return {
      $: 0,
      a: r
    };
  }

  var ur = t(function (a, i) {
    return t(function (r, n) {
      for (var e = [], t = 0; n.b; n = n.b) {
        var u = n.a;
        t += u.b || 0, e.push(u);
      }

      return t += e.length, {
        $: 1,
        c: i,
        d: or(r),
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
        d: or(r),
        e: e,
        f: a,
        b: t
      };
    });
  })(void 0);
  var ar = t(function (r, n) {
    return {
      $: "a0",
      n: r,
      o: n
    };
  }),
      ir = t(function (r, n) {
    return {
      $: "a3",
      n: r,
      o: n
    };
  });
  var fr;

  function or(r) {
    for (var n = {}; r.b; r = r.b) {
      var e = r.a,
          t = e.$,
          u = e.n,
          a = e.o;

      if ("a2" !== t) {
        var i = n[t] || (n[t] = {});
        "a3" === t && "class" === u ? cr(i, u, a) : i[u] = a;
      } else "className" === u ? cr(n, u, O(a)) : n[u] = O(a);
    }

    return n;
  }

  function cr(r, n, e) {
    var t = r[n];
    r[n] = t ? t + " " + e : e;
  }

  function vr(r, n) {
    var e = r.$;
    if (5 === e) return vr(r.k || (r.k = r.m()), n);
    if (0 === e) return nr.createTextNode(r.a);

    if (4 === e) {
      for (var t = r.k, u = r.j; 4 === t.$;) "object" != typeof u ? u = [u, t.j] : u.push(t.j), t = t.k;

      var a = {
        j: u,
        p: n
      };
      return (i = vr(t, a)).elm_event_node_ref = a, i;
    }

    if (3 === e) return sr(i = r.h(r.g), n, r.d), i;
    var i = r.f ? nr.createElementNS(r.f, r.c) : nr.createElement(r.c);
    rr && "a" == r.c && i.addEventListener("click", rr(i)), sr(i, n, r.d);

    for (var f = r.e, o = 0; o < f.length; o++) er(i, vr(1 === e ? f[o] : f[o].b, n));

    return i;
  }

  function sr(r, n, e) {
    for (var t in e) {
      var u = e[t];
      "a1" === t ? lr(r, u) : "a0" === t ? hr(r, n, u) : "a3" === t ? br(r, u) : "a4" === t ? dr(r, u) : ("value" !== t || "checked" !== t || r[t] !== u) && (r[t] = u);
    }
  }

  function lr(r, n) {
    var e = r.style;

    for (var t in n) e[t] = n[t];
  }

  function br(r, n) {
    for (var e in n) {
      var t = n[e];
      t ? r.setAttribute(e, t) : r.removeAttribute(e);
    }
  }

  function dr(r, n) {
    for (var e in n) {
      var t = n[e],
          u = t.f,
          a = t.o;
      a ? r.setAttributeNS(u, e, a) : r.removeAttributeNS(u, e);
    }
  }

  function hr(r, n, e) {
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

        i = gr(n, a), r.addEventListener(u, i, fr && {
          passive: mn(a) < 2
        }), t[u] = i;
      } else r.removeEventListener(u, i), t[u] = void 0;
    }
  }

  try {
    window.addEventListener("t", null, Object.defineProperty({}, "passive", {
      get: function () {
        fr = !0;
      }
    }));
  } catch (r) {}

  function gr(v, r) {
    function s(r) {
      var n = s.q,
          e = _(n.a, r);

      if (on(e)) {
        for (var t, u = mn(n), a = e.a, i = u ? u < 3 ? a.a : a.k : a, f = 1 == u ? a.b : 3 == u && a.M, o = (f && r.stopPropagation(), (2 == u ? a.b : 3 == u && a.K) && r.preventDefault(), v); t = o.j;) {
          if ("function" == typeof t) i = t(i);else for (var c = t.length; c--;) i = t[c](i);
          o = o.p;
        }

        o(i, f);
      }
    }

    return s.q = r, s;
  }

  function $r(r, n) {
    return r.$ == n.$ && T(r.a, n.a);
  }

  function pr(r, n) {
    var e = [];
    return yr(r, n, e, 0), e;
  }

  function mr(r, n, e, t) {
    var u = {
      $: n,
      r: e,
      s: t,
      t: void 0,
      u: void 0
    };
    return r.push(u), u;
  }

  function yr(r, n, e, t) {
    if (r !== n) {
      var u = r.$,
          a = n.$;

      if (u !== a) {
        if (1 !== u || 2 !== a) return void mr(e, 0, t, n);
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
          return yr(r.k, n.k, v, 0), void (0 < v.length && mr(e, 1, t, v));

        case 4:
          for (var s = r.j, l = n.j, b = !1, d = r.k; 4 === d.$;) b = !0, "object" != typeof s ? s = [s, d.j] : s.push(d.j), d = d.k;

          for (var h = n.k; 4 === h.$;) b = !0, "object" != typeof l ? l = [l, h.j] : l.push(h.j), h = h.k;

          return b && s.length !== l.length ? void mr(e, 0, t, n) : ((b ? function (r, n) {
            for (var e = 0; e < r.length; e++) if (r[e] !== n[e]) return !1;

            return !0;
          }(s, l) : s === l) || mr(e, 2, t, l), void yr(d, h, e, t + 1));

        case 0:
          return void (r.a !== n.a && mr(e, 3, t, n.a));

        case 1:
          return void Ar(r, n, e, t, kr);

        case 2:
          return void Ar(r, n, e, t, _r);

        case 3:
          if (r.h !== n.h) return void mr(e, 0, t, n);
          var g = jr(r.d, n.d);
          g && mr(e, 4, t, g);
          var $ = n.i(r.g, n.g);
          return void ($ && mr(e, 5, t, $));
      }
    }
  }

  function Ar(r, n, e, t, u) {
    if (r.c === n.c && r.f === n.f) {
      var a = jr(r.d, n.d);
      a && mr(e, 4, t, a), u(r, n, e, t);
    } else mr(e, 0, t, n);
  }

  function jr(r, n, e) {
    var t;

    for (var u in r) if ("a1" !== u && "a0" !== u && "a3" !== u && "a4" !== u) {
      if (u in n) {
        var a = r[u],
            i = n[u];
        a === i && "value" !== u && "checked" !== u || "a0" === e && $r(a, i) || ((t = t || {})[u] = i);
      } else (t = t || {})[u] = e ? "a1" === e ? "" : "a0" === e || "a3" === e ? void 0 : {
        f: r[u].f,
        o: void 0
      } : "string" == typeof r[u] ? "" : null;
    } else {
      var f = jr(r[u], n[u] || {}, u);
      f && ((t = t || {})[u] = f);
    }

    for (var o in n) o in r || ((t = t || {})[o] = n[o]);

    return t;
  }

  function kr(r, n, e, t) {
    var u = r.e,
        a = n.e,
        i = u.length,
        f = a.length;
    f < i ? mr(e, 6, t, {
      v: f,
      i: i - f
    }) : i < f && mr(e, 7, t, {
      v: i,
      e: a
    });

    for (var o = i < f ? i : f, c = 0; c < o; c++) {
      var v = u[c];
      yr(v, a[c], e, ++t), t += v.b || 0;
    }
  }

  function _r(r, n, e, t) {
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
        if (w && j) yr(g, _, u, ++b), Nr(a, u, d, $, l, i), b += g.b || 0, Er(a, u, d, A, ++b), b += A.b || 0, s += 2, l += 2;else if (w) b++, Nr(a, u, h, $, l, i), yr(g, _, u, b), b += g.b || 0, s += 1, l += 2;else if (j) Er(a, u, d, g, ++b), b += g.b || 0, yr(A, $, u, ++b), b += A.b || 0, s += 2, l += 1;else {
          if (!p || y !== k) break;
          Er(a, u, d, g, ++b), Nr(a, u, h, $, l, i), b += g.b || 0, yr(A, _, u, ++b), b += A.b || 0, s += 2, l += 2;
        }
      } else yr(g, $, u, ++b), b += g.b || 0, s++, l++;
    }

    for (; s < c;) {
      var N;
      Er(a, u, (N = f[s]).a, g = N.b, ++b), b += g.b || 0, s++;
    }

    for (; l < v;) {
      var E,
          T = T || [];
      Nr(a, u, (E = o[l]).a, E.b, void 0, T), l++;
    }

    (0 < u.length || 0 < i.length || T) && mr(e, 8, t, {
      w: u,
      x: i,
      y: T
    });
  }

  var wr = "_elmW6BL";

  function Nr(r, n, e, t, u, a) {
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
      return yr(i.z, t, f, i.r), i.r = u, void (i.s.s = {
        w: f,
        A: i
      });
    }

    Nr(r, n, e + wr, t, u, a);
  }

  function Er(r, n, e, t, u) {
    var a = r[e];

    if (a) {
      if (0 === a.c) {
        a.c = 2;
        var i = [];
        return yr(t, a.z, i, u), void mr(n, 9, u, {
          w: i,
          A: a
        });
      }

      Er(r, n, e + wr, t, u);
    } else {
      var f = mr(n, 9, u, void 0);
      r[e] = {
        c: 1,
        z: t,
        r: u,
        s: f
      };
    }
  }

  function Tr(r, n, e, t) {
    !function r(n, e, t, u, a, i, f) {
      var o = t[u];
      var c = o.r;

      for (; c === a;) {
        var v = o.$;
        if (1 === v) Tr(n, e.k, o.s, f);else if (8 === v) {
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

  function Lr(r, n, e, t) {
    return 0 === e.length ? r : (Tr(r, n, e, t), Cr(r, e));
  }

  function Cr(r, n) {
    for (var e = 0; e < n.length; e++) {
      var t = n[e],
          u = t.t,
          a = Or(u, t);
      u === r && (r = a);
    }

    return r;
  }

  function Or(r, n) {
    switch (n.$) {
      case 0:
        return function (r, n, e) {
          var t = r.parentNode,
              u = vr(n, e);
          u.elm_event_node_ref || (u.elm_event_node_ref = r.elm_event_node_ref);
          t && u !== r && t.replaceChild(u, r);
          return u;
        }(r, n.s, n.u);

      case 4:
        return sr(r, n.u, n.s), r;

      case 3:
        return r.replaceData(0, r.length, n.s), r;

      case 1:
        return Cr(r, n.s);

      case 2:
        return r.elm_event_node_ref ? r.elm_event_node_ref.j = n.s : r.elm_event_node_ref = {
          j: n.s,
          p: n.u
        }, r;

      case 6:
        for (var e = n.s, t = 0; t < e.i; t++) r.removeChild(r.childNodes[e.v]);

        return r;

      case 7:
        for (var u = (e = n.s).e, a = r.childNodes[t = e.v]; t < u.length; t++) r.insertBefore(vr(u[t], n.u), a);

        return r;

      case 9:
        if (!(e = n.s)) return r.parentNode.removeChild(r), r;
        var i = e.A;
        return void 0 !== i.r && r.parentNode.removeChild(r), i.s = Cr(r, e.w), r;

      case 8:
        return function (r, n) {
          var e = n.s,
              t = function (r, n) {
            if (!r) return;

            for (var e = nr.createDocumentFragment(), t = 0; t < r.length; t++) {
              var u = r[t],
                  a = u.A;
              er(e, 2 === a.c ? a.s : vr(a.z, n.u));
            }

            return e;
          }(e.y, n);

          r = Cr(r, e.w);

          for (var u = e.x, a = 0; a < u.length; a++) {
            var i = u[a],
                f = i.A,
                o = 2 === f.c ? f.s : vr(f.z, n.u);
            r.insertBefore(o, r.childNodes[i.r]);
          }

          t && er(r, t);
          return r;
        }(r, n);

      case 5:
        return n.s(r);

      default:
        m(10);
    }
  }

  function qr(r) {
    if (3 === r.nodeType) return tr(r.textContent);
    if (1 !== r.nodeType) return tr("");

    for (var n = d, e = r.attributes, t = e.length; t--;) {
      var u = e[t];
      n = h(l(ir, u.name, u.value), n);
    }

    var a = r.tagName.toLowerCase(),
        i = d,
        f = r.childNodes;

    for (t = f.length; t--;) i = h(qr(f[t]), i);

    return s(ur, a, n, i);
  }

  var xr = e(function (n, r, e, f) {
    return G(r, f, n.as, n.aA, n.ay, function (t, r) {
      var u = n.aC,
          a = f.node,
          i = qr(a);
      return zr(r, function (r) {
        var n = u(r),
            e = pr(i, n);
        a = Lr(a, i, e, t), i = n;
      });
    });
  }),
      Fr = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : function (r) {
    setTimeout(r, 1e3 / 60);
  };

  function zr(e, t) {
    t(e);
    var u = 0;

    function a() {
      u = 1 === u ? 0 : (Fr(a), t(e), 1);
    }

    return function (r, n) {
      e = r, n ? (t(e), 2 === u && (u = 1)) : (0 === u && Fr(a), u = 2);
    };
  }

  var Br = {
    addEventListener: function () {},
    removeEventListener: function () {}
  };
  "undefined" != typeof document && document, "undefined" != typeof window && window;

  var Rr,
      Sr,
      Mr,
      Ir = e(function (r, n, e, t) {
    return {
      $: 0,
      a: r,
      b: n,
      c: e,
      d: t
    };
  }),
      Dr = f,
      Pr = y,
      Gr = t(function (r, n) {
    return j(n) / j(r);
  }),
      Jr = Pr(l(Gr, 2, 32)),
      Yr = [],
      Kr = b(Ir, 0, Jr, Yr, Yr),
      Wr = p,
      Hr = u(function (r, n, e) {
    for (;;) {
      if (!e.b) return n;
      var t = e.b,
          u = r,
          a = l(r, e.a, n);
      r = u, n = a, e = t;
    }
  }),
      Qr = function (r) {
    return s(Hr, Dr, d, r);
  },
      Ur = t(function (r, n) {
    for (;;) {
      var e = l(Wr, 32, r),
          t = e.b,
          u = l(Dr, {
        $: 0,
        a: e.a
      }, n);
      if (!t.b) return Qr(u);
      r = t, n = u;
    }
  }),
      Vr = t(function (r, n) {
    for (;;) {
      var e = Pr(n / 32);
      if (1 === e) return l(Wr, 32, r).a;
      r = l(Ur, r, d), n = e;
    }
  }),
      Xr = A,
      Zr = t(function (r, n) {
    return 0 < o(r, n) ? r : n;
  }),
      rn = function (r) {
    return r.length;
  },
      nn = t(function (r, n) {
    if (n.a) {
      var e = 32 * n.a,
          t = Xr(l(Gr, 32, e - 1)),
          u = r ? Qr(n.d) : n.d,
          a = l(Vr, u, n.a);
      return b(Ir, rn(n.c) + e, l(Zr, 5, t * Jr), a, n.c);
    }

    return b(Ir, rn(n.c), Jr, Yr, n.c);
  }),
      en = v,
      tn = a(function (r, n, e, t, u) {
    for (;;) {
      if (n < 0) return l(nn, !1, {
        d: t,
        a: e / 32 | 0,
        c: u
      });
      var a = {
        $: 1,
        a: s(en, 32, n, r)
      };
      r = r, n = n - 32, e = e, t = l(Dr, a, t), u = u;
    }
  }),
      un = t(function (r, n) {
    if (0 < r) {
      var e = r % 32;
      return i(tn, n, r - e - 32, r, d, s(en, e, r - e, n));
    }

    return Kr;
  }),
      an = function (r) {
    return {
      $: 1,
      a: r
    };
  },
      fn = function (r) {
    return {
      $: 0,
      a: r
    };
  },
      on = function (r) {
    return !r.$;
  },
      cn = t(function (r, n) {
    return {
      $: 3,
      a: r,
      b: n
    };
  }),
      vn = t(function (r, n) {
    return {
      $: 0,
      a: r,
      b: n
    };
  }),
      sn = t(function (r, n) {
    return {
      $: 1,
      a: r,
      b: n
    };
  }),
      ln = function (r) {
    return {
      $: 2,
      a: r
    };
  },
      bn = function (r) {
    return r + "";
  },
      dn = (Sr = C, V(Rr = "log"), J[Rr] = {
    e: X,
    r: Sr,
    a: Z
  }, W(Rr)),
      hn = H,
      gn = H(d),
      $n = t(function (r, n) {
    return $(r ? n - 1 : n + 1, hn(g([dn(n)])));
  }),
      pn = function (r) {
    return {
      $: 0,
      a: r
    };
  },
      mn = function (r) {
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
      yn = ur("button"),
      An = ur("div"),
      jn = tr,
      kn = ar,
      _n = t(function (r, n) {
    return l(kn, r, {
      $: 0,
      a: n
    });
  }),
      wn = function (r) {
    return l(_n, "click", pn(r));
  },
      Nn = q,
      En = Nn(0),
      Tn = e(function (r, n, e, t) {
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
            return l(r, u, l(r, i, l(r, o, l(r, c.a, 500 < e ? s(Hr, r, n, Qr(v)) : b(Tn, r, n, e + 1, v)))));
          }

          return l(r, u, l(r, i, l(r, o, n)));
        }

        return l(r, u, l(r, i, n));
      }

      return l(r, u, n);
    }

    return n;
  }),
      Ln = u(function (r, n, e) {
    return b(Tn, r, n, 0, e);
  }),
      Cn = t(function (e, r) {
    return s(Ln, t(function (r, n) {
      return l(Dr, e(r), n);
    }), d, r);
  }),
      On = F,
      qn = t(function (n, r) {
    return l(On, function (r) {
      return Nn(n(r));
    }, r);
  }),
      xn = u(function (e, r, t) {
    return l(On, function (n) {
      return l(On, function (r) {
        return Nn(l(e, n, r));
      }, t);
    }, r);
  }),
      Fn = K,
      zn = t(function (r, n) {
    var e = n;
    return R(l(On, Fn(r), e));
  });

  J.Task = {
    b: En,
    c: u(function (r, n) {
      return l(qn, function () {
        return 0;
      }, (e = l(Cn, zn(r), n), s(Ln, xn(Dr), Nn(d), e)));
      var e;
    }),
    d: u(function () {
      return Nn(0);
    }),
    e: t(function (r, n) {
      return l(qn, r, n);
    }),
    f: Mr
  };
  W("Task");
  var Bn,
      Rn = {
    $: 5
  },
      Sn = xr({
    as: function () {
      return $(0, hn(g([dn(0)])));
    },
    ay: function () {
      return gn;
    },
    aA: $n,
    aC: function (r) {
      return l(An, d, g([l(yn, g([wn(1)]), g([jn("-")])), l(An, d, g([jn(bn(r))])), l(yn, g([wn(0)]), g([jn("+")]))]));
    }
  });
  Bn = {
    Main: {
      init: Sn(Rn)(0)
    }
  }, r.Elm ? function r(n, e) {
    for (var t in e) t in n ? "init" == t ? m(6) : r(n[t], e[t]) : n[t] = e[t];
  }(r.Elm, Bn) : r.Elm = Bn;
}(this);