import "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/limit.js
var limit_default = (x, low = 0, high = 1) => {
  return min(max(low, x), high);
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/clip_rgb.js
var clip_rgb_default = (rgb2) => {
  rgb2._clipped = false;
  rgb2._unclipped = rgb2.slice(0);
  for (let i = 0; i <= 3; i++) {
    if (i < 3) {
      if (rgb2[i] < 0 || rgb2[i] > 255) rgb2._clipped = true;
      rgb2[i] = limit_default(rgb2[i], 0, 255);
    } else if (i === 3) {
      rgb2[i] = limit_default(rgb2[i], 0, 1);
    }
  }
  return rgb2;
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/type.js
var classToType = {};
for (let name of [
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Undefined",
  "Null"
]) {
  classToType[`[object ${name}]`] = name.toLowerCase();
}
function type_default(obj) {
  return classToType[Object.prototype.toString.call(obj)] || "object";
}

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/unpack.js
var unpack_default = (args, keyOrder = null) => {
  if (args.length >= 3) return Array.prototype.slice.call(args);
  if (type_default(args[0]) == "object" && keyOrder) {
    return keyOrder.split("").filter((k) => args[0][k] !== void 0).map((k) => args[0][k]);
  }
  return args[0];
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/last.js
var last_default = (args) => {
  if (args.length < 2) return null;
  const l = args.length - 1;
  if (type_default(args[l]) == "string") return args[l].toLowerCase();
  return null;
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/index.js
var { PI, min, max } = Math;
var TWOPI = PI * 2;
var PITHIRD = PI / 3;
var DEG2RAD = PI / 180;
var RAD2DEG = 180 / PI;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/input.js
var input_default = {
  format: {},
  autodetect: []
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/Color.js
var Color = class {
  constructor(...args) {
    const me = this;
    if (type_default(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
      return args[0];
    }
    let mode = last_default(args);
    let autodetect = false;
    if (!mode) {
      autodetect = true;
      if (!input_default.sorted) {
        input_default.autodetect = input_default.autodetect.sort((a, b) => b.p - a.p);
        input_default.sorted = true;
      }
      for (let chk of input_default.autodetect) {
        mode = chk.test(...args);
        if (mode) break;
      }
    }
    if (input_default.format[mode]) {
      const rgb2 = input_default.format[mode].apply(
        null,
        autodetect ? args : args.slice(0, -1)
      );
      me._rgb = clip_rgb_default(rgb2);
    } else {
      throw new Error("unknown format: " + args);
    }
    if (me._rgb.length === 3) me._rgb.push(1);
  }
  toString() {
    if (type_default(this.hex) == "function") return this.hex();
    return `[${this._rgb.join(",")}]`;
  }
};
var Color_default = Color;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/version.js
var version = "2.6.0";

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/chroma.js
var chroma = (...args) => {
  return new chroma.Color(...args);
};
chroma.Color = Color_default;
chroma.version = version;
var chroma_default = chroma;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/cmyk/cmyk2rgb.js
var cmyk2rgb = (...args) => {
  args = unpack_default(args, "cmyk");
  const [c, m, y, k] = args;
  const alpha = args.length > 4 ? args[4] : 1;
  if (k === 1) return [0, 0, 0, alpha];
  return [
    c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
    // r
    m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
    // g
    y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
    // b
    alpha
  ];
};
var cmyk2rgb_default = cmyk2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/cmyk/rgb2cmyk.js
var { max: max2 } = Math;
var rgb2cmyk = (...args) => {
  let [r, g, b] = unpack_default(args, "rgb");
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const k = 1 - max2(r, max2(g, b));
  const f = k < 1 ? 1 / (1 - k) : 0;
  const c = (1 - r - k) * f;
  const m = (1 - g - k) * f;
  const y = (1 - b - k) * f;
  return [c, m, y, k];
};
var rgb2cmyk_default = rgb2cmyk;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/cmyk/index.js
Color_default.prototype.cmyk = function() {
  return rgb2cmyk_default(this._rgb);
};
chroma_default.cmyk = (...args) => new Color_default(...args, "cmyk");
input_default.format.cmyk = cmyk2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "cmyk");
    if (type_default(args) === "array" && args.length === 4) {
      return "cmyk";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/css/hsl2css.js
var rnd = (a) => Math.round(a * 100) / 100;
var hsl2css = (...args) => {
  const hsla = unpack_default(args, "hsla");
  let mode = last_default(args) || "lsa";
  hsla[0] = rnd(hsla[0] || 0);
  hsla[1] = rnd(hsla[1] * 100) + "%";
  hsla[2] = rnd(hsla[2] * 100) + "%";
  if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
    hsla[3] = hsla.length > 3 ? hsla[3] : 1;
    mode = "hsla";
  } else {
    hsla.length = 3;
  }
  return `${mode}(${hsla.join(",")})`;
};
var hsl2css_default = hsl2css;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsl/rgb2hsl.js
var rgb2hsl = (...args) => {
  args = unpack_default(args, "rgba");
  let [r, g, b] = args;
  r /= 255;
  g /= 255;
  b /= 255;
  const minRgb = min(r, g, b);
  const maxRgb = max(r, g, b);
  const l = (maxRgb + minRgb) / 2;
  let s, h;
  if (maxRgb === minRgb) {
    s = 0;
    h = Number.NaN;
  } else {
    s = l < 0.5 ? (maxRgb - minRgb) / (maxRgb + minRgb) : (maxRgb - minRgb) / (2 - maxRgb - minRgb);
  }
  if (r == maxRgb) h = (g - b) / (maxRgb - minRgb);
  else if (g == maxRgb) h = 2 + (b - r) / (maxRgb - minRgb);
  else if (b == maxRgb) h = 4 + (r - g) / (maxRgb - minRgb);
  h *= 60;
  if (h < 0) h += 360;
  if (args.length > 3 && args[3] !== void 0) return [h, s, l, args[3]];
  return [h, s, l];
};
var rgb2hsl_default = rgb2hsl;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/css/rgb2css.js
var { round } = Math;
var rgb2css = (...args) => {
  const rgba = unpack_default(args, "rgba");
  let mode = last_default(args) || "rgb";
  if (mode.substr(0, 3) == "hsl") {
    return hsl2css_default(rgb2hsl_default(rgba), mode);
  }
  rgba[0] = round(rgba[0]);
  rgba[1] = round(rgba[1]);
  rgba[2] = round(rgba[2]);
  if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
    rgba[3] = rgba.length > 3 ? rgba[3] : 1;
    mode = "rgba";
  }
  return `${mode}(${rgba.slice(0, mode === "rgb" ? 3 : 4).join(",")})`;
};
var rgb2css_default = rgb2css;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsl/hsl2rgb.js
var { round: round2 } = Math;
var hsl2rgb = (...args) => {
  args = unpack_default(args, "hsl");
  const [h, s, l] = args;
  let r, g, b;
  if (s === 0) {
    r = g = b = l * 255;
  } else {
    const t3 = [0, 0, 0];
    const c = [0, 0, 0];
    const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const t1 = 2 * l - t2;
    const h_ = h / 360;
    t3[0] = h_ + 1 / 3;
    t3[1] = h_;
    t3[2] = h_ - 1 / 3;
    for (let i = 0; i < 3; i++) {
      if (t3[i] < 0) t3[i] += 1;
      if (t3[i] > 1) t3[i] -= 1;
      if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];
      else if (2 * t3[i] < 1) c[i] = t2;
      else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
      else c[i] = t1;
    }
    [r, g, b] = [round2(c[0] * 255), round2(c[1] * 255), round2(c[2] * 255)];
  }
  if (args.length > 3) {
    return [r, g, b, args[3]];
  }
  return [r, g, b, 1];
};
var hsl2rgb_default = hsl2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/css/css2rgb.js
var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
var { round: round3 } = Math;
var css2rgb = (css) => {
  css = css.toLowerCase().trim();
  let m;
  if (input_default.format.named) {
    try {
      return input_default.format.named(css);
    } catch (e) {
    }
  }
  if (m = css.match(RE_RGB)) {
    const rgb2 = m.slice(1, 4);
    for (let i = 0; i < 3; i++) {
      rgb2[i] = +rgb2[i];
    }
    rgb2[3] = 1;
    return rgb2;
  }
  if (m = css.match(RE_RGBA)) {
    const rgb2 = m.slice(1, 5);
    for (let i = 0; i < 4; i++) {
      rgb2[i] = +rgb2[i];
    }
    return rgb2;
  }
  if (m = css.match(RE_RGB_PCT)) {
    const rgb2 = m.slice(1, 4);
    for (let i = 0; i < 3; i++) {
      rgb2[i] = round3(rgb2[i] * 2.55);
    }
    rgb2[3] = 1;
    return rgb2;
  }
  if (m = css.match(RE_RGBA_PCT)) {
    const rgb2 = m.slice(1, 5);
    for (let i = 0; i < 3; i++) {
      rgb2[i] = round3(rgb2[i] * 2.55);
    }
    rgb2[3] = +rgb2[3];
    return rgb2;
  }
  if (m = css.match(RE_HSL)) {
    const hsl2 = m.slice(1, 4);
    hsl2[1] *= 0.01;
    hsl2[2] *= 0.01;
    const rgb2 = hsl2rgb_default(hsl2);
    rgb2[3] = 1;
    return rgb2;
  }
  if (m = css.match(RE_HSLA)) {
    const hsl2 = m.slice(1, 4);
    hsl2[1] *= 0.01;
    hsl2[2] *= 0.01;
    const rgb2 = hsl2rgb_default(hsl2);
    rgb2[3] = +m[4];
    return rgb2;
  }
};
css2rgb.test = (s) => {
  return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
};
var css2rgb_default = css2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/css/index.js
Color_default.prototype.css = function(mode) {
  return rgb2css_default(this._rgb, mode);
};
chroma_default.css = (...args) => new Color_default(...args, "css");
input_default.format.css = css2rgb_default;
input_default.autodetect.push({
  p: 5,
  test: (h, ...rest) => {
    if (!rest.length && type_default(h) === "string" && css2rgb_default.test(h)) {
      return "css";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/gl/index.js
input_default.format.gl = (...args) => {
  const rgb2 = unpack_default(args, "rgba");
  rgb2[0] *= 255;
  rgb2[1] *= 255;
  rgb2[2] *= 255;
  return rgb2;
};
chroma_default.gl = (...args) => new Color_default(...args, "gl");
Color_default.prototype.gl = function() {
  const rgb2 = this._rgb;
  return [rgb2[0] / 255, rgb2[1] / 255, rgb2[2] / 255, rgb2[3]];
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hcg/hcg2rgb.js
var { floor } = Math;
var hcg2rgb = (...args) => {
  args = unpack_default(args, "hcg");
  let [h, c, _g] = args;
  let r, g, b;
  _g = _g * 255;
  const _c = c * 255;
  if (c === 0) {
    r = g = b = _g;
  } else {
    if (h === 360) h = 0;
    if (h > 360) h -= 360;
    if (h < 0) h += 360;
    h /= 60;
    const i = floor(h);
    const f = h - i;
    const p = _g * (1 - c);
    const q = p + _c * (1 - f);
    const t = p + _c * f;
    const v = p + _c;
    switch (i) {
      case 0:
        [r, g, b] = [v, t, p];
        break;
      case 1:
        [r, g, b] = [q, v, p];
        break;
      case 2:
        [r, g, b] = [p, v, t];
        break;
      case 3:
        [r, g, b] = [p, q, v];
        break;
      case 4:
        [r, g, b] = [t, p, v];
        break;
      case 5:
        [r, g, b] = [v, p, q];
        break;
    }
  }
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var hcg2rgb_default = hcg2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hcg/rgb2hcg.js
var rgb2hcg = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const minRgb = min(r, g, b);
  const maxRgb = max(r, g, b);
  const delta = maxRgb - minRgb;
  const c = delta * 100 / 255;
  const _g = minRgb / (255 - delta) * 100;
  let h;
  if (delta === 0) {
    h = Number.NaN;
  } else {
    if (r === maxRgb) h = (g - b) / delta;
    if (g === maxRgb) h = 2 + (b - r) / delta;
    if (b === maxRgb) h = 4 + (r - g) / delta;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, c, _g];
};
var rgb2hcg_default = rgb2hcg;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hcg/index.js
Color_default.prototype.hcg = function() {
  return rgb2hcg_default(this._rgb);
};
chroma_default.hcg = (...args) => new Color_default(...args, "hcg");
input_default.format.hcg = hcg2rgb_default;
input_default.autodetect.push({
  p: 1,
  test: (...args) => {
    args = unpack_default(args, "hcg");
    if (type_default(args) === "array" && args.length === 3) {
      return "hcg";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hex/hex2rgb.js
var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
var hex2rgb = (hex) => {
  if (hex.match(RE_HEX)) {
    if (hex.length === 4 || hex.length === 7) {
      hex = hex.substr(1);
    }
    if (hex.length === 3) {
      hex = hex.split("");
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const u = parseInt(hex, 16);
    const r = u >> 16;
    const g = u >> 8 & 255;
    const b = u & 255;
    return [r, g, b, 1];
  }
  if (hex.match(RE_HEXA)) {
    if (hex.length === 5 || hex.length === 9) {
      hex = hex.substr(1);
    }
    if (hex.length === 4) {
      hex = hex.split("");
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    const u = parseInt(hex, 16);
    const r = u >> 24 & 255;
    const g = u >> 16 & 255;
    const b = u >> 8 & 255;
    const a = Math.round((u & 255) / 255 * 100) / 100;
    return [r, g, b, a];
  }
  throw new Error(`unknown hex color: ${hex}`);
};
var hex2rgb_default = hex2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hex/rgb2hex.js
var { round: round4 } = Math;
var rgb2hex = (...args) => {
  let [r, g, b, a] = unpack_default(args, "rgba");
  let mode = last_default(args) || "auto";
  if (a === void 0) a = 1;
  if (mode === "auto") {
    mode = a < 1 ? "rgba" : "rgb";
  }
  r = round4(r);
  g = round4(g);
  b = round4(b);
  const u = r << 16 | g << 8 | b;
  let str = "000000" + u.toString(16);
  str = str.substr(str.length - 6);
  let hxa = "0" + round4(a * 255).toString(16);
  hxa = hxa.substr(hxa.length - 2);
  switch (mode.toLowerCase()) {
    case "rgba":
      return `#${str}${hxa}`;
    case "argb":
      return `#${hxa}${str}`;
    default:
      return `#${str}`;
  }
};
var rgb2hex_default = rgb2hex;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hex/index.js
Color_default.prototype.hex = function(mode) {
  return rgb2hex_default(this._rgb, mode);
};
chroma_default.hex = (...args) => new Color_default(...args, "hex");
input_default.format.hex = hex2rgb_default;
input_default.autodetect.push({
  p: 4,
  test: (h, ...rest) => {
    if (!rest.length && type_default(h) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
      return "hex";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsi/hsi2rgb.js
var { cos } = Math;
var hsi2rgb = (...args) => {
  args = unpack_default(args, "hsi");
  let [h, s, i] = args;
  let r, g, b;
  if (isNaN(h)) h = 0;
  if (isNaN(s)) s = 0;
  if (h > 360) h -= 360;
  if (h < 0) h += 360;
  h /= 360;
  if (h < 1 / 3) {
    b = (1 - s) / 3;
    r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
    g = 1 - (b + r);
  } else if (h < 2 / 3) {
    h -= 1 / 3;
    r = (1 - s) / 3;
    g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
    b = 1 - (r + g);
  } else {
    h -= 2 / 3;
    g = (1 - s) / 3;
    b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
    r = 1 - (g + b);
  }
  r = limit_default(i * r * 3);
  g = limit_default(i * g * 3);
  b = limit_default(i * b * 3);
  return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
};
var hsi2rgb_default = hsi2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsi/rgb2hsi.js
var { min: min2, sqrt, acos } = Math;
var rgb2hsi = (...args) => {
  let [r, g, b] = unpack_default(args, "rgb");
  r /= 255;
  g /= 255;
  b /= 255;
  let h;
  const min_ = min2(r, g, b);
  const i = (r + g + b) / 3;
  const s = i > 0 ? 1 - min_ / i : 0;
  if (s === 0) {
    h = NaN;
  } else {
    h = (r - g + (r - b)) / 2;
    h /= sqrt((r - g) * (r - g) + (r - b) * (g - b));
    h = acos(h);
    if (b > g) {
      h = TWOPI - h;
    }
    h /= TWOPI;
  }
  return [h * 360, s, i];
};
var rgb2hsi_default = rgb2hsi;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsi/index.js
Color_default.prototype.hsi = function() {
  return rgb2hsi_default(this._rgb);
};
chroma_default.hsi = (...args) => new Color_default(...args, "hsi");
input_default.format.hsi = hsi2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "hsi");
    if (type_default(args) === "array" && args.length === 3) {
      return "hsi";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsl/index.js
Color_default.prototype.hsl = function() {
  return rgb2hsl_default(this._rgb);
};
chroma_default.hsl = (...args) => new Color_default(...args, "hsl");
input_default.format.hsl = hsl2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "hsl");
    if (type_default(args) === "array" && args.length === 3) {
      return "hsl";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsv/hsv2rgb.js
var { floor: floor2 } = Math;
var hsv2rgb = (...args) => {
  args = unpack_default(args, "hsv");
  let [h, s, v] = args;
  let r, g, b;
  v *= 255;
  if (s === 0) {
    r = g = b = v;
  } else {
    if (h === 360) h = 0;
    if (h > 360) h -= 360;
    if (h < 0) h += 360;
    h /= 60;
    const i = floor2(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));
    switch (i) {
      case 0:
        [r, g, b] = [v, t, p];
        break;
      case 1:
        [r, g, b] = [q, v, p];
        break;
      case 2:
        [r, g, b] = [p, v, t];
        break;
      case 3:
        [r, g, b] = [p, q, v];
        break;
      case 4:
        [r, g, b] = [t, p, v];
        break;
      case 5:
        [r, g, b] = [v, p, q];
        break;
    }
  }
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var hsv2rgb_default = hsv2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsv/rgb2hsv.js
var { min: min3, max: max3 } = Math;
var rgb2hsl2 = (...args) => {
  args = unpack_default(args, "rgb");
  let [r, g, b] = args;
  const min_ = min3(r, g, b);
  const max_ = max3(r, g, b);
  const delta = max_ - min_;
  let h, s, v;
  v = max_ / 255;
  if (max_ === 0) {
    h = Number.NaN;
    s = 0;
  } else {
    s = delta / max_;
    if (r === max_) h = (g - b) / delta;
    if (g === max_) h = 2 + (b - r) / delta;
    if (b === max_) h = 4 + (r - g) / delta;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, v];
};
var rgb2hsv_default = rgb2hsl2;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/hsv/index.js
Color_default.prototype.hsv = function() {
  return rgb2hsv_default(this._rgb);
};
chroma_default.hsv = (...args) => new Color_default(...args, "hsv");
input_default.format.hsv = hsv2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "hsv");
    if (type_default(args) === "array" && args.length === 3) {
      return "hsv";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lab/lab-constants.js
var lab_constants_default = {
  // Corresponds roughly to RGB brighter/darker
  Kn: 18,
  // D65 standard referent
  Xn: 0.95047,
  Yn: 1,
  Zn: 1.08883,
  t0: 0.137931034,
  // 4 / 29
  t1: 0.206896552,
  // 6 / 29
  t2: 0.12841855,
  // 3 * t1 * t1
  t3: 8856452e-9
  // t1 * t1 * t1
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lab/lab2rgb.js
var { pow } = Math;
var lab2rgb = (...args) => {
  args = unpack_default(args, "lab");
  const [l, a, b] = args;
  let x, y, z, r, g, b_;
  y = (l + 16) / 116;
  x = isNaN(a) ? y : y + a / 500;
  z = isNaN(b) ? y : y - b / 200;
  y = lab_constants_default.Yn * lab_xyz(y);
  x = lab_constants_default.Xn * lab_xyz(x);
  z = lab_constants_default.Zn * lab_xyz(z);
  r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
  g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
  b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
  return [r, g, b_, args.length > 3 ? args[3] : 1];
};
var xyz_rgb = (r) => {
  return 255 * (r <= 304e-5 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055);
};
var lab_xyz = (t) => {
  return t > lab_constants_default.t1 ? t * t * t : lab_constants_default.t2 * (t - lab_constants_default.t0);
};
var lab2rgb_default = lab2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lab/rgb2lab.js
var { pow: pow2 } = Math;
var rgb2lab = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const [x, y, z] = rgb2xyz(r, g, b);
  const l = 116 * y - 16;
  return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
};
var rgb_xyz = (r) => {
  if ((r /= 255) <= 0.04045) return r / 12.92;
  return pow2((r + 0.055) / 1.055, 2.4);
};
var xyz_lab = (t) => {
  if (t > lab_constants_default.t3) return pow2(t, 1 / 3);
  return t / lab_constants_default.t2 + lab_constants_default.t0;
};
var rgb2xyz = (r, g, b) => {
  r = rgb_xyz(r);
  g = rgb_xyz(g);
  b = rgb_xyz(b);
  const x = xyz_lab(
    (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / lab_constants_default.Xn
  );
  const y = xyz_lab(
    (0.2126729 * r + 0.7151522 * g + 0.072175 * b) / lab_constants_default.Yn
  );
  const z = xyz_lab(
    (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / lab_constants_default.Zn
  );
  return [x, y, z];
};
var rgb2lab_default = rgb2lab;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lab/index.js
Color_default.prototype.lab = function() {
  return rgb2lab_default(this._rgb);
};
chroma_default.lab = (...args) => new Color_default(...args, "lab");
input_default.format.lab = lab2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "lab");
    if (type_default(args) === "array" && args.length === 3) {
      return "lab";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lch/lch2lab.js
var { sin, cos: cos2 } = Math;
var lch2lab = (...args) => {
  let [l, c, h] = unpack_default(args, "lch");
  if (isNaN(h)) h = 0;
  h = h * DEG2RAD;
  return [l, cos2(h) * c, sin(h) * c];
};
var lch2lab_default = lch2lab;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lch/lch2rgb.js
var lch2rgb = (...args) => {
  args = unpack_default(args, "lch");
  const [l, c, h] = args;
  const [L, a, b_] = lch2lab_default(l, c, h);
  const [r, g, b] = lab2rgb_default(L, a, b_);
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var lch2rgb_default = lch2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lch/hcl2rgb.js
var hcl2rgb = (...args) => {
  const hcl = unpack_default(args, "hcl").reverse();
  return lch2rgb_default(...hcl);
};
var hcl2rgb_default = hcl2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lch/lab2lch.js
var { sqrt: sqrt2, atan2, round: round5 } = Math;
var lab2lch = (...args) => {
  const [l, a, b] = unpack_default(args, "lab");
  const c = sqrt2(a * a + b * b);
  let h = (atan2(b, a) * RAD2DEG + 360) % 360;
  if (round5(c * 1e4) === 0) h = Number.NaN;
  return [l, c, h];
};
var lab2lch_default = lab2lch;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lch/rgb2lch.js
var rgb2lch = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const [l, a, b_] = rgb2lab_default(r, g, b);
  return lab2lch_default(l, a, b_);
};
var rgb2lch_default = rgb2lch;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/lch/index.js
Color_default.prototype.lch = function() {
  return rgb2lch_default(this._rgb);
};
Color_default.prototype.hcl = function() {
  return rgb2lch_default(this._rgb).reverse();
};
chroma_default.lch = (...args) => new Color_default(...args, "lch");
chroma_default.hcl = (...args) => new Color_default(...args, "hcl");
input_default.format.lch = lch2rgb_default;
input_default.format.hcl = hcl2rgb_default;
["lch", "hcl"].forEach(
  (m) => input_default.autodetect.push({
    p: 2,
    test: (...args) => {
      args = unpack_default(args, m);
      if (type_default(args) === "array" && args.length === 3) {
        return m;
      }
    }
  })
);

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/colors/w3cx11.js
var w3cx11 = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  laserlemon: "#ffff54",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrod: "#fafad2",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  maroon2: "#7f0000",
  maroon3: "#b03060",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  purple2: "#7f007f",
  purple3: "#a020f0",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
var w3cx11_default = w3cx11;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/named/index.js
Color_default.prototype.name = function() {
  const hex = rgb2hex_default(this._rgb, "rgb");
  for (let n of Object.keys(w3cx11_default)) {
    if (w3cx11_default[n] === hex) return n.toLowerCase();
  }
  return hex;
};
input_default.format.named = (name) => {
  name = name.toLowerCase();
  if (w3cx11_default[name]) return hex2rgb_default(w3cx11_default[name]);
  throw new Error("unknown color name: " + name);
};
input_default.autodetect.push({
  p: 5,
  test: (h, ...rest) => {
    if (!rest.length && type_default(h) === "string" && w3cx11_default[h.toLowerCase()]) {
      return "named";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/num/num2rgb.js
var num2rgb = (num2) => {
  if (type_default(num2) == "number" && num2 >= 0 && num2 <= 16777215) {
    const r = num2 >> 16;
    const g = num2 >> 8 & 255;
    const b = num2 & 255;
    return [r, g, b, 1];
  }
  throw new Error("unknown num color: " + num2);
};
var num2rgb_default = num2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/num/rgb2num.js
var rgb2num = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  return (r << 16) + (g << 8) + b;
};
var rgb2num_default = rgb2num;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/num/index.js
Color_default.prototype.num = function() {
  return rgb2num_default(this._rgb);
};
chroma_default.num = (...args) => new Color_default(...args, "num");
input_default.format.num = num2rgb_default;
input_default.autodetect.push({
  p: 5,
  test: (...args) => {
    if (args.length === 1 && type_default(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
      return "num";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/rgb/index.js
var { round: round6 } = Math;
Color_default.prototype.rgb = function(rnd2 = true) {
  if (rnd2 === false) return this._rgb.slice(0, 3);
  return this._rgb.slice(0, 3).map(round6);
};
Color_default.prototype.rgba = function(rnd2 = true) {
  return this._rgb.slice(0, 4).map((v, i) => {
    return i < 3 ? rnd2 === false ? v : round6(v) : v;
  });
};
chroma_default.rgb = (...args) => new Color_default(...args, "rgb");
input_default.format.rgb = (...args) => {
  const rgba = unpack_default(args, "rgba");
  if (rgba[3] === void 0) rgba[3] = 1;
  return rgba;
};
input_default.autodetect.push({
  p: 3,
  test: (...args) => {
    args = unpack_default(args, "rgba");
    if (type_default(args) === "array" && (args.length === 3 || args.length === 4 && type_default(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
      return "rgb";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/temp/temperature2rgb.js
var { log } = Math;
var temperature2rgb = (kelvin) => {
  const temp = kelvin / 100;
  let r, g, b;
  if (temp < 66) {
    r = 255;
    g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
    b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
  } else {
    r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
    g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
    b = 255;
  }
  return [r, g, b, 1];
};
var temperature2rgb_default = temperature2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/temp/rgb2temperature.js
var { round: round7 } = Math;
var rgb2temperature = (...args) => {
  const rgb2 = unpack_default(args, "rgb");
  const r = rgb2[0], b = rgb2[2];
  let minTemp = 1e3;
  let maxTemp = 4e4;
  const eps = 0.4;
  let temp;
  while (maxTemp - minTemp > eps) {
    temp = (maxTemp + minTemp) * 0.5;
    const rgb3 = temperature2rgb_default(temp);
    if (rgb3[2] / rgb3[0] >= b / r) {
      maxTemp = temp;
    } else {
      minTemp = temp;
    }
  }
  return round7(temp);
};
var rgb2temperature_default = rgb2temperature;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/temp/index.js
Color_default.prototype.temp = Color_default.prototype.kelvin = Color_default.prototype.temperature = function() {
  return rgb2temperature_default(this._rgb);
};
chroma_default.temp = chroma_default.kelvin = chroma_default.temperature = (...args) => new Color_default(...args, "temp");
input_default.format.temp = input_default.format.kelvin = input_default.format.temperature = temperature2rgb_default;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/oklab/oklab2rgb.js
var { pow: pow3, sign } = Math;
var oklab2rgb = (...args) => {
  args = unpack_default(args, "lab");
  const [L, a, b] = args;
  const l = pow3(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = pow3(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = pow3(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return [
    255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    args.length > 3 ? args[3] : 1
  ];
};
var oklab2rgb_default = oklab2rgb;
function lrgb2rgb(c) {
  const abs3 = Math.abs(c);
  if (abs3 > 31308e-7) {
    return (sign(c) || 1) * (1.055 * pow3(abs3, 1 / 2.4) - 0.055);
  }
  return c * 12.92;
}

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/oklab/rgb2oklab.js
var { cbrt, pow: pow4, sign: sign2 } = Math;
var rgb2oklab = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const [lr, lg, lb] = [
    rgb2lrgb(r / 255),
    rgb2lrgb(g / 255),
    rgb2lrgb(b / 255)
  ];
  const l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
};
var rgb2oklab_default = rgb2oklab;
function rgb2lrgb(c) {
  const abs3 = Math.abs(c);
  if (abs3 < 0.04045) {
    return c / 12.92;
  }
  return (sign2(c) || 1) * pow4((abs3 + 0.055) / 1.055, 2.4);
}

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/oklab/index.js
Color_default.prototype.oklab = function() {
  return rgb2oklab_default(this._rgb);
};
chroma_default.oklab = (...args) => new Color_default(...args, "oklab");
input_default.format.oklab = oklab2rgb_default;
input_default.autodetect.push({
  p: 3,
  test: (...args) => {
    args = unpack_default(args, "oklab");
    if (type_default(args) === "array" && args.length === 3) {
      return "oklab";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/oklch/oklch2rgb.js
var oklch2rgb = (...args) => {
  args = unpack_default(args, "lch");
  const [l, c, h] = args;
  const [L, a, b_] = lch2lab_default(l, c, h);
  const [r, g, b] = oklab2rgb_default(L, a, b_);
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var oklch2rgb_default = oklch2rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/oklch/rgb2oklch.js
var rgb2oklch = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const [l, a, b_] = rgb2oklab_default(r, g, b);
  return lab2lch_default(l, a, b_);
};
var rgb2oklch_default = rgb2oklch;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/io/oklch/index.js
Color_default.prototype.oklch = function() {
  return rgb2oklch_default(this._rgb);
};
chroma_default.oklch = (...args) => new Color_default(...args, "oklch");
input_default.format.oklch = oklch2rgb_default;
input_default.autodetect.push({
  p: 3,
  test: (...args) => {
    args = unpack_default(args, "oklch");
    if (type_default(args) === "array" && args.length === 3) {
      return "oklch";
    }
  }
});

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/alpha.js
Color_default.prototype.alpha = function(a, mutate = false) {
  if (a !== void 0 && type_default(a) === "number") {
    if (mutate) {
      this._rgb[3] = a;
      return this;
    }
    return new Color_default([this._rgb[0], this._rgb[1], this._rgb[2], a], "rgb");
  }
  return this._rgb[3];
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/clipped.js
Color_default.prototype.clipped = function() {
  return this._rgb._clipped || false;
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/darken.js
Color_default.prototype.darken = function(amount = 1) {
  const me = this;
  const lab2 = me.lab();
  lab2[0] -= lab_constants_default.Kn * amount;
  return new Color_default(lab2, "lab").alpha(me.alpha(), true);
};
Color_default.prototype.brighten = function(amount = 1) {
  return this.darken(-amount);
};
Color_default.prototype.darker = Color_default.prototype.darken;
Color_default.prototype.brighter = Color_default.prototype.brighten;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/get.js
Color_default.prototype.get = function(mc) {
  const [mode, channel] = mc.split(".");
  const src = this[mode]();
  if (channel) {
    const i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
    if (i > -1) return src[i];
    throw new Error(`unknown channel ${channel} in mode ${mode}`);
  } else {
    return src;
  }
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/luminance.js
var { pow: pow5 } = Math;
var EPS = 1e-7;
var MAX_ITER = 20;
Color_default.prototype.luminance = function(lum, mode = "rgb") {
  if (lum !== void 0 && type_default(lum) === "number") {
    if (lum === 0) {
      return new Color_default([0, 0, 0, this._rgb[3]], "rgb");
    }
    if (lum === 1) {
      return new Color_default([255, 255, 255, this._rgb[3]], "rgb");
    }
    let cur_lum = this.luminance();
    let max_iter = MAX_ITER;
    const test = (low, high) => {
      const mid = low.interpolate(high, 0.5, mode);
      const lm = mid.luminance();
      if (Math.abs(lum - lm) < EPS || !max_iter--) {
        return mid;
      }
      return lm > lum ? test(low, mid) : test(mid, high);
    };
    const rgb2 = (cur_lum > lum ? test(new Color_default([0, 0, 0]), this) : test(this, new Color_default([255, 255, 255]))).rgb();
    return new Color_default([...rgb2, this._rgb[3]]);
  }
  return rgb2luminance(...this._rgb.slice(0, 3));
};
var rgb2luminance = (r, g, b) => {
  r = luminance_x(r);
  g = luminance_x(g);
  b = luminance_x(b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
var luminance_x = (x) => {
  x /= 255;
  return x <= 0.03928 ? x / 12.92 : pow5((x + 0.055) / 1.055, 2.4);
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/index.js
var interpolator_default = {};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/generator/mix.js
var mix_default = (col1, col2, f = 0.5, ...rest) => {
  let mode = rest[0] || "lrgb";
  if (!interpolator_default[mode] && !rest.length) {
    mode = Object.keys(interpolator_default)[0];
  }
  if (!interpolator_default[mode]) {
    throw new Error(`interpolation mode ${mode} is not defined`);
  }
  if (type_default(col1) !== "object") col1 = new Color_default(col1);
  if (type_default(col2) !== "object") col2 = new Color_default(col2);
  return interpolator_default[mode](col1, col2, f).alpha(
    col1.alpha() + f * (col2.alpha() - col1.alpha())
  );
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/mix.js
Color_default.prototype.mix = Color_default.prototype.interpolate = function(col2, f = 0.5, ...rest) {
  return mix_default(this, col2, f, ...rest);
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/premultiply.js
Color_default.prototype.premultiply = function(mutate = false) {
  const rgb2 = this._rgb;
  const a = rgb2[3];
  if (mutate) {
    this._rgb = [rgb2[0] * a, rgb2[1] * a, rgb2[2] * a, a];
    return this;
  } else {
    return new Color_default([rgb2[0] * a, rgb2[1] * a, rgb2[2] * a, a], "rgb");
  }
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/saturate.js
Color_default.prototype.saturate = function(amount = 1) {
  const me = this;
  const lch2 = me.lch();
  lch2[1] += lab_constants_default.Kn * amount;
  if (lch2[1] < 0) lch2[1] = 0;
  return new Color_default(lch2, "lch").alpha(me.alpha(), true);
};
Color_default.prototype.desaturate = function(amount = 1) {
  return this.saturate(-amount);
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/set.js
Color_default.prototype.set = function(mc, value, mutate = false) {
  const [mode, channel] = mc.split(".");
  const src = this[mode]();
  if (channel) {
    const i = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
    if (i > -1) {
      if (type_default(value) == "string") {
        switch (value.charAt(0)) {
          case "+":
            src[i] += +value;
            break;
          case "-":
            src[i] += +value;
            break;
          case "*":
            src[i] *= +value.substr(1);
            break;
          case "/":
            src[i] /= +value.substr(1);
            break;
          default:
            src[i] = +value;
        }
      } else if (type_default(value) === "number") {
        src[i] = value;
      } else {
        throw new Error(`unsupported value for Color.set`);
      }
      const out = new Color_default(src, mode);
      if (mutate) {
        this._rgb = out._rgb;
        return this;
      }
      return out;
    }
    throw new Error(`unknown channel ${channel} in mode ${mode}`);
  } else {
    return src;
  }
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/ops/shade.js
Color_default.prototype.tint = function(f = 0.5, ...rest) {
  return mix_default(this, "white", f, ...rest);
};
Color_default.prototype.shade = function(f = 0.5, ...rest) {
  return mix_default(this, "black", f, ...rest);
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/rgb.js
var rgb = (col1, col2, f) => {
  const xyz0 = col1._rgb;
  const xyz1 = col2._rgb;
  return new Color_default(
    xyz0[0] + f * (xyz1[0] - xyz0[0]),
    xyz0[1] + f * (xyz1[1] - xyz0[1]),
    xyz0[2] + f * (xyz1[2] - xyz0[2]),
    "rgb"
  );
};
interpolator_default.rgb = rgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/lrgb.js
var { sqrt: sqrt3, pow: pow6 } = Math;
var lrgb = (col1, col2, f) => {
  const [x1, y1, z1] = col1._rgb;
  const [x2, y2, z2] = col2._rgb;
  return new Color_default(
    sqrt3(pow6(x1, 2) * (1 - f) + pow6(x2, 2) * f),
    sqrt3(pow6(y1, 2) * (1 - f) + pow6(y2, 2) * f),
    sqrt3(pow6(z1, 2) * (1 - f) + pow6(z2, 2) * f),
    "rgb"
  );
};
interpolator_default.lrgb = lrgb;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/lab.js
var lab = (col1, col2, f) => {
  const xyz0 = col1.lab();
  const xyz1 = col2.lab();
  return new Color_default(
    xyz0[0] + f * (xyz1[0] - xyz0[0]),
    xyz0[1] + f * (xyz1[1] - xyz0[1]),
    xyz0[2] + f * (xyz1[2] - xyz0[2]),
    "lab"
  );
};
interpolator_default.lab = lab;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/_hsx.js
var hsx_default = (col1, col2, f, m) => {
  let xyz0, xyz1;
  if (m === "hsl") {
    xyz0 = col1.hsl();
    xyz1 = col2.hsl();
  } else if (m === "hsv") {
    xyz0 = col1.hsv();
    xyz1 = col2.hsv();
  } else if (m === "hcg") {
    xyz0 = col1.hcg();
    xyz1 = col2.hcg();
  } else if (m === "hsi") {
    xyz0 = col1.hsi();
    xyz1 = col2.hsi();
  } else if (m === "lch" || m === "hcl") {
    m = "hcl";
    xyz0 = col1.hcl();
    xyz1 = col2.hcl();
  } else if (m === "oklch") {
    xyz0 = col1.oklch().reverse();
    xyz1 = col2.oklch().reverse();
  }
  let hue0, hue1, sat0, sat1, lbv0, lbv1;
  if (m.substr(0, 1) === "h" || m === "oklch") {
    [hue0, sat0, lbv0] = xyz0;
    [hue1, sat1, lbv1] = xyz1;
  }
  let sat, hue, lbv, dh;
  if (!isNaN(hue0) && !isNaN(hue1)) {
    if (hue1 > hue0 && hue1 - hue0 > 180) {
      dh = hue1 - (hue0 + 360);
    } else if (hue1 < hue0 && hue0 - hue1 > 180) {
      dh = hue1 + 360 - hue0;
    } else {
      dh = hue1 - hue0;
    }
    hue = hue0 + f * dh;
  } else if (!isNaN(hue0)) {
    hue = hue0;
    if ((lbv1 == 1 || lbv1 == 0) && m != "hsv") sat = sat0;
  } else if (!isNaN(hue1)) {
    hue = hue1;
    if ((lbv0 == 1 || lbv0 == 0) && m != "hsv") sat = sat1;
  } else {
    hue = Number.NaN;
  }
  if (sat === void 0) sat = sat0 + f * (sat1 - sat0);
  lbv = lbv0 + f * (lbv1 - lbv0);
  return m === "oklch" ? new Color_default([lbv, sat, hue], m) : new Color_default([hue, sat, lbv], m);
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/lch.js
var lch = (col1, col2, f) => {
  return hsx_default(col1, col2, f, "lch");
};
interpolator_default.lch = lch;
interpolator_default.hcl = lch;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/num.js
var num = (col1, col2, f) => {
  const c1 = col1.num();
  const c2 = col2.num();
  return new Color_default(c1 + f * (c2 - c1), "num");
};
interpolator_default.num = num;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/hcg.js
var hcg = (col1, col2, f) => {
  return hsx_default(col1, col2, f, "hcg");
};
interpolator_default.hcg = hcg;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/hsi.js
var hsi = (col1, col2, f) => {
  return hsx_default(col1, col2, f, "hsi");
};
interpolator_default.hsi = hsi;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/hsl.js
var hsl = (col1, col2, f) => {
  return hsx_default(col1, col2, f, "hsl");
};
interpolator_default.hsl = hsl;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/hsv.js
var hsv = (col1, col2, f) => {
  return hsx_default(col1, col2, f, "hsv");
};
interpolator_default.hsv = hsv;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/oklab.js
var oklab = (col1, col2, f) => {
  const xyz0 = col1.oklab();
  const xyz1 = col2.oklab();
  return new Color_default(
    xyz0[0] + f * (xyz1[0] - xyz0[0]),
    xyz0[1] + f * (xyz1[1] - xyz0[1]),
    xyz0[2] + f * (xyz1[2] - xyz0[2]),
    "oklab"
  );
};
interpolator_default.oklab = oklab;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/interpolator/oklch.js
var oklch = (col1, col2, f) => {
  return hsx_default(col1, col2, f, "oklch");
};
interpolator_default.oklch = oklch;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/generator/average.js
var { pow: pow7, sqrt: sqrt4, PI: PI2, cos: cos3, sin: sin2, atan2: atan22 } = Math;
var average_default = (colors, mode = "lrgb", weights = null) => {
  const l = colors.length;
  if (!weights) weights = Array.from(new Array(l)).map(() => 1);
  const k = l / weights.reduce(function(a, b) {
    return a + b;
  });
  weights.forEach((w, i) => {
    weights[i] *= k;
  });
  colors = colors.map((c) => new Color_default(c));
  if (mode === "lrgb") {
    return _average_lrgb(colors, weights);
  }
  const first = colors.shift();
  const xyz = first.get(mode);
  const cnt = [];
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < xyz.length; i++) {
    xyz[i] = (xyz[i] || 0) * weights[0];
    cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
    if (mode.charAt(i) === "h" && !isNaN(xyz[i])) {
      const A = xyz[i] / 180 * PI2;
      dx += cos3(A) * weights[0];
      dy += sin2(A) * weights[0];
    }
  }
  let alpha = first.alpha() * weights[0];
  colors.forEach((c, ci) => {
    const xyz2 = c.get(mode);
    alpha += c.alpha() * weights[ci + 1];
    for (let i = 0; i < xyz.length; i++) {
      if (!isNaN(xyz2[i])) {
        cnt[i] += weights[ci + 1];
        if (mode.charAt(i) === "h") {
          const A = xyz2[i] / 180 * PI2;
          dx += cos3(A) * weights[ci + 1];
          dy += sin2(A) * weights[ci + 1];
        } else {
          xyz[i] += xyz2[i] * weights[ci + 1];
        }
      }
    }
  });
  for (let i = 0; i < xyz.length; i++) {
    if (mode.charAt(i) === "h") {
      let A = atan22(dy / cnt[i], dx / cnt[i]) / PI2 * 180;
      while (A < 0) A += 360;
      while (A >= 360) A -= 360;
      xyz[i] = A;
    } else {
      xyz[i] = xyz[i] / cnt[i];
    }
  }
  alpha /= l;
  return new Color_default(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
};
var _average_lrgb = (colors, weights) => {
  const l = colors.length;
  const xyz = [0, 0, 0, 0];
  for (let i = 0; i < colors.length; i++) {
    const col = colors[i];
    const f = weights[i] / l;
    const rgb2 = col._rgb;
    xyz[0] += pow7(rgb2[0], 2) * f;
    xyz[1] += pow7(rgb2[1], 2) * f;
    xyz[2] += pow7(rgb2[2], 2) * f;
    xyz[3] += rgb2[3] * f;
  }
  xyz[0] = sqrt4(xyz[0]);
  xyz[1] = sqrt4(xyz[1]);
  xyz[2] = sqrt4(xyz[2]);
  if (xyz[3] > 0.9999999) xyz[3] = 1;
  return new Color_default(clip_rgb_default(xyz));
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/generator/scale.js
var { pow: pow8 } = Math;
function scale_default(colors) {
  let _mode = "rgb";
  let _nacol = chroma_default("#ccc");
  let _spread = 0;
  let _domain = [0, 1];
  let _pos = [];
  let _padding = [0, 0];
  let _classes = false;
  let _colors = [];
  let _out = false;
  let _min = 0;
  let _max = 1;
  let _correctLightness = false;
  let _colorCache = {};
  let _useCache = true;
  let _gamma = 1;
  const setColors = function(colors2) {
    colors2 = colors2 || ["#fff", "#000"];
    if (colors2 && type_default(colors2) === "string" && chroma_default.brewer && chroma_default.brewer[colors2.toLowerCase()]) {
      colors2 = chroma_default.brewer[colors2.toLowerCase()];
    }
    if (type_default(colors2) === "array") {
      if (colors2.length === 1) {
        colors2 = [colors2[0], colors2[0]];
      }
      colors2 = colors2.slice(0);
      for (let c = 0; c < colors2.length; c++) {
        colors2[c] = chroma_default(colors2[c]);
      }
      _pos.length = 0;
      for (let c = 0; c < colors2.length; c++) {
        _pos.push(c / (colors2.length - 1));
      }
    }
    resetCache();
    return _colors = colors2;
  };
  const getClass = function(value) {
    if (_classes != null) {
      const n = _classes.length - 1;
      let i = 0;
      while (i < n && value >= _classes[i]) {
        i++;
      }
      return i - 1;
    }
    return 0;
  };
  let tMapLightness = (t) => t;
  let tMapDomain = (t) => t;
  const getColor = function(val, bypassMap) {
    let col, t;
    if (bypassMap == null) {
      bypassMap = false;
    }
    if (isNaN(val) || val === null) {
      return _nacol;
    }
    if (!bypassMap) {
      if (_classes && _classes.length > 2) {
        const c = getClass(val);
        t = c / (_classes.length - 2);
      } else if (_max !== _min) {
        t = (val - _min) / (_max - _min);
      } else {
        t = 1;
      }
    } else {
      t = val;
    }
    t = tMapDomain(t);
    if (!bypassMap) {
      t = tMapLightness(t);
    }
    if (_gamma !== 1) {
      t = pow8(t, _gamma);
    }
    t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
    t = limit_default(t, 0, 1);
    const k = Math.floor(t * 1e4);
    if (_useCache && _colorCache[k]) {
      col = _colorCache[k];
    } else {
      if (type_default(_colors) === "array") {
        for (let i = 0; i < _pos.length; i++) {
          const p = _pos[i];
          if (t <= p) {
            col = _colors[i];
            break;
          }
          if (t >= p && i === _pos.length - 1) {
            col = _colors[i];
            break;
          }
          if (t > p && t < _pos[i + 1]) {
            t = (t - p) / (_pos[i + 1] - p);
            col = chroma_default.interpolate(
              _colors[i],
              _colors[i + 1],
              t,
              _mode
            );
            break;
          }
        }
      } else if (type_default(_colors) === "function") {
        col = _colors(t);
      }
      if (_useCache) {
        _colorCache[k] = col;
      }
    }
    return col;
  };
  var resetCache = () => _colorCache = {};
  setColors(colors);
  const f = function(v) {
    const c = chroma_default(getColor(v));
    if (_out && c[_out]) {
      return c[_out]();
    } else {
      return c;
    }
  };
  f.classes = function(classes) {
    if (classes != null) {
      if (type_default(classes) === "array") {
        _classes = classes;
        _domain = [classes[0], classes[classes.length - 1]];
      } else {
        const d = chroma_default.analyze(_domain);
        if (classes === 0) {
          _classes = [d.min, d.max];
        } else {
          _classes = chroma_default.limits(d, "e", classes);
        }
      }
      return f;
    }
    return _classes;
  };
  f.domain = function(domain) {
    if (!arguments.length) {
      return _domain;
    }
    _min = domain[0];
    _max = domain[domain.length - 1];
    _pos = [];
    const k = _colors.length;
    if (domain.length === k && _min !== _max) {
      for (let d of Array.from(domain)) {
        _pos.push((d - _min) / (_max - _min));
      }
    } else {
      for (let c = 0; c < k; c++) {
        _pos.push(c / (k - 1));
      }
      if (domain.length > 2) {
        const tOut = domain.map((d, i) => i / (domain.length - 1));
        const tBreaks = domain.map((d) => (d - _min) / (_max - _min));
        if (!tBreaks.every((val, i) => tOut[i] === val)) {
          tMapDomain = (t) => {
            if (t <= 0 || t >= 1) return t;
            let i = 0;
            while (t >= tBreaks[i + 1]) i++;
            const f2 = (t - tBreaks[i]) / (tBreaks[i + 1] - tBreaks[i]);
            const out = tOut[i] + f2 * (tOut[i + 1] - tOut[i]);
            return out;
          };
        }
      }
    }
    _domain = [_min, _max];
    return f;
  };
  f.mode = function(_m) {
    if (!arguments.length) {
      return _mode;
    }
    _mode = _m;
    resetCache();
    return f;
  };
  f.range = function(colors2, _pos2) {
    setColors(colors2, _pos2);
    return f;
  };
  f.out = function(_o) {
    _out = _o;
    return f;
  };
  f.spread = function(val) {
    if (!arguments.length) {
      return _spread;
    }
    _spread = val;
    return f;
  };
  f.correctLightness = function(v) {
    if (v == null) {
      v = true;
    }
    _correctLightness = v;
    resetCache();
    if (_correctLightness) {
      tMapLightness = function(t) {
        const L0 = getColor(0, true).lab()[0];
        const L1 = getColor(1, true).lab()[0];
        const pol = L0 > L1;
        let L_actual = getColor(t, true).lab()[0];
        const L_ideal = L0 + (L1 - L0) * t;
        let L_diff = L_actual - L_ideal;
        let t0 = 0;
        let t1 = 1;
        let max_iter = 20;
        while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
          (function() {
            if (pol) {
              L_diff *= -1;
            }
            if (L_diff < 0) {
              t0 = t;
              t += (t1 - t) * 0.5;
            } else {
              t1 = t;
              t += (t0 - t) * 0.5;
            }
            L_actual = getColor(t, true).lab()[0];
            return L_diff = L_actual - L_ideal;
          })();
        }
        return t;
      };
    } else {
      tMapLightness = (t) => t;
    }
    return f;
  };
  f.padding = function(p) {
    if (p != null) {
      if (type_default(p) === "number") {
        p = [p, p];
      }
      _padding = p;
      return f;
    } else {
      return _padding;
    }
  };
  f.colors = function(numColors, out) {
    if (arguments.length < 2) {
      out = "hex";
    }
    let result = [];
    if (arguments.length === 0) {
      result = _colors.slice(0);
    } else if (numColors === 1) {
      result = [f(0.5)];
    } else if (numColors > 1) {
      const dm = _domain[0];
      const dd = _domain[1] - dm;
      result = __range__(0, numColors, false).map(
        (i) => f(dm + i / (numColors - 1) * dd)
      );
    } else {
      colors = [];
      let samples = [];
      if (_classes && _classes.length > 2) {
        for (let i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
          samples.push((_classes[i - 1] + _classes[i]) * 0.5);
        }
      } else {
        samples = _domain;
      }
      result = samples.map((v) => f(v));
    }
    if (chroma_default[out]) {
      result = result.map((c) => c[out]());
    }
    return result;
  };
  f.cache = function(c) {
    if (c != null) {
      _useCache = c;
      return f;
    } else {
      return _useCache;
    }
  };
  f.gamma = function(g) {
    if (g != null) {
      _gamma = g;
      return f;
    } else {
      return _gamma;
    }
  };
  f.nodata = function(d) {
    if (d != null) {
      _nacol = chroma_default(d);
      return f;
    } else {
      return _nacol;
    }
  };
  return f;
}
function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/generator/bezier.js
var binom_row = function(n) {
  let row = [1, 1];
  for (let i = 1; i < n; i++) {
    let newrow = [1];
    for (let j = 1; j <= row.length; j++) {
      newrow[j] = (row[j] || 0) + row[j - 1];
    }
    row = newrow;
  }
  return row;
};
var bezier = function(colors) {
  let I, lab0, lab1, lab2;
  colors = colors.map((c) => new Color_default(c));
  if (colors.length === 2) {
    [lab0, lab1] = colors.map((c) => c.lab());
    I = function(t) {
      const lab3 = [0, 1, 2].map((i) => lab0[i] + t * (lab1[i] - lab0[i]));
      return new Color_default(lab3, "lab");
    };
  } else if (colors.length === 3) {
    [lab0, lab1, lab2] = colors.map((c) => c.lab());
    I = function(t) {
      const lab3 = [0, 1, 2].map(
        (i) => (1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]
      );
      return new Color_default(lab3, "lab");
    };
  } else if (colors.length === 4) {
    let lab3;
    [lab0, lab1, lab2, lab3] = colors.map((c) => c.lab());
    I = function(t) {
      const lab4 = [0, 1, 2].map(
        (i) => (1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]
      );
      return new Color_default(lab4, "lab");
    };
  } else if (colors.length >= 5) {
    let labs, row, n;
    labs = colors.map((c) => c.lab());
    n = colors.length - 1;
    row = binom_row(n);
    I = function(t) {
      const u = 1 - t;
      const lab3 = [0, 1, 2].map(
        (i) => labs.reduce(
          (sum, el, j) => sum + row[j] * u ** (n - j) * t ** j * el[i],
          0
        )
      );
      return new Color_default(lab3, "lab");
    };
  } else {
    throw new RangeError("No point in running bezier with only one color.");
  }
  return I;
};
var bezier_default = (colors) => {
  const f = bezier(colors);
  f.scale = () => scale_default(f);
  return f;
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/generator/blend.js
var blend = (bottom, top, mode) => {
  if (!blend[mode]) {
    throw new Error("unknown blend mode " + mode);
  }
  return blend[mode](bottom, top);
};
var blend_f = (f) => (bottom, top) => {
  const c0 = chroma_default(top).rgb();
  const c1 = chroma_default(bottom).rgb();
  return chroma_default.rgb(f(c0, c1));
};
var each = (f) => (c0, c1) => {
  const out = [];
  out[0] = f(c0[0], c1[0]);
  out[1] = f(c0[1], c1[1]);
  out[2] = f(c0[2], c1[2]);
  return out;
};
var normal = (a) => a;
var multiply = (a, b) => a * b / 255;
var darken = (a, b) => a > b ? b : a;
var lighten = (a, b) => a > b ? a : b;
var screen = (a, b) => 255 * (1 - (1 - a / 255) * (1 - b / 255));
var overlay = (a, b) => b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
var burn = (a, b) => 255 * (1 - (1 - b / 255) / (a / 255));
var dodge = (a, b) => {
  if (a === 255) return 255;
  a = 255 * (b / 255) / (1 - a / 255);
  return a > 255 ? 255 : a;
};
blend.normal = blend_f(each(normal));
blend.multiply = blend_f(each(multiply));
blend.screen = blend_f(each(screen));
blend.overlay = blend_f(each(overlay));
blend.darken = blend_f(each(darken));
blend.lighten = blend_f(each(lighten));
blend.dodge = blend_f(each(dodge));
blend.burn = blend_f(each(burn));
var blend_default = blend;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/generator/cubehelix.js
var { pow: pow9, sin: sin3, cos: cos4 } = Math;
function cubehelix_default(start = 300, rotations = -1.5, hue = 1, gamma = 1, lightness = [0, 1]) {
  let dh = 0, dl;
  if (type_default(lightness) === "array") {
    dl = lightness[1] - lightness[0];
  } else {
    dl = 0;
    lightness = [lightness, lightness];
  }
  const f = function(fract) {
    const a = TWOPI * ((start + 120) / 360 + rotations * fract);
    const l = pow9(lightness[0] + dl * fract, gamma);
    const h = dh !== 0 ? hue[0] + fract * dh : hue;
    const amp = h * l * (1 - l) / 2;
    const cos_a = cos4(a);
    const sin_a = sin3(a);
    const r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
    const g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
    const b = l + amp * (1.97294 * cos_a);
    return chroma_default(clip_rgb_default([r * 255, g * 255, b * 255, 1]));
  };
  f.start = function(s) {
    if (s == null) {
      return start;
    }
    start = s;
    return f;
  };
  f.rotations = function(r) {
    if (r == null) {
      return rotations;
    }
    rotations = r;
    return f;
  };
  f.gamma = function(g) {
    if (g == null) {
      return gamma;
    }
    gamma = g;
    return f;
  };
  f.hue = function(h) {
    if (h == null) {
      return hue;
    }
    hue = h;
    if (type_default(hue) === "array") {
      dh = hue[1] - hue[0];
      if (dh === 0) {
        hue = hue[1];
      }
    } else {
      dh = 0;
    }
    return f;
  };
  f.lightness = function(h) {
    if (h == null) {
      return lightness;
    }
    if (type_default(h) === "array") {
      lightness = h;
      dl = h[1] - h[0];
    } else {
      lightness = [h, h];
      dl = 0;
    }
    return f;
  };
  f.scale = () => chroma_default.scale(f);
  f.hue(hue);
  return f;
}

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/generator/random.js
var digits = "0123456789abcdef";
var { floor: floor3, random } = Math;
var random_default = () => {
  let code = "#";
  for (let i = 0; i < 6; i++) {
    code += digits.charAt(floor3(random() * 16));
  }
  return new Color_default(code, "hex");
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/analyze.js
var { log: log2, pow: pow10, floor: floor4, abs } = Math;
function analyze(data, key = null) {
  const r = {
    min: Number.MAX_VALUE,
    max: Number.MAX_VALUE * -1,
    sum: 0,
    values: [],
    count: 0
  };
  if (type_default(data) === "object") {
    data = Object.values(data);
  }
  data.forEach((val) => {
    if (key && type_default(val) === "object") val = val[key];
    if (val !== void 0 && val !== null && !isNaN(val)) {
      r.values.push(val);
      r.sum += val;
      if (val < r.min) r.min = val;
      if (val > r.max) r.max = val;
      r.count += 1;
    }
  });
  r.domain = [r.min, r.max];
  r.limits = (mode, num2) => limits(r, mode, num2);
  return r;
}
function limits(data, mode = "equal", num2 = 7) {
  if (type_default(data) == "array") {
    data = analyze(data);
  }
  const { min: min5, max: max5 } = data;
  const values = data.values.sort((a, b) => a - b);
  if (num2 === 1) {
    return [min5, max5];
  }
  const limits2 = [];
  if (mode.substr(0, 1) === "c") {
    limits2.push(min5);
    limits2.push(max5);
  }
  if (mode.substr(0, 1) === "e") {
    limits2.push(min5);
    for (let i = 1; i < num2; i++) {
      limits2.push(min5 + i / num2 * (max5 - min5));
    }
    limits2.push(max5);
  } else if (mode.substr(0, 1) === "l") {
    if (min5 <= 0) {
      throw new Error(
        "Logarithmic scales are only possible for values > 0"
      );
    }
    const min_log = Math.LOG10E * log2(min5);
    const max_log = Math.LOG10E * log2(max5);
    limits2.push(min5);
    for (let i = 1; i < num2; i++) {
      limits2.push(pow10(10, min_log + i / num2 * (max_log - min_log)));
    }
    limits2.push(max5);
  } else if (mode.substr(0, 1) === "q") {
    limits2.push(min5);
    for (let i = 1; i < num2; i++) {
      const p = (values.length - 1) * i / num2;
      const pb = floor4(p);
      if (pb === p) {
        limits2.push(values[pb]);
      } else {
        const pr = p - pb;
        limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
      }
    }
    limits2.push(max5);
  } else if (mode.substr(0, 1) === "k") {
    let cluster;
    const n = values.length;
    const assignments = new Array(n);
    const clusterSizes = new Array(num2);
    let repeat = true;
    let nb_iters = 0;
    let centroids = null;
    centroids = [];
    centroids.push(min5);
    for (let i = 1; i < num2; i++) {
      centroids.push(min5 + i / num2 * (max5 - min5));
    }
    centroids.push(max5);
    while (repeat) {
      for (let j = 0; j < num2; j++) {
        clusterSizes[j] = 0;
      }
      for (let i = 0; i < n; i++) {
        const value = values[i];
        let mindist = Number.MAX_VALUE;
        let best;
        for (let j = 0; j < num2; j++) {
          const dist = abs(centroids[j] - value);
          if (dist < mindist) {
            mindist = dist;
            best = j;
          }
          clusterSizes[best]++;
          assignments[i] = best;
        }
      }
      const newCentroids = new Array(num2);
      for (let j = 0; j < num2; j++) {
        newCentroids[j] = null;
      }
      for (let i = 0; i < n; i++) {
        cluster = assignments[i];
        if (newCentroids[cluster] === null) {
          newCentroids[cluster] = values[i];
        } else {
          newCentroids[cluster] += values[i];
        }
      }
      for (let j = 0; j < num2; j++) {
        newCentroids[j] *= 1 / clusterSizes[j];
      }
      repeat = false;
      for (let j = 0; j < num2; j++) {
        if (newCentroids[j] !== centroids[j]) {
          repeat = true;
          break;
        }
      }
      centroids = newCentroids;
      nb_iters++;
      if (nb_iters > 200) {
        repeat = false;
      }
    }
    const kClusters = {};
    for (let j = 0; j < num2; j++) {
      kClusters[j] = [];
    }
    for (let i = 0; i < n; i++) {
      cluster = assignments[i];
      kClusters[cluster].push(values[i]);
    }
    let tmpKMeansBreaks = [];
    for (let j = 0; j < num2; j++) {
      tmpKMeansBreaks.push(kClusters[j][0]);
      tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
    }
    tmpKMeansBreaks = tmpKMeansBreaks.sort((a, b) => a - b);
    limits2.push(tmpKMeansBreaks[0]);
    for (let i = 1; i < tmpKMeansBreaks.length; i += 2) {
      const v = tmpKMeansBreaks[i];
      if (!isNaN(v) && limits2.indexOf(v) === -1) {
        limits2.push(v);
      }
    }
  }
  return limits2;
}

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/contrast.js
var contrast_default = (a, b) => {
  a = new Color_default(a);
  b = new Color_default(b);
  const l1 = a.luminance();
  const l2 = b.luminance();
  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/delta-e.js
var { sqrt: sqrt5, pow: pow11, min: min4, max: max4, atan2: atan23, abs: abs2, cos: cos5, sin: sin4, exp, PI: PI3 } = Math;
function delta_e_default(a, b, Kl = 1, Kc = 1, Kh = 1) {
  var rad2deg = function(rad) {
    return 360 * rad / (2 * PI3);
  };
  var deg2rad = function(deg) {
    return 2 * PI3 * deg / 360;
  };
  a = new Color_default(a);
  b = new Color_default(b);
  const [L1, a1, b1] = Array.from(a.lab());
  const [L2, a2, b2] = Array.from(b.lab());
  const avgL = (L1 + L2) / 2;
  const C1 = sqrt5(pow11(a1, 2) + pow11(b1, 2));
  const C2 = sqrt5(pow11(a2, 2) + pow11(b2, 2));
  const avgC = (C1 + C2) / 2;
  const G = 0.5 * (1 - sqrt5(pow11(avgC, 7) / (pow11(avgC, 7) + pow11(25, 7))));
  const a1p = a1 * (1 + G);
  const a2p = a2 * (1 + G);
  const C1p = sqrt5(pow11(a1p, 2) + pow11(b1, 2));
  const C2p = sqrt5(pow11(a2p, 2) + pow11(b2, 2));
  const avgCp = (C1p + C2p) / 2;
  const arctan1 = rad2deg(atan23(b1, a1p));
  const arctan2 = rad2deg(atan23(b2, a2p));
  const h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
  const h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
  const avgHp = abs2(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
  const T = 1 - 0.17 * cos5(deg2rad(avgHp - 30)) + 0.24 * cos5(deg2rad(2 * avgHp)) + 0.32 * cos5(deg2rad(3 * avgHp + 6)) - 0.2 * cos5(deg2rad(4 * avgHp - 63));
  let deltaHp = h2p - h1p;
  deltaHp = abs2(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
  deltaHp = 2 * sqrt5(C1p * C2p) * sin4(deg2rad(deltaHp) / 2);
  const deltaL = L2 - L1;
  const deltaCp = C2p - C1p;
  const sl = 1 + 0.015 * pow11(avgL - 50, 2) / sqrt5(20 + pow11(avgL - 50, 2));
  const sc = 1 + 0.045 * avgCp;
  const sh = 1 + 0.015 * avgCp * T;
  const deltaTheta = 30 * exp(-pow11((avgHp - 275) / 25, 2));
  const Rc = 2 * sqrt5(pow11(avgCp, 7) / (pow11(avgCp, 7) + pow11(25, 7)));
  const Rt = -Rc * sin4(2 * deg2rad(deltaTheta));
  const result = sqrt5(
    pow11(deltaL / (Kl * sl), 2) + pow11(deltaCp / (Kc * sc), 2) + pow11(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh))
  );
  return max4(0, min4(100, result));
}

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/distance.js
function distance_default(a, b, mode = "lab") {
  a = new Color_default(a);
  b = new Color_default(b);
  const l1 = a.get(mode);
  const l2 = b.get(mode);
  let sum_sq = 0;
  for (let i in l1) {
    const d = (l1[i] || 0) - (l2[i] || 0);
    sum_sq += d * d;
  }
  return Math.sqrt(sum_sq);
}

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/valid.js
var valid_default = (...args) => {
  try {
    new Color_default(...args);
    return true;
  } catch (e) {
    return false;
  }
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/utils/scales.js
var scales_default = {
  cool() {
    return scale_default([chroma_default.hsl(180, 1, 0.9), chroma_default.hsl(250, 0.7, 0.4)]);
  },
  hot() {
    return scale_default(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1]).mode(
      "rgb"
    );
  }
};

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/src/colors/colorbrewer.js
var colorbrewer = {
  // sequential
  OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
  PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
  BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
  Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
  BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
  YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
  YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
  Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
  RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
  Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
  YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
  Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
  GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
  Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
  YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
  PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
  Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
  PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
  Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
  // diverging
  Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
  RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
  RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
  PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
  PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
  RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
  BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
  RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
  PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
  // qualitative
  Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
  Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
  Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
  Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
  Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
  Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
  Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
  Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
};
for (let key of Object.keys(colorbrewer)) {
  colorbrewer[key.toLowerCase()] = colorbrewer[key];
}
var colorbrewer_default = colorbrewer;

// node_modules/.pnpm/chroma-js@2.6.0/node_modules/chroma-js/index.js
Object.assign(chroma_default, {
  average: average_default,
  bezier: bezier_default,
  blend: blend_default,
  cubehelix: cubehelix_default,
  mix: mix_default,
  interpolate: mix_default,
  random: random_default,
  scale: scale_default,
  analyze,
  contrast: contrast_default,
  deltaE: delta_e_default,
  distance: distance_default,
  limits,
  valid: valid_default,
  scales: scales_default,
  input: input_default,
  colors: w3cx11_default,
  brewer: colorbrewer_default
});
var chroma_js_default = chroma_default;
export {
  chroma_js_default as default
};
//# sourceMappingURL=chroma-js.js.map
