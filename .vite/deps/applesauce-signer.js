import {
  decrypt,
  encrypt
} from "./chunk-2M4YANUA.js";
import "./chunk-524T4WEN.js";
import {
  getPubkeyFromDecodeResult
} from "./chunk-P6DIHSVM.js";
import {
  isHex,
  isHexKey
} from "./chunk-CTT4SYZK.js";
import "./chunk-3HQGVAVI.js";
import "./chunk-MG7C4QW5.js";
import {
  require_browser
} from "./chunk-5ZNSVYRN.js";
import {
  base64
} from "./chunk-ZX3YKJE4.js";
import {
  finalizeEvent,
  generateSecretKey,
  getEventHash,
  getPublicKey,
  nip04_exports,
  nip19_exports,
  nip44_exports,
  verifyEvent
} from "./chunk-EMHHNKI2.js";
import "./chunk-PH3RM4HY.js";
import "./chunk-3QMXQ46N.js";
import "./chunk-43SEAG5C.js";
import "./chunk-UT7ZQG2B.js";
import "./chunk-WVX5ONCR.js";
import {
  hexToBytes,
  randomBytes
} from "./chunk-NT4MMMKW.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// browser-external:crypto
var require_crypto = __commonJS({
  "browser-external:crypto"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/promise/deferred.js
function createDefer() {
  let _resolve;
  let _reject;
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
  promise.resolve = _resolve;
  promise.reject = _reject;
  return promise;
}

// node_modules/.pnpm/applesauce-signer@0.7.0_typescript@5.6.2/node_modules/applesauce-signer/dist/signers/amber-clipboard-signer.js
var _AmberClipboardSigner = class _AmberClipboardSigner {
  constructor() {
    __publicField(this, "pendingRequest", null);
    __publicField(this, "pubkey");
    __publicField(this, "verifyEvent", verifyEvent);
    __publicField(this, "nip04");
    __publicField(this, "nip44");
    __publicField(this, "onVisibilityChange", () => {
      if (document.visibilityState === "visible") {
        if (!this.pendingRequest || !navigator.clipboard)
          return;
        setTimeout(() => {
          navigator.clipboard.readText().then((result) => {
            var _a;
            return (_a = this.pendingRequest) == null ? void 0 : _a.resolve(result);
          }).catch((e) => {
            var _a;
            return (_a = this.pendingRequest) == null ? void 0 : _a.reject(e);
          });
        }, 200);
      }
    });
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.nip04 = {
      encrypt: this.nip04Encrypt.bind(this),
      decrypt: this.nip04Decrypt.bind(this)
    };
    this.nip44 = {
      encrypt: this.nip44Encrypt.bind(this),
      decrypt: this.nip44Decrypt.bind(this)
    };
  }
  async intentRequest(intent) {
    this.rejectPending();
    const request = createDefer();
    window.open(intent, "_blank");
    setTimeout(() => {
      this.pendingRequest = request;
    }, 500);
    const result = await request;
    if (result.length === 0)
      throw new Error("Empty clipboard");
    return result;
  }
  /** Reject the currently pending request */
  rejectPending() {
    if (this.pendingRequest) {
      this.pendingRequest.reject("Canceled");
      this.pendingRequest = null;
    }
  }
  /** Removes any event listeners created */
  destroy() {
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
  }
  checkSupport() {
    if (!_AmberClipboardSigner.SUPPORTED)
      throw new Error("Cant use Amber on non-Android device");
  }
  async getPublicKey() {
    this.checkSupport();
    if (this.pubkey)
      return this.pubkey;
    const result = await this.intentRequest(_AmberClipboardSigner.createGetPublicKeyIntent());
    if (isHexKey(result)) {
      this.pubkey = result;
      return result;
    } else if (result.startsWith("npub") || result.startsWith("nprofile")) {
      const decode = nip19_exports.decode(result);
      const pubkey = getPubkeyFromDecodeResult(decode);
      if (!pubkey)
        throw new Error("Expected npub from clipboard");
      this.pubkey = pubkey;
      return pubkey;
    }
    throw new Error("Expected clipboard to have pubkey");
  }
  async signEvent(draft) {
    this.checkSupport();
    const pubkey = draft.pubkey || this.pubkey;
    if (!pubkey)
      throw new Error("Unknown signer pubkey");
    const draftWithId = { ...draft, id: getEventHash({ ...draft, pubkey }) };
    const sig = await this.intentRequest(_AmberClipboardSigner.createSignEventIntent(draftWithId));
    if (!isHex(sig))
      throw new Error("Expected hex signature");
    const event = { ...draftWithId, sig, pubkey };
    if (!this.verifyEvent(event))
      throw new Error("Invalid signature");
    return event;
  }
  // NIP-04
  async nip04Encrypt(pubkey, plaintext) {
    this.checkSupport();
    const data = await this.intentRequest(_AmberClipboardSigner.createNip04EncryptIntent(pubkey, plaintext));
    return data;
  }
  async nip04Decrypt(pubkey, data) {
    this.checkSupport();
    const plaintext = await this.intentRequest(_AmberClipboardSigner.createNip04DecryptIntent(pubkey, data));
    return plaintext;
  }
  // NIP-44
  async nip44Encrypt(pubkey, plaintext) {
    this.checkSupport();
    const data = await this.intentRequest(_AmberClipboardSigner.createNip44EncryptIntent(pubkey, plaintext));
    return data;
  }
  async nip44Decrypt(pubkey, data) {
    this.checkSupport();
    const plaintext = await this.intentRequest(_AmberClipboardSigner.createNip44DecryptIntent(pubkey, data));
    return plaintext;
  }
  // static methods
  static createGetPublicKeyIntent() {
    return `intent:#Intent;scheme=nostrsigner;S.compressionType=none;S.returnType=signature;S.type=get_public_key;end`;
  }
  static createSignEventIntent(draft) {
    return `intent:${encodeURIComponent(JSON.stringify(draft))}#Intent;scheme=nostrsigner;S.compressionType=none;S.returnType=signature;S.type=sign_event;end`;
  }
  static createNip04EncryptIntent(pubkey, plainText) {
    return `intent:${encodeURIComponent(plainText)}#Intent;scheme=nostrsigner;S.pubKey=${pubkey};S.compressionType=none;S.returnType=signature;S.type=nip04_encrypt;end`;
  }
  static createNip04DecryptIntent(pubkey, ciphertext) {
    return `intent:${encodeURIComponent(ciphertext)}#Intent;scheme=nostrsigner;S.pubKey=${pubkey};S.compressionType=none;S.returnType=signature;S.type=nip04_decrypt;end`;
  }
  static createNip44EncryptIntent(pubkey, plainText) {
    return `intent:${encodeURIComponent(plainText)}#Intent;scheme=nostrsigner;S.pubKey=${pubkey};S.compressionType=none;S.returnType=signature;S.type=nip44_encrypt;end`;
  }
  static createNip44DecryptIntent(pubkey, ciphertext) {
    return `intent:${encodeURIComponent(ciphertext)}#Intent;scheme=nostrsigner;S.pubKey=${pubkey};S.compressionType=none;S.returnType=signature;S.type=nip44_decrypt;end`;
  }
};
/** If the signer is supported on this platform */
__publicField(_AmberClipboardSigner, "SUPPORTED", navigator.userAgent.includes("Android") && navigator.clipboard && navigator.clipboard.readText);
var AmberClipboardSigner = _AmberClipboardSigner;

// node_modules/.pnpm/applesauce-signer@0.7.0_typescript@5.6.2/node_modules/applesauce-signer/dist/signers/password-signer.js
var PasswordSigner = class {
  constructor() {
    __publicField(this, "key", null);
    __publicField(this, "ncryptsec");
    __publicField(this, "nip04");
    __publicField(this, "nip44");
    __publicField(this, "unlockPromise");
    this.nip04 = {
      encrypt: this.nip04Encrypt.bind(this),
      decrypt: this.nip04Decrypt.bind(this)
    };
    this.nip44 = {
      encrypt: this.nip44Encrypt.bind(this),
      decrypt: this.nip44Decrypt.bind(this)
    };
  }
  get unlocked() {
    return !!this.key;
  }
  requestUnlock() {
    if (this.key)
      return;
    if (this.unlockPromise)
      return this.unlockPromise;
    const p = createDefer();
    this.unlockPromise = p;
    return p;
  }
  async setPassword(password) {
    if (!this.key)
      throw new Error("Cant set password until unlocked");
    this.ncryptsec = encrypt(this.key, password);
  }
  async testPassword(password) {
    if (this.ncryptsec) {
      const key = decrypt(this.ncryptsec, password);
      if (!key)
        throw new Error("Failed to decrypt key");
    } else
      throw new Error("Missing ncryptsec");
  }
  async unlock(password) {
    if (this.key)
      return;
    if (this.ncryptsec) {
      this.key = decrypt(this.ncryptsec, password);
      if (!this.key)
        throw new Error("Failed to decrypt key");
    } else
      throw new Error("Missing ncryptsec");
  }
  // public methods
  async getPublicKey() {
    await this.requestUnlock();
    return getPublicKey(this.key);
  }
  async signEvent(event) {
    await this.requestUnlock();
    return finalizeEvent(event, this.key);
  }
  // NIP-04
  async nip04Encrypt(pubkey, plaintext) {
    await this.requestUnlock();
    return nip04_exports.encrypt(this.key, pubkey, plaintext);
  }
  async nip04Decrypt(pubkey, ciphertext) {
    await this.requestUnlock();
    return nip04_exports.decrypt(this.key, pubkey, ciphertext);
  }
  // NIP-44
  async nip44Encrypt(pubkey, plaintext) {
    await this.requestUnlock();
    return nip44_exports.v2.encrypt(plaintext, nip44_exports.v2.utils.getConversationKey(this.key, pubkey));
  }
  async nip44Decrypt(pubkey, ciphertext) {
    await this.requestUnlock();
    return nip44_exports.v2.decrypt(ciphertext, nip44_exports.v2.utils.getConversationKey(this.key, pubkey));
  }
};

// node_modules/.pnpm/applesauce-signer@0.7.0_typescript@5.6.2/node_modules/applesauce-signer/dist/signers/simple-signer.js
var SimpleSigner = class {
  constructor(key) {
    __publicField(this, "key");
    __publicField(this, "nip04", {
      encrypt: async (pubkey, plaintext) => nip04_exports.encrypt(this.key, pubkey, plaintext),
      decrypt: async (pubkey, ciphertext) => nip04_exports.decrypt(this.key, pubkey, ciphertext)
    });
    __publicField(this, "nip44", {
      encrypt: async (pubkey, plaintext) => nip44_exports.v2.encrypt(plaintext, nip44_exports.v2.utils.getConversationKey(this.key, pubkey)),
      decrypt: async (pubkey, ciphertext) => nip44_exports.v2.decrypt(ciphertext, nip44_exports.v2.utils.getConversationKey(this.key, pubkey))
    });
    this.key = key || generateSecretKey();
  }
  async getPublicKey() {
    return getPublicKey(this.key);
  }
  async signEvent(event) {
    return finalizeEvent(event, this.key);
  }
};

// node_modules/.pnpm/@noble+secp256k1@1.7.1/node_modules/@noble/secp256k1/lib/esm/index.js
var nodeCrypto = __toESM(require_crypto());
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _3n = BigInt(3);
var _8n = BigInt(8);
var CURVE = Object.freeze({
  a: _0n,
  b: BigInt(7),
  P: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
  n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
  h: _1n,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee")
});
var divNearest = (a, b) => (a + b / _2n) / b;
var endo = {
  beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
  splitScalar(k) {
    const { n } = CURVE;
    const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
    const b1 = -_1n * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
    const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
    const b2 = a1;
    const POW_2_128 = BigInt("0x100000000000000000000000000000000");
    const c1 = divNearest(b2 * k, n);
    const c2 = divNearest(-b1 * k, n);
    let k1 = mod(k - c1 * a1 - c2 * a2, n);
    let k2 = mod(-c1 * b1 - c2 * b2, n);
    const k1neg = k1 > POW_2_128;
    const k2neg = k2 > POW_2_128;
    if (k1neg)
      k1 = n - k1;
    if (k2neg)
      k2 = n - k2;
    if (k1 > POW_2_128 || k2 > POW_2_128) {
      throw new Error("splitScalarEndo: Endomorphism failed, k=" + k);
    }
    return { k1neg, k1, k2neg, k2 };
  }
};
var fieldLen = 32;
var groupLen = 32;
var compressedLen = fieldLen + 1;
var uncompressedLen = 2 * fieldLen + 1;
function weierstrass(x) {
  const { a, b } = CURVE;
  const x2 = mod(x * x);
  const x3 = mod(x2 * x);
  return mod(x3 + a * x + b);
}
var USE_ENDOMORPHISM = CURVE.a === _0n;
var ShaError = class extends Error {
  constructor(message) {
    super(message);
  }
};
function assertJacPoint(other) {
  if (!(other instanceof JacobianPoint))
    throw new TypeError("JacobianPoint expected");
}
var JacobianPoint = class _JacobianPoint {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static fromAffine(p) {
    if (!(p instanceof Point)) {
      throw new TypeError("JacobianPoint#fromAffine: expected Point");
    }
    if (p.equals(Point.ZERO))
      return _JacobianPoint.ZERO;
    return new _JacobianPoint(p.x, p.y, _1n);
  }
  static toAffineBatch(points) {
    const toInv = invertBatch(points.map((p) => p.z));
    return points.map((p, i) => p.toAffine(toInv[i]));
  }
  static normalizeZ(points) {
    return _JacobianPoint.toAffineBatch(points).map(_JacobianPoint.fromAffine);
  }
  equals(other) {
    assertJacPoint(other);
    const { x: X1, y: Y1, z: Z1 } = this;
    const { x: X2, y: Y2, z: Z2 } = other;
    const Z1Z1 = mod(Z1 * Z1);
    const Z2Z2 = mod(Z2 * Z2);
    const U1 = mod(X1 * Z2Z2);
    const U2 = mod(X2 * Z1Z1);
    const S1 = mod(mod(Y1 * Z2) * Z2Z2);
    const S2 = mod(mod(Y2 * Z1) * Z1Z1);
    return U1 === U2 && S1 === S2;
  }
  negate() {
    return new _JacobianPoint(this.x, mod(-this.y), this.z);
  }
  double() {
    const { x: X1, y: Y1, z: Z1 } = this;
    const A = mod(X1 * X1);
    const B = mod(Y1 * Y1);
    const C = mod(B * B);
    const x1b = X1 + B;
    const D = mod(_2n * (mod(x1b * x1b) - A - C));
    const E = mod(_3n * A);
    const F = mod(E * E);
    const X3 = mod(F - _2n * D);
    const Y3 = mod(E * (D - X3) - _8n * C);
    const Z3 = mod(_2n * Y1 * Z1);
    return new _JacobianPoint(X3, Y3, Z3);
  }
  add(other) {
    assertJacPoint(other);
    const { x: X1, y: Y1, z: Z1 } = this;
    const { x: X2, y: Y2, z: Z2 } = other;
    if (X2 === _0n || Y2 === _0n)
      return this;
    if (X1 === _0n || Y1 === _0n)
      return other;
    const Z1Z1 = mod(Z1 * Z1);
    const Z2Z2 = mod(Z2 * Z2);
    const U1 = mod(X1 * Z2Z2);
    const U2 = mod(X2 * Z1Z1);
    const S1 = mod(mod(Y1 * Z2) * Z2Z2);
    const S2 = mod(mod(Y2 * Z1) * Z1Z1);
    const H = mod(U2 - U1);
    const r = mod(S2 - S1);
    if (H === _0n) {
      if (r === _0n) {
        return this.double();
      } else {
        return _JacobianPoint.ZERO;
      }
    }
    const HH = mod(H * H);
    const HHH = mod(H * HH);
    const V = mod(U1 * HH);
    const X3 = mod(r * r - HHH - _2n * V);
    const Y3 = mod(r * (V - X3) - S1 * HHH);
    const Z3 = mod(Z1 * Z2 * H);
    return new _JacobianPoint(X3, Y3, Z3);
  }
  subtract(other) {
    return this.add(other.negate());
  }
  multiplyUnsafe(scalar) {
    const P0 = _JacobianPoint.ZERO;
    if (typeof scalar === "bigint" && scalar === _0n)
      return P0;
    let n = normalizeScalar(scalar);
    if (n === _1n)
      return this;
    if (!USE_ENDOMORPHISM) {
      let p = P0;
      let d2 = this;
      while (n > _0n) {
        if (n & _1n)
          p = p.add(d2);
        d2 = d2.double();
        n >>= _1n;
      }
      return p;
    }
    let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
    let k1p = P0;
    let k2p = P0;
    let d = this;
    while (k1 > _0n || k2 > _0n) {
      if (k1 & _1n)
        k1p = k1p.add(d);
      if (k2 & _1n)
        k2p = k2p.add(d);
      d = d.double();
      k1 >>= _1n;
      k2 >>= _1n;
    }
    if (k1neg)
      k1p = k1p.negate();
    if (k2neg)
      k2p = k2p.negate();
    k2p = new _JacobianPoint(mod(k2p.x * endo.beta), k2p.y, k2p.z);
    return k1p.add(k2p);
  }
  precomputeWindow(W) {
    const windows = USE_ENDOMORPHISM ? 128 / W + 1 : 256 / W + 1;
    const points = [];
    let p = this;
    let base = p;
    for (let window2 = 0; window2 < windows; window2++) {
      base = p;
      points.push(base);
      for (let i = 1; i < 2 ** (W - 1); i++) {
        base = base.add(p);
        points.push(base);
      }
      p = base.double();
    }
    return points;
  }
  wNAF(n, affinePoint) {
    if (!affinePoint && this.equals(_JacobianPoint.BASE))
      affinePoint = Point.BASE;
    const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
    if (256 % W) {
      throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
    }
    let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
    if (!precomputes) {
      precomputes = this.precomputeWindow(W);
      if (affinePoint && W !== 1) {
        precomputes = _JacobianPoint.normalizeZ(precomputes);
        pointPrecomputes.set(affinePoint, precomputes);
      }
    }
    let p = _JacobianPoint.ZERO;
    let f = _JacobianPoint.BASE;
    const windows = 1 + (USE_ENDOMORPHISM ? 128 / W : 256 / W);
    const windowSize = 2 ** (W - 1);
    const mask = BigInt(2 ** W - 1);
    const maxNumber = 2 ** W;
    const shiftBy = BigInt(W);
    for (let window2 = 0; window2 < windows; window2++) {
      const offset = window2 * windowSize;
      let wbits = Number(n & mask);
      n >>= shiftBy;
      if (wbits > windowSize) {
        wbits -= maxNumber;
        n += _1n;
      }
      const offset1 = offset;
      const offset2 = offset + Math.abs(wbits) - 1;
      const cond1 = window2 % 2 !== 0;
      const cond2 = wbits < 0;
      if (wbits === 0) {
        f = f.add(constTimeNegate(cond1, precomputes[offset1]));
      } else {
        p = p.add(constTimeNegate(cond2, precomputes[offset2]));
      }
    }
    return { p, f };
  }
  multiply(scalar, affinePoint) {
    let n = normalizeScalar(scalar);
    let point;
    let fake;
    if (USE_ENDOMORPHISM) {
      const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
      let { p: k1p, f: f1p } = this.wNAF(k1, affinePoint);
      let { p: k2p, f: f2p } = this.wNAF(k2, affinePoint);
      k1p = constTimeNegate(k1neg, k1p);
      k2p = constTimeNegate(k2neg, k2p);
      k2p = new _JacobianPoint(mod(k2p.x * endo.beta), k2p.y, k2p.z);
      point = k1p.add(k2p);
      fake = f1p.add(f2p);
    } else {
      const { p, f } = this.wNAF(n, affinePoint);
      point = p;
      fake = f;
    }
    return _JacobianPoint.normalizeZ([point, fake])[0];
  }
  toAffine(invZ) {
    const { x, y, z } = this;
    const is0 = this.equals(_JacobianPoint.ZERO);
    if (invZ == null)
      invZ = is0 ? _8n : invert(z);
    const iz1 = invZ;
    const iz2 = mod(iz1 * iz1);
    const iz3 = mod(iz2 * iz1);
    const ax = mod(x * iz2);
    const ay = mod(y * iz3);
    const zz = mod(z * iz1);
    if (is0)
      return Point.ZERO;
    if (zz !== _1n)
      throw new Error("invZ was invalid");
    return new Point(ax, ay);
  }
};
JacobianPoint.BASE = new JacobianPoint(CURVE.Gx, CURVE.Gy, _1n);
JacobianPoint.ZERO = new JacobianPoint(_0n, _1n, _0n);
function constTimeNegate(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var Point = class _Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  _setWindowSize(windowSize) {
    this._WINDOW_SIZE = windowSize;
    pointPrecomputes.delete(this);
  }
  hasEvenY() {
    return this.y % _2n === _0n;
  }
  static fromCompressedHex(bytes) {
    const isShort = bytes.length === 32;
    const x = bytesToNumber(isShort ? bytes : bytes.subarray(1));
    if (!isValidFieldElement(x))
      throw new Error("Point is not on curve");
    const y2 = weierstrass(x);
    let y = sqrtMod(y2);
    const isYOdd = (y & _1n) === _1n;
    if (isShort) {
      if (isYOdd)
        y = mod(-y);
    } else {
      const isFirstByteOdd = (bytes[0] & 1) === 1;
      if (isFirstByteOdd !== isYOdd)
        y = mod(-y);
    }
    const point = new _Point(x, y);
    point.assertValidity();
    return point;
  }
  static fromUncompressedHex(bytes) {
    const x = bytesToNumber(bytes.subarray(1, fieldLen + 1));
    const y = bytesToNumber(bytes.subarray(fieldLen + 1, fieldLen * 2 + 1));
    const point = new _Point(x, y);
    point.assertValidity();
    return point;
  }
  static fromHex(hex) {
    const bytes = ensureBytes(hex);
    const len = bytes.length;
    const header = bytes[0];
    if (len === fieldLen)
      return this.fromCompressedHex(bytes);
    if (len === compressedLen && (header === 2 || header === 3)) {
      return this.fromCompressedHex(bytes);
    }
    if (len === uncompressedLen && header === 4)
      return this.fromUncompressedHex(bytes);
    throw new Error(`Point.fromHex: received invalid point. Expected 32-${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes, not ${len}`);
  }
  static fromPrivateKey(privateKey) {
    return _Point.BASE.multiply(normalizePrivateKey(privateKey));
  }
  static fromSignature(msgHash, signature, recovery) {
    const { r, s } = normalizeSignature(signature);
    if (![0, 1, 2, 3].includes(recovery))
      throw new Error("Cannot recover: invalid recovery bit");
    const h = truncateHash(ensureBytes(msgHash));
    const { n } = CURVE;
    const radj = recovery === 2 || recovery === 3 ? r + n : r;
    const rinv = invert(radj, n);
    const u1 = mod(-h * rinv, n);
    const u2 = mod(s * rinv, n);
    const prefix = recovery & 1 ? "03" : "02";
    const R = _Point.fromHex(prefix + numTo32bStr(radj));
    const Q = _Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
    if (!Q)
      throw new Error("Cannot recover signature: point at infinify");
    Q.assertValidity();
    return Q;
  }
  toRawBytes(isCompressed = false) {
    return hexToBytes2(this.toHex(isCompressed));
  }
  toHex(isCompressed = false) {
    const x = numTo32bStr(this.x);
    if (isCompressed) {
      const prefix = this.hasEvenY() ? "02" : "03";
      return `${prefix}${x}`;
    } else {
      return `04${x}${numTo32bStr(this.y)}`;
    }
  }
  toHexX() {
    return this.toHex(true).slice(2);
  }
  toRawX() {
    return this.toRawBytes(true).slice(1);
  }
  assertValidity() {
    const msg = "Point is not on elliptic curve";
    const { x, y } = this;
    if (!isValidFieldElement(x) || !isValidFieldElement(y))
      throw new Error(msg);
    const left = mod(y * y);
    const right = weierstrass(x);
    if (mod(left - right) !== _0n)
      throw new Error(msg);
  }
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  negate() {
    return new _Point(this.x, mod(-this.y));
  }
  double() {
    return JacobianPoint.fromAffine(this).double().toAffine();
  }
  add(other) {
    return JacobianPoint.fromAffine(this).add(JacobianPoint.fromAffine(other)).toAffine();
  }
  subtract(other) {
    return this.add(other.negate());
  }
  multiply(scalar) {
    return JacobianPoint.fromAffine(this).multiply(scalar, this).toAffine();
  }
  multiplyAndAddUnsafe(Q, a, b) {
    const P = JacobianPoint.fromAffine(this);
    const aP = a === _0n || a === _1n || this !== _Point.BASE ? P.multiplyUnsafe(a) : P.multiply(a);
    const bQ = JacobianPoint.fromAffine(Q).multiplyUnsafe(b);
    const sum = aP.add(bQ);
    return sum.equals(JacobianPoint.ZERO) ? void 0 : sum.toAffine();
  }
};
Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
Point.ZERO = new Point(_0n, _0n);
function sliceDER(s) {
  return Number.parseInt(s[0], 16) >= 8 ? "00" + s : s;
}
function parseDERInt(data) {
  if (data.length < 2 || data[0] !== 2) {
    throw new Error(`Invalid signature integer tag: ${bytesToHex(data)}`);
  }
  const len = data[1];
  const res = data.subarray(2, len + 2);
  if (!len || res.length !== len) {
    throw new Error(`Invalid signature integer: wrong length`);
  }
  if (res[0] === 0 && res[1] <= 127) {
    throw new Error("Invalid signature integer: trailing length");
  }
  return { data: bytesToNumber(res), left: data.subarray(len + 2) };
}
function parseDERSignature(data) {
  if (data.length < 2 || data[0] != 48) {
    throw new Error(`Invalid signature tag: ${bytesToHex(data)}`);
  }
  if (data[1] !== data.length - 2) {
    throw new Error("Invalid signature: incorrect length");
  }
  const { data: r, left: sBytes } = parseDERInt(data.subarray(2));
  const { data: s, left: rBytesLeft } = parseDERInt(sBytes);
  if (rBytesLeft.length) {
    throw new Error(`Invalid signature: left bytes after parsing: ${bytesToHex(rBytesLeft)}`);
  }
  return { r, s };
}
var Signature = class _Signature {
  constructor(r, s) {
    this.r = r;
    this.s = s;
    this.assertValidity();
  }
  static fromCompact(hex) {
    const arr = hex instanceof Uint8Array;
    const name = "Signature.fromCompact";
    if (typeof hex !== "string" && !arr)
      throw new TypeError(`${name}: Expected string or Uint8Array`);
    const str = arr ? bytesToHex(hex) : hex;
    if (str.length !== 128)
      throw new Error(`${name}: Expected 64-byte hex`);
    return new _Signature(hexToNumber(str.slice(0, 64)), hexToNumber(str.slice(64, 128)));
  }
  static fromDER(hex) {
    const arr = hex instanceof Uint8Array;
    if (typeof hex !== "string" && !arr)
      throw new TypeError(`Signature.fromDER: Expected string or Uint8Array`);
    const { r, s } = parseDERSignature(arr ? hex : hexToBytes2(hex));
    return new _Signature(r, s);
  }
  static fromHex(hex) {
    return this.fromDER(hex);
  }
  assertValidity() {
    const { r, s } = this;
    if (!isWithinCurveOrder(r))
      throw new Error("Invalid Signature: r must be 0 < r < n");
    if (!isWithinCurveOrder(s))
      throw new Error("Invalid Signature: s must be 0 < s < n");
  }
  hasHighS() {
    const HALF = CURVE.n >> _1n;
    return this.s > HALF;
  }
  normalizeS() {
    return this.hasHighS() ? new _Signature(this.r, mod(-this.s, CURVE.n)) : this;
  }
  toDERRawBytes() {
    return hexToBytes2(this.toDERHex());
  }
  toDERHex() {
    const sHex = sliceDER(numberToHexUnpadded(this.s));
    const rHex = sliceDER(numberToHexUnpadded(this.r));
    const sHexL = sHex.length / 2;
    const rHexL = rHex.length / 2;
    const sLen = numberToHexUnpadded(sHexL);
    const rLen = numberToHexUnpadded(rHexL);
    const length = numberToHexUnpadded(rHexL + sHexL + 4);
    return `30${length}02${rLen}${rHex}02${sLen}${sHex}`;
  }
  toRawBytes() {
    return this.toDERRawBytes();
  }
  toHex() {
    return this.toDERHex();
  }
  toCompactRawBytes() {
    return hexToBytes2(this.toCompactHex());
  }
  toCompactHex() {
    return numTo32bStr(this.r) + numTo32bStr(this.s);
  }
};
function concatBytes(...arrays) {
  if (!arrays.every((b) => b instanceof Uint8Array))
    throw new Error("Uint8Array list expected");
  if (arrays.length === 1)
    return arrays[0];
  const length = arrays.reduce((a, arr) => a + arr.length, 0);
  const result = new Uint8Array(length);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    result.set(arr, pad);
    pad += arr.length;
  }
  return result;
}
var hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(uint8a) {
  if (!(uint8a instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  let hex = "";
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes[uint8a[i]];
  }
  return hex;
}
var POW_2_256 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
function numTo32bStr(num) {
  if (typeof num !== "bigint")
    throw new Error("Expected bigint");
  if (!(_0n <= num && num < POW_2_256))
    throw new Error("Expected number 0 <= n < 2^256");
  return num.toString(16).padStart(64, "0");
}
function numTo32b(num) {
  const b = hexToBytes2(numTo32bStr(num));
  if (b.length !== 32)
    throw new Error("Error: expected 32 bytes");
  return b;
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("hexToNumber: expected string, got " + typeof hex);
  }
  return BigInt(`0x${hex}`);
}
function hexToBytes2(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("hexToBytes: expected string, got " + typeof hex);
  }
  if (hex.length % 2)
    throw new Error("hexToBytes: received invalid unpadded hex" + hex.length);
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}
function bytesToNumber(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function ensureBytes(hex) {
  return hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes2(hex);
}
function normalizeScalar(num) {
  if (typeof num === "number" && Number.isSafeInteger(num) && num > 0)
    return BigInt(num);
  if (typeof num === "bigint" && isWithinCurveOrder(num))
    return num;
  throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n");
}
function mod(a, b = CURVE.P) {
  const result = a % b;
  return result >= _0n ? result : b + result;
}
function pow2(x, power) {
  const { P } = CURVE;
  let res = x;
  while (power-- > _0n) {
    res *= res;
    res %= P;
  }
  return res;
}
function sqrtMod(x) {
  const { P } = CURVE;
  const _6n = BigInt(6);
  const _11n = BigInt(11);
  const _22n = BigInt(22);
  const _23n = BigInt(23);
  const _44n = BigInt(44);
  const _88n = BigInt(88);
  const b2 = x * x * x % P;
  const b3 = b2 * b2 * x % P;
  const b6 = pow2(b3, _3n) * b3 % P;
  const b9 = pow2(b6, _3n) * b3 % P;
  const b11 = pow2(b9, _2n) * b2 % P;
  const b22 = pow2(b11, _11n) * b11 % P;
  const b44 = pow2(b22, _22n) * b22 % P;
  const b88 = pow2(b44, _44n) * b44 % P;
  const b176 = pow2(b88, _88n) * b88 % P;
  const b220 = pow2(b176, _44n) * b44 % P;
  const b223 = pow2(b220, _3n) * b3 % P;
  const t1 = pow2(b223, _23n) * b22 % P;
  const t2 = pow2(t1, _6n) * b2 % P;
  const rt = pow2(t2, _2n);
  const xc = rt * rt % P;
  if (xc !== x)
    throw new Error("Cannot find square root");
  return rt;
}
function invert(number, modulo = CURVE.P) {
  if (number === _0n || modulo <= _0n) {
    throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
  }
  let a = mod(number, modulo);
  let b = modulo;
  let x = _0n, y = _1n, u = _1n, v = _0n;
  while (a !== _0n) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function invertBatch(nums, p = CURVE.P) {
  const scratch = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (num === _0n)
      return acc;
    scratch[i] = acc;
    return mod(acc * num, p);
  }, _1n);
  const inverted = invert(lastMultiplied, p);
  nums.reduceRight((acc, num, i) => {
    if (num === _0n)
      return acc;
    scratch[i] = mod(acc * scratch[i], p);
    return mod(acc * num, p);
  }, inverted);
  return scratch;
}
function bits2int_2(bytes) {
  const delta = bytes.length * 8 - groupLen * 8;
  const num = bytesToNumber(bytes);
  return delta > 0 ? num >> BigInt(delta) : num;
}
function truncateHash(hash, truncateOnly = false) {
  const h = bits2int_2(hash);
  if (truncateOnly)
    return h;
  const { n } = CURVE;
  return h >= n ? h - n : h;
}
var _sha256Sync;
var _hmacSha256Sync;
function isWithinCurveOrder(num) {
  return _0n < num && num < CURVE.n;
}
function isValidFieldElement(num) {
  return _0n < num && num < CURVE.P;
}
function normalizePrivateKey(key) {
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else if (typeof key === "number" && Number.isSafeInteger(key) && key > 0) {
    num = BigInt(key);
  } else if (typeof key === "string") {
    if (key.length !== 2 * groupLen)
      throw new Error("Expected 32 bytes of private key");
    num = hexToNumber(key);
  } else if (key instanceof Uint8Array) {
    if (key.length !== groupLen)
      throw new Error("Expected 32 bytes of private key");
    num = bytesToNumber(key);
  } else {
    throw new TypeError("Expected valid private key");
  }
  if (!isWithinCurveOrder(num))
    throw new Error("Expected private key: 0 < key < n");
  return num;
}
function normalizeSignature(signature) {
  if (signature instanceof Signature) {
    signature.assertValidity();
    return signature;
  }
  try {
    return Signature.fromDER(signature);
  } catch (error) {
    return Signature.fromCompact(signature);
  }
}
Point.BASE._setWindowSize(8);
var crypto2 = {
  node: nodeCrypto,
  web: typeof self === "object" && "crypto" in self ? self.crypto : void 0
};
var TAGGED_HASH_PREFIXES = {};
var utils = {
  bytesToHex,
  hexToBytes: hexToBytes2,
  concatBytes,
  mod,
  invert,
  isValidPrivateKey(privateKey) {
    try {
      normalizePrivateKey(privateKey);
      return true;
    } catch (error) {
      return false;
    }
  },
  _bigintTo32Bytes: numTo32b,
  _normalizePrivateKey: normalizePrivateKey,
  hashToPrivateKey: (hash) => {
    hash = ensureBytes(hash);
    const minLen = groupLen + 8;
    if (hash.length < minLen || hash.length > 1024) {
      throw new Error(`Expected valid bytes of private key as per FIPS 186`);
    }
    const num = mod(bytesToNumber(hash), CURVE.n - _1n) + _1n;
    return numTo32b(num);
  },
  randomBytes: (bytesLength = 32) => {
    if (crypto2.web) {
      return crypto2.web.getRandomValues(new Uint8Array(bytesLength));
    } else if (crypto2.node) {
      const { randomBytes: randomBytes2 } = crypto2.node;
      return Uint8Array.from(randomBytes2(bytesLength));
    } else {
      throw new Error("The environment doesn't have randomBytes function");
    }
  },
  randomPrivateKey: () => utils.hashToPrivateKey(utils.randomBytes(groupLen + 8)),
  precompute(windowSize = 8, point = Point.BASE) {
    const cached = point === Point.BASE ? point : new Point(point.x, point.y);
    cached._setWindowSize(windowSize);
    cached.multiply(_3n);
    return cached;
  },
  sha256: async (...messages) => {
    if (crypto2.web) {
      const buffer = await crypto2.web.subtle.digest("SHA-256", concatBytes(...messages));
      return new Uint8Array(buffer);
    } else if (crypto2.node) {
      const { createHash } = crypto2.node;
      const hash = createHash("sha256");
      messages.forEach((m) => hash.update(m));
      return Uint8Array.from(hash.digest());
    } else {
      throw new Error("The environment doesn't have sha256 function");
    }
  },
  hmacSha256: async (key, ...messages) => {
    if (crypto2.web) {
      const ckey = await crypto2.web.subtle.importKey("raw", key, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
      const message = concatBytes(...messages);
      const buffer = await crypto2.web.subtle.sign("HMAC", ckey, message);
      return new Uint8Array(buffer);
    } else if (crypto2.node) {
      const { createHmac } = crypto2.node;
      const hash = createHmac("sha256", key);
      messages.forEach((m) => hash.update(m));
      return Uint8Array.from(hash.digest());
    } else {
      throw new Error("The environment doesn't have hmac-sha256 function");
    }
  },
  sha256Sync: void 0,
  hmacSha256Sync: void 0,
  taggedHash: async (tag, ...messages) => {
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === void 0) {
      const tagH = await utils.sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
      tagP = concatBytes(tagH, tagH);
      TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return utils.sha256(tagP, ...messages);
  },
  taggedHashSync: (tag, ...messages) => {
    if (typeof _sha256Sync !== "function")
      throw new ShaError("sha256Sync is undefined, you need to set it");
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === void 0) {
      const tagH = _sha256Sync(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
      tagP = concatBytes(tagH, tagH);
      TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return _sha256Sync(tagP, ...messages);
  },
  _JacobianPoint: JacobianPoint
};
Object.defineProperties(utils, {
  sha256Sync: {
    configurable: false,
    get() {
      return _sha256Sync;
    },
    set(val) {
      if (!_sha256Sync)
        _sha256Sync = val;
    }
  },
  hmacSha256Sync: {
    configurable: false,
    get() {
      return _hmacSha256Sync;
    },
    set(val) {
      if (!_hmacSha256Sync)
        _hmacSha256Sync = val;
    }
  }
});

// node_modules/.pnpm/applesauce-signer@0.7.0_typescript@5.6.2/node_modules/applesauce-signer/dist/logger.js
var import_debug = __toESM(require_browser(), 1);
var logger = (0, import_debug.default)("applesauce:signer");

// node_modules/.pnpm/applesauce-signer@0.7.0_typescript@5.6.2/node_modules/applesauce-signer/dist/signers/serial-port-signer.js
var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function xOnlyToXY(p) {
  return Point.fromHex(p).toHex().substring(2);
}
var utf8Decoder = new TextDecoder("utf-8");
var utf8Encoder = new TextEncoder();
var _SerialPortSigner = class _SerialPortSigner {
  constructor() {
    __publicField(this, "log", logger.extend("SerialPortSigner"));
    __publicField(this, "writer", null);
    __publicField(this, "pubkey");
    __publicField(this, "verifyEvent", verifyEvent);
    __publicField(this, "nip04");
    __publicField(this, "lastCommand", null);
    this.nip04 = {
      encrypt: this.nip04Encrypt.bind(this),
      decrypt: this.nip04Decrypt.bind(this)
    };
  }
  get isConnected() {
    return !!this.writer;
  }
  async callMethodOnDevice(method, params, opts = {}) {
    if (!_SerialPortSigner.SUPPORTED)
      throw new Error("Serial devices are not supported");
    if (!this.writer)
      await this.connectToDevice(opts);
    if (this.lastCommand)
      throw new Error("Previous command to device still pending!");
    const command = createDefer();
    this.lastCommand = command;
    this.sendCommand(method, params);
    setTimeout(() => {
      command.reject(new Error("Device timeout"));
      if (this.lastCommand === command)
        this.lastCommand = null;
    }, 6e3);
    return this.lastCommand;
  }
  async connectToDevice({ onConnect, onDisconnect, onError, onDone }) {
    let port = await navigator.serial.requestPort();
    let reader;
    const startSerialPortReading = async () => {
      while (port && port.readable) {
        const textDecoder = new window.TextDecoderStream();
        port.readable.pipeTo(textDecoder.writable);
        reader = textDecoder.readable.getReader();
        const readStringUntil = this.readFromSerialPort(reader);
        try {
          while (true) {
            const { value, done } = await readStringUntil("\n");
            if (value) {
              const { method, data } = this.parseResponse(value);
              if (method === "/ping")
                this.log("Pong");
              if (_SerialPortSigner.PUBLIC_METHODS.indexOf(method) === -1) {
                continue;
              }
              this.log("Received: ", method, data);
              if (this.lastCommand) {
                this.lastCommand.resolve(data);
                this.lastCommand = null;
              }
            }
            if (done) {
              this.lastCommand = null;
              this.writer = null;
              if (onDone)
                onDone();
              return;
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            this.writer = null;
            if (onError)
              onError(error);
            if (this.lastCommand) {
              this.lastCommand.reject(error);
              this.lastCommand = null;
            }
            throw error;
          }
        }
      }
    };
    await port.open({ baudRate: 9600 });
    await sleep(1e3);
    startSerialPortReading();
    const textEncoder = new window.TextEncoderStream();
    textEncoder.readable.pipeTo(port.writable);
    this.writer = textEncoder.writable.getWriter();
    await this.sendCommand(_SerialPortSigner.METHOD_PING);
    await this.sendCommand(_SerialPortSigner.METHOD_PING, [window.location.host]);
    if (onConnect)
      onConnect();
    port.addEventListener("disconnect", () => {
      this.log("Disconnected");
      this.lastCommand = null;
      this.writer = null;
      if (onDisconnect)
        onDisconnect();
    });
  }
  async sendCommand(method, params = []) {
    if (!this.writer)
      return;
    this.log("Send command", method, params);
    const message = [method].concat(params).join(" ");
    await this.writer.write(message + "\n");
  }
  readFromSerialPort(reader) {
    let partialChunk;
    let fulliness = [];
    const readStringUntil = async (separator = "\n") => {
      if (fulliness.length)
        return { value: fulliness.shift().trim(), done: false };
      const chunks = [];
      if (partialChunk) {
        chunks.push(partialChunk);
        partialChunk = void 0;
      }
      while (true) {
        const { value, done } = await reader.read();
        if (value) {
          const values = value.split(separator);
          if (values.length > 1) {
            chunks.push(values.shift());
            partialChunk = values.pop();
            fulliness = values;
            return { value: chunks.join("").trim(), done: false };
          }
          chunks.push(value);
        }
        if (done)
          return { value: chunks.join("").trim(), done: true };
      }
    };
    return readStringUntil;
  }
  parseResponse(value) {
    const method = value.split(" ")[0];
    const data = value.substring(method.length).trim();
    return { method, data };
  }
  // NIP-04
  async nip04Encrypt(pubkey, text) {
    const sharedSecretStr = await this.callMethodOnDevice(_SerialPortSigner.METHOD_SHARED_SECRET, [xOnlyToXY(pubkey)]);
    const sharedSecret = hexToBytes(sharedSecretStr);
    let iv = Uint8Array.from(randomBytes(16));
    let plaintext = utf8Encoder.encode(text);
    let cryptoKey = await crypto.subtle.importKey("raw", sharedSecret, { name: "AES-CBC" }, false, ["encrypt"]);
    let ciphertext = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, cryptoKey, plaintext);
    let ctb64 = base64.encode(new Uint8Array(ciphertext));
    let ivb64 = base64.encode(new Uint8Array(iv.buffer));
    return `${ctb64}?iv=${ivb64}`;
  }
  async nip04Decrypt(pubkey, data) {
    let [ctb64, ivb64] = data.split("?iv=");
    const sharedSecretStr = await this.callMethodOnDevice(_SerialPortSigner.METHOD_SHARED_SECRET, [xOnlyToXY(pubkey)]);
    const sharedSecret = hexToBytes(sharedSecretStr);
    let cryptoKey = await crypto.subtle.importKey("raw", sharedSecret, { name: "AES-CBC" }, false, ["decrypt"]);
    let ciphertext = base64.decode(ctb64);
    let iv = base64.decode(ivb64);
    let plaintext = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, cryptoKey, ciphertext);
    let text = utf8Decoder.decode(plaintext);
    return text;
  }
  async getPublicKey() {
    const pubkey = await this.callMethodOnDevice(_SerialPortSigner.METHOD_PUBLIC_KEY, []);
    this.pubkey = pubkey;
    return pubkey;
  }
  async signEvent(draft) {
    const pubkey = draft.pubkey || this.pubkey;
    if (!pubkey)
      throw new Error("Unknown signer pubkey");
    const draftWithId = { ...draft, id: getEventHash({ ...draft, pubkey }) };
    const sig = await this.callMethodOnDevice(_SerialPortSigner.METHOD_SIGN_MESSAGE, [draftWithId.id]);
    const event = { ...draftWithId, sig, pubkey };
    if (!this.verifyEvent(event))
      throw new Error("Invalid signature");
    return event;
  }
  ping() {
    this.sendCommand(_SerialPortSigner.METHOD_PING, [window.location.host]);
  }
};
// static const
__publicField(_SerialPortSigner, "SUPPORTED", !!navigator.serial);
__publicField(_SerialPortSigner, "METHOD_PING", "/ping");
__publicField(_SerialPortSigner, "METHOD_LOG", "/log");
__publicField(_SerialPortSigner, "METHOD_SIGN_MESSAGE", "/sign-message");
__publicField(_SerialPortSigner, "METHOD_SHARED_SECRET", "/shared-secret");
__publicField(_SerialPortSigner, "METHOD_PUBLIC_KEY", "/public-key");
__publicField(_SerialPortSigner, "PUBLIC_METHODS", [
  _SerialPortSigner.METHOD_PUBLIC_KEY,
  _SerialPortSigner.METHOD_SIGN_MESSAGE,
  _SerialPortSigner.METHOD_SHARED_SECRET
]);
var SerialPortSigner = _SerialPortSigner;
export {
  AmberClipboardSigner,
  PasswordSigner,
  SerialPortSigner,
  SimpleSigner
};
/*! Bundled license information:

@noble/secp256k1/lib/esm/index.js:
  (*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=applesauce-signer.js.map
