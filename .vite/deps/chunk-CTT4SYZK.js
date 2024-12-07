// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/emoji.js
function getEmojiTag(event, code) {
  code = code.replace(/^:|:$/g, "").toLocaleLowerCase();
  return event.tags.filter((t) => t[0] === "emoji" && t[1] && t[2]).find((t) => t[1].toLowerCase() === code);
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/string.js
function isHex(str) {
  if (str == null ? void 0 : str.match(/^[0-9a-f]+$/i))
    return true;
  return false;
}
function isHexKey(key) {
  var _a;
  if ((_a = key == null ? void 0 : key.toLowerCase()) == null ? void 0 : _a.match(/^[0-9a-f]{64}$/))
    return true;
  return false;
}
function stripInvisibleChar(str) {
  return str && str.replaceAll(/[\p{Cf}\p{Zs}]/gu, "");
}

// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/hashtag.js
function getHashtagTag(event, hashtag) {
  hashtag = stripInvisibleChar(hashtag.replace(/^#/, "").toLocaleLowerCase());
  return event.tags.filter((t) => t[0] === "t" && t[1]).find((t) => stripInvisibleChar(t[1].toLowerCase()) === hashtag);
}

export {
  getEmojiTag,
  isHex,
  isHexKey,
  stripInvisibleChar,
  getHashtagTag
};
//# sourceMappingURL=chunk-CTT4SYZK.js.map
