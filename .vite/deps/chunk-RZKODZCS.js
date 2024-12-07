import {
  require_lib
} from "./chunk-H2545MIT.js";
import {
  getCoordinateFromAddressPointer,
  getEventUID,
  getInboxes,
  getNip10References,
  getOutboxes,
  getProfileContent,
  getReplaceableUID,
  isAddressPointer,
  isReplaceable
} from "./chunk-P6DIHSVM.js";
import {
  kinds_exports
} from "./chunk-EMHHNKI2.js";
import {
  __export,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/queries/index.js
var queries_exports = {};
__export(queries_exports, {
  MailboxesQuery: () => MailboxesQuery,
  MultipleEventsQuery: () => MultipleEventsQuery,
  ProfileQuery: () => ProfileQuery,
  ReactionsQuery: () => ReactionsQuery,
  ReplaceableQuery: () => ReplaceableQuery,
  ReplaceableSetQuery: () => ReplaceableSetQuery,
  SingleEventQuery: () => SingleEventQuery,
  ThreadQuery: () => ThreadQuery,
  TimelineQuery: () => TimelineQuery
});

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/queries/simple.js
var import_json_stringify_deterministic = __toESM(require_lib(), 1);
function SingleEventQuery(uid) {
  return {
    key: uid,
    run: (events) => events.event(uid)
  };
}
function MultipleEventsQuery(uids) {
  return {
    key: uids.join(","),
    run: (events) => events.events(uids)
  };
}
function ReplaceableQuery(kind, pubkey, d) {
  return {
    key: getReplaceableUID(kind, pubkey, d),
    run: (events) => events.replaceable(kind, pubkey, d)
  };
}
function TimelineQuery(filters) {
  return {
    key: (0, import_json_stringify_deterministic.default)(filters),
    run: (events) => events.timeline(Array.isArray(filters) ? filters : [filters])
  };
}
function ReplaceableSetQuery(pointers) {
  const cords = pointers.map((pointer) => getReplaceableUID(pointer.kind, pointer.pubkey, pointer.identifier));
  return {
    key: (0, import_json_stringify_deterministic.default)(pointers),
    run: (events) => events.events(cords)
  };
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/queries/profile.js
function ProfileQuery(pubkey) {
  return {
    key: pubkey,
    run: (events) => {
      return events.replaceable(kinds_exports.Metadata, pubkey).map((event) => event && getProfileContent(event));
    }
  };
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/queries/mailboxes.js
function MailboxesQuery(pubkey) {
  return {
    key: pubkey,
    run: (events) => events.replaceable(kinds_exports.RelayList, pubkey).map((event) => event && {
      inboxes: getInboxes(event),
      outboxes: getOutboxes(event)
    })
  };
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/queries/reactions.js
function ReactionsQuery(event) {
  return {
    key: getEventUID(event),
    run: (events) => events.timeline(isReplaceable(event.kind) ? [
      { kinds: [kinds_exports.Reaction], "#e": [event.id] },
      { kinds: [kinds_exports.Reaction], "#a": [getEventUID(event)] }
    ] : [
      {
        kinds: [kinds_exports.Reaction],
        "#e": [event.id]
      }
    ])
  };
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/queries/thread.js
var defaultOptions = {
  kinds: [kinds_exports.ShortTextNote]
};
function ThreadQuery(root, opts) {
  const parentReferences = /* @__PURE__ */ new Map();
  const items = /* @__PURE__ */ new Map();
  const { kinds } = { ...defaultOptions, ...opts };
  let rootUID = "";
  const rootFilter = {};
  const replyFilter = { kinds };
  if (isAddressPointer(root)) {
    rootUID = getCoordinateFromAddressPointer(root);
    rootFilter.kinds = [root.kind];
    rootFilter.authors = [root.pubkey];
    rootFilter["#d"] = [root.identifier];
    replyFilter["#a"] = [rootUID];
  } else if (typeof root === "string") {
    rootUID = root;
    rootFilter.ids = [root];
    replyFilter["#e"] = [root];
  } else {
    rootUID = root.id;
    rootFilter.ids = [root.id];
    replyFilter["#e"] = [root.id];
  }
  return {
    key: `${rootUID}-${kinds.join(",")}`,
    run: (events) => events.stream([rootFilter, replyFilter]).map((event) => {
      var _a, _b;
      if (!items.has(getEventUID(event))) {
        const refs = getNip10References(event);
        const replies = parentReferences.get(getEventUID(event)) || /* @__PURE__ */ new Set();
        const item = { event, refs, replies };
        for (const child of replies) {
          child.parent = item;
        }
        if (((_a = refs.reply) == null ? void 0 : _a.e) || ((_b = refs.reply) == null ? void 0 : _b.a)) {
          let uid = refs.reply.e ? refs.reply.e.id : getCoordinateFromAddressPointer(refs.reply.a);
          item.parent = items.get(uid);
          if (item.parent) {
            item.parent.replies.add(item);
          } else {
            let set = parentReferences.get(uid);
            if (!set) {
              set = /* @__PURE__ */ new Set();
              parentReferences.set(uid, set);
            }
            set.add(item);
          }
        }
        items.set(getEventUID(event), item);
      }
      return { root: items.get(rootUID), all: items };
    })
  };
}

export {
  SingleEventQuery,
  MultipleEventsQuery,
  ReplaceableQuery,
  TimelineQuery,
  ReplaceableSetQuery,
  ProfileQuery,
  MailboxesQuery,
  ReactionsQuery,
  ThreadQuery,
  queries_exports
};
//# sourceMappingURL=chunk-RZKODZCS.js.map
