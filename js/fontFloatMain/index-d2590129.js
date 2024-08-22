(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver(r => {
    for (const o of r) if (o.type === "childList") for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && s(i)
  }).observe(document, {childList: !0, subtree: !0});

  function n(r) {
    const o = {};
    return r.integrity && (o.integrity = r.integrity), r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? o.credentials = "include" : r.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
  }

  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o)
  }
})();

function xn(e, t) {
  const n = Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? r => !!n[r.toLowerCase()] : r => !!n[r]
}

const U = {}, ze = [], ce = () => {
  }, br = () => !1, xr = /^on[^a-z]/, Bt = e => xr.test(e), yn = e => e.startsWith("onUpdate:"), X = Object.assign,
  vn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
  }, yr = Object.prototype.hasOwnProperty, j = (e, t) => yr.call(e, t), L = Array.isArray,
  qe = e => Ht(e) === "[object Map]", Es = e => Ht(e) === "[object Set]", M = e => typeof e == "function",
  J = e => typeof e == "string", Tn = e => typeof e == "symbol", W = e => e !== null && typeof e == "object",
  ws = e => W(e) && M(e.then) && M(e.catch), Os = Object.prototype.toString, Ht = e => Os.call(e),
  vr = e => Ht(e).slice(8, -1), Cs = e => Ht(e) === "[object Object]",
  En = e => J(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  It = xn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  St = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n))
  }, Tr = /-(\w)/g, Xe = St(e => e.replace(Tr, (t, n) => n ? n.toUpperCase() : "")), Er = /\B([A-Z])/g,
  ke = St(e => e.replace(Er, "-$1").toLowerCase()), Is = St(e => e.charAt(0).toUpperCase() + e.slice(1)),
  Vt = St(e => e ? `on${Is(e)}` : ""), ft = (e, t) => !Object.is(e, t), kt = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  }, Pt = (e, t, n) => {
    Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
  }, wr = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
  };
let Jn;
const ln = () => Jn || (Jn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function wn(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = J(s) ? Ar(s) : wn(s);
      if (r) for (const o in r) t[o] = r[o]
    }
    return t
  } else {
    if (J(e)) return e;
    if (W(e)) return e
  }
}

const Or = /;(?![^(]*\))/g, Cr = /:([^]+)/, Ir = /\/\*[^]*?\*\//g;

function Ar(e) {
  const t = {};
  return e.replace(Ir, "").split(Or).forEach(n => {
    if (n) {
      const s = n.split(Cr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim())
    }
  }), t
}

function On(e) {
  let t = "";
  if (J(e)) t = e; else if (L(e)) for (let n = 0; n < e.length; n++) {
    const s = On(e[n]);
    s && (t += s + " ")
  } else if (W(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim()
}

const Fr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Lr = xn(Fr);

function As(e) {
  return !!e || e === ""
}

const Yn = e => J(e) ? e : e == null ? "" : L(e) || W(e) && (e.toString === Os || !M(e.toString)) ? JSON.stringify(e, Fs, 2) : String(e),
  Fs = (e, t) => t && t.__v_isRef ? Fs(e, t.value) : qe(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})} : Es(t) ? {[`Set(${t.size})`]: [...t.values()]} : W(t) && !L(t) && !Cs(t) ? String(t) : t;
let oe;

class Pr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = oe, !t && oe && (this.index = (oe.scopes || (oe.scopes = [])).push(this) - 1)
  }

  get active() {
    return this._active
  }

  run(t) {
    if (this._active) {
      const n = oe;
      try {
        return oe = this, t()
      } finally {
        oe = n
      }
    }
  }

  on() {
    oe = this
  }

  off() {
    oe = this.parent
  }

  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes) for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index)
      }
      this.parent = void 0, this._active = !1
    }
  }
}

function Mr(e, t = oe) {
  t && t.active && t.effects.push(e)
}

function Rr() {
  return oe
}

const Cn = e => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t
}, Ls = e => (e.w & Ie) > 0, Ps = e => (e.n & Ie) > 0, Nr = ({deps: e}) => {
  if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ie
}, jr = e => {
  const {deps: t} = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Ls(r) && !Ps(r) ? r.delete(e) : t[n++] = r, r.w &= ~Ie, r.n &= ~Ie
    }
    t.length = n
  }
}, cn = new WeakMap;
let ot = 0, Ie = 1;
const fn = 30;
let ie;
const Se = Symbol(""), un = Symbol("");

class In {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Mr(this, s)
  }

  run() {
    if (!this.active) return this.fn();
    let t = ie, n = we;
    for (; t;) {
      if (t === this) return;
      t = t.parent
    }
    try {
      return this.parent = ie, ie = this, we = !0, Ie = 1 << ++ot, ot <= fn ? Nr(this) : Xn(this), this.fn()
    } finally {
      ot <= fn && jr(this), Ie = 1 << --ot, ie = this.parent, we = n, this.parent = void 0, this.deferStop && this.stop()
    }
  }

  stop() {
    ie === this ? this.deferStop = !0 : this.active && (Xn(this), this.onStop && this.onStop(), this.active = !1)
  }
}

function Xn(e) {
  const {deps: t} = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0
  }
}

let we = !0;
const Ms = [];

function Ge() {
  Ms.push(we), we = !1
}

function et() {
  const e = Ms.pop();
  we = e === void 0 ? !0 : e
}

function te(e, t, n) {
  if (we && ie) {
    let s = cn.get(e);
    s || cn.set(e, s = new Map);
    let r = s.get(n);
    r || s.set(n, r = Cn()), Rs(r)
  }
}

function Rs(e, t) {
  let n = !1;
  ot <= fn ? Ps(e) || (e.n |= Ie, n = !Ls(e)) : n = !e.has(ie), n && (e.add(ie), ie.deps.push(e))
}

function be(e, t, n, s, r, o) {
  const i = cn.get(e);
  if (!i) return;
  let c = [];
  if (t === "clear") c = [...i.values()]; else if (n === "length" && L(e)) {
    const u = Number(s);
    i.forEach((a, m) => {
      (m === "length" || m >= u) && c.push(a)
    })
  } else switch (n !== void 0 && c.push(i.get(n)), t) {
    case"add":
      L(e) ? En(n) && c.push(i.get("length")) : (c.push(i.get(Se)), qe(e) && c.push(i.get(un)));
      break;
    case"delete":
      L(e) || (c.push(i.get(Se)), qe(e) && c.push(i.get(un)));
      break;
    case"set":
      qe(e) && c.push(i.get(Se));
      break
  }
  if (c.length === 1) c[0] && an(c[0]); else {
    const u = [];
    for (const a of c) a && u.push(...a);
    an(Cn(u))
  }
}

function an(e, t) {
  const n = L(e) ? e : [...e];
  for (const s of n) s.computed && Zn(s);
  for (const s of n) s.computed || Zn(s)
}

function Zn(e, t) {
  (e !== ie || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}

const Br = xn("__proto__,__v_isRef,__isVue"),
  Ns = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Tn)),
  Hr = An(), Sr = An(!1, !0), $r = An(!0), Qn = Dr();

function Dr() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
    e[t] = function (...n) {
      const s = B(this);
      for (let o = 0, i = this.length; o < i; o++) te(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(B)) : r
    }
  }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
    e[t] = function (...n) {
      Ge();
      const s = B(this)[t].apply(this, n);
      return et(), s
    }
  }), e
}

function Kr(e) {
  const t = B(this);
  return te(t, "has", e), t.hasOwnProperty(e)
}

function An(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && o === (e ? t ? so : $s : t ? Ss : Hs).get(s)) return s;
    const i = L(s);
    if (!e) {
      if (i && j(Qn, r)) return Reflect.get(Qn, r, o);
      if (r === "hasOwnProperty") return Kr
    }
    const c = Reflect.get(s, r, o);
    return (Tn(r) ? Ns.has(r) : Br(r)) || (e || te(s, "get", r), t) ? c : V(c) ? i && En(r) ? c : c.value : W(c) ? e ? Ds(c) : Dt(c) : c
  }
}

const Ur = js(), Wr = js(!0);

function js(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (Ze(i) && V(i) && !V(r)) return !1;
    if (!e && (!Mt(r) && !Ze(r) && (i = B(i), r = B(r)), !L(n) && V(i) && !V(r))) return i.value = r, !0;
    const c = L(n) && En(s) ? Number(s) < n.length : j(n, s), u = Reflect.set(n, s, r, o);
    return n === B(o) && (c ? ft(r, i) && be(n, "set", s, r) : be(n, "add", s, r)), u
  }
}

function zr(e, t) {
  const n = j(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && be(e, "delete", t, void 0), s
}

function qr(e, t) {
  const n = Reflect.has(e, t);
  return (!Tn(t) || !Ns.has(t)) && te(e, "has", t), n
}

function Jr(e) {
  return te(e, "iterate", L(e) ? "length" : Se), Reflect.ownKeys(e)
}

const Bs = {get: Hr, set: Ur, deleteProperty: zr, has: qr, ownKeys: Jr}, Yr = {
  get: $r, set(e, t) {
    return !0
  }, deleteProperty(e, t) {
    return !0
  }
}, Xr = X({}, Bs, {get: Sr, set: Wr}), Fn = e => e, $t = e => Reflect.getPrototypeOf(e);

function vt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = B(e), o = B(t);
  n || (t !== o && te(r, "get", t), te(r, "get", o));
  const {has: i} = $t(r), c = s ? Fn : n ? Mn : ut;
  if (i.call(r, t)) return c(e.get(t));
  if (i.call(r, o)) return c(e.get(o));
  e !== r && e.get(t)
}

