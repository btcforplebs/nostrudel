import {
  require_browser
} from "./chunk-5ZNSVYRN.js";
import {
  deleteDB,
  openDB
} from "./chunk-EPBPGO4W.js";
import {
  kinds_exports,
  matchFilters,
  validateEvent
} from "./chunk-EMHHNKI2.js";
import "./chunk-PH3RM4HY.js";
import "./chunk-3QMXQ46N.js";
import "./chunk-43SEAG5C.js";
import "./chunk-UT7ZQG2B.js";
import "./chunk-WVX5ONCR.js";
import {
  __publicField,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/database/database.js
var NOSTR_IDB_NAME = "nostr-idb";
var NOSTR_IDB_VERSION = 2;
async function openDB2(name = NOSTR_IDB_NAME, callbacks) {
  return await openDB(name, NOSTR_IDB_VERSION, {
    ...callbacks,
    upgrade(db, oldVersion, newVersion, transaction, event) {
      if (oldVersion === 1) {
        db.deleteObjectStore("events");
        db.deleteObjectStore("used");
        db.deleteObjectStore("seen");
      }
      const events = db.createObjectStore("events");
      events.createIndex("id", "event.id", { unique: true });
      events.createIndex("pubkey", "event.pubkey");
      events.createIndex("kind", "event.kind");
      events.createIndex("created_at", "event.created_at");
      events.createIndex("tags", "tags", { multiEntry: true });
      const used = db.createObjectStore("used", { keyPath: "uid" });
      used.createIndex("date", "date");
      if (callbacks == null ? void 0 : callbacks.upgrade)
        callbacks.upgrade(db, oldVersion, newVersion, transaction, event);
    }
  });
}
async function deleteDB2(name = NOSTR_IDB_NAME, callbacks) {
  return await deleteDB(name, callbacks);
}
async function clearDB(db) {
  await db.clear("events");
  await db.clear("used");
}

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/database/common.js
var LETTERS = "abcdefghijklmnopqrstuvwxyz";
var GENERIC_TAGS = (LETTERS + LETTERS.toUpperCase()).split("");

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/utils.js
function sortByDate(a, b) {
  return b.created_at - a.created_at;
}

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/database/query-filter.js
function queryForPubkeys(db, authors = [], indexCache) {
  const loaded = [];
  const ids = /* @__PURE__ */ new Set();
  if (indexCache) {
    for (const pubkey of authors) {
      const cached = indexCache.getPubkeyIndex(pubkey);
      if (cached) {
        for (const id of cached)
          ids.add(id);
        loaded.push(pubkey);
      }
    }
  }
  if (loaded.length === authors.length)
    return ids;
  const trans = db.transaction("events", "readonly");
  const objectStore = trans.objectStore("events");
  const index = objectStore.index("pubkey");
  const handleResults = (pubkey, result) => {
    for (const id of result)
      ids.add(id);
    if (indexCache)
      indexCache.setPubkeyIndex(pubkey, new Set(result));
  };
  const promises = authors.filter((p) => !loaded.includes(p)).map((pubkey) => index.getAllKeys(pubkey).then((r) => handleResults(pubkey, r)));
  trans.commit();
  return Promise.all(promises).then(() => ids);
}
function queryForTag(db, tag, values, indexCache) {
  const loaded = [];
  const ids = /* @__PURE__ */ new Set();
  if (indexCache) {
    for (const value of values) {
      const cached = indexCache.getTagIndex(tag + value);
      if (cached) {
        for (const id of cached)
          ids.add(id);
        loaded.push(value);
      }
    }
  }
  if (loaded.length === values.length)
    return ids;
  const trans = db.transaction("events", "readonly");
  const objectStore = trans.objectStore("events");
  const index = objectStore.index("tags");
  const handleResults = (value, result) => {
    for (const id of result)
      ids.add(id);
    if (indexCache)
      indexCache.setTagIndex(tag + value, new Set(result));
  };
  const promises = values.map((v) => index.getAllKeys(tag + v).then((r) => handleResults(v, r)));
  trans.commit();
  return Promise.all(promises).then(() => ids);
}
function queryForKinds(db, kinds = [], indexCache) {
  const loaded = [];
  const ids = /* @__PURE__ */ new Set();
  if (indexCache) {
    for (const kind of kinds) {
      const cached = indexCache.getKindIndex(kind);
      if (cached) {
        for (const id of cached)
          ids.add(id);
        loaded.push(kind);
      }
    }
  }
  if (loaded.length === kinds.length)
    return ids;
  const trans = db.transaction("events", "readonly");
  const index = trans.objectStore("events").index("kind");
  const handleResults = (kind, result) => {
    for (const id of result)
      ids.add(id);
    if (indexCache)
      indexCache.setKindIndex(kind, new Set(result));
  };
  const promises = kinds.filter((k) => !loaded.includes(k)).map((kind) => index.getAllKeys(kind).then((r) => handleResults(kind, r)));
  trans.commit();
  return Promise.all(promises).then(() => ids);
}
async function queryForTime(db, since, until) {
  let range;
  if (since !== void 0 && until !== void 0)
    range = IDBKeyRange.bound(since, until);
  else if (since !== void 0)
    range = IDBKeyRange.lowerBound(since);
  else if (until !== void 0)
    range = IDBKeyRange.upperBound(until);
  else
    throw new Error("Missing since or until");
  const ids = (await db.getAllKeysFromIndex("events", "created_at", range)).reverse();
  return ids;
}
async function getIdsForFilter(db, filter, indexCache) {
  if (filter.search)
    return /* @__PURE__ */ new Set();
  if (filter.ids)
    return new Set(filter.ids);
  let ids = null;
  const and = (iterable) => {
    const set = iterable instanceof Set ? iterable : new Set(iterable);
    if (!ids)
      ids = set;
    else
      for (const id of ids)
        if (!set.has(id))
          ids.delete(id);
    return ids;
  };
  let timeFilterIds = null;
  if (filter.since !== void 0) {
    timeFilterIds = await queryForTime(db, filter.since, filter.until);
    and(timeFilterIds);
  }
  for (const t of GENERIC_TAGS) {
    const key = `#${t}`;
    const values = filter[key];
    if (values == null ? void 0 : values.length)
      and(await queryForTag(db, t, values, indexCache));
  }
  if (filter.authors)
    and(await queryForPubkeys(db, filter.authors, indexCache));
  if (filter.kinds)
    and(await queryForKinds(db, filter.kinds, indexCache));
  if (filter.since === void 0 && filter.until !== void 0) {
    timeFilterIds = await queryForTime(db, filter.since, filter.until);
    and(timeFilterIds);
  }
  if (filter.limit && timeFilterIds) {
    const limitIds = /* @__PURE__ */ new Set();
    for (const id of timeFilterIds) {
      if (limitIds.size >= filter.limit)
        break;
      if (ids.has(id))
        limitIds.add(id);
    }
    return limitIds;
  }
  if (ids === null)
    throw new Error("Empty filter");
  return ids;
}
async function getIdsForFilters(db, filters, indexCache) {
  if (filters.length === 0)
    throw new Error("No Filters");
  let ids = /* @__PURE__ */ new Set();
  for (const filter of filters) {
    const filterIds = await getIdsForFilter(db, filter, indexCache);
    for (const id of filterIds)
      ids.add(id);
  }
  return ids;
}
async function loadEventsByUID(db, uids, filters, eventMap) {
  const eventBuffer = [];
  let remainingIds = [];
  if (eventMap) {
    for (const uid of uids) {
      const event = eventMap.get(uid);
      if (event)
        eventBuffer.push(event);
      else
        remainingIds.push(uid);
    }
  } else
    remainingIds = uids;
  const trans = db.transaction("events", "readonly");
  const objectStore = trans.objectStore("events");
  const handleEntry = (e) => e && eventBuffer.push(e.event);
  const promises = Array.from(remainingIds).map((uid) => objectStore.get(uid).then(handleEntry));
  trans.commit();
  const sorted = await Promise.all(promises).then(() => eventBuffer.sort(sortByDate));
  let minLimit = Infinity;
  for (const filter of filters) {
    if (filter.limit && filter.limit < minLimit)
      minLimit = filter.limit;
  }
  if (sorted.length > minLimit)
    sorted.length = minLimit;
  return sorted;
}
async function getEventsForFilter(db, filter, indexCache, eventMap) {
  const ids = await getIdsForFilter(db, filter, indexCache);
  return await loadEventsByUID(db, Array.from(ids), [filter], eventMap);
}
async function getEventsForFilters(db, filters, indexCache, eventMap) {
  const ids = await getIdsForFilters(db, filters, indexCache);
  return await loadEventsByUID(db, Array.from(ids), filters, eventMap);
}
async function countEventsForFilter(db, filter, indexCache) {
  const ids = await getIdsForFilter(db, filter, indexCache);
  return ids.size;
}
async function countEventsForFilters(db, filters, indexCache) {
  const ids = await getIdsForFilters(db, filters, indexCache);
  return ids.size;
}

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/database/query-misc.js
async function getEventsFromAddressPointers(db, pointers) {
  const trans = db.transaction("events", "readonly");
  const objectStore = trans.objectStore("events");
  const events = {};
  const promises = pointers.map(async (pointer) => {
    const key = `${pointer.kind}:${pointer.pubkey}:${pointer.identifier ?? ""}`;
    const row = await objectStore.get(key);
    if (row) {
      const existing = events[key];
      if (!existing || row.event.created_at > existing.created_at)
        events[key] = row.event;
    }
  });
  trans.commit();
  const sorted = await Promise.all(promises).then(() => Object.values(events).sort((a, b) => b.created_at - a.created_at));
  return sorted;
}
async function countEventsByPubkeys(db) {
  let cursor = await db.transaction("events", "readonly").objectStore("events").index("pubkey").openKeyCursor();
  if (!cursor)
    return {};
  const counts = {};
  while (cursor) {
    const pubkey = cursor.key;
    counts[pubkey] = (counts[pubkey] || 0) + 1;
    cursor = await cursor.continue();
  }
  return counts;
}
async function countEventsByKind(db) {
  let cursor = await db.transaction("events", "readonly").objectStore("events").index("kind").openKeyCursor();
  if (!cursor)
    return {};
  const counts = {};
  while (cursor) {
    const kind = cursor.key;
    counts[kind] = (counts[kind] || 0) + 1;
    cursor = await cursor.continue();
  }
  return counts;
}
function countEvents(db) {
  return db.transaction("events", "readonly").store.count();
}

// node_modules/.pnpm/nostr-tools@2.7.2_typescript@5.6.2/node_modules/nostr-tools/lib/esm/kinds.js
function isReplaceableKind(kind) {
  return [0, 3].includes(kind) || 1e4 <= kind && kind < 2e4;
}
function isParameterizedReplaceableKind(kind) {
  return 3e4 <= kind && kind < 4e4;
}

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/database/ingest.js
function getEventTags(event) {
  return event.tags.filter((t) => t.length >= 2 && t[0].length === 1 && GENERIC_TAGS.includes(t[0])).map((t) => t[0] + t[1]);
}
function getEventUID(event) {
  var _a;
  if (kinds_exports.isReplaceableKind(event.kind) || kinds_exports.isParameterizedReplaceableKind(event.kind)) {
    const d = (_a = event.tags.find((t) => t[0] === "d")) == null ? void 0 : _a[1];
    return d ? `${event.kind}:${event.pubkey}:${d}` : `${event.kind}:${event.pubkey}`;
  }
  return event.id;
}
async function addEvents(db, events) {
  events = events.filter((event) => validateEvent(event));
  const replaceableEvents = events.filter((e) => isReplaceableKind(e.kind) || isParameterizedReplaceableKind(e.kind));
  const existingEvents = {};
  if (replaceableEvents.length > 0) {
    const readTransaction = db.transaction("events", "readonly");
    const promises = replaceableEvents.map((e) => {
      const uid = getEventUID(e);
      readTransaction.store.get(uid).then((r) => r && (existingEvents[uid] = r.event.created_at));
    });
    readTransaction.commit();
    await Promise.all(promises);
  }
  const writeTransaction = db.transaction("events", "readwrite");
  for (const event of events) {
    const uid = getEventUID(event);
    if (!existingEvents[uid] || event.created_at > existingEvents[uid]) {
      writeTransaction.objectStore("events").put({
        event,
        tags: getEventTags(event)
      }, uid);
    }
  }
  await writeTransaction.commit();
}
async function updateUsed(db, uids) {
  const trans = db.transaction("used", "readwrite");
  const nowUnix = Math.floor((/* @__PURE__ */ new Date()).valueOf() / 1e3);
  for (const uid of uids) {
    trans.objectStore("used").put({
      uid,
      date: nowUnix
    });
  }
  await trans.commit();
}

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/debug.js
var debug = __toESM(require_browser(), 1);
var logger = debug.default("nostr-idb");

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/database/prune.js
var log = logger.extend("prune");
async function pruneLastUsed(db, maxEvents, skip) {
  const count = await countEvents(db);
  if (count <= maxEvents)
    return;
  const diff = count - maxEvents;
  if (diff <= 0)
    return;
  log(`Pruning database to ${maxEvents}`);
  const used = (await db.getAll("used")).sort((a, b) => a.date - b.date);
  const eventsTransaction = db.transaction("events", "readwrite");
  const usedTransaction = db.transaction("used", "readwrite");
  const promises = [];
  let i = diff;
  while (i > 0) {
    const entry = used.shift();
    if (!entry)
      break;
    const uid = entry.uid;
    if (skip) {
      const row = await db.get("events", uid);
      if (row && skip(row.event))
        continue;
    }
    promises.push(eventsTransaction.store.delete(uid));
    promises.push(usedTransaction.store.delete(uid));
    i--;
  }
  eventsTransaction.commit();
  usedTransaction.commit();
  await Promise.all(promises);
  log(`Removed ${diff} old events`);
}

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/cache/write-queue.js
var log2 = logger.extend("writeQueue");
var WriteQueue = class {
  constructor(db) {
    __publicField(this, "db");
    __publicField(this, "queuedIds", /* @__PURE__ */ new Set());
    __publicField(this, "eventQueue", []);
    __publicField(this, "lastUsedQueue", /* @__PURE__ */ new Set());
    this.db = db;
  }
  addEvent(event) {
    if (this.queuedIds.has(event.id))
      return;
    this.eventQueue.push(event);
    this.queuedIds.add(event.id);
    this.useEvent(event);
  }
  addEvents(events) {
    const arr = events.filter((e) => !this.queuedIds.has(e.id));
    if (arr.length === 0)
      return;
    this.eventQueue.push(...arr);
    this.useEvents(arr);
  }
  useEvent(event) {
    this.lastUsedQueue.add(getEventUID(event));
  }
  useEvents(events) {
    for (const event of events)
      this.lastUsedQueue.add(getEventUID(event));
  }
  matchPending(filters) {
    return this.eventQueue.filter((e) => matchFilters(filters, e));
  }
  async flush(count = 1e3) {
    if (this.eventQueue.length > 0) {
      const events = [];
      for (let i = 0; i < count; i++) {
        const event = this.eventQueue.shift();
        if (!event)
          break;
        events.push(event);
        this.queuedIds.delete(event.id);
      }
      await addEvents(this.db, events);
      log2(`Wrote ${events.length} to database`);
      if (this.eventQueue.length > 0)
        log2(`${this.eventQueue.length} left`);
    }
    if (this.lastUsedQueue.size > 0) {
      await updateUsed(this.db, this.lastUsedQueue);
      this.lastUsedQueue.clear();
    }
  }
  clear() {
    this.eventQueue = [];
  }
};

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/cache/index-cache.js
var log3 = logger.extend("cache:indexes");
var Index = class extends Set {
  constructor(values, type, key) {
    super(values);
    __publicField(this, "type");
    __publicField(this, "key");
    this.type = type;
    this.key = key;
  }
};
var IndexCache = class {
  constructor() {
    __publicField(this, "kinds", /* @__PURE__ */ new Map());
    __publicField(this, "pubkeys", /* @__PURE__ */ new Map());
    __publicField(this, "tags", /* @__PURE__ */ new Map());
    __publicField(this, "max", 1e3);
    __publicField(this, "lastUsed", []);
  }
  get count() {
    return this.kinds.size + this.pubkeys.size + this.tags.size;
  }
  useIndex(index) {
    const i = this.lastUsed.indexOf(index);
    if (i !== -1)
      this.lastUsed.splice(i, i + 1);
    this.lastUsed.push(index);
  }
  getKindIndex(kind) {
    const index = this.kinds.get(kind);
    if (index)
      this.useIndex(index);
    return index;
  }
  setKindIndex(kind, uids) {
    const index = new Index(uids, "kind", kind);
    this.kinds.set(kind, index);
    this.useIndex(index);
    this.pruneIndexes();
  }
  getPubkeyIndex(pubkey) {
    const index = this.pubkeys.get(pubkey);
    if (index)
      this.useIndex(index);
    return index;
  }
  setPubkeyIndex(pubkey, uids) {
    const index = new Index(uids, "pubkey", pubkey);
    this.pubkeys.set(pubkey, index);
    this.useIndex(index);
    this.pruneIndexes();
  }
  getTagIndex(tagAndValue) {
    const index = this.tags.get(tagAndValue);
    if (index)
      this.useIndex(index);
    return index;
  }
  setTagIndex(tagAndValue, uids) {
    const index = new Index(uids, "tag", tagAndValue);
    this.tags.set(tagAndValue, index);
    this.useIndex(index);
    this.pruneIndexes();
  }
  addEventToIndexes(event) {
    var _a, _b, _c;
    (_a = this.getKindIndex(event.kind)) == null ? void 0 : _a.add(event.id);
    (_b = this.getPubkeyIndex(event.pubkey)) == null ? void 0 : _b.add(event.id);
    const tags = getEventTags(event);
    for (const tag of tags) {
      (_c = this.getTagIndex(tag)) == null ? void 0 : _c.add(event.id);
    }
  }
  pruneIndexes() {
    while (this.lastUsed.length > 0 && this.lastUsed.length > this.max) {
      const index = this.lastUsed.shift();
      if (!index)
        return;
      log3(`Forgetting ${index.type}:${index.key}`);
      switch (index.type) {
        case "kind":
          this.kinds.delete(index.key);
          break;
        case "pubkey":
          this.pubkeys.delete(index.key);
          break;
        case "tag":
          this.tags.delete(index.key);
          break;
      }
    }
  }
};

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/lib/nanoid.js
var nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/relay/relay-core.js
var defaultOptions = {
  batchWrite: 1e3,
  writeInterval: 100,
  cacheIndexes: 1e3,
  pruneInterval: 1e3 * 60,
  maxEvents: 1e4
};
var log4 = logger.extend("relay");
var RelayCore = class {
  constructor(db, opts = {}) {
    __publicField(this, "options");
    __publicField(this, "writeInterval");
    __publicField(this, "pruneInterval");
    __publicField(this, "eventMap", /* @__PURE__ */ new Map());
    __publicField(this, "writeQueue");
    __publicField(this, "indexCache");
    __publicField(this, "db");
    __publicField(this, "baseEoseTimeout", 4400);
    __publicField(this, "subscriptions", /* @__PURE__ */ new Map());
    this.db = db;
    this.options = { ...defaultOptions, ...opts };
    this.writeQueue = new WriteQueue(db);
    this.indexCache = new IndexCache();
    this.indexCache.max = this.options.cacheIndexes;
  }
  get running() {
    return !!this.writeInterval;
  }
  async start() {
    log4("Starting");
    this.writeInterval = self.setInterval(() => {
      this.writeQueue.flush(this.options.batchWrite);
    }, this.options.writeInterval);
    this.pruneInterval = self.setInterval(() => {
      pruneLastUsed(this.db, this.options.maxEvents);
    }, this.options.pruneInterval);
  }
  async stop() {
    if (this.writeInterval) {
      self.clearInterval(this.writeInterval);
      this.writeInterval = void 0;
    }
    if (this.pruneInterval) {
      self.clearInterval(this.pruneInterval);
      this.pruneInterval = void 0;
    }
    log4("Stopped");
  }
  async publish(event) {
    if (!kinds_exports.isEphemeralKind(event.kind)) {
      this.writeQueue.addEvent(event);
      this.indexCache.addEventToIndexes(event);
    }
    const uid = getEventUID(event);
    let subs = 0;
    if (!this.eventMap.has(uid)) {
      if (!kinds_exports.isEphemeralKind(event.kind))
        this.eventMap.set(uid, event);
      for (const [id, sub] of this.subscriptions) {
        if (sub.onevent && matchFilters(sub.filters, event)) {
          sub.onevent(event);
          subs++;
        }
      }
    }
    return `Sent to ${subs} subscriptions`;
  }
  async count(filters) {
    return await countEventsForFilters(this.db, filters);
  }
  addToEventMaps(events) {
    for (const event of events)
      this.eventMap.set(getEventUID(event), event);
  }
  async executeSubscription(sub) {
    const start = (/* @__PURE__ */ new Date()).valueOf();
    log4(`Running ${sub.id}`, sub.filters);
    const eventsFromQueue = this.writeQueue.matchPending(sub.filters);
    return new Promise((res, rej) => {
      const timeout = setTimeout(() => {
        if (sub.oneose)
          sub.oneose();
        res();
      }, this.baseEoseTimeout);
      getEventsForFilters(this.db, sub.filters, this.indexCache, this.eventMap).then((filterEvents) => {
        clearTimeout(timeout);
        this.addToEventMaps(filterEvents);
        if (sub.onevent) {
          const idsFromQueue = new Set(eventsFromQueue.map((e) => e.id));
          const events = eventsFromQueue.length > 0 ? [
            ...filterEvents.filter((e) => !idsFromQueue.has(e.id)),
            ...eventsFromQueue
          ].sort(sortByDate) : filterEvents;
          for (const event of events) {
            try {
              sub.onevent(event);
              this.writeQueue.useEvent(event);
            } catch (error) {
              log4(`onevent failed with error`, error);
            }
          }
          const delta = (/* @__PURE__ */ new Date()).valueOf() - start;
          log4(`Finished ${sub.id} took ${delta}ms and got ${events.length} events`);
        }
        if (sub.oneose)
          sub.oneose();
        res();
      });
    });
  }
  subscribe(filters, options) {
    if (options.id && this.subscriptions.has(options.id)) {
      this.subscriptions.delete(options.id);
    }
    const id = options.id || nanoid();
    const sub = {
      id,
      filters,
      close: () => this.subscriptions.delete(id),
      fire: () => this.executeSubscription(sub),
      ...options
    };
    this.subscriptions.set(id, sub);
    this.executeSubscription(sub);
    return sub;
  }
  unsubscribe(id) {
    var _a;
    const sub = this.subscriptions.get(id);
    if (sub) {
      log4(`Closing ${id}`);
      (_a = sub.onclose) == null ? void 0 : _a.call(sub, "unsubscribe");
      this.subscriptions.delete(id);
    }
  }
};

// node_modules/.pnpm/nostr-idb@2.1.6_typescript@5.6.2/node_modules/nostr-idb/dist/relay/cache-relay.js
var CacheRelay = class {
  constructor(db, opts = {}) {
    __publicField(this, "db");
    __publicField(this, "core");
    this.db = db;
    this.core = new RelayCore(db, opts);
  }
  get url() {
    return "nostr-idb://cache-relay";
  }
  get connected() {
    return !!this.core.running;
  }
  async connect() {
    this.core.start();
  }
  async close() {
    this.core.stop();
  }
  async publish(event) {
    return this.core.publish(event);
  }
  async count(filters, params) {
    return this.core.count(filters);
  }
  subscribe(filters, options) {
    return this.core.subscribe(filters, options);
  }
};
export {
  CacheRelay,
  IndexCache,
  NOSTR_IDB_NAME,
  NOSTR_IDB_VERSION,
  RelayCore,
  WriteQueue,
  addEvents,
  clearDB,
  countEvents,
  countEventsByKind,
  countEventsByPubkeys,
  countEventsForFilter,
  countEventsForFilters,
  deleteDB2 as deleteDB,
  getEventTags,
  getEventUID,
  getEventsForFilter,
  getEventsForFilters,
  getEventsFromAddressPointers,
  getIdsForFilter,
  getIdsForFilters,
  openDB2 as openDB,
  pruneLastUsed,
  queryForKinds,
  queryForPubkeys,
  queryForTag,
  queryForTime,
  updateUsed
};
//# sourceMappingURL=nostr-idb.js.map
