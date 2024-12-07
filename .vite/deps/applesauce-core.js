import {
  MailboxesQuery,
  MultipleEventsQuery,
  ProfileQuery,
  ReactionsQuery,
  ReplaceableQuery,
  ReplaceableSetQuery,
  SingleEventQuery,
  ThreadQuery,
  TimelineQuery,
  queries_exports
} from "./chunk-RZKODZCS.js";
import "./chunk-H2545MIT.js";
import {
  LRU,
  helpers_exports,
  matchFilters
} from "./chunk-524T4WEN.js";
import {
  INDEXABLE_TAGS,
  addSeenRelay,
  getEventUID,
  getIndexableTags,
  getReplaceableUID
} from "./chunk-P6DIHSVM.js";
import {
  stateful
} from "./chunk-23HJ24FQ.js";
import {
  require_zen_observable
} from "./chunk-OCSVJ24W.js";
import "./chunk-CTT4SYZK.js";
import "./chunk-3HQGVAVI.js";
import "./chunk-MG7C4QW5.js";
import {
  require_browser
} from "./chunk-5ZNSVYRN.js";
import "./chunk-EMHHNKI2.js";
import "./chunk-PH3RM4HY.js";
import "./chunk-3QMXQ46N.js";
import "./chunk-43SEAG5C.js";
import "./chunk-UT7ZQG2B.js";
import "./chunk-WVX5ONCR.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/zen-observable@0.9.0/node_modules/zen-observable/lib/Observable.js
var require_Observable = __commonJS({
  "node_modules/.pnpm/zen-observable@0.9.0/node_modules/zen-observable/lib/Observable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Observable = void 0;
    var hasSymbol = (name) => Boolean(Symbol[name]);
    var getSymbol = (name) => hasSymbol(name) ? Symbol[name] : "@@" + name;
    if (!hasSymbol("observable") && Object.isExtensible(Symbol)) {
      Symbol.observable = Symbol("observable");
    }
    var SymbolIterator = getSymbol("iterator");
    var SymbolObservable = getSymbol("observable");
    var SymbolSpecies = getSymbol("species");
    function getMethod(obj, key) {
      let value = obj[key];
      if (value == null) return void 0;
      if (typeof value !== "function") throw new TypeError(value + " is not a function");
      return value;
    }
    function getSpecies(obj) {
      let ctor = obj.constructor;
      if (ctor !== void 0) {
        ctor = ctor[SymbolSpecies];
        if (ctor === null) {
          ctor = void 0;
        }
      }
      return ctor !== void 0 ? ctor : Observable2;
    }
    function isObservable(x) {
      return x instanceof Observable2;
    }
    function hostReportError(e) {
      if (hostReportError.log) {
        hostReportError.log(e);
      } else {
        setTimeout(() => {
          throw e;
        });
      }
    }
    function enqueue(fn) {
      Promise.resolve().then(() => {
        try {
          fn();
        } catch (e) {
          hostReportError(e);
        }
      });
    }
    function cleanupSubscription(subscription) {
      let cleanup = subscription._cleanup;
      if (cleanup === void 0) return;
      subscription._cleanup = void 0;
      if (!cleanup) {
        return;
      }
      try {
        if (typeof cleanup === "function") {
          cleanup();
        } else {
          let unsubscribe = getMethod(cleanup, "unsubscribe");
          if (unsubscribe) {
            unsubscribe.call(cleanup);
          }
        }
      } catch (e) {
        hostReportError(e);
      }
    }
    function closeSubscription(subscription) {
      subscription._observer = void 0;
      subscription._queue = void 0;
      subscription._state = "closed";
    }
    function flushSubscription(subscription) {
      let queue = subscription._queue;
      if (!queue) {
        return;
      }
      subscription._queue = void 0;
      subscription._state = "ready";
      for (let i = 0; i < queue.length; ++i) {
        notifySubscription(subscription, queue[i].type, queue[i].value);
        if (subscription._state === "closed") break;
      }
    }
    function notifySubscription(subscription, type, value) {
      subscription._state = "running";
      let observer = subscription._observer;
      try {
        let m = getMethod(observer, type);
        switch (type) {
          case "next":
            if (m) m.call(observer, value);
            break;
          case "error":
            closeSubscription(subscription);
            if (m) m.call(observer, value);
            else throw value;
            break;
          case "complete":
            closeSubscription(subscription);
            if (m) m.call(observer);
            break;
        }
      } catch (e) {
        hostReportError(e);
      }
      if (subscription._state === "closed") cleanupSubscription(subscription);
      else if (subscription._state === "running") subscription._state = "ready";
    }
    function onNotify(subscription, type, value) {
      if (subscription._state === "closed") return;
      if (subscription._state === "buffering") {
        subscription._queue.push({
          type,
          value
        });
        return;
      }
      if (subscription._state !== "ready") {
        subscription._state = "buffering";
        subscription._queue = [{
          type,
          value
        }];
        enqueue(() => flushSubscription(subscription));
        return;
      }
      notifySubscription(subscription, type, value);
    }
    var Subscription = class {
      constructor(observer, subscriber) {
        this._cleanup = void 0;
        this._observer = observer;
        this._queue = void 0;
        this._state = "initializing";
        let self = this;
        let subscriptionObserver = {
          get closed() {
            return self._state === "closed";
          },
          next(value) {
            onNotify(self, "next", value);
          },
          error(value) {
            onNotify(self, "error", value);
          },
          complete() {
            onNotify(self, "complete");
          }
        };
        try {
          this._cleanup = subscriber.call(void 0, subscriptionObserver);
        } catch (e) {
          subscriptionObserver.error(e);
        }
        if (this._state === "initializing") this._state = "ready";
      }
      get closed() {
        return this._state === "closed";
      }
      unsubscribe() {
        if (this._state !== "closed") {
          closeSubscription(this);
          cleanupSubscription(this);
        }
      }
    };
    var Observable2 = class _Observable {
      constructor(subscriber) {
        if (!(this instanceof _Observable)) throw new TypeError("Observable cannot be called as a function");
        if (typeof subscriber !== "function") throw new TypeError("Observable initializer must be a function");
        this._subscriber = subscriber;
      }
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          observer = {
            next: observer,
            error: arguments[1],
            complete: arguments[2]
          };
        }
        return new Subscription(observer, this._subscriber);
      }
      forEach(fn) {
        return new Promise((resolve, reject) => {
          if (typeof fn !== "function") {
            reject(new TypeError(fn + " is not a function"));
            return;
          }
          function done() {
            subscription.unsubscribe();
            resolve();
          }
          let subscription = this.subscribe({
            next(value) {
              try {
                fn(value, done);
              } catch (e) {
                reject(e);
                subscription.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
        });
      }
      map(fn) {
        if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
        let C = getSpecies(this);
        return new C((observer) => this.subscribe({
          next(value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }
            observer.next(value);
          },
          error(e) {
            observer.error(e);
          },
          complete() {
            observer.complete();
          }
        }));
      }
      filter(fn) {
        if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
        let C = getSpecies(this);
        return new C((observer) => this.subscribe({
          next(value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }
            observer.next(value);
          },
          error(e) {
            observer.error(e);
          },
          complete() {
            observer.complete();
          }
        }));
      }
      reduce(fn) {
        if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
        let C = getSpecies(this);
        let hasSeed = arguments.length > 1;
        let hasValue = false;
        let seed = arguments[1];
        let acc = seed;
        return new C((observer) => this.subscribe({
          next(value) {
            let first = !hasValue;
            hasValue = true;
            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error(e) {
            observer.error(e);
          },
          complete() {
            if (!hasValue && !hasSeed) return observer.error(new TypeError("Cannot reduce an empty sequence"));
            observer.next(acc);
            observer.complete();
          }
        }));
      }
      async all() {
        let values = [];
        await this.forEach((value) => values.push(value));
        return values;
      }
      concat(...sources) {
        let C = getSpecies(this);
        return new C((observer) => {
          let subscription;
          let index = 0;
          function startNext(next) {
            subscription = next.subscribe({
              next(v) {
                observer.next(v);
              },
              error(e) {
                observer.error(e);
              },
              complete() {
                if (index === sources.length) {
                  subscription = void 0;
                  observer.complete();
                } else {
                  startNext(C.from(sources[index++]));
                }
              }
            });
          }
          startNext(this);
          return () => {
            if (subscription) {
              subscription.unsubscribe();
              subscription = void 0;
            }
          };
        });
      }
      flatMap(fn) {
        if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
        let C = getSpecies(this);
        return new C((observer) => {
          let subscriptions = [];
          let outer = this.subscribe({
            next(value) {
              if (fn) {
                try {
                  value = fn(value);
                } catch (e) {
                  return observer.error(e);
                }
              }
              let inner = C.from(value).subscribe({
                next(value2) {
                  observer.next(value2);
                },
                error(e) {
                  observer.error(e);
                },
                complete() {
                  let i = subscriptions.indexOf(inner);
                  if (i >= 0) subscriptions.splice(i, 1);
                  completeIfDone();
                }
              });
              subscriptions.push(inner);
            },
            error(e) {
              observer.error(e);
            },
            complete() {
              completeIfDone();
            }
          });
          function completeIfDone() {
            if (outer.closed && subscriptions.length === 0) observer.complete();
          }
          return () => {
            subscriptions.forEach((s) => s.unsubscribe());
            outer.unsubscribe();
          };
        });
      }
      [SymbolObservable]() {
        return this;
      }
      static from(x) {
        let C = typeof this === "function" ? this : _Observable;
        if (x == null) throw new TypeError(x + " is not an object");
        let method = getMethod(x, SymbolObservable);
        if (method) {
          let observable = method.call(x);
          if (Object(observable) !== observable) throw new TypeError(observable + " is not an object");
          if (isObservable(observable) && observable.constructor === C) return observable;
          return new C((observer) => observable.subscribe(observer));
        }
        if (hasSymbol("iterator")) {
          method = getMethod(x, SymbolIterator);
          if (method) {
            return new C((observer) => {
              enqueue(() => {
                if (observer.closed) return;
                for (let item of method.call(x)) {
                  observer.next(item);
                  if (observer.closed) return;
                }
                observer.complete();
              });
            });
          }
        }
        if (Array.isArray(x)) {
          return new C((observer) => {
            enqueue(() => {
              if (observer.closed) return;
              for (let i = 0; i < x.length; ++i) {
                observer.next(x[i]);
                if (observer.closed) return;
              }
              observer.complete();
            });
          });
        }
        throw new TypeError(x + " is not observable");
      }
      static of(...items) {
        let C = typeof this === "function" ? this : _Observable;
        return new C((observer) => {
          enqueue(() => {
            if (observer.closed) return;
            for (let i = 0; i < items.length; ++i) {
              observer.next(items[i]);
              if (observer.closed) return;
            }
            observer.complete();
          });
        });
      }
      static get [SymbolSpecies]() {
        return this;
      }
    };
    exports.Observable = Observable2;
    Object.defineProperty(Observable2, Symbol("extensions"), {
      value: {
        symbol: SymbolObservable,
        hostReportError
      },
      configurable: true
    });
  }
});