function Tt(e, t = !1) {
  const n = this.__v_raw, s = B(n), r = B(e);
  return t || (e !== r && te(s, "has", e), te(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function Et(e, t = !1) {
  return e = e.__v_raw, !t && te(B(e), "iterate", Se), Reflect.get(e, "size", e)
}

function Vn(e) {
  e = B(e);
  const t = B(this);
  return $t(t).has.call(t, e) || (t.add(e), be(t, "add", e, e)), this
}

function kn(e, t) {
  t = B(t);
  const n = B(this), {has: s, get: r} = $t(n);
  let o = s.call(n, e);
  o || (e = B(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? ft(t, i) && be(n, "set", e, t) : be(n, "add", e, t), this
}

function Gn(e) {
  const t = B(this), {has: n, get: s} = $t(t);
  let r = n.call(t, e);
  r || (e = B(e), r = n.call(t, e)), s && s.call(t, e);
  const o = t.delete(e);
  return r && be(t, "delete", e, void 0), o
}

function es() {
  const e = B(this), t = e.size !== 0, n = e.clear();
  return t && be(e, "clear", void 0, void 0), n
}

function wt(e, t) {
  return function (s, r) {
    const o = this, i = o.__v_raw, c = B(i), u = t ? Fn : e ? Mn : ut;
    return !e && te(c, "iterate", Se), i.forEach((a, m) => s.call(r, u(a), u(m), o))
  }
}

function Ot(e, t, n) {
  return function (...s) {
    const r = this.__v_raw, o = B(r), i = qe(o), c = e === "entries" || e === Symbol.iterator && i,
      u = e === "keys" && i, a = r[e](...s), m = n ? Fn : t ? Mn : ut;
    return !t && te(o, "iterate", u ? un : Se), {
      next() {
        const {value: w, done: _} = a.next();
        return _ ? {value: w, done: _} : {value: c ? [m(w[0]), m(w[1])] : m(w), done: _}
      }, [Symbol.iterator]() {
        return this
      }
    }
  }
}

function ve(e) {
  return function (...t) {
    return e === "delete" ? !1 : this
  }
}

function Zr() {
  const e = {
    get(o) {
      return vt(this, o)
    }, get size() {
      return Et(this)
    }, has: Tt, add: Vn, set: kn, delete: Gn, clear: es, forEach: wt(!1, !1)
  }, t = {
    get(o) {
      return vt(this, o, !1, !0)
    }, get size() {
      return Et(this)
    }, has: Tt, add: Vn, set: kn, delete: Gn, clear: es, forEach: wt(!1, !0)
  }, n = {
    get(o) {
      return vt(this, o, !0)
    }, get size() {
      return Et(this, !0)
    }, has(o) {
      return Tt.call(this, o, !0)
    }, add: ve("add"), set: ve("set"), delete: ve("delete"), clear: ve("clear"), forEach: wt(!0, !1)
  }, s = {
    get(o) {
      return vt(this, o, !0, !0)
    }, get size() {
      return Et(this, !0)
    }, has(o) {
      return Tt.call(this, o, !0)
    }, add: ve("add"), set: ve("set"), delete: ve("delete"), clear: ve("clear"), forEach: wt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
    e[o] = Ot(o, !1, !1), n[o] = Ot(o, !0, !1), t[o] = Ot(o, !1, !0), s[o] = Ot(o, !0, !0)
  }), [e, n, t, s]
}

const [Qr, Vr, kr, Gr] = Zr();

function Ln(e, t) {
  const n = t ? e ? Gr : kr : e ? Vr : Qr;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(j(n, r) && r in s ? n : s, r, o)
}

const eo = {get: Ln(!1, !1)}, to = {get: Ln(!1, !0)}, no = {get: Ln(!0, !1)}, Hs = new WeakMap, Ss = new WeakMap,
  $s = new WeakMap, so = new WeakMap;

function ro(e) {
  switch (e) {
    case"Object":
    case"Array":
      return 1;
    case"Map":
    case"Set":
    case"WeakMap":
    case"WeakSet":
      return 2;
    default:
      return 0
  }
}

function oo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ro(vr(e))
}

function Dt(e) {
  return Ze(e) ? e : Pn(e, !1, Bs, eo, Hs)
}

function io(e) {
  return Pn(e, !1, Xr, to, Ss)
}

function Ds(e) {
  return Pn(e, !0, Yr, no, $s)
}

function Pn(e, t, n, s, r) {
  if (!W(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = r.get(e);
  if (o) return o;
  const i = oo(e);
  if (i === 0) return e;
  const c = new Proxy(e, i === 2 ? s : n);
  return r.set(e, c), c
}

function Je(e) {
  return Ze(e) ? Je(e.__v_raw) : !!(e && e.__v_isReactive)
}

function Ze(e) {
  return !!(e && e.__v_isReadonly)
}

function Mt(e) {
  return !!(e && e.__v_isShallow)
}

function Ks(e) {
  return Je(e) || Ze(e)
}

function B(e) {
  const t = e && e.__v_raw;
  return t ? B(t) : e
}

function Us(e) {
  return Pt(e, "__v_skip", !0), e
}

const ut = e => W(e) ? Dt(e) : e, Mn = e => W(e) ? Ds(e) : e;

function Ws(e) {
  we && ie && (e = B(e), Rs(e.dep || (e.dep = Cn())))
}

function zs(e, t) {
  e = B(e);
  const n = e.dep;
  n && an(n)
}

function V(e) {
  return !!(e && e.__v_isRef === !0)
}

function ts(e) {
  return lo(e, !1)
}

function lo(e, t) {
  return V(e) ? e : new co(e, t)
}

class co {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : B(t), this._value = n ? t : ut(t)
  }

  get value() {
    return Ws(this), this._value
  }

  set value(t) {
    const n = this.__v_isShallow || Mt(t) || Ze(t);
    t = n ? t : B(t), ft(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : ut(t), zs(this))
  }
}

function fo(e) {
  return V(e) ? e.value : e
}

const uo = {
  get: (e, t, n) => fo(Reflect.get(e, t, n)), set: (e, t, n, s) => {
    const r = e[t];
    return V(r) && !V(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s)
  }
};

function qs(e) {
  return Je(e) ? e : new Proxy(e, uo)
}

class ao {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new In(t, () => {
      this._dirty || (this._dirty = !0, zs(this))
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s
  }

  get value() {
    const t = B(this);
    return Ws(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
  }

  set value(t) {
    this._setter(t)
  }
}

function ho(e, t, n = !1) {
  let s, r;
  const o = M(e);
  return o ? (s = e, r = ce) : (s = e.get, r = e.set), new ao(s, r, o || !r, n)
}

function Oe(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e()
  } catch (o) {
    Kt(o, t, n)
  }
  return r
}

function fe(e, t, n, s) {
  if (M(e)) {
    const o = Oe(e, t, n, s);
    return o && ws(o) && o.catch(i => {
      Kt(i, t, n)
    }), o
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(fe(e[o], t, n, s));
  return r
}

function Kt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = n;
    for (; o;) {
      const a = o.ec;
      if (a) {
        for (let m = 0; m < a.length; m++) if (a[m](e, i, c) === !1) return
      }
      o = o.parent
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Oe(u, null, 10, [e, i, c]);
      return
    }
  }
  po(e, n, r, s)
}

function po(e, t, n, s = !0) {
  console.error(e)
}

let at = !1, dn = !1;
const Z = [];
let pe = 0;
const Ye = [];
let _e = null, je = 0;
const Js = Promise.resolve();
let Rn = null;

function go(e) {
  const t = Rn || Js;
  return e ? t.then(this ? e.bind(this) : e) : t
}

function mo(e) {
  let t = pe + 1, n = Z.length;
  for (; t < n;) {
    const s = t + n >>> 1;
    dt(Z[s]) < e ? t = s + 1 : n = s
  }
  return t
}

function Nn(e) {
  (!Z.length || !Z.includes(e, at && e.allowRecurse ? pe + 1 : pe)) && (e.id == null ? Z.push(e) : Z.splice(mo(e.id), 0, e), Ys())
}

function Ys() {
  !at && !dn && (dn = !0, Rn = Js.then(Zs))
}

function _o(e) {
  const t = Z.indexOf(e);
  t > pe && Z.splice(t, 1)
}

function bo(e) {
  L(e) ? Ye.push(...e) : (!_e || !_e.includes(e, e.allowRecurse ? je + 1 : je)) && Ye.push(e), Ys()
}

function ns(e, t = at ? pe + 1 : 0) {
  for (; t < Z.length; t++) {
    const n = Z[t];
    n && n.pre && (Z.splice(t, 1), t--, n())
  }
}

function Xs(e) {
  if (Ye.length) {
    const t = [...new Set(Ye)];
    if (Ye.length = 0, _e) {
      _e.push(...t);
      return
    }
    for (_e = t, _e.sort((n, s) => dt(n) - dt(s)), je = 0; je < _e.length; je++) _e[je]();
    _e = null, je = 0
  }
}

const dt = e => e.id == null ? 1 / 0 : e.id, xo = (e, t) => {
  const n = dt(e) - dt(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1
  }
  return n
};

function Zs(e) {
  dn = !1, at = !0, Z.sort(xo);
  const t = ce;
  try {
    for (pe = 0; pe < Z.length; pe++) {
      const n = Z[pe];
      n && n.active !== !1 && Oe(n, null, 14)
    }
  } finally {
    pe = 0, Z.length = 0, Xs(), at = !1, Rn = null, (Z.length || Ye.length) && Zs()
  }
}

function yo(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || U;
  let r = n;
  const o = t.startsWith("update:"), i = o && t.slice(7);
  if (i && i in s) {
    const m = `${i === "modelValue" ? "model" : i}Modifiers`, {number: w, trim: _} = s[m] || U;
    _ && (r = n.map(v => J(v) ? v.trim() : v)), w && (r = n.map(wr))
  }
  let c, u = s[c = Vt(t)] || s[c = Vt(Xe(t))];
  !u && o && (u = s[c = Vt(ke(t))]), u && fe(u, e, 6, r);
  const a = s[c + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {}; else if (e.emitted[c]) return;
    e.emitted[c] = !0, fe(a, e, 6, r)
  }
}

function Qs(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {}, c = !1;
  if (!M(e)) {
    const u = a => {
      const m = Qs(a, t, !0);
      m && (c = !0, X(i, m))
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
  }
  return !o && !c ? (W(e) && s.set(e, null), null) : (L(o) ? o.forEach(u => i[u] = null) : X(i, o), W(e) && s.set(e, i), i)
}

function Ut(e, t) {
  return !e || !Bt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), j(e, t[0].toLowerCase() + t.slice(1)) || j(e, ke(t)) || j(e, t))
}

let ge = null, Wt = null;

function Rt(e) {
  const t = ge;
  return ge = e, Wt = e && e.type.__scopeId || null, t
}

function vo(e) {
  Wt = e
}

function To() {
  Wt = null
}

function Eo(e, t = ge, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && ds(-1);
    const o = Rt(t);
    let i;
    try {
      i = e(...r)
    } finally {
      Rt(o), s._d && ds(1)
    }
    return i
  };
  return s._n = !0, s._c = !0, s._d = !0, s
}

function Gt(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: c,
    attrs: u,
    emit: a,
    render: m,
    renderCache: w,
    data: _,
    setupState: v,
    ctx: T,
    inheritAttrs: g
  } = e;
  let P, H;
  const K = Rt(e);
  try {
    if (n.shapeFlag & 4) {
      const R = r || s;
      P = he(m.call(R, R, w, o, v, _, T)), H = u
    } else {
      const R = t;
      P = he(R.length > 1 ? R(o, {attrs: u, slots: c, emit: a}) : R(o, null)), H = t.props ? u : wo(u)
    }
  } catch (R) {
    ct.length = 0, Kt(R, e, 1), P = Ce(ht)
  }
  let Y = P;
  if (H && g !== !1) {
    const R = Object.keys(H), {shapeFlag: ye} = Y;
    R.length && ye & 7 && (i && R.some(yn) && (H = Oo(H, i)), Y = Qe(Y, H))
  }
  return n.dirs && (Y = Qe(Y), Y.dirs = Y.dirs ? Y.dirs.concat(n.dirs) : n.dirs), n.transition && (Y.transition = n.transition), P = Y, Rt(K), P
}

const wo = e => {
  let t;
  for (const n in e) (n === "class" || n === "style" || Bt(n)) && ((t || (t = {}))[n] = e[n]);
  return t
}, Oo = (e, t) => {
  const n = {};
  for (const s in e) (!yn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n
};

function Co(e, t, n) {
  const {props: s, children: r, component: o} = e, {props: i, children: c, patchFlag: u} = t, a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? ss(s, i, a) : !!i;
    if (u & 8) {
      const m = t.dynamicProps;
      for (let w = 0; w < m.length; w++) {
        const _ = m[w];
        if (i[_] !== s[_] && !Ut(a, _)) return !0
      }
    }
  } else return (r || c) && (!c || !c.$stable) ? !0 : s === i ? !1 : s ? i ? ss(s, i, a) : !0 : !!i;
  return !1
}

function ss(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Ut(n, o)) return !0
  }
  return !1
}

