// node_modules/.pnpm/applesauce-core@0.7.0_typescript@5.6.2/node_modules/applesauce-core/dist/helpers/url.js
var convertToUrl = (url) => url instanceof URL ? url : new URL(url);
var getURLFilename = (url) => {
  var _a, _b;
  return ((_a = url.pathname.split("/").pop()) == null ? void 0 : _a.toLocaleLowerCase()) || ((_b = url.searchParams.get("filename")) == null ? void 0 : _b.toLocaleLowerCase());
};
var IMAGE_EXT = [".svg", ".gif", ".png", ".jpg", ".jpeg", ".webp", ".avif"];
var VIDEO_EXT = [".mp4", ".mkv", ".webm", ".mov"];
var STREAM_EXT = [".m3u8"];
var AUDIO_EXT = [".mp3", ".wav", ".ogg", ".aac"];
function isVisualMediaURL(url) {
  return isImageURL(url) || isVideoURL(url) || isStreamURL(url);
}
function isImageURL(url) {
  url = convertToUrl(url);
  const filename = getURLFilename(url);
  return !!filename && IMAGE_EXT.some((ext) => filename.endsWith(ext));
}
function isVideoURL(url) {
  url = convertToUrl(url);
  const filename = getURLFilename(url);
  return !!filename && VIDEO_EXT.some((ext) => filename.endsWith(ext));
}
function isStreamURL(url) {
  url = convertToUrl(url);
  const filename = getURLFilename(url);
  return !!filename && STREAM_EXT.some((ext) => filename.endsWith(ext));
}
function isAudioURL(url) {
  url = convertToUrl(url);
  const filename = getURLFilename(url);
  return !!filename && AUDIO_EXT.some((ext) => filename.endsWith(ext));
}

export {
  convertToUrl,
  getURLFilename,
  IMAGE_EXT,
  VIDEO_EXT,
  STREAM_EXT,
  AUDIO_EXT,
  isVisualMediaURL,
  isImageURL,
  isVideoURL,
  isStreamURL,
  isAudioURL
};
//# sourceMappingURL=chunk-3HQGVAVI.js.map
