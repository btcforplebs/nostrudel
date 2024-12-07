import {
  EventIndexableTagsSymbol,
  EventUIDSymbol,
  MailboxesInboxesSymbol,
  MailboxesOutboxesSymbol,
  Nip10ThreadRefsSymbol,
  ProfileContentSymbol,
  SeenRelaysSymbol,
  addSeenRelay,
  encodeDecodeResult,
  getATagFromAddressPointer,
  getAddressPointerFromTag,
  getCoordinateFromAddressPointer,
  getETagFromEventPointer,
  getEventPointerFromTag,
  getEventUID,
  getInboxes,
  getIndexableTags,
  getNip10References,
  getOutboxes,
  getPointerFromTag,
  getProfileContent,
  getProfilePointerFromTag,
  getPubkeyFromDecodeResult,
  getReplaceableUID,
  getSeenRelays,
  getTagValue,
  interpretThreadTags,
  isAddressPointer,
  isEventPointer,
  isReplaceable,
  parseCoordinate,
  safeRelayUrl,
  safeRelayUrls,
  validateRelayURL
} from "./chunk-P6DIHSVM.js";
import {
  getEmojiTag,
  getHashtagTag,
  isHex,
  isHexKey,
  stripInvisibleChar
} from "./chunk-CTT4SYZK.js";
import {
  AUDIO_EXT,
  IMAGE_EXT,
  STREAM_EXT,
  VIDEO_EXT,
  convertToUrl,
  getURLFilename,
  isAudioURL,
  isImageURL,
  isStreamURL,
  isVideoURL,
  isVisualMediaURL
} from "./chunk-3HQGVAVI.js";
import {
  __export,
  __publicField
} from "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/index.js
var helpers_exports = {};
__export(helpers_exports, {
  AUDIO_EXT: () => AUDIO_EXT,
  EventIndexableTagsSymbol: () => EventIndexableTagsSymbol,
  EventUIDSymbol: () => EventUIDSymbol,
  IMAGE_EXT: () => IMAGE_EXT,
  LRU: () => LRU,
  MailboxesInboxesSymbol: () => MailboxesInboxesSymbol,
  MailboxesOutboxesSymbol: () => MailboxesOutboxesSymbol,
  Nip10ThreadRefsSymbol: () => Nip10ThreadRefsSymbol,
  ProfileContentSymbol: () => ProfileContentSymbol,
  STREAM_EXT: () => STREAM_EXT,
  SeenRelaysSymbol: () => SeenRelaysSymbol,
  VIDEO_EXT: () => VIDEO_EXT,
  addSeenRelay: () => addSeenRelay,
  convertToUrl: () => convertToUrl,
  encodeDecodeResult: () => encodeDecodeResult,
  getATagFromAddressPointer: () => getATagFromAddressPointer,
  getAddressPointerFromTag: () => getAddressPointerFromTag,
  getCoordinateFromAddressPointer: () => getCoordinateFromAddressPointer,
  getETagFromEventPointer: () => getETagFromEventPointer,
  getEmojiTag: () => getEmojiTag,
  getEventPointerFromTag: () => getEventPointerFromTag,
  getEventUID: () => getEventUID,
  getHashtagTag: () => getHashtagTag,
  getInboxes: () => getInboxes,
  getIndexableTags: () => getIndexableTags,
  getNip10References: () => getNip10References,
  getOutboxes: () => getOutboxes,
  getPointerFromTag: () => getPointerFromTag,
  getProfileContent: () => getProfileContent,
  getProfilePointerFromTag: () => getProfilePointerFromTag,
  getPubkeyFromDecodeResult: () => getPubkeyFromDecodeResult,
  getReplaceableUID: () => getReplaceableUID,
  getSeenRelays: () => getSeenRelays,
  getTagValue: () => getTagValue,
  getURLFilename: () => getURLFilename,
  interpretThreadTags: () => interpretThreadTags,
  isATag: () => isATag,
  isAddressPointer: () => isAddressPointer,
  isAudioURL: () => isAudioURL,
  isDTag: () => isDTag,
  isETag: () => isETag,
  isEventPointer: () => isEventPointer,
  isHex: () => isHex,
  isHexKey: () => isHexKey,
  isImageURL: () => isImageURL,
  isPTag: () => isPTag,
  isRTag: () => isRTag,
  isReplaceable: () => isReplaceable,
  isStreamURL: () => isStreamURL,
  isTTag: () => isTTag,
  isVideoURL: () => isVideoURL,
  isVisualMediaURL: () => isVisualMediaURL,
  matchFilter: () => matchFilter,
  matchFilters: () => matchFilters,
  parseCoordinate: () => parseCoordinate,
  safeRelayUrl: () => safeRelayUrl,
  safeRelayUrls: () => safeRelayUrls,
  stripInvisibleChar: () => stripInvisibleChar,
  unixNow: () => unixNow,
  validateRelayURL: () => validateRelayURL
});

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/filter.js
function matchFilter(filter, event) {
  if (filter.ids && filter.ids.indexOf(event.id) === -1) {
    return false;
  }
  if (filter.kinds && filter.kinds.indexOf(event.kind) === -1) {
    return false;
  }
  if (filter.authors && filter.authors.indexOf(event.pubkey) === -1) {
    return false;
  }
  for (let f in filter) {
    if (f[0] === "#") {
      let tagName = f.slice(1);
      let values = filter[`#${tagName}`];
      if (values) {
        const tags = getIndexableTags(event);
        if (values.some((v) => !tags.has(tagName + ":" + v)))
          return false;
      }
    }
  }
  if (filter.since && event.created_at < filter.since)
    return false;
  if (filter.until && event.created_at > filter.until)
    return false;
  return true;
}
function matchFilters(filters, event) {
  for (let i = 0; i < filters.length; i++) {
    if (matchFilter(filters[i], event)) {
      return true;
    }
  }
  return false;
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/time.js
function unixNow() {
  return Math.round(Date.now() / 1e3);
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/tags.js
function isETag(tag) {
  return tag[0] === "e" && tag[1] !== void 0;
}
function isPTag(tag) {
  return tag[0] === "p" && tag[1] !== void 0;
}
function isRTag(tag) {
  return tag[0] === "r" && tag[1] !== void 0;
}
function isDTag(tag) {
  return tag[0] === "d" && tag[1] !== void 0;
}
function isATag(tag) {
  return tag[0] === "a" && tag[1] !== void 0;
}
function isTTag(tag) {
  return tag[0] === "a" && tag[1] !== void 0;
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/lru.js
var LRU = class {
  constructor(max = 0, ttl = 0, resetTtl = false) {
    __publicField(this, "first", null);
    __publicField(this, "items", /* @__PURE__ */ Object.create(null));
    __publicField(this, "last", null);
    __publicField(this, "max");
    __publicField(this, "resetTtl");
    __publicField(this, "size");
    __publicField(this, "ttl");
    this.first = null;
    this.items = /* @__PURE__ */ Object.create(null);
    this.last = null;
    this.max = max;
    this.resetTtl = resetTtl;
    this.size = 0;
    this.ttl = ttl;
  }
  clear() {
    this.first = null;
    this.items = /* @__PURE__ */ Object.create(null);
    this.last = null;
    this.size = 0;
    return this;
  }
  delete(key) {
    if (this.has(key)) {
      const item = this.items[key];
      delete this.items[key];
      this.size--;
      if (item.prev !== null) {
        item.prev.next = item.next;
      }
      if (item.next !== null) {
        item.next.prev = item.prev;
      }
      if (this.first === item) {
        this.first = item.next;
      }
      if (this.last === item) {
        this.last = item.prev;
      }
    }
    return this;
  }
  entries(keys = this.keys()) {
    return keys.map((key) => [key, this.get(key)]);
  }
  evict(bypass = false) {
    if (bypass || this.size > 0) {
      const item = this.first;
      delete this.items[item.key];
      if (--this.size === 0) {
        this.first = null;
        this.last = null;
      } else {
        this.first = item.next;
        this.first.prev = null;
      }
    }
    return this;
  }
  expiresAt(key) {
    let result;
    if (this.has(key)) {
      result = this.items[key].expiry;
    }
    return result;
  }
  get(key) {
    let result;
    if (this.has(key)) {
      const item = this.items[key];
      if (this.ttl > 0 && item.expiry <= Date.now()) {
        this.delete(key);
      } else {
        result = item.value;
        this.set(key, result, true);
      }
    }
    return result;
  }
  has(key) {
    return key in this.items;
  }
  keys() {
    const result = [];
    let x = this.first;
    while (x !== null) {
      result.push(x.key);
      x = x.next;
    }
    return result;
  }
  set(key, value, bypass = false, resetTtl = this.resetTtl) {
    let item;
    if (bypass || this.has(key)) {
      item = this.items[key];
      item.value = value;
      if (bypass === false && resetTtl) {
        item.expiry = this.ttl > 0 ? Date.now() + this.ttl : this.ttl;
      }
      if (this.last !== item) {
        const last = this.last, next = item.next, prev = item.prev;
        if (this.first === item) {
          this.first = item.next;
        }
        item.next = null;
        item.prev = this.last;
        last.next = item;
        if (prev !== null) {
          prev.next = next;
        }
        if (next !== null) {
          next.prev = prev;
        }
      }
    } else {
      if (this.max > 0 && this.size === this.max) {
        this.evict(true);
      }
      item = this.items[key] = {
        expiry: this.ttl > 0 ? Date.now() + this.ttl : this.ttl,
        key,
        prev: this.last,
        next: null,
        value
      };
      if (++this.size === 1) {
        this.first = item;
      } else {
        this.last.next = item;
      }
    }
    this.last = item;
    return this;
  }
  values(keys = this.keys()) {
    return keys.map((key) => this.get(key));
  }
};

export {
  LRU,
  matchFilter,
  matchFilters,
  unixNow,
  isETag,
  isPTag,
  isRTag,
  isDTag,
  isATag,
  isTTag,
  helpers_exports
};
//# sourceMappingURL=chunk-524T4WEN.js.map