function Io({vnode: e, parent: t}, n) {
  for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
}

const Ao = e => e.__isSuspense;

function Fo(e, t) {
  t && t.pendingBranch ? L(e) ? t.effects.push(...e) : t.effects.push(e) : bo(e)
}

const Ct = {};

function en(e, t, n) {
  return Vs(e, t, n)
}

function Vs(e, t, {immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i} = U) {
  var c;
  const u = Rr() === ((c = Q) == null ? void 0 : c.scope) ? Q : null;
  let a, m = !1, w = !1;
  if (V(e) ? (a = () => e.value, m = Mt(e)) : Je(e) ? (a = () => e, s = !0) : L(e) ? (w = !0, m = e.some(R => Je(R) || Mt(R)), a = () => e.map(R => {
    if (V(R)) return R.value;
    if (Je(R)) return We(R);
    if (M(R)) return Oe(R, u, 2)
  })) : M(e) ? t ? a = () => Oe(e, u, 2) : a = () => {
    if (!(u && u.isUnmounted)) return _ && _(), fe(e, u, 3, [v])
  } : a = ce, t && s) {
    const R = a;
    a = () => We(R())
  }
  let _, v = R => {
    _ = K.onStop = () => {
      Oe(R, u, 4)
    }
  }, T;
  if (gt) if (v = ce, t ? n && fe(t, u, 3, [a(), w ? [] : void 0, v]) : a(), r === "sync") {
    const R = wi();
    T = R.__watcherHandles || (R.__watcherHandles = [])
  } else return ce;
  let g = w ? new Array(e.length).fill(Ct) : Ct;
  const P = () => {
    if (K.active) if (t) {
      const R = K.run();
      (s || m || (w ? R.some((ye, tt) => ft(ye, g[tt])) : ft(R, g))) && (_ && _(), fe(t, u, 3, [R, g === Ct ? void 0 : w && g[0] === Ct ? [] : g, v]), g = R)
    } else K.run()
  };
  P.allowRecurse = !!t;
  let H;
  r === "sync" ? H = P : r === "post" ? H = () => ee(P, u && u.suspense) : (P.pre = !0, u && (P.id = u.uid), H = () => Nn(P));
  const K = new In(a, H);
  t ? n ? P() : g = K.run() : r === "post" ? ee(K.run.bind(K), u && u.suspense) : K.run();
  const Y = () => {
    K.stop(), u && u.scope && vn(u.scope.effects, K)
  };
  return T && T.push(Y), Y
}

function Lo(e, t, n) {
  const s = this.proxy, r = J(e) ? e.includes(".") ? ks(s, e) : () => s[e] : e.bind(s, s);
  let o;
  M(t) ? o = t : (o = t.handler, n = t);
  const i = Q;
  Ve(this);
  const c = Vs(r, o.bind(s), n);
  return i ? Ve(i) : $e(), c
}

function ks(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s
  }
}

function We(e, t) {
  if (!W(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
  if (t.add(e), V(e)) We(e.value, t); else if (L(e)) for (let n = 0; n < e.length; n++) We(e[n], t); else if (Es(e) || qe(e)) e.forEach(n => {
    We(n, t)
  }); else if (Cs(e)) for (const n in e) We(e[n], t);
  return e
}

function Me(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const c = r[i];
    o && (c.oldValue = o[i].value);
    let u = c.dir[s];
    u && (Ge(), fe(u, n, 8, [e.el, c, e, t]), et())
  }
}

const At = e => !!e.type.__asyncLoader, Gs = e => e.type.__isKeepAlive;

function Po(e, t) {
  er(e, "a", t)
}

function Mo(e, t) {
  er(e, "da", t)
}

function er(e, t, n = Q) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r;) {
      if (r.isDeactivated) return;
      r = r.parent
    }
    return e()
  });
  if (zt(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent;) Gs(r.parent.vnode) && Ro(s, t, n, r), r = r.parent
  }
}

function Ro(e, t, n, s) {
  const r = zt(t, e, s, !0);
  nr(() => {
    vn(s[t], r)
  }, n)
}

function zt(e, t, n = Q, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted) return;
      Ge(), Ve(n);
      const c = fe(t, n, e, i);
      return $e(), et(), c
    });
    return s ? r.unshift(o) : r.push(o), o
  }
}

const xe = e => (t, n = Q) => (!gt || e === "sp") && zt(e, (...s) => t(...s), n), No = xe("bm"), tr = xe("m"),
  jo = xe("bu"), Bo = xe("u"), Ho = xe("bum"), nr = xe("um"), So = xe("sp"), $o = xe("rtg"), Do = xe("rtc");

function Ko(e, t = Q) {
  zt("ec", e, t)
}

const Uo = Symbol.for("v-ndc");

function tn(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (L(e) || J(e)) {
    r = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++) r[i] = t(e[i], i, void 0, o && o[i])
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i])
  } else if (W(e)) if (e[Symbol.iterator]) r = Array.from(e, (i, c) => t(i, c, void 0, o && o[c])); else {
    const i = Object.keys(e);
    r = new Array(i.length);
    for (let c = 0, u = i.length; c < u; c++) {
      const a = i[c];
      r[c] = t(e[a], a, c, o && o[c])
    }
  } else r = [];
  return n && (n[s] = r), r
}

const hn = e => e ? hr(e) ? $n(e) || e.proxy : hn(e.parent) : null, lt = X(Object.create(null), {
  $: e => e,
  $el: e => e.vnode.el,
  $data: e => e.data,
  $props: e => e.props,
  $attrs: e => e.attrs,
  $slots: e => e.slots,
  $refs: e => e.refs,
  $parent: e => hn(e.parent),
  $root: e => hn(e.root),
  $emit: e => e.emit,
  $options: e => jn(e),
  $forceUpdate: e => e.f || (e.f = () => Nn(e.update)),
  $nextTick: e => e.n || (e.n = go.bind(e.proxy)),
  $watch: e => Lo.bind(e)
}), nn = (e, t) => e !== U && !e.__isScriptSetup && j(e, t), Wo = {
  get({_: e}, t) {
    const {ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: u} = e;
    let a;
    if (t[0] !== "$") {
      const v = i[t];
      if (v !== void 0) switch (v) {
        case 1:
          return s[t];
        case 2:
          return r[t];
        case 4:
          return n[t];
        case 3:
          return o[t]
      } else {
        if (nn(s, t)) return i[t] = 1, s[t];
        if (r !== U && j(r, t)) return i[t] = 2, r[t];
        if ((a = e.propsOptions[0]) && j(a, t)) return i[t] = 3, o[t];
        if (n !== U && j(n, t)) return i[t] = 4, n[t];
        pn && (i[t] = 0)
      }
    }
    const m = lt[t];
    let w, _;
    if (m) return t === "$attrs" && te(e, "get", t), m(e);
    if ((w = c.__cssModules) && (w = w[t])) return w;
    if (n !== U && j(n, t)) return i[t] = 4, n[t];
    if (_ = u.config.globalProperties, j(_, t)) return _[t]
  }, set({_: e}, t, n) {
    const {data: s, setupState: r, ctx: o} = e;
    return nn(r, t) ? (r[t] = n, !0) : s !== U && j(s, t) ? (s[t] = n, !0) : j(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0)
  }, has({_: {data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o}}, i) {
    let c;
    return !!n[i] || e !== U && j(e, i) || nn(t, i) || (c = o[0]) && j(c, i) || j(s, i) || j(lt, i) || j(r.config.globalProperties, i)
  }, defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : j(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
  }
};

