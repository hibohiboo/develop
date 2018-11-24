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
        return "boolean" == typeof n ? on(n) : E("a BOOL", n);

      case 2:
        return "number" != typeof n ? E("an INT", n) : -2147483647 < n && n < 2147483647 && (0 | n) === n ? on(n) : !isFinite(n) || n % 1 ? E("an INT", n) : on(n);

      case 4:
        return "number" == typeof n ? on(n) : E("a FLOAT", n);

      case 6:
        return "string" == typeof n ? on(n) : n instanceof String ? on(n + "") : E("a STRING", n);

      case 9:
        return null === n ? on(r.c) : E("null", n);

      case 5:
        return on(C(n));

      case 7:
        return Array.isArray(n) ? w(r.b, n, g) : E("a LIST", n);

      case 8:
        return Array.isArray(n) ? w(r.b, n, N) : E("an ARRAY", n);

      case 10:
        var e = r.d;
        if ("object" != typeof n || null === n || !(e in n)) return E("an OBJECT with a field named `" + e + "`", n);

        var t = _(r.b, n[e]);

        return cn(t) ? t : fn(l(sn, e, t.a));

      case 11:
        var u = r.e;
        if (!Array.isArray(n)) return E("an ARRAY", n);
        if (n.length <= u) return E("a LONGER array. Need index " + u + " but only see " + n.length + " entries", n);
        t = _(r.b, n[u]);
        return cn(t) ? t : fn(l(ln, u, t.a));

      case 12:
        if ("object" != typeof n || null === n || Array.isArray(n)) return E("an OBJECT", n);
        var a = d;

        for (var i in n) if (n.hasOwnProperty(i)) {
          t = _(r.b, n[i]);
          if (!cn(t)) return fn(l(sn, i, t.a));
          a = h($(i, t.a), a);
        }

        return on(Ur(a));

      case 13:
        for (var f = r.f, o = r.g, c = 0; c < o.length; c++) {
          t = _(o[c], n);
          if (!cn(t)) return t;
          f = f(t.a);
        }

        return on(f);

      case 14:
        t = _(r.b, n);
        return cn(t) ? _(r.h(t.a), n) : t;

      case 15:
        for (var v = d, s = r.g; s.b; s = s.b) {
          t = _(s.a, n);
          if (cn(t)) return t;
          v = h(t.a, v);
        }

        return fn(bn(Ur(v)));

      case 1:
        return fn(l(vn, r.a, C(n)));

      case 0:
        return on(r.a);
    }
  }

  function w(r, n, e) {
    for (var t = n.length, u = Array(t), a = 0; a < t; a++) {
      var i = _(r, n[a]);

      if (!cn(i)) return fn(l(ln, a, i.a));
      u[a] = i.a;
    }

    return on(e(u));
  }

  function N(n) {
    return l(an, n.length, function (r) {
      return n[r];
    });
  }

  function E(r, n) {
    return fn(l(vn, "Expecting " + r, C(n)));
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

  var q = C(null);

  function x(r) {
    return {
      $: 0,
      a: r
    };
  }

  function F(r) {
    return {
      $: 2,
      b: r,
      c: null
    };
  }

  var z = t(function (r, n) {
    return {
      $: 3,
      b: r,
      d: n
    };
  });
  var B = 0;

  function R(r) {
    var n = {
      $: 0,
      e: B++,
      f: r,
      g: null,
      h: []
    };
    return P(n), n;
  }

  function S(n) {
    return F(function (r) {
      r(x(R(n)));
    });
  }

  function M(r, n) {
    r.h.push(n), P(r);
  }

  var I = !1,
      D = [];

  function P(r) {
    if (D.push(r), !I) {
      for (I = !0; r = D.shift();) G(r);

      I = !1;
    }
  }

  function G(n) {
    for (; n.f;) {
      var r = n.f.$;

      if (0 === r || 1 === r) {
        for (; n.g && n.g.$ !== r;) n.g = n.g.i;

        if (!n.g) return;
        n.f = n.g.b(n.f.a), n.g = n.g.i;
      } else {
        if (2 === r) return void (n.f.c = n.f.b(function (r) {
          n.f = r, P(n);
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

  function J(r, n, e, t, u, a) {
    var i = l(k, r, C(n ? n.flags : void 0));
    cn(i) || m(2);

    var f = {},
        o = (i = e(i.a)).a,
        c = a(s, o),
        v = function (r, n) {
      var e;

      for (var t in Y) {
        var u = Y[t];
        u.a && ((e = e || {})[t] = u.a(t, n)), r[t] = K(u, n);
      }

      return e;
    }(f, s);

    function s(r, n) {
      c(o = (i = l(t, r, o)).a, n), U(f, i.b, u(o));
    }

    return U(f, i.b, u(o)), v ? {
      ports: v
    } : {};
  }

  var Y = {};

  function K(r, n) {
    var t = {
      g: n,
      h: void 0
    },
        u = r.c,
        a = r.d,
        i = r.e,
        f = r.f;

    function o(e) {
      return l(z, o, {
        $: 5,
        b: function (r) {
          var n = r.a;
          return 0 === r.$ ? s(a, t, n, e) : i && f ? b(u, t, n.i, n.j, e) : s(u, t, i ? n.i : n.j, e);
        }
      });
    }

    return t.h = R(l(z, o, r.b));
  }

  var W = t(function (n, e) {
    return F(function (r) {
      n.g(e), r(x(c));
    });
  });

  function H(n) {
    return function (r) {
      return {
        $: 1,
        k: n,
        l: r
      };
    };
  }

  function Q(r) {
    return {
      $: 2,
      m: r
    };
  }

  function U(r, n, e) {
    var t = {};

    for (var u in V(!0, n, t, null), V(!1, e, t, null), r) M(r[u], {
      $: "fx",
      a: t[u] || {
        i: d,
        j: d
      }
    });
  }

  function V(r, n, e, t) {
    switch (n.$) {
      case 1:
        var u = n.k,
            a = function (r, n, e, t) {
          function u(r) {
            for (var n = e; n; n = n.q) r = n.p(r);

            return r;
          }

          return l(r ? Y[n].e : Y[n].f, u, t);
        }(r, u, t, n.l);

        return void (e[u] = function (r, n, e) {
          return e = e || {
            i: d,
            j: d
          }, r ? e.i = h(n, e.i) : e.j = h(n, e.j), e;
        }(r, a, e[u]));

      case 2:
        for (var i = n.m; i.b; i = i.b) V(r, i.a, e, t);

        return;

      case 3:
        return void V(r, n.o, e, {
          p: n.n,
          q: t
        });
    }
  }

  function X(r) {
    Y[r] && m(3);
  }

  var Z = t(function (r, n) {
    return n;
  });

  function rr(r) {
    var e,
        a = [],
        i = Y[r].r,
        f = (e = 0, F(function (r) {
      var n = setTimeout(function () {
        r(x(c));
      }, e);
      return function () {
        clearTimeout(n);
      };
    }));
    return Y[r].b = f, Y[r].c = u(function (r, n) {
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

  var nr;
  var er = "undefined" != typeof document ? document : {};

  function tr(r, n) {
    r.appendChild(n);
  }

  function ur(r) {
    return {
      $: 0,
      a: r
    };
  }

  var ar = t(function (a, i) {
    return t(function (r, n) {
      for (var e = [], t = 0; n.b; n = n.b) {
        var u = n.a;
        t += u.b || 0, e.push(u);
      }

      return t += e.length, {
        $: 1,
        c: i,
        d: cr(r),
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
        d: cr(r),
        e: e,
        f: a,
        b: t
      };
    });
  })(void 0);
  var ir = t(function (r, n) {
    return {
      $: "a0",
      n: r,
      o: n
    };
  }),
      fr = t(function (r, n) {
    return {
      $: "a3",
      n: r,
      o: n
    };
  });
  var or;

  function cr(r) {
    for (var n = {}; r.b; r = r.b) {
      var e = r.a,
          t = e.$,
          u = e.n,
          a = e.o;

      if ("a2" !== t) {
        var i = n[t] || (n[t] = {});
        "a3" === t && "class" === u ? vr(i, u, a) : i[u] = a;
      } else "className" === u ? vr(n, u, O(a)) : n[u] = O(a);
    }

    return n;
  }

  function vr(r, n, e) {
    var t = r[n];
    r[n] = t ? t + " " + e : e;
  }

  function sr(r, n) {
    var e = r.$;
    if (5 === e) return sr(r.k || (r.k = r.m()), n);
    if (0 === e) return er.createTextNode(r.a);

    if (4 === e) {
      for (var t = r.k, u = r.j; 4 === t.$;) "object" != typeof u ? u = [u, t.j] : u.push(t.j), t = t.k;

      var a = {
        j: u,
        p: n
      };
      return (i = sr(t, a)).elm_event_node_ref = a, i;
    }

    if (3 === e) return lr(i = r.h(r.g), n, r.d), i;
    var i = r.f ? er.createElementNS(r.f, r.c) : er.createElement(r.c);
    nr && "a" == r.c && i.addEventListener("click", nr(i)), lr(i, n, r.d);

    for (var f = r.e, o = 0; o < f.length; o++) tr(i, sr(1 === e ? f[o] : f[o].b, n));

    return i;
  }

  function lr(r, n, e) {
    for (var t in e) {
      var u = e[t];
      "a1" === t ? br(r, u) : "a0" === t ? gr(r, n, u) : "a3" === t ? dr(r, u) : "a4" === t ? hr(r, u) : ("value" !== t || "checked" !== t || r[t] !== u) && (r[t] = u);
    }
  }

  function br(r, n) {
    var e = r.style;

    for (var t in n) e[t] = n[t];
  }

  function dr(r, n) {
    for (var e in n) {
      var t = n[e];
      t ? r.setAttribute(e, t) : r.removeAttribute(e);
    }
  }

  function hr(r, n) {
    for (var e in n) {
      var t = n[e],
          u = t.f,
          a = t.o;
      a ? r.setAttributeNS(u, e, a) : r.removeAttributeNS(u, e);
    }
  }

  function gr(r, n, e) {
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

        i = $r(n, a), r.addEventListener(u, i, or && {
          passive: jn(a) < 2
        }), t[u] = i;
      } else r.removeEventListener(u, i), t[u] = void 0;
    }
  }

  try {
    window.addEventListener("t", null, Object.defineProperty({}, "passive", {
      get: function () {
        or = !0;
      }
    }));
  } catch (r) {}

  function $r(v, r) {
    function s(r) {
      var n = s.q,
          e = _(n.a, r);

      if (cn(e)) {
        for (var t, u = jn(n), a = e.a, i = u ? u < 3 ? a.a : a.k : a, f = 1 == u ? a.b : 3 == u && a.M, o = (f && r.stopPropagation(), (2 == u ? a.b : 3 == u && a.K) && r.preventDefault(), v); t = o.j;) {
          if ("function" == typeof t) i = t(i);else for (var c = t.length; c--;) i = t[c](i);
          o = o.p;
        }

        o(i, f);
      }
    }

    return s.q = r, s;
  }

  function pr(r, n) {
    return r.$ == n.$ && T(r.a, n.a);
  }

  function mr(r, n) {
    var e = [];
    return Ar(r, n, e, 0), e;
  }

  function yr(r, n, e, t) {
    var u = {
      $: n,
      r: e,
      s: t,
      t: void 0,
      u: void 0
    };
    return r.push(u), u;
  }

  function Ar(r, n, e, t) {
    if (r !== n) {
      var u = r.$,
          a = n.$;

      if (u !== a) {
        if (1 !== u || 2 !== a) return void yr(e, 0, t, n);
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
          return Ar(r.k, n.k, v, 0), void (0 < v.length && yr(e, 1, t, v));

        case 4:
          for (var s = r.j, l = n.j, b = !1, d = r.k; 4 === d.$;) b = !0, "object" != typeof s ? s = [s, d.j] : s.push(d.j), d = d.k;

          for (var h = n.k; 4 === h.$;) b = !0, "object" != typeof l ? l = [l, h.j] : l.push(h.j), h = h.k;

          return b && s.length !== l.length ? void yr(e, 0, t, n) : ((b ? function (r, n) {
            for (var e = 0; e < r.length; e++) if (r[e] !== n[e]) return !1;

            return !0;
          }(s, l) : s === l) || yr(e, 2, t, l), void Ar(d, h, e, t + 1));

        case 0:
          return void (r.a !== n.a && yr(e, 3, t, n.a));

        case 1:
          return void jr(r, n, e, t, _r);

        case 2:
          return void jr(r, n, e, t, wr);

        case 3:
          if (r.h !== n.h) return void yr(e, 0, t, n);
          var g = kr(r.d, n.d);
          g && yr(e, 4, t, g);
          var $ = n.i(r.g, n.g);
          return void ($ && yr(e, 5, t, $));
      }
    }
  }

  function jr(r, n, e, t, u) {
    if (r.c === n.c && r.f === n.f) {
      var a = kr(r.d, n.d);
      a && yr(e, 4, t, a), u(r, n, e, t);
    } else yr(e, 0, t, n);
  }

  function kr(r, n, e) {
    var t;

    for (var u in r) if ("a1" !== u && "a0" !== u && "a3" !== u && "a4" !== u) {
      if (u in n) {
        var a = r[u],
            i = n[u];
        a === i && "value" !== u && "checked" !== u || "a0" === e && pr(a, i) || ((t = t || {})[u] = i);
      } else (t = t || {})[u] = e ? "a1" === e ? "" : "a0" === e || "a3" === e ? void 0 : {
        f: r[u].f,
        o: void 0
      } : "string" == typeof r[u] ? "" : null;
    } else {
      var f = kr(r[u], n[u] || {}, u);
      f && ((t = t || {})[u] = f);
    }

    for (var o in n) o in r || ((t = t || {})[o] = n[o]);

    return t;
  }

  function _r(r, n, e, t) {
    var u = r.e,
        a = n.e,
        i = u.length,
        f = a.length;
    f < i ? yr(e, 6, t, {
      v: f,
      i: i - f
    }) : i < f && yr(e, 7, t, {
      v: i,
      e: a
    });

    for (var o = i < f ? i : f, c = 0; c < o; c++) {
      var v = u[c];
      Ar(v, a[c], e, ++t), t += v.b || 0;
    }
  }

  function wr(r, n, e, t) {
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
        if (w && j) Ar(g, _, u, ++b), Er(a, u, d, $, l, i), b += g.b || 0, Tr(a, u, d, A, ++b), b += A.b || 0, s += 2, l += 2;else if (w) b++, Er(a, u, h, $, l, i), Ar(g, _, u, b), b += g.b || 0, s += 1, l += 2;else if (j) Tr(a, u, d, g, ++b), b += g.b || 0, Ar(A, $, u, ++b), b += A.b || 0, s += 2, l += 1;else {
          if (!p || y !== k) break;
          Tr(a, u, d, g, ++b), Er(a, u, h, $, l, i), b += g.b || 0, Ar(A, _, u, ++b), b += A.b || 0, s += 2, l += 2;
        }
      } else Ar(g, $, u, ++b), b += g.b || 0, s++, l++;
    }

    for (; s < c;) {
      var N;
      Tr(a, u, (N = f[s]).a, g = N.b, ++b), b += g.b || 0, s++;
    }

    for (; l < v;) {
      var E,
          T = T || [];
      Er(a, u, (E = o[l]).a, E.b, void 0, T), l++;
    }

    (0 < u.length || 0 < i.length || T) && yr(e, 8, t, {
      w: u,
      x: i,
      y: T
    });
  }

  var Nr = "_elmW6BL";

  function Er(r, n, e, t, u, a) {
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
      return Ar(i.z, t, f, i.r), i.r = u, void (i.s.s = {
        w: f,
        A: i
      });
    }

    Er(r, n, e + Nr, t, u, a);
  }

  function Tr(r, n, e, t, u) {
    var a = r[e];

    if (a) {
      if (0 === a.c) {
        a.c = 2;
        var i = [];
        return Ar(t, a.z, i, u), void yr(n, 9, u, {
          w: i,
          A: a
        });
      }

      Tr(r, n, e + Nr, t, u);
    } else {
      var f = yr(n, 9, u, void 0);
      r[e] = {
        c: 1,
        z: t,
        r: u,
        s: f
      };
    }
  }

  function Lr(r, n, e, t) {
    !function r(n, e, t, u, a, i, f) {
      var o = t[u];
      var c = o.r;

      for (; c === a;) {
        var v = o.$;
        if (1 === v) Lr(n, e.k, o.s, f);else if (8 === v) {
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

  function Cr(r, n, e, t) {
    return 0 === e.length ? r : (Lr(r, n, e, t), Or(r, e));
  }

  function Or(r, n) {
    for (var e = 0; e < n.length; e++) {
      var t = n[e],
          u = t.t,
          a = qr(u, t);
      u === r && (r = a);
    }

    return r;
  }

  function qr(r, n) {
    switch (n.$) {
      case 0:
        return function (r, n, e) {
          var t = r.parentNode,
              u = sr(n, e);
          u.elm_event_node_ref || (u.elm_event_node_ref = r.elm_event_node_ref);
          t && u !== r && t.replaceChild(u, r);
          return u;
        }(r, n.s, n.u);

      case 4:
        return lr(r, n.u, n.s), r;

      case 3:
        return r.replaceData(0, r.length, n.s), r;

      case 1:
        return Or(r, n.s);

      case 2:
        return r.elm_event_node_ref ? r.elm_event_node_ref.j = n.s : r.elm_event_node_ref = {
          j: n.s,
          p: n.u
        }, r;

      case 6:
        for (var e = n.s, t = 0; t < e.i; t++) r.removeChild(r.childNodes[e.v]);

        return r;

      case 7:
        for (var u = (e = n.s).e, a = r.childNodes[t = e.v]; t < u.length; t++) r.insertBefore(sr(u[t], n.u), a);

        return r;

      case 9:
        if (!(e = n.s)) return r.parentNode.removeChild(r), r;
        var i = e.A;
        return void 0 !== i.r && r.parentNode.removeChild(r), i.s = Or(r, e.w), r;

      case 8:
        return function (r, n) {
          var e = n.s,
              t = function (r, n) {
            if (!r) return;

            for (var e = er.createDocumentFragment(), t = 0; t < r.length; t++) {
              var u = r[t],
                  a = u.A;
              tr(e, 2 === a.c ? a.s : sr(a.z, n.u));
            }

            return e;
          }(e.y, n);

          r = Or(r, e.w);

          for (var u = e.x, a = 0; a < u.length; a++) {
            var i = u[a],
                f = i.A,
                o = 2 === f.c ? f.s : sr(f.z, n.u);
            r.insertBefore(o, r.childNodes[i.r]);
          }

          t && tr(r, t);
          return r;
        }(r, n);

      case 5:
        return n.s(r);

      default:
        m(10);
    }
  }

  function xr(r) {
    if (3 === r.nodeType) return ur(r.textContent);
    if (1 !== r.nodeType) return ur("");

    for (var n = d, e = r.attributes, t = e.length; t--;) {
      var u = e[t];
      n = h(l(fr, u.name, u.value), n);
    }

    var a = r.tagName.toLowerCase(),
        i = d,
        f = r.childNodes;

    for (t = f.length; t--;) i = h(xr(f[t]), i);

    return s(ar, a, n, i);
  }

  var Fr = e(function (n, r, e, f) {
    return J(r, f, n.as, n.aA, n.ay, function (t, r) {
      var u = n.aC,
          a = f.node,
          i = xr(a);
      return Br(r, function (r) {
        var n = u(r),
            e = mr(i, n);
        a = Cr(a, i, e, t), i = n;
      });
    });
  }),
      zr = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : function (r) {
    setTimeout(r, 1e3 / 60);
  };

  function Br(e, t) {
    t(e);
    var u = 0;

    function a() {
      u = 1 === u ? 0 : (zr(a), t(e), 1);
    }

    return function (r, n) {
      e = r, n ? (t(e), 2 === u && (u = 1)) : (0 === u && zr(a), u = 2);
    };
  }

  var Rr = {
    addEventListener: function () {},
    removeEventListener: function () {}
  };
  "undefined" != typeof document && document, "undefined" != typeof window && window;

  var Sr,
      Mr,
      Ir,
      Dr = e(function (r, n, e, t) {
    return {
      $: 0,
      a: r,
      b: n,
      c: e,
      d: t
    };
  }),
      Pr = f,
      Gr = y,
      Jr = t(function (r, n) {
    return j(n) / j(r);
  }),
      Yr = Gr(l(Jr, 2, 32)),
      Kr = [],
      Wr = b(Dr, 0, Yr, Kr, Kr),
      Hr = p,
      Qr = u(function (r, n, e) {
    for (;;) {
      if (!e.b) return n;
      var t = e.b,
          u = r,
          a = l(r, e.a, n);
      r = u, n = a, e = t;
    }
  }),
      Ur = function (r) {
    return s(Qr, Pr, d, r);
  },
      Vr = t(function (r, n) {
    for (;;) {
      var e = l(Hr, 32, r),
          t = e.b,
          u = l(Pr, {
        $: 0,
        a: e.a
      }, n);
      if (!t.b) return Ur(u);
      r = t, n = u;
    }
  }),
      Xr = t(function (r, n) {
    for (;;) {
      var e = Gr(n / 32);
      if (1 === e) return l(Hr, 32, r).a;
      r = l(Vr, r, d), n = e;
    }
  }),
      Zr = A,
      rn = t(function (r, n) {
    return 0 < o(r, n) ? r : n;
  }),
      nn = function (r) {
    return r.length;
  },
      en = t(function (r, n) {
    if (n.a) {
      var e = 32 * n.a,
          t = Zr(l(Jr, 32, e - 1)),
          u = r ? Ur(n.d) : n.d,
          a = l(Xr, u, n.a);
      return b(Dr, nn(n.c) + e, l(rn, 5, t * Yr), a, n.c);
    }

    return b(Dr, nn(n.c), Yr, Kr, n.c);
  }),
      tn = v,
      un = a(function (r, n, e, t, u) {
    for (;;) {
      if (n < 0) return l(en, !1, {
        d: t,
        a: e / 32 | 0,
        c: u
      });
      var a = {
        $: 1,
        a: s(tn, 32, n, r)
      };
      r = r, n = n - 32, e = e, t = l(Pr, a, t), u = u;
    }
  }),
      an = t(function (r, n) {
    if (0 < r) {
      var e = r % 32;
      return i(un, n, r - e - 32, r, d, s(tn, e, r - e, n));
    }

    return Wr;
  }),
      fn = function (r) {
    return {
      $: 1,
      a: r
    };
  },
      on = function (r) {
    return {
      $: 0,
      a: r
    };
  },
      cn = function (r) {
    return !r.$;
  },
      vn = t(function (r, n) {
    return {
      $: 3,
      a: r,
      b: n
    };
  }),
      sn = t(function (r, n) {
    return {
      $: 0,
      a: r,
      b: n
    };
  }),
      ln = t(function (r, n) {
    return {
      $: 1,
      a: r,
      b: n
    };
  }),
      bn = function (r) {
    return {
      $: 2,
      a: r
    };
  },
      dn = function (r) {
    return r + "";
  },
      hn = q,
      gn = (Mr = function () {
    return hn;
  }, X(Sr = "log"), Y[Sr] = {
    e: Z,
    r: Mr,
    a: rr
  }, H(Sr)),
      $n = Q,
      pn = Q(d),
      mn = $n(d),
      yn = t(function (r, n) {
    return r ? $(n - 1, $n(g([gn(0)]))) : $(n + 1, mn);
  }),
      An = function (r) {
    return {
      $: 0,
      a: r
    };
  },
      jn = function (r) {
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
      kn = ar("button"),
      _n = ar("div"),
      wn = ur,
      Nn = ir,
      En = t(function (r, n) {
    return l(Nn, r, {
      $: 0,
      a: n
    });
  }),
      Tn = function (r) {
    return l(En, "click", An(r));
  },
      Ln = x,
      Cn = Ln(0),
      On = e(function (r, n, e, t) {
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
            return l(r, u, l(r, i, l(r, o, l(r, c.a, 500 < e ? s(Qr, r, n, Ur(v)) : b(On, r, n, e + 1, v)))));
          }

          return l(r, u, l(r, i, l(r, o, n)));
        }

        return l(r, u, l(r, i, n));
      }

      return l(r, u, n);
    }

    return n;
  }),
      qn = u(function (r, n, e) {
    return b(On, r, n, 0, e);
  }),
      xn = t(function (e, r) {
    return s(qn, t(function (r, n) {
      return l(Pr, e(r), n);
    }), d, r);
  }),
      Fn = z,
      zn = t(function (n, r) {
    return l(Fn, function (r) {
      return Ln(n(r));
    }, r);
  }),
      Bn = u(function (e, r, t) {
    return l(Fn, function (n) {
      return l(Fn, function (r) {
        return Ln(l(e, n, r));
      }, t);
    }, r);
  }),
      Rn = W,
      Sn = t(function (r, n) {
    var e = n;
    return S(l(Fn, Rn(r), e));
  });

  Y.Task = {
    b: Cn,
    c: u(function (r, n) {
      return l(zn, function () {
        return 0;
      }, (e = l(xn, Sn(r), n), s(qn, Bn(Pr), Ln(d), e)));
      var e;
    }),
    d: u(function () {
      return Ln(0);
    }),
    e: t(function (r, n) {
      return l(zn, r, n);
    }),
    f: Ir
  };
  H("Task");
  var Mn,
      In = {
    $: 5
  },
      Dn = Fr({
    as: function () {
      return $(0, $n(g([gn(0)])));
    },
    ay: function () {
      return pn;
    },
    aA: yn,
    aC: function (r) {
      return l(_n, d, g([l(kn, g([Tn(1)]), g([wn("-")])), l(_n, d, g([wn(dn(r))])), l(kn, g([Tn(0)]), g([wn("+")]))]));
    }
  });
  Mn = {
    Main: {
      init: Dn(In)(0)
    }
  }, r.Elm ? function r(n, e) {
    for (var t in e) t in n ? "init" == t ? m(6) : r(n[t], e[t]) : n[t] = e[t];
  }(r.Elm, Mn) : r.Elm = Mn;
}(this);