// node_modules/.pnpm/zen-observable@0.9.0/node_modules/zen-observable/index.js
var require_zen_observable2 = __commonJS({
  "node_modules/.pnpm/zen-observable@0.9.0/node_modules/zen-observable/index.js"(exports, module) {
    module.exports = require_Observable().Observable;
  }
});

// node_modules/.pnpm/zen-push@0.3.1/node_modules/zen-push/index.js
var require_zen_push = __commonJS({
  "node_modules/.pnpm/zen-push@0.3.1/node_modules/zen-push/index.js"(exports, module) {
    "use strict";
    var Observable2 = require_zen_observable2();
    function send(p, message, value) {
      if (p._observer) {
        sendMessage(p._observer, message, value);
      } else if (p._observers) {
        var list = [];
        p._observers.forEach(function(to) {
          list.push(to);
        });
        list.forEach(function(to) {
          sendMessage(to, message, value);
        });
      }
    }
    function sendMessage(observer, message, value) {
      if (observer.closed) {
        return;
      }
      switch (message) {
        case "next":
          return observer.next(value);
        case "error":
          return observer.error(value);
        case "complete":
          return observer.complete();
      }
    }
    function hasObserver(p) {
      return p._observer || p._observers && p._observers.size > 0;
    }
    function addObserver(p, observer) {
      if (p._observers) {
        p._observers.add(observer);
      } else if (!p._observer) {
        p._observer = observer;
      } else {
        p._observers = /* @__PURE__ */ new Set();
        p._observers.add(p._observer);
        p._observers.add(observer);
        p._observer = null;
      }
    }
    function deleteObserver(p, observer) {
      if (p._observers) {
        p._observers.delete(observer);
      } else if (p._observer === observer) {
        p._observer = null;
      }
    }
    function notifyStart(p, opts) {
      !hasObserver(p) && opts && opts.start && opts.start();
    }
    function notifyPause(p, opts) {
      !hasObserver(p) && opts && opts.pause && opts.pause();
    }
    var PushStream2 = class {
      constructor(opts) {
        this._observer = null;
        this._observers = null;
        this._observable = new Observable2((observer) => {
          notifyStart(this, opts);
          addObserver(this, observer);
          return () => {
            deleteObserver(this, observer);
            notifyPause(this, opts);
          };
        });
      }
      get observable() {
        return this._observable;
      }
      get observed() {
        return hasObserver(this);
      }
      next(x) {
        send(this, "next", x);
      }
      error(e) {
        send(this, "error", e);
      }
      complete() {
        send(this, "complete");
      }
      static multicast(observable) {
        let stream = new this();
        observable.subscribe(stream);
        return stream.observable;
      }
    };
    module.exports = PushStream2;
  }
});