function rs(e) {
  return L(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}

let pn = !0;

function zo(e) {
  const t = jn(e), n = e.proxy, s = e.ctx;
  pn = !1, t.beforeCreate && os(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: c,
    provide: u,
    inject: a,
    created: m,
    beforeMount: w,
    mounted: _,
    beforeUpdate: v,
    updated: T,
    activated: g,
    deactivated: P,
    beforeDestroy: H,
    beforeUnmount: K,
    destroyed: Y,
    unmounted: R,
    render: ye,
    renderTracked: tt,
    renderTriggered: mt,
    errorCaptured: Ae,
    serverPrefetch: Yt,
    expose: Fe,
    inheritAttrs: nt,
    components: _t,
    directives: bt,
    filters: Xt
  } = t;
  if (a && qo(a, s, null), i) for (const z in i) {
    const $ = i[z];
    M($) && (s[z] = $.bind(n))
  }
  if (r) {
    const z = r.call(n, n);
    W(z) && (e.data = Dt(z))
  }
  if (pn = !0, o) for (const z in o) {
    const $ = o[z], Le = M($) ? $.bind(n, n) : M($.get) ? $.get.bind(n, n) : ce,
      xt = !M($) && M($.set) ? $.set.bind(n) : ce, Pe = Ti({get: Le, set: xt});
    Object.defineProperty(s, z, {enumerable: !0, configurable: !0, get: () => Pe.value, set: ue => Pe.value = ue})
  }
  if (c) for (const z in c) sr(c[z], s, n, z);
  if (u) {
    const z = M(u) ? u.call(n) : u;
    Reflect.ownKeys(z).forEach($ => {
      Vo($, z[$])
    })
  }
  m && os(m, e, "c");

  function k(z, $) {
    L($) ? $.forEach(Le => z(Le.bind(n))) : $ && z($.bind(n))
  }

  if (k(No, w), k(tr, _), k(jo, v), k(Bo, T), k(Po, g), k(Mo, P), k(Ko, Ae), k(Do, tt), k($o, mt), k(Ho, K), k(nr, R), k(So, Yt), L(Fe)) if (Fe.length) {
    const z = e.exposed || (e.exposed = {});
    Fe.forEach($ => {
      Object.defineProperty(z, $, {get: () => n[$], set: Le => n[$] = Le})
    })
  } else e.exposed || (e.exposed = {});
  ye && e.render === ce && (e.render = ye), nt != null && (e.inheritAttrs = nt), _t && (e.components = _t), bt && (e.directives = bt)
}

function qo(e, t, n = ce) {
  L(e) && (e = gn(e));
  for (const s in e) {
    const r = e[s];
    let o;
    W(r) ? "default" in r ? o = Ft(r.from || s, r.default, !0) : o = Ft(r.from || s) : o = Ft(r), V(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: i => o.value = i
    }) : t[s] = o
  }
}

function os(e, t, n) {
  fe(L(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function sr(e, t, n, s) {
  const r = s.includes(".") ? ks(n, s) : () => n[s];
  if (J(e)) {
    const o = t[e];
    M(o) && en(r, o)
  } else if (M(e)) en(r, e.bind(n)); else if (W(e)) if (L(e)) e.forEach(o => sr(o, t, n, s)); else {
    const o = M(e.handler) ? e.handler.bind(n) : t[e.handler];
    M(o) && en(r, o, e)
  }
}

function jn(e) {
  const t = e.type, {mixins: n, extends: s} = t, {
    mixins: r,
    optionsCache: o,
    config: {optionMergeStrategies: i}
  } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach(a => Nt(u, a, i, !0)), Nt(u, t, i)), W(t) && o.set(t, u), u
}

function Nt(e, t, n, s = !1) {
  const {mixins: r, extends: o} = t;
  o && Nt(e, o, n, !0), r && r.forEach(i => Nt(e, i, n, !0));
  for (const i in t) if (!(s && i === "expose")) {
    const c = Jo[i] || n && n[i];
    e[i] = c ? c(e[i], t[i]) : t[i]
  }
  return e
}

const Jo = {
  data: is,
  props: ls,
  emits: ls,
  methods: it,
  computed: it,
  beforeCreate: G,
  created: G,
  beforeMount: G,
  mounted: G,
  beforeUpdate: G,
  updated: G,
  beforeDestroy: G,
  beforeUnmount: G,
  destroyed: G,
  unmounted: G,
  activated: G,
  deactivated: G,
  errorCaptured: G,
  serverPrefetch: G,
  components: it,
  directives: it,
  watch: Xo,
  provide: is,
  inject: Yo
};

function is(e, t) {
  return t ? e ? function () {
    return X(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t)
  } : t : e
}

function Yo(e, t) {
  return it(gn(e), gn(t))
}

function gn(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t
  }
  return e
}

function G(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}

function it(e, t) {
  return e ? X(Object.create(null), e, t) : t
}

function ls(e, t) {
  return e ? L(e) && L(t) ? [...new Set([...e, ...t])] : X(Object.create(null), rs(e), rs(t ?? {})) : t
}

function Xo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = X(Object.create(null), e);
  for (const s in t) n[s] = G(e[s], t[s]);
  return n
}

function rr() {
  return {
    app: null,
    config: {
      isNativeTag: br,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}

let Zo = 0;

function Qo(e, t) {
  return function (s, r = null) {
    M(s) || (s = X({}, s)), r != null && !W(r) && (r = null);
    const o = rr(), i = new Set;
    let c = !1;
    const u = o.app = {
      _uid: Zo++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Oi,
      get config() {
        return o.config
      },
      set config(a) {
      },
      use(a, ...m) {
        return i.has(a) || (a && M(a.install) ? (i.add(a), a.install(u, ...m)) : M(a) && (i.add(a), a(u, ...m))), u
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), u
      },
      component(a, m) {
        return m ? (o.components[a] = m, u) : o.components[a]
      },
      directive(a, m) {
        return m ? (o.directives[a] = m, u) : o.directives[a]
      },
      mount(a, m, w) {
        if (!c) {
          const _ = Ce(s, r);
          return _.appContext = o, m && t ? t(_, a) : e(_, a, w), c = !0, u._container = a, a.__vue_app__ = u, $n(_.component) || _.component.proxy
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__)
      },
      provide(a, m) {
        return o.provides[a] = m, u
      },
      runWithContext(a) {
        jt = u;
        try {
          return a()
        } finally {
          jt = null
        }
      }
    };
    return u
  }
}

let jt = null;

function Vo(e, t) {
  if (Q) {
    let n = Q.provides;
    const s = Q.parent && Q.parent.provides;
    s === n && (n = Q.provides = Object.create(s)), n[e] = t
  }
}

function Ft(e, t, n = !1) {
  const s = Q || ge;
  if (s || jt) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : jt._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && M(t) ? t.call(s && s.proxy) : t
  }
}

function ko(e, t, n, s = !1) {
  const r = {}, o = {};
  Pt(o, Jt, 1), e.propsDefaults = Object.create(null), or(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? e.props = s ? r : io(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o
}

function Go(e, t, n, s) {
  const {props: r, attrs: o, vnode: {patchFlag: i}} = e, c = B(r), [u] = e.propsOptions;
  let a = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const m = e.vnode.dynamicProps;
      for (let w = 0; w < m.length; w++) {
        let _ = m[w];
        if (Ut(e.emitsOptions, _)) continue;
        const v = t[_];
        if (u) if (j(o, _)) v !== o[_] && (o[_] = v, a = !0); else {
          const T = Xe(_);
          r[T] = mn(u, c, T, v, e, !1)
        } else v !== o[_] && (o[_] = v, a = !0)
      }
    }
  } else {
    or(e, t, r, o) && (a = !0);
    let m;
    for (const w in c) (!t || !j(t, w) && ((m = ke(w)) === w || !j(t, m))) && (u ? n && (n[w] !== void 0 || n[m] !== void 0) && (r[w] = mn(u, c, w, void 0, e, !0)) : delete r[w]);
    if (o !== c) for (const w in o) (!t || !j(t, w)) && (delete o[w], a = !0)
  }
  a && be(e, "set", "$attrs")
}

function or(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, c;
  if (t) for (let u in t) {
    if (It(u)) continue;
    const a = t[u];
    let m;
    r && j(r, m = Xe(u)) ? !o || !o.includes(m) ? n[m] = a : (c || (c = {}))[m] = a : Ut(e.emitsOptions, u) || (!(u in s) || a !== s[u]) && (s[u] = a, i = !0)
  }
  if (o) {
    const u = B(n), a = c || U;
    for (let m = 0; m < o.length; m++) {
      const w = o[m];
      n[w] = mn(r, u, w, a[w], e, !j(a, w))
    }
  }
  return i
}

function mn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const c = j(i, "default");
    if (c && s === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && M(u)) {
        const {propsDefaults: a} = r;
        n in a ? s = a[n] : (Ve(r), s = a[n] = u.call(null, t), $e())
      } else s = u
    }
    i[0] && (o && !c ? s = !1 : i[1] && (s === "" || s === ke(n)) && (s = !0))
  }
  return s
}

function ir(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r) return r;
  const o = e.props, i = {}, c = [];
  let u = !1;
  if (!M(e)) {
    const m = w => {
      u = !0;
      const [_, v] = ir(w, t, !0);
      X(i, _), v && c.push(...v)
    };
    !n && t.mixins.length && t.mixins.forEach(m), e.extends && m(e.extends), e.mixins && e.mixins.forEach(m)
  }
  if (!o && !u) return W(e) && s.set(e, ze), ze;
  if (L(o)) for (let m = 0; m < o.length; m++) {
    const w = Xe(o[m]);
    cs(w) && (i[w] = U)
  } else if (o) for (const m in o) {
    const w = Xe(m);
    if (cs(w)) {
      const _ = o[m], v = i[w] = L(_) || M(_) ? {type: _} : X({}, _);
      if (v) {
        const T = as(Boolean, v.type), g = as(String, v.type);
        v[0] = T > -1, v[1] = g < 0 || T < g, (T > -1 || j(v, "default")) && c.push(w)
      }
    }
  }
  const a = [i, c];
  return W(e) && s.set(e, a), a
}

