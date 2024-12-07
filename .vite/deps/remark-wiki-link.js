import "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/remark-wiki-link@2.0.1/node_modules/remark-wiki-link/dist/index.js
var e = { d: (t2, r2) => {
  for (var n2 in r2) e.o(r2, n2) && !e.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: r2[n2] });
}, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2) };
var t = {};
e.d(t, { Z: () => h, $: () => k });
var r = { horizontalTab: -2, virtualSpace: -1, nul: 0, eof: null, space: 32 };
function n(e2) {
  return e2 < r.nul || e2 === r.space;
}
function i(e2) {
  return e2 < r.horizontalTab;
}
var a = { 553: (e2) => {
  e2.exports = function(e3) {
    var t2, r2;
    return e3._compiled || (t2 = e3.before ? "(?:" + e3.before + ")" : "", r2 = e3.after ? "(?:" + e3.after + ")" : "", e3.atBreak && (t2 = "[\\r\\n][\\t ]*" + t2), e3._compiled = new RegExp((t2 ? "(" + t2 + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(e3.character) ? "\\" : "") + e3.character + (r2 || ""), "g")), e3._compiled;
  };
}, 112: (e2) => {
  function t2(e3, t3, r2) {
    var n2;
    if (!t3) return r2;
    for ("string" == typeof t3 && (t3 = [t3]), n2 = -1; ++n2 < t3.length; ) if (-1 !== e3.indexOf(t3[n2])) return true;
    return false;
  }
  e2.exports = function(e3, r2) {
    return t2(e3, r2.inConstruct, true) && !t2(e3, r2.notInConstruct);
  };
}, 113: (e2, t2, r2) => {
  e2.exports = function(e3, t3, r3) {
    for (var s2, u2, l2, c2, f2, k2, h2, p2, d2 = (r3.before || "") + (t3 || "") + (r3.after || ""), x = [], w = [], v = {}, g = -1; ++g < e3.unsafe.length; ) if (c2 = e3.unsafe[g], i2(e3.stack, c2)) for (f2 = n2(c2); k2 = f2.exec(d2); ) s2 = "before" in c2 || c2.atBreak, u2 = "after" in c2, l2 = k2.index + (s2 ? k2[1].length : 0), -1 === x.indexOf(l2) ? (x.push(l2), v[l2] = { before: s2, after: u2 }) : (v[l2].before && !s2 && (v[l2].before = false), v[l2].after && !u2 && (v[l2].after = false));
    for (x.sort(a2), h2 = r3.before ? r3.before.length : 0, p2 = d2.length - (r3.after ? r3.after.length : 0), g = -1; ++g < x.length; ) (l2 = x[g]) < h2 || l2 >= p2 || l2 + 1 < p2 && x[g + 1] === l2 + 1 && v[l2].after && !v[l2 + 1].before && !v[l2 + 1].after || (h2 !== l2 && w.push(o2(d2.slice(h2, l2), "\\")), h2 = l2, !/[!-/:-@[-`{-~]/.test(d2.charAt(l2)) || r3.encode && -1 !== r3.encode.indexOf(d2.charAt(l2)) ? (w.push("&#x" + d2.charCodeAt(l2).toString(16).toUpperCase() + ";"), h2++) : w.push("\\"));
    return w.push(o2(d2.slice(h2, p2), r3.after)), w.join("");
  };
  var n2 = r2(553), i2 = r2(112);
  function a2(e3, t3) {
    return e3 - t3;
  }
  function o2(e3, t3) {
    for (var r3, n3 = /\\(?=[!-/:-@[-`{-~])/g, i3 = [], a3 = [], o3 = -1, s2 = 0, u2 = e3 + t3; r3 = n3.exec(u2); ) i3.push(r3.index);
    for (; ++o3 < i3.length; ) s2 !== i3[o3] && a3.push(e3.slice(s2, i3[o3])), a3.push("\\"), s2 = i3[o3];
    return a3.push(e3.slice(s2)), a3.join("");
  }
} };
var o = {};
function s(e2) {
  var t2 = o[e2];
  if (void 0 !== t2) return t2.exports;
  var r2 = o[e2] = { exports: {} };
  return a[e2](r2, r2.exports, s), r2.exports;
}
s.n = (e2) => {
  var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
  return s.d(t2, { a: t2 }), t2;
}, s.d = (e2, t2) => {
  for (var r2 in t2) s.o(t2, r2) && !s.o(e2, r2) && Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
}, s.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2);
var u = {};
(() => {
  function e2(e3 = {}) {
    const t3 = e3.permalinks || [], r3 = e3.pageResolver || ((e4) => [e4.replace(/ /g, "_").toLowerCase()]), n3 = e3.newClassName || "new", i2 = e3.wikiLinkClassName || "internal", a2 = e3.hrefTemplate || ((e4) => `#/page/${e4}`);
    let o2;
    function s2(e4) {
      return e4[e4.length - 1];
    }
    return { enter: { wikiLink: function(e4) {
      o2 = { type: "wikiLink", value: null, data: { alias: null, permalink: null, exists: null } }, this.enter(o2, e4);
    } }, exit: { wikiLinkTarget: function(e4) {
      const t4 = this.sliceSerialize(e4);
      s2(this.stack).value = t4;
    }, wikiLinkAlias: function(e4) {
      const t4 = this.sliceSerialize(e4);
      s2(this.stack).data.alias = t4;
    }, wikiLink: function(e4) {
      this.exit(e4);
      const s3 = o2, u2 = r3(s3.value), l2 = u2.find((e5) => -1 !== t3.indexOf(e5)), c2 = void 0 !== l2;
      let f2;
      f2 = c2 ? l2 : u2[0] || "";
      let k2 = s3.value;
      s3.data.alias && (k2 = s3.data.alias);
      let h2 = i2;
      c2 || (h2 += " " + n3), s3.data.alias = k2, s3.data.permalink = f2, s3.data.exists = c2, s3.data.hName = "a", s3.data.hProperties = { className: h2, href: a2(f2) }, s3.data.hChildren = [{ type: "text", value: k2 }];
    } } };
  }
  s.d(u, { V: () => e2, x: () => n2 });
  var t2 = s(113), r2 = s.n(t2);
  function n2(e3 = {}) {
    const t3 = e3.aliasDivider || ":";
    return { unsafe: [{ character: "[", inConstruct: ["phrasing", "label", "reference"] }, { character: "]", inConstruct: ["label", "reference"] }], handlers: { wikiLink: function(e4, n3, i2) {
      const a2 = i2.enter("wikiLink"), o2 = r2()(i2, e4.value, { before: "[", after: "]" }), s2 = r2()(i2, e4.data.alias, { before: "[", after: "]" });
      let u2;
      return u2 = s2 !== o2 ? `[[${o2}${t3}${s2}]]` : `[[${o2}]]`, a2(), u2;
    } } };
  }
})();
var l = u.V;
var c = u.x;
var f = false;
function k(e2 = {}) {
  const t2 = this.data();
  function a2(e3, r2) {
    t2[e3] ? t2[e3].push(r2) : t2[e3] = [r2];
  }
  !f && (this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers || this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors) && (f = true, console.warn("[remark-wiki-link] Warning: please upgrade to remark 13 to use this plugin")), a2("micromarkExtensions", function() {
    var e3 = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).aliasDivider || ":", t3 = "]]";
    return { text: { 91: { tokenize: function(a3, o2, s2) {
      var u2, l2, c2 = 0, f2 = 0, k2 = 0;
      return function(e4) {
        return e4 !== "[[".charCodeAt(f2) ? s2(e4) : (a3.enter("wikiLink"), a3.enter("wikiLinkMarker"), h2(e4));
      };
      function h2(e4) {
        return 2 === f2 ? (a3.exit("wikiLinkMarker"), function(e5) {
          return i(e5) || e5 === r.eof ? s2(e5) : (a3.enter("wikiLinkData"), a3.enter("wikiLinkTarget"), p2(e5));
        }(e4)) : e4 !== "[[".charCodeAt(f2) ? s2(e4) : (a3.consume(e4), f2++, h2);
      }
      function p2(o3) {
        return o3 === e3.charCodeAt(c2) ? u2 ? (a3.exit("wikiLinkTarget"), a3.enter("wikiLinkAliasMarker"), d2(o3)) : s2(o3) : o3 === t3.charCodeAt(k2) ? u2 ? (a3.exit("wikiLinkTarget"), a3.exit("wikiLinkData"), a3.enter("wikiLinkMarker"), w(o3)) : s2(o3) : i(o3) || o3 === r.eof ? s2(o3) : (n(o3) || (u2 = true), a3.consume(o3), p2);
      }
      function d2(t4) {
        return c2 === e3.length ? (a3.exit("wikiLinkAliasMarker"), a3.enter("wikiLinkAlias"), x(t4)) : t4 !== e3.charCodeAt(c2) ? s2(t4) : (a3.consume(t4), c2++, d2);
      }
      function x(e4) {
        return e4 === t3.charCodeAt(k2) ? l2 ? (a3.exit("wikiLinkAlias"), a3.exit("wikiLinkData"), a3.enter("wikiLinkMarker"), w(e4)) : s2(e4) : i(e4) || e4 === r.eof ? s2(e4) : (n(e4) || (l2 = true), a3.consume(e4), x);
      }
      function w(e4) {
        return 2 === k2 ? (a3.exit("wikiLinkMarker"), a3.exit("wikiLink"), o2(e4)) : e4 !== t3.charCodeAt(k2) ? s2(e4) : (a3.consume(e4), k2++, w);
      }
    } } } };
  }(e2)), a2("fromMarkdownExtensions", l(e2)), a2("toMarkdownExtensions", c(e2));
}
var h = k;
var p = t.Z;
var d = t.$;
export {
  p as default,
  d as wikiLinkPlugin
};
//# sourceMappingURL=remark-wiki-link.js.map
