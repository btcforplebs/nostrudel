import {
  truncateContent
} from "./chunk-EXKIMXHY.js";
import {
  getParsedTextContent
} from "./chunk-EQ2UESN2.js";
import {
  require_jsx_runtime
} from "./chunk-N2VR5K3D.js";
import {
  isStateful
} from "./chunk-23HJ24FQ.js";
import {
  require_react
} from "./chunk-QZ55VL3A.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/hooks/use-observable.js
var import_react = __toESM(require_react(), 1);
function useObservable(observable) {
  const [_count, update] = (0, import_react.useState)(0);
  const [value, setValue] = (0, import_react.useState)(observable && isStateful(observable) ? observable.value : void 0);
  (0, import_react.useEffect)(() => {
    const sub = observable == null ? void 0 : observable.subscribe((v) => {
      setValue(v);
      update((c) => c + 1);
    });
    return () => sub == null ? void 0 : sub.unsubscribe();
  }, [observable]);
  return value;
}

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/hooks/use-store-query.js
var import_react3 = __toESM(require_react(), 1);

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/provider.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react2 = __toESM(require_react(), 1);
var QueryStoreContext = (0, import_react2.createContext)(null);
function useQueryStore() {
  const store = (0, import_react2.useContext)(QueryStoreContext);
  if (!store)
    throw new Error("Missing QueryStoreProvider");
  return store;
}
function QueryStoreProvider({ store, children }) {
  return (0, import_jsx_runtime.jsx)(QueryStoreContext.Provider, { value: store, children });
}

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/hooks/use-store-query.js
function useStoreQuery(queryConstructor, args) {
  const store = useQueryStore();
  const observable = (0, import_react3.useMemo)(() => {
    if (args)
      return store.runQuery(queryConstructor)(...args);
    else
      return void 0;
  }, [args, store]);
  return useObservable(observable);
}

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/hooks/use-render-nast.js
var import_react4 = __toESM(require_react(), 1);

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/helpers/nast.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function renderNast(root, components) {
  const indexes = {};
  return (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: root.children.map((node) => {
    indexes[node.type] = indexes[node.type] ?? 0;
    const index = indexes[node.type];
    indexes[node.type]++;
    const Component = components[node.type];
    if (!Component)
      return null;
    return (0, import_jsx_runtime2.jsx)(Component, { node }, node.type + "-" + index);
  }) });
}

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/hooks/use-render-nast.js
function useRenderNast(root, components) {
  return (0, import_react4.useMemo)(() => root ? renderNast(root, components) : null, [root, Object.keys(components).join("|")]);
}

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/hooks/use-rendered-text-content.js
var import_react6 = __toESM(require_react(), 1);

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/helpers/build-link-renderer.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var import_react5 = __toESM(require_react(), 1);
function buildLinkRenderer(handlers) {
  const LinkRenderer = ({ node }) => {
    const content = (0, import_react5.useMemo)(() => {
      try {
        const url = new URL(node.href);
        for (const handler of handlers) {
          try {
            const content2 = handler(url, node);
            if (content2)
              return content2;
          } catch (e) {
          }
        }
      } catch (error) {
      }
      return null;
    }, [node.href, node.value]);
    return content || (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: node.value });
  };
  return (0, import_react5.memo)(LinkRenderer);
}

// node_modules/.pnpm/applesauce-react@0.7.0_typescript@5.6.2/node_modules/applesauce-react/dist/hooks/use-rendered-text-content.js
function useRenderedContent(event, components, opts) {
  const _components = (0, import_react6.useMemo)(() => (opts == null ? void 0 : opts.linkRenderers) ? { ...components, link: buildLinkRenderer(opts.linkRenderers) } : components, [opts == null ? void 0 : opts.linkRenderers, components]);
  const nast = (0, import_react6.useMemo)(() => event ? getParsedTextContent(event, opts == null ? void 0 : opts.content, opts == null ? void 0 : opts.transformers) : void 0, [event, opts == null ? void 0 : opts.content, opts == null ? void 0 : opts.transformers]);
  let truncated = nast;
  if ((opts == null ? void 0 : opts.maxLength) && nast)
    truncated = truncateContent(nast, opts.maxLength);
  return useRenderNast(truncated, _components);
}

export {
  useQueryStore,
  QueryStoreProvider,
  useObservable,
  useStoreQuery,
  useRenderNast,
  useRenderedContent
};
//# sourceMappingURL=chunk-3J2WOSAD.js.map