function cs(e) {
  return e[0] !== "$"
}

function fs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : ""
}

function us(e, t) {
  return fs(e) === fs(t)
}

function as(e, t) {
  return L(t) ? t.findIndex(n => us(n, e)) : M(t) && us(t, e) ? 0 : -1
}

const lr = e => e[0] === "_" || e === "$stable", Bn = e => L(e) ? e.map(he) : [he(e)], ei = (e, t, n) => {
  if (t._n) return t;
  const s = Eo((...r) => Bn(t(...r)), n);
  return s._c = !1, s
}, cr = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (lr(r)) continue;
    const o = e[r];
    if (M(o)) t[r] = ei(r, o, s); else if (o != null) {
      const i = Bn(o);
      t[r] = () => i
    }
  }
}, fr = (e, t) => {
  const n = Bn(t);
  e.slots.default = () => n
}, ti = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = B(t), Pt(t, "_", n)) : cr(t, e.slots = {})
  } else e.slots = {}, t && fr(e, t);
  Pt(e.slots, Jt, 1)
}, ni = (e, t, n) => {
  const {vnode: s, slots: r} = e;
  let o = !0, i = U;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? o = !1 : (X(r, t), !n && c === 1 && delete r._) : (o = !t.$stable, cr(t, r)), i = t
  } else t && (fr(e, t), i = {default: 1});
  if (o) for (const c in r) !lr(c) && !(c in i) && delete r[c]
};

function _n(e, t, n, s, r = !1) {
  if (L(e)) {
    e.forEach((_, v) => _n(_, t && (L(t) ? t[v] : t), n, s, r));
    return
  }
  if (At(s) && !r) return;
  const o = s.shapeFlag & 4 ? $n(s.component) || s.component.proxy : s.el, i = r ? null : o, {i: c, r: u} = e,
    a = t && t.r, m = c.refs === U ? c.refs = {} : c.refs, w = c.setupState;
  if (a != null && a !== u && (J(a) ? (m[a] = null, j(w, a) && (w[a] = null)) : V(a) && (a.value = null)), M(u)) Oe(u, c, 12, [i, m]); else {
    const _ = J(u), v = V(u);
    if (_ || v) {
      const T = () => {
        if (e.f) {
          const g = _ ? j(w, u) ? w[u] : m[u] : u.value;
          r ? L(g) && vn(g, o) : L(g) ? g.includes(o) || g.push(o) : _ ? (m[u] = [o], j(w, u) && (w[u] = m[u])) : (u.value = [o], e.k && (m[e.k] = u.value))
        } else _ ? (m[u] = i, j(w, u) && (w[u] = i)) : v && (u.value = i, e.k && (m[e.k] = i))
      };
      i ? (T.id = -1, ee(T, n)) : T()
    }
  }
}

const ee = Fo;

function si(e) {
  return ri(e)
}

