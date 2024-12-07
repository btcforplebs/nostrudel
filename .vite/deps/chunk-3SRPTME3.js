import {
  createCache,
  getRegisteredStyles,
  init_emotion_cache_browser_development_esm,
  init_emotion_serialize_development_esm,
  init_emotion_utils_browser_esm,
  insertStyles,
  serializeStyles
} from "./chunk-LYXLU5JT.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/@emotion+css@11.13.0/node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.development.esm.js
var emotion_css_create_instance_development_esm_exports = {};
__export(emotion_css_create_instance_development_esm_exports, {
  default: () => createEmotion
});
function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === void 0) {
    return cache.insert("", serialized, cache.sheet, true);
  }
}
function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css(registeredStyles);
}
var createEmotion, classnames;
var init_emotion_css_create_instance_development_esm = __esm({
  "node_modules/.pnpm/@emotion+css@11.13.0/node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.development.esm.js"() {
    init_emotion_cache_browser_development_esm();
    init_emotion_serialize_development_esm();
    init_emotion_utils_browser_esm();
    createEmotion = function createEmotion2(options) {
      var cache = createCache(options);
      cache.sheet.speedy = function(value) {
        if (this.ctr !== 0) {
          throw new Error("speedy must be changed before any rules are inserted");
        }
        this.isSpeedy = value;
      };
      cache.compat = true;
      var css = function css2() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serializeStyles(args, cache.registered, void 0);
        insertStyles(cache, serialized, false);
        return cache.key + "-" + serialized.name;
      };
      var keyframes = function keyframes2() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var serialized = serializeStyles(args, cache.registered);
        var animation = "animation-" + serialized.name;
        insertWithoutScoping(cache, {
          name: serialized.name,
          styles: "@keyframes " + animation + "{" + serialized.styles + "}"
        });
        return animation;
      };
      var injectGlobal = function injectGlobal2() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var serialized = serializeStyles(args, cache.registered);
        insertWithoutScoping(cache, serialized);
      };
      var cx = function cx2() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return merge(cache.registered, css, classnames(args));
      };
      return {
        css,
        cx,
        injectGlobal,
        keyframes,
        hydrate: function hydrate(ids) {
          ids.forEach(function(key) {
            cache.inserted[key] = true;
          });
        },
        flush: function flush() {
          cache.registered = {};
          cache.inserted = {};
          cache.sheet.flush();
        },
        sheet: cache.sheet,
        cache,
        getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
        merge: merge.bind(null, cache.registered, css)
      };
    };
    classnames = function classnames2(args) {
      var cls = "";
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (arg == null) continue;
        var toAdd = void 0;
        switch (typeof arg) {
          case "boolean":
            break;
          case "object": {
            if (Array.isArray(arg)) {
              toAdd = classnames2(arg);
            } else {
              toAdd = "";
              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += " ");
                  toAdd += k;
                }
              }
            }
            break;
          }
          default: {
            toAdd = arg;
          }
        }
        if (toAdd) {
          cls && (cls += " ");
          cls += toAdd;
        }
      }
      return cls;
    };
  }
});