// node_modules/.pnpm/nostr-tools@2.7.2_typescript@5.6.2/node_modules/nostr-tools/lib/esm/utils.js
var utf8Decoder = new TextDecoder("utf-8");
var utf8Encoder = new TextEncoder();
function insertEventIntoDescendingList(sortedArray, event) {
  const [idx, found] = binarySearch(sortedArray, (b) => {
    if (event.id === b.id)
      return 0;
    if (event.created_at === b.created_at)
      return -1;
    return b.created_at - event.created_at;
  });
  if (!found) {
    sortedArray.splice(idx, 0, event);
  }
  return sortedArray;
}
function binarySearch(arr, compare) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const cmp = compare(arr[mid]);
    if (cmp === 0) {
      return [mid, true];
    }
    if (cmp < 0) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return [start, false];
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/event-store/event-store.js
var import_zen_observable = __toESM(require_zen_observable(), 1);

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/event-store/database.js
var import_zen_push = __toESM(require_zen_push(), 1);

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/logger.js
var import_debug = __toESM(require_browser(), 1);
var logger = (0, import_debug.default)("applesauce");

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/event-store/database.js
var Database = class {
  constructor() {
    __publicField(this, "log", logger.extend("Database"));
    /** Indexes */
    __publicField(this, "kinds", /* @__PURE__ */ new Map());
    __publicField(this, "authors", /* @__PURE__ */ new Map());
    __publicField(this, "tags", new LRU());
    __publicField(this, "created_at", []);
    /** LRU cache of last events touched */
    __publicField(this, "events", new LRU());
    __publicField(this, "insertedSignal", new import_zen_push.default());
    __publicField(this, "updatedSignal", new import_zen_push.default());
    __publicField(this, "deletedSignal", new import_zen_push.default());
    /** A stream of events inserted into the database */
    __publicField(this, "inserted", this.insertedSignal.observable);
    /** A stream of events that have been updated */
    __publicField(this, "updated", this.updatedSignal.observable);
    /** A stream of events removed of the database */
    __publicField(this, "deleted", this.deletedSignal.observable);
    __publicField(this, "claims", /* @__PURE__ */ new WeakMap());
  }
  get size() {
    return this.events.size;
  }
  /** Index helper methods */
  getKindIndex(kind) {
    if (!this.kinds.has(kind))
      this.kinds.set(kind, /* @__PURE__ */ new Set());
    return this.kinds.get(kind);
  }
  getAuthorsIndex(author) {
    if (!this.authors.has(author))
      this.authors.set(author, /* @__PURE__ */ new Set());
    return this.authors.get(author);
  }
  getTagIndex(tagAndValue) {
    if (!this.tags.has(tagAndValue)) {
      const events = /* @__PURE__ */ new Set();
      const ts = Date.now();
      for (const event of this.events.values()) {
        if (getIndexableTags(event).has(tagAndValue)) {
          events.add(event);
        }
      }
      const took = Date.now() - ts;
      if (took > 100)
        this.log(`Built index ${tagAndValue} took ${took}ms`);
      this.tags.set(tagAndValue, events);
    }
    return this.tags.get(tagAndValue);
  }
  /** Moves an event to the top of the LRU cache */
  touch(event) {
    this.events.set(getEventUID(event), event);
  }
  hasEvent(uid) {
    return this.events.get(uid);
  }
  getEvent(uid) {
    return this.events.get(uid);
  }
  /** Checks if the database contains a replaceable event without touching it */
  hasReplaceable(kind, pubkey, d) {
    return this.events.has(getReplaceableUID(kind, pubkey, d));
  }
  /** Gets a replaceable event and touches it */
  getReplaceable(kind, pubkey, d) {
    return this.events.get(getReplaceableUID(kind, pubkey, d));
  }
  /** Inserts an event into the database and notifies all subscriptions */
  addEvent(event) {
    const uid = getEventUID(event);
    const current = this.events.get(uid);
    if (current && event.created_at <= current.created_at)
      return current;
    this.events.set(uid, event);
    this.getKindIndex(event.kind).add(event);
    this.getAuthorsIndex(event.pubkey).add(event);
    for (const tag of getIndexableTags(event)) {
      if (this.tags.has(tag)) {
        this.getTagIndex(tag).add(event);
      }
    }
    insertEventIntoDescendingList(this.created_at, event);
    this.insertedSignal.next(event);
    return event;
  }
  /** Inserts and event into the database and notifies all subscriptions that the event has updated */
  updateEvent(event) {
    const inserted = this.addEvent(event);
    this.updatedSignal.next(inserted);
    return inserted;
  }
  /** Deletes an event from the database and notifies all subscriptions */
  deleteEvent(eventOrUID) {
    let event = typeof eventOrUID === "string" ? this.events.get(eventOrUID) : eventOrUID;
    if (!event)
      throw new Error("Missing event");
    const uid = getEventUID(event);
    if (!this.events.has(uid))
      return false;
    this.getAuthorsIndex(event.pubkey).delete(event);
    this.getKindIndex(event.kind).delete(event);
    for (const tag of getIndexableTags(event)) {
      if (this.tags.has(tag)) {
        this.getTagIndex(tag).delete(event);
      }
    }
    const i = this.created_at.indexOf(event);
    this.created_at.splice(i, 1);
    this.events.delete(uid);
    this.deletedSignal.next(event);
    return true;
  }
  /** Sets the claim on the event and touches it */
  claimEvent(event, claim) {
    if (!this.claims.has(event)) {
      this.claims.set(event, claim);
    }
    this.touch(event);
  }
  /** Checks if an event is claimed by anything */
  isClaimed(event) {
    return this.claims.has(event);
  }
  /** Removes a claim from an event */
  removeClaim(event, claim) {
    const current = this.claims.get(event);
    if (current === claim)
      this.claims.delete(event);
  }
  /** Removes all claims on an event */
  clearClaim(event) {
    this.claims.delete(event);
  }
  *iterateAuthors(authors) {
    for (const author of authors) {
      const events = this.authors.get(author);
      if (events) {
        for (const event of events)
          yield event;
      }
    }
  }
  *iterateTag(tag, values) {
    for (const value of values) {
      const events = this.getTagIndex(tag + ":" + value);
      if (events) {
        for (const event of events)
          yield event;
      }
    }
  }
  *iterateKinds(kinds) {
    for (const kind of kinds) {
      const events = this.kinds.get(kind);
      if (events) {
        for (const event of events)
          yield event;
      }
    }
  }
  *iterateTime(since, until) {
    let untilIndex = 0;
    let sinceIndex = this.created_at.length - 1;
    let start = until ? binarySearch(this.created_at, (mid) => {
      if (mid.created_at === until)
        return -1;
      return mid.created_at - until;
    }) : void 0;
    if (start && start[1])
      untilIndex = start[0];
    const end = since ? binarySearch(this.created_at, (mid) => {
      if (mid.created_at === since)
        return 1;
      return since - mid.created_at;
    }) : void 0;
    if (end && end[1])
      sinceIndex = end[0];
    const events = /* @__PURE__ */ new Set();
    for (let i = untilIndex; i <= sinceIndex; i++) {
      events.add(this.created_at[i]);
    }
    return events;
  }
  *iterateIds(ids) {
    for (const id of ids) {
      if (this.events.has(id))
        yield this.events.get(id);
    }
  }
  /** Returns all events that match the filter */
  getEventsForFilter(filter) {
    if (filter.search)
      return /* @__PURE__ */ new Set();
    let first = true;
    let events = /* @__PURE__ */ new Set();
    const and = (iterable) => {
      const set = iterable instanceof Set ? iterable : new Set(iterable);
      if (first) {
        events = set;
        first = false;
      } else {
        for (const event of events) {
          if (!set.has(event))
            events.delete(event);
        }
      }
      return events;
    };
    if (filter.ids)
      and(this.iterateIds(filter.ids));
    let time = null;
    if (filter.since !== void 0) {
      time = Array.from(this.iterateTime(filter.since, filter.until));
      and(time);
    }
    for (const t of INDEXABLE_TAGS) {
      const key = `#${t}`;
      const values = filter[key];
      if (values == null ? void 0 : values.length)
        and(this.iterateTag(t, values));
    }
    if (filter.authors)
      and(this.iterateAuthors(filter.authors));
    if (filter.kinds)
      and(this.iterateKinds(filter.kinds));
    if (filter.since === void 0 && filter.until !== void 0) {
      time = Array.from(this.iterateTime(filter.since, filter.until));
      and(time);
    }
    if (filter.limit && time) {
      const limited = /* @__PURE__ */ new Set();
      for (const event of time) {
        if (limited.size >= filter.limit)
          break;
        if (events.has(event))
          limited.add(event);
      }
      return limited;
    }
    return events;
  }
  getForFilters(filters) {
    if (filters.length === 0)
      throw new Error("No Filters");
    let events = /* @__PURE__ */ new Set();
    for (const filter of filters) {
      const filtered = this.getEventsForFilter(filter);
      for (const event of filtered)
        events.add(event);
    }
    return events;
  }
  /** Remove the oldest events that are not claimed */
  prune(limit = 1e3) {
    let removed = 0;
    let cursor = this.events.first;
    while (cursor) {
      const event = cursor.value;
      if (!this.isClaimed(event)) {
        this.deleteEvent(event);
        removed++;
        if (removed >= limit)
          break;
      }
      cursor = cursor.next;
    }
    return removed;
  }
};

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/event-store/event-store.js
var EventStore = class {
  constructor() {
    __publicField(this, "database");
    __publicField(this, "singles", /* @__PURE__ */ new Map());
    __publicField(this, "streams", /* @__PURE__ */ new Map());
    __publicField(this, "timelines", /* @__PURE__ */ new Map());
    this.database = new Database();
  }
  /** Adds an event to the database */
  add(event, fromRelay) {
    const inserted = this.database.addEvent(event);
    if (fromRelay)
      addSeenRelay(inserted, fromRelay);
    return inserted;
  }
  /** Add an event to the store and notifies all subscribes it has updated */
  update(event) {
    return this.database.updateEvent(event);
  }
  getAll(filters) {
    return this.database.getForFilters(filters);
  }
  hasEvent(uid) {
    return this.database.hasEvent(uid);
  }
  getEvent(uid) {
    return this.database.getEvent(uid);
  }
  hasReplaceable(kind, pubkey, d) {
    return this.database.hasReplaceable(kind, pubkey, d);
  }
  getReplaceable(kind, pubkey, d) {
    return this.database.getReplaceable(kind, pubkey, d);
  }
  /** Creates an observable that updates a single event */
  event(uid) {
    return new import_zen_observable.default((observer) => {
      let current = this.database.getEvent(uid);
      if (current) {
        observer.next(current);
        this.database.claimEvent(current, observer);
      }
      const inserted = this.database.inserted.subscribe((event) => {
        if (getEventUID(event) === uid && (!current || event.created_at > current.created_at)) {
          if (current)
            this.database.removeClaim(current, observer);
          current = event;
          observer.next(event);
          this.database.claimEvent(current, observer);
        }
      });
      const updated = this.database.updated.subscribe((event) => {
        if (event === current)
          observer.next(event);
      });
      const deleted = this.database.deleted.subscribe((event) => {
        if (getEventUID(event) === uid && current) {
          this.database.removeClaim(current, observer);
          current = void 0;
          observer.next(void 0);
        }
      });
      this.singles.set(observer, uid);
      return () => {
        inserted.unsubscribe();
        deleted.unsubscribe();
        updated.unsubscribe();
        this.singles.delete(observer);
        if (current)
          this.database.removeClaim(current, observer);
      };
    });
  }
  /** Creates an observable that subscribes to multiple events */
  events(uids) {
    return new import_zen_observable.default((observer) => {
      const events = /* @__PURE__ */ new Map();
      for (const uid of uids) {
        const e = this.getEvent(uid);
        if (e) {
          events.set(uid, e);
          this.database.claimEvent(e, observer);
        }
      }
      observer.next(events);
      const inserted = this.database.inserted.subscribe((event) => {
        const uid = getEventUID(event);
        if (uids.includes(uid)) {
          const current = events.get(uid);
          if (!current || event.created_at > current.created_at) {
            if (current)
              this.database.removeClaim(current, observer);
            events.set(uid, event);
            observer.next(events);
            this.database.claimEvent(event, observer);
          }
        }
      });
      const updated = this.database.updated.subscribe((event) => {
        const uid = getEventUID(event);
        if (uids.includes(uid))
          observer.next(events);
      });
      const deleted = this.database.deleted.subscribe((event) => {
        const uid = getEventUID(event);
        if (uids.includes(uid)) {
          const current = events.get(uid);
          if (current) {
            this.database.removeClaim(current, observer);
            events.delete(uid);
            observer.next(events);
          }
        }
      });
      return () => {
        inserted.unsubscribe();
        deleted.unsubscribe();
        updated.unsubscribe();
        for (const [_uid, event] of events) {
          this.database.removeClaim(event, observer);
        }
      };
    });
  }
  /** Creates an observable that updates a single replaceable event */
  replaceable(kind, pubkey, d) {
    return this.event(getReplaceableUID(kind, pubkey, d));
  }
  /** Creates an observable that streams all events that match the filter */
  stream(filters) {
    return new import_zen_observable.default((observer) => {
      let claimed = /* @__PURE__ */ new Set();
      let events = this.database.getForFilters(filters);
      for (const event of events) {
        observer.next(event);
        this.database.claimEvent(event, observer);
        claimed.add(event);
      }
      const sub = this.database.inserted.subscribe((event) => {
        if (matchFilters(filters, event)) {
          observer.next(event);
          this.database.claimEvent(event, observer);
          claimed.add(event);
        }
      });
      this.streams.set(observer, filters);
      return () => {
        sub.unsubscribe();
        this.streams.delete(observer);
        for (const event of claimed)
          this.database.removeClaim(event, observer);
        claimed.clear();
      };
    });
  }
  /** Creates an observable that updates with an array of sorted events */
  timeline(filters) {
    return new import_zen_observable.default((observer) => {
      const seen = /* @__PURE__ */ new Map();
      const timeline = [];
      const events = this.database.getForFilters(filters);
      for (const event of events) {
        insertEventIntoDescendingList(timeline, event);
        this.database.claimEvent(event, observer);
        seen.set(getEventUID(event), event);
      }
      observer.next([...timeline]);
      const inserted = this.database.inserted.subscribe((event) => {
        if (matchFilters(filters, event)) {
          const uid = getEventUID(event);
          let current = seen.get(uid);
          if (current) {
            if (event.created_at > current.created_at) {
              timeline.splice(timeline.indexOf(current), 1, event);
              observer.next([...timeline]);
              seen.set(uid, event);
              this.database.removeClaim(current, observer);
              this.database.claimEvent(event, observer);
            }
          } else {
            insertEventIntoDescendingList(timeline, event);
            observer.next([...timeline]);
            this.database.claimEvent(event, observer);
            seen.set(getEventUID(event), event);
          }
        }
      });
      const updated = this.database.updated.subscribe((event) => {
        if (seen.has(getEventUID(event))) {
          observer.next([...timeline]);
        }
      });
      const deleted = this.database.deleted.subscribe((event) => {
        const uid = getEventUID(event);
        let current = seen.get(uid);
        if (current) {
          timeline.splice(timeline.indexOf(current), 1);
          observer.next([...timeline]);
          seen.delete(uid);
          this.database.removeClaim(current, observer);
        }
      });
      this.timelines.set(observer, filters);
      return () => {
        this.timelines.delete(observer);
        inserted.unsubscribe();
        deleted.unsubscribe();
        updated.unsubscribe();
        for (const [_, event] of seen) {
          this.database.removeClaim(event, observer);
        }
        seen.clear();
      };
    });
  }
};

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/query-store/index.js
var QueryStore = class {
  constructor(store) {
    __publicField(this, "store");
    __publicField(this, "queries", new LRU());
    this.store = store;
  }
  /** Creates a cached query */
  runQuery(queryConstructor) {
    return (...args) => {
      const query = queryConstructor(...args);
      const key = `${queryConstructor.name}|${query.key}`;
      if (!this.queries.has(key)) {
        const observable = stateful(query.run(this.store, this));
        this.queries.set(key, observable);
        return observable;
      }
      return this.queries.get(key);
    };
  }
  /** Returns a single event */
  event(id) {
    return this.runQuery(SingleEventQuery)(id);
  }
  /** Returns a single event */
  events(ids) {
    return this.runQuery(MultipleEventsQuery)(ids);
  }
  /** Returns the latest version of a replaceable event */
  replaceable(kind, pubkey, d) {
    return this.runQuery(ReplaceableQuery)(kind, pubkey, d);
  }
  /** Returns a directory of events by their UID */
  replaceableSet(pointers) {
    return this.runQuery(ReplaceableSetQuery)(pointers);
  }
  /** Returns an array of events that match the filter */
  timeline(filters) {
    return this.runQuery(TimelineQuery)(filters);
  }
  /** Returns the parsed profile (0) for a pubkey */
  profile(pubkey) {
    return this.runQuery(ProfileQuery)(pubkey);
  }
  /** Returns all reactions for an event (supports replaceable events) */
  reactions(event) {
    return this.runQuery(ReactionsQuery)(event);
  }
  /** Returns the parsed relay list (10002) for the pubkey */
  mailboxes(pubkey) {
    return this.runQuery(MailboxesQuery)(pubkey);
  }
  thread(root) {
    return this.runQuery(ThreadQuery)(root);
  }
};
__publicField(QueryStore, "Queries", queries_exports);
export {
  Database,
  EventStore,
  helpers_exports as Helpers,
  queries_exports as Queries,
  QueryStore
};
//# sourceMappingURL=applesauce-core.js.map