function ri(e, t) {
  const n = ln();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: c,
      createComment: u,
      setText: a,
      setElementText: m,
      parentNode: w,
      nextSibling: _,
      setScopeId: v = ce,
      insertStaticContent: T
    } = e, g = (l, f, d, p = null, h = null, y = null, O = !1, x = null, E = !!f.dynamicChildren) => {
      if (l === f) return;
      l && !rt(l, f) && (p = yt(l), ue(l, h, y, !0), l = null), f.patchFlag === -2 && (E = !1, f.dynamicChildren = null);
      const {type: b, ref: I, shapeFlag: C} = f;
      switch (b) {
        case qt:
          P(l, f, d, p);
          break;
        case ht:
          H(l, f, d, p);
          break;
        case sn:
          l == null && K(f, d, p, O);
          break;
        case se:
          _t(l, f, d, p, h, y, O, x, E);
          break;
        default:
          C & 1 ? ye(l, f, d, p, h, y, O, x, E) : C & 6 ? bt(l, f, d, p, h, y, O, x, E) : (C & 64 || C & 128) && b.process(l, f, d, p, h, y, O, x, E, De)
      }
      I != null && h && _n(I, l && l.ref, y, f || l, !f)
    }, P = (l, f, d, p) => {
      if (l == null) s(f.el = c(f.children), d, p); else {
        const h = f.el = l.el;
        f.children !== l.children && a(h, f.children)
      }
    }, H = (l, f, d, p) => {
      l == null ? s(f.el = u(f.children || ""), d, p) : f.el = l.el
    }, K = (l, f, d, p) => {
      [l.el, l.anchor] = T(l.children, f, d, p, l.el, l.anchor)
    }, Y = ({el: l, anchor: f}, d, p) => {
      let h;
      for (; l && l !== f;) h = _(l), s(l, d, p), l = h;
      s(f, d, p)
    }, R = ({el: l, anchor: f}) => {
      let d;
      for (; l && l !== f;) d = _(l), r(l), l = d;
      r(f)
    }, ye = (l, f, d, p, h, y, O, x, E) => {
      O = O || f.type === "svg", l == null ? tt(f, d, p, h, y, O, x, E) : Yt(l, f, h, y, O, x, E)
    }, tt = (l, f, d, p, h, y, O, x) => {
      let E, b;
      const {type: I, props: C, shapeFlag: A, transition: F, dirs: N} = l;
      if (E = l.el = i(l.type, y, C && C.is, C), A & 8 ? m(E, l.children) : A & 16 && Ae(l.children, E, null, p, h, y && I !== "foreignObject", O, x), N && Me(l, null, p, "created"), mt(E, l, l.scopeId, O, p), C) {
        for (const S in C) S !== "value" && !It(S) && o(E, S, null, C[S], y, l.children, p, h, me);
        "value" in C && o(E, "value", null, C.value), (b = C.onVnodeBeforeMount) && de(b, p, l)
      }
      N && Me(l, null, p, "beforeMount");
      const D = (!h || h && !h.pendingBranch) && F && !F.persisted;
      D && F.beforeEnter(E), s(E, f, d), ((b = C && C.onVnodeMounted) || D || N) && ee(() => {
        b && de(b, p, l), D && F.enter(E), N && Me(l, null, p, "mounted")
      }, h)
    }, mt = (l, f, d, p, h) => {
      if (d && v(l, d), p) for (let y = 0; y < p.length; y++) v(l, p[y]);
      if (h) {
        let y = h.subTree;
        if (f === y) {
          const O = h.vnode;
          mt(l, O, O.scopeId, O.slotScopeIds, h.parent)
        }
      }
    }, Ae = (l, f, d, p, h, y, O, x, E = 0) => {
      for (let b = E; b < l.length; b++) {
        const I = l[b] = x ? Ee(l[b]) : he(l[b]);
        g(null, I, f, d, p, h, y, O, x)
      }
    }, Yt = (l, f, d, p, h, y, O) => {
      const x = f.el = l.el;
      let {patchFlag: E, dynamicChildren: b, dirs: I} = f;
      E |= l.patchFlag & 16;
      const C = l.props || U, A = f.props || U;
      let F;
      d && Re(d, !1), (F = A.onVnodeBeforeUpdate) && de(F, d, f, l), I && Me(f, l, d, "beforeUpdate"), d && Re(d, !0);
      const N = h && f.type !== "foreignObject";
      if (b ? Fe(l.dynamicChildren, b, x, d, p, N, y) : O || $(l, f, x, null, d, p, N, y, !1), E > 0) {
        if (E & 16) nt(x, f, C, A, d, p, h); else if (E & 2 && C.class !== A.class && o(x, "class", null, A.class, h), E & 4 && o(x, "style", C.style, A.style, h), E & 8) {
          const D = f.dynamicProps;
          for (let S = 0; S < D.length; S++) {
            const q = D[S], re = C[q], Ke = A[q];
            (Ke !== re || q === "value") && o(x, q, re, Ke, h, l.children, d, p, me)
          }
        }
        E & 1 && l.children !== f.children && m(x, f.children)
      } else !O && b == null && nt(x, f, C, A, d, p, h);
      ((F = A.onVnodeUpdated) || I) && ee(() => {
        F && de(F, d, f, l), I && Me(f, l, d, "updated")
      }, p)
    }, Fe = (l, f, d, p, h, y, O) => {
      for (let x = 0; x < f.length; x++) {
        const E = l[x], b = f[x], I = E.el && (E.type === se || !rt(E, b) || E.shapeFlag & 70) ? w(E.el) : d;
        g(E, b, I, null, p, h, y, O, !0)
      }
    }, nt = (l, f, d, p, h, y, O) => {
      if (d !== p) {
        if (d !== U) for (const x in d) !It(x) && !(x in p) && o(l, x, d[x], null, O, f.children, h, y, me);
        for (const x in p) {
          if (It(x)) continue;
          const E = p[x], b = d[x];
          E !== b && x !== "value" && o(l, x, b, E, O, f.children, h, y, me)
        }
        "value" in p && o(l, "value", d.value, p.value)
      }
    }, _t = (l, f, d, p, h, y, O, x, E) => {
      const b = f.el = l ? l.el : c(""), I = f.anchor = l ? l.anchor : c("");
      let {patchFlag: C, dynamicChildren: A, slotScopeIds: F} = f;
      F && (x = x ? x.concat(F) : F), l == null ? (s(b, d, p), s(I, d, p), Ae(f.children, d, I, h, y, O, x, E)) : C > 0 && C & 64 && A && l.dynamicChildren ? (Fe(l.dynamicChildren, A, d, h, y, O, x), (f.key != null || h && f === h.subTree) && ur(l, f, !0)) : $(l, f, d, I, h, y, O, x, E)
    }, bt = (l, f, d, p, h, y, O, x, E) => {
      f.slotScopeIds = x, l == null ? f.shapeFlag & 512 ? h.ctx.activate(f, d, p, O, E) : Xt(f, d, p, h, y, O, E) : Dn(l, f, E)
    }, Xt = (l, f, d, p, h, y, O) => {
      const x = l.component = mi(l, p, h);
      if (Gs(l) && (x.ctx.renderer = De), _i(x), x.asyncDep) {
        if (h && h.registerDep(x, k), !l.el) {
          const E = x.subTree = Ce(ht);
          H(null, E, f, d)
        }
        return
      }
      k(x, l, f, d, h, y, O)
    }, Dn = (l, f, d) => {
      const p = f.component = l.component;
      if (Co(l, f, d)) if (p.asyncDep && !p.asyncResolved) {
        z(p, f, d);
        return
      } else p.next = f, _o(p.update), p.update(); else f.el = l.el, p.vnode = f
    }, k = (l, f, d, p, h, y, O) => {
      const x = () => {
        if (l.isMounted) {
          let {next: I, bu: C, u: A, parent: F, vnode: N} = l, D = I, S;
          Re(l, !1), I ? (I.el = N.el, z(l, I, O)) : I = N, C && kt(C), (S = I.props && I.props.onVnodeBeforeUpdate) && de(S, F, I, N), Re(l, !0);
          const q = Gt(l), re = l.subTree;
          l.subTree = q, g(re, q, w(re.el), yt(re), l, h, y), I.el = q.el, D === null && Io(l, q.el), A && ee(A, h), (S = I.props && I.props.onVnodeUpdated) && ee(() => de(S, F, I, N), h)
        } else {
          let I;
          const {el: C, props: A} = f, {bm: F, m: N, parent: D} = l, S = At(f);
          if (Re(l, !1), F && kt(F), !S && (I = A && A.onVnodeBeforeMount) && de(I, D, f), Re(l, !0), C && Qt) {
            const q = () => {
              l.subTree = Gt(l), Qt(C, l.subTree, l, h, null)
            };
            S ? f.type.__asyncLoader().then(() => !l.isUnmounted && q()) : q()
          } else {
            const q = l.subTree = Gt(l);
            g(null, q, d, p, l, h, y), f.el = q.el
          }
          if (N && ee(N, h), !S && (I = A && A.onVnodeMounted)) {
            const q = f;
            ee(() => de(I, D, q), h)
          }
          (f.shapeFlag & 256 || D && At(D.vnode) && D.vnode.shapeFlag & 256) && l.a && ee(l.a, h), l.isMounted = !0, f = d = p = null
        }
      }, E = l.effect = new In(x, () => Nn(b), l.scope), b = l.update = () => E.run();
      b.id = l.uid, Re(l, !0), b()
    }, z = (l, f, d) => {
      f.component = l;
      const p = l.vnode.props;
      l.vnode = f, l.next = null, Go(l, f.props, p, d), ni(l, f.children, d), Ge(), ns(), et()
    }, $ = (l, f, d, p, h, y, O, x, E = !1) => {
      const b = l && l.children, I = l ? l.shapeFlag : 0, C = f.children, {patchFlag: A, shapeFlag: F} = f;
      if (A > 0) {
        if (A & 128) {
          xt(b, C, d, p, h, y, O, x, E);
          return
        } else if (A & 256) {
          Le(b, C, d, p, h, y, O, x, E);
          return
        }
      }
      F & 8 ? (I & 16 && me(b, h, y), C !== b && m(d, C)) : I & 16 ? F & 16 ? xt(b, C, d, p, h, y, O, x, E) : me(b, h, y, !0) : (I & 8 && m(d, ""), F & 16 && Ae(C, d, p, h, y, O, x, E))
    }, Le = (l, f, d, p, h, y, O, x, E) => {
      l = l || ze, f = f || ze;
      const b = l.length, I = f.length, C = Math.min(b, I);
      let A;
      for (A = 0; A < C; A++) {
        const F = f[A] = E ? Ee(f[A]) : he(f[A]);
        g(l[A], F, d, null, h, y, O, x, E)
      }
      b > I ? me(l, h, y, !0, !1, C) : Ae(f, d, p, h, y, O, x, E, C)
    }, xt = (l, f, d, p, h, y, O, x, E) => {
      let b = 0;
      const I = f.length;
      let C = l.length - 1, A = I - 1;
      for (; b <= C && b <= A;) {
        const F = l[b], N = f[b] = E ? Ee(f[b]) : he(f[b]);
        if (rt(F, N)) g(F, N, d, null, h, y, O, x, E); else break;
        b++
      }
      for (; b <= C && b <= A;) {
        const F = l[C], N = f[A] = E ? Ee(f[A]) : he(f[A]);
        if (rt(F, N)) g(F, N, d, null, h, y, O, x, E); else break;
        C--, A--
      }
      if (b > C) {
        if (b <= A) {
          const F = A + 1, N = F < I ? f[F].el : p;
          for (; b <= A;) g(null, f[b] = E ? Ee(f[b]) : he(f[b]), d, N, h, y, O, x, E), b++
        }
      } else if (b > A) for (; b <= C;) ue(l[b], h, y, !0), b++; else {
        const F = b, N = b, D = new Map;
        for (b = N; b <= A; b++) {
          const ne = f[b] = E ? Ee(f[b]) : he(f[b]);
          ne.key != null && D.set(ne.key, b)
        }
        let S, q = 0;
        const re = A - N + 1;
        let Ke = !1, Wn = 0;
        const st = new Array(re);
        for (b = 0; b < re; b++) st[b] = 0;
        for (b = F; b <= C; b++) {
          const ne = l[b];
          if (q >= re) {
            ue(ne, h, y, !0);
            continue
          }
          let ae;
          if (ne.key != null) ae = D.get(ne.key); else for (S = N; S <= A; S++) if (st[S - N] === 0 && rt(ne, f[S])) {
            ae = S;
            break
          }
          ae === void 0 ? ue(ne, h, y, !0) : (st[ae - N] = b + 1, ae >= Wn ? Wn = ae : Ke = !0, g(ne, f[ae], d, null, h, y, O, x, E), q++)
        }
        const zn = Ke ? oi(st) : ze;
        for (S = zn.length - 1, b = re - 1; b >= 0; b--) {
          const ne = N + b, ae = f[ne], qn = ne + 1 < I ? f[ne + 1].el : p;
          st[b] === 0 ? g(null, ae, d, qn, h, y, O, x, E) : Ke && (S < 0 || b !== zn[S] ? Pe(ae, d, qn, 2) : S--)
        }
      }
    }, Pe = (l, f, d, p, h = null) => {
      const {el: y, type: O, transition: x, children: E, shapeFlag: b} = l;
      if (b & 6) {
        Pe(l.component.subTree, f, d, p);
        return
      }
      if (b & 128) {
        l.suspense.move(f, d, p);
        return
      }
      if (b & 64) {
        O.move(l, f, d, De);
        return
      }
      if (O === se) {
        s(y, f, d);
        for (let C = 0; C < E.length; C++) Pe(E[C], f, d, p);
        s(l.anchor, f, d);
        return
      }
      if (O === sn) {
        Y(l, f, d);
        return
      }
      if (p !== 2 && b & 1 && x) if (p === 0) x.beforeEnter(y), s(y, f, d), ee(() => x.enter(y), h); else {
        const {leave: C, delayLeave: A, afterLeave: F} = x, N = () => s(y, f, d), D = () => {
          C(y, () => {
            N(), F && F()
          })
        };
        A ? A(y, N, D) : D()
      } else s(y, f, d)
    }, ue = (l, f, d, p = !1, h = !1) => {
      const {type: y, props: O, ref: x, children: E, dynamicChildren: b, shapeFlag: I, patchFlag: C, dirs: A} = l;
      if (x != null && _n(x, null, d, l, !0), I & 256) {
        f.ctx.deactivate(l);
        return
      }
      const F = I & 1 && A, N = !At(l);
      let D;
      if (N && (D = O && O.onVnodeBeforeUnmount) && de(D, f, l), I & 6) _r(l.component, d, p); else {
        if (I & 128) {
          l.suspense.unmount(d, p);
          return
        }
        F && Me(l, null, f, "beforeUnmount"), I & 64 ? l.type.remove(l, f, d, h, De, p) : b && (y !== se || C > 0 && C & 64) ? me(b, f, d, !1, !0) : (y === se && C & 384 || !h && I & 16) && me(E, f, d), p && Kn(l)
      }
      (N && (D = O && O.onVnodeUnmounted) || F) && ee(() => {
        D && de(D, f, l), F && Me(l, null, f, "unmounted")
      }, d)
    }, Kn = l => {
      const {type: f, el: d, anchor: p, transition: h} = l;
      if (f === se) {
        mr(d, p);
        return
      }
      if (f === sn) {
        R(l);
        return
      }
      const y = () => {
        r(d), h && !h.persisted && h.afterLeave && h.afterLeave()
      };
      if (l.shapeFlag & 1 && h && !h.persisted) {
        const {leave: O, delayLeave: x} = h, E = () => O(d, y);
        x ? x(l.el, y, E) : E()
      } else y()
    }, mr = (l, f) => {
      let d;
      for (; l !== f;) d = _(l), r(l), l = d;
      r(f)
    }, _r = (l, f, d) => {
      const {bum: p, scope: h, update: y, subTree: O, um: x} = l;
      p && kt(p), h.stop(), y && (y.active = !1, ue(O, l, f, d)), x && ee(x, f), ee(() => {
        l.isUnmounted = !0
      }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve())
    }, me = (l, f, d, p = !1, h = !1, y = 0) => {
      for (let O = y; O < l.length; O++) ue(l[O], f, d, p, h)
    }, yt = l => l.shapeFlag & 6 ? yt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : _(l.anchor || l.el),
    Un = (l, f, d) => {
      l == null ? f._vnode && ue(f._vnode, null, null, !0) : g(f._vnode || null, l, f, null, null, null, d), ns(), Xs(), f._vnode = l
    }, De = {p: g, um: ue, m: Pe, r: Kn, mt: Xt, mc: Ae, pc: $, pbc: Fe, n: yt, o: e};
  let Zt, Qt;
  return t && ([Zt, Qt] = t(De)), {render: Un, hydrate: Zt, createApp: Qo(Un, Zt)}
}