// node_modules/.pnpm/react-diff-viewer-continued@3.4.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-diff-viewer-continued/lib/src/styles.js
var require_styles = __commonJS({
  "node_modules/.pnpm/react-diff-viewer-continued@3.4.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-diff-viewer-continued/lib/src/styles.js"(exports) {
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var create_instance_1 = __importDefault((init_emotion_css_create_instance_development_esm(), __toCommonJS(emotion_css_create_instance_development_esm_exports)));
    exports.default = (styleOverride, useDarkTheme = false, nonce = "") => {
      const { variables: overrideVariables = {} } = styleOverride, styles = __rest(styleOverride, ["variables"]);
      const themeVariables = {
        light: Object.assign({
          diffViewerBackground: "#fff",
          diffViewerColor: "#212529",
          addedBackground: "#e6ffed",
          addedColor: "#24292e",
          removedBackground: "#ffeef0",
          removedColor: "#24292e",
          changedBackground: "#fffbdd",
          wordAddedBackground: "#acf2bd",
          wordRemovedBackground: "#fdb8c0",
          addedGutterBackground: "#cdffd8",
          removedGutterBackground: "#ffdce0",
          gutterBackground: "#f7f7f7",
          gutterBackgroundDark: "#f3f1f1",
          highlightBackground: "#fffbdd",
          highlightGutterBackground: "#fff5b1",
          codeFoldGutterBackground: "#dbedff",
          codeFoldBackground: "#f1f8ff",
          emptyLineBackground: "#fafbfc",
          gutterColor: "#212529",
          addedGutterColor: "#212529",
          removedGutterColor: "#212529",
          codeFoldContentColor: "#212529",
          diffViewerTitleBackground: "#fafbfc",
          diffViewerTitleColor: "#212529",
          diffViewerTitleBorderColor: "#eee"
        }, overrideVariables.light || {}),
        dark: Object.assign({
          diffViewerBackground: "#2e303c",
          diffViewerColor: "#FFF",
          addedBackground: "#044B53",
          addedColor: "white",
          removedBackground: "#632F34",
          removedColor: "white",
          changedBackground: "#3e302c",
          wordAddedBackground: "#055d67",
          wordRemovedBackground: "#7d383f",
          addedGutterBackground: "#034148",
          removedGutterBackground: "#632b30",
          gutterBackground: "#2c2f3a",
          gutterBackgroundDark: "#262933",
          highlightBackground: "#2a3967",
          highlightGutterBackground: "#2d4077",
          codeFoldGutterBackground: "#21232b",
          codeFoldBackground: "#262831",
          emptyLineBackground: "#363946",
          gutterColor: "#666c87",
          addedGutterColor: "#8c8c8c",
          removedGutterColor: "#8c8c8c",
          codeFoldContentColor: "#656a8b",
          diffViewerTitleBackground: "#2f323e",
          diffViewerTitleColor: "#555a7b",
          diffViewerTitleBorderColor: "#353846"
        }, overrideVariables.dark || {})
      };
      const variables = useDarkTheme ? themeVariables.dark : themeVariables.light;
      const { css, cx } = (0, create_instance_1.default)({ key: "react-diff", nonce });
      const content = css({
        width: "100%",
        label: "content"
      });
      const splitView = css({
        [`.${content}`]: {
          width: "50%"
        },
        label: "split-view"
      });
      const diffContainer = css({
        width: "100%",
        background: variables.diffViewerBackground,
        pre: {
          margin: 0,
          whiteSpace: "pre-wrap",
          lineHeight: "25px"
        },
        label: "diff-container",
        borderCollapse: "collapse"
      });
      const codeFoldContent = css({
        color: variables.codeFoldContentColor,
        label: "code-fold-content"
      });
      const contentText = css({
        color: variables.diffViewerColor,
        label: "content-text"
      });
      const titleBlock = css({
        background: variables.diffViewerTitleBackground,
        padding: 10,
        borderBottom: `1px solid ${variables.diffViewerTitleBorderColor}`,
        label: "title-block",
        ":last-child": {
          borderLeft: `1px solid ${variables.diffViewerTitleBorderColor}`
        },
        [`.${contentText}`]: {
          color: variables.diffViewerTitleColor
        }
      });
      const lineNumber = css({
        color: variables.gutterColor,
        label: "line-number"
      });
      const diffRemoved = css({
        background: variables.removedBackground,
        color: variables.removedColor,
        pre: {
          color: variables.removedColor
        },
        [`.${lineNumber}`]: {
          color: variables.removedGutterColor
        },
        label: "diff-removed"
      });
      const diffAdded = css({
        background: variables.addedBackground,
        color: variables.addedColor,
        pre: {
          color: variables.addedColor
        },
        [`.${lineNumber}`]: {
          color: variables.addedGutterColor
        },
        label: "diff-added"
      });
      const diffChanged = css({
        background: variables.changedBackground,
        [`.${lineNumber}`]: {
          color: variables.gutterColor
        },
        label: "diff-changed"
      });
      const wordDiff = css({
        padding: 2,
        display: "inline-flex",
        borderRadius: 4,
        wordBreak: "break-all",
        label: "word-diff"
      });
      const wordAdded = css({
        background: variables.wordAddedBackground,
        label: "word-added"
      });
      const wordRemoved = css({
        background: variables.wordRemovedBackground,
        label: "word-removed"
      });
      const codeFoldGutter = css({
        backgroundColor: variables.codeFoldGutterBackground,
        label: "code-fold-gutter"
      });
      const codeFold = css({
        backgroundColor: variables.codeFoldBackground,
        height: 40,
        fontSize: 14,
        fontWeight: 700,
        label: "code-fold",
        a: {
          textDecoration: "underline !important",
          cursor: "pointer",
          pre: {
            display: "inline"
          }
        }
      });
      const emptyLine = css({
        backgroundColor: variables.emptyLineBackground,
        label: "empty-line"
      });
      const marker = css({
        width: 25,
        paddingLeft: 10,
        paddingRight: 10,
        userSelect: "none",
        label: "marker",
        [`&.${diffAdded}`]: {
          pre: {
            color: variables.addedColor
          }
        },
        [`&.${diffRemoved}`]: {
          pre: {
            color: variables.removedColor
          }
        }
      });
      const highlightedLine = css({
        background: variables.highlightBackground,
        label: "highlighted-line",
        [`.${wordAdded}, .${wordRemoved}`]: {
          backgroundColor: "initial"
        }
      });
      const highlightedGutter = css({
        label: "highlighted-gutter"
      });
      const gutter = css({
        userSelect: "none",
        minWidth: 50,
        padding: "0 10px",
        whiteSpace: "nowrap",
        label: "gutter",
        textAlign: "right",
        background: variables.gutterBackground,
        "&:hover": {
          cursor: "pointer",
          background: variables.gutterBackgroundDark,
          pre: {
            opacity: 1
          }
        },
        pre: {
          opacity: 0.5
        },
        [`&.${diffAdded}`]: {
          background: variables.addedGutterBackground
        },
        [`&.${diffRemoved}`]: {
          background: variables.removedGutterBackground
        },
        [`&.${highlightedGutter}`]: {
          background: variables.highlightGutterBackground,
          "&:hover": {
            background: variables.highlightGutterBackground
          }
        }
      });
      const emptyGutter = css({
        "&:hover": {
          background: variables.gutterBackground,
          cursor: "initial"
        },
        label: "empty-gutter"
      });
      const line = css({
        verticalAlign: "baseline",
        label: "line"
      });
      const defaultStyles = {
        diffContainer,
        diffRemoved,
        diffAdded,
        diffChanged,
        splitView,
        marker,
        highlightedGutter,
        highlightedLine,
        gutter,
        line,
        wordDiff,
        wordAdded,
        wordRemoved,
        codeFoldGutter,
        codeFold,
        emptyGutter,
        emptyLine,
        lineNumber,
        contentText,
        content,
        codeFoldContent,
        titleBlock
      };
      const computerOverrideStyles = Object.keys(styles).reduce((acc, key) => Object.assign(Object.assign({}, acc), {
        [key]: css(styles[key])
      }), {});
      return Object.keys(defaultStyles).reduce((acc, key) => Object.assign(Object.assign({}, acc), {
        [key]: computerOverrideStyles[key] ? cx(defaultStyles[key], computerOverrideStyles[key]) : defaultStyles[key]
      }), {});
    };
  }
});

export {
  require_styles
};
//# sourceMappingURL=chunk-3SRPTME3.js.map