function Re({effect: e, update: t}, n) {
  e.allowRecurse = t.allowRecurse = n
}

function ur(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (L(s) && L(r)) for (let o = 0; o < s.length; o++) {
    const i = s[o];
    let c = r[o];
    c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[o] = Ee(r[o]), c.el = i.el), n || ur(i, c)), c.type === qt && (c.el = i.el)
  }
}

function oi(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, c;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const a = e[s];
    if (a !== 0) {
      if (r = n[n.length - 1], e[r] < a) {
        t[s] = r, n.push(s);
        continue
      }
      for (o = 0, i = n.length - 1; o < i;) c = o + i >> 1, e[n[c]] < a ? o = c + 1 : i = c;
      a < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s)
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0;) n[o] = i, i = t[i];
  return n
}

const ii = e => e.__isTeleport, se = Symbol.for("v-fgt"), qt = Symbol.for("v-txt"), ht = Symbol.for("v-cmt"),
  sn = Symbol.for("v-stc"), ct = [];
let le = null;

function Te(e = !1) {
  ct.push(le = e ? null : [])
}

function li() {
  ct.pop(), le = ct[ct.length - 1] || null
}

let pt = 1;

function ds(e) {
  pt += e
}

function ar(e) {
  return e.dynamicChildren = pt > 0 ? le || ze : null, li(), pt > 0 && le && le.push(e), e
}

function Ne(e, t, n, s, r, o) {
  return ar(He(e, t, n, s, r, o, !0))
}

function ci(e, t, n, s, r) {
  return ar(Ce(e, t, n, s, r, !0))
}

function fi(e) {
  return e ? e.__v_isVNode === !0 : !1
}

function rt(e, t) {
  return e.type === t.type && e.key === t.key
}

const Jt = "__vInternal", dr = ({key: e}) => e ?? null, Lt = ({
                                                                ref: e,
                                                                ref_key: t,
                                                                ref_for: n
                                                              }) => (typeof e == "number" && (e = "" + e), e != null ? J(e) || V(e) || M(e) ? {
  i: ge,
  r: e,
  k: t,
  f: !!n
} : e : null);

function He(e, t = null, n = null, s = 0, r = null, o = e === se ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && dr(t),
    ref: t && Lt(t),
    scopeId: Wt,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ge
  };
  return c ? (Hn(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= J(n) ? 8 : 16), pt > 0 && !i && le && (u.patchFlag > 0 || o & 6) && u.patchFlag !== 32 && le.push(u), u
}

const Ce = ui;

function ui(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Uo) && (e = ht), fi(e)) {
    const c = Qe(e, t, !0);
    return n && Hn(c, n), pt > 0 && !o && le && (c.shapeFlag & 6 ? le[le.indexOf(e)] = c : le.push(c)), c.patchFlag |= -2, c
  }
  if (vi(e) && (e = e.__vccOpts), t) {
    t = ai(t);
    let {class: c, style: u} = t;
    c && !J(c) && (t.class = On(c)), W(u) && (Ks(u) && !L(u) && (u = X({}, u)), t.style = wn(u))
  }
  const i = J(e) ? 1 : Ao(e) ? 128 : ii(e) ? 64 : W(e) ? 4 : M(e) ? 2 : 0;
  return He(e, t, n, s, r, i, o, !0)
}

function ai(e) {
  return e ? Ks(e) || Jt in e ? X({}, e) : e : null
}

function Qe(e, t, n = !1) {
  const {props: s, ref: r, patchFlag: o, children: i} = e, c = t ? hi(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && dr(c),
    ref: t && t.ref ? n && r ? L(r) ? r.concat(Lt(t)) : [r, Lt(t)] : Lt(t) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== se ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Qe(e.ssContent),
    ssFallback: e.ssFallback && Qe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  }
}

function di(e = " ", t = 0) {
  return Ce(qt, null, e, t)
}

function he(e) {
  return e == null || typeof e == "boolean" ? Ce(ht) : L(e) ? Ce(se, null, e.slice()) : typeof e == "object" ? Ee(e) : Ce(qt, null, String(e))
}

function Ee(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Qe(e)
}

function Hn(e, t) {
  let n = 0;
  const {shapeFlag: s} = e;
  if (t == null) t = null; else if (L(t)) n = 16; else if (typeof t == "object") if (s & 65) {
    const r = t.default;
    r && (r._c && (r._d = !1), Hn(e, r()), r._c && (r._d = !0));
    return
  } else {
    n = 32;
    const r = t._;
    !r && !(Jt in t) ? t._ctx = ge : r === 3 && ge && (ge.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
  } else M(t) ? (t = {default: t, _ctx: ge}, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [di(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n
}

function hi(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s) if (r === "class") t.class !== s.class && (t.class = On([t.class, s.class])); else if (r === "style") t.style = wn([t.style, s.style]); else if (Bt(r)) {
      const o = t[r], i = s[r];
      i && o !== i && !(L(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i)
    } else r !== "" && (t[r] = s[r])
  }
  return t
}

function de(e, t, n, s = null) {
  fe(e, t, 7, [n, s])
}

const pi = rr();
let gi = 0;

function mi(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || pi, o = {
    uid: gi++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Pr(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: ir(s, r),
    emitsOptions: Qs(s, r),
    emit: null,
    emitted: null,
    propsDefaults: U,
    inheritAttrs: s.inheritAttrs,
    ctx: U,
    data: U,
    props: U,
    attrs: U,
    slots: U,
    refs: U,
    setupState: U,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = {_: o}, o.root = t ? t.root : o, o.emit = yo.bind(null, o), e.ce && e.ce(o), o
}

let Q = null, Sn, Ue, hs = "__VUE_INSTANCE_SETTERS__";
(Ue = ln()[hs]) || (Ue = ln()[hs] = []), Ue.push(e => Q = e), Sn = e => {
  Ue.length > 1 ? Ue.forEach(t => t(e)) : Ue[0](e)
};
const Ve = e => {
  Sn(e), e.scope.on()
}, $e = () => {
  Q && Q.scope.off(), Sn(null)
};

function hr(e) {
  return e.vnode.shapeFlag & 4
}

let gt = !1;

function _i(e, t = !1) {
  gt = t;
  const {props: n, children: s} = e.vnode, r = hr(e);
  ko(e, n, r, t), ti(e, s);
  const o = r ? bi(e, t) : void 0;
  return gt = !1, o
}

function bi(e, t) {
  const n = e.type;
  e.accessCache = Object.create(null), e.proxy = Us(new Proxy(e.ctx, Wo));
  const {setup: s} = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? yi(e) : null;
    Ve(e), Ge();
    const o = Oe(s, e, 0, [e.props, r]);
    if (et(), $e(), ws(o)) {
      if (o.then($e, $e), t) return o.then(i => {
        ps(e, i, t)
      }).catch(i => {
        Kt(i, e, 0)
      });
      e.asyncDep = o
    } else ps(e, o, t)
  } else pr(e, t)
}

function ps(e, t, n) {
  M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) && (e.setupState = qs(t)), pr(e, n)
}

let gs;

function pr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && gs && !s.render) {
      const r = s.template || jn(e).template;
      if (r) {
        const {isCustomElement: o, compilerOptions: i} = e.appContext.config, {delimiters: c, compilerOptions: u} = s,
          a = X(X({isCustomElement: o, delimiters: c}, i), u);
        s.render = gs(r, a)
      }
    }
    e.render = s.render || ce
  }
  Ve(e), Ge(), zo(e), et(), $e()
}

function xi(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
    get(t, n) {
      return te(e, "get", "$attrs"), t[n]
    }
  }))
}

function yi(e) {
  const t = n => {
    e.exposed = n || {}
  };
  return {
    get attrs() {
      return xi(e)
    }, slots: e.slots, emit: e.emit, expose: t
  }
}

function $n(e) {
  if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(qs(Us(e.exposed)), {
    get(t, n) {
      if (n in t) return t[n];
      if (n in lt) return lt[n](e)
    }, has(t, n) {
      return n in t || n in lt
    }
  }))
}

function vi(e) {
  return M(e) && "__vccOpts" in e
}

const Ti = (e, t) => ho(e, t, gt), Ei = Symbol.for("v-scx"), wi = () => Ft(Ei), Oi = "3.3.4",
  Ci = "http://www.w3.org/2000/svg", Be = typeof document < "u" ? document : null,
  ms = Be && Be.createElement("template"), Ii = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const r = t ? Be.createElementNS(Ci, e) : Be.createElement(e, n ? {is: n} : void 0);
      return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r
    },
    createText: e => Be.createTextNode(e),
    createComment: e => Be.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Be.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling)) for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling));) ; else {
        ms.innerHTML = s ? `<svg>${e}</svg>` : e;
        const c = ms.content;
        if (s) {
          const u = c.firstChild;
          for (; u.firstChild;) c.appendChild(u.firstChild);
          c.removeChild(u)
        }
        t.insertBefore(c, n)
      }
      return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  };

function Ai(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

function Fi(e, t, n) {
  const s = e.style, r = J(n);
  if (n && !r) {
    if (t && !J(t)) for (const o in t) n[o] == null && bn(s, o, "");
    for (const o in n) bn(s, o, n[o])
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = o)
  }
}

const _s = /\s*!important$/;

function bn(e, t, n) {
  if (L(n)) n.forEach(s => bn(e, t, s)); else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
    const s = Li(e, t);
    _s.test(n) ? e.setProperty(ke(s), n.replace(_s, ""), "important") : e[s] = n
  }
}

const bs = ["Webkit", "Moz", "ms"], rn = {};

function Li(e, t) {
  const n = rn[t];
  if (n) return n;
  let s = Xe(t);
  if (s !== "filter" && s in e) return rn[t] = s;
  s = Is(s);
  for (let r = 0; r < bs.length; r++) {
    const o = bs[r] + s;
    if (o in e) return rn[t] = o
  }
  return t
}

const xs = "http://www.w3.org/1999/xlink";

function Pi(e, t, n, s, r) {
  if (s && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(xs, t.slice(6, t.length)) : e.setAttributeNS(xs, t, n); else {
    const o = Lr(t);
    n == null || o && !As(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
  }
}

function Mi(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), e[t] = n ?? "";
    return
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && !c.includes("-")) {
    e._value = n;
    const a = c === "OPTION" ? e.getAttribute("value") : e.value, m = n ?? "";
    a !== m && (e.value = m), n == null && e.removeAttribute(t);
    return
  }
  let u = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = As(n) : n == null && a === "string" ? (n = "", u = !0) : a === "number" && (n = 0, u = !0)
  }
  try {
    e[t] = n
  } catch {
  }
  u && e.removeAttribute(t)
}

function Ri(e, t, n, s) {
  e.addEventListener(t, n, s)
}

function Ni(e, t, n, s) {
  e.removeEventListener(t, n, s)
}

function ji(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}), i = o[t];
  if (s && i) i.value = s; else {
    const [c, u] = Bi(t);
    if (s) {
      const a = o[t] = $i(s, r);
      Ri(e, c, a, u)
    } else i && (Ni(e, c, i, u), o[t] = void 0)
  }
}

const ys = /(?:Once|Passive|Capture)$/;

function Bi(e) {
  let t;
  if (ys.test(e)) {
    t = {};
    let s;
    for (; s = e.match(ys);) e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0
  }
  return [e[2] === ":" ? e.slice(3) : ke(e.slice(2)), t]
}

let on = 0;
const Hi = Promise.resolve(), Si = () => on || (Hi.then(() => on = 0), on = Date.now());

function $i(e, t) {
  const n = s => {
    if (!s._vts) s._vts = Date.now(); else if (s._vts <= n.attached) return;
    fe(Di(s, n.value), t, 5, [s])
  };
  return n.value = e, n.attached = Si(), n
}

function Di(e, t) {
  if (L(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0
    }, t.map(s => r => !r._stopped && s && s(r))
  } else return t
}

const vs = /^on[a-z]/, Ki = (e, t, n, s, r = !1, o, i, c, u) => {
  t === "class" ? Ai(e, s, r) : t === "style" ? Fi(e, n, s) : Bt(t) ? yn(t) || ji(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ui(e, t, s, r)) ? Mi(e, t, s, o, i, c, u) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Pi(e, t, s, r))
};

function Ui(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && vs.test(t) && M(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || vs.test(t) && J(n) ? !1 : t in e
}

const Wi = X({patchProp: Ki}, Ii);
let Ts;

function zi() {
  return Ts || (Ts = si(Wi))
}

const qi = (...e) => {
  const t = zi().createApp(...e), {mount: n} = t;
  return t.mount = s => {
    const r = Ji(s);
    if (!r) return;
    const o = t._component;
    !M(o) && !o.render && !o.template && (o.template = r.innerHTML), r.innerHTML = "";
    const i = n(r, !1, r instanceof SVGElement);
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i
  }, t
};

function Ji(e) {
  return J(e) ? document.querySelector(e) : e
}

const gr = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n
  }, Yi = e => (vo("data-v-df7e2e5d"), e = e(), To(), e), Xi = {id: "mainFontFloat"}, Zi = {id: "fontFloatCore"},
  Qi = ["id"], Vi = Yi(() => He("br", null, null, -1)), ki = ["id"], Gi = {
    __name: "FontFloat", props: {}, setup(e) {
      ts(0);
      const t = Dt(FONT_FLOAT_DATA_INFO), n = ts(0), s = () => {
        const _ = n.value;
        n.value++, n.value = n.value === t.length ? 0 : n.value;
        for (let v = 0; v < t.length; v++) t[v].isActive = !1;
        t[n.value].isActive = !0, o(t[_], t[n.value])
      }, r = () => {
        const _ = n.value;
        n.value--, n.value = n.value === -1 ? t.length - 1 : n.value;
        for (let v = 0; v < t.length; v++) t[v].isActive = !1;
        t[n.value].isActive = !0, o(t[_], t[n.value])
      }, o = (_, v) => {
        for (let T = 0; T < v.titleList.length; T++) {
          const g = v.titleList[T], P = g.element;
          P.style.zIndex = "9999", a({startTop: g.top, startLeft: g.left, endTop: g.randomTop, endLeft: g.randomLeft}, P)
        }
        for (let T = 0; T < v.descriptionList.length; T++) {
          const g = v.descriptionList[T], P = g.element;
          a({startTop: g.top, startLeft: g.left, endTop: g.randomTop, endLeft: g.randomLeft}, P)
        }
        for (let T = 0; T < _.titleList.length; T++) {
          const g = _.titleList[T], P = g.element;
          P.style.zIndex = "-9999", m({startTop: g.top, startLeft: g.left, endTop: g.randomTop, endLeft: g.randomLeft}, P)
        }
        for (let T = 0; T < _.descriptionList.length; T++) {
          const g = _.descriptionList[T];
          m({startTop: g.top, startLeft: g.left, endTop: g.randomTop, endLeft: g.randomLeft}, g.element)
        }
      }, i = () => {
        const _ = t[n.value];
        for (let v = 0; v < _.titleList.length; v++) {
          const T = _.titleList[v], g = T.element;
          g.style.zIndex = "9999", a({startTop: T.top, startLeft: T.left, endTop: T.randomTop, endLeft: T.randomLeft}, g)
        }
        for (let v = 0; v < _.descriptionList.length; v++) {
          const T = _.descriptionList[v], g = T.element;
          a({startTop: T.top, startLeft: T.left, endTop: T.randomTop, endLeft: T.randomLeft}, g)
        }
        t.filter(v => !v.isActive).forEach(v => {
          for (let T = 0; T < v.titleList.length; T++) {
            const g = v.titleList[T], P = g.element;
            P.style.zIndex = "-9999", m({
              startTop: g.top,
              startLeft: g.left,
              endTop: g.randomTop,
              endLeft: g.randomLeft
            }, P)
          }
          for (let T = 0; T < v.descriptionList.length; T++) {
            const g = v.descriptionList[T];
            m({startTop: g.top, startLeft: g.left, endTop: g.randomTop, endLeft: g.randomLeft}, g.element)
          }
        })
      }, c = () => {
        const _ = document.getElementById("mainFontFloat").offsetHeight;
        return Math.floor(Math.random() * _)
      }, u = () => {
        const _ = document.getElementById("mainFontFloat").offsetWidth;
        return Math.floor(Math.random() * _)
      }, a = ({startTop: _, startLeft: v, endTop: T, endLeft: g}, P, H = !1) => {
        let K;
        H ? K = new KeyframeEffect(P, [{
          left: v + "px",
          top: _ + "px",
          color: "#000000",
          background: "#ffffff"
        }, {
          left: g + "px",
          top: T + "px",
          color: "rgb(221, 221, 221)",
          background: "rgba(255, 255, 255, 0.1)"
        }], {duration: 3e3, fill: "forwards"}) : K = new KeyframeEffect(P, [{
          left: g + "px",
          top: T + "px",
          color: "rgb(221, 221, 221)",
          background: "rgba(255, 255, 255, 0.1)"
        }, {left: v + "px", top: _ + "px", color: "#000000", background: "#ffffff"}], {
          duration: 3e3,
          fill: "forwards"
        }), new Animation(K, document.timeline).play()
      }, m = ({startTop: _, startLeft: v, endTop: T, endLeft: g}, P) => {
        a({startTop: _, startLeft: v, endTop: T, endLeft: g}, P, !0)
      };

      function w() {
        const v = document.getElementById("fontFloatCore").getElementsByTagName("span");
        for (let T = 0; T < v.length; T++) {
          const g = v[T], P = {top: g.offsetTop, left: g.offsetLeft}, H = g.id.split("-");
          if (H[0].includes("Title")) {
            const K = t[H[1]].titleList[H[2]];
            t[H[1]].titleList[H[2]] = {...K, element: g, left: P.left, top: P.top}
          } else if (H[0].includes("Description")) {
            const K = t[H[1]].descriptionList[H[2]];
            t[H[1]].descriptionList[H[2]] = {...K, element: g, left: P.left, top: P.top}
          }
        }
        for (let T = 0; T < v.length; T++) v[T].style.position = "absolute";
        i()
      }

      return tr(() => {
        for (let _ = 0; _ < t.length; _++) {
          t[_].id = _, t[_].titleList = [], t[_].descriptionList = [];
          const v = t[_].title.split(""), T = t[_].description.split("");
          for (let g = 0; g < v.length; g++) t[_].titleList.push({text: v[g], randomTop: c(), randomLeft: u()});
          for (let g = 0; g < T.length; g++) t[_].descriptionList.push({text: T[g], randomTop: c(), randomLeft: u()});
          t[_].isActive = !1
        }
        t[n.value].isActive = !0, setTimeout(() => {
          w()
        }, 1500)
      }), (_, v) => (Te(), Ne("div", Xi, [He("a", null, [He("i", {
        class: "iconfont icon-shangyige",
        style: {"font-size": "32px"},
        onClick: r
      }), He("i", {
        class: "iconfont icon-xiayige",
        style: {"font-size": "32px"},
        onClick: s
      })]), He("div", Zi, [(Te(!0), Ne(se, null, tn(t, T => (Te(), Ne("div", null, [(Te(!0), Ne(se, null, tn(T.titleList, (g, P) => (Te(), Ne("span", {
        class: "fontFloatClass",
        id: `fontFloatTitle-${T.id}-${P}`
      }, Yn(g.text), 9, Qi))), 256)), Vi, (Te(!0), Ne(se, null, tn(T.descriptionList, (g, P) => (Te(), Ne("span", {
        class: "fontFloatClass",
        id: `fontFloatDescription-${T.id}-${P}`
      }, Yn(g.text), 9, ki))), 256))]))), 256))])]))
    }
  }, el = gr(Gi, [["__scopeId", "data-v-df7e2e5d"]]);
const tl = {
  __name: "App", setup(e) {
    return (t, n) => (Te(), ci(el))
  }
}, nl = gr(tl, [["__scopeId", "data-v-85b2a90c"]]);
qi(nl).mount("#fontFloatMainApp");
