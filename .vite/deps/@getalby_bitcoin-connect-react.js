import "./chunk-LFEHL7GC.js";
import {
  base58check,
  utils
} from "./chunk-ZX3YKJE4.js";
import {
  require_react
} from "./chunk-QZ55VL3A.js";
import {
  hkdf
} from "./chunk-3QMXQ46N.js";
import {
  hmac,
  sha256
} from "./chunk-43SEAG5C.js";
import {
  base64,
  bech32
} from "./chunk-UT7ZQG2B.js";
import {
  bytesToHex,
  concatBytes,
  hexToBytes,
  randomBytes
} from "./chunk-WVX5ONCR.js";
import {
  __commonJS,
  __export,
  __publicField,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/qrcode-generator@1.4.4/node_modules/qrcode-generator/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/.pnpm/qrcode-generator@1.4.4/node_modules/qrcode-generator/qrcode.js"(exports, module) {
    var qrcode = function() {
      var qrcode2 = function(typeNumber, errorCorrectionLevel) {
        var PAD0 = 236;
        var PAD1 = 17;
        var _typeNumber = typeNumber;
        var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
        var _modules = null;
        var _moduleCount = 0;
        var _dataCache = null;
        var _dataList = [];
        var _this = {};
        var makeImpl = function(test2, maskPattern) {
          _moduleCount = _typeNumber * 4 + 17;
          _modules = function(moduleCount) {
            var modules = new Array(moduleCount);
            for (var row = 0; row < moduleCount; row += 1) {
              modules[row] = new Array(moduleCount);
              for (var col = 0; col < moduleCount; col += 1) {
                modules[row][col] = null;
              }
            }
            return modules;
          }(_moduleCount);
          setupPositionProbePattern(0, 0);
          setupPositionProbePattern(_moduleCount - 7, 0);
          setupPositionProbePattern(0, _moduleCount - 7);
          setupPositionAdjustPattern();
          setupTimingPattern();
          setupTypeInfo(test2, maskPattern);
          if (_typeNumber >= 7) {
            setupTypeNumber(test2);
          }
          if (_dataCache == null) {
            _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
          }
          mapData(_dataCache, maskPattern);
        };
        var setupPositionProbePattern = function(row, col) {
          for (var r2 = -1; r2 <= 7; r2 += 1) {
            if (row + r2 <= -1 || _moduleCount <= row + r2) continue;
            for (var c4 = -1; c4 <= 7; c4 += 1) {
              if (col + c4 <= -1 || _moduleCount <= col + c4) continue;
              if (0 <= r2 && r2 <= 6 && (c4 == 0 || c4 == 6) || 0 <= c4 && c4 <= 6 && (r2 == 0 || r2 == 6) || 2 <= r2 && r2 <= 4 && 2 <= c4 && c4 <= 4) {
                _modules[row + r2][col + c4] = true;
              } else {
                _modules[row + r2][col + c4] = false;
              }
            }
          }
        };
        var getBestMaskPattern = function() {
          var minLostPoint = 0;
          var pattern = 0;
          for (var i3 = 0; i3 < 8; i3 += 1) {
            makeImpl(true, i3);
            var lostPoint = QRUtil.getLostPoint(_this);
            if (i3 == 0 || minLostPoint > lostPoint) {
              minLostPoint = lostPoint;
              pattern = i3;
            }
          }
          return pattern;
        };
        var setupTimingPattern = function() {
          for (var r2 = 8; r2 < _moduleCount - 8; r2 += 1) {
            if (_modules[r2][6] != null) {
              continue;
            }
            _modules[r2][6] = r2 % 2 == 0;
          }
          for (var c4 = 8; c4 < _moduleCount - 8; c4 += 1) {
            if (_modules[6][c4] != null) {
              continue;
            }
            _modules[6][c4] = c4 % 2 == 0;
          }
        };
        var setupPositionAdjustPattern = function() {
          var pos = QRUtil.getPatternPosition(_typeNumber);
          for (var i3 = 0; i3 < pos.length; i3 += 1) {
            for (var j3 = 0; j3 < pos.length; j3 += 1) {
              var row = pos[i3];
              var col = pos[j3];
              if (_modules[row][col] != null) {
                continue;
              }
              for (var r2 = -2; r2 <= 2; r2 += 1) {
                for (var c4 = -2; c4 <= 2; c4 += 1) {
                  if (r2 == -2 || r2 == 2 || c4 == -2 || c4 == 2 || r2 == 0 && c4 == 0) {
                    _modules[row + r2][col + c4] = true;
                  } else {
                    _modules[row + r2][col + c4] = false;
                  }
                }
              }
            }
          }
        };
        var setupTypeNumber = function(test2) {
          var bits = QRUtil.getBCHTypeNumber(_typeNumber);
          for (var i3 = 0; i3 < 18; i3 += 1) {
            var mod2 = !test2 && (bits >> i3 & 1) == 1;
            _modules[Math.floor(i3 / 3)][i3 % 3 + _moduleCount - 8 - 3] = mod2;
          }
          for (var i3 = 0; i3 < 18; i3 += 1) {
            var mod2 = !test2 && (bits >> i3 & 1) == 1;
            _modules[i3 % 3 + _moduleCount - 8 - 3][Math.floor(i3 / 3)] = mod2;
          }
        };
        var setupTypeInfo = function(test2, maskPattern) {
          var data = _errorCorrectionLevel << 3 | maskPattern;
          var bits = QRUtil.getBCHTypeInfo(data);
          for (var i3 = 0; i3 < 15; i3 += 1) {
            var mod2 = !test2 && (bits >> i3 & 1) == 1;
            if (i3 < 6) {
              _modules[i3][8] = mod2;
            } else if (i3 < 8) {
              _modules[i3 + 1][8] = mod2;
            } else {
              _modules[_moduleCount - 15 + i3][8] = mod2;
            }
          }
          for (var i3 = 0; i3 < 15; i3 += 1) {
            var mod2 = !test2 && (bits >> i3 & 1) == 1;
            if (i3 < 8) {
              _modules[8][_moduleCount - i3 - 1] = mod2;
            } else if (i3 < 9) {
              _modules[8][15 - i3 - 1 + 1] = mod2;
            } else {
              _modules[8][15 - i3 - 1] = mod2;
            }
          }
          _modules[_moduleCount - 8][8] = !test2;
        };
        var mapData = function(data, maskPattern) {
          var inc = -1;
          var row = _moduleCount - 1;
          var bitIndex = 7;
          var byteIndex = 0;
          var maskFunc = QRUtil.getMaskFunction(maskPattern);
          for (var col = _moduleCount - 1; col > 0; col -= 2) {
            if (col == 6) col -= 1;
            while (true) {
              for (var c4 = 0; c4 < 2; c4 += 1) {
                if (_modules[row][col - c4] == null) {
                  var dark = false;
                  if (byteIndex < data.length) {
                    dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                  }
                  var mask = maskFunc(row, col - c4);
                  if (mask) {
                    dark = !dark;
                  }
                  _modules[row][col - c4] = dark;
                  bitIndex -= 1;
                  if (bitIndex == -1) {
                    byteIndex += 1;
                    bitIndex = 7;
                  }
                }
              }
              row += inc;
              if (row < 0 || _moduleCount <= row) {
                row -= inc;
                inc = -inc;
                break;
              }
            }
          }
        };
        var createBytes = function(buffer, rsBlocks) {
          var offset = 0;
          var maxDcCount = 0;
          var maxEcCount = 0;
          var dcdata = new Array(rsBlocks.length);
          var ecdata = new Array(rsBlocks.length);
          for (var r2 = 0; r2 < rsBlocks.length; r2 += 1) {
            var dcCount = rsBlocks[r2].dataCount;
            var ecCount = rsBlocks[r2].totalCount - dcCount;
            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);
            dcdata[r2] = new Array(dcCount);
            for (var i3 = 0; i3 < dcdata[r2].length; i3 += 1) {
              dcdata[r2][i3] = 255 & buffer.getBuffer()[i3 + offset];
            }
            offset += dcCount;
            var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
            var rawPoly = qrPolynomial(dcdata[r2], rsPoly.getLength() - 1);
            var modPoly = rawPoly.mod(rsPoly);
            ecdata[r2] = new Array(rsPoly.getLength() - 1);
            for (var i3 = 0; i3 < ecdata[r2].length; i3 += 1) {
              var modIndex = i3 + modPoly.getLength() - ecdata[r2].length;
              ecdata[r2][i3] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
            }
          }
          var totalCodeCount = 0;
          for (var i3 = 0; i3 < rsBlocks.length; i3 += 1) {
            totalCodeCount += rsBlocks[i3].totalCount;
          }
          var data = new Array(totalCodeCount);
          var index = 0;
          for (var i3 = 0; i3 < maxDcCount; i3 += 1) {
            for (var r2 = 0; r2 < rsBlocks.length; r2 += 1) {
              if (i3 < dcdata[r2].length) {
                data[index] = dcdata[r2][i3];
                index += 1;
              }
            }
          }
          for (var i3 = 0; i3 < maxEcCount; i3 += 1) {
            for (var r2 = 0; r2 < rsBlocks.length; r2 += 1) {
              if (i3 < ecdata[r2].length) {
                data[index] = ecdata[r2][i3];
                index += 1;
              }
            }
          }
          return data;
        };
        var createData = function(typeNumber2, errorCorrectionLevel2, dataList) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
          var buffer = qrBitBuffer();
          for (var i3 = 0; i3 < dataList.length; i3 += 1) {
            var data = dataList[i3];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
            data.write(buffer);
          }
          var totalDataCount = 0;
          for (var i3 = 0; i3 < rsBlocks.length; i3 += 1) {
            totalDataCount += rsBlocks[i3].dataCount;
          }
          if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
          }
          if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
          }
          while (buffer.getLengthInBits() % 8 != 0) {
            buffer.putBit(false);
          }
          while (true) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }
            buffer.put(PAD0, 8);
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }
            buffer.put(PAD1, 8);
          }
          return createBytes(buffer, rsBlocks);
        };
        _this.addData = function(data, mode) {
          mode = mode || "Byte";
          var newData = null;
          switch (mode) {
            case "Numeric":
              newData = qrNumber(data);
              break;
            case "Alphanumeric":
              newData = qrAlphaNum(data);
              break;
            case "Byte":
              newData = qr8BitByte(data);
              break;
            case "Kanji":
              newData = qrKanji(data);
              break;
            default:
              throw "mode:" + mode;
          }
          _dataList.push(newData);
          _dataCache = null;
        };
        _this.isDark = function(row, col) {
          if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
            throw row + "," + col;
          }
          return _modules[row][col];
        };
        _this.getModuleCount = function() {
          return _moduleCount;
        };
        _this.make = function() {
          if (_typeNumber < 1) {
            var typeNumber2 = 1;
            for (; typeNumber2 < 40; typeNumber2++) {
              var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
              var buffer = qrBitBuffer();
              for (var i3 = 0; i3 < _dataList.length; i3++) {
                var data = _dataList[i3];
                buffer.put(data.getMode(), 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
                data.write(buffer);
              }
              var totalDataCount = 0;
              for (var i3 = 0; i3 < rsBlocks.length; i3++) {
                totalDataCount += rsBlocks[i3].dataCount;
              }
              if (buffer.getLengthInBits() <= totalDataCount * 8) {
                break;
              }
            }
            _typeNumber = typeNumber2;
          }
          makeImpl(false, getBestMaskPattern());
        };
        _this.createTableTag = function(cellSize, margin) {
          cellSize = cellSize || 2;
          margin = typeof margin == "undefined" ? cellSize * 4 : margin;
          var qrHtml = "";
          qrHtml += '<table style="';
          qrHtml += " border-width: 0px; border-style: none;";
          qrHtml += " border-collapse: collapse;";
          qrHtml += " padding: 0px; margin: " + margin + "px;";
          qrHtml += '">';
          qrHtml += "<tbody>";
          for (var r2 = 0; r2 < _this.getModuleCount(); r2 += 1) {
            qrHtml += "<tr>";
            for (var c4 = 0; c4 < _this.getModuleCount(); c4 += 1) {
              qrHtml += '<td style="';
              qrHtml += " border-width: 0px; border-style: none;";
              qrHtml += " border-collapse: collapse;";
              qrHtml += " padding: 0px; margin: 0px;";
              qrHtml += " width: " + cellSize + "px;";
              qrHtml += " height: " + cellSize + "px;";
              qrHtml += " background-color: ";
              qrHtml += _this.isDark(r2, c4) ? "#000000" : "#ffffff";
              qrHtml += ";";
              qrHtml += '"/>';
            }
            qrHtml += "</tr>";
          }
          qrHtml += "</tbody>";
          qrHtml += "</table>";
          return qrHtml;
        };
        _this.createSvgTag = function(cellSize, margin, alt, title) {
          var opts = {};
          if (typeof arguments[0] == "object") {
            opts = arguments[0];
            cellSize = opts.cellSize;
            margin = opts.margin;
            alt = opts.alt;
            title = opts.title;
          }
          cellSize = cellSize || 2;
          margin = typeof margin == "undefined" ? cellSize * 4 : margin;
          alt = typeof alt === "string" ? { text: alt } : alt || {};
          alt.text = alt.text || null;
          alt.id = alt.text ? alt.id || "qrcode-description" : null;
          title = typeof title === "string" ? { text: title } : title || {};
          title.text = title.text || null;
          title.id = title.text ? title.id || "qrcode-title" : null;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var c4, mc, r2, mr2, qrSvg = "", rect;
          rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
          qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
          qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
          qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
          qrSvg += ' preserveAspectRatio="xMinYMin meet"';
          qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
          qrSvg += ">";
          qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
          qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
          qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
          qrSvg += '<path d="';
          for (r2 = 0; r2 < _this.getModuleCount(); r2 += 1) {
            mr2 = r2 * cellSize + margin;
            for (c4 = 0; c4 < _this.getModuleCount(); c4 += 1) {
              if (_this.isDark(r2, c4)) {
                mc = c4 * cellSize + margin;
                qrSvg += "M" + mc + "," + mr2 + rect;
              }
            }
          }
          qrSvg += '" stroke="transparent" fill="black"/>';
          qrSvg += "</svg>";
          return qrSvg;
        };
        _this.createDataURL = function(cellSize, margin) {
          cellSize = cellSize || 2;
          margin = typeof margin == "undefined" ? cellSize * 4 : margin;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;
          return createDataURL(size, size, function(x4, y3) {
            if (min <= x4 && x4 < max && min <= y3 && y3 < max) {
              var c4 = Math.floor((x4 - min) / cellSize);
              var r2 = Math.floor((y3 - min) / cellSize);
              return _this.isDark(r2, c4) ? 0 : 1;
            } else {
              return 1;
            }
          });
        };
        _this.createImgTag = function(cellSize, margin, alt) {
          cellSize = cellSize || 2;
          margin = typeof margin == "undefined" ? cellSize * 4 : margin;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var img = "";
          img += "<img";
          img += ' src="';
          img += _this.createDataURL(cellSize, margin);
          img += '"';
          img += ' width="';
          img += size;
          img += '"';
          img += ' height="';
          img += size;
          img += '"';
          if (alt) {
            img += ' alt="';
            img += escapeXml(alt);
            img += '"';
          }
          img += "/>";
          return img;
        };
        var escapeXml = function(s3) {
          var escaped = "";
          for (var i3 = 0; i3 < s3.length; i3 += 1) {
            var c4 = s3.charAt(i3);
            switch (c4) {
              case "<":
                escaped += "&lt;";
                break;
              case ">":
                escaped += "&gt;";
                break;
              case "&":
                escaped += "&amp;";
                break;
              case '"':
                escaped += "&quot;";
                break;
              default:
                escaped += c4;
                break;
            }
          }
          return escaped;
        };
        var _createHalfASCII = function(margin) {
          var cellSize = 1;
          margin = typeof margin == "undefined" ? cellSize * 2 : margin;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;
          var y3, x4, r1, r2, p5;
          var blocks = {
            "██": "█",
            "█ ": "▀",
            " █": "▄",
            "  ": " "
          };
          var blocksLastLineNoMargin = {
            "██": "▀",
            "█ ": "▀",
            " █": " ",
            "  ": " "
          };
          var ascii = "";
          for (y3 = 0; y3 < size; y3 += 2) {
            r1 = Math.floor((y3 - min) / cellSize);
            r2 = Math.floor((y3 + 1 - min) / cellSize);
            for (x4 = 0; x4 < size; x4 += 1) {
              p5 = "█";
              if (min <= x4 && x4 < max && min <= y3 && y3 < max && _this.isDark(r1, Math.floor((x4 - min) / cellSize))) {
                p5 = " ";
              }
              if (min <= x4 && x4 < max && min <= y3 + 1 && y3 + 1 < max && _this.isDark(r2, Math.floor((x4 - min) / cellSize))) {
                p5 += " ";
              } else {
                p5 += "█";
              }
              ascii += margin < 1 && y3 + 1 >= max ? blocksLastLineNoMargin[p5] : blocks[p5];
            }
            ascii += "\n";
          }
          if (size % 2 && margin > 0) {
            return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("▀");
          }
          return ascii.substring(0, ascii.length - 1);
        };
        _this.createASCII = function(cellSize, margin) {
          cellSize = cellSize || 1;
          if (cellSize < 2) {
            return _createHalfASCII(margin);
          }
          cellSize -= 1;
          margin = typeof margin == "undefined" ? cellSize * 2 : margin;
          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;
          var y3, x4, r2, p5;
          var white = Array(cellSize + 1).join("██");
          var black = Array(cellSize + 1).join("  ");
          var ascii = "";
          var line = "";
          for (y3 = 0; y3 < size; y3 += 1) {
            r2 = Math.floor((y3 - min) / cellSize);
            line = "";
            for (x4 = 0; x4 < size; x4 += 1) {
              p5 = 1;
              if (min <= x4 && x4 < max && min <= y3 && y3 < max && _this.isDark(r2, Math.floor((x4 - min) / cellSize))) {
                p5 = 0;
              }
              line += p5 ? white : black;
            }
            for (r2 = 0; r2 < cellSize; r2 += 1) {
              ascii += line + "\n";
            }
          }
          return ascii.substring(0, ascii.length - 1);
        };
        _this.renderTo2dContext = function(context, cellSize) {
          cellSize = cellSize || 2;
          var length = _this.getModuleCount();
          for (var row = 0; row < length; row++) {
            for (var col = 0; col < length; col++) {
              context.fillStyle = _this.isDark(row, col) ? "black" : "white";
              context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
            }
          }
        };
        return _this;
      };
      qrcode2.stringToBytesFuncs = {
        "default": function(s3) {
          var bytes3 = [];
          for (var i3 = 0; i3 < s3.length; i3 += 1) {
            var c4 = s3.charCodeAt(i3);
            bytes3.push(c4 & 255);
          }
          return bytes3;
        }
      };
      qrcode2.stringToBytes = qrcode2.stringToBytesFuncs["default"];
      qrcode2.createStringToBytes = function(unicodeData, numChars) {
        var unicodeMap = function() {
          var bin = base64DecodeInputStream(unicodeData);
          var read = function() {
            var b4 = bin.read();
            if (b4 == -1) throw "eof";
            return b4;
          };
          var count = 0;
          var unicodeMap2 = {};
          while (true) {
            var b0 = bin.read();
            if (b0 == -1) break;
            var b1 = read();
            var b22 = read();
            var b32 = read();
            var k3 = String.fromCharCode(b0 << 8 | b1);
            var v3 = b22 << 8 | b32;
            unicodeMap2[k3] = v3;
            count += 1;
          }
          if (count != numChars) {
            throw count + " != " + numChars;
          }
          return unicodeMap2;
        }();
        var unknownChar = "?".charCodeAt(0);
        return function(s3) {
          var bytes3 = [];
          for (var i3 = 0; i3 < s3.length; i3 += 1) {
            var c4 = s3.charCodeAt(i3);
            if (c4 < 128) {
              bytes3.push(c4);
            } else {
              var b4 = unicodeMap[s3.charAt(i3)];
              if (typeof b4 == "number") {
                if ((b4 & 255) == b4) {
                  bytes3.push(b4);
                } else {
                  bytes3.push(b4 >>> 8);
                  bytes3.push(b4 & 255);
                }
              } else {
                bytes3.push(unknownChar);
              }
            }
          }
          return bytes3;
        };
      };
      var QRMode = {
        MODE_NUMBER: 1 << 0,
        MODE_ALPHA_NUM: 1 << 1,
        MODE_8BIT_BYTE: 1 << 2,
        MODE_KANJI: 1 << 3
      };
      var QRErrorCorrectionLevel = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
      };
      var QRMaskPattern = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };
      var QRUtil = function() {
        var PATTERN_POSITION_TABLE = [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170]
        ];
        var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
        var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
        var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
        var _this = {};
        var getBCHDigit = function(data) {
          var digit = 0;
          while (data != 0) {
            digit += 1;
            data >>>= 1;
          }
          return digit;
        };
        _this.getBCHTypeInfo = function(data) {
          var d5 = data << 10;
          while (getBCHDigit(d5) - getBCHDigit(G15) >= 0) {
            d5 ^= G15 << getBCHDigit(d5) - getBCHDigit(G15);
          }
          return (data << 10 | d5) ^ G15_MASK;
        };
        _this.getBCHTypeNumber = function(data) {
          var d5 = data << 12;
          while (getBCHDigit(d5) - getBCHDigit(G18) >= 0) {
            d5 ^= G18 << getBCHDigit(d5) - getBCHDigit(G18);
          }
          return data << 12 | d5;
        };
        _this.getPatternPosition = function(typeNumber) {
          return PATTERN_POSITION_TABLE[typeNumber - 1];
        };
        _this.getMaskFunction = function(maskPattern) {
          switch (maskPattern) {
            case QRMaskPattern.PATTERN000:
              return function(i3, j3) {
                return (i3 + j3) % 2 == 0;
              };
            case QRMaskPattern.PATTERN001:
              return function(i3, j3) {
                return i3 % 2 == 0;
              };
            case QRMaskPattern.PATTERN010:
              return function(i3, j3) {
                return j3 % 3 == 0;
              };
            case QRMaskPattern.PATTERN011:
              return function(i3, j3) {
                return (i3 + j3) % 3 == 0;
              };
            case QRMaskPattern.PATTERN100:
              return function(i3, j3) {
                return (Math.floor(i3 / 2) + Math.floor(j3 / 3)) % 2 == 0;
              };
            case QRMaskPattern.PATTERN101:
              return function(i3, j3) {
                return i3 * j3 % 2 + i3 * j3 % 3 == 0;
              };
            case QRMaskPattern.PATTERN110:
              return function(i3, j3) {
                return (i3 * j3 % 2 + i3 * j3 % 3) % 2 == 0;
              };
            case QRMaskPattern.PATTERN111:
              return function(i3, j3) {
                return (i3 * j3 % 3 + (i3 + j3) % 2) % 2 == 0;
              };
            default:
              throw "bad maskPattern:" + maskPattern;
          }
        };
        _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
          var a3 = qrPolynomial([1], 0);
          for (var i3 = 0; i3 < errorCorrectLength; i3 += 1) {
            a3 = a3.multiply(qrPolynomial([1, QRMath.gexp(i3)], 0));
          }
          return a3;
        };
        _this.getLengthInBits = function(mode, type) {
          if (1 <= type && type < 10) {
            switch (mode) {
              case QRMode.MODE_NUMBER:
                return 10;
              case QRMode.MODE_ALPHA_NUM:
                return 9;
              case QRMode.MODE_8BIT_BYTE:
                return 8;
              case QRMode.MODE_KANJI:
                return 8;
              default:
                throw "mode:" + mode;
            }
          } else if (type < 27) {
            switch (mode) {
              case QRMode.MODE_NUMBER:
                return 12;
              case QRMode.MODE_ALPHA_NUM:
                return 11;
              case QRMode.MODE_8BIT_BYTE:
                return 16;
              case QRMode.MODE_KANJI:
                return 10;
              default:
                throw "mode:" + mode;
            }
          } else if (type < 41) {
            switch (mode) {
              case QRMode.MODE_NUMBER:
                return 14;
              case QRMode.MODE_ALPHA_NUM:
                return 13;
              case QRMode.MODE_8BIT_BYTE:
                return 16;
              case QRMode.MODE_KANJI:
                return 12;
              default:
                throw "mode:" + mode;
            }
          } else {
            throw "type:" + type;
          }
        };
        _this.getLostPoint = function(qrcode3) {
          var moduleCount = qrcode3.getModuleCount();
          var lostPoint = 0;
          for (var row = 0; row < moduleCount; row += 1) {
            for (var col = 0; col < moduleCount; col += 1) {
              var sameCount = 0;
              var dark = qrcode3.isDark(row, col);
              for (var r2 = -1; r2 <= 1; r2 += 1) {
                if (row + r2 < 0 || moduleCount <= row + r2) {
                  continue;
                }
                for (var c4 = -1; c4 <= 1; c4 += 1) {
                  if (col + c4 < 0 || moduleCount <= col + c4) {
                    continue;
                  }
                  if (r2 == 0 && c4 == 0) {
                    continue;
                  }
                  if (dark == qrcode3.isDark(row + r2, col + c4)) {
                    sameCount += 1;
                  }
                }
              }
              if (sameCount > 5) {
                lostPoint += 3 + sameCount - 5;
              }
            }
          }
          ;
          for (var row = 0; row < moduleCount - 1; row += 1) {
            for (var col = 0; col < moduleCount - 1; col += 1) {
              var count = 0;
              if (qrcode3.isDark(row, col)) count += 1;
              if (qrcode3.isDark(row + 1, col)) count += 1;
              if (qrcode3.isDark(row, col + 1)) count += 1;
              if (qrcode3.isDark(row + 1, col + 1)) count += 1;
              if (count == 0 || count == 4) {
                lostPoint += 3;
              }
            }
          }
          for (var row = 0; row < moduleCount; row += 1) {
            for (var col = 0; col < moduleCount - 6; col += 1) {
              if (qrcode3.isDark(row, col) && !qrcode3.isDark(row, col + 1) && qrcode3.isDark(row, col + 2) && qrcode3.isDark(row, col + 3) && qrcode3.isDark(row, col + 4) && !qrcode3.isDark(row, col + 5) && qrcode3.isDark(row, col + 6)) {
                lostPoint += 40;
              }
            }
          }
          for (var col = 0; col < moduleCount; col += 1) {
            for (var row = 0; row < moduleCount - 6; row += 1) {
              if (qrcode3.isDark(row, col) && !qrcode3.isDark(row + 1, col) && qrcode3.isDark(row + 2, col) && qrcode3.isDark(row + 3, col) && qrcode3.isDark(row + 4, col) && !qrcode3.isDark(row + 5, col) && qrcode3.isDark(row + 6, col)) {
                lostPoint += 40;
              }
            }
          }
          var darkCount = 0;
          for (var col = 0; col < moduleCount; col += 1) {
            for (var row = 0; row < moduleCount; row += 1) {
              if (qrcode3.isDark(row, col)) {
                darkCount += 1;
              }
            }
          }
          var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
          lostPoint += ratio * 10;
          return lostPoint;
        };
        return _this;
      }();
      var QRMath = function() {
        var EXP_TABLE = new Array(256);
        var LOG_TABLE = new Array(256);
        for (var i3 = 0; i3 < 8; i3 += 1) {
          EXP_TABLE[i3] = 1 << i3;
        }
        for (var i3 = 8; i3 < 256; i3 += 1) {
          EXP_TABLE[i3] = EXP_TABLE[i3 - 4] ^ EXP_TABLE[i3 - 5] ^ EXP_TABLE[i3 - 6] ^ EXP_TABLE[i3 - 8];
        }
        for (var i3 = 0; i3 < 255; i3 += 1) {
          LOG_TABLE[EXP_TABLE[i3]] = i3;
        }
        var _this = {};
        _this.glog = function(n2) {
          if (n2 < 1) {
            throw "glog(" + n2 + ")";
          }
          return LOG_TABLE[n2];
        };
        _this.gexp = function(n2) {
          while (n2 < 0) {
            n2 += 255;
          }
          while (n2 >= 256) {
            n2 -= 255;
          }
          return EXP_TABLE[n2];
        };
        return _this;
      }();
      function qrPolynomial(num, shift) {
        if (typeof num.length == "undefined") {
          throw num.length + "/" + shift;
        }
        var _num = function() {
          var offset = 0;
          while (offset < num.length && num[offset] == 0) {
            offset += 1;
          }
          var _num2 = new Array(num.length - offset + shift);
          for (var i3 = 0; i3 < num.length - offset; i3 += 1) {
            _num2[i3] = num[i3 + offset];
          }
          return _num2;
        }();
        var _this = {};
        _this.getAt = function(index) {
          return _num[index];
        };
        _this.getLength = function() {
          return _num.length;
        };
        _this.multiply = function(e2) {
          var num2 = new Array(_this.getLength() + e2.getLength() - 1);
          for (var i3 = 0; i3 < _this.getLength(); i3 += 1) {
            for (var j3 = 0; j3 < e2.getLength(); j3 += 1) {
              num2[i3 + j3] ^= QRMath.gexp(QRMath.glog(_this.getAt(i3)) + QRMath.glog(e2.getAt(j3)));
            }
          }
          return qrPolynomial(num2, 0);
        };
        _this.mod = function(e2) {
          if (_this.getLength() - e2.getLength() < 0) {
            return _this;
          }
          var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e2.getAt(0));
          var num2 = new Array(_this.getLength());
          for (var i3 = 0; i3 < _this.getLength(); i3 += 1) {
            num2[i3] = _this.getAt(i3);
          }
          for (var i3 = 0; i3 < e2.getLength(); i3 += 1) {
            num2[i3] ^= QRMath.gexp(QRMath.glog(e2.getAt(i3)) + ratio);
          }
          return qrPolynomial(num2, 0).mod(e2);
        };
        return _this;
      }
      ;
      var QRRSBlock = function() {
        var RS_BLOCK_TABLE = [
          // L
          // M
          // Q
          // H
          // 1
          [1, 26, 19],
          [1, 26, 16],
          [1, 26, 13],
          [1, 26, 9],
          // 2
          [1, 44, 34],
          [1, 44, 28],
          [1, 44, 22],
          [1, 44, 16],
          // 3
          [1, 70, 55],
          [1, 70, 44],
          [2, 35, 17],
          [2, 35, 13],
          // 4
          [1, 100, 80],
          [2, 50, 32],
          [2, 50, 24],
          [4, 25, 9],
          // 5
          [1, 134, 108],
          [2, 67, 43],
          [2, 33, 15, 2, 34, 16],
          [2, 33, 11, 2, 34, 12],
          // 6
          [2, 86, 68],
          [4, 43, 27],
          [4, 43, 19],
          [4, 43, 15],
          // 7
          [2, 98, 78],
          [4, 49, 31],
          [2, 32, 14, 4, 33, 15],
          [4, 39, 13, 1, 40, 14],
          // 8
          [2, 121, 97],
          [2, 60, 38, 2, 61, 39],
          [4, 40, 18, 2, 41, 19],
          [4, 40, 14, 2, 41, 15],
          // 9
          [2, 146, 116],
          [3, 58, 36, 2, 59, 37],
          [4, 36, 16, 4, 37, 17],
          [4, 36, 12, 4, 37, 13],
          // 10
          [2, 86, 68, 2, 87, 69],
          [4, 69, 43, 1, 70, 44],
          [6, 43, 19, 2, 44, 20],
          [6, 43, 15, 2, 44, 16],
          // 11
          [4, 101, 81],
          [1, 80, 50, 4, 81, 51],
          [4, 50, 22, 4, 51, 23],
          [3, 36, 12, 8, 37, 13],
          // 12
          [2, 116, 92, 2, 117, 93],
          [6, 58, 36, 2, 59, 37],
          [4, 46, 20, 6, 47, 21],
          [7, 42, 14, 4, 43, 15],
          // 13
          [4, 133, 107],
          [8, 59, 37, 1, 60, 38],
          [8, 44, 20, 4, 45, 21],
          [12, 33, 11, 4, 34, 12],
          // 14
          [3, 145, 115, 1, 146, 116],
          [4, 64, 40, 5, 65, 41],
          [11, 36, 16, 5, 37, 17],
          [11, 36, 12, 5, 37, 13],
          // 15
          [5, 109, 87, 1, 110, 88],
          [5, 65, 41, 5, 66, 42],
          [5, 54, 24, 7, 55, 25],
          [11, 36, 12, 7, 37, 13],
          // 16
          [5, 122, 98, 1, 123, 99],
          [7, 73, 45, 3, 74, 46],
          [15, 43, 19, 2, 44, 20],
          [3, 45, 15, 13, 46, 16],
          // 17
          [1, 135, 107, 5, 136, 108],
          [10, 74, 46, 1, 75, 47],
          [1, 50, 22, 15, 51, 23],
          [2, 42, 14, 17, 43, 15],
          // 18
          [5, 150, 120, 1, 151, 121],
          [9, 69, 43, 4, 70, 44],
          [17, 50, 22, 1, 51, 23],
          [2, 42, 14, 19, 43, 15],
          // 19
          [3, 141, 113, 4, 142, 114],
          [3, 70, 44, 11, 71, 45],
          [17, 47, 21, 4, 48, 22],
          [9, 39, 13, 16, 40, 14],
          // 20
          [3, 135, 107, 5, 136, 108],
          [3, 67, 41, 13, 68, 42],
          [15, 54, 24, 5, 55, 25],
          [15, 43, 15, 10, 44, 16],
          // 21
          [4, 144, 116, 4, 145, 117],
          [17, 68, 42],
          [17, 50, 22, 6, 51, 23],
          [19, 46, 16, 6, 47, 17],
          // 22
          [2, 139, 111, 7, 140, 112],
          [17, 74, 46],
          [7, 54, 24, 16, 55, 25],
          [34, 37, 13],
          // 23
          [4, 151, 121, 5, 152, 122],
          [4, 75, 47, 14, 76, 48],
          [11, 54, 24, 14, 55, 25],
          [16, 45, 15, 14, 46, 16],
          // 24
          [6, 147, 117, 4, 148, 118],
          [6, 73, 45, 14, 74, 46],
          [11, 54, 24, 16, 55, 25],
          [30, 46, 16, 2, 47, 17],
          // 25
          [8, 132, 106, 4, 133, 107],
          [8, 75, 47, 13, 76, 48],
          [7, 54, 24, 22, 55, 25],
          [22, 45, 15, 13, 46, 16],
          // 26
          [10, 142, 114, 2, 143, 115],
          [19, 74, 46, 4, 75, 47],
          [28, 50, 22, 6, 51, 23],
          [33, 46, 16, 4, 47, 17],
          // 27
          [8, 152, 122, 4, 153, 123],
          [22, 73, 45, 3, 74, 46],
          [8, 53, 23, 26, 54, 24],
          [12, 45, 15, 28, 46, 16],
          // 28
          [3, 147, 117, 10, 148, 118],
          [3, 73, 45, 23, 74, 46],
          [4, 54, 24, 31, 55, 25],
          [11, 45, 15, 31, 46, 16],
          // 29
          [7, 146, 116, 7, 147, 117],
          [21, 73, 45, 7, 74, 46],
          [1, 53, 23, 37, 54, 24],
          [19, 45, 15, 26, 46, 16],
          // 30
          [5, 145, 115, 10, 146, 116],
          [19, 75, 47, 10, 76, 48],
          [15, 54, 24, 25, 55, 25],
          [23, 45, 15, 25, 46, 16],
          // 31
          [13, 145, 115, 3, 146, 116],
          [2, 74, 46, 29, 75, 47],
          [42, 54, 24, 1, 55, 25],
          [23, 45, 15, 28, 46, 16],
          // 32
          [17, 145, 115],
          [10, 74, 46, 23, 75, 47],
          [10, 54, 24, 35, 55, 25],
          [19, 45, 15, 35, 46, 16],
          // 33
          [17, 145, 115, 1, 146, 116],
          [14, 74, 46, 21, 75, 47],
          [29, 54, 24, 19, 55, 25],
          [11, 45, 15, 46, 46, 16],
          // 34
          [13, 145, 115, 6, 146, 116],
          [14, 74, 46, 23, 75, 47],
          [44, 54, 24, 7, 55, 25],
          [59, 46, 16, 1, 47, 17],
          // 35
          [12, 151, 121, 7, 152, 122],
          [12, 75, 47, 26, 76, 48],
          [39, 54, 24, 14, 55, 25],
          [22, 45, 15, 41, 46, 16],
          // 36
          [6, 151, 121, 14, 152, 122],
          [6, 75, 47, 34, 76, 48],
          [46, 54, 24, 10, 55, 25],
          [2, 45, 15, 64, 46, 16],
          // 37
          [17, 152, 122, 4, 153, 123],
          [29, 74, 46, 14, 75, 47],
          [49, 54, 24, 10, 55, 25],
          [24, 45, 15, 46, 46, 16],
          // 38
          [4, 152, 122, 18, 153, 123],
          [13, 74, 46, 32, 75, 47],
          [48, 54, 24, 14, 55, 25],
          [42, 45, 15, 32, 46, 16],
          // 39
          [20, 147, 117, 4, 148, 118],
          [40, 75, 47, 7, 76, 48],
          [43, 54, 24, 22, 55, 25],
          [10, 45, 15, 67, 46, 16],
          // 40
          [19, 148, 118, 6, 149, 119],
          [18, 75, 47, 31, 76, 48],
          [34, 54, 24, 34, 55, 25],
          [20, 45, 15, 61, 46, 16]
        ];
        var qrRSBlock = function(totalCount, dataCount) {
          var _this2 = {};
          _this2.totalCount = totalCount;
          _this2.dataCount = dataCount;
          return _this2;
        };
        var _this = {};
        var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
          switch (errorCorrectionLevel) {
            case QRErrorCorrectionLevel.L:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
            case QRErrorCorrectionLevel.M:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
            case QRErrorCorrectionLevel.Q:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
            case QRErrorCorrectionLevel.H:
              return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
            default:
              return void 0;
          }
        };
        _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
          var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
          if (typeof rsBlock == "undefined") {
            throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
          }
          var length = rsBlock.length / 3;
          var list = [];
          for (var i3 = 0; i3 < length; i3 += 1) {
            var count = rsBlock[i3 * 3 + 0];
            var totalCount = rsBlock[i3 * 3 + 1];
            var dataCount = rsBlock[i3 * 3 + 2];
            for (var j3 = 0; j3 < count; j3 += 1) {
              list.push(qrRSBlock(totalCount, dataCount));
            }
          }
          return list;
        };
        return _this;
      }();
      var qrBitBuffer = function() {
        var _buffer = [];
        var _length = 0;
        var _this = {};
        _this.getBuffer = function() {
          return _buffer;
        };
        _this.getAt = function(index) {
          var bufIndex = Math.floor(index / 8);
          return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
        };
        _this.put = function(num, length) {
          for (var i3 = 0; i3 < length; i3 += 1) {
            _this.putBit((num >>> length - i3 - 1 & 1) == 1);
          }
        };
        _this.getLengthInBits = function() {
          return _length;
        };
        _this.putBit = function(bit) {
          var bufIndex = Math.floor(_length / 8);
          if (_buffer.length <= bufIndex) {
            _buffer.push(0);
          }
          if (bit) {
            _buffer[bufIndex] |= 128 >>> _length % 8;
          }
          _length += 1;
        };
        return _this;
      };
      var qrNumber = function(data) {
        var _mode = QRMode.MODE_NUMBER;
        var _data = data;
        var _this = {};
        _this.getMode = function() {
          return _mode;
        };
        _this.getLength = function(buffer) {
          return _data.length;
        };
        _this.write = function(buffer) {
          var data2 = _data;
          var i3 = 0;
          while (i3 + 2 < data2.length) {
            buffer.put(strToNum(data2.substring(i3, i3 + 3)), 10);
            i3 += 3;
          }
          if (i3 < data2.length) {
            if (data2.length - i3 == 1) {
              buffer.put(strToNum(data2.substring(i3, i3 + 1)), 4);
            } else if (data2.length - i3 == 2) {
              buffer.put(strToNum(data2.substring(i3, i3 + 2)), 7);
            }
          }
        };
        var strToNum = function(s3) {
          var num = 0;
          for (var i3 = 0; i3 < s3.length; i3 += 1) {
            num = num * 10 + chatToNum(s3.charAt(i3));
          }
          return num;
        };
        var chatToNum = function(c4) {
          if ("0" <= c4 && c4 <= "9") {
            return c4.charCodeAt(0) - "0".charCodeAt(0);
          }
          throw "illegal char :" + c4;
        };
        return _this;
      };
      var qrAlphaNum = function(data) {
        var _mode = QRMode.MODE_ALPHA_NUM;
        var _data = data;
        var _this = {};
        _this.getMode = function() {
          return _mode;
        };
        _this.getLength = function(buffer) {
          return _data.length;
        };
        _this.write = function(buffer) {
          var s3 = _data;
          var i3 = 0;
          while (i3 + 1 < s3.length) {
            buffer.put(
              getCode(s3.charAt(i3)) * 45 + getCode(s3.charAt(i3 + 1)),
              11
            );
            i3 += 2;
          }
          if (i3 < s3.length) {
            buffer.put(getCode(s3.charAt(i3)), 6);
          }
        };
        var getCode = function(c4) {
          if ("0" <= c4 && c4 <= "9") {
            return c4.charCodeAt(0) - "0".charCodeAt(0);
          } else if ("A" <= c4 && c4 <= "Z") {
            return c4.charCodeAt(0) - "A".charCodeAt(0) + 10;
          } else {
            switch (c4) {
              case " ":
                return 36;
              case "$":
                return 37;
              case "%":
                return 38;
              case "*":
                return 39;
              case "+":
                return 40;
              case "-":
                return 41;
              case ".":
                return 42;
              case "/":
                return 43;
              case ":":
                return 44;
              default:
                throw "illegal char :" + c4;
            }
          }
        };
        return _this;
      };
      var qr8BitByte = function(data) {
        var _mode = QRMode.MODE_8BIT_BYTE;
        var _data = data;
        var _bytes = qrcode2.stringToBytes(data);
        var _this = {};
        _this.getMode = function() {
          return _mode;
        };
        _this.getLength = function(buffer) {
          return _bytes.length;
        };
        _this.write = function(buffer) {
          for (var i3 = 0; i3 < _bytes.length; i3 += 1) {
            buffer.put(_bytes[i3], 8);
          }
        };
        return _this;
      };
      var qrKanji = function(data) {
        var _mode = QRMode.MODE_KANJI;
        var _data = data;
        var stringToBytes = qrcode2.stringToBytesFuncs["SJIS"];
        if (!stringToBytes) {
          throw "sjis not supported.";
        }
        !function(c4, code) {
          var test2 = stringToBytes(c4);
          if (test2.length != 2 || (test2[0] << 8 | test2[1]) != code) {
            throw "sjis not supported.";
          }
        }("友", 38726);
        var _bytes = stringToBytes(data);
        var _this = {};
        _this.getMode = function() {
          return _mode;
        };
        _this.getLength = function(buffer) {
          return ~~(_bytes.length / 2);
        };
        _this.write = function(buffer) {
          var data2 = _bytes;
          var i3 = 0;
          while (i3 + 1 < data2.length) {
            var c4 = (255 & data2[i3]) << 8 | 255 & data2[i3 + 1];
            if (33088 <= c4 && c4 <= 40956) {
              c4 -= 33088;
            } else if (57408 <= c4 && c4 <= 60351) {
              c4 -= 49472;
            } else {
              throw "illegal char at " + (i3 + 1) + "/" + c4;
            }
            c4 = (c4 >>> 8 & 255) * 192 + (c4 & 255);
            buffer.put(c4, 13);
            i3 += 2;
          }
          if (i3 < data2.length) {
            throw "illegal char at " + (i3 + 1);
          }
        };
        return _this;
      };
      var byteArrayOutputStream = function() {
        var _bytes = [];
        var _this = {};
        _this.writeByte = function(b4) {
          _bytes.push(b4 & 255);
        };
        _this.writeShort = function(i3) {
          _this.writeByte(i3);
          _this.writeByte(i3 >>> 8);
        };
        _this.writeBytes = function(b4, off, len) {
          off = off || 0;
          len = len || b4.length;
          for (var i3 = 0; i3 < len; i3 += 1) {
            _this.writeByte(b4[i3 + off]);
          }
        };
        _this.writeString = function(s3) {
          for (var i3 = 0; i3 < s3.length; i3 += 1) {
            _this.writeByte(s3.charCodeAt(i3));
          }
        };
        _this.toByteArray = function() {
          return _bytes;
        };
        _this.toString = function() {
          var s3 = "";
          s3 += "[";
          for (var i3 = 0; i3 < _bytes.length; i3 += 1) {
            if (i3 > 0) {
              s3 += ",";
            }
            s3 += _bytes[i3];
          }
          s3 += "]";
          return s3;
        };
        return _this;
      };
      var base64EncodeOutputStream = function() {
        var _buffer = 0;
        var _buflen = 0;
        var _length = 0;
        var _base64 = "";
        var _this = {};
        var writeEncoded = function(b4) {
          _base64 += String.fromCharCode(encode(b4 & 63));
        };
        var encode = function(n2) {
          if (n2 < 0) {
          } else if (n2 < 26) {
            return 65 + n2;
          } else if (n2 < 52) {
            return 97 + (n2 - 26);
          } else if (n2 < 62) {
            return 48 + (n2 - 52);
          } else if (n2 == 62) {
            return 43;
          } else if (n2 == 63) {
            return 47;
          }
          throw "n:" + n2;
        };
        _this.writeByte = function(n2) {
          _buffer = _buffer << 8 | n2 & 255;
          _buflen += 8;
          _length += 1;
          while (_buflen >= 6) {
            writeEncoded(_buffer >>> _buflen - 6);
            _buflen -= 6;
          }
        };
        _this.flush = function() {
          if (_buflen > 0) {
            writeEncoded(_buffer << 6 - _buflen);
            _buffer = 0;
            _buflen = 0;
          }
          if (_length % 3 != 0) {
            var padlen = 3 - _length % 3;
            for (var i3 = 0; i3 < padlen; i3 += 1) {
              _base64 += "=";
            }
          }
        };
        _this.toString = function() {
          return _base64;
        };
        return _this;
      };
      var base64DecodeInputStream = function(str) {
        var _str = str;
        var _pos = 0;
        var _buffer = 0;
        var _buflen = 0;
        var _this = {};
        _this.read = function() {
          while (_buflen < 8) {
            if (_pos >= _str.length) {
              if (_buflen == 0) {
                return -1;
              }
              throw "unexpected end of file./" + _buflen;
            }
            var c4 = _str.charAt(_pos);
            _pos += 1;
            if (c4 == "=") {
              _buflen = 0;
              return -1;
            } else if (c4.match(/^\s$/)) {
              continue;
            }
            _buffer = _buffer << 6 | decode2(c4.charCodeAt(0));
            _buflen += 6;
          }
          var n2 = _buffer >>> _buflen - 8 & 255;
          _buflen -= 8;
          return n2;
        };
        var decode2 = function(c4) {
          if (65 <= c4 && c4 <= 90) {
            return c4 - 65;
          } else if (97 <= c4 && c4 <= 122) {
            return c4 - 97 + 26;
          } else if (48 <= c4 && c4 <= 57) {
            return c4 - 48 + 52;
          } else if (c4 == 43) {
            return 62;
          } else if (c4 == 47) {
            return 63;
          } else {
            throw "c:" + c4;
          }
        };
        return _this;
      };
      var gifImage = function(width, height) {
        var _width = width;
        var _height = height;
        var _data = new Array(width * height);
        var _this = {};
        _this.setPixel = function(x4, y3, pixel) {
          _data[y3 * _width + x4] = pixel;
        };
        _this.write = function(out) {
          out.writeString("GIF87a");
          out.writeShort(_width);
          out.writeShort(_height);
          out.writeByte(128);
          out.writeByte(0);
          out.writeByte(0);
          out.writeByte(0);
          out.writeByte(0);
          out.writeByte(0);
          out.writeByte(255);
          out.writeByte(255);
          out.writeByte(255);
          out.writeString(",");
          out.writeShort(0);
          out.writeShort(0);
          out.writeShort(_width);
          out.writeShort(_height);
          out.writeByte(0);
          var lzwMinCodeSize = 2;
          var raster = getLZWRaster(lzwMinCodeSize);
          out.writeByte(lzwMinCodeSize);
          var offset = 0;
          while (raster.length - offset > 255) {
            out.writeByte(255);
            out.writeBytes(raster, offset, 255);
            offset += 255;
          }
          out.writeByte(raster.length - offset);
          out.writeBytes(raster, offset, raster.length - offset);
          out.writeByte(0);
          out.writeString(";");
        };
        var bitOutputStream = function(out) {
          var _out = out;
          var _bitLength = 0;
          var _bitBuffer = 0;
          var _this2 = {};
          _this2.write = function(data, length) {
            if (data >>> length != 0) {
              throw "length over";
            }
            while (_bitLength + length >= 8) {
              _out.writeByte(255 & (data << _bitLength | _bitBuffer));
              length -= 8 - _bitLength;
              data >>>= 8 - _bitLength;
              _bitBuffer = 0;
              _bitLength = 0;
            }
            _bitBuffer = data << _bitLength | _bitBuffer;
            _bitLength = _bitLength + length;
          };
          _this2.flush = function() {
            if (_bitLength > 0) {
              _out.writeByte(_bitBuffer);
            }
          };
          return _this2;
        };
        var getLZWRaster = function(lzwMinCodeSize) {
          var clearCode = 1 << lzwMinCodeSize;
          var endCode = (1 << lzwMinCodeSize) + 1;
          var bitLength = lzwMinCodeSize + 1;
          var table = lzwTable();
          for (var i3 = 0; i3 < clearCode; i3 += 1) {
            table.add(String.fromCharCode(i3));
          }
          table.add(String.fromCharCode(clearCode));
          table.add(String.fromCharCode(endCode));
          var byteOut = byteArrayOutputStream();
          var bitOut = bitOutputStream(byteOut);
          bitOut.write(clearCode, bitLength);
          var dataIndex = 0;
          var s3 = String.fromCharCode(_data[dataIndex]);
          dataIndex += 1;
          while (dataIndex < _data.length) {
            var c4 = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;
            if (table.contains(s3 + c4)) {
              s3 = s3 + c4;
            } else {
              bitOut.write(table.indexOf(s3), bitLength);
              if (table.size() < 4095) {
                if (table.size() == 1 << bitLength) {
                  bitLength += 1;
                }
                table.add(s3 + c4);
              }
              s3 = c4;
            }
          }
          bitOut.write(table.indexOf(s3), bitLength);
          bitOut.write(endCode, bitLength);
          bitOut.flush();
          return byteOut.toByteArray();
        };
        var lzwTable = function() {
          var _map = {};
          var _size = 0;
          var _this2 = {};
          _this2.add = function(key) {
            if (_this2.contains(key)) {
              throw "dup key:" + key;
            }
            _map[key] = _size;
            _size += 1;
          };
          _this2.size = function() {
            return _size;
          };
          _this2.indexOf = function(key) {
            return _map[key];
          };
          _this2.contains = function(key) {
            return typeof _map[key] != "undefined";
          };
          return _this2;
        };
        return _this;
      };
      var createDataURL = function(width, height, getPixel) {
        var gif = gifImage(width, height);
        for (var y3 = 0; y3 < height; y3 += 1) {
          for (var x4 = 0; x4 < width; x4 += 1) {
            gif.setPixel(x4, y3, getPixel(x4, y3));
          }
        }
        var b4 = byteArrayOutputStream();
        gif.write(b4);
        var base642 = base64EncodeOutputStream();
        var bytes3 = b4.toByteArray();
        for (var i3 = 0; i3 < bytes3.length; i3 += 1) {
          base642.writeByte(bytes3[i3]);
        }
        base642.flush();
        return "data:image/gif;base64," + base642;
      };
      return qrcode2;
    }();
    !function() {
      qrcode.stringToBytesFuncs["UTF-8"] = function(s3) {
        function toUTF8Array(str) {
          var utf8 = [];
          for (var i3 = 0; i3 < str.length; i3++) {
            var charcode = str.charCodeAt(i3);
            if (charcode < 128) utf8.push(charcode);
            else if (charcode < 2048) {
              utf8.push(
                192 | charcode >> 6,
                128 | charcode & 63
              );
            } else if (charcode < 55296 || charcode >= 57344) {
              utf8.push(
                224 | charcode >> 12,
                128 | charcode >> 6 & 63,
                128 | charcode & 63
              );
            } else {
              i3++;
              charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i3) & 1023);
              utf8.push(
                240 | charcode >> 18,
                128 | charcode >> 12 & 63,
                128 | charcode >> 6 & 63,
                128 | charcode & 63
              );
            }
          }
          return utf8;
        }
        return toUTF8Array(s3);
      };
    }();
    (function(factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof exports === "object") {
        module.exports = factory();
      }
    })(function() {
      return qrcode;
    });
  }
});

// node_modules/.pnpm/@getalby+bitcoin-connect-react@3.6.2_@types+react@18.3.10_react@18.3.1_typescript@5.6.2/node_modules/@getalby/bitcoin-connect-react/dist/index.modern.js
var import_react = __toESM(require_react());

// node_modules/.pnpm/@noble+curves@1.1.0/node_modules/@noble/curves/esm/abstract/utils.js
var utils_exports = {};
__export(utils_exports, {
  bitGet: () => bitGet,
  bitLen: () => bitLen,
  bitMask: () => bitMask,
  bitSet: () => bitSet,
  bytesToHex: () => bytesToHex2,
  bytesToNumberBE: () => bytesToNumberBE,
  bytesToNumberLE: () => bytesToNumberLE,
  concatBytes: () => concatBytes2,
  createHmacDrbg: () => createHmacDrbg,
  ensureBytes: () => ensureBytes,
  equalBytes: () => equalBytes,
  hexToBytes: () => hexToBytes2,
  hexToNumber: () => hexToNumber,
  numberToBytesBE: () => numberToBytesBE,
  numberToBytesLE: () => numberToBytesLE,
  numberToHexUnpadded: () => numberToHexUnpadded,
  numberToVarBytesBE: () => numberToVarBytesBE,
  utf8ToBytes: () => utf8ToBytes,
  validateObject: () => validateObject
});
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var u8a = (a3) => a3 instanceof Uint8Array;
var hexes = Array.from({ length: 256 }, (v3, i3) => i3.toString(16).padStart(2, "0"));
function bytesToHex2(bytes3) {
  if (!u8a(bytes3))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i3 = 0; i3 < bytes3.length; i3++) {
    hex += hexes[bytes3[i3]];
  }
  return hex;
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return BigInt(hex === "" ? "0" : `0x${hex}`);
}
function hexToBytes2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const len = hex.length;
  if (len % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + len);
  const array = new Uint8Array(len / 2);
  for (let i3 = 0; i3 < array.length; i3++) {
    const j3 = i3 * 2;
    const hexByte = hex.slice(j3, j3 + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i3] = byte;
  }
  return array;
}
function bytesToNumberBE(bytes3) {
  return hexToNumber(bytesToHex2(bytes3));
}
function bytesToNumberLE(bytes3) {
  if (!u8a(bytes3))
    throw new Error("Uint8Array expected");
  return hexToNumber(bytesToHex2(Uint8Array.from(bytes3).reverse()));
}
function numberToBytesBE(n2, len) {
  return hexToBytes2(n2.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n2, len) {
  return numberToBytesBE(n2, len).reverse();
}
function numberToVarBytesBE(n2) {
  return hexToBytes2(numberToHexUnpadded(n2));
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes2(hex);
    } catch (e2) {
      throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e2}`);
    }
  } else if (u8a(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(`${title} must be hex string or Uint8Array`);
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
  return res;
}
function concatBytes2(...arrays) {
  const r2 = new Uint8Array(arrays.reduce((sum, a3) => sum + a3.length, 0));
  let pad = 0;
  arrays.forEach((a3) => {
    if (!u8a(a3))
      throw new Error("Uint8Array expected");
    r2.set(a3, pad);
    pad += a3.length;
  });
  return r2;
}
function equalBytes(b1, b22) {
  if (b1.length !== b22.length)
    return false;
  for (let i3 = 0; i3 < b1.length; i3++)
    if (b1[i3] !== b22[i3])
      return false;
  return true;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function bitLen(n2) {
  let len;
  for (len = 0; n2 > _0n; n2 >>= _1n, len += 1)
    ;
  return len;
}
function bitGet(n2, pos) {
  return n2 >> BigInt(pos) & _1n;
}
var bitSet = (n2, pos, value) => {
  return n2 | (value ? _1n : _0n) << BigInt(pos);
};
var bitMask = (n2) => (_2n << BigInt(n2 - 1)) - _1n;
var u8n = (data) => new Uint8Array(data);
var u8fr = (arr) => Uint8Array.from(arr);
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v3 = u8n(hashLen);
  let k3 = u8n(hashLen);
  let i3 = 0;
  const reset = () => {
    v3.fill(1);
    k3.fill(0);
    i3 = 0;
  };
  const h2 = (...b4) => hmacFn(k3, v3, ...b4);
  const reseed = (seed = u8n()) => {
    k3 = h2(u8fr([0]), seed);
    v3 = h2();
    if (seed.length === 0)
      return;
    k3 = h2(u8fr([1]), seed);
    v3 = h2();
  };
  const gen = () => {
    if (i3++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v3 = h2();
      const sl = v3.slice();
      out.push(sl);
      len += v3.length;
    }
    return concatBytes2(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
var validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error(`Invalid validator "${type}", expected function`);
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}

// node_modules/.pnpm/@noble+curves@1.1.0/node_modules/@noble/curves/esm/abstract/modular.js
var _0n2 = BigInt(0);
var _1n2 = BigInt(1);
var _2n2 = BigInt(2);
var _3n = BigInt(3);
var _4n = BigInt(4);
var _5n = BigInt(5);
var _8n = BigInt(8);
var _9n = BigInt(9);
var _16n = BigInt(16);
function mod(a3, b4) {
  const result = a3 % b4;
  return result >= _0n2 ? result : b4 + result;
}
function pow(num, power, modulo) {
  if (modulo <= _0n2 || power < _0n2)
    throw new Error("Expected power/modulo > 0");
  if (modulo === _1n2)
    return _0n2;
  let res = _1n2;
  while (power > _0n2) {
    if (power & _1n2)
      res = res * num % modulo;
    num = num * num % modulo;
    power >>= _1n2;
  }
  return res;
}
function pow2(x4, power, modulo) {
  let res = x4;
  while (power-- > _0n2) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number3, modulo) {
  if (number3 === _0n2 || modulo <= _0n2) {
    throw new Error(`invert: expected positive integers, got n=${number3} mod=${modulo}`);
  }
  let a3 = mod(number3, modulo);
  let b4 = modulo;
  let x4 = _0n2, y3 = _1n2, u4 = _1n2, v3 = _0n2;
  while (a3 !== _0n2) {
    const q4 = b4 / a3;
    const r2 = b4 % a3;
    const m4 = x4 - u4 * q4;
    const n2 = y3 - v3 * q4;
    b4 = a3, a3 = r2, x4 = u4, y3 = v3, u4 = m4, v3 = n2;
  }
  const gcd = b4;
  if (gcd !== _1n2)
    throw new Error("invert: does not exist");
  return mod(x4, modulo);
}
function tonelliShanks(P2) {
  const legendreC = (P2 - _1n2) / _2n2;
  let Q2, S4, Z2;
  for (Q2 = P2 - _1n2, S4 = 0; Q2 % _2n2 === _0n2; Q2 /= _2n2, S4++)
    ;
  for (Z2 = _2n2; Z2 < P2 && pow(Z2, legendreC, P2) !== P2 - _1n2; Z2++)
    ;
  if (S4 === 1) {
    const p1div4 = (P2 + _1n2) / _4n;
    return function tonelliFast(Fp2, n2) {
      const root = Fp2.pow(n2, p1div4);
      if (!Fp2.eql(Fp2.sqr(root), n2))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  const Q1div2 = (Q2 + _1n2) / _2n2;
  return function tonelliSlow(Fp2, n2) {
    if (Fp2.pow(n2, legendreC) === Fp2.neg(Fp2.ONE))
      throw new Error("Cannot find square root");
    let r2 = S4;
    let g4 = Fp2.pow(Fp2.mul(Fp2.ONE, Z2), Q2);
    let x4 = Fp2.pow(n2, Q1div2);
    let b4 = Fp2.pow(n2, Q2);
    while (!Fp2.eql(b4, Fp2.ONE)) {
      if (Fp2.eql(b4, Fp2.ZERO))
        return Fp2.ZERO;
      let m4 = 1;
      for (let t2 = Fp2.sqr(b4); m4 < r2; m4++) {
        if (Fp2.eql(t2, Fp2.ONE))
          break;
        t2 = Fp2.sqr(t2);
      }
      const ge3 = Fp2.pow(g4, _1n2 << BigInt(r2 - m4 - 1));
      g4 = Fp2.sqr(ge3);
      x4 = Fp2.mul(x4, ge3);
      b4 = Fp2.mul(b4, g4);
      r2 = m4;
    }
    return x4;
  };
}
function FpSqrt(P2) {
  if (P2 % _4n === _3n) {
    const p1div4 = (P2 + _1n2) / _4n;
    return function sqrt3mod4(Fp2, n2) {
      const root = Fp2.pow(n2, p1div4);
      if (!Fp2.eql(Fp2.sqr(root), n2))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P2 % _8n === _5n) {
    const c1 = (P2 - _5n) / _8n;
    return function sqrt5mod8(Fp2, n2) {
      const n22 = Fp2.mul(n2, _2n2);
      const v3 = Fp2.pow(n22, c1);
      const nv = Fp2.mul(n2, v3);
      const i3 = Fp2.mul(Fp2.mul(nv, _2n2), v3);
      const root = Fp2.mul(nv, Fp2.sub(i3, Fp2.ONE));
      if (!Fp2.eql(Fp2.sqr(root), n2))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P2 % _16n === _9n) {
  }
  return tonelliShanks(P2);
}
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(f5, num, power) {
  if (power < _0n2)
    throw new Error("Expected power > 0");
  if (power === _0n2)
    return f5.ONE;
  if (power === _1n2)
    return num;
  let p5 = f5.ONE;
  let d5 = num;
  while (power > _0n2) {
    if (power & _1n2)
      p5 = f5.mul(p5, d5);
    d5 = f5.sqr(d5);
    power >>= _1n2;
  }
  return p5;
}
function FpInvertBatch(f5, nums) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i3) => {
    if (f5.is0(num))
      return acc;
    tmp[i3] = acc;
    return f5.mul(acc, num);
  }, f5.ONE);
  const inverted = f5.inv(lastMultiplied);
  nums.reduceRight((acc, num, i3) => {
    if (f5.is0(num))
      return acc;
    tmp[i3] = f5.mul(acc, tmp[i3]);
    return f5.mul(acc, num);
  }, inverted);
  return tmp;
}
function nLength(n2, nBitLength) {
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n2.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen2, isLE3 = false, redef = {}) {
  if (ORDER <= _0n2)
    throw new Error(`Expected Fp ORDER > 0, got ${ORDER}`);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const sqrtP = FpSqrt(ORDER);
  const f5 = Object.freeze({
    ORDER,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n2,
    ONE: _1n2,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
      return _0n2 <= num && num < ORDER;
    },
    is0: (num) => num === _0n2,
    isOdd: (num) => (num & _1n2) === _1n2,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f5, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: redef.sqrt || ((n2) => sqrtP(f5, n2)),
    invertBatch: (lst) => FpInvertBatch(f5, lst),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a3, b4, c4) => c4 ? b4 : a3,
    toBytes: (num) => isLE3 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes3) => {
      if (bytes3.length !== BYTES)
        throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes3.length}`);
      return isLE3 ? bytesToNumberLE(bytes3) : bytesToNumberBE(bytes3);
    }
  });
  return Object.freeze(f5);
}
function hashToPrivateScalar(hash3, groupOrder, isLE3 = false) {
  hash3 = ensureBytes("privateHash", hash3);
  const hashLen = hash3.length;
  const minLen = nLength(groupOrder).nByteLength + 8;
  if (minLen < 24 || hashLen < minLen || hashLen > 1024)
    throw new Error(`hashToPrivateScalar: expected ${minLen}-1024 bytes of input, got ${hashLen}`);
  const num = isLE3 ? bytesToNumberLE(hash3) : bytesToNumberBE(hash3);
  return mod(num, groupOrder - _1n2) + _1n2;
}

// node_modules/.pnpm/@noble+curves@1.1.0/node_modules/@noble/curves/esm/abstract/curve.js
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
function wNAF(c4, bits) {
  const constTimeNegate = (condition, item) => {
    const neg = item.negate();
    return condition ? neg : item;
  };
  const opts = (W3) => {
    const windows = Math.ceil(bits / W3) + 1;
    const windowSize = 2 ** (W3 - 1);
    return { windows, windowSize };
  };
  return {
    constTimeNegate,
    // non-const time multiplication ladder
    unsafeLadder(elm, n2) {
      let p5 = c4.ZERO;
      let d5 = elm;
      while (n2 > _0n3) {
        if (n2 & _1n3)
          p5 = p5.add(d5);
        d5 = d5.double();
        n2 >>= _1n3;
      }
      return p5;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W3) {
      const { windows, windowSize } = opts(W3);
      const points = [];
      let p5 = elm;
      let base = p5;
      for (let window2 = 0; window2 < windows; window2++) {
        base = p5;
        points.push(base);
        for (let i3 = 1; i3 < windowSize; i3++) {
          base = base.add(p5);
          points.push(base);
        }
        p5 = base.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W3, precomputes, n2) {
      const { windows, windowSize } = opts(W3);
      let p5 = c4.ZERO;
      let f5 = c4.BASE;
      const mask = BigInt(2 ** W3 - 1);
      const maxNumber = 2 ** W3;
      const shiftBy = BigInt(W3);
      for (let window2 = 0; window2 < windows; window2++) {
        const offset = window2 * windowSize;
        let wbits = Number(n2 & mask);
        n2 >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n2 += _1n3;
        }
        const offset1 = offset;
        const offset2 = offset + Math.abs(wbits) - 1;
        const cond1 = window2 % 2 !== 0;
        const cond2 = wbits < 0;
        if (wbits === 0) {
          f5 = f5.add(constTimeNegate(cond1, precomputes[offset1]));
        } else {
          p5 = p5.add(constTimeNegate(cond2, precomputes[offset2]));
        }
      }
      return { p: p5, f: f5 };
    },
    wNAFCached(P2, precomputesMap, n2, transform) {
      const W3 = P2._WINDOW_SIZE || 1;
      let comp = precomputesMap.get(P2);
      if (!comp) {
        comp = this.precomputeWindow(P2, W3);
        if (W3 !== 1) {
          precomputesMap.set(P2, transform(comp));
        }
      }
      return this.wNAF(W3, comp, n2);
    }
  };
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}

// node_modules/.pnpm/@noble+curves@1.1.0/node_modules/@noble/curves/esm/abstract/weierstrass.js
function validatePointOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo, Fp: Fp2, a: a3 } = opts;
  if (endo) {
    if (!Fp2.eql(a3, Fp2.ZERO)) {
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
    }
  }
  return Object.freeze({ ...opts });
}
var { bytesToNumberBE: b2n, hexToBytes: h2b } = utils_exports;
var DER = {
  // asn.1 DER encoding utils
  Err: class DERErr extends Error {
    constructor(m4 = "") {
      super(m4);
    }
  },
  _parseInt(data) {
    const { Err: E4 } = DER;
    if (data.length < 2 || data[0] !== 2)
      throw new E4("Invalid signature integer tag");
    const len = data[1];
    const res = data.subarray(2, len + 2);
    if (!len || res.length !== len)
      throw new E4("Invalid signature integer: wrong length");
    if (res[0] & 128)
      throw new E4("Invalid signature integer: negative");
    if (res[0] === 0 && !(res[1] & 128))
      throw new E4("Invalid signature integer: unnecessary leading zero");
    return { d: b2n(res), l: data.subarray(len + 2) };
  },
  toSig(hex) {
    const { Err: E4 } = DER;
    const data = typeof hex === "string" ? h2b(hex) : hex;
    if (!(data instanceof Uint8Array))
      throw new Error("ui8a expected");
    let l4 = data.length;
    if (l4 < 2 || data[0] != 48)
      throw new E4("Invalid signature tag");
    if (data[1] !== l4 - 2)
      throw new E4("Invalid signature: incorrect length");
    const { d: r2, l: sBytes } = DER._parseInt(data.subarray(2));
    const { d: s3, l: rBytesLeft } = DER._parseInt(sBytes);
    if (rBytesLeft.length)
      throw new E4("Invalid signature: left bytes after parsing");
    return { r: r2, s: s3 };
  },
  hexFromSig(sig) {
    const slice = (s4) => Number.parseInt(s4[0], 16) & 8 ? "00" + s4 : s4;
    const h2 = (num) => {
      const hex = num.toString(16);
      return hex.length & 1 ? `0${hex}` : hex;
    };
    const s3 = slice(h2(sig.s));
    const r2 = slice(h2(sig.r));
    const shl = s3.length / 2;
    const rhl = r2.length / 2;
    const sl = h2(shl);
    const rl = h2(rhl);
    return `30${h2(rhl + shl + 4)}02${rl}${r2}02${sl}${s3}`;
  }
};
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
var _2n3 = BigInt(2);
var _3n2 = BigInt(3);
var _4n2 = BigInt(4);
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp: Fp2 } = CURVE;
  const toBytes3 = CURVE.toBytes || ((c4, point, isCompressed) => {
    const a3 = point.toAffine();
    return concatBytes2(Uint8Array.from([4]), Fp2.toBytes(a3.x), Fp2.toBytes(a3.y));
  });
  const fromBytes = CURVE.fromBytes || ((bytes3) => {
    const tail = bytes3.subarray(1);
    const x4 = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
    const y3 = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
    return { x: x4, y: y3 };
  });
  function weierstrassEquation(x4) {
    const { a: a3, b: b4 } = CURVE;
    const x22 = Fp2.sqr(x4);
    const x32 = Fp2.mul(x22, x4);
    return Fp2.add(Fp2.add(x32, Fp2.mul(x4, a3)), b4);
  }
  if (!Fp2.eql(Fp2.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
    throw new Error("bad generator point: equation left != right");
  function isWithinCurveOrder(num) {
    return typeof num === "bigint" && _0n4 < num && num < CURVE.n;
  }
  function assertGE(num) {
    if (!isWithinCurveOrder(num))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: n2 } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (key instanceof Uint8Array)
        key = bytesToHex2(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("Invalid key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
    }
    if (wrapPrivateKey)
      num = mod(num, n2);
    assertGE(num);
    return num;
  }
  const pointPrecomputes = /* @__PURE__ */ new Map();
  function assertPrjPoint(other) {
    if (!(other instanceof Point3))
      throw new Error("ProjectivePoint expected");
  }
  class Point3 {
    constructor(px, py, pz) {
      this.px = px;
      this.py = py;
      this.pz = pz;
      if (px == null || !Fp2.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp2.isValid(py))
        throw new Error("y required");
      if (pz == null || !Fp2.isValid(pz))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p5) {
      const { x: x4, y: y3 } = p5 || {};
      if (!p5 || !Fp2.isValid(x4) || !Fp2.isValid(y3))
        throw new Error("invalid affine point");
      if (p5 instanceof Point3)
        throw new Error("projective point not allowed");
      const is0 = (i3) => Fp2.eql(i3, Fp2.ZERO);
      if (is0(x4) && is0(y3))
        return Point3.ZERO;
      return new Point3(x4, y3, Fp2.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = Fp2.invertBatch(points.map((p5) => p5.pz));
      return points.map((p5, i3) => p5.toAffine(toInv[i3])).map(Point3.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P2 = Point3.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
      P2.assertValidity();
      return P2;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point3.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (CURVE.allowInfinityPoint)
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: x4, y: y3 } = this.toAffine();
      if (!Fp2.isValid(x4) || !Fp2.isValid(y3))
        throw new Error("bad point: x or y not FE");
      const left = Fp2.sqr(y3);
      const right = weierstrassEquation(x4);
      if (!Fp2.eql(left, right))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: y3 } = this.toAffine();
      if (Fp2.isOdd)
        return !Fp2.isOdd(y3);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp2.eql(Fp2.mul(X1, Z2), Fp2.mul(X2, Z1));
      const U22 = Fp2.eql(Fp2.mul(Y1, Z2), Fp2.mul(Y2, Z1));
      return U1 && U22;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point3(this.px, Fp2.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: a3, b: b4 } = CURVE;
      const b32 = Fp2.mul(b4, _3n2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
      let t0 = Fp2.mul(X1, X1);
      let t1 = Fp2.mul(Y1, Y1);
      let t2 = Fp2.mul(Z1, Z1);
      let t3 = Fp2.mul(X1, Y1);
      t3 = Fp2.add(t3, t3);
      Z3 = Fp2.mul(X1, Z1);
      Z3 = Fp2.add(Z3, Z3);
      X3 = Fp2.mul(a3, Z3);
      Y3 = Fp2.mul(b32, t2);
      Y3 = Fp2.add(X3, Y3);
      X3 = Fp2.sub(t1, Y3);
      Y3 = Fp2.add(t1, Y3);
      Y3 = Fp2.mul(X3, Y3);
      X3 = Fp2.mul(t3, X3);
      Z3 = Fp2.mul(b32, Z3);
      t2 = Fp2.mul(a3, t2);
      t3 = Fp2.sub(t0, t2);
      t3 = Fp2.mul(a3, t3);
      t3 = Fp2.add(t3, Z3);
      Z3 = Fp2.add(t0, t0);
      t0 = Fp2.add(Z3, t0);
      t0 = Fp2.add(t0, t2);
      t0 = Fp2.mul(t0, t3);
      Y3 = Fp2.add(Y3, t0);
      t2 = Fp2.mul(Y1, Z1);
      t2 = Fp2.add(t2, t2);
      t0 = Fp2.mul(t2, t3);
      X3 = Fp2.sub(X3, t0);
      Z3 = Fp2.mul(t2, t1);
      Z3 = Fp2.add(Z3, Z3);
      Z3 = Fp2.add(Z3, Z3);
      return new Point3(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
      const a3 = CURVE.a;
      const b32 = Fp2.mul(CURVE.b, _3n2);
      let t0 = Fp2.mul(X1, X2);
      let t1 = Fp2.mul(Y1, Y2);
      let t2 = Fp2.mul(Z1, Z2);
      let t3 = Fp2.add(X1, Y1);
      let t4 = Fp2.add(X2, Y2);
      t3 = Fp2.mul(t3, t4);
      t4 = Fp2.add(t0, t1);
      t3 = Fp2.sub(t3, t4);
      t4 = Fp2.add(X1, Z1);
      let t5 = Fp2.add(X2, Z2);
      t4 = Fp2.mul(t4, t5);
      t5 = Fp2.add(t0, t2);
      t4 = Fp2.sub(t4, t5);
      t5 = Fp2.add(Y1, Z1);
      X3 = Fp2.add(Y2, Z2);
      t5 = Fp2.mul(t5, X3);
      X3 = Fp2.add(t1, t2);
      t5 = Fp2.sub(t5, X3);
      Z3 = Fp2.mul(a3, t4);
      X3 = Fp2.mul(b32, t2);
      Z3 = Fp2.add(X3, Z3);
      X3 = Fp2.sub(t1, Z3);
      Z3 = Fp2.add(t1, Z3);
      Y3 = Fp2.mul(X3, Z3);
      t1 = Fp2.add(t0, t0);
      t1 = Fp2.add(t1, t0);
      t2 = Fp2.mul(a3, t2);
      t4 = Fp2.mul(b32, t4);
      t1 = Fp2.add(t1, t2);
      t2 = Fp2.sub(t0, t2);
      t2 = Fp2.mul(a3, t2);
      t4 = Fp2.add(t4, t2);
      t0 = Fp2.mul(t1, t4);
      Y3 = Fp2.add(Y3, t0);
      t0 = Fp2.mul(t5, t4);
      X3 = Fp2.mul(t3, X3);
      X3 = Fp2.sub(X3, t0);
      t0 = Fp2.mul(t3, t1);
      Z3 = Fp2.mul(t5, Z3);
      Z3 = Fp2.add(Z3, t0);
      return new Point3(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point3.ZERO);
    }
    wNAF(n2) {
      return wnaf.wNAFCached(this, pointPrecomputes, n2, (comp) => {
        const toInv = Fp2.invertBatch(comp.map((p5) => p5.pz));
        return comp.map((p5, i3) => p5.toAffine(toInv[i3])).map(Point3.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(n2) {
      const I4 = Point3.ZERO;
      if (n2 === _0n4)
        return I4;
      assertGE(n2);
      if (n2 === _1n4)
        return this;
      const { endo } = CURVE;
      if (!endo)
        return wnaf.unsafeLadder(this, n2);
      let { k1neg, k1, k2neg, k2: k22 } = endo.splitScalar(n2);
      let k1p = I4;
      let k2p = I4;
      let d5 = this;
      while (k1 > _0n4 || k22 > _0n4) {
        if (k1 & _1n4)
          k1p = k1p.add(d5);
        if (k22 & _1n4)
          k2p = k2p.add(d5);
        d5 = d5.double();
        k1 >>= _1n4;
        k22 >>= _1n4;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point3(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      assertGE(scalar);
      let n2 = scalar;
      let point, fake;
      const { endo } = CURVE;
      if (endo) {
        const { k1neg, k1, k2neg, k2: k22 } = endo.splitScalar(n2);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k22);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point3(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p: p5, f: f5 } = this.wNAF(n2);
        point = p5;
        fake = f5;
      }
      return Point3.normalizeZ([point, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q2, a3, b4) {
      const G2 = Point3.BASE;
      const mul = (P2, a4) => a4 === _0n4 || a4 === _1n4 || !P2.equals(G2) ? P2.multiplyUnsafe(a4) : P2.multiply(a4);
      const sum = mul(this, a3).add(mul(Q2, b4));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      const { px: x4, py: y3, pz: z3 } = this;
      const is0 = this.is0();
      if (iz == null)
        iz = is0 ? Fp2.ONE : Fp2.inv(z3);
      const ax = Fp2.mul(x4, iz);
      const ay = Fp2.mul(y3, iz);
      const zz = Fp2.mul(z3, iz);
      if (is0)
        return { x: Fp2.ZERO, y: Fp2.ZERO };
      if (!Fp2.eql(zz, Fp2.ONE))
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n4)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point3, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n4)
        return this;
      if (clearCofactor)
        return clearCofactor(Point3, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      this.assertValidity();
      return toBytes3(Point3, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex2(this.toRawBytes(isCompressed));
    }
  }
  Point3.BASE = new Point3(CURVE.Gx, CURVE.Gy, Fp2.ONE);
  Point3.ZERO = new Point3(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
  const _bits = CURVE.nBitLength;
  const wnaf = wNAF(Point3, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
  return {
    CURVE,
    ProjectivePoint: Point3,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp: Fp2, n: CURVE_ORDER } = CURVE;
  const compressedLen = Fp2.BYTES + 1;
  const uncompressedLen = 2 * Fp2.BYTES + 1;
  function isValidFieldElement(num) {
    return _0n4 < num && num < Fp2.ORDER;
  }
  function modN2(a3) {
    return mod(a3, CURVE_ORDER);
  }
  function invN(a3) {
    return invert(a3, CURVE_ORDER);
  }
  const { ProjectivePoint: Point3, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(c4, point, isCompressed) {
      const a3 = point.toAffine();
      const x4 = Fp2.toBytes(a3.x);
      const cat = concatBytes2;
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x4);
      } else {
        return cat(Uint8Array.from([4]), x4, Fp2.toBytes(a3.y));
      }
    },
    fromBytes(bytes3) {
      const len = bytes3.length;
      const head = bytes3[0];
      const tail = bytes3.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x4 = bytesToNumberBE(tail);
        if (!isValidFieldElement(x4))
          throw new Error("Point is not on curve");
        const y22 = weierstrassEquation(x4);
        let y3 = Fp2.sqrt(y22);
        const isYOdd = (y3 & _1n4) === _1n4;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y3 = Fp2.neg(y3);
        return { x: x4, y: y3 };
      } else if (len === uncompressedLen && head === 4) {
        const x4 = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
        const y3 = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
        return { x: x4, y: y3 };
      } else {
        throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
      }
    }
  });
  const numToNByteStr = (num) => bytesToHex2(numberToBytesBE(num, CURVE.nByteLength));
  function isBiggerThanHalfOrder(number3) {
    const HALF = CURVE_ORDER >> _1n4;
    return number3 > HALF;
  }
  function normalizeS(s3) {
    return isBiggerThanHalfOrder(s3) ? modN2(-s3) : s3;
  }
  const slcNum = (b4, from, to2) => bytesToNumberBE(b4.slice(from, to2));
  class Signature {
    constructor(r2, s3, recovery) {
      this.r = r2;
      this.s = s3;
      this.recovery = recovery;
      this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l4 = CURVE.nByteLength;
      hex = ensureBytes("compactSignature", hex, l4 * 2);
      return new Signature(slcNum(hex, 0, l4), slcNum(hex, l4, 2 * l4));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r: r2, s: s3 } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r2, s3);
    }
    assertValidity() {
      if (!isWithinCurveOrder(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!isWithinCurveOrder(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r: r2, s: s3, recovery: rec } = this;
      const h2 = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r2 + CURVE.n : r2;
      if (radj >= Fp2.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R4 = Point3.fromHex(prefix + numToNByteStr(radj));
      const ir2 = invN(radj);
      const u1 = modN2(-h2 * ir2);
      const u22 = modN2(s3 * ir2);
      const Q2 = Point3.BASE.multiplyAndAddUnsafe(R4, u1, u22);
      if (!Q2)
        throw new Error("point at infinify");
      Q2.assertValidity();
      return Q2;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN2(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes2(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes2(this.toCompactHex());
    }
    toCompactHex() {
      return numToNByteStr(this.r) + numToNByteStr(this.s);
    }
  }
  const utils3 = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size (nBitLength+64)
     * as per FIPS 186 B.4.1 with modulo bias being neglible.
     */
    randomPrivateKey: () => {
      const rand = CURVE.randomBytes(Fp2.BYTES + 8);
      const num = hashToPrivateScalar(rand, CURVE_ORDER);
      return numberToBytesBE(num, CURVE.nByteLength);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point = Point3.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey2(privateKey, isCompressed = true) {
    return Point3.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    const arr = item instanceof Uint8Array;
    const str = typeof item === "string";
    const len = (arr || str) && item.length;
    if (arr)
      return len === compressedLen || len === uncompressedLen;
    if (str)
      return len === 2 * compressedLen || len === 2 * uncompressedLen;
    if (item instanceof Point3)
      return true;
    return false;
  }
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA))
      throw new Error("first arg must be private key");
    if (!isProbPub(publicB))
      throw new Error("second arg must be public key");
    const b4 = Point3.fromHex(publicB);
    return b4.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes3) {
    const num = bytesToNumberBE(bytes3);
    const delta = bytes3.length * 8 - CURVE.nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes3) {
    return modN2(bits2int(bytes3));
  };
  const ORDER_MASK = bitMask(CURVE.nBitLength);
  function int2octets(num) {
    if (typeof num !== "bigint")
      throw new Error("bigint expected");
    if (!(_0n4 <= num && num < ORDER_MASK))
      throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
    return numberToBytesBE(num, CURVE.nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k3) => k3 in opts))
      throw new Error("sign() legacy options not supported");
    const { hash: hash3, randomBytes: randomBytes3 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash3(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d5 = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d5), int2octets(h1int)];
    if (ent != null) {
      const e2 = ent === true ? randomBytes3(Fp2.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e2, Fp2.BYTES));
    }
    const seed = concatBytes2(...seedArgs);
    const m4 = h1int;
    function k2sig(kBytes) {
      const k3 = bits2int(kBytes);
      if (!isWithinCurveOrder(k3))
        return;
      const ik = invN(k3);
      const q4 = Point3.BASE.multiply(k3).toAffine();
      const r2 = modN2(q4.x);
      if (r2 === _0n4)
        return;
      const s3 = modN2(ik * modN2(m4 + r2 * d5));
      if (s3 === _0n4)
        return;
      let recovery = (q4.x === r2 ? 0 : 2) | Number(q4.y & _1n4);
      let normS = s3;
      if (lowS && isBiggerThanHalfOrder(s3)) {
        normS = normalizeS(s3);
        recovery ^= 1;
      }
      return new Signature(r2, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C4 = CURVE;
    const drbg = createHmacDrbg(C4.hash.outputLen, C4.nByteLength, C4.hmac);
    return drbg(seed, k2sig);
  }
  Point3.BASE._setWindowSize(8);
  function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
    var _a3;
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    const { lowS, prehash } = opts;
    let _sig = void 0;
    let P2;
    try {
      if (typeof sg === "string" || sg instanceof Uint8Array) {
        try {
          _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
          _sig = Signature.fromCompact(sg);
        }
      } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
        const { r: r3, s: s4 } = sg;
        _sig = new Signature(r3, s4);
      } else {
        throw new Error("PARSE");
      }
      P2 = Point3.fromHex(publicKey);
    } catch (error) {
      if (error.message === "PARSE")
        throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
      return false;
    }
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r: r2, s: s3 } = _sig;
    const h2 = bits2int_modN(msgHash);
    const is2 = invN(s3);
    const u1 = modN2(h2 * is2);
    const u22 = modN2(r2 * is2);
    const R4 = (_a3 = Point3.BASE.multiplyAndAddUnsafe(P2, u1, u22)) == null ? void 0 : _a3.toAffine();
    if (!R4)
      return false;
    const v3 = modN2(R4.x);
    return v3 === r2;
  }
  return {
    CURVE,
    getPublicKey: getPublicKey2,
    getSharedSecret,
    sign,
    verify,
    ProjectivePoint: Point3,
    Signature,
    utils: utils3
  };
}
function SWUFpSqrtRatio(Fp2, Z2) {
  const q4 = Fp2.ORDER;
  let l4 = _0n4;
  for (let o2 = q4 - _1n4; o2 % _2n3 === _0n4; o2 /= _2n3)
    l4 += _1n4;
  const c1 = l4;
  const _2n_pow_c1_1 = _2n3 << c1 - _1n4 - _1n4;
  const _2n_pow_c1 = _2n_pow_c1_1 * _2n3;
  const c22 = (q4 - _1n4) / _2n_pow_c1;
  const c32 = (c22 - _1n4) / _2n3;
  const c4 = _2n_pow_c1 - _1n4;
  const c5 = _2n_pow_c1_1;
  const c6 = Fp2.pow(Z2, c22);
  const c7 = Fp2.pow(Z2, (c22 + _1n4) / _2n3);
  let sqrtRatio = (u4, v3) => {
    let tv1 = c6;
    let tv2 = Fp2.pow(v3, c4);
    let tv3 = Fp2.sqr(tv2);
    tv3 = Fp2.mul(tv3, v3);
    let tv5 = Fp2.mul(u4, tv3);
    tv5 = Fp2.pow(tv5, c32);
    tv5 = Fp2.mul(tv5, tv2);
    tv2 = Fp2.mul(tv5, v3);
    tv3 = Fp2.mul(tv5, u4);
    let tv4 = Fp2.mul(tv3, tv2);
    tv5 = Fp2.pow(tv4, c5);
    let isQR = Fp2.eql(tv5, Fp2.ONE);
    tv2 = Fp2.mul(tv3, c7);
    tv5 = Fp2.mul(tv4, tv1);
    tv3 = Fp2.cmov(tv2, tv3, isQR);
    tv4 = Fp2.cmov(tv5, tv4, isQR);
    for (let i3 = c1; i3 > _1n4; i3--) {
      let tv52 = i3 - _2n3;
      tv52 = _2n3 << tv52 - _1n4;
      let tvv5 = Fp2.pow(tv4, tv52);
      const e1 = Fp2.eql(tvv5, Fp2.ONE);
      tv2 = Fp2.mul(tv3, tv1);
      tv1 = Fp2.mul(tv1, tv1);
      tvv5 = Fp2.mul(tv4, tv1);
      tv3 = Fp2.cmov(tv2, tv3, e1);
      tv4 = Fp2.cmov(tvv5, tv4, e1);
    }
    return { isValid: isQR, value: tv3 };
  };
  if (Fp2.ORDER % _4n2 === _3n2) {
    const c12 = (Fp2.ORDER - _3n2) / _4n2;
    const c23 = Fp2.sqrt(Fp2.neg(Z2));
    sqrtRatio = (u4, v3) => {
      let tv1 = Fp2.sqr(v3);
      const tv2 = Fp2.mul(u4, v3);
      tv1 = Fp2.mul(tv1, tv2);
      let y1 = Fp2.pow(tv1, c12);
      y1 = Fp2.mul(y1, tv2);
      const y22 = Fp2.mul(y1, c23);
      const tv3 = Fp2.mul(Fp2.sqr(y1), v3);
      const isQR = Fp2.eql(tv3, u4);
      let y3 = Fp2.cmov(y22, y1, isQR);
      return { isValid: isQR, value: y3 };
    };
  }
  return sqrtRatio;
}
function mapToCurveSimpleSWU(Fp2, opts) {
  validateField(Fp2);
  if (!Fp2.isValid(opts.A) || !Fp2.isValid(opts.B) || !Fp2.isValid(opts.Z))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const sqrtRatio = SWUFpSqrtRatio(Fp2, opts.Z);
  if (!Fp2.isOdd)
    throw new Error("Fp.isOdd is not implemented!");
  return (u4) => {
    let tv1, tv2, tv3, tv4, tv5, tv6, x4, y3;
    tv1 = Fp2.sqr(u4);
    tv1 = Fp2.mul(tv1, opts.Z);
    tv2 = Fp2.sqr(tv1);
    tv2 = Fp2.add(tv2, tv1);
    tv3 = Fp2.add(tv2, Fp2.ONE);
    tv3 = Fp2.mul(tv3, opts.B);
    tv4 = Fp2.cmov(opts.Z, Fp2.neg(tv2), !Fp2.eql(tv2, Fp2.ZERO));
    tv4 = Fp2.mul(tv4, opts.A);
    tv2 = Fp2.sqr(tv3);
    tv6 = Fp2.sqr(tv4);
    tv5 = Fp2.mul(tv6, opts.A);
    tv2 = Fp2.add(tv2, tv5);
    tv2 = Fp2.mul(tv2, tv3);
    tv6 = Fp2.mul(tv6, tv4);
    tv5 = Fp2.mul(tv6, opts.B);
    tv2 = Fp2.add(tv2, tv5);
    x4 = Fp2.mul(tv1, tv3);
    const { isValid, value } = sqrtRatio(tv2, tv6);
    y3 = Fp2.mul(tv1, u4);
    y3 = Fp2.mul(y3, value);
    x4 = Fp2.cmov(x4, tv3, isValid);
    y3 = Fp2.cmov(y3, value, isValid);
    const e1 = Fp2.isOdd(u4) === Fp2.isOdd(y3);
    y3 = Fp2.cmov(Fp2.neg(y3), y3, e1);
    x4 = Fp2.div(x4, tv4);
    return { x: x4, y: y3 };
  };
}

// node_modules/.pnpm/@noble+curves@1.1.0/node_modules/@noble/curves/esm/abstract/hash-to-curve.js
function validateDST(dst) {
  if (dst instanceof Uint8Array)
    return dst;
  if (typeof dst === "string")
    return utf8ToBytes(dst);
  throw new Error("DST must be Uint8Array or string");
}
var os2ip = bytesToNumberBE;
function i2osp(value, length) {
  if (value < 0 || value >= 1 << 8 * length) {
    throw new Error(`bad I2OSP call: value=${value} length=${length}`);
  }
  const res = Array.from({ length }).fill(0);
  for (let i3 = length - 1; i3 >= 0; i3--) {
    res[i3] = value & 255;
    value >>>= 8;
  }
  return new Uint8Array(res);
}
function strxor(a3, b4) {
  const arr = new Uint8Array(a3.length);
  for (let i3 = 0; i3 < a3.length; i3++) {
    arr[i3] = a3[i3] ^ b4[i3];
  }
  return arr;
}
function isBytes(item) {
  if (!(item instanceof Uint8Array))
    throw new Error("Uint8Array expected");
}
function isNum(item) {
  if (!Number.isSafeInteger(item))
    throw new Error("number expected");
}
function expand_message_xmd(msg, DST, lenInBytes, H3) {
  isBytes(msg);
  isBytes(DST);
  isNum(lenInBytes);
  if (DST.length > 255)
    DST = H3(concatBytes2(utf8ToBytes("H2C-OVERSIZE-DST-"), DST));
  const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H3;
  const ell = Math.ceil(lenInBytes / b_in_bytes);
  if (ell > 255)
    throw new Error("Invalid xmd length");
  const DST_prime = concatBytes2(DST, i2osp(DST.length, 1));
  const Z_pad = i2osp(0, r_in_bytes);
  const l_i_b_str = i2osp(lenInBytes, 2);
  const b4 = new Array(ell);
  const b_0 = H3(concatBytes2(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
  b4[0] = H3(concatBytes2(b_0, i2osp(1, 1), DST_prime));
  for (let i3 = 1; i3 <= ell; i3++) {
    const args = [strxor(b_0, b4[i3 - 1]), i2osp(i3 + 1, 1), DST_prime];
    b4[i3] = H3(concatBytes2(...args));
  }
  const pseudo_random_bytes = concatBytes2(...b4);
  return pseudo_random_bytes.slice(0, lenInBytes);
}
function expand_message_xof(msg, DST, lenInBytes, k3, H3) {
  isBytes(msg);
  isBytes(DST);
  isNum(lenInBytes);
  if (DST.length > 255) {
    const dkLen = Math.ceil(2 * k3 / 8);
    DST = H3.create({ dkLen }).update(utf8ToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
  }
  if (lenInBytes > 65535 || DST.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return H3.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
function hash_to_field(msg, count, options) {
  validateObject(options, {
    DST: "string",
    p: "bigint",
    m: "isSafeInteger",
    k: "isSafeInteger",
    hash: "hash"
  });
  const { p: p5, k: k3, m: m4, hash: hash3, expand, DST: _DST } = options;
  isBytes(msg);
  isNum(count);
  const DST = validateDST(_DST);
  const log2p = p5.toString(2).length;
  const L3 = Math.ceil((log2p + k3) / 8);
  const len_in_bytes = count * m4 * L3;
  let prb;
  if (expand === "xmd") {
    prb = expand_message_xmd(msg, DST, len_in_bytes, hash3);
  } else if (expand === "xof") {
    prb = expand_message_xof(msg, DST, len_in_bytes, k3, hash3);
  } else if (expand === "_internal_pass") {
    prb = msg;
  } else {
    throw new Error('expand must be "xmd" or "xof"');
  }
  const u4 = new Array(count);
  for (let i3 = 0; i3 < count; i3++) {
    const e2 = new Array(m4);
    for (let j3 = 0; j3 < m4; j3++) {
      const elm_offset = L3 * (j3 + i3 * m4);
      const tv = prb.subarray(elm_offset, elm_offset + L3);
      e2[j3] = mod(os2ip(tv), p5);
    }
    u4[i3] = e2;
  }
  return u4;
}
function isogenyMap(field, map) {
  const COEFF = map.map((i3) => Array.from(i3).reverse());
  return (x4, y3) => {
    const [xNum, xDen, yNum, yDen] = COEFF.map((val) => val.reduce((acc, i3) => field.add(field.mul(acc, x4), i3)));
    x4 = field.div(xNum, xDen);
    y3 = field.mul(y3, field.div(yNum, yDen));
    return { x: x4, y: y3 };
  };
}
function createHasher(Point3, mapToCurve, def) {
  if (typeof mapToCurve !== "function")
    throw new Error("mapToCurve() must be defined");
  return {
    // Encodes byte string to elliptic curve
    // https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-hash-to-curve-16#section-3
    hashToCurve(msg, options) {
      const u4 = hash_to_field(msg, 2, { ...def, DST: def.DST, ...options });
      const u0 = Point3.fromAffine(mapToCurve(u4[0]));
      const u1 = Point3.fromAffine(mapToCurve(u4[1]));
      const P2 = u0.add(u1).clearCofactor();
      P2.assertValidity();
      return P2;
    },
    // https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-hash-to-curve-16#section-3
    encodeToCurve(msg, options) {
      const u4 = hash_to_field(msg, 1, { ...def, DST: def.encodeDST, ...options });
      const P2 = Point3.fromAffine(mapToCurve(u4[0])).clearCofactor();
      P2.assertValidity();
      return P2;
    }
  };
}

// node_modules/.pnpm/@noble+curves@1.1.0/node_modules/@noble/curves/esm/_shortw_utils.js
function getHash(hash3) {
  return {
    hash: hash3,
    hmac: (key, ...msgs) => hmac(hash3, key, concatBytes(...msgs)),
    randomBytes
  };
}
function createCurve(curveDef, defHash) {
  const create = (hash3) => weierstrass({ ...curveDef, ...getHash(hash3) });
  return Object.freeze({ ...create(defHash), create });
}

// node_modules/.pnpm/@noble+curves@1.1.0/node_modules/@noble/curves/esm/secp256k1.js
var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var _1n5 = BigInt(1);
var _2n4 = BigInt(2);
var divNearest = (a3, b4) => (a3 + b4 / _2n4) / b4;
function sqrtMod(y3) {
  const P2 = secp256k1P;
  const _3n3 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b22 = y3 * y3 * y3 % P2;
  const b32 = b22 * b22 * y3 % P2;
  const b6 = pow2(b32, _3n3, P2) * b32 % P2;
  const b9 = pow2(b6, _3n3, P2) * b32 % P2;
  const b11 = pow2(b9, _2n4, P2) * b22 % P2;
  const b222 = pow2(b11, _11n, P2) * b11 % P2;
  const b44 = pow2(b222, _22n, P2) * b222 % P2;
  const b88 = pow2(b44, _44n, P2) * b44 % P2;
  const b176 = pow2(b88, _88n, P2) * b88 % P2;
  const b220 = pow2(b176, _44n, P2) * b44 % P2;
  const b223 = pow2(b220, _3n3, P2) * b32 % P2;
  const t1 = pow2(b223, _23n, P2) * b222 % P2;
  const t2 = pow2(t1, _6n, P2) * b22 % P2;
  const root = pow2(t2, _2n4, P2);
  if (!Fp.eql(Fp.sqr(root), y3))
    throw new Error("Cannot find square root");
  return root;
}
var Fp = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
var secp256k1 = createCurve({
  a: BigInt(0),
  b: BigInt(7),
  Fp,
  n: secp256k1N,
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: true,
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (k3) => {
      const n2 = secp256k1N;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n5 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a22 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b22 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest(b22 * k3, n2);
      const c22 = divNearest(-b1 * k3, n2);
      let k1 = mod(k3 - c1 * a1 - c22 * a22, n2);
      let k22 = mod(-c1 * b1 - c22 * b22, n2);
      const k1neg = k1 > POW_2_128;
      const k2neg = k22 > POW_2_128;
      if (k1neg)
        k1 = n2 - k1;
      if (k2neg)
        k22 = n2 - k22;
      if (k1 > POW_2_128 || k22 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k3);
      }
      return { k1neg, k1, k2neg, k2: k22 };
    }
  }
}, sha256);
var _0n5 = BigInt(0);
var fe = (x4) => typeof x4 === "bigint" && _0n5 < x4 && x4 < secp256k1P;
var ge = (x4) => typeof x4 === "bigint" && _0n5 < x4 && x4 < secp256k1N;
var TAGGED_HASH_PREFIXES = {};
function taggedHash(tag, ...messages) {
  let tagP = TAGGED_HASH_PREFIXES[tag];
  if (tagP === void 0) {
    const tagH = sha256(Uint8Array.from(tag, (c4) => c4.charCodeAt(0)));
    tagP = concatBytes2(tagH, tagH);
    TAGGED_HASH_PREFIXES[tag] = tagP;
  }
  return sha256(concatBytes2(tagP, ...messages));
}
var pointToBytes = (point) => point.toRawBytes(true).slice(1);
var numTo32b = (n2) => numberToBytesBE(n2, 32);
var modP = (x4) => mod(x4, secp256k1P);
var modN = (x4) => mod(x4, secp256k1N);
var Point = secp256k1.ProjectivePoint;
var GmulAdd = (Q2, a3, b4) => Point.BASE.multiplyAndAddUnsafe(Q2, a3, b4);
function schnorrGetExtPubKey(priv) {
  let d_ = secp256k1.utils.normPrivateKeyToScalar(priv);
  let p5 = Point.fromPrivateKey(d_);
  const scalar = p5.hasEvenY() ? d_ : modN(-d_);
  return { scalar, bytes: pointToBytes(p5) };
}
function lift_x(x4) {
  if (!fe(x4))
    throw new Error("bad x: need 0 < x < p");
  const xx = modP(x4 * x4);
  const c4 = modP(xx * x4 + BigInt(7));
  let y3 = sqrtMod(c4);
  if (y3 % _2n4 !== _0n5)
    y3 = modP(-y3);
  const p5 = new Point(x4, y3, _1n5);
  p5.assertValidity();
  return p5;
}
function challenge(...args) {
  return modN(bytesToNumberBE(taggedHash("BIP0340/challenge", ...args)));
}
function schnorrGetPublicKey(privateKey) {
  return schnorrGetExtPubKey(privateKey).bytes;
}
function schnorrSign(message, privateKey, auxRand = randomBytes(32)) {
  const m4 = ensureBytes("message", message);
  const { bytes: px, scalar: d5 } = schnorrGetExtPubKey(privateKey);
  const a3 = ensureBytes("auxRand", auxRand, 32);
  const t = numTo32b(d5 ^ bytesToNumberBE(taggedHash("BIP0340/aux", a3)));
  const rand = taggedHash("BIP0340/nonce", t, px, m4);
  const k_ = modN(bytesToNumberBE(rand));
  if (k_ === _0n5)
    throw new Error("sign failed: k is zero");
  const { bytes: rx, scalar: k3 } = schnorrGetExtPubKey(k_);
  const e2 = challenge(rx, px, m4);
  const sig = new Uint8Array(64);
  sig.set(rx, 0);
  sig.set(numTo32b(modN(k3 + e2 * d5)), 32);
  if (!schnorrVerify(sig, m4, px))
    throw new Error("sign: Invalid signature produced");
  return sig;
}
function schnorrVerify(signature, message, publicKey) {
  const sig = ensureBytes("signature", signature, 64);
  const m4 = ensureBytes("message", message);
  const pub = ensureBytes("publicKey", publicKey, 32);
  try {
    const P2 = lift_x(bytesToNumberBE(pub));
    const r2 = bytesToNumberBE(sig.subarray(0, 32));
    if (!fe(r2))
      return false;
    const s3 = bytesToNumberBE(sig.subarray(32, 64));
    if (!ge(s3))
      return false;
    const e2 = challenge(numTo32b(r2), pointToBytes(P2), m4);
    const R4 = GmulAdd(P2, s3, modN(-e2));
    if (!R4 || !R4.hasEvenY() || R4.toAffine().x !== r2)
      return false;
    return true;
  } catch (error) {
    return false;
  }
}
var schnorr = (() => ({
  getPublicKey: schnorrGetPublicKey,
  sign: schnorrSign,
  verify: schnorrVerify,
  utils: {
    randomPrivateKey: secp256k1.utils.randomPrivateKey,
    lift_x,
    pointToBytes,
    numberToBytesBE,
    bytesToNumberBE,
    taggedHash,
    mod
  }
}))();
var isoMap = (() => isogenyMap(Fp, [
  // xNum
  [
    "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
    "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
    "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
    "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
  ],
  // xDen
  [
    "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
    "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
    "0x0000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ],
  // yNum
  [
    "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
    "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
    "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
    "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
  ],
  // yDen
  [
    "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
    "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
    "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
    "0x0000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ]
].map((i3) => i3.map((j3) => BigInt(j3)))))();
var mapSWU = (() => mapToCurveSimpleSWU(Fp, {
  A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
  B: BigInt("1771"),
  Z: Fp.create(BigInt("-11"))
}))();
var htf = (() => createHasher(secp256k1.ProjectivePoint, (scalars) => {
  const { x: x4, y: y3 } = mapSWU(Fp.create(scalars[0]));
  return isoMap(x4, y3);
}, {
  DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
  encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
  p: Fp.ORDER,
  m: 1,
  k: 128,
  expand: "xmd",
  hash: sha256
}))();
var hashToCurve = (() => htf.hashToCurve)();
var encodeToCurve = (() => htf.encodeToCurve)();

// node_modules/.pnpm/@scure+bip39@1.2.1/node_modules/@scure/bip39/esm/wordlists/english.js
var wordlist = `abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split("\n");

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/_assert.js
function number(n2) {
  if (!Number.isSafeInteger(n2) || n2 < 0)
    throw new Error(`Wrong positive integer: ${n2}`);
}
function bool(b4) {
  if (typeof b4 !== "boolean")
    throw new Error(`Expected boolean, not ${b4}`);
}
function isBytes2(a3) {
  return a3 instanceof Uint8Array || a3 != null && typeof a3 === "object" && a3.constructor.name === "Uint8Array";
}
function bytes(b4, ...lengths) {
  if (!isBytes2(b4))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b4.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b4.length}`);
}
function hash(hash3) {
  if (typeof hash3 !== "function" || typeof hash3.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number(hash3.outputLen);
  number(hash3.blockLen);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
var assert = { number, bool, bytes, hash, exists, output };
var assert_default = assert;

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/crypto.js
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/utils.js
function isBytes3(a3) {
  return a3 instanceof Uint8Array || a3 != null && typeof a3 === "object" && a3.constructor.name === "Uint8Array";
}
var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var rotr = (word, shift) => word << 32 - shift | word >>> shift;
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
var hexes2 = Array.from({ length: 256 }, (_3, i3) => i3.toString(16).padStart(2, "0"));
function bytesToHex3(bytes3) {
  if (!isBytes3(bytes3))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i3 = 0; i3 < bytes3.length; i3++) {
    hex += hexes2[bytes3[i3]];
  }
  return hex;
}
var asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16(char) {
  if (char >= asciis._0 && char <= asciis._9)
    return char - asciis._0;
  if (char >= asciis._A && char <= asciis._F)
    return char - (asciis._A - 10);
  if (char >= asciis._a && char <= asciis._f)
    return char - (asciis._a - 10);
  return;
}
function hexToBytes3(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai2 = 0, hi2 = 0; ai2 < al; ai2++, hi2 += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi2));
    const n2 = asciiToBase16(hex.charCodeAt(hi2 + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi2] + hex[hi2 + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi2);
    }
    array[ai2] = n1 * 16 + n2;
  }
  return array;
}
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes2(data);
  if (!isBytes3(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
function concatBytes3(...arrays) {
  let sum = 0;
  for (let i3 = 0; i3 < arrays.length; i3++) {
    const a3 = arrays[i3];
    if (!isBytes3(a3))
      throw new Error("Uint8Array expected");
    sum += a3.length;
  }
  const res = new Uint8Array(sum);
  for (let i3 = 0, pad = 0; i3 < arrays.length; i3++) {
    const a3 = arrays[i3];
    res.set(a3, pad);
    pad += a3.length;
  }
  return res;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
var toStr = {}.toString;
function checkOpts(defaults, opts) {
  if (opts !== void 0 && toStr.call(opts) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes2(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  constructor(hash3, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    hash(hash3);
    const key = toBytes(_key);
    this.iHash = hash3.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
    for (let i3 = 0; i3 < pad.length; i3++)
      pad[i3] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash3.create();
    for (let i3 = 0; i3 < pad.length; i3++)
      pad[i3] ^= 54 ^ 92;
    this.oHash.update(pad);
    pad.fill(0);
  }
  update(buf) {
    exists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    exists(this);
    bytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to2) {
    to2 || (to2 = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to2 = to2;
    to2.finished = finished;
    to2.destroyed = destroyed;
    to2.blockLen = blockLen;
    to2.outputLen = outputLen;
    to2.oHash = oHash._cloneInto(to2.oHash);
    to2.iHash = iHash._cloneInto(to2.iHash);
    return to2;
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac2 = (hash3, key, message) => new HMAC(hash3, key).update(message).digest();
hmac2.create = (hash3, key) => new HMAC(hash3, key);

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/pbkdf2.js
function pbkdf2Init(hash3, _password, _salt, _opts) {
  hash(hash3);
  const opts = checkOpts({ dkLen: 32, asyncTick: 10 }, _opts);
  const { c: c4, dkLen, asyncTick } = opts;
  number(c4);
  number(dkLen);
  number(asyncTick);
  if (c4 < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const password = toBytes(_password);
  const salt2 = toBytes(_salt);
  const DK = new Uint8Array(dkLen);
  const PRF = hmac2.create(hash3, password);
  const PRFSalt = PRF._cloneInto().update(salt2);
  return { c: c4, dkLen, asyncTick, DK, PRF, PRFSalt };
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u4) {
  PRF.destroy();
  PRFSalt.destroy();
  if (prfW)
    prfW.destroy();
  u4.fill(0);
  return DK;
}
function pbkdf2(hash3, password, salt2, opts) {
  const { c: c4, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash3, password, salt2, opts);
  let prfW;
  const arr = new Uint8Array(4);
  const view = createView(arr);
  const u4 = new Uint8Array(PRF.outputLen);
  for (let ti2 = 1, pos = 0; pos < dkLen; ti2++, pos += PRF.outputLen) {
    const Ti2 = DK.subarray(pos, pos + PRF.outputLen);
    view.setInt32(0, ti2, false);
    (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u4);
    Ti2.set(u4.subarray(0, Ti2.length));
    for (let ui2 = 1; ui2 < c4; ui2++) {
      PRF._cloneInto(prfW).update(u4).digestInto(u4);
      for (let i3 = 0; i3 < Ti2.length; i3++)
        Ti2[i3] ^= u4[i3];
    }
  }
  return pbkdf2Output(PRF, PRFSalt, DK, prfW, u4);
}

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/_sha2.js
function setBigUint64(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h2 = isLE3 ? 4 : 0;
  const l4 = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h2, wh, isLE3);
  view.setUint32(byteOffset + l4, wl, isLE3);
}
var SHA2 = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE3) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE3;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    exists(this);
    const { view, buffer, blockLen } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    exists(this);
    output(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE3 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i3 = pos; i3 < blockLen; i3++)
      buffer[i3] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE3);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i3 = 0; i3 < outLen; i3++)
      oview.setUint32(4 * i3, state[i3], isLE3);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to2) {
    to2 || (to2 = new this.constructor());
    to2.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to2.length = length;
    to2.pos = pos;
    to2.finished = finished;
    to2.destroyed = destroyed;
    if (length % blockLen)
      to2.buffer.set(buffer);
    return to2;
  }
};

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/sha256.js
var Chi = (a3, b4, c4) => a3 & b4 ^ ~a3 & c4;
var Maj = (a3, b4, c4) => a3 & b4 ^ a3 & c4 ^ b4 & c4;
var SHA256_K = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var IV = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA256_W = new Uint32Array(64);
var SHA256 = class extends SHA2 {
  constructor() {
    super(64, 32, 8, false);
    this.A = IV[0] | 0;
    this.B = IV[1] | 0;
    this.C = IV[2] | 0;
    this.D = IV[3] | 0;
    this.E = IV[4] | 0;
    this.F = IV[5] | 0;
    this.G = IV[6] | 0;
    this.H = IV[7] | 0;
  }
  get() {
    const { A: A4, B: B3, C: C4, D: D3, E: E4, F: F3, G: G2, H: H3 } = this;
    return [A4, B3, C4, D3, E4, F3, G2, H3];
  }
  // prettier-ignore
  set(A4, B3, C4, D3, E4, F3, G2, H3) {
    this.A = A4 | 0;
    this.B = B3 | 0;
    this.C = C4 | 0;
    this.D = D3 | 0;
    this.E = E4 | 0;
    this.F = F3 | 0;
    this.G = G2 | 0;
    this.H = H3 | 0;
  }
  process(view, offset) {
    for (let i3 = 0; i3 < 16; i3++, offset += 4)
      SHA256_W[i3] = view.getUint32(offset, false);
    for (let i3 = 16; i3 < 64; i3++) {
      const W15 = SHA256_W[i3 - 15];
      const W22 = SHA256_W[i3 - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W22, 17) ^ rotr(W22, 19) ^ W22 >>> 10;
      SHA256_W[i3] = s1 + SHA256_W[i3 - 7] + s0 + SHA256_W[i3 - 16] | 0;
    }
    let { A: A4, B: B3, C: C4, D: D3, E: E4, F: F3, G: G2, H: H3 } = this;
    for (let i3 = 0; i3 < 64; i3++) {
      const sigma1 = rotr(E4, 6) ^ rotr(E4, 11) ^ rotr(E4, 25);
      const T1 = H3 + sigma1 + Chi(E4, F3, G2) + SHA256_K[i3] + SHA256_W[i3] | 0;
      const sigma0 = rotr(A4, 2) ^ rotr(A4, 13) ^ rotr(A4, 22);
      const T22 = sigma0 + Maj(A4, B3, C4) | 0;
      H3 = G2;
      G2 = F3;
      F3 = E4;
      E4 = D3 + T1 | 0;
      D3 = C4;
      C4 = B3;
      B3 = A4;
      A4 = T1 + T22 | 0;
    }
    A4 = A4 + this.A | 0;
    B3 = B3 + this.B | 0;
    C4 = C4 + this.C | 0;
    D3 = D3 + this.D | 0;
    E4 = E4 + this.E | 0;
    F3 = F3 + this.F | 0;
    G2 = G2 + this.G | 0;
    H3 = H3 + this.H | 0;
    this.set(A4, B3, C4, D3, E4, F3, G2, H3);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
var SHA224 = class extends SHA256 {
  constructor() {
    super();
    this.A = 3238371032 | 0;
    this.B = 914150663 | 0;
    this.C = 812702999 | 0;
    this.D = 4144912697 | 0;
    this.E = 4290775857 | 0;
    this.F = 1750603025 | 0;
    this.G = 1694076839 | 0;
    this.H = 3204075428 | 0;
    this.outputLen = 28;
  }
};
var sha2562 = wrapConstructor(() => new SHA256());
var sha224 = wrapConstructor(() => new SHA224());

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = BigInt(2 ** 32 - 1);
var _32n = BigInt(32);
function fromBig(n2, le2 = false) {
  if (le2)
    return { h: Number(n2 & U32_MASK64), l: Number(n2 >> _32n & U32_MASK64) };
  return { h: Number(n2 >> _32n & U32_MASK64) | 0, l: Number(n2 & U32_MASK64) | 0 };
}
function split(lst, le2 = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i3 = 0; i3 < lst.length; i3++) {
    const { h: h2, l: l4 } = fromBig(lst[i3], le2);
    [Ah[i3], Al[i3]] = [h2, l4];
  }
  return [Ah, Al];
}
var toBig = (h2, l4) => BigInt(h2 >>> 0) << _32n | BigInt(l4 >>> 0);
var shrSH = (h2, _l, s3) => h2 >>> s3;
var shrSL = (h2, l4, s3) => h2 << 32 - s3 | l4 >>> s3;
var rotrSH = (h2, l4, s3) => h2 >>> s3 | l4 << 32 - s3;
var rotrSL = (h2, l4, s3) => h2 << 32 - s3 | l4 >>> s3;
var rotrBH = (h2, l4, s3) => h2 << 64 - s3 | l4 >>> s3 - 32;
var rotrBL = (h2, l4, s3) => h2 >>> s3 - 32 | l4 << 64 - s3;
var rotr32H = (_h, l4) => l4;
var rotr32L = (h2, _l) => h2;
var rotlSH = (h2, l4, s3) => h2 << s3 | l4 >>> 32 - s3;
var rotlSL = (h2, l4, s3) => l4 << s3 | h2 >>> 32 - s3;
var rotlBH = (h2, l4, s3) => l4 << s3 - 32 | h2 >>> 64 - s3;
var rotlBL = (h2, l4, s3) => h2 << s3 - 32 | l4 >>> 64 - s3;
function add(Ah, Al, Bh, Bl) {
  const l4 = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l4 / 2 ** 32 | 0) | 0, l: l4 | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
var u64 = {
  fromBig,
  split,
  toBig,
  shrSH,
  shrSL,
  rotrSH,
  rotrSL,
  rotrBH,
  rotrBL,
  rotr32H,
  rotr32L,
  rotlSH,
  rotlSL,
  rotlBH,
  rotlBL,
  add,
  add3L,
  add3H,
  add4L,
  add4H,
  add5H,
  add5L
};
var u64_default = u64;

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/sha512.js
var [SHA512_Kh, SHA512_Kl] = (() => u64_default.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n2) => BigInt(n2))))();
var SHA512_W_H = new Uint32Array(80);
var SHA512_W_L = new Uint32Array(80);
var SHA512 = class extends SHA2 {
  constructor() {
    super(128, 64, 16, false);
    this.Ah = 1779033703 | 0;
    this.Al = 4089235720 | 0;
    this.Bh = 3144134277 | 0;
    this.Bl = 2227873595 | 0;
    this.Ch = 1013904242 | 0;
    this.Cl = 4271175723 | 0;
    this.Dh = 2773480762 | 0;
    this.Dl = 1595750129 | 0;
    this.Eh = 1359893119 | 0;
    this.El = 2917565137 | 0;
    this.Fh = 2600822924 | 0;
    this.Fl = 725511199 | 0;
    this.Gh = 528734635 | 0;
    this.Gl = 4215389547 | 0;
    this.Hh = 1541459225 | 0;
    this.Hl = 327033209 | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i3 = 0; i3 < 16; i3++, offset += 4) {
      SHA512_W_H[i3] = view.getUint32(offset);
      SHA512_W_L[i3] = view.getUint32(offset += 4);
    }
    for (let i3 = 16; i3 < 80; i3++) {
      const W15h = SHA512_W_H[i3 - 15] | 0;
      const W15l = SHA512_W_L[i3 - 15] | 0;
      const s0h = u64_default.rotrSH(W15h, W15l, 1) ^ u64_default.rotrSH(W15h, W15l, 8) ^ u64_default.shrSH(W15h, W15l, 7);
      const s0l = u64_default.rotrSL(W15h, W15l, 1) ^ u64_default.rotrSL(W15h, W15l, 8) ^ u64_default.shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i3 - 2] | 0;
      const W2l = SHA512_W_L[i3 - 2] | 0;
      const s1h = u64_default.rotrSH(W2h, W2l, 19) ^ u64_default.rotrBH(W2h, W2l, 61) ^ u64_default.shrSH(W2h, W2l, 6);
      const s1l = u64_default.rotrSL(W2h, W2l, 19) ^ u64_default.rotrBL(W2h, W2l, 61) ^ u64_default.shrSL(W2h, W2l, 6);
      const SUMl = u64_default.add4L(s0l, s1l, SHA512_W_L[i3 - 7], SHA512_W_L[i3 - 16]);
      const SUMh = u64_default.add4H(SUMl, s0h, s1h, SHA512_W_H[i3 - 7], SHA512_W_H[i3 - 16]);
      SHA512_W_H[i3] = SUMh | 0;
      SHA512_W_L[i3] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i3 = 0; i3 < 80; i3++) {
      const sigma1h = u64_default.rotrSH(Eh, El, 14) ^ u64_default.rotrSH(Eh, El, 18) ^ u64_default.rotrBH(Eh, El, 41);
      const sigma1l = u64_default.rotrSL(Eh, El, 14) ^ u64_default.rotrSL(Eh, El, 18) ^ u64_default.rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = u64_default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i3], SHA512_W_L[i3]);
      const T1h = u64_default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i3], SHA512_W_H[i3]);
      const T1l = T1ll | 0;
      const sigma0h = u64_default.rotrSH(Ah, Al, 28) ^ u64_default.rotrBH(Ah, Al, 34) ^ u64_default.rotrBH(Ah, Al, 39);
      const sigma0l = u64_default.rotrSL(Ah, Al, 28) ^ u64_default.rotrBL(Ah, Al, 34) ^ u64_default.rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = u64_default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = u64_default.add3L(T1l, sigma0l, MAJl);
      Ah = u64_default.add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = u64_default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = u64_default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = u64_default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = u64_default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = u64_default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = u64_default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = u64_default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = u64_default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    SHA512_W_H.fill(0);
    SHA512_W_L.fill(0);
  }
  destroy() {
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var SHA512_224 = class extends SHA512 {
  constructor() {
    super();
    this.Ah = 2352822216 | 0;
    this.Al = 424955298 | 0;
    this.Bh = 1944164710 | 0;
    this.Bl = 2312950998 | 0;
    this.Ch = 502970286 | 0;
    this.Cl = 855612546 | 0;
    this.Dh = 1738396948 | 0;
    this.Dl = 1479516111 | 0;
    this.Eh = 258812777 | 0;
    this.El = 2077511080 | 0;
    this.Fh = 2011393907 | 0;
    this.Fl = 79989058 | 0;
    this.Gh = 1067287976 | 0;
    this.Gl = 1780299464 | 0;
    this.Hh = 286451373 | 0;
    this.Hl = 2446758561 | 0;
    this.outputLen = 28;
  }
};
var SHA512_256 = class extends SHA512 {
  constructor() {
    super();
    this.Ah = 573645204 | 0;
    this.Al = 4230739756 | 0;
    this.Bh = 2673172387 | 0;
    this.Bl = 3360449730 | 0;
    this.Ch = 596883563 | 0;
    this.Cl = 1867755857 | 0;
    this.Dh = 2520282905 | 0;
    this.Dl = 1497426621 | 0;
    this.Eh = 2519219938 | 0;
    this.El = 2827943907 | 0;
    this.Fh = 3193839141 | 0;
    this.Fl = 1401305490 | 0;
    this.Gh = 721525244 | 0;
    this.Gl = 746961066 | 0;
    this.Hh = 246885852 | 0;
    this.Hl = 2177182882 | 0;
    this.outputLen = 32;
  }
};
var SHA384 = class extends SHA512 {
  constructor() {
    super();
    this.Ah = 3418070365 | 0;
    this.Al = 3238371032 | 0;
    this.Bh = 1654270250 | 0;
    this.Bl = 914150663 | 0;
    this.Ch = 2438529370 | 0;
    this.Cl = 812702999 | 0;
    this.Dh = 355462360 | 0;
    this.Dl = 4144912697 | 0;
    this.Eh = 1731405415 | 0;
    this.El = 4290775857 | 0;
    this.Fh = 2394180231 | 0;
    this.Fl = 1750603025 | 0;
    this.Gh = 3675008525 | 0;
    this.Gl = 1694076839 | 0;
    this.Hh = 1203062813 | 0;
    this.Hl = 3204075428 | 0;
    this.outputLen = 48;
  }
};
var sha512 = wrapConstructor(() => new SHA512());
var sha512_224 = wrapConstructor(() => new SHA512_224());
var sha512_256 = wrapConstructor(() => new SHA512_256());
var sha384 = wrapConstructor(() => new SHA384());

// node_modules/.pnpm/@scure+bip39@1.2.1/node_modules/@scure/bip39/esm/index.js
var isJapanese = (wordlist2) => wordlist2[0] === "あいこくしん";
function nfkd(str) {
  if (typeof str !== "string")
    throw new TypeError(`Invalid mnemonic type: ${typeof str}`);
  return str.normalize("NFKD");
}
function normalize(str) {
  const norm = nfkd(str);
  const words = norm.split(" ");
  if (![12, 15, 18, 21, 24].includes(words.length))
    throw new Error("Invalid mnemonic");
  return { nfkd: norm, words };
}
function assertEntropy(entropy) {
  assert_default.bytes(entropy, 16, 20, 24, 28, 32);
}
function generateMnemonic(wordlist2, strength = 128) {
  assert_default.number(strength);
  if (strength % 32 !== 0 || strength > 256)
    throw new TypeError("Invalid entropy");
  return entropyToMnemonic(randomBytes2(strength / 8), wordlist2);
}
var calcChecksum = (entropy) => {
  const bitsLeft = 8 - entropy.length / 4;
  return new Uint8Array([sha2562(entropy)[0] >> bitsLeft << bitsLeft]);
};
function getCoder(wordlist2) {
  if (!Array.isArray(wordlist2) || wordlist2.length !== 2048 || typeof wordlist2[0] !== "string")
    throw new Error("Worlist: expected array of 2048 strings");
  wordlist2.forEach((i3) => {
    if (typeof i3 !== "string")
      throw new Error(`Wordlist: non-string element: ${i3}`);
  });
  return utils.chain(utils.checksum(1, calcChecksum), utils.radix2(11, true), utils.alphabet(wordlist2));
}
function mnemonicToEntropy(mnemonic, wordlist2) {
  const { words } = normalize(mnemonic);
  const entropy = getCoder(wordlist2).decode(words);
  assertEntropy(entropy);
  return entropy;
}
function entropyToMnemonic(entropy, wordlist2) {
  assertEntropy(entropy);
  const words = getCoder(wordlist2).encode(entropy);
  return words.join(isJapanese(wordlist2) ? "　" : " ");
}
function validateMnemonic(mnemonic, wordlist2) {
  try {
    mnemonicToEntropy(mnemonic, wordlist2);
  } catch (e2) {
    return false;
  }
  return true;
}
var salt = (passphrase) => nfkd(`mnemonic${passphrase}`);
function mnemonicToSeedSync(mnemonic, passphrase = "") {
  return pbkdf2(sha512, normalize(mnemonic).nfkd, salt(passphrase), { c: 2048, dkLen: 64 });
}

// node_modules/.pnpm/@noble+hashes@1.3.3/node_modules/@noble/hashes/esm/ripemd160.js
var Rho = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
var Id = Uint8Array.from({ length: 16 }, (_3, i3) => i3);
var Pi = Id.map((i3) => (9 * i3 + 5) % 16);
var idxL = [Id];
var idxR = [Pi];
for (let i3 = 0; i3 < 4; i3++)
  for (let j3 of [idxL, idxR])
    j3.push(j3[i3].map((k3) => Rho[k3]));
var shifts = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i3) => new Uint8Array(i3));
var shiftsL = idxL.map((idx, i3) => idx.map((j3) => shifts[i3][j3]));
var shiftsR = idxR.map((idx, i3) => idx.map((j3) => shifts[i3][j3]));
var Kl = new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr = new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
var rotl = (word, shift) => word << shift | word >>> 32 - shift;
function f(group, x4, y3, z3) {
  if (group === 0)
    return x4 ^ y3 ^ z3;
  else if (group === 1)
    return x4 & y3 | ~x4 & z3;
  else if (group === 2)
    return (x4 | ~y3) ^ z3;
  else if (group === 3)
    return x4 & z3 | y3 & ~z3;
  else
    return x4 ^ (y3 | ~z3);
}
var BUF = new Uint32Array(16);
var RIPEMD160 = class extends SHA2 {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2, h3, h4 } = this;
    return [h0, h1, h2, h3, h4];
  }
  set(h0, h1, h2, h3, h4) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h2 | 0;
    this.h3 = h3 | 0;
    this.h4 = h4 | 0;
  }
  process(view, offset) {
    for (let i3 = 0; i3 < 16; i3++, offset += 4)
      BUF[i3] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar2 = al, bl = this.h1 | 0, br2 = bl, cl = this.h2 | 0, cr2 = cl, dl = this.h3 | 0, dr2 = dl, el = this.h4 | 0, er2 = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl[group], hbr = Kr[group];
      const rl = idxL[group], rr2 = idxR[group];
      const sl = shiftsL[group], sr2 = shiftsR[group];
      for (let i3 = 0; i3 < 16; i3++) {
        const tl = rotl(al + f(group, bl, cl, dl) + BUF[rl[i3]] + hbl, sl[i3]) + el | 0;
        al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i3 = 0; i3 < 16; i3++) {
        const tr2 = rotl(ar2 + f(rGroup, br2, cr2, dr2) + BUF[rr2[i3]] + hbr, sr2[i3]) + er2 | 0;
        ar2 = er2, er2 = dr2, dr2 = rotl(cr2, 10) | 0, cr2 = br2, br2 = tr2;
      }
    }
    this.set(this.h1 + cl + dr2 | 0, this.h2 + dl + er2 | 0, this.h3 + el + ar2 | 0, this.h4 + al + br2 | 0, this.h0 + bl + cr2 | 0);
  }
  roundClean() {
    BUF.fill(0);
  }
  destroy() {
    this.destroyed = true;
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd160 = wrapConstructor(() => new RIPEMD160());

// node_modules/.pnpm/@scure+bip32@1.3.1/node_modules/@scure/bip32/lib/esm/index.js
var Point2 = secp256k1.ProjectivePoint;
var base58check2 = base58check(sha2562);
function bytesToNumber(bytes3) {
  return BigInt(`0x${bytesToHex3(bytes3)}`);
}
function numberToBytes(num) {
  return hexToBytes3(num.toString(16).padStart(64, "0"));
}
var MASTER_SECRET = utf8ToBytes2("Bitcoin seed");
var BITCOIN_VERSIONS = { private: 76066276, public: 76067358 };
var HARDENED_OFFSET = 2147483648;
var hash160 = (data) => ripemd160(sha2562(data));
var fromU32 = (data) => createView(data).getUint32(0, false);
var toU32 = (n2) => {
  if (!Number.isSafeInteger(n2) || n2 < 0 || n2 > 2 ** 32 - 1) {
    throw new Error(`Invalid number=${n2}. Should be from 0 to 2 ** 32 - 1`);
  }
  const buf = new Uint8Array(4);
  createView(buf).setUint32(0, n2, false);
  return buf;
};
var HDKey = class _HDKey {
  get fingerprint() {
    if (!this.pubHash) {
      throw new Error("No publicKey set!");
    }
    return fromU32(this.pubHash);
  }
  get identifier() {
    return this.pubHash;
  }
  get pubKeyHash() {
    return this.pubHash;
  }
  get privateKey() {
    return this.privKeyBytes || null;
  }
  get publicKey() {
    return this.pubKey || null;
  }
  get privateExtendedKey() {
    const priv = this.privateKey;
    if (!priv) {
      throw new Error("No private key");
    }
    return base58check2.encode(this.serialize(this.versions.private, concatBytes3(new Uint8Array([0]), priv)));
  }
  get publicExtendedKey() {
    if (!this.pubKey) {
      throw new Error("No public key");
    }
    return base58check2.encode(this.serialize(this.versions.public, this.pubKey));
  }
  static fromMasterSeed(seed, versions = BITCOIN_VERSIONS) {
    bytes(seed);
    if (8 * seed.length < 128 || 8 * seed.length > 512) {
      throw new Error(`HDKey: wrong seed length=${seed.length}. Should be between 128 and 512 bits; 256 bits is advised)`);
    }
    const I4 = hmac2(sha512, MASTER_SECRET, seed);
    return new _HDKey({
      versions,
      chainCode: I4.slice(32),
      privateKey: I4.slice(0, 32)
    });
  }
  static fromExtendedKey(base58key, versions = BITCOIN_VERSIONS) {
    const keyBuffer = base58check2.decode(base58key);
    const keyView = createView(keyBuffer);
    const version = keyView.getUint32(0, false);
    const opt = {
      versions,
      depth: keyBuffer[4],
      parentFingerprint: keyView.getUint32(5, false),
      index: keyView.getUint32(9, false),
      chainCode: keyBuffer.slice(13, 45)
    };
    const key = keyBuffer.slice(45);
    const isPriv = key[0] === 0;
    if (version !== versions[isPriv ? "private" : "public"]) {
      throw new Error("Version mismatch");
    }
    if (isPriv) {
      return new _HDKey({ ...opt, privateKey: key.slice(1) });
    } else {
      return new _HDKey({ ...opt, publicKey: key });
    }
  }
  static fromJSON(json) {
    return _HDKey.fromExtendedKey(json.xpriv);
  }
  constructor(opt) {
    this.depth = 0;
    this.index = 0;
    this.chainCode = null;
    this.parentFingerprint = 0;
    if (!opt || typeof opt !== "object") {
      throw new Error("HDKey.constructor must not be called directly");
    }
    this.versions = opt.versions || BITCOIN_VERSIONS;
    this.depth = opt.depth || 0;
    this.chainCode = opt.chainCode;
    this.index = opt.index || 0;
    this.parentFingerprint = opt.parentFingerprint || 0;
    if (!this.depth) {
      if (this.parentFingerprint || this.index) {
        throw new Error("HDKey: zero depth with non-zero index/parent fingerprint");
      }
    }
    if (opt.publicKey && opt.privateKey) {
      throw new Error("HDKey: publicKey and privateKey at same time.");
    }
    if (opt.privateKey) {
      if (!secp256k1.utils.isValidPrivateKey(opt.privateKey)) {
        throw new Error("Invalid private key");
      }
      this.privKey = typeof opt.privateKey === "bigint" ? opt.privateKey : bytesToNumber(opt.privateKey);
      this.privKeyBytes = numberToBytes(this.privKey);
      this.pubKey = secp256k1.getPublicKey(opt.privateKey, true);
    } else if (opt.publicKey) {
      this.pubKey = Point2.fromHex(opt.publicKey).toRawBytes(true);
    } else {
      throw new Error("HDKey: no public or private key provided");
    }
    this.pubHash = hash160(this.pubKey);
  }
  derive(path) {
    if (!/^[mM]'?/.test(path)) {
      throw new Error('Path must start with "m" or "M"');
    }
    if (/^[mM]'?$/.test(path)) {
      return this;
    }
    const parts = path.replace(/^[mM]'?\//, "").split("/");
    let child = this;
    for (const c4 of parts) {
      const m4 = /^(\d+)('?)$/.exec(c4);
      if (!m4 || m4.length !== 3) {
        throw new Error(`Invalid child index: ${c4}`);
      }
      let idx = +m4[1];
      if (!Number.isSafeInteger(idx) || idx >= HARDENED_OFFSET) {
        throw new Error("Invalid index");
      }
      if (m4[2] === "'") {
        idx += HARDENED_OFFSET;
      }
      child = child.deriveChild(idx);
    }
    return child;
  }
  deriveChild(index) {
    if (!this.pubKey || !this.chainCode) {
      throw new Error("No publicKey or chainCode set");
    }
    let data = toU32(index);
    if (index >= HARDENED_OFFSET) {
      const priv = this.privateKey;
      if (!priv) {
        throw new Error("Could not derive hardened child key");
      }
      data = concatBytes3(new Uint8Array([0]), priv, data);
    } else {
      data = concatBytes3(this.pubKey, data);
    }
    const I4 = hmac2(sha512, this.chainCode, data);
    const childTweak = bytesToNumber(I4.slice(0, 32));
    const chainCode = I4.slice(32);
    if (!secp256k1.utils.isValidPrivateKey(childTweak)) {
      throw new Error("Tweak bigger than curve order");
    }
    const opt = {
      versions: this.versions,
      chainCode,
      depth: this.depth + 1,
      parentFingerprint: this.fingerprint,
      index
    };
    try {
      if (this.privateKey) {
        const added = mod(this.privKey + childTweak, secp256k1.CURVE.n);
        if (!secp256k1.utils.isValidPrivateKey(added)) {
          throw new Error("The tweak was out of range or the resulted private key is invalid");
        }
        opt.privateKey = added;
      } else {
        const added = Point2.fromHex(this.pubKey).add(Point2.fromPrivateKey(childTweak));
        if (added.equals(Point2.ZERO)) {
          throw new Error("The tweak was equal to negative P, which made the result key invalid");
        }
        opt.publicKey = added.toRawBytes(true);
      }
      return new _HDKey(opt);
    } catch (err) {
      return this.deriveChild(index + 1);
    }
  }
  sign(hash3) {
    if (!this.privateKey) {
      throw new Error("No privateKey set!");
    }
    bytes(hash3, 32);
    return secp256k1.sign(hash3, this.privKey).toCompactRawBytes();
  }
  verify(hash3, signature) {
    bytes(hash3, 32);
    bytes(signature, 64);
    if (!this.publicKey) {
      throw new Error("No publicKey set!");
    }
    let sig;
    try {
      sig = secp256k1.Signature.fromCompact(signature);
    } catch (error) {
      return false;
    }
    return secp256k1.verify(sig, hash3, this.publicKey);
  }
  wipePrivateData() {
    this.privKey = void 0;
    if (this.privKeyBytes) {
      this.privKeyBytes.fill(0);
      this.privKeyBytes = void 0;
    }
    return this;
  }
  toJSON() {
    return {
      xpriv: this.privateExtendedKey,
      xpub: this.publicExtendedKey
    };
  }
  serialize(version, key) {
    if (!this.chainCode) {
      throw new Error("No chainCode set");
    }
    bytes(key, 33);
    return concatBytes3(toU32(version), new Uint8Array([this.depth]), toU32(this.parentFingerprint), toU32(this.index), this.chainCode, key);
  }
};

// node_modules/.pnpm/@noble+ciphers@0.2.0/node_modules/@noble/ciphers/esm/utils.js
var u8a2 = (a3) => a3 instanceof Uint8Array;
var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var createView2 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var isLE2 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE2)
  throw new Error("Non little-endian hardware is not supported");
var hexes3 = Array.from({ length: 256 }, (_3, i3) => i3.toString(16).padStart(2, "0"));
function utf8ToBytes3(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes3(data);
  if (!u8a2(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
var isPlainObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]" && obj.constructor === Object;
function checkOpts2(defaults, opts) {
  if (opts !== void 0 && (typeof opts !== "object" || !isPlainObject(opts)))
    throw new Error("options must be object or undefined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
function ensureBytes2(b4, len) {
  if (!(b4 instanceof Uint8Array))
    throw new Error("Uint8Array expected");
  if (typeof len === "number") {
    if (b4.length !== len)
      throw new Error(`Uint8Array length ${len} expected`);
  }
}
function equalBytes2(a3, b4) {
  if (a3.length !== b4.length)
    throw new Error("equalBytes: Different size of Uint8Arrays");
  let isSame = true;
  for (let i3 = 0; i3 < a3.length; i3++)
    isSame && (isSame = a3[i3] === b4[i3]);
  return isSame;
}
function setBigUint642(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h2 = isLE3 ? 4 : 0;
  const l4 = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h2, wh, isLE3);
  view.setUint32(byteOffset + l4, wl, isLE3);
}

// node_modules/.pnpm/@noble+ciphers@0.2.0/node_modules/@noble/ciphers/esm/_assert.js
function number2(n2) {
  if (!Number.isSafeInteger(n2) || n2 < 0)
    throw new Error(`Wrong positive integer: ${n2}`);
}
function bool2(b4) {
  if (typeof b4 !== "boolean")
    throw new Error(`Expected boolean, not ${b4}`);
}
function bytes2(b4, ...lengths) {
  if (!(b4 instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b4.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b4.length}`);
}
function hash2(hash3) {
  if (typeof hash3 !== "function" || typeof hash3.create !== "function")
    throw new Error("hash must be wrapped by utils.wrapConstructor");
  number2(hash3.outputLen);
  number2(hash3.blockLen);
}
function exists2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output2(out, instance) {
  bytes2(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
var assert2 = { number: number2, bool: bool2, bytes: bytes2, hash: hash2, exists: exists2, output: output2 };
var assert_default2 = assert2;

// node_modules/.pnpm/@noble+ciphers@0.2.0/node_modules/@noble/ciphers/esm/_poly1305.js
var u8to16 = (a3, i3) => a3[i3++] & 255 | (a3[i3++] & 255) << 8;
var Poly1305 = class {
  constructor(key) {
    this.blockLen = 16;
    this.outputLen = 16;
    this.buffer = new Uint8Array(16);
    this.r = new Uint16Array(10);
    this.h = new Uint16Array(10);
    this.pad = new Uint16Array(8);
    this.pos = 0;
    this.finished = false;
    key = toBytes2(key);
    ensureBytes2(key, 32);
    const t0 = u8to16(key, 0);
    const t1 = u8to16(key, 2);
    const t2 = u8to16(key, 4);
    const t3 = u8to16(key, 6);
    const t4 = u8to16(key, 8);
    const t5 = u8to16(key, 10);
    const t6 = u8to16(key, 12);
    const t7 = u8to16(key, 14);
    this.r[0] = t0 & 8191;
    this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
    this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
    this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
    this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
    this.r[5] = t4 >>> 1 & 8190;
    this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
    this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
    this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
    this.r[9] = t7 >>> 5 & 127;
    for (let i3 = 0; i3 < 8; i3++)
      this.pad[i3] = u8to16(key, 16 + 2 * i3);
  }
  process(data, offset, isLast = false) {
    const hibit = isLast ? 0 : 1 << 11;
    const { h: h2, r: r2 } = this;
    const r0 = r2[0];
    const r1 = r2[1];
    const r22 = r2[2];
    const r3 = r2[3];
    const r4 = r2[4];
    const r5 = r2[5];
    const r6 = r2[6];
    const r7 = r2[7];
    const r8 = r2[8];
    const r9 = r2[9];
    const t0 = u8to16(data, offset + 0);
    const t1 = u8to16(data, offset + 2);
    const t2 = u8to16(data, offset + 4);
    const t3 = u8to16(data, offset + 6);
    const t4 = u8to16(data, offset + 8);
    const t5 = u8to16(data, offset + 10);
    const t6 = u8to16(data, offset + 12);
    const t7 = u8to16(data, offset + 14);
    let h0 = h2[0] + (t0 & 8191);
    let h1 = h2[1] + ((t0 >>> 13 | t1 << 3) & 8191);
    let h22 = h2[2] + ((t1 >>> 10 | t2 << 6) & 8191);
    let h3 = h2[3] + ((t2 >>> 7 | t3 << 9) & 8191);
    let h4 = h2[4] + ((t3 >>> 4 | t4 << 12) & 8191);
    let h5 = h2[5] + (t4 >>> 1 & 8191);
    let h6 = h2[6] + ((t4 >>> 14 | t5 << 2) & 8191);
    let h7 = h2[7] + ((t5 >>> 11 | t6 << 5) & 8191);
    let h8 = h2[8] + ((t6 >>> 8 | t7 << 8) & 8191);
    let h9 = h2[9] + (t7 >>> 5 | hibit);
    let c4 = 0;
    let d0 = c4 + h0 * r0 + h1 * (5 * r9) + h22 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
    c4 = d0 >>> 13;
    d0 &= 8191;
    d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r22) + h9 * (5 * r1);
    c4 += d0 >>> 13;
    d0 &= 8191;
    let d1 = c4 + h0 * r1 + h1 * r0 + h22 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
    c4 = d1 >>> 13;
    d1 &= 8191;
    d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r22);
    c4 += d1 >>> 13;
    d1 &= 8191;
    let d22 = c4 + h0 * r22 + h1 * r1 + h22 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
    c4 = d22 >>> 13;
    d22 &= 8191;
    d22 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
    c4 += d22 >>> 13;
    d22 &= 8191;
    let d32 = c4 + h0 * r3 + h1 * r22 + h22 * r1 + h3 * r0 + h4 * (5 * r9);
    c4 = d32 >>> 13;
    d32 &= 8191;
    d32 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
    c4 += d32 >>> 13;
    d32 &= 8191;
    let d42 = c4 + h0 * r4 + h1 * r3 + h22 * r22 + h3 * r1 + h4 * r0;
    c4 = d42 >>> 13;
    d42 &= 8191;
    d42 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
    c4 += d42 >>> 13;
    d42 &= 8191;
    let d5 = c4 + h0 * r5 + h1 * r4 + h22 * r3 + h3 * r22 + h4 * r1;
    c4 = d5 >>> 13;
    d5 &= 8191;
    d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
    c4 += d5 >>> 13;
    d5 &= 8191;
    let d6 = c4 + h0 * r6 + h1 * r5 + h22 * r4 + h3 * r3 + h4 * r22;
    c4 = d6 >>> 13;
    d6 &= 8191;
    d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
    c4 += d6 >>> 13;
    d6 &= 8191;
    let d7 = c4 + h0 * r7 + h1 * r6 + h22 * r5 + h3 * r4 + h4 * r3;
    c4 = d7 >>> 13;
    d7 &= 8191;
    d7 += h5 * r22 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
    c4 += d7 >>> 13;
    d7 &= 8191;
    let d8 = c4 + h0 * r8 + h1 * r7 + h22 * r6 + h3 * r5 + h4 * r4;
    c4 = d8 >>> 13;
    d8 &= 8191;
    d8 += h5 * r3 + h6 * r22 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
    c4 += d8 >>> 13;
    d8 &= 8191;
    let d9 = c4 + h0 * r9 + h1 * r8 + h22 * r7 + h3 * r6 + h4 * r5;
    c4 = d9 >>> 13;
    d9 &= 8191;
    d9 += h5 * r4 + h6 * r3 + h7 * r22 + h8 * r1 + h9 * r0;
    c4 += d9 >>> 13;
    d9 &= 8191;
    c4 = (c4 << 2) + c4 | 0;
    c4 = c4 + d0 | 0;
    d0 = c4 & 8191;
    c4 = c4 >>> 13;
    d1 += c4;
    h2[0] = d0;
    h2[1] = d1;
    h2[2] = d22;
    h2[3] = d32;
    h2[4] = d42;
    h2[5] = d5;
    h2[6] = d6;
    h2[7] = d7;
    h2[8] = d8;
    h2[9] = d9;
  }
  finalize() {
    const { h: h2, pad } = this;
    const g4 = new Uint16Array(10);
    let c4 = h2[1] >>> 13;
    h2[1] &= 8191;
    for (let i3 = 2; i3 < 10; i3++) {
      h2[i3] += c4;
      c4 = h2[i3] >>> 13;
      h2[i3] &= 8191;
    }
    h2[0] += c4 * 5;
    c4 = h2[0] >>> 13;
    h2[0] &= 8191;
    h2[1] += c4;
    c4 = h2[1] >>> 13;
    h2[1] &= 8191;
    h2[2] += c4;
    g4[0] = h2[0] + 5;
    c4 = g4[0] >>> 13;
    g4[0] &= 8191;
    for (let i3 = 1; i3 < 10; i3++) {
      g4[i3] = h2[i3] + c4;
      c4 = g4[i3] >>> 13;
      g4[i3] &= 8191;
    }
    g4[9] -= 1 << 13;
    let mask = (c4 ^ 1) - 1;
    for (let i3 = 0; i3 < 10; i3++)
      g4[i3] &= mask;
    mask = ~mask;
    for (let i3 = 0; i3 < 10; i3++)
      h2[i3] = h2[i3] & mask | g4[i3];
    h2[0] = (h2[0] | h2[1] << 13) & 65535;
    h2[1] = (h2[1] >>> 3 | h2[2] << 10) & 65535;
    h2[2] = (h2[2] >>> 6 | h2[3] << 7) & 65535;
    h2[3] = (h2[3] >>> 9 | h2[4] << 4) & 65535;
    h2[4] = (h2[4] >>> 12 | h2[5] << 1 | h2[6] << 14) & 65535;
    h2[5] = (h2[6] >>> 2 | h2[7] << 11) & 65535;
    h2[6] = (h2[7] >>> 5 | h2[8] << 8) & 65535;
    h2[7] = (h2[8] >>> 8 | h2[9] << 5) & 65535;
    let f5 = h2[0] + pad[0];
    h2[0] = f5 & 65535;
    for (let i3 = 1; i3 < 8; i3++) {
      f5 = (h2[i3] + pad[i3] | 0) + (f5 >>> 16) | 0;
      h2[i3] = f5 & 65535;
    }
  }
  update(data) {
    assert_default2.exists(this);
    const { buffer, blockLen } = this;
    data = toBytes2(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(data, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(buffer, 0, false);
        this.pos = 0;
      }
    }
    return this;
  }
  destroy() {
    this.h.fill(0);
    this.r.fill(0);
    this.buffer.fill(0);
    this.pad.fill(0);
  }
  digestInto(out) {
    assert_default2.exists(this);
    assert_default2.output(out, this);
    this.finished = true;
    const { buffer, h: h2 } = this;
    let { pos } = this;
    if (pos) {
      buffer[pos++] = 1;
      for (; pos < 16; pos++)
        buffer[pos] = 0;
      this.process(buffer, 0, true);
    }
    this.finalize();
    let opos = 0;
    for (let i3 = 0; i3 < 8; i3++) {
      out[opos++] = h2[i3] >>> 0;
      out[opos++] = h2[i3] >>> 8;
    }
    return out;
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
};
function wrapConstructorWithKey(hashCons) {
  const hashC = (msg, key) => hashCons(key).update(toBytes2(msg)).digest();
  const tmp = hashCons(new Uint8Array(32));
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (key) => hashCons(key);
  return hashC;
}
var poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));

// node_modules/.pnpm/@noble+ciphers@0.2.0/node_modules/@noble/ciphers/esm/_salsa.js
var sigma16 = utf8ToBytes3("expand 16-byte k");
var sigma32 = utf8ToBytes3("expand 32-byte k");
var sigma16_32 = u32(sigma16);
var sigma32_32 = u32(sigma32);
var isAligned32 = (b4) => !(b4.byteOffset % 4);
var salsaBasic = (opts) => {
  const { core, rounds, counterRight, counterLen, allow128bitKeys, extendNonceFn, blockLen } = checkOpts2({ rounds: 20, counterRight: false, counterLen: 8, allow128bitKeys: true, blockLen: 64 }, opts);
  assert_default2.number(counterLen);
  assert_default2.number(rounds);
  assert_default2.number(blockLen);
  assert_default2.bool(counterRight);
  assert_default2.bool(allow128bitKeys);
  const blockLen32 = blockLen / 4;
  if (blockLen % 4 !== 0)
    throw new Error("Salsa/ChaCha: blockLen must be aligned to 4 bytes");
  return (key, nonce, data, output3, counter = 0) => {
    assert_default2.bytes(key);
    assert_default2.bytes(nonce);
    assert_default2.bytes(data);
    if (!output3)
      output3 = new Uint8Array(data.length);
    assert_default2.bytes(output3);
    assert_default2.number(counter);
    if (counter < 0 || counter >= 2 ** 32 - 1)
      throw new Error("Salsa/ChaCha: counter overflow");
    if (output3.length < data.length) {
      throw new Error(`Salsa/ChaCha: output (${output3.length}) is shorter than data (${data.length})`);
    }
    const toClean = [];
    let k3, sigma;
    if (key.length === 32) {
      k3 = key;
      sigma = sigma32_32;
    } else if (key.length === 16 && allow128bitKeys) {
      k3 = new Uint8Array(32);
      k3.set(key);
      k3.set(key, 16);
      sigma = sigma16_32;
      toClean.push(k3);
    } else
      throw new Error(`Salsa/ChaCha: invalid 32-byte key, got length=${key.length}`);
    if (extendNonceFn) {
      if (nonce.length <= 16)
        throw new Error(`Salsa/ChaCha: extended nonce must be bigger than 16 bytes`);
      k3 = extendNonceFn(sigma, k3, nonce.subarray(0, 16), new Uint8Array(32));
      toClean.push(k3);
      nonce = nonce.subarray(16);
    }
    const nonceLen = 16 - counterLen;
    if (nonce.length !== nonceLen)
      throw new Error(`Salsa/ChaCha: nonce must be ${nonceLen} or 16 bytes`);
    if (nonceLen !== 12) {
      const nc = new Uint8Array(12);
      nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
      toClean.push(nonce = nc);
    }
    const block = new Uint8Array(blockLen);
    const b32 = u32(block);
    const k32 = u32(k3);
    const n32 = u32(nonce);
    const d32 = isAligned32(data) && u32(data);
    const o32 = isAligned32(output3) && u32(output3);
    toClean.push(b32);
    const len = data.length;
    for (let pos = 0, ctr = counter; pos < len; ctr++) {
      core(sigma, k32, n32, b32, ctr, rounds);
      if (ctr >= 2 ** 32 - 1)
        throw new Error("Salsa/ChaCha: counter overflow");
      const take = Math.min(blockLen, len - pos);
      if (take === blockLen && o32 && d32) {
        const pos32 = pos / 4;
        if (pos % 4 !== 0)
          throw new Error("Salsa/ChaCha: invalid block position");
        for (let j3 = 0; j3 < blockLen32; j3++)
          o32[pos32 + j3] = d32[pos32 + j3] ^ b32[j3];
        pos += blockLen;
        continue;
      }
      for (let j3 = 0; j3 < take; j3++)
        output3[pos + j3] = data[pos + j3] ^ block[j3];
      pos += take;
    }
    for (let i3 = 0; i3 < toClean.length; i3++)
      toClean[i3].fill(0);
    return output3;
  };
};

// node_modules/.pnpm/@noble+ciphers@0.2.0/node_modules/@noble/ciphers/esm/chacha.js
var rotl2 = (a3, b4) => a3 << b4 | a3 >>> 32 - b4;
function chachaCore(c4, k3, n2, out, cnt, rounds = 20) {
  let y00 = c4[0], y01 = c4[1], y02 = c4[2], y03 = c4[3];
  let y04 = k3[0], y05 = k3[1], y06 = k3[2], y07 = k3[3];
  let y08 = k3[4], y09 = k3[5], y10 = k3[6], y11 = k3[7];
  let y12 = cnt, y13 = n2[0], y14 = n2[1], y15 = n2[2];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let i3 = 0; i3 < rounds; i3 += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl2(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl2(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl2(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl2(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl2(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl2(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl2(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl2(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl2(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl2(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl2(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl2(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl2(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl2(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl2(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl2(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl2(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl2(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl2(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl2(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl2(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl2(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl2(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl2(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl2(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl2(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl2(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl2(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl2(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl2(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl2(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl2(x04 ^ x09, 7);
  }
  let oi2 = 0;
  out[oi2++] = y00 + x00 | 0;
  out[oi2++] = y01 + x01 | 0;
  out[oi2++] = y02 + x02 | 0;
  out[oi2++] = y03 + x03 | 0;
  out[oi2++] = y04 + x04 | 0;
  out[oi2++] = y05 + x05 | 0;
  out[oi2++] = y06 + x06 | 0;
  out[oi2++] = y07 + x07 | 0;
  out[oi2++] = y08 + x08 | 0;
  out[oi2++] = y09 + x09 | 0;
  out[oi2++] = y10 + x10 | 0;
  out[oi2++] = y11 + x11 | 0;
  out[oi2++] = y12 + x12 | 0;
  out[oi2++] = y13 + x13 | 0;
  out[oi2++] = y14 + x14 | 0;
  out[oi2++] = y15 + x15 | 0;
}
function hchacha(c4, key, src, out) {
  const k32 = u32(key);
  const i32 = u32(src);
  const o32 = u32(out);
  let x00 = c4[0], x01 = c4[1], x02 = c4[2], x03 = c4[3];
  let x04 = k32[0], x05 = k32[1], x06 = k32[2], x07 = k32[3];
  let x08 = k32[4], x09 = k32[5], x10 = k32[6], x11 = k32[7];
  let x12 = i32[0], x13 = i32[1], x14 = i32[2], x15 = i32[3];
  for (let i3 = 0; i3 < 20; i3 += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl2(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl2(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl2(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl2(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl2(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl2(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl2(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl2(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl2(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl2(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl2(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl2(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl2(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl2(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl2(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl2(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl2(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl2(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl2(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl2(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl2(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl2(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl2(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl2(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl2(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl2(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl2(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl2(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl2(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl2(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl2(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl2(x04 ^ x09, 7);
  }
  o32[0] = x00;
  o32[1] = x01;
  o32[2] = x02;
  o32[3] = x03;
  o32[4] = x12;
  o32[5] = x13;
  o32[6] = x14;
  o32[7] = x15;
  return out;
}
var chacha20orig = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 8
});
var chacha20 = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 4,
  allow128bitKeys: false
});
var xchacha20 = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 8,
  extendNonceFn: hchacha,
  allow128bitKeys: false
});
var chacha8 = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 4,
  rounds: 8
});
var chacha12 = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 4,
  rounds: 12
});
var ZERO = new Uint8Array(16);
var updatePadded = (h2, msg) => {
  h2.update(msg);
  const left = msg.length % 16;
  if (left)
    h2.update(ZERO.subarray(left));
};
var computeTag = (fn2, key, nonce, data, AAD) => {
  const authKey = fn2(key, nonce, new Uint8Array(32));
  const h2 = poly1305.create(authKey);
  if (AAD)
    updatePadded(h2, AAD);
  updatePadded(h2, data);
  const num = new Uint8Array(16);
  const view = createView2(num);
  setBigUint642(view, 0, BigInt(AAD ? AAD.length : 0), true);
  setBigUint642(view, 8, BigInt(data.length), true);
  h2.update(num);
  const res = h2.digest();
  authKey.fill(0);
  return res;
};
var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
  const tagLength = 16;
  ensureBytes2(key, 32);
  ensureBytes2(nonce);
  return {
    tagLength,
    encrypt: (plaintext, output3) => {
      const plength = plaintext.length;
      const clength = plength + tagLength;
      if (output3) {
        ensureBytes2(output3, clength);
      } else {
        output3 = new Uint8Array(clength);
      }
      xorStream(key, nonce, plaintext, output3, 1);
      const tag = computeTag(xorStream, key, nonce, output3.subarray(0, -tagLength), AAD);
      output3.set(tag, plength);
      return output3;
    },
    decrypt: (ciphertext, output3) => {
      const clength = ciphertext.length;
      const plength = clength - tagLength;
      if (clength < tagLength)
        throw new Error(`encrypted data must be at least ${tagLength} bytes`);
      if (output3) {
        ensureBytes2(output3, plength);
      } else {
        output3 = new Uint8Array(plength);
      }
      const data = ciphertext.subarray(0, -tagLength);
      const passedTag = ciphertext.subarray(-tagLength);
      const tag = computeTag(xorStream, key, nonce, data, AAD);
      if (!equalBytes2(passedTag, tag))
        throw new Error("invalid tag");
      xorStream(key, nonce, data, output3, 1);
      return output3;
    }
  };
};
var chacha20poly1305 = _poly1305_aead(chacha20);
var xchacha20poly1305 = _poly1305_aead(xchacha20);

// node_modules/.pnpm/nostr-tools@1.17.0_typescript@5.6.2/node_modules/nostr-tools/lib/esm/index.js
var __defProp = Object.defineProperty;
var __export2 = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
function generatePrivateKey() {
  return bytesToHex(schnorr.utils.randomPrivateKey());
}
function getPublicKey(privateKey) {
  return bytesToHex(schnorr.getPublicKey(privateKey));
}
var utils_exports2 = {};
__export2(utils_exports2, {
  MessageNode: () => MessageNode,
  MessageQueue: () => MessageQueue,
  insertEventIntoAscendingList: () => insertEventIntoAscendingList,
  insertEventIntoDescendingList: () => insertEventIntoDescendingList,
  normalizeURL: () => normalizeURL,
  utf8Decoder: () => utf8Decoder,
  utf8Encoder: () => utf8Encoder
});
var utf8Decoder = new TextDecoder("utf-8");
var utf8Encoder = new TextEncoder();
function normalizeURL(url) {
  let p5 = new URL(url);
  p5.pathname = p5.pathname.replace(/\/+/g, "/");
  if (p5.pathname.endsWith("/"))
    p5.pathname = p5.pathname.slice(0, -1);
  if (p5.port === "80" && p5.protocol === "ws:" || p5.port === "443" && p5.protocol === "wss:")
    p5.port = "";
  p5.searchParams.sort();
  p5.hash = "";
  return p5.toString();
}
function insertEventIntoDescendingList(sortedArray, event) {
  var _a3;
  let start = 0;
  let end = sortedArray.length - 1;
  let midPoint;
  let position = start;
  if (end < 0) {
    position = 0;
  } else if (event.created_at < sortedArray[end].created_at) {
    position = end + 1;
  } else if (event.created_at >= sortedArray[start].created_at) {
    position = start;
  } else
    while (true) {
      if (end <= start + 1) {
        position = end;
        break;
      }
      midPoint = Math.floor(start + (end - start) / 2);
      if (sortedArray[midPoint].created_at > event.created_at) {
        start = midPoint;
      } else if (sortedArray[midPoint].created_at < event.created_at) {
        end = midPoint;
      } else {
        position = midPoint;
        break;
      }
    }
  if (((_a3 = sortedArray[position]) == null ? void 0 : _a3.id) !== event.id) {
    return [...sortedArray.slice(0, position), event, ...sortedArray.slice(position)];
  }
  return sortedArray;
}
function insertEventIntoAscendingList(sortedArray, event) {
  var _a3;
  let start = 0;
  let end = sortedArray.length - 1;
  let midPoint;
  let position = start;
  if (end < 0) {
    position = 0;
  } else if (event.created_at > sortedArray[end].created_at) {
    position = end + 1;
  } else if (event.created_at <= sortedArray[start].created_at) {
    position = start;
  } else
    while (true) {
      if (end <= start + 1) {
        position = end;
        break;
      }
      midPoint = Math.floor(start + (end - start) / 2);
      if (sortedArray[midPoint].created_at < event.created_at) {
        start = midPoint;
      } else if (sortedArray[midPoint].created_at > event.created_at) {
        end = midPoint;
      } else {
        position = midPoint;
        break;
      }
    }
  if (((_a3 = sortedArray[position]) == null ? void 0 : _a3.id) !== event.id) {
    return [...sortedArray.slice(0, position), event, ...sortedArray.slice(position)];
  }
  return sortedArray;
}
var MessageNode = class {
  constructor(message) {
    __publicField(this, "_value");
    __publicField(this, "_next");
    this._value = message;
    this._next = null;
  }
  get value() {
    return this._value;
  }
  set value(message) {
    this._value = message;
  }
  get next() {
    return this._next;
  }
  set next(node) {
    this._next = node;
  }
};
var MessageQueue = class {
  constructor() {
    __publicField(this, "_first");
    __publicField(this, "_last");
    __publicField(this, "_size");
    this._first = null;
    this._last = null;
    this._size = 0;
  }
  get first() {
    return this._first;
  }
  set first(messageNode) {
    this._first = messageNode;
  }
  get last() {
    return this._last;
  }
  set last(messageNode) {
    this._last = messageNode;
  }
  get size() {
    return this._size;
  }
  set size(v3) {
    this._size = v3;
  }
  enqueue(message) {
    const newNode = new MessageNode(message);
    if (this._size === 0 || !this._last) {
      this._first = newNode;
      this._last = newNode;
    } else {
      this._last.next = newNode;
      this._last = newNode;
    }
    this._size++;
    return true;
  }
  dequeue() {
    if (this._size === 0 || !this._first)
      return null;
    let prev = this._first;
    this._first = prev.next;
    prev.next = null;
    this._size--;
    return prev.value;
  }
};
var verifiedSymbol = Symbol("verified");
var Kind = ((Kind3) => {
  Kind3[Kind3["Metadata"] = 0] = "Metadata";
  Kind3[Kind3["Text"] = 1] = "Text";
  Kind3[Kind3["RecommendRelay"] = 2] = "RecommendRelay";
  Kind3[Kind3["Contacts"] = 3] = "Contacts";
  Kind3[Kind3["EncryptedDirectMessage"] = 4] = "EncryptedDirectMessage";
  Kind3[Kind3["EventDeletion"] = 5] = "EventDeletion";
  Kind3[Kind3["Repost"] = 6] = "Repost";
  Kind3[Kind3["Reaction"] = 7] = "Reaction";
  Kind3[Kind3["BadgeAward"] = 8] = "BadgeAward";
  Kind3[Kind3["ChannelCreation"] = 40] = "ChannelCreation";
  Kind3[Kind3["ChannelMetadata"] = 41] = "ChannelMetadata";
  Kind3[Kind3["ChannelMessage"] = 42] = "ChannelMessage";
  Kind3[Kind3["ChannelHideMessage"] = 43] = "ChannelHideMessage";
  Kind3[Kind3["ChannelMuteUser"] = 44] = "ChannelMuteUser";
  Kind3[Kind3["Blank"] = 255] = "Blank";
  Kind3[Kind3["Report"] = 1984] = "Report";
  Kind3[Kind3["ZapRequest"] = 9734] = "ZapRequest";
  Kind3[Kind3["Zap"] = 9735] = "Zap";
  Kind3[Kind3["RelayList"] = 10002] = "RelayList";
  Kind3[Kind3["ClientAuth"] = 22242] = "ClientAuth";
  Kind3[Kind3["NwcRequest"] = 23194] = "NwcRequest";
  Kind3[Kind3["HttpAuth"] = 27235] = "HttpAuth";
  Kind3[Kind3["ProfileBadge"] = 30008] = "ProfileBadge";
  Kind3[Kind3["BadgeDefinition"] = 30009] = "BadgeDefinition";
  Kind3[Kind3["Article"] = 30023] = "Article";
  Kind3[Kind3["FileMetadata"] = 1063] = "FileMetadata";
  return Kind3;
})(Kind || {});
function getBlankEvent(kind = 255) {
  return {
    kind,
    content: "",
    tags: [],
    created_at: 0
  };
}
function finishEvent(t, privateKey) {
  const event = t;
  event.pubkey = getPublicKey(privateKey);
  event.id = getEventHash(event);
  event.sig = getSignature(event, privateKey);
  event[verifiedSymbol] = true;
  return event;
}
function serializeEvent(evt) {
  if (!validateEvent(evt))
    throw new Error("can't serialize event with wrong or missing properties");
  return JSON.stringify([0, evt.pubkey, evt.created_at, evt.kind, evt.tags, evt.content]);
}
function getEventHash(event) {
  let eventHash = sha256(utf8Encoder.encode(serializeEvent(event)));
  return bytesToHex(eventHash);
}
var isRecord = (obj) => obj instanceof Object;
function validateEvent(event) {
  if (!isRecord(event))
    return false;
  if (typeof event.kind !== "number")
    return false;
  if (typeof event.content !== "string")
    return false;
  if (typeof event.created_at !== "number")
    return false;
  if (typeof event.pubkey !== "string")
    return false;
  if (!event.pubkey.match(/^[a-f0-9]{64}$/))
    return false;
  if (!Array.isArray(event.tags))
    return false;
  for (let i3 = 0; i3 < event.tags.length; i3++) {
    let tag = event.tags[i3];
    if (!Array.isArray(tag))
      return false;
    for (let j3 = 0; j3 < tag.length; j3++) {
      if (typeof tag[j3] === "object")
        return false;
    }
  }
  return true;
}
function verifySignature(event) {
  if (typeof event[verifiedSymbol] === "boolean")
    return event[verifiedSymbol];
  const hash3 = getEventHash(event);
  if (hash3 !== event.id) {
    return event[verifiedSymbol] = false;
  }
  try {
    return event[verifiedSymbol] = schnorr.verify(event.sig, hash3, event.pubkey);
  } catch (err) {
    return event[verifiedSymbol] = false;
  }
}
function getSignature(event, key) {
  return bytesToHex(schnorr.sign(getEventHash(event), key));
}
function matchFilter(filter, event) {
  if (filter.ids && filter.ids.indexOf(event.id) === -1) {
    if (!filter.ids.some((prefix) => event.id.startsWith(prefix))) {
      return false;
    }
  }
  if (filter.kinds && filter.kinds.indexOf(event.kind) === -1)
    return false;
  if (filter.authors && filter.authors.indexOf(event.pubkey) === -1) {
    if (!filter.authors.some((prefix) => event.pubkey.startsWith(prefix))) {
      return false;
    }
  }
  for (let f5 in filter) {
    if (f5[0] === "#") {
      let tagName = f5.slice(1);
      let values = filter[`#${tagName}`];
      if (values && !event.tags.find(([t, v3]) => t === f5.slice(1) && values.indexOf(v3) !== -1))
        return false;
    }
  }
  if (filter.since && event.created_at < filter.since)
    return false;
  if (filter.until && event.created_at > filter.until)
    return false;
  return true;
}
function matchFilters(filters, event) {
  for (let i3 = 0; i3 < filters.length; i3++) {
    if (matchFilter(filters[i3], event))
      return true;
  }
  return false;
}
var fakejson_exports = {};
__export2(fakejson_exports, {
  getHex64: () => getHex64,
  getInt: () => getInt,
  getSubscriptionId: () => getSubscriptionId,
  matchEventId: () => matchEventId,
  matchEventKind: () => matchEventKind,
  matchEventPubkey: () => matchEventPubkey
});
function getHex64(json, field) {
  let len = field.length + 3;
  let idx = json.indexOf(`"${field}":`) + len;
  let s3 = json.slice(idx).indexOf(`"`) + idx + 1;
  return json.slice(s3, s3 + 64);
}
function getInt(json, field) {
  let len = field.length;
  let idx = json.indexOf(`"${field}":`) + len + 3;
  let sliced = json.slice(idx);
  let end = Math.min(sliced.indexOf(","), sliced.indexOf("}"));
  return parseInt(sliced.slice(0, end), 10);
}
function getSubscriptionId(json) {
  let idx = json.slice(0, 22).indexOf(`"EVENT"`);
  if (idx === -1)
    return null;
  let pstart = json.slice(idx + 7 + 1).indexOf(`"`);
  if (pstart === -1)
    return null;
  let start = idx + 7 + 1 + pstart;
  let pend = json.slice(start + 1, 80).indexOf(`"`);
  if (pend === -1)
    return null;
  let end = start + 1 + pend;
  return json.slice(start + 1, end);
}
function matchEventId(json, id) {
  return id === getHex64(json, "id");
}
function matchEventPubkey(json, pubkey) {
  return pubkey === getHex64(json, "pubkey");
}
function matchEventKind(json, kind) {
  return kind === getInt(json, "kind");
}
var newListeners = () => ({
  connect: [],
  disconnect: [],
  error: [],
  notice: [],
  auth: []
});
function relayInit(url, options = {}) {
  let { listTimeout = 3e3, getTimeout = 3e3, countTimeout = 3e3 } = options;
  var ws2;
  var openSubs = {};
  var listeners = newListeners();
  var subListeners = {};
  var pubListeners = {};
  var connectionPromise;
  async function connectRelay() {
    if (connectionPromise)
      return connectionPromise;
    connectionPromise = new Promise((resolve, reject) => {
      try {
        ws2 = new WebSocket(url);
      } catch (err) {
        reject(err);
      }
      ws2.onopen = () => {
        listeners.connect.forEach((cb) => cb());
        resolve();
      };
      ws2.onerror = () => {
        connectionPromise = void 0;
        listeners.error.forEach((cb) => cb());
        reject();
      };
      ws2.onclose = async () => {
        connectionPromise = void 0;
        listeners.disconnect.forEach((cb) => cb());
      };
      let incomingMessageQueue = new MessageQueue();
      let handleNextInterval;
      ws2.onmessage = (e2) => {
        incomingMessageQueue.enqueue(e2.data);
        if (!handleNextInterval) {
          handleNextInterval = setInterval(handleNext, 0);
        }
      };
      function handleNext() {
        var _a3, _b, _c;
        if (incomingMessageQueue.size === 0) {
          clearInterval(handleNextInterval);
          handleNextInterval = null;
          return;
        }
        var json = incomingMessageQueue.dequeue();
        if (!json)
          return;
        let subid = getSubscriptionId(json);
        if (subid) {
          let so2 = openSubs[subid];
          if (so2 && so2.alreadyHaveEvent && so2.alreadyHaveEvent(getHex64(json, "id"), url)) {
            return;
          }
        }
        try {
          let data = JSON.parse(json);
          switch (data[0]) {
            case "EVENT": {
              let id2 = data[1];
              let event = data[2];
              if (validateEvent(event) && openSubs[id2] && (openSubs[id2].skipVerification || verifySignature(event)) && matchFilters(openSubs[id2].filters, event)) {
                openSubs[id2];
                (((_a3 = subListeners[id2]) == null ? void 0 : _a3.event) || []).forEach((cb) => cb(event));
              }
              return;
            }
            case "COUNT":
              let id = data[1];
              let payload = data[2];
              if (openSubs[id]) {
                ;
                (((_b = subListeners[id]) == null ? void 0 : _b.count) || []).forEach((cb) => cb(payload));
              }
              return;
            case "EOSE": {
              let id2 = data[1];
              if (id2 in subListeners) {
                subListeners[id2].eose.forEach((cb) => cb());
                subListeners[id2].eose = [];
              }
              return;
            }
            case "OK": {
              let id2 = data[1];
              let ok = data[2];
              let reason = data[3] || "";
              if (id2 in pubListeners) {
                let { resolve: resolve2, reject: reject2 } = pubListeners[id2];
                if (ok)
                  resolve2(null);
                else
                  reject2(new Error(reason));
              }
              return;
            }
            case "NOTICE":
              let notice = data[1];
              listeners.notice.forEach((cb) => cb(notice));
              return;
            case "AUTH": {
              let challenge2 = data[1];
              (_c = listeners.auth) == null ? void 0 : _c.forEach((cb) => cb(challenge2));
              return;
            }
          }
        } catch (err) {
          return;
        }
      }
    });
    return connectionPromise;
  }
  function connected() {
    return (ws2 == null ? void 0 : ws2.readyState) === 1;
  }
  async function connect() {
    if (connected())
      return;
    await connectRelay();
  }
  async function trySend(params) {
    let msg = JSON.stringify(params);
    if (!connected()) {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      if (!connected()) {
        return;
      }
    }
    try {
      ws2.send(msg);
    } catch (err) {
      console.log(err);
    }
  }
  const sub = (filters, {
    verb = "REQ",
    skipVerification = false,
    alreadyHaveEvent = null,
    id = Math.random().toString().slice(2)
  } = {}) => {
    let subid = id;
    openSubs[subid] = {
      id: subid,
      filters,
      skipVerification,
      alreadyHaveEvent
    };
    trySend([verb, subid, ...filters]);
    let subscription = {
      sub: (newFilters, newOpts = {}) => sub(newFilters || filters, {
        skipVerification: newOpts.skipVerification || skipVerification,
        alreadyHaveEvent: newOpts.alreadyHaveEvent || alreadyHaveEvent,
        id: subid
      }),
      unsub: () => {
        delete openSubs[subid];
        delete subListeners[subid];
        trySend(["CLOSE", subid]);
      },
      on: (type, cb) => {
        subListeners[subid] = subListeners[subid] || {
          event: [],
          count: [],
          eose: []
        };
        subListeners[subid][type].push(cb);
      },
      off: (type, cb) => {
        let listeners2 = subListeners[subid];
        let idx = listeners2[type].indexOf(cb);
        if (idx >= 0)
          listeners2[type].splice(idx, 1);
      },
      get events() {
        return eventsGenerator(subscription);
      }
    };
    return subscription;
  };
  function _publishEvent(event, type) {
    return new Promise((resolve, reject) => {
      if (!event.id) {
        reject(new Error(`event ${event} has no id`));
        return;
      }
      let id = event.id;
      trySend([type, event]);
      pubListeners[id] = { resolve, reject };
    });
  }
  return {
    url,
    sub,
    on: (type, cb) => {
      listeners[type].push(cb);
      if (type === "connect" && (ws2 == null ? void 0 : ws2.readyState) === 1) {
        ;
        cb();
      }
    },
    off: (type, cb) => {
      let index = listeners[type].indexOf(cb);
      if (index !== -1)
        listeners[type].splice(index, 1);
    },
    list: (filters, opts) => new Promise((resolve) => {
      let s3 = sub(filters, opts);
      let events = [];
      let timeout = setTimeout(() => {
        s3.unsub();
        resolve(events);
      }, listTimeout);
      s3.on("eose", () => {
        s3.unsub();
        clearTimeout(timeout);
        resolve(events);
      });
      s3.on("event", (event) => {
        events.push(event);
      });
    }),
    get: (filter, opts) => new Promise((resolve) => {
      let s3 = sub([filter], opts);
      let timeout = setTimeout(() => {
        s3.unsub();
        resolve(null);
      }, getTimeout);
      s3.on("event", (event) => {
        s3.unsub();
        clearTimeout(timeout);
        resolve(event);
      });
    }),
    count: (filters) => new Promise((resolve) => {
      let s3 = sub(filters, { ...sub, verb: "COUNT" });
      let timeout = setTimeout(() => {
        s3.unsub();
        resolve(null);
      }, countTimeout);
      s3.on("count", (event) => {
        s3.unsub();
        clearTimeout(timeout);
        resolve(event);
      });
    }),
    async publish(event) {
      await _publishEvent(event, "EVENT");
    },
    async auth(event) {
      await _publishEvent(event, "AUTH");
    },
    connect,
    close() {
      listeners = newListeners();
      subListeners = {};
      pubListeners = {};
      if ((ws2 == null ? void 0 : ws2.readyState) === WebSocket.OPEN) {
        ws2.close();
      }
    },
    get status() {
      return (ws2 == null ? void 0 : ws2.readyState) ?? 3;
    }
  };
}
async function* eventsGenerator(sub) {
  let nextResolve;
  const eventQueue = [];
  const pushToQueue = (event) => {
    if (nextResolve) {
      nextResolve(event);
      nextResolve = void 0;
    } else {
      eventQueue.push(event);
    }
  };
  sub.on("event", pushToQueue);
  try {
    while (true) {
      if (eventQueue.length > 0) {
        yield eventQueue.shift();
      } else {
        const event = await new Promise((resolve) => {
          nextResolve = resolve;
        });
        yield event;
      }
    }
  } finally {
    sub.off("event", pushToQueue);
  }
}
var nip19_exports = {};
__export2(nip19_exports, {
  BECH32_REGEX: () => BECH32_REGEX,
  decode: () => decode,
  naddrEncode: () => naddrEncode,
  neventEncode: () => neventEncode,
  noteEncode: () => noteEncode,
  nprofileEncode: () => nprofileEncode,
  npubEncode: () => npubEncode,
  nrelayEncode: () => nrelayEncode,
  nsecEncode: () => nsecEncode
});
var Bech32MaxSize = 5e3;
var BECH32_REGEX = /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;
function integerToUint8Array(number3) {
  const uint8Array = new Uint8Array(4);
  uint8Array[0] = number3 >> 24 & 255;
  uint8Array[1] = number3 >> 16 & 255;
  uint8Array[2] = number3 >> 8 & 255;
  uint8Array[3] = number3 & 255;
  return uint8Array;
}
function decode(nip19) {
  var _a3, _b, _c, _d, _e2, _f, _g, _h;
  let { prefix, words } = bech32.decode(nip19, Bech32MaxSize);
  let data = new Uint8Array(bech32.fromWords(words));
  switch (prefix) {
    case "nprofile": {
      let tlv = parseTLV(data);
      if (!((_a3 = tlv[0]) == null ? void 0 : _a3[0]))
        throw new Error("missing TLV 0 for nprofile");
      if (tlv[0][0].length !== 32)
        throw new Error("TLV 0 should be 32 bytes");
      return {
        type: "nprofile",
        data: {
          pubkey: bytesToHex(tlv[0][0]),
          relays: tlv[1] ? tlv[1].map((d5) => utf8Decoder.decode(d5)) : []
        }
      };
    }
    case "nevent": {
      let tlv = parseTLV(data);
      if (!((_b = tlv[0]) == null ? void 0 : _b[0]))
        throw new Error("missing TLV 0 for nevent");
      if (tlv[0][0].length !== 32)
        throw new Error("TLV 0 should be 32 bytes");
      if (tlv[2] && tlv[2][0].length !== 32)
        throw new Error("TLV 2 should be 32 bytes");
      if (tlv[3] && tlv[3][0].length !== 4)
        throw new Error("TLV 3 should be 4 bytes");
      return {
        type: "nevent",
        data: {
          id: bytesToHex(tlv[0][0]),
          relays: tlv[1] ? tlv[1].map((d5) => utf8Decoder.decode(d5)) : [],
          author: ((_c = tlv[2]) == null ? void 0 : _c[0]) ? bytesToHex(tlv[2][0]) : void 0,
          kind: ((_d = tlv[3]) == null ? void 0 : _d[0]) ? parseInt(bytesToHex(tlv[3][0]), 16) : void 0
        }
      };
    }
    case "naddr": {
      let tlv = parseTLV(data);
      if (!((_e2 = tlv[0]) == null ? void 0 : _e2[0]))
        throw new Error("missing TLV 0 for naddr");
      if (!((_f = tlv[2]) == null ? void 0 : _f[0]))
        throw new Error("missing TLV 2 for naddr");
      if (tlv[2][0].length !== 32)
        throw new Error("TLV 2 should be 32 bytes");
      if (!((_g = tlv[3]) == null ? void 0 : _g[0]))
        throw new Error("missing TLV 3 for naddr");
      if (tlv[3][0].length !== 4)
        throw new Error("TLV 3 should be 4 bytes");
      return {
        type: "naddr",
        data: {
          identifier: utf8Decoder.decode(tlv[0][0]),
          pubkey: bytesToHex(tlv[2][0]),
          kind: parseInt(bytesToHex(tlv[3][0]), 16),
          relays: tlv[1] ? tlv[1].map((d5) => utf8Decoder.decode(d5)) : []
        }
      };
    }
    case "nrelay": {
      let tlv = parseTLV(data);
      if (!((_h = tlv[0]) == null ? void 0 : _h[0]))
        throw new Error("missing TLV 0 for nrelay");
      return {
        type: "nrelay",
        data: utf8Decoder.decode(tlv[0][0])
      };
    }
    case "nsec":
    case "npub":
    case "note":
      return { type: prefix, data: bytesToHex(data) };
    default:
      throw new Error(`unknown prefix ${prefix}`);
  }
}
function parseTLV(data) {
  let result = {};
  let rest = data;
  while (rest.length > 0) {
    let t = rest[0];
    let l4 = rest[1];
    if (!l4)
      throw new Error(`malformed TLV ${t}`);
    let v3 = rest.slice(2, 2 + l4);
    rest = rest.slice(2 + l4);
    if (v3.length < l4)
      throw new Error(`not enough data to read on TLV ${t}`);
    result[t] = result[t] || [];
    result[t].push(v3);
  }
  return result;
}
function nsecEncode(hex) {
  return encodeBytes("nsec", hex);
}
function npubEncode(hex) {
  return encodeBytes("npub", hex);
}
function noteEncode(hex) {
  return encodeBytes("note", hex);
}
function encodeBech32(prefix, data) {
  let words = bech32.toWords(data);
  return bech32.encode(prefix, words, Bech32MaxSize);
}
function encodeBytes(prefix, hex) {
  let data = hexToBytes(hex);
  return encodeBech32(prefix, data);
}
function nprofileEncode(profile) {
  let data = encodeTLV({
    0: [hexToBytes(profile.pubkey)],
    1: (profile.relays || []).map((url) => utf8Encoder.encode(url))
  });
  return encodeBech32("nprofile", data);
}
function neventEncode(event) {
  let kindArray;
  if (event.kind != void 0) {
    kindArray = integerToUint8Array(event.kind);
  }
  let data = encodeTLV({
    0: [hexToBytes(event.id)],
    1: (event.relays || []).map((url) => utf8Encoder.encode(url)),
    2: event.author ? [hexToBytes(event.author)] : [],
    3: kindArray ? [new Uint8Array(kindArray)] : []
  });
  return encodeBech32("nevent", data);
}
function naddrEncode(addr) {
  let kind = new ArrayBuffer(4);
  new DataView(kind).setUint32(0, addr.kind, false);
  let data = encodeTLV({
    0: [utf8Encoder.encode(addr.identifier)],
    1: (addr.relays || []).map((url) => utf8Encoder.encode(url)),
    2: [hexToBytes(addr.pubkey)],
    3: [new Uint8Array(kind)]
  });
  return encodeBech32("naddr", data);
}
function nrelayEncode(url) {
  let data = encodeTLV({
    0: [utf8Encoder.encode(url)]
  });
  return encodeBech32("nrelay", data);
}
function encodeTLV(tlv) {
  let entries = [];
  Object.entries(tlv).forEach(([t, vs2]) => {
    vs2.forEach((v3) => {
      let entry = new Uint8Array(v3.length + 2);
      entry.set([parseInt(t)], 0);
      entry.set([v3.length], 1);
      entry.set(v3, 2);
      entries.push(entry);
    });
  });
  return concatBytes(...entries);
}
var nip04_exports = {};
__export2(nip04_exports, {
  decrypt: () => decrypt,
  encrypt: () => encrypt
});
if (typeof crypto !== "undefined" && !crypto.subtle && crypto.webcrypto) {
  crypto.subtle = crypto.webcrypto.subtle;
}
async function encrypt(privkey, pubkey, text) {
  const key = secp256k1.getSharedSecret(privkey, "02" + pubkey);
  const normalizedKey = getNormalizedX(key);
  let iv = Uint8Array.from(randomBytes(16));
  let plaintext = utf8Encoder.encode(text);
  let cryptoKey = await crypto.subtle.importKey("raw", normalizedKey, { name: "AES-CBC" }, false, ["encrypt"]);
  let ciphertext = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, cryptoKey, plaintext);
  let ctb64 = base64.encode(new Uint8Array(ciphertext));
  let ivb64 = base64.encode(new Uint8Array(iv.buffer));
  return `${ctb64}?iv=${ivb64}`;
}
async function decrypt(privkey, pubkey, data) {
  let [ctb64, ivb64] = data.split("?iv=");
  let key = secp256k1.getSharedSecret(privkey, "02" + pubkey);
  let normalizedKey = getNormalizedX(key);
  let cryptoKey = await crypto.subtle.importKey("raw", normalizedKey, { name: "AES-CBC" }, false, ["decrypt"]);
  let ciphertext = base64.decode(ctb64);
  let iv = base64.decode(ivb64);
  let plaintext = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, cryptoKey, ciphertext);
  let text = utf8Decoder.decode(plaintext);
  return text;
}
function getNormalizedX(key) {
  return key.slice(1, 33);
}
var nip05_exports = {};
__export2(nip05_exports, {
  NIP05_REGEX: () => NIP05_REGEX,
  queryProfile: () => queryProfile,
  searchDomain: () => searchDomain,
  useFetchImplementation: () => useFetchImplementation
});
var NIP05_REGEX = /^(?:([\w.+-]+)@)?([\w.-]+)$/;
var _fetch;
try {
  _fetch = fetch;
} catch {
}
function useFetchImplementation(fetchImplementation) {
  _fetch = fetchImplementation;
}
async function searchDomain(domain, query = "") {
  try {
    let res = await (await _fetch(`https://${domain}/.well-known/nostr.json?name=${query}`)).json();
    return res.names;
  } catch (_3) {
    return {};
  }
}
async function queryProfile(fullname) {
  const match = fullname.match(NIP05_REGEX);
  if (!match)
    return null;
  const [_3, name = "_", domain] = match;
  try {
    const res = await _fetch(`https://${domain}/.well-known/nostr.json?name=${name}`);
    const { names, relays } = parseNIP05Result(await res.json());
    const pubkey = names[name];
    return pubkey ? { pubkey, relays: relays == null ? void 0 : relays[pubkey] } : null;
  } catch (_e2) {
    return null;
  }
}
function parseNIP05Result(json) {
  const result = {
    names: {}
  };
  for (const [name, pubkey] of Object.entries(json.names)) {
    if (typeof name === "string" && typeof pubkey === "string") {
      result.names[name] = pubkey;
    }
  }
  if (json.relays) {
    result.relays = {};
    for (const [pubkey, relays] of Object.entries(json.relays)) {
      if (typeof pubkey === "string" && Array.isArray(relays)) {
        result.relays[pubkey] = relays.filter((relay) => typeof relay === "string");
      }
    }
  }
  return result;
}
var nip06_exports = {};
__export2(nip06_exports, {
  generateSeedWords: () => generateSeedWords,
  privateKeyFromSeedWords: () => privateKeyFromSeedWords,
  validateWords: () => validateWords
});
function privateKeyFromSeedWords(mnemonic, passphrase) {
  let root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase));
  let privateKey = root.derive(`m/44'/1237'/0'/0/0`).privateKey;
  if (!privateKey)
    throw new Error("could not derive private key");
  return bytesToHex(privateKey);
}
function generateSeedWords() {
  return generateMnemonic(wordlist);
}
function validateWords(words) {
  return validateMnemonic(words, wordlist);
}
var nip10_exports = {};
__export2(nip10_exports, {
  parse: () => parse
});
function parse(event) {
  const result = {
    reply: void 0,
    root: void 0,
    mentions: [],
    profiles: []
  };
  const eTags = [];
  for (const tag of event.tags) {
    if (tag[0] === "e" && tag[1]) {
      eTags.push(tag);
    }
    if (tag[0] === "p" && tag[1]) {
      result.profiles.push({
        pubkey: tag[1],
        relays: tag[2] ? [tag[2]] : []
      });
    }
  }
  for (let eTagIndex = 0; eTagIndex < eTags.length; eTagIndex++) {
    const eTag = eTags[eTagIndex];
    const [_3, eTagEventId, eTagRelayUrl, eTagMarker] = eTag;
    const eventPointer = {
      id: eTagEventId,
      relays: eTagRelayUrl ? [eTagRelayUrl] : []
    };
    const isFirstETag = eTagIndex === 0;
    const isLastETag = eTagIndex === eTags.length - 1;
    if (eTagMarker === "root") {
      result.root = eventPointer;
      continue;
    }
    if (eTagMarker === "reply") {
      result.reply = eventPointer;
      continue;
    }
    if (eTagMarker === "mention") {
      result.mentions.push(eventPointer);
      continue;
    }
    if (isFirstETag) {
      result.root = eventPointer;
      continue;
    }
    if (isLastETag) {
      result.reply = eventPointer;
      continue;
    }
    result.mentions.push(eventPointer);
  }
  return result;
}
var nip13_exports = {};
__export2(nip13_exports, {
  getPow: () => getPow,
  minePow: () => minePow
});
function getPow(hex) {
  let count = 0;
  for (let i3 = 0; i3 < hex.length; i3++) {
    const nibble = parseInt(hex[i3], 16);
    if (nibble === 0) {
      count += 4;
    } else {
      count += Math.clz32(nibble) - 28;
      break;
    }
  }
  return count;
}
function minePow(unsigned, difficulty) {
  let count = 0;
  const event = unsigned;
  const tag = ["nonce", count.toString(), difficulty.toString()];
  event.tags.push(tag);
  while (true) {
    const now = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
    if (now !== event.created_at) {
      count = 0;
      event.created_at = now;
    }
    tag[1] = (++count).toString();
    event.id = getEventHash(event);
    if (getPow(event.id) >= difficulty) {
      break;
    }
  }
  return event;
}
var nip18_exports = {};
__export2(nip18_exports, {
  finishRepostEvent: () => finishRepostEvent,
  getRepostedEvent: () => getRepostedEvent,
  getRepostedEventPointer: () => getRepostedEventPointer
});
function finishRepostEvent(t, reposted, relayUrl, privateKey) {
  return finishEvent(
    {
      kind: 6,
      tags: [...t.tags ?? [], ["e", reposted.id, relayUrl], ["p", reposted.pubkey]],
      content: t.content === "" ? "" : JSON.stringify(reposted),
      created_at: t.created_at
    },
    privateKey
  );
}
function getRepostedEventPointer(event) {
  if (event.kind !== 6) {
    return void 0;
  }
  let lastETag;
  let lastPTag;
  for (let i3 = event.tags.length - 1; i3 >= 0 && (lastETag === void 0 || lastPTag === void 0); i3--) {
    const tag = event.tags[i3];
    if (tag.length >= 2) {
      if (tag[0] === "e" && lastETag === void 0) {
        lastETag = tag;
      } else if (tag[0] === "p" && lastPTag === void 0) {
        lastPTag = tag;
      }
    }
  }
  if (lastETag === void 0) {
    return void 0;
  }
  return {
    id: lastETag[1],
    relays: [lastETag[2], lastPTag == null ? void 0 : lastPTag[2]].filter((x4) => typeof x4 === "string"),
    author: lastPTag == null ? void 0 : lastPTag[1]
  };
}
function getRepostedEvent(event, { skipVerification } = {}) {
  const pointer = getRepostedEventPointer(event);
  if (pointer === void 0 || event.content === "") {
    return void 0;
  }
  let repostedEvent;
  try {
    repostedEvent = JSON.parse(event.content);
  } catch (error) {
    return void 0;
  }
  if (repostedEvent.id !== pointer.id) {
    return void 0;
  }
  if (!skipVerification && !verifySignature(repostedEvent)) {
    return void 0;
  }
  return repostedEvent;
}
var nip21_exports = {};
__export2(nip21_exports, {
  NOSTR_URI_REGEX: () => NOSTR_URI_REGEX,
  parse: () => parse2,
  test: () => test
});
var NOSTR_URI_REGEX = new RegExp(`nostr:(${BECH32_REGEX.source})`);
function test(value) {
  return typeof value === "string" && new RegExp(`^${NOSTR_URI_REGEX.source}$`).test(value);
}
function parse2(uri) {
  const match = uri.match(new RegExp(`^${NOSTR_URI_REGEX.source}$`));
  if (!match)
    throw new Error(`Invalid Nostr URI: ${uri}`);
  return {
    uri: match[0],
    value: match[1],
    decoded: decode(match[1])
  };
}
var nip25_exports = {};
__export2(nip25_exports, {
  finishReactionEvent: () => finishReactionEvent,
  getReactedEventPointer: () => getReactedEventPointer
});
function finishReactionEvent(t, reacted, privateKey) {
  const inheritedTags = reacted.tags.filter((tag) => tag.length >= 2 && (tag[0] === "e" || tag[0] === "p"));
  return finishEvent(
    {
      ...t,
      kind: 7,
      tags: [...t.tags ?? [], ...inheritedTags, ["e", reacted.id], ["p", reacted.pubkey]],
      content: t.content ?? "+"
    },
    privateKey
  );
}
function getReactedEventPointer(event) {
  if (event.kind !== 7) {
    return void 0;
  }
  let lastETag;
  let lastPTag;
  for (let i3 = event.tags.length - 1; i3 >= 0 && (lastETag === void 0 || lastPTag === void 0); i3--) {
    const tag = event.tags[i3];
    if (tag.length >= 2) {
      if (tag[0] === "e" && lastETag === void 0) {
        lastETag = tag;
      } else if (tag[0] === "p" && lastPTag === void 0) {
        lastPTag = tag;
      }
    }
  }
  if (lastETag === void 0 || lastPTag === void 0) {
    return void 0;
  }
  return {
    id: lastETag[1],
    relays: [lastETag[2], lastPTag[2]].filter((x4) => x4 !== void 0),
    author: lastPTag[1]
  };
}
var nip26_exports = {};
__export2(nip26_exports, {
  createDelegation: () => createDelegation,
  getDelegator: () => getDelegator
});
function createDelegation(privateKey, parameters) {
  let conditions = [];
  if ((parameters.kind || -1) >= 0)
    conditions.push(`kind=${parameters.kind}`);
  if (parameters.until)
    conditions.push(`created_at<${parameters.until}`);
  if (parameters.since)
    conditions.push(`created_at>${parameters.since}`);
  let cond = conditions.join("&");
  if (cond === "")
    throw new Error("refusing to create a delegation without any conditions");
  let sighash = sha256(utf8Encoder.encode(`nostr:delegation:${parameters.pubkey}:${cond}`));
  let sig = bytesToHex(schnorr.sign(sighash, privateKey));
  return {
    from: getPublicKey(privateKey),
    to: parameters.pubkey,
    cond,
    sig
  };
}
function getDelegator(event) {
  let tag = event.tags.find((tag2) => tag2[0] === "delegation" && tag2.length >= 4);
  if (!tag)
    return null;
  let pubkey = tag[1];
  let cond = tag[2];
  let sig = tag[3];
  let conditions = cond.split("&");
  for (let i3 = 0; i3 < conditions.length; i3++) {
    let [key, operator, value] = conditions[i3].split(/\b/);
    if (key === "kind" && operator === "=" && event.kind === parseInt(value))
      continue;
    else if (key === "created_at" && operator === "<" && event.created_at < parseInt(value))
      continue;
    else if (key === "created_at" && operator === ">" && event.created_at > parseInt(value))
      continue;
    else
      return null;
  }
  let sighash = sha256(utf8Encoder.encode(`nostr:delegation:${event.pubkey}:${cond}`));
  if (!schnorr.verify(sig, sighash, pubkey))
    return null;
  return pubkey;
}
var nip27_exports = {};
__export2(nip27_exports, {
  matchAll: () => matchAll,
  regex: () => regex,
  replaceAll: () => replaceAll
});
var regex = () => new RegExp(`\\b${NOSTR_URI_REGEX.source}\\b`, "g");
function* matchAll(content) {
  const matches = content.matchAll(regex());
  for (const match of matches) {
    try {
      const [uri, value] = match;
      yield {
        uri,
        value,
        decoded: decode(value),
        start: match.index,
        end: match.index + uri.length
      };
    } catch (_e2) {
    }
  }
}
function replaceAll(content, replacer) {
  return content.replaceAll(regex(), (uri, value) => {
    return replacer({
      uri,
      value,
      decoded: decode(value)
    });
  });
}
var nip28_exports = {};
__export2(nip28_exports, {
  channelCreateEvent: () => channelCreateEvent,
  channelHideMessageEvent: () => channelHideMessageEvent,
  channelMessageEvent: () => channelMessageEvent,
  channelMetadataEvent: () => channelMetadataEvent,
  channelMuteUserEvent: () => channelMuteUserEvent
});
var channelCreateEvent = (t, privateKey) => {
  let content;
  if (typeof t.content === "object") {
    content = JSON.stringify(t.content);
  } else if (typeof t.content === "string") {
    content = t.content;
  } else {
    return void 0;
  }
  return finishEvent(
    {
      kind: 40,
      tags: [...t.tags ?? []],
      content,
      created_at: t.created_at
    },
    privateKey
  );
};
var channelMetadataEvent = (t, privateKey) => {
  let content;
  if (typeof t.content === "object") {
    content = JSON.stringify(t.content);
  } else if (typeof t.content === "string") {
    content = t.content;
  } else {
    return void 0;
  }
  return finishEvent(
    {
      kind: 41,
      tags: [["e", t.channel_create_event_id], ...t.tags ?? []],
      content,
      created_at: t.created_at
    },
    privateKey
  );
};
var channelMessageEvent = (t, privateKey) => {
  const tags = [["e", t.channel_create_event_id, t.relay_url, "root"]];
  if (t.reply_to_channel_message_event_id) {
    tags.push(["e", t.reply_to_channel_message_event_id, t.relay_url, "reply"]);
  }
  return finishEvent(
    {
      kind: 42,
      tags: [...tags, ...t.tags ?? []],
      content: t.content,
      created_at: t.created_at
    },
    privateKey
  );
};
var channelHideMessageEvent = (t, privateKey) => {
  let content;
  if (typeof t.content === "object") {
    content = JSON.stringify(t.content);
  } else if (typeof t.content === "string") {
    content = t.content;
  } else {
    return void 0;
  }
  return finishEvent(
    {
      kind: 43,
      tags: [["e", t.channel_message_event_id], ...t.tags ?? []],
      content,
      created_at: t.created_at
    },
    privateKey
  );
};
var channelMuteUserEvent = (t, privateKey) => {
  let content;
  if (typeof t.content === "object") {
    content = JSON.stringify(t.content);
  } else if (typeof t.content === "string") {
    content = t.content;
  } else {
    return void 0;
  }
  return finishEvent(
    {
      kind: 44,
      tags: [["p", t.pubkey_to_mute], ...t.tags ?? []],
      content,
      created_at: t.created_at
    },
    privateKey
  );
};
var nip39_exports = {};
__export2(nip39_exports, {
  useFetchImplementation: () => useFetchImplementation2,
  validateGithub: () => validateGithub
});
var _fetch2;
try {
  _fetch2 = fetch;
} catch {
}
function useFetchImplementation2(fetchImplementation) {
  _fetch2 = fetchImplementation;
}
async function validateGithub(pubkey, username, proof) {
  try {
    let res = await (await _fetch2(`https://gist.github.com/${username}/${proof}/raw`)).text();
    return res === `Verifying that I control the following Nostr public key: ${pubkey}`;
  } catch (_3) {
    return false;
  }
}
var nip42_exports = {};
__export2(nip42_exports, {
  authenticate: () => authenticate
});
var authenticate = async ({
  challenge: challenge2,
  relay,
  sign
}) => {
  const e2 = {
    kind: 22242,
    created_at: Math.floor(Date.now() / 1e3),
    tags: [
      ["relay", relay.url],
      ["challenge", challenge2]
    ],
    content: ""
  };
  return relay.auth(await sign(e2));
};
var nip44_exports = {};
__export2(nip44_exports, {
  decrypt: () => decrypt2,
  encrypt: () => encrypt2,
  utils: () => utils2
});
var utils2 = {
  v2: {
    maxPlaintextSize: 65536 - 128,
    minCiphertextSize: 100,
    maxCiphertextSize: 102400,
    getConversationKey(privkeyA, pubkeyB) {
      const key = secp256k1.getSharedSecret(privkeyA, "02" + pubkeyB);
      return key.subarray(1, 33);
    },
    getMessageKeys(conversationKey, salt2) {
      const keys = hkdf(sha256, conversationKey, salt2, "nip44-v2", 76);
      return {
        encryption: keys.subarray(0, 32),
        nonce: keys.subarray(32, 44),
        auth: keys.subarray(44, 76)
      };
    },
    calcPadding(len) {
      if (!Number.isSafeInteger(len) || len < 0)
        throw new Error("expected positive integer");
      if (len <= 32)
        return 32;
      const nextpower = 1 << Math.floor(Math.log2(len - 1)) + 1;
      const chunk = nextpower <= 256 ? 32 : nextpower / 8;
      return chunk * (Math.floor((len - 1) / chunk) + 1);
    },
    pad(unpadded) {
      const unpaddedB = utf8Encoder.encode(unpadded);
      const len = unpaddedB.length;
      if (len < 1 || len >= utils2.v2.maxPlaintextSize)
        throw new Error("invalid plaintext length: must be between 1b and 64KB");
      const paddedLen = utils2.v2.calcPadding(len);
      const zeros = new Uint8Array(paddedLen - len);
      const lenBuf = new Uint8Array(2);
      new DataView(lenBuf.buffer).setUint16(0, len);
      return concatBytes(lenBuf, unpaddedB, zeros);
    },
    unpad(padded) {
      const unpaddedLen = new DataView(padded.buffer).getUint16(0);
      const unpadded = padded.subarray(2, 2 + unpaddedLen);
      if (unpaddedLen === 0 || unpadded.length !== unpaddedLen || padded.length !== 2 + utils2.v2.calcPadding(unpaddedLen))
        throw new Error("invalid padding");
      return utf8Decoder.decode(unpadded);
    }
  }
};
function encrypt2(key, plaintext, options = {}) {
  const version = options.version ?? 2;
  if (version !== 2)
    throw new Error("unknown encryption version " + version);
  const salt2 = options.salt ?? randomBytes(32);
  ensureBytes2(salt2, 32);
  const keys = utils2.v2.getMessageKeys(key, salt2);
  const padded = utils2.v2.pad(plaintext);
  const ciphertext = chacha20(keys.encryption, keys.nonce, padded);
  const mac = hmac(sha256, keys.auth, ciphertext);
  return base64.encode(concatBytes(new Uint8Array([version]), salt2, ciphertext, mac));
}
function decrypt2(key, ciphertext) {
  const u4 = utils2.v2;
  ensureBytes2(key, 32);
  const clen = ciphertext.length;
  if (clen < u4.minCiphertextSize || clen >= u4.maxCiphertextSize)
    throw new Error("invalid ciphertext length: " + clen);
  if (ciphertext[0] === "#")
    throw new Error("unknown encryption version");
  let data;
  try {
    data = base64.decode(ciphertext);
  } catch (error) {
    throw new Error("invalid base64: " + error.message);
  }
  const vers = data.subarray(0, 1)[0];
  if (vers !== 2)
    throw new Error("unknown encryption version " + vers);
  const salt2 = data.subarray(1, 33);
  const ciphertext_ = data.subarray(33, -32);
  const mac = data.subarray(-32);
  const keys = u4.getMessageKeys(key, salt2);
  const calculatedMac = hmac(sha256, keys.auth, ciphertext_);
  if (!equalBytes2(calculatedMac, mac))
    throw new Error("invalid MAC");
  const padded = chacha20(keys.encryption, keys.nonce, ciphertext_);
  return u4.unpad(padded);
}
var nip47_exports = {};
__export2(nip47_exports, {
  makeNwcRequestEvent: () => makeNwcRequestEvent,
  parseConnectionString: () => parseConnectionString
});
function parseConnectionString(connectionString) {
  const { pathname, searchParams } = new URL(connectionString);
  const pubkey = pathname;
  const relay = searchParams.get("relay");
  const secret = searchParams.get("secret");
  if (!pubkey || !relay || !secret) {
    throw new Error("invalid connection string");
  }
  return { pubkey, relay, secret };
}
async function makeNwcRequestEvent({
  pubkey,
  secret,
  invoice
}) {
  const content = {
    method: "pay_invoice",
    params: {
      invoice
    }
  };
  const encryptedContent = await encrypt(secret, pubkey, JSON.stringify(content));
  const eventTemplate = {
    kind: 23194,
    created_at: Math.round(Date.now() / 1e3),
    content: encryptedContent,
    tags: [["p", pubkey]]
  };
  return finishEvent(eventTemplate, secret);
}
var nip57_exports = {};
__export2(nip57_exports, {
  getZapEndpoint: () => getZapEndpoint,
  makeZapReceipt: () => makeZapReceipt,
  makeZapRequest: () => makeZapRequest,
  useFetchImplementation: () => useFetchImplementation3,
  validateZapRequest: () => validateZapRequest
});
var _fetch3;
try {
  _fetch3 = fetch;
} catch {
}
function useFetchImplementation3(fetchImplementation) {
  _fetch3 = fetchImplementation;
}
async function getZapEndpoint(metadata) {
  try {
    let lnurl = "";
    let { lud06, lud16 } = JSON.parse(metadata.content);
    if (lud06) {
      let { words } = bech32.decode(lud06, 1e3);
      let data = bech32.fromWords(words);
      lnurl = utf8Decoder.decode(data);
    } else if (lud16) {
      let [name, domain] = lud16.split("@");
      lnurl = `https://${domain}/.well-known/lnurlp/${name}`;
    } else {
      return null;
    }
    let res = await _fetch3(lnurl);
    let body = await res.json();
    if (body.allowsNostr && body.nostrPubkey) {
      return body.callback;
    }
  } catch (err) {
  }
  return null;
}
function makeZapRequest({
  profile,
  event,
  amount,
  relays,
  comment = ""
}) {
  if (!amount)
    throw new Error("amount not given");
  if (!profile)
    throw new Error("profile not given");
  let zr2 = {
    kind: 9734,
    created_at: Math.round(Date.now() / 1e3),
    content: comment,
    tags: [
      ["p", profile],
      ["amount", amount.toString()],
      ["relays", ...relays]
    ]
  };
  if (event) {
    zr2.tags.push(["e", event]);
  }
  return zr2;
}
function validateZapRequest(zapRequestString) {
  let zapRequest;
  try {
    zapRequest = JSON.parse(zapRequestString);
  } catch (err) {
    return "Invalid zap request JSON.";
  }
  if (!validateEvent(zapRequest))
    return "Zap request is not a valid Nostr event.";
  if (!verifySignature(zapRequest))
    return "Invalid signature on zap request.";
  let p5 = zapRequest.tags.find(([t, v3]) => t === "p" && v3);
  if (!p5)
    return "Zap request doesn't have a 'p' tag.";
  if (!p5[1].match(/^[a-f0-9]{64}$/))
    return "Zap request 'p' tag is not valid hex.";
  let e2 = zapRequest.tags.find(([t, v3]) => t === "e" && v3);
  if (e2 && !e2[1].match(/^[a-f0-9]{64}$/))
    return "Zap request 'e' tag is not valid hex.";
  let relays = zapRequest.tags.find(([t, v3]) => t === "relays" && v3);
  if (!relays)
    return "Zap request doesn't have a 'relays' tag.";
  return null;
}
function makeZapReceipt({
  zapRequest,
  preimage,
  bolt11,
  paidAt
}) {
  let zr2 = JSON.parse(zapRequest);
  let tagsFromZapRequest = zr2.tags.filter(([t]) => t === "e" || t === "p" || t === "a");
  let zap = {
    kind: 9735,
    created_at: Math.round(paidAt.getTime() / 1e3),
    content: "",
    tags: [...tagsFromZapRequest, ["bolt11", bolt11], ["description", zapRequest]]
  };
  if (preimage) {
    zap.tags.push(["preimage", preimage]);
  }
  return zap;
}
var nip98_exports = {};
__export2(nip98_exports, {
  getToken: () => getToken,
  unpackEventFromToken: () => unpackEventFromToken,
  validateEvent: () => validateEvent2,
  validateToken: () => validateToken
});
var _authorizationScheme = "Nostr ";
async function getToken(loginUrl, httpMethod, sign, includeAuthorizationScheme = false) {
  if (!loginUrl || !httpMethod)
    throw new Error("Missing loginUrl or httpMethod");
  const event = getBlankEvent(
    27235
    /* HttpAuth */
  );
  event.tags = [
    ["u", loginUrl],
    ["method", httpMethod]
  ];
  event.created_at = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
  const signedEvent = await sign(event);
  const authorizationScheme = includeAuthorizationScheme ? _authorizationScheme : "";
  return authorizationScheme + base64.encode(utf8Encoder.encode(JSON.stringify(signedEvent)));
}
async function validateToken(token, url, method) {
  const event = await unpackEventFromToken(token).catch((error) => {
    throw error;
  });
  const valid = await validateEvent2(event, url, method).catch((error) => {
    throw error;
  });
  return valid;
}
async function unpackEventFromToken(token) {
  if (!token) {
    throw new Error("Missing token");
  }
  token = token.replace(_authorizationScheme, "");
  const eventB64 = utf8Decoder.decode(base64.decode(token));
  if (!eventB64 || eventB64.length === 0 || !eventB64.startsWith("{")) {
    throw new Error("Invalid token");
  }
  const event = JSON.parse(eventB64);
  return event;
}
async function validateEvent2(event, url, method) {
  if (!event) {
    throw new Error("Invalid nostr event");
  }
  if (!verifySignature(event)) {
    throw new Error("Invalid nostr event, signature invalid");
  }
  if (event.kind !== 27235) {
    throw new Error("Invalid nostr event, kind invalid");
  }
  if (!event.created_at) {
    throw new Error("Invalid nostr event, created_at invalid");
  }
  if (Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3) - event.created_at > 60) {
    throw new Error("Invalid nostr event, expired");
  }
  const urlTag = event.tags.find((t) => t[0] === "u");
  if ((urlTag == null ? void 0 : urlTag.length) !== 1 && (urlTag == null ? void 0 : urlTag[1]) !== url) {
    throw new Error("Invalid nostr event, url tag invalid");
  }
  const methodTag = event.tags.find((t) => t[0] === "method");
  if ((methodTag == null ? void 0 : methodTag.length) !== 1 && (methodTag == null ? void 0 : methodTag[1].toLowerCase()) !== method.toLowerCase()) {
    throw new Error("Invalid nostr event, method tag invalid");
  }
  return true;
}

// node_modules/.pnpm/@getalby+sdk@3.7.1_typescript@5.6.2/node_modules/@getalby/sdk/dist/index.modern.js
function c() {
  return c = Object.assign ? Object.assign.bind() : function(e2) {
    for (var t = 1; t < arguments.length; t++) {
      var n2 = arguments[t];
      for (var s3 in n2) Object.prototype.hasOwnProperty.call(n2, s3) && (e2[s3] = n2[s3]);
    }
    return e2;
  }, c.apply(this, arguments);
}
function l(e2, t) {
  if (null == e2) return {};
  var n2, s3, i3 = {}, r2 = Object.keys(e2);
  for (s3 = 0; s3 < r2.length; s3++) t.indexOf(n2 = r2[s3]) >= 0 || (i3[n2] = e2[n2]);
  return i3;
}
function u(e2) {
  return Object.entries(e2).map(([e3, t]) => e3 && t ? `${e3}=${t}` : "").filter((e3) => e3).join("&");
}
var d = (e2) => e2.reduce((e3, t) => e3 + t.toString(16).padStart(2, "0"), "");
var p = class extends Error {
  constructor(e2, t, n2, s3) {
    let i3 = e2.toString();
    t && (i3 += ` ${t}`), i3 += ": ", i3 += s3.message ? s3.message : JSON.stringify(s3), super(i3), this.status = void 0, this.statusText = void 0, this.headers = void 0, this.error = void 0, this.status = e2, this.statusText = t, this.headers = n2, this.error = s3;
  }
};
var m = ["auth", "endpoint", "params", "request_body", "method", "max_retries", "base_url", "user_agent", "headers"];
var w = "https://api.getalby.com";
async function g(e2, t, n2 = 0) {
  const s3 = await fetch(e2, t);
  if (429 === s3.status && n2 > 0) {
    const i3 = Number(s3.headers.get("x-rate-limit-reset")), r2 = Number(s3.headers.get("x-rate-limit-remaining")), o2 = 1e3 * i3 - Date.now();
    let a3 = 1e3;
    return 0 === r2 && (a3 = o2), await new Promise((e3) => setTimeout(e3, a3)), g(e2, t, n2 - 1);
  }
  return s3;
}
async function f2(e2) {
  let { auth: t, endpoint: n2, params: s3 = {}, request_body: i3, method: r2, max_retries: o2, base_url: a3 = w, user_agent: h2, headers: d5 } = e2, y3 = l(e2, m);
  const f5 = new URL(a3 + n2);
  f5.search = u(s3);
  const b4 = "POST" === r2 && !!i3, v3 = t ? await t.getAuthHeader(f5.href, r2) : void 0, _3 = await g(f5.toString(), c({ headers: c({}, b4 ? { "Content-Type": "application/json; charset=utf-8" } : void 0, v3, d5, { "User-Agent": null != h2 ? h2 : "@getalby/sdk", "X-User-Agent": null != h2 ? h2 : "@getalby/sdk" }), method: r2, body: b4 ? JSON.stringify(i3) : void 0 }, y3), o2);
  if (!_3.ok) {
    const e3 = await _3.json();
    throw new p(_3.status, _3.statusText, _3.headers, e3);
  }
  return _3;
}
async function b(e2) {
  return (await f2(e2)).json();
}
var E = class {
  constructor(e2) {
    this.bearer_token = void 0, this.bearer_token = e2;
  }
  getAuthHeader() {
    return { Authorization: `Bearer ${this.bearer_token}` };
  }
};
var T = class extends Error {
  constructor(e2, t) {
    super(e2), this.error = void 0, this.code = void 0, this.error = e2, this.code = t;
  }
};
var N = class extends T {
};
var q = class extends T {
};
var A = class extends q {
};
var R = class extends q {
};
var x = class extends T {
};
var S = class extends T {
};
var U = class extends T {
};
var O = class extends T {
};
var I = class extends T {
};
var C = { alby: { authorizationUrl: "https://nwc.getalby.com/apps/new", relayUrl: "wss://relay.getalby.com/v1", walletPubkey: "69effe7b49a6dd5cf525bd0905917a5005ffe480b58eeb8e861418cf3ae760d9" } };
var W = class _W {
  static parseWalletConnectUrl(e2) {
    e2 = e2.replace("nostrwalletconnect://", "http://").replace("nostr+walletconnect://", "http://").replace("nostrwalletconnect:", "http://").replace("nostr+walletconnect:", "http://");
    const t = new URL(e2), n2 = t.searchParams.get("relay");
    if (!n2) throw new Error("No relay URL found in connection string");
    const s3 = { walletPubkey: t.host, relayUrl: n2 }, i3 = t.searchParams.get("secret");
    i3 && (s3.secret = i3);
    const r2 = t.searchParams.get("lud16");
    return r2 && (s3.lud16 = r2), s3;
  }
  static withNewSecret(e2) {
    return (e2 = e2 || {}).secret = generatePrivateKey(), new _W(e2);
  }
  constructor(e2) {
    var t;
    this.relay = void 0, this.relayUrl = void 0, this.secret = void 0, this.lud16 = void 0, this.walletPubkey = void 0, this.options = void 0, e2 && e2.nostrWalletConnectUrl && (e2 = c({}, _W.parseWalletConnectUrl(e2.nostrWalletConnectUrl), e2));
    const i3 = C[(null == (t = e2) ? void 0 : t.providerName) || "alby"];
    this.options = c({}, i3, e2 || {}), this.relayUrl = this.options.relayUrl, this.relay = relayInit(this.relayUrl), this.options.secret && (this.secret = this.options.secret.toLowerCase().startsWith("nsec") ? nip19_exports.decode(this.options.secret).data : this.options.secret), this.lud16 = this.options.lud16, this.walletPubkey = this.options.walletPubkey.toLowerCase().startsWith("npub") ? nip19_exports.decode(this.options.walletPubkey).data : this.options.walletPubkey, void 0 === globalThis.WebSocket && console.error("WebSocket is undefined. Make sure to `import websocket-polyfill` for nodejs environments");
  }
  get nostrWalletConnectUrl() {
    return this.getNostrWalletConnectUrl();
  }
  getNostrWalletConnectUrl(e2 = true) {
    let t = `nostr+walletconnect://${this.walletPubkey}?relay=${this.relayUrl}&pubkey=${this.publicKey}`;
    return e2 && (t = `${t}&secret=${this.secret}`), t;
  }
  get connected() {
    return 1 === this.relay.status;
  }
  get publicKey() {
    if (!this.secret) throw new Error("Missing secret key");
    return getPublicKey(this.secret);
  }
  getPublicKey() {
    return Promise.resolve(this.publicKey);
  }
  signEvent(e2) {
    if (!this.secret) throw new Error("Missing secret key");
    return Promise.resolve(finishEvent(e2, this.secret));
  }
  getEventHash(e2) {
    return getEventHash(e2);
  }
  close() {
    return this.relay.close();
  }
  async encrypt(e2, t) {
    if (!this.secret) throw new Error("Missing secret");
    return await nip04_exports.encrypt(this.secret, e2, t);
  }
  async decrypt(e2, t) {
    if (!this.secret) throw new Error("Missing secret");
    return await nip04_exports.decrypt(this.secret, e2, t);
  }
  getAuthorizationUrl(e2) {
    if (!this.options.authorizationUrl) throw new Error("Missing authorizationUrl option");
    const t = new URL(this.options.authorizationUrl);
    return null != e2 && e2.name && t.searchParams.set("name", null == e2 ? void 0 : e2.name), t.searchParams.set("pubkey", this.publicKey), null != e2 && e2.returnTo && t.searchParams.set("return_to", e2.returnTo), null != e2 && e2.budgetRenewal && t.searchParams.set("budget_renewal", e2.budgetRenewal), null != e2 && e2.expiresAt && t.searchParams.set("expires_at", Math.floor(e2.expiresAt.getTime() / 1e3).toString()), null != e2 && e2.maxAmount && t.searchParams.set("max_amount", e2.maxAmount.toString()), void 0 !== (null == e2 ? void 0 : e2.editable) && t.searchParams.set("editable", e2.editable.toString()), null != e2 && e2.requestMethods && t.searchParams.set("request_methods", e2.requestMethods.join(" ")), t;
  }
  initNWC(e2 = {}) {
    e2.name || (e2.name = document.location.host);
    const t = this.getAuthorizationUrl(e2), n2 = window.outerHeight / 2 + window.screenY - 300, s3 = window.outerWidth / 2 + window.screenX - 200;
    return new Promise((e3, i3) => {
      const r2 = window.open(t.toString(), `${document.title} - Wallet Connect`, `height=600,width=400,top=${n2},left=${s3}`);
      if (!r2) return void i3(new Error("failed to execute window.open"));
      const o2 = (n3) => {
        const s4 = n3.data;
        s4 && "nwc:success" === s4.type && n3.origin === `${t.protocol}//${t.host}` && (e3(s4), clearInterval(a3), window.removeEventListener("message", o2), r2 && r2.close());
      }, a3 = setInterval(() => {
        r2 && r2.closed && (clearInterval(a3), window.removeEventListener("message", o2), i3(new Error("Popup closed")));
      }, 500);
      window.addEventListener("message", o2);
    });
  }
  async getWalletServiceSupportedMethods() {
    return console.warn("getWalletServiceSupportedMethods is deprecated. Please use getWalletServiceInfo instead."), (await this.getWalletServiceInfo()).capabilities;
  }
  async getWalletServiceInfo() {
    var e2;
    await this._checkConnected();
    const t = await this.relay.list([{ kinds: [13194], limit: 1, authors: [this.walletPubkey] }], { eoseSubTimeout: 1e4 });
    if (!t.length) throw new Error("no info event (kind 13194) returned from relay");
    const n2 = t[0].content, s3 = t[0].tags.find((e3) => "notifications" === e3[0]);
    return { capabilities: n2.split(/[ |,]/g), notifications: (null == s3 || null == (e2 = s3[1]) ? void 0 : e2.split(" ")) || [] };
  }
  async getInfo() {
    try {
      return await this.executeNip47Request("get_info", {}, (e2) => !!e2.methods);
    } catch (e2) {
      throw console.error("Failed to request get_info", e2), e2;
    }
  }
  async getBalance() {
    try {
      return await this.executeNip47Request("get_balance", {}, (e2) => void 0 !== e2.balance);
    } catch (e2) {
      throw console.error("Failed to request get_balance", e2), e2;
    }
  }
  async payInvoice(e2) {
    try {
      return await this.executeNip47Request("pay_invoice", e2, (e3) => !!e3.preimage);
    } catch (e3) {
      throw console.error("Failed to request pay_invoice", e3), e3;
    }
  }
  async payKeysend(e2) {
    try {
      return await this.executeNip47Request("pay_keysend", e2, (e3) => !!e3.preimage);
    } catch (e3) {
      throw console.error("Failed to request pay_keysend", e3), e3;
    }
  }
  async signMessage(e2) {
    try {
      return await this.executeNip47Request("sign_message", e2, (t) => t.message === e2.message && !!t.signature);
    } catch (e3) {
      throw console.error("Failed to request sign_message", e3), e3;
    }
  }
  async multiPayInvoice(e2) {
    try {
      return { invoices: await this.executeMultiNip47Request("multi_pay_invoice", e2, e2.invoices.length, (e3) => !!e3.preimage), errors: [] };
    } catch (e3) {
      throw console.error("Failed to request multi_pay_invoice", e3), e3;
    }
  }
  async multiPayKeysend(e2) {
    try {
      return { keysends: await this.executeMultiNip47Request("multi_pay_keysend", e2, e2.keysends.length, (e3) => !!e3.preimage), errors: [] };
    } catch (e3) {
      throw console.error("Failed to request multi_pay_keysend", e3), e3;
    }
  }
  async makeInvoice(e2) {
    try {
      if (!e2.amount) throw new Error("No amount specified");
      return await this.executeNip47Request("make_invoice", e2, (e3) => !!e3.invoice);
    } catch (e3) {
      throw console.error("Failed to request make_invoice", e3), e3;
    }
  }
  async lookupInvoice(e2) {
    try {
      return await this.executeNip47Request("lookup_invoice", e2, (e3) => !!e3.invoice);
    } catch (e3) {
      throw console.error("Failed to request lookup_invoice", e3), e3;
    }
  }
  async listTransactions(e2) {
    try {
      return await this.executeNip47Request("list_transactions", e2, (e3) => !!e3.transactions);
    } catch (e3) {
      throw console.error("Failed to request list_transactions", e3), e3;
    }
  }
  async subscribeNotifications(e2, t) {
    var n2 = this;
    let s3, i3, r2, o2 = true;
    return async function() {
      for (; o2; ) {
        try {
          await n2._checkConnected(), r2 = n2.relay.sub([{ kinds: [23196], authors: [n2.walletPubkey], "#p": [n2.publicKey] }]), console.info("subscribed to relay"), r2.on("event", async function(s4) {
            const i4 = await n2.decrypt(n2.walletPubkey, s4.content);
            let r3;
            try {
              r3 = JSON.parse(i4);
            } catch (e3) {
              return void console.error("Failed to parse decrypted event content", e3);
            }
            r3.notification ? (!t || t.indexOf(r3.notification_type) > -1) && e2(r3) : console.error("No notification in response", r3);
          }), await new Promise((e3) => {
            s3 = () => {
              e3();
            }, i3 = () => {
              console.info("relay disconnected"), null == s3 || s3();
            }, n2.relay.on("disconnect", i3);
          }), void 0 !== i3 && n2.relay.off("disconnect", i3);
        } catch (e3) {
          console.error("error subscribing to notifications", e3 || "unknown relay error");
        }
        o2 && await new Promise((e3) => setTimeout(e3, 1e3));
      }
    }(), () => {
      var e3;
      o2 = false, null == s3 || s3(), null == (e3 = r2) || e3.unsub();
    };
  }
  async executeNip47Request(e2, t, n2) {
    var s3 = this;
    return await this._checkConnected(), new Promise((i3, r2) => {
      !async function() {
        const o2 = { method: e2, params: t }, a3 = await s3.encrypt(s3.walletPubkey, JSON.stringify(o2)), c4 = { kind: 23194, created_at: Math.floor(Date.now() / 1e3), tags: [["p", s3.walletPubkey]], content: a3, pubkey: s3.publicKey }, l4 = await s3.signEvent(c4), u4 = s3.relay.sub([{ kinds: [23195], authors: [s3.walletPubkey], "#e": [l4.id] }]), h2 = setTimeout(function() {
          u4.unsub(), r2(new R(`reply timeout: event ${l4.id}`, "INTERNAL"));
        }, 6e4);
        u4.on("event", async function(e3) {
          clearTimeout(h2), u4.unsub();
          const t2 = await s3.decrypt(s3.walletPubkey, e3.content);
          let o3;
          try {
            o3 = JSON.parse(t2);
          } catch (e4) {
            return clearTimeout(h2), u4.unsub(), void r2(new S("failed to deserialize response", "INTERNAL"));
          }
          var a4, c5;
          o3.result ? n2(o3.result) ? i3(o3.result) : (clearTimeout(h2), u4.unsub(), r2(new U("response from NWC failed validation: " + JSON.stringify(o3.result), "INTERNAL"))) : (clearTimeout(h2), u4.unsub(), r2(new N((null == (a4 = o3.error) ? void 0 : a4.message) || "unknown Error", (null == (c5 = o3.error) ? void 0 : c5.code) || "INTERNAL")));
        });
        const d5 = setTimeout(function() {
          u4.unsub(), r2(new A(`publish timeout: ${l4.id}`, "INTERNAL"));
        }, 5e3);
        try {
          await s3.relay.publish(l4), clearTimeout(d5);
        } catch (e3) {
          clearTimeout(d5), r2(new x(`failed to publish: ${e3}`, "INTERNAL"));
        }
      }();
    });
  }
  async executeMultiNip47Request(e2, t, n2, s3) {
    var i3 = this;
    await this._checkConnected();
    const r2 = [];
    return new Promise((o2, a3) => {
      !async function() {
        const l4 = { method: e2, params: t }, u4 = await i3.encrypt(i3.walletPubkey, JSON.stringify(l4)), h2 = { kind: 23194, created_at: Math.floor(Date.now() / 1e3), tags: [["p", i3.walletPubkey]], content: u4, pubkey: i3.publicKey }, d5 = await i3.signEvent(h2), p5 = i3.relay.sub([{ kinds: [23195], authors: [i3.walletPubkey], "#e": [d5.id] }]), y3 = setTimeout(function() {
          p5.unsub(), a3(new R(`reply timeout: event ${d5.id}`, "INTERNAL"));
        }, 6e4);
        p5.on("event", async function(e3) {
          const t2 = await i3.decrypt(i3.walletPubkey, e3.content);
          let l5;
          try {
            l5 = JSON.parse(t2);
          } catch (e4) {
            clearTimeout(y3), p5.unsub(), a3(new S("failed to deserialize response", "INTERNAL"));
          }
          if (l5.result) {
            var u5;
            if (!s3(l5.result)) return clearTimeout(y3), p5.unsub(), void a3(new U("Response from NWC failed validation: " + JSON.stringify(l5.result), "INTERNAL"));
            const t3 = null == (u5 = e3.tags.find((e4) => "d" === e4[0])) ? void 0 : u5[1];
            if (void 0 === t3) return clearTimeout(y3), p5.unsub(), void a3(new U("No d tag found in response event", "INTERNAL"));
            r2.push(c({}, l5.result, { dTag: t3 })), r2.length === n2 && (clearTimeout(y3), p5.unsub(), o2(r2));
          } else {
            var h3, d6;
            clearTimeout(y3), p5.unsub(), a3(new O(null == (h3 = l5.error) ? void 0 : h3.message, null == (d6 = l5.error) ? void 0 : d6.code));
          }
        });
        const m4 = setTimeout(function() {
          p5.unsub(), a3(new A(`Publish timeout: ${d5.id}`, "INTERNAL"));
        }, 5e3);
        try {
          await i3.relay.publish(d5), clearTimeout(m4);
        } catch (e3) {
          clearTimeout(m4), a3(new x(`Failed to publish: ${e3}`, "INTERNAL"));
        }
      }();
    });
  }
  async _checkConnected() {
    if (!this.secret) throw new Error("Missing secret key");
    try {
      await this.relay.connect();
    } catch (e2) {
      throw console.error("failed to connect to relay", this.relayUrl), new I("Failed to connect to " + this.relayUrl, "OTHER");
    }
  }
};
var $ = { get_info: "getInfo", get_balance: "getBalance", make_invoice: "makeInvoice", pay_invoice: "sendPayment", pay_keysend: "payKeysend", lookup_invoice: "lookupInvoice", list_transactions: "listTransactions", multi_pay_invoice: "sendMultiPayment", multi_pay_keysend: "multiKeysend", sign_message: "signMessage" };
var L = class _L {
  get relay() {
    return console.warn("relay is deprecated. Please use client.relay instead."), this.client.relay;
  }
  get relayUrl() {
    return console.warn("relayUrl is deprecated. Please use client.relayUrl instead."), this.client.relayUrl;
  }
  get walletPubkey() {
    return console.warn("walletPubkey is deprecated. Please use client.walletPubkey instead."), this.client.walletPubkey;
  }
  get options() {
    return this.client.options;
  }
  get secret() {
    return console.warn("secret is deprecated. Please use client.secret instead."), this.client.secret;
  }
  static withNewSecret(e2) {
    return (e2 = e2 || {}).secret = generatePrivateKey(), new _L(e2);
  }
  constructor(e2) {
    this._enabled = false, this.client = void 0, this.subscribers = void 0, this.client = new W(e2), this.subscribers = {};
  }
  on(e2, t) {
    this.subscribers[e2] = t;
  }
  notify(e2, t) {
    const n2 = this.subscribers[e2];
    n2 && n2(t);
  }
  getNostrWalletConnectUrl(e2 = true) {
    return console.warn("getNostrWalletConnectUrl is deprecated. Please use client.getNostrWalletConnectUrl instead."), this.client.getNostrWalletConnectUrl(e2);
  }
  get nostrWalletConnectUrl() {
    return console.warn("nostrWalletConnectUrl is deprecated. Please use client.nostrWalletConnectUrl instead."), this.client.nostrWalletConnectUrl;
  }
  get connected() {
    return console.warn("connected is deprecated. Please use client.connected instead."), this.client.connected;
  }
  get publicKey() {
    return console.warn("publicKey is deprecated. Please use client.publicKey instead."), this.client.publicKey;
  }
  getPublicKey() {
    return this.client.getPublicKey();
  }
  signEvent(e2) {
    return this.client.signEvent(e2);
  }
  getEventHash(e2) {
    return console.warn("getEventHash is deprecated. Please use client.getEventHash instead."), this.client.getEventHash(e2);
  }
  async enable() {
    this._enabled = true;
  }
  close() {
    return this.client.close();
  }
  async encrypt(e2, t) {
    return console.warn("encrypt is deprecated. Please use client.encrypt instead."), this.client.encrypt(e2, t);
  }
  async decrypt(e2, t) {
    return console.warn("decrypt is deprecated. Please use client.decrypt instead."), this.client.decrypt(e2, t);
  }
  getAuthorizationUrl(e2) {
    return console.warn("getAuthorizationUrl is deprecated. Please use client.getAuthorizationUrl instead."), this.client.getAuthorizationUrl(e2);
  }
  initNWC(e2 = {}) {
    return console.warn("initNWC is deprecated. Please use client.initNWC instead."), this.client.initNWC(e2);
  }
  async getInfo() {
    await this.checkEnabled();
    const e2 = ["lightning", "nostr"], t = "Alby JS SDK";
    try {
      const n2 = await this.client.getInfo(), s3 = { methods: n2.methods.map((e3) => $[e3]), node: { alias: n2.alias, pubkey: n2.pubkey, color: n2.color }, supports: e2, version: t };
      return this.notify("getInfo", s3), s3;
    } catch (n2) {
      return console.error("Using minimal getInfo", n2), { methods: ["sendPayment"], node: {}, supports: e2, version: t };
    }
  }
  async getBalance() {
    await this.checkEnabled();
    const e2 = await this.client.getBalance(), t = { balance: Math.floor(e2.balance / 1e3), currency: "sats" };
    return this.notify("getBalance", t), t;
  }
  async sendPayment(e2) {
    await this.checkEnabled();
    const t = { preimage: (await this.client.payInvoice({ invoice: e2 })).preimage };
    return this.notify("sendPayment", t), t;
  }
  async sendPaymentAsync(e2) {
    return await this.checkEnabled(), this.client.payInvoice({ invoice: e2 }), this.notify("sendPaymentAsync", {}), {};
  }
  async keysend(e2) {
    await this.checkEnabled();
    const t = { preimage: (await this.client.payKeysend(z(e2))).preimage };
    return this.notify("keysend", t), t;
  }
  async signMessage(e2) {
    await this.checkEnabled();
    const t = await this.client.signMessage({ message: e2 }), n2 = { message: t.message, signature: t.signature };
    return this.notify("keysend", n2), n2;
  }
  async makeInvoice(e2) {
    var t;
    await this.checkEnabled();
    const n2 = "object" == typeof e2 ? e2 : void 0, s3 = +(null != (t = null == n2 ? void 0 : n2.amount) ? t : e2);
    if (!s3) throw new Error("No amount specified");
    const i3 = { paymentRequest: (await this.client.makeInvoice({ amount: 1e3 * s3, description: null == n2 ? void 0 : n2.defaultMemo })).invoice };
    return this.notify("makeInvoice", i3), i3;
  }
  async lookupInvoice(e2) {
    await this.checkEnabled();
    const t = await this.client.lookupInvoice({ invoice: e2.paymentRequest, payment_hash: e2.paymentHash }), n2 = { preimage: t.preimage, paymentRequest: t.invoice, paid: !!t.settled_at };
    return this.notify("lookupInvoice", n2), n2;
  }
  async listTransactions(e2) {
    await this.checkEnabled();
    const t = { transactions: (await this.client.listTransactions(e2)).transactions.map(K) };
    return this.notify("listTransactions", t), t;
  }
  async sendMultiPayment(e2) {
    await this.checkEnabled();
    const t = await this.client.multiPayInvoice({ invoices: e2.map((e3, t2) => ({ invoice: e3, id: t2.toString() })) }), n2 = { payments: t.invoices.map((t2) => {
      const n3 = e2[parseInt(t2.dTag)];
      if (!n3) throw new Error("Could not find paymentRequest matching response d tag");
      return { paymentRequest: n3, preimage: t2.preimage };
    }), errors: [] };
    return this.notify("sendMultiPayment", n2), n2;
  }
  async multiKeysend(e2) {
    await this.checkEnabled();
    const t = await this.client.multiPayKeysend({ keysends: e2.map((e3, t2) => c({}, z(e3), { id: t2.toString() })) }), n2 = { keysends: t.keysends.map((t2) => {
      const n3 = e2[parseInt(t2.dTag)];
      if (!n3) throw new Error("Could not find keysend matching response d tag");
      return { keysend: n3, preimage: t2.preimage };
    }), errors: [] };
    return this.notify("multiKeysend", n2), n2;
  }
  lnurl(e2) {
    throw new Error("Method not implemented.");
  }
  request(e2, t) {
    throw new Error("Method not implemented.");
  }
  verifyMessage(e2, t) {
    throw new Error("Method not implemented.");
  }
  async checkEnabled() {
    if (!this._enabled) throw new Error("please call enable() and await the promise before calling this function");
  }
};
function K(e2) {
  return c({}, e2, { amount: Math.floor(e2.amount / 1e3), fees_paid: e2.fees_paid ? Math.floor(e2.fees_paid / 1e3) : 0 });
}
function z(e2) {
  return { amount: 1e3 * +e2.amount, pubkey: e2.destination, tlv_records: e2.customRecords ? Object.entries(e2.customRecords).map((e3) => ({ type: parseInt(e3[0]), value: d(new TextEncoder().encode(e3[1])) })) : [] };
}
var j = L;
function B(e2) {
  const t = {};
  return e2.recipient.customKey && e2.recipient.customValue && (t[e2.recipient.customKey] = e2.recipient.customValue), t[7629169] = JSON.stringify(e2.boostagram), { destination: e2.recipient.address, amount: e2.amount, custom_records: t };
}
var F = class {
  constructor(e2, t) {
    this.auth = void 0, this.defaultRequestOptions = void 0, this.auth = "string" == typeof e2 ? new E(e2) : e2, this.defaultRequestOptions = c({}, t, { user_agent: null == t ? void 0 : t.user_agent });
  }
  accountBalance(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/balance", params: e2, method: "GET" }));
  }
  accountSummary(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/user/summary", params: e2, method: "GET" }));
  }
  accountInformation(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/user/me", params: e2, method: "GET" }));
  }
  accountValue4Value(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/user/value4value", params: e2, method: "GET" }));
  }
  incomingInvoices(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/invoices/incoming", params: e2, method: "GET" }));
  }
  outgoingInvoices(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/invoices/outgoing", params: e2, method: "GET" }));
  }
  invoices(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/invoices", params: e2, method: "GET" }));
  }
  getInvoice(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: `/invoices/${e2}`, method: "GET" }));
  }
  decodeInvoice(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: `/decode/bolt11/${e2}`, method: "GET" }));
  }
  createInvoice(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/invoices", request_body: e2, method: "POST" }));
  }
  keysend(e2, t) {
    let n2, s3;
    return Array.isArray(e2) ? (n2 = "/payments/keysend/multi", s3 = { keysends: e2.map((e3) => c({}, e3, { custom_records: e3.customRecords })) }) : (n2 = "/payments/keysend", s3 = c({}, e2, { custom_records: e2.customRecords })), b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: n2, request_body: s3, method: "POST" }));
  }
  sendPayment(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/payments/bolt11", request_body: e2, method: "POST" }));
  }
  sendBoostagram(e2, t) {
    let n2, s3;
    return Array.isArray(e2) ? (n2 = "/payments/keysend/multi", s3 = { keysends: e2.map((e3) => B(e3)) }) : (n2 = "/payments/keysend", s3 = B(e2)), b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: n2, request_body: s3, method: "POST" }));
  }
  sendToAlbyAccount(e2, t) {
    return console.warn("sendToAlbyAccount is deprecated. Please use sendBoostagramToAlbyAccount instead."), this.sendBoostagramToAlbyAccount(e2, t);
  }
  sendBoostagramToAlbyAccount(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/payments/keysend", request_body: { destination: "030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3", custom_records: { 696969: e2.account }, amount: e2.amount, memo: e2.memo }, method: "POST" }));
  }
  createWebhookEndpoint(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/webhook_endpoints", request_body: e2, method: "POST" }));
  }
  deleteWebhookEndpoint(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: `/webhook_endpoints/${e2}`, method: "DELETE" }));
  }
  getSwapInfo(e2) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, e2, { endpoint: "/swaps/info", method: "GET" }));
  }
  createSwap(e2, t) {
    return b(c({ auth: this.auth }, this.defaultRequestOptions, t, { endpoint: "/swaps", method: "POST", request_body: e2 }));
  }
};
var H = { __proto__: null, NostrWebLNProvider: L, NWC: j, OauthWeblnProvider: class {
  constructor(e2) {
    this.client = void 0, this.auth = void 0, this.oauth = void 0, this.subscribers = void 0, this.isExecuting = void 0, this.auth = e2.auth, this.client = new F(e2.auth), this.oauth = true, this.subscribers = {}, this.isExecuting = false;
  }
  on(e2, t) {
    this.subscribers[e2] = t;
  }
  notify(e2, t) {
    const n2 = this.subscribers[e2];
    n2 && n2(t);
  }
  async enable() {
    var e2;
    if (!this.isExecuting) {
      if (null != (e2 = this.auth.token) && e2.access_token) return { enabled: true };
      if ("undefined" == typeof window || void 0 === window.document) throw new Error("Missing access token");
      try {
        this.isExecuting = true, await this.openAuthorization();
      } finally {
        this.isExecuting = false;
      }
    }
  }
  async sendPayment(e2) {
    if (!this.isExecuting) try {
      this.isExecuting = true;
      const t = await this.client.sendPayment({ invoice: e2 });
      return this.notify("sendPayment", t), { preimage: t.payment_preimage };
    } catch (e3) {
      let t = "Unknown Error";
      throw e3 instanceof Error && (t = e3.message), new Error(t);
    } finally {
      this.isExecuting = false;
    }
  }
  async keysend(e2) {
    if (!this.isExecuting) try {
      this.isExecuting = true;
      const t = await this.client.keysend(e2);
      return this.notify("keysend", t), { preimage: t.payment_preimage };
    } catch (e3) {
      let t = "Unknown Error";
      throw e3 instanceof Error && (t = e3.message), new Error(t);
    } finally {
      this.isExecuting = false;
    }
  }
  async getInfo() {
    return { alias: "Alby" };
  }
  async makeInvoice(e2) {
    if (!this.isExecuting) try {
      this.isExecuting = true;
      const t = await this.client.createInvoice({ amount: parseInt(e2.amount.toString()), description: e2.defaultMemo });
      return this.notify("makeInvoice", t), { paymentRequest: t.payment_request };
    } catch (e3) {
      let t = "Unknown Error";
      throw e3 instanceof Error && (t = e3.message), new Error(t);
    } finally {
      this.isExecuting = false;
    }
  }
  async openAuthorization() {
    var e2 = this;
    const t = window.outerHeight / 2 + window.screenY - 350, n2 = window.outerWidth / 2 + window.screenX - 300, s3 = await this.auth.generateAuthURL({ code_challenge_method: "S256" });
    return new Promise((i3, r2) => {
      const o2 = window.open(s3, `${document.title} - WebLN enable`, `height=700,width=600,top=${t},left=${n2}`);
      let a3 = false;
      window.addEventListener("message", async function(t2) {
        const n3 = t2.data;
        if (n3 && "alby:oauth:success" === n3.type && t2.origin === `${document.location.protocol}//${document.location.host}` && !a3) {
          a3 = true, console.info("Processing OAuth code response");
          const t3 = n3.payload.code;
          try {
            await e2.auth.requestAccessToken(t3), e2.client = new F(e2.auth), o2 && o2.close(), e2.notify("enable"), i3({ enabled: true });
          } catch (e3) {
            console.error(e3), r2({ enabled: false });
          }
        }
      });
    });
  }
} };

// node_modules/.pnpm/zustand@4.5.5_@types+react@18.3.10_react@18.3.1/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

// node_modules/.pnpm/@getalby+lightning-tools@5.0.3/node_modules/@getalby/lightning-tools/dist/index.modern.js
var e = class {
  constructor(e2) {
    this.storage = void 0, this.storage = e2 || {};
  }
  getItem(e2) {
    return this.storage[e2];
  }
  setItem(e2, t) {
    this.storage[e2] = t;
  }
};
var r = new e();
async function c2(e2) {
  const t = "string" == typeof e2 ? new TextEncoder().encode(e2) : e2, r2 = await crypto.subtle.digest("SHA-256", t);
  return Array.from(new Uint8Array(r2)).map((e3) => e3.toString(16).padStart(2, "0")).join("");
}
var d2;
var f3;
var p2 = (d2 = function(e2, t) {
  function r2(e3) {
    if (!Number.isSafeInteger(e3)) throw new Error(`Wrong integer: ${e3}`);
  }
  function n2(...e3) {
    const t2 = (e4, t3) => (r3) => e4(t3(r3));
    return { encode: Array.from(e3).reverse().reduce((e4, r3) => e4 ? t2(e4, r3.encode) : r3.encode, void 0), decode: e3.reduce((e4, r3) => e4 ? t2(e4, r3.decode) : r3.decode, void 0) };
  }
  function o2(e3) {
    return { encode: (t2) => {
      if (!Array.isArray(t2) || t2.length && "number" != typeof t2[0]) throw new Error("alphabet.encode input should be an array of numbers");
      return t2.map((t3) => {
        if (r2(t3), t3 < 0 || t3 >= e3.length) throw new Error(`Digit index outside alphabet: ${t3} (alphabet: ${e3.length})`);
        return e3[t3];
      });
    }, decode: (t2) => {
      if (!Array.isArray(t2) || t2.length && "string" != typeof t2[0]) throw new Error("alphabet.decode input should be array of strings");
      return t2.map((t3) => {
        if ("string" != typeof t3) throw new Error(`alphabet.decode: not string element=${t3}`);
        const r3 = e3.indexOf(t3);
        if (-1 === r3) throw new Error(`Unknown letter: "${t3}". Allowed: ${e3}`);
        return r3;
      });
    } };
  }
  function s3(e3 = "") {
    if ("string" != typeof e3) throw new Error("join separator should be string");
    return { encode: (t2) => {
      if (!Array.isArray(t2) || t2.length && "string" != typeof t2[0]) throw new Error("join.encode input should be array of strings");
      for (let e4 of t2) if ("string" != typeof e4) throw new Error(`join.encode: non-string input=${e4}`);
      return t2.join(e3);
    }, decode: (t2) => {
      if ("string" != typeof t2) throw new Error("join.decode input should be string");
      return t2.split(e3);
    } };
  }
  function a3(e3, t2 = "=") {
    if (r2(e3), "string" != typeof t2) throw new Error("padding chr should be string");
    return { encode(r3) {
      if (!Array.isArray(r3) || r3.length && "string" != typeof r3[0]) throw new Error("padding.encode input should be array of strings");
      for (let e4 of r3) if ("string" != typeof e4) throw new Error(`padding.encode: non-string input=${e4}`);
      for (; r3.length * e3 % 8; ) r3.push(t2);
      return r3;
    }, decode(r3) {
      if (!Array.isArray(r3) || r3.length && "string" != typeof r3[0]) throw new Error("padding.encode input should be array of strings");
      for (let e4 of r3) if ("string" != typeof e4) throw new Error(`padding.decode: non-string input=${e4}`);
      let n3 = r3.length;
      if (n3 * e3 % 8) throw new Error("Invalid padding: string should have whole number of bytes");
      for (; n3 > 0 && r3[n3 - 1] === t2; n3--) if (!((n3 - 1) * e3 % 8)) throw new Error("Invalid padding: string has too much padding");
      return r3.slice(0, n3);
    } };
  }
  function i3(e3) {
    if ("function" != typeof e3) throw new Error("normalize fn should be function");
    return { encode: (e4) => e4, decode: (t2) => e3(t2) };
  }
  function c4(e3, t2, n3) {
    if (t2 < 2) throw new Error(`convertRadix: wrong from=${t2}, base cannot be less than 2`);
    if (n3 < 2) throw new Error(`convertRadix: wrong to=${n3}, base cannot be less than 2`);
    if (!Array.isArray(e3)) throw new Error("convertRadix: data should be array");
    if (!e3.length) return [];
    let o3 = 0;
    const s4 = [], a4 = Array.from(e3);
    for (a4.forEach((e4) => {
      if (r2(e4), e4 < 0 || e4 >= t2) throw new Error(`Wrong integer: ${e4}`);
    }); ; ) {
      let e4 = 0, r3 = true;
      for (let s5 = o3; s5 < a4.length; s5++) {
        const i4 = a4[s5], c5 = t2 * e4 + i4;
        if (!Number.isSafeInteger(c5) || t2 * e4 / t2 !== e4 || c5 - i4 != t2 * e4) throw new Error("convertRadix: carry overflow");
        if (e4 = c5 % n3, a4[s5] = Math.floor(c5 / n3), !Number.isSafeInteger(a4[s5]) || a4[s5] * n3 + e4 !== c5) throw new Error("convertRadix: carry overflow");
        r3 && (a4[s5] ? r3 = false : o3 = s5);
      }
      if (s4.push(e4), r3) break;
    }
    for (let t3 = 0; t3 < e3.length - 1 && 0 === e3[t3]; t3++) s4.push(0);
    return s4.reverse();
  }
  Object.defineProperty(t, "__esModule", { value: true }), t.bytes = t.stringToBytes = t.str = t.bytesToString = t.hex = t.utf8 = t.bech32m = t.bech32 = t.base58check = t.base58xmr = t.base58xrp = t.base58flickr = t.base58 = t.base64url = t.base64 = t.base32crockford = t.base32hex = t.base32 = t.base16 = t.utils = t.assertNumber = void 0, t.assertNumber = r2;
  const l4 = (e3, t2) => t2 ? l4(t2, e3 % t2) : e3, h2 = (e3, t2) => e3 + (t2 - l4(e3, t2));
  function u4(e3, t2, n3, o3) {
    if (!Array.isArray(e3)) throw new Error("convertRadix2: data should be array");
    if (t2 <= 0 || t2 > 32) throw new Error(`convertRadix2: wrong from=${t2}`);
    if (n3 <= 0 || n3 > 32) throw new Error(`convertRadix2: wrong to=${n3}`);
    if (h2(t2, n3) > 32) throw new Error(`convertRadix2: carry overflow from=${t2} to=${n3} carryBits=${h2(t2, n3)}`);
    let s4 = 0, a4 = 0;
    const i4 = 2 ** n3 - 1, c5 = [];
    for (const o4 of e3) {
      if (r2(o4), o4 >= 2 ** t2) throw new Error(`convertRadix2: invalid data word=${o4} from=${t2}`);
      if (s4 = s4 << t2 | o4, a4 + t2 > 32) throw new Error(`convertRadix2: carry overflow pos=${a4} from=${t2}`);
      for (a4 += t2; a4 >= n3; a4 -= n3) c5.push((s4 >> a4 - n3 & i4) >>> 0);
      s4 &= 2 ** a4 - 1;
    }
    if (s4 = s4 << n3 - a4 & i4, !o3 && a4 >= t2) throw new Error("Excess padding");
    if (!o3 && s4) throw new Error(`Non-zero padding: ${s4}`);
    return o3 && a4 > 0 && c5.push(s4 >>> 0), c5;
  }
  function d5(e3) {
    return r2(e3), { encode: (t2) => {
      if (!(t2 instanceof Uint8Array)) throw new Error("radix.encode input should be Uint8Array");
      return c4(Array.from(t2), 256, e3);
    }, decode: (t2) => {
      if (!Array.isArray(t2) || t2.length && "number" != typeof t2[0]) throw new Error("radix.decode input should be array of strings");
      return Uint8Array.from(c4(t2, e3, 256));
    } };
  }
  function f5(e3, t2 = false) {
    if (r2(e3), e3 <= 0 || e3 > 32) throw new Error("radix2: bits should be in (0..32]");
    if (h2(8, e3) > 32 || h2(e3, 8) > 32) throw new Error("radix2: carry overflow");
    return { encode: (r3) => {
      if (!(r3 instanceof Uint8Array)) throw new Error("radix2.encode input should be Uint8Array");
      return u4(Array.from(r3), 8, e3, !t2);
    }, decode: (r3) => {
      if (!Array.isArray(r3) || r3.length && "number" != typeof r3[0]) throw new Error("radix2.decode input should be array of strings");
      return Uint8Array.from(u4(r3, e3, 8, t2));
    } };
  }
  function p5(e3) {
    if ("function" != typeof e3) throw new Error("unsafeWrapper fn should be function");
    return function(...t2) {
      try {
        return e3.apply(null, t2);
      } catch (e4) {
      }
    };
  }
  function w4(e3, t2) {
    if (r2(e3), "function" != typeof t2) throw new Error("checksum fn should be function");
    return { encode(r3) {
      if (!(r3 instanceof Uint8Array)) throw new Error("checksum.encode: input should be Uint8Array");
      const n3 = t2(r3).slice(0, e3), o3 = new Uint8Array(r3.length + e3);
      return o3.set(r3), o3.set(n3, r3.length), o3;
    }, decode(r3) {
      if (!(r3 instanceof Uint8Array)) throw new Error("checksum.decode: input should be Uint8Array");
      const n3 = r3.slice(0, -e3), o3 = t2(n3).slice(0, e3), s4 = r3.slice(-e3);
      for (let t3 = 0; t3 < e3; t3++) if (o3[t3] !== s4[t3]) throw new Error("Invalid checksum");
      return n3;
    } };
  }
  t.utils = { alphabet: o2, chain: n2, checksum: w4, radix: d5, radix2: f5, join: s3, padding: a3 }, t.base16 = n2(f5(4), o2("0123456789ABCDEF"), s3("")), t.base32 = n2(f5(5), o2("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), a3(5), s3("")), t.base32hex = n2(f5(5), o2("0123456789ABCDEFGHIJKLMNOPQRSTUV"), a3(5), s3("")), t.base32crockford = n2(f5(5), o2("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), s3(""), i3((e3) => e3.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1"))), t.base64 = n2(f5(6), o2("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), a3(6), s3("")), t.base64url = n2(f5(6), o2("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), a3(6), s3(""));
  const m4 = (e3) => n2(d5(58), o2(e3), s3(""));
  t.base58 = m4("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"), t.base58flickr = m4("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"), t.base58xrp = m4("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
  const y3 = [0, 2, 3, 5, 6, 7, 9, 10, 11];
  t.base58xmr = { encode(e3) {
    let r3 = "";
    for (let n3 = 0; n3 < e3.length; n3 += 8) {
      const o3 = e3.subarray(n3, n3 + 8);
      r3 += t.base58.encode(o3).padStart(y3[o3.length], "1");
    }
    return r3;
  }, decode(e3) {
    let r3 = [];
    for (let n3 = 0; n3 < e3.length; n3 += 11) {
      const o3 = e3.slice(n3, n3 + 11), s4 = y3.indexOf(o3.length), a4 = t.base58.decode(o3);
      for (let e4 = 0; e4 < a4.length - s4; e4++) if (0 !== a4[e4]) throw new Error("base58xmr: wrong padding");
      r3 = r3.concat(Array.from(a4.slice(a4.length - s4)));
    }
    return Uint8Array.from(r3);
  } }, t.base58check = (e3) => n2(w4(4, (t2) => e3(e3(t2))), t.base58);
  const g4 = n2(o2("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), s3("")), b4 = [996825010, 642813549, 513874426, 1027748829, 705979059];
  function v3(e3) {
    const t2 = e3 >> 25;
    let r3 = (33554431 & e3) << 5;
    for (let e4 = 0; e4 < b4.length; e4++) 1 == (t2 >> e4 & 1) && (r3 ^= b4[e4]);
    return r3;
  }
  function E4(e3, t2, r3 = 1) {
    const n3 = e3.length;
    let o3 = 1;
    for (let t3 = 0; t3 < n3; t3++) {
      const r4 = e3.charCodeAt(t3);
      if (r4 < 33 || r4 > 126) throw new Error(`Invalid prefix (${e3})`);
      o3 = v3(o3) ^ r4 >> 5;
    }
    o3 = v3(o3);
    for (let t3 = 0; t3 < n3; t3++) o3 = v3(o3) ^ 31 & e3.charCodeAt(t3);
    for (let e4 of t2) o3 = v3(o3) ^ e4;
    for (let e4 = 0; e4 < 6; e4++) o3 = v3(o3);
    return o3 ^= r3, g4.encode(u4([o3 % 2 ** 30], 30, 5, false));
  }
  function x4(e3) {
    const t2 = "bech32" === e3 ? 1 : 734539939, r3 = f5(5), n3 = r3.decode, o3 = r3.encode, s4 = p5(n3);
    function a4(e4, r4 = 90) {
      if ("string" != typeof e4) throw new Error("bech32.decode input should be string, not " + typeof e4);
      if (e4.length < 8 || false !== r4 && e4.length > r4) throw new TypeError(`Wrong string length: ${e4.length} (${e4}). Expected (8..${r4})`);
      const n4 = e4.toLowerCase();
      if (e4 !== n4 && e4 !== e4.toUpperCase()) throw new Error("String must be lowercase or uppercase");
      const o4 = (e4 = n4).lastIndexOf("1");
      if (0 === o4 || -1 === o4) throw new Error('Letter "1" must be present between prefix and data only');
      const s5 = e4.slice(0, o4), a5 = e4.slice(o4 + 1);
      if (a5.length < 6) throw new Error("Data must be at least 6 characters long");
      const i4 = g4.decode(a5).slice(0, -6), c5 = E4(s5, i4, t2);
      if (!a5.endsWith(c5)) throw new Error(`Invalid checksum in ${e4}: expected "${c5}"`);
      return { prefix: s5, words: i4 };
    }
    return { encode: function(e4, r4, n4 = 90) {
      if ("string" != typeof e4) throw new Error("bech32.encode prefix should be string, not " + typeof e4);
      if (!Array.isArray(r4) || r4.length && "number" != typeof r4[0]) throw new Error("bech32.encode words should be array of numbers, not " + typeof r4);
      const o4 = e4.length + 7 + r4.length;
      if (false !== n4 && o4 > n4) throw new TypeError(`Length ${o4} exceeds limit ${n4}`);
      return `${e4 = e4.toLowerCase()}1${g4.encode(r4)}${E4(e4, r4, t2)}`;
    }, decode: a4, decodeToBytes: function(e4) {
      const { prefix: t3, words: r4 } = a4(e4, false);
      return { prefix: t3, words: r4, bytes: n3(r4) };
    }, decodeUnsafe: p5(a4), fromWords: n3, fromWordsUnsafe: s4, toWords: o3 };
  }
  t.bech32 = x4("bech32"), t.bech32m = x4("bech32m"), t.utf8 = { encode: (e3) => new TextDecoder().decode(e3), decode: (e3) => new TextEncoder().encode(e3) }, t.hex = n2(f5(4), o2("0123456789abcdef"), s3(""), i3((e3) => {
    if ("string" != typeof e3 || e3.length % 2) throw new TypeError(`hex.decode: expected string, got ${typeof e3} with length ${e3.length}`);
    return e3.toLowerCase();
  }));
  const _3 = { utf8: t.utf8, hex: t.hex, base16: t.base16, base32: t.base32, base64: t.base64, base64url: t.base64url, base58: t.base58, base58xmr: t.base58xmr }, k3 = `Invalid encoding type. Available types: ${Object.keys(_3).join(", ")}`;
  t.bytesToString = (e3, t2) => {
    if ("string" != typeof e3 || !_3.hasOwnProperty(e3)) throw new TypeError(k3);
    if (!(t2 instanceof Uint8Array)) throw new TypeError("bytesToString() expects Uint8Array");
    return _3[e3].encode(t2);
  }, t.str = t.bytesToString, t.stringToBytes = (e3, t2) => {
    if (!_3.hasOwnProperty(e3)) throw new TypeError(k3);
    if ("string" != typeof t2) throw new TypeError("stringToBytes() expects string");
    return _3[e3].decode(t2);
  }, t.bytes = t.stringToBytes;
}, d2(f3 = { exports: {} }, f3.exports), f3.exports);
var { bech32: w2, hex: m2, utf8: y } = p2;
var g2 = { bech32: "bc", pubKeyHash: 0, scriptHash: 5, validWitnessVersions: [0] };
var b2 = { bech32: "tb", pubKeyHash: 111, scriptHash: 196, validWitnessVersions: [0] };
var v = { bech32: "tbs", pubKeyHash: 111, scriptHash: 196, validWitnessVersions: [0] };
var E2 = { bech32: "bcrt", pubKeyHash: 111, scriptHash: 196, validWitnessVersions: [0] };
var x2 = { bech32: "sb", pubKeyHash: 63, scriptHash: 123, validWitnessVersions: [0] };
var _ = ["option_data_loss_protect", "initial_routing_sync", "option_upfront_shutdown_script", "gossip_queries", "var_onion_optin", "gossip_queries_ex", "option_static_remotekey", "payment_secret", "basic_mpp", "option_support_large_channel"];
var k = { m: BigInt(1e3), u: BigInt(1e6), n: BigInt(1e9), p: BigInt(1e12) };
var A2 = BigInt("2100000000000000000");
var $2 = BigInt(1e11);
var N2 = { payment_hash: 1, payment_secret: 16, description: 13, payee: 19, description_hash: 23, expiry: 6, min_final_cltv_expiry: 24, fallback_address: 9, route_hint: 3, feature_bits: 5, metadata: 27 };
var S2 = {};
for (let e2 = 0, t = Object.keys(N2); e2 < t.length; e2++) {
  const r2 = t[e2], n2 = N2[t[e2]].toString();
  S2[n2] = r2;
}
var I2 = { 1: (e2) => m2.encode(w2.fromWordsUnsafe(e2)), 16: (e2) => m2.encode(w2.fromWordsUnsafe(e2)), 13: (e2) => y.encode(w2.fromWordsUnsafe(e2)), 19: (e2) => m2.encode(w2.fromWordsUnsafe(e2)), 23: (e2) => m2.encode(w2.fromWordsUnsafe(e2)), 27: (e2) => m2.encode(w2.fromWordsUnsafe(e2)), 6: D, 24: D, 3: function(e2) {
  const t = [];
  let r2, n2, o2, s3, a3, i3 = w2.fromWordsUnsafe(e2);
  for (; i3.length > 0; ) r2 = m2.encode(i3.slice(0, 33)), n2 = m2.encode(i3.slice(33, 41)), o2 = parseInt(m2.encode(i3.slice(41, 45)), 16), s3 = parseInt(m2.encode(i3.slice(45, 49)), 16), a3 = parseInt(m2.encode(i3.slice(49, 51)), 16), i3 = i3.slice(51), t.push({ pubkey: r2, short_channel_id: n2, fee_base_msat: o2, fee_proportional_millionths: s3, cltv_expiry_delta: a3 });
  return t;
}, 5: function(e2) {
  const t = e2.slice().reverse().map((e3) => [!!(1 & e3), !!(2 & e3), !!(4 & e3), !!(8 & e3), !!(16 & e3)]).reduce((e3, t2) => e3.concat(t2), []);
  for (; t.length < 2 * _.length; ) t.push(false);
  const r2 = {};
  _.forEach((e3, n3) => {
    let o2;
    o2 = t[2 * n3] ? "required" : t[2 * n3 + 1] ? "supported" : "unsupported", r2[e3] = o2;
  });
  const n2 = t.slice(2 * _.length);
  return r2.extra_bits = { start_bit: 2 * _.length, bits: n2, has_required: n2.reduce((e3, t2, r3) => r3 % 2 != 0 ? e3 || false : e3 || t2, false) }, r2;
} };
function U2(e2) {
  return (t) => ({ tagCode: parseInt(e2), words: w2.encode("unknown", t, Number.MAX_SAFE_INTEGER) });
}
function D(e2) {
  return e2.reverse().reduce((e3, t, r2) => e3 + t * Math.pow(32, r2), 0);
}
var R2 = class {
  constructor(e2) {
    var t, r2, n2;
    if (this.paymentRequest = void 0, this.paymentHash = void 0, this.preimage = void 0, this.verify = void 0, this.satoshi = void 0, this.expiry = void 0, this.timestamp = void 0, this.createdDate = void 0, this.expiryDate = void 0, this.description = void 0, this.paymentRequest = e2.pr, !this.paymentRequest) throw new Error("Invalid payment request");
    const o2 = ((e3) => {
      if (!e3) return null;
      try {
        const t2 = function(e4, t3) {
          if ("string" != typeof e4) throw new Error("Lightning Payment Request must be string");
          if ("ln" !== e4.slice(0, 2).toLowerCase()) throw new Error("Not a proper lightning payment request");
          const r4 = [], n4 = w2.decode(e4, Number.MAX_SAFE_INTEGER);
          e4 = e4.toLowerCase();
          const o4 = n4.prefix;
          let s4 = n4.words, a4 = e4.slice(o4.length + 1), i4 = s4.slice(-104);
          s4 = s4.slice(0, -104);
          let c5 = o4.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
          if (c5 && !c5[2] && (c5 = o4.match(/^ln(\S+)$/)), !c5) throw new Error("Not a proper lightning payment request");
          r4.push({ name: "lightning_network", letters: "ln" });
          const l5 = c5[1];
          let h3;
          switch (l5) {
            case g2.bech32:
              h3 = g2;
              break;
            case b2.bech32:
              h3 = b2;
              break;
            case v.bech32:
              h3 = v;
              break;
            case E2.bech32:
              h3 = E2;
              break;
            case x2.bech32:
              h3 = x2;
          }
          if (!h3 || h3.bech32 !== l5) throw new Error("Unknown coin bech32 prefix");
          r4.push({ name: "coin_network", letters: l5, value: h3 });
          const u4 = c5[2];
          let d5;
          u4 ? (d5 = function(e5, t4) {
            let r5, n5;
            if (e5.slice(-1).match(/^[munp]$/)) r5 = e5.slice(-1), n5 = e5.slice(0, -1);
            else {
              if (e5.slice(-1).match(/^[^munp0-9]$/)) throw new Error("Not a valid multiplier for the amount");
              n5 = e5;
            }
            if (!n5.match(/^\d+$/)) throw new Error("Not a valid human readable amount");
            const o5 = BigInt(n5), s5 = r5 ? o5 * $2 / k[r5] : o5 * $2;
            if ("p" === r5 && o5 % BigInt(10) !== BigInt(0) || s5 > A2) throw new Error("Amount is outside of valid range");
            return s5.toString();
          }(u4 + c5[3]), r4.push({ name: "amount", letters: c5[2] + c5[3], value: d5 })) : d5 = null, r4.push({ name: "separator", letters: "1" });
          const f5 = D(s4.slice(0, 7));
          let p5, y3, _3, R4;
          for (s4 = s4.slice(7), r4.push({ name: "timestamp", letters: a4.slice(0, 7), value: f5 }), a4 = a4.slice(7); s4.length > 0; ) {
            const e5 = s4[0].toString();
            p5 = S2[e5] || "unknown_tag", y3 = I2[e5] || U2(e5), s4 = s4.slice(1), _3 = D(s4.slice(0, 2)), s4 = s4.slice(2), R4 = s4.slice(0, _3), s4 = s4.slice(_3), r4.push({ name: p5, tag: a4[0], letters: a4.slice(0, 3 + _3), value: y3(R4) }), a4 = a4.slice(3 + _3);
          }
          r4.push({ name: "signature", letters: a4.slice(0, 104), value: m2.encode(w2.fromWordsUnsafe(i4)) }), a4 = a4.slice(104), r4.push({ name: "checksum", letters: a4 });
          let W3 = { paymentRequest: e4, sections: r4, get expiry() {
            let e5 = r4.find((e6) => "expiry" === e6.name);
            if (e5) return P2("timestamp") + e5.value;
          }, get route_hints() {
            return r4.filter((e5) => "route_hint" === e5.name).map((e5) => e5.value);
          } };
          for (let e5 in N2) "route_hint" !== e5 && Object.defineProperty(W3, e5, { get: () => P2(e5) });
          return W3;
          function P2(e5) {
            let t4 = r4.find((t5) => t5.name === e5);
            return t4 ? t4.value : void 0;
          }
        }(e3);
        if (!t2 || !t2.sections) return null;
        const r3 = t2.sections.find((e4) => "payment_hash" === e4.name);
        if ("payment_hash" !== (null == r3 ? void 0 : r3.name) || !r3.value) return null;
        const n3 = r3.value, o3 = t2.sections.find((e4) => "amount" === e4.name);
        if ("amount" !== (null == o3 ? void 0 : o3.name) || void 0 === o3.value) return null;
        const s3 = parseInt(o3.value) / 1e3, a3 = t2.sections.find((e4) => "timestamp" === e4.name);
        if ("timestamp" !== (null == a3 ? void 0 : a3.name) || !a3.value) return null;
        const i3 = a3.value;
        let c4;
        const l4 = t2.sections.find((e4) => "expiry" === e4.name);
        "expiry" === (null == l4 ? void 0 : l4.name) && (c4 = l4.value);
        const h2 = t2.sections.find((e4) => "description" === e4.name);
        return { paymentHash: n3, satoshi: s3, timestamp: i3, expiry: c4, description: "description" === (null == h2 ? void 0 : h2.name) ? null == h2 ? void 0 : h2.value : void 0 };
      } catch (e4) {
        return null;
      }
    })(this.paymentRequest);
    if (!o2) throw new Error("Failed to decode payment request");
    this.paymentHash = o2.paymentHash, this.satoshi = o2.satoshi, this.timestamp = o2.timestamp, this.expiry = o2.expiry, this.createdDate = new Date(1e3 * this.timestamp), this.expiryDate = this.expiry ? new Date(1e3 * (this.timestamp + this.expiry)) : void 0, this.description = null != (t = o2.description) ? t : null, this.verify = null != (r2 = e2.verify) ? r2 : null, this.preimage = null != (n2 = e2.preimage) ? n2 : null;
  }
  async isPaid() {
    if (this.preimage) return this.validatePreimage(this.preimage);
    if (this.verify) return await this.verifyPayment();
    throw new Error("Could not verify payment");
  }
  async validatePreimage(e2) {
    if (!e2 || !this.paymentHash) return false;
    try {
      const r2 = await c2((t = e2, Uint8Array.from(t.match(/.{1,2}/g).map((e3) => parseInt(e3, 16)))));
      return this.paymentHash === r2;
    } catch (e3) {
      return false;
    }
    var t;
  }
  async verifyPayment() {
    if (!this.verify) throw new Error("LNURL verify not available");
    const e2 = await fetch(this.verify), t = await e2.json();
    return t.preimage && (this.preimage = t.preimage), t.settled;
  }
};
var K2 = async (e2) => {
  const t = "https://getalby.com/api/rates/" + e2.toLowerCase() + ".json", r2 = await fetch(t);
  return (await r2.json()).rate_float / 1e8;
};
var q2 = async ({ satoshi: e2, currency: t }) => {
  const r2 = await K2(t);
  return Number(e2) * r2;
};
var C2 = { __proto__: null, getFiatBtcRate: K2, getFiatValue: q2, getSatoshiValue: async ({ amount: e2, currency: t }) => {
  const r2 = await K2(t);
  return Math.floor(Number(e2) / r2);
}, getFormattedFiatValue: async ({ satoshi: e2, currency: t, locale: r2 }) => (r2 || (r2 = "en"), (await q2({ satoshi: e2, currency: t })).toLocaleString(r2, { style: "currency", currency: t })) };

// node_modules/.pnpm/@getalby+bitcoin-connect@3.6.2_@types+react@18.3.10_react@18.3.1_typescript@5.6.2/node_modules/@getalby/bitcoin-connect/dist/index.modern.js
var import_qrcode_generator = __toESM(require_qrcode());
var o = class {
  constructor(t) {
    this._config = t;
  }
  async unload() {
  }
};
var s = (t) => {
  const e2 = [];
  for (let n2 = 0, r2 = atob(t.replace(/[ \r\n]+$/, "")); n2 < r2.length; ++n2) {
    let t2 = r2.charCodeAt(n2).toString(16);
    1 === t2.length && (t2 = "0" + t2), e2[e2.length] = t2;
  }
  return e2.join("");
};
var a;
async function l2() {
  try {
    if (a) return a;
    const t = (await import("./dist-AGAY6CNT.js")).default;
    return a = new t(), a;
  } catch (t) {
    throw console.error(t), new Error("LNC is not available");
  }
}
var c3 = "ONLY CONNECT TO TRUSTED WEBSITES";
var d3 = class {
  constructor(t) {
    this.lnc = t;
  }
  enable() {
    return Promise.resolve();
  }
  async getInfo() {
    const t = await a.lnd.lightning.getInfo();
    return { methods: ["enable", "getBalance", "getInfo", "sendPayment"], version: "1.0", node: { alias: t.alias, pubkey: t.identityPubkey, color: t.color }, supports: ["lightning"] };
  }
  makeInvoice(t) {
    throw new Error("Method not implemented.");
  }
  async sendPayment(t) {
    const e2 = await a.lnd.lightning.sendPaymentSync({ paymentRequest: t });
    if (e2.paymentError) throw new Error(e2.paymentError);
    if (!e2.paymentPreimage) throw new Error("No preimage in response");
    if ("string" != typeof e2.paymentPreimage) throw new Error("expected preimage as string");
    return { preimage: s(e2.paymentPreimage) };
  }
  async getBalance() {
    var t;
    const e2 = await a.lnd.lightning.channelBalance();
    return { balance: parseInt((null == (t = e2.localBalance) ? void 0 : t.sat) || "0") };
  }
  keysend(t) {
    throw new Error("Method not implemented.");
  }
  lnurl(t) {
    throw new Error("Method not implemented.");
  }
  lookupInvoice(t) {
    throw new Error("Method not implemented.");
  }
  signMessage(t) {
    throw new Error("Method not implemented.");
  }
  verifyMessage(t, e2) {
    throw new Error("Method not implemented.");
  }
};
var h = class {
  constructor(t, e2) {
    this._instanceUrl = t, this._adminKey = e2;
  }
  enable() {
    return Promise.resolve();
  }
  async getInfo() {
    return { node: { alias: (await this.requestLnbits("GET", "/api/v1/wallet")).name, pubkey: "" }, methods: ["getInfo", "getBalance", "sendPayment"], version: "1.0", supports: ["lightning"] };
  }
  async makeInvoice(t) {
    return { paymentRequest: (await this.requestLnbits("POST", "/api/v1/payments", { amount: t.amount || t.defaultAmount || +t, memo: t.defaultMemo, out: false })).payment_request };
  }
  async sendPayment(t) {
    const e2 = await this.requestLnbits("POST", "/api/v1/payments", { bolt11: t, out: true }), n2 = await this.requestLnbits("GET", `/api/v1/payments/${e2.payment_hash}`);
    if (!n2.preimage) throw new Error("No preimage");
    return { preimage: n2.preimage };
  }
  async getBalance() {
    const t = await this.requestLnbits("GET", "/api/v1/wallet");
    return { balance: Math.floor(t.balance / 1e3) };
  }
  keysend(t) {
    throw new Error("Method not implemented.");
  }
  lnurl(t) {
    throw new Error("Method not implemented.");
  }
  lookupInvoice(t) {
    throw new Error("Method not implemented.");
  }
  signMessage(t) {
    throw new Error("Method not implemented.");
  }
  verifyMessage(t, e2) {
    throw new Error("Method not implemented.");
  }
  async requestLnbits(t, e2, n2) {
    let r2 = null;
    const i3 = new Headers();
    if (i3.append("Accept", "application/json"), i3.append("Content-Type", "application/json"), i3.append("X-Api-Key", this._adminKey), "POST" === t) r2 = JSON.stringify(n2);
    else if (void 0 !== n2) throw new Error("TODO: support args in GET");
    const o2 = await fetch(this._instanceUrl + e2 + "", { method: t, headers: i3, body: r2 });
    if (!o2.ok) {
      const t2 = await o2.json();
      throw console.error("errBody", t2), new Error(t2.detail);
    }
    return await o2.json();
  }
};
function p3() {
  return p3 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = arguments[e2];
      for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (t[r2] = n2[r2]);
    }
    return t;
  }, p3.apply(this, arguments);
}
var u2 = class extends o {
  constructor(t) {
    super(t);
  }
  async init() {
    if (!this._config.nwcUrl) throw new Error("no nwc URL provided");
    return new H.NostrWebLNProvider({ nostrWalletConnectUrl: this._config.nwcUrl });
  }
};
var f4 = { "extension.generic": class extends o {
  constructor(t) {
    super(t);
  }
  init() {
    if (!window.webln) throw new Error("No WebLN provider available");
    return Promise.resolve(window.webln);
  }
}, "nwc.alby": u2, "nwc.generic": u2, "nwc.mutiny": u2, "nwc.umbrel": u2, "nwc.lnfi": u2, lnbits: class extends o {
  constructor(t) {
    super(t);
  }
  async init() {
    if (!this._config.lnbitsInstanceUrl) throw new Error("no lnbits URL provided");
    if (!this._config.lnbitsAdminKey) throw new Error("no lnbits admin key provided");
    return new h(this._config.lnbitsInstanceUrl, this._config.lnbitsAdminKey);
  }
}, lnc: class extends o {
  constructor(t) {
    super(t);
  }
  async init() {
    await l2();
    const t = new d3(a);
    try {
      const t2 = !a.credentials.pairingPhrase;
      for (t2 ? (console.log("Pairing phrase does not exist"), a.credentials.password = c3) : console.log("Pairing phrase set"), await a.connect(), t2 || (a.credentials.password = c3); !a.isConnected; ) console.log("Waiting to connect..."), await new Promise((t3) => {
        setTimeout(t3, 100);
      });
    } catch (t2) {
      throw console.error(t2), a.disconnect(), a.credentials.clear(), t2;
    }
    return t;
  }
  async unload() {
    a.disconnect(), a.credentials.clear(), await super.unload();
  }
} };
var g3 = { showBalance: true, appName: "Bitcoin Connect" };
var m3 = createStore((t, e2) => ({ route: "/start", routeHistory: [], modalOpen: false, currency: void 0, connected: false, connecting: false, error: void 0, alias: void 0, balance: void 0, connectorName: void 0, invoice: void 0, provider: void 0, connector: void 0, connectorConfig: void 0, bitcoinConnectConfig: g3, info: void 0, connect: async (n2) => {
  t({ connecting: true, error: void 0 });
  try {
    const e3 = new f4[n2.connectorType](n2), r2 = await e3.init();
    let i3;
    await r2.enable();
    try {
      i3 = await r2.getInfo();
    } catch (t2) {
      console.error("Failed to request wallet info");
    }
    t({ connectorConfig: n2, connector: e3, connected: true, connecting: false, info: i3, provider: r2, connectorName: n2.connectorName, route: "/start" }), window.localStorage.setItem("bc:config", JSON.stringify(n2));
  } catch (n3) {
    console.error(n3), t({ error: n3.toString(), connecting: false }), e2().disconnect();
  }
}, disconnect: () => {
  var n2;
  null == (n2 = e2().connector) || n2.unload(), t({ connectorConfig: void 0, connector: void 0, connected: false, connectorName: void 0, provider: void 0, modalOpen: false }), window.localStorage.removeItem("bc:config");
}, pushRoute: (n2) => {
  e2().route !== n2 && t({ route: n2, routeHistory: [...e2().routeHistory, e2().route] });
}, popRoute() {
  const n2 = e2().routeHistory, r2 = n2.pop() || "/start";
  t({ route: r2, routeHistory: n2 });
}, clearRouteHistory() {
  t({ route: "/start", routeHistory: [] });
}, setModalOpen: (e3) => {
  t({ modalOpen: e3 });
}, setBitcoinConnectConfig: (e3) => {
  t({ bitcoinConnectConfig: p3({}, g3, e3) });
}, setError: (e3) => {
  t({ error: e3 });
}, setCurrency: (e3) => {
  e3 ? window.localStorage.setItem("bc:currency", e3) : window.localStorage.removeItem("bc:currency"), t({ currency: e3 });
}, supports: (t2) => {
  const { info: n2, provider: r2 } = e2();
  return !(null == n2 || !n2.methods) && n2.methods.indexOf(t2) > -1 && !(null == r2 || !r2.getBalance);
} }));
function b3(t, e2, n2, r2) {
  var i3, o2 = arguments.length, s3 = o2 < 3 ? e2 : null === r2 ? r2 = Object.getOwnPropertyDescriptor(e2, n2) : r2;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s3 = Reflect.decorate(t, e2, n2, r2);
  else for (var a3 = t.length - 1; a3 >= 0; a3--) (i3 = t[a3]) && (s3 = (o2 < 3 ? i3(s3) : o2 > 3 ? i3(e2, n2, s3) : i3(e2, n2)) || s3);
  return o2 > 3 && s3 && Object.defineProperty(e2, n2, s3), s3;
}
globalThis.window && (function() {
  const t = window.localStorage.getItem("bc:config");
  if (t) {
    const e3 = JSON.parse(t);
    m3.getState().connect(e3);
  }
  const e2 = window.localStorage.getItem("bc:currency");
  e2 && m3.getState().setCurrency(e2);
}(), window.addEventListener("webln:enabled", () => {
  m3.getState().connecting || m3.getState().connect({ connectorName: "Extension", connectorType: "extension.generic" });
})), "function" == typeof SuppressedError && SuppressedError;
var C3 = globalThis;
var y2 = C3.ShadowRoot && (void 0 === C3.ShadyCSS || C3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var w3 = Symbol();
var v2 = /* @__PURE__ */ new WeakMap();
var x3 = class {
  constructor(t, e2, n2) {
    if (this._$cssResult$ = true, n2 !== w3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e2;
  }
  get styleSheet() {
    let t = this.o;
    const e2 = this.t;
    if (y2 && void 0 === t) {
      const n2 = void 0 !== e2 && 1 === e2.length;
      n2 && (t = v2.get(e2)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n2 && v2.set(e2, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
var $3 = y2 ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((t2) => {
  let e2 = "";
  for (const n2 of t2.cssRules) e2 += n2.cssText;
  return ((t3) => new x3("string" == typeof t3 ? t3 : t3 + "", void 0, w3))(e2);
})(t) : t;
var { is: _2, defineProperty: k2, getOwnPropertyDescriptor: S3, getOwnPropertyNames: L2, getOwnPropertySymbols: A3, getPrototypeOf: M } = Object;
var E3 = globalThis;
var H2 = E3.trustedTypes;
var U3 = H2 ? H2.emptyScript : "";
var P = E3.reactiveElementPolyfillSupport;
var N3 = (t, e2) => t;
var T2 = { toAttribute(t, e2) {
  switch (e2) {
    case Boolean:
      t = t ? U3 : null;
      break;
    case Object:
    case Array:
      t = null == t ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e2) {
  let n2 = t;
  switch (e2) {
    case Boolean:
      n2 = null !== t;
      break;
    case Number:
      n2 = null === t ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n2 = JSON.parse(t);
      } catch (t2) {
        n2 = null;
      }
  }
  return n2;
} };
var O2 = (t, e2) => !_2(t, e2);
var V = { attribute: true, type: String, converter: T2, reflect: false, hasChanged: O2 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E3.litPropertyMetadata ?? (E3.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var R3 = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e2 = V) {
    if (e2.state && (e2.attribute = false), this._$Ei(), this.elementProperties.set(t, e2), !e2.noAccessor) {
      const n2 = Symbol(), r2 = this.getPropertyDescriptor(t, n2, e2);
      void 0 !== r2 && k2(this.prototype, t, r2);
    }
  }
  static getPropertyDescriptor(t, e2, n2) {
    const { get: r2, set: i3 } = S3(this.prototype, t) ?? { get() {
      return this[e2];
    }, set(t2) {
      this[e2] = t2;
    } };
    return { get() {
      return r2 == null ? void 0 : r2.call(this);
    }, set(e3) {
      const o2 = r2 == null ? void 0 : r2.call(this);
      i3.call(this, e3), this.requestUpdate(t, o2, n2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? V;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N3("elementProperties"))) return;
    const t = M(this);
    t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N3("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(N3("properties"))) {
      const t2 = this.properties, e2 = [...L2(t2), ...A3(t2)];
      for (const n2 of e2) this.createProperty(n2, t2[n2]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const e2 = litPropertyMetadata.get(t);
      if (void 0 !== e2) for (const [t2, n2] of e2) this.elementProperties.set(t2, n2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t2, e2] of this.elementProperties) {
      const n2 = this._$Eu(t2, e2);
      void 0 !== n2 && this._$Eh.set(n2, t2);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e2 = [];
    if (Array.isArray(t)) {
      const n2 = new Set(t.flat(1 / 0).reverse());
      for (const t2 of n2) e2.unshift($3(t2));
    } else void 0 !== t && e2.push($3(t));
    return e2;
  }
  static _$Eu(t, e2) {
    const n2 = e2.attribute;
    return false === n2 ? void 0 : "string" == typeof n2 ? n2 : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a3;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a3 = this.constructor.l) == null ? void 0 : _a3.forEach((t) => t(this));
  }
  addController(t) {
    var _a3;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), void 0 !== this.renderRoot && this.isConnected && ((_a3 = t.hostConnected) == null ? void 0 : _a3.call(t));
  }
  removeController(t) {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e2 = this.constructor.elementProperties;
    for (const n2 of e2.keys()) this.hasOwnProperty(n2) && (t.set(n2, this[n2]), delete this[n2]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ((t2, e2) => {
      if (y2) t2.adoptedStyleSheets = e2.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
      else for (const n2 of e2) {
        const e3 = document.createElement("style"), r2 = C3.litNonce;
        void 0 !== r2 && e3.setAttribute("nonce", r2), e3.textContent = n2.cssText, t2.appendChild(e3);
      }
    })(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var _a3;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a3 = this._$EO) == null ? void 0 : _a3.forEach((t) => {
      var _a4;
      return (_a4 = t.hostConnected) == null ? void 0 : _a4.call(t);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.forEach((t) => {
      var _a4;
      return (_a4 = t.hostDisconnected) == null ? void 0 : _a4.call(t);
    });
  }
  attributeChangedCallback(t, e2, n2) {
    this._$AK(t, n2);
  }
  _$EC(t, e2) {
    var _a3;
    const n2 = this.constructor.elementProperties.get(t), r2 = this.constructor._$Eu(t, n2);
    if (void 0 !== r2 && true === n2.reflect) {
      const i3 = (void 0 !== ((_a3 = n2.converter) == null ? void 0 : _a3.toAttribute) ? n2.converter : T2).toAttribute(e2, n2.type);
      this._$Em = t, null == i3 ? this.removeAttribute(r2) : this.setAttribute(r2, i3), this._$Em = null;
    }
  }
  _$AK(t, e2) {
    var _a3;
    const n2 = this.constructor, r2 = n2._$Eh.get(t);
    if (void 0 !== r2 && this._$Em !== r2) {
      const t2 = n2.getPropertyOptions(r2), i3 = "function" == typeof t2.converter ? { fromAttribute: t2.converter } : void 0 !== ((_a3 = t2.converter) == null ? void 0 : _a3.fromAttribute) ? t2.converter : T2;
      this._$Em = r2, this[r2] = i3.fromAttribute(e2, t2.type), this._$Em = null;
    }
  }
  requestUpdate(t, e2, n2) {
    if (void 0 !== t) {
      if (n2 ?? (n2 = this.constructor.getPropertyOptions(t)), !(n2.hasChanged ?? O2)(this[t], e2)) return;
      this.P(t, e2, n2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t, e2, n2) {
    this._$AL.has(t) || this._$AL.set(t, e2), true === n2.reflect && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t2) {
      Promise.reject(t2);
    }
    const t = this.scheduleUpdate();
    return null != t && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a3;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t3, e3] of this._$Ep) this[t3] = e3;
        this._$Ep = void 0;
      }
      const t2 = this.constructor.elementProperties;
      if (t2.size > 0) for (const [e3, n2] of t2) true !== n2.wrapped || this._$AL.has(e3) || void 0 === this[e3] || this.P(e3, this[e3], n2);
    }
    let t = false;
    const e2 = this._$AL;
    try {
      t = this.shouldUpdate(e2), t ? (this.willUpdate(e2), (_a3 = this._$EO) == null ? void 0 : _a3.forEach((t2) => {
        var _a4;
        return (_a4 = t2.hostUpdate) == null ? void 0 : _a4.call(t2);
      }), this.update(e2)) : this._$EU();
    } catch (e3) {
      throw t = false, this._$EU(), e3;
    }
    t && this._$AE(e2);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.forEach((t2) => {
      var _a4;
      return (_a4 = t2.hostUpdated) == null ? void 0 : _a4.call(t2);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return true;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t2) => this._$EC(t2, this[t2]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
R3.elementStyles = [], R3.shadowRootOptions = { mode: "open" }, R3[N3("elementProperties")] = /* @__PURE__ */ new Map(), R3[N3("finalized")] = /* @__PURE__ */ new Map(), P == null ? void 0 : P({ ReactiveElement: R3 }), (E3.reactiveElementVersions ?? (E3.reactiveElementVersions = [])).push("2.0.4");
var Z = globalThis;
var z2 = Z.trustedTypes;
var F2 = z2 ? z2.createPolicy("lit-html", { createHTML: (t) => t }) : void 0;
var j2 = "$lit$";
var B2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var W2 = "?" + B2;
var D2 = `<${W2}>`;
var I3 = document;
var q3 = () => I3.createComment("");
var G = (t) => null === t || "object" != typeof t && "function" != typeof t;
var K3 = Array.isArray;
var J = "[ 	\n\f\r]";
var Y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var Q = /-->/g;
var X = />/g;
var tt = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var et = /'/g;
var nt = /"/g;
var rt = /^(?:script|style|textarea|title)$/i;
var it = Symbol.for("lit-noChange");
var ot = Symbol.for("lit-nothing");
var st = /* @__PURE__ */ new WeakMap();
var at = I3.createTreeWalker(I3, 129);
function lt(t, e2) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== F2 ? F2.createHTML(e2) : e2;
}
var ct = class _ct {
  constructor({ strings: t, _$litType$: e2 }, n2) {
    let r2;
    this.parts = [];
    let i3 = 0, o2 = 0;
    const s3 = t.length - 1, a3 = this.parts, [l4, c4] = ((t2, e3) => {
      const n3 = t2.length - 1, r3 = [];
      let i4, o3 = 2 === e3 ? "<svg>" : "", s4 = Y;
      for (let e4 = 0; e4 < n3; e4++) {
        const n4 = t2[e4];
        let a4, l5, c5 = -1, d5 = 0;
        for (; d5 < n4.length && (s4.lastIndex = d5, l5 = s4.exec(n4), null !== l5); ) d5 = s4.lastIndex, s4 === Y ? "!--" === l5[1] ? s4 = Q : void 0 !== l5[1] ? s4 = X : void 0 !== l5[2] ? (rt.test(l5[2]) && (i4 = RegExp("</" + l5[2], "g")), s4 = tt) : void 0 !== l5[3] && (s4 = tt) : s4 === tt ? ">" === l5[0] ? (s4 = i4 ?? Y, c5 = -1) : void 0 === l5[1] ? c5 = -2 : (c5 = s4.lastIndex - l5[2].length, a4 = l5[1], s4 = void 0 === l5[3] ? tt : '"' === l5[3] ? nt : et) : s4 === nt || s4 === et ? s4 = tt : s4 === Q || s4 === X ? s4 = Y : (s4 = tt, i4 = void 0);
        const h2 = s4 === tt && t2[e4 + 1].startsWith("/>") ? " " : "";
        o3 += s4 === Y ? n4 + D2 : c5 >= 0 ? (r3.push(a4), n4.slice(0, c5) + j2 + n4.slice(c5) + B2 + h2) : n4 + B2 + (-2 === c5 ? e4 : h2);
      }
      return [lt(t2, o3 + (t2[n3] || "<?>") + (2 === e3 ? "</svg>" : "")), r3];
    })(t, e2);
    if (this.el = _ct.createElement(l4, n2), at.currentNode = this.el.content, 2 === e2) {
      const t2 = this.el.content.firstChild;
      t2.replaceWith(...t2.childNodes);
    }
    for (; null !== (r2 = at.nextNode()) && a3.length < s3; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t2 of r2.getAttributeNames()) if (t2.endsWith(j2)) {
          const e3 = c4[o2++], n3 = r2.getAttribute(t2).split(B2), s4 = /([.?@])?(.*)/.exec(e3);
          a3.push({ type: 1, index: i3, name: s4[2], strings: n3, ctor: "." === s4[1] ? ft : "?" === s4[1] ? gt : "@" === s4[1] ? mt : ut }), r2.removeAttribute(t2);
        } else t2.startsWith(B2) && (a3.push({ type: 6, index: i3 }), r2.removeAttribute(t2));
        if (rt.test(r2.tagName)) {
          const t2 = r2.textContent.split(B2), e3 = t2.length - 1;
          if (e3 > 0) {
            r2.textContent = z2 ? z2.emptyScript : "";
            for (let n3 = 0; n3 < e3; n3++) r2.append(t2[n3], q3()), at.nextNode(), a3.push({ type: 2, index: ++i3 });
            r2.append(t2[e3], q3());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === W2) a3.push({ type: 2, index: i3 });
      else {
        let t2 = -1;
        for (; -1 !== (t2 = r2.data.indexOf(B2, t2 + 1)); ) a3.push({ type: 7, index: i3 }), t2 += B2.length - 1;
      }
      i3++;
    }
  }
  static createElement(t, e2) {
    const n2 = I3.createElement("template");
    return n2.innerHTML = t, n2;
  }
};
function dt(t, e2, n2 = t, r2) {
  var _a3, _b;
  if (e2 === it) return e2;
  let i3 = void 0 !== r2 ? (_a3 = n2._$Co) == null ? void 0 : _a3[r2] : n2._$Cl;
  const o2 = G(e2) ? void 0 : e2._$litDirective$;
  return (i3 == null ? void 0 : i3.constructor) !== o2 && ((_b = i3 == null ? void 0 : i3._$AO) == null ? void 0 : _b.call(i3, false), void 0 === o2 ? i3 = void 0 : (i3 = new o2(t), i3._$AT(t, n2, r2)), void 0 !== r2 ? (n2._$Co ?? (n2._$Co = []))[r2] = i3 : n2._$Cl = i3), void 0 !== i3 && (e2 = dt(t, i3._$AS(t, e2.values), i3, r2)), e2;
}
var ht = class {
  constructor(t, e2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e2 }, parts: n2 } = this._$AD, r2 = ((t == null ? void 0 : t.creationScope) ?? I3).importNode(e2, true);
    at.currentNode = r2;
    let i3 = at.nextNode(), o2 = 0, s3 = 0, a3 = n2[0];
    for (; void 0 !== a3; ) {
      if (o2 === a3.index) {
        let e3;
        2 === a3.type ? e3 = new pt(i3, i3.nextSibling, this, t) : 1 === a3.type ? e3 = new a3.ctor(i3, a3.name, a3.strings, this, t) : 6 === a3.type && (e3 = new bt(i3, this, t)), this._$AV.push(e3), a3 = n2[++s3];
      }
      o2 !== (a3 == null ? void 0 : a3.index) && (i3 = at.nextNode(), o2++);
    }
    return at.currentNode = I3, r2;
  }
  p(t) {
    let e2 = 0;
    for (const n2 of this._$AV) void 0 !== n2 && (void 0 !== n2.strings ? (n2._$AI(t, n2, e2), e2 += n2.strings.length - 2) : n2._$AI(t[e2])), e2++;
  }
};
var pt = class _pt {
  get _$AU() {
    var _a3;
    return ((_a3 = this._$AM) == null ? void 0 : _a3._$AU) ?? this._$Cv;
  }
  constructor(t, e2, n2, r2) {
    this.type = 2, this._$AH = ot, this._$AN = void 0, this._$AA = t, this._$AB = e2, this._$AM = n2, this.options = r2, this._$Cv = (r2 == null ? void 0 : r2.isConnected) ?? true;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e2 = this._$AM;
    return void 0 !== e2 && 11 === (t == null ? void 0 : t.nodeType) && (t = e2.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e2 = this) {
    t = dt(this, t, e2), G(t) ? t === ot || null == t || "" === t ? (this._$AH !== ot && this._$AR(), this._$AH = ot) : t !== this._$AH && t !== it && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : ((t2) => K3(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]))(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== ot && G(this._$AH) ? this._$AA.nextSibling.data = t : this.T(I3.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var _a3;
    const { values: e2, _$litType$: n2 } = t, r2 = "number" == typeof n2 ? this._$AC(t) : (void 0 === n2.el && (n2.el = ct.createElement(lt(n2.h, n2.h[0]), this.options)), n2);
    if (((_a3 = this._$AH) == null ? void 0 : _a3._$AD) === r2) this._$AH.p(e2);
    else {
      const t2 = new ht(r2, this), n3 = t2.u(this.options);
      t2.p(e2), this.T(n3), this._$AH = t2;
    }
  }
  _$AC(t) {
    let e2 = st.get(t.strings);
    return void 0 === e2 && st.set(t.strings, e2 = new ct(t)), e2;
  }
  k(t) {
    K3(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let n2, r2 = 0;
    for (const i3 of t) r2 === e2.length ? e2.push(n2 = new _pt(this.S(q3()), this.S(q3()), this, this.options)) : n2 = e2[r2], n2._$AI(i3), r2++;
    r2 < e2.length && (this._$AR(n2 && n2._$AB.nextSibling, r2), e2.length = r2);
  }
  _$AR(t = this._$AA.nextSibling, e2) {
    var _a3;
    for ((_a3 = this._$AP) == null ? void 0 : _a3.call(this, false, true, e2); t && t !== this._$AB; ) {
      const e3 = t.nextSibling;
      t.remove(), t = e3;
    }
  }
  setConnected(t) {
    var _a3;
    void 0 === this._$AM && (this._$Cv = t, (_a3 = this._$AP) == null ? void 0 : _a3.call(this, t));
  }
};
var ut = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e2, n2, r2, i3) {
    this.type = 1, this._$AH = ot, this._$AN = void 0, this.element = t, this.name = e2, this._$AM = r2, this.options = i3, n2.length > 2 || "" !== n2[0] || "" !== n2[1] ? (this._$AH = Array(n2.length - 1).fill(new String()), this.strings = n2) : this._$AH = ot;
  }
  _$AI(t, e2 = this, n2, r2) {
    const i3 = this.strings;
    let o2 = false;
    if (void 0 === i3) t = dt(this, t, e2, 0), o2 = !G(t) || t !== this._$AH && t !== it, o2 && (this._$AH = t);
    else {
      const r3 = t;
      let s3, a3;
      for (t = i3[0], s3 = 0; s3 < i3.length - 1; s3++) a3 = dt(this, r3[n2 + s3], e2, s3), a3 === it && (a3 = this._$AH[s3]), o2 || (o2 = !G(a3) || a3 !== this._$AH[s3]), a3 === ot ? t = ot : t !== ot && (t += (a3 ?? "") + i3[s3 + 1]), this._$AH[s3] = a3;
    }
    o2 && !r2 && this.j(t);
  }
  j(t) {
    t === ot ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
var ft = class extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ot ? void 0 : t;
  }
};
var gt = class extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ot);
  }
};
var mt = class extends ut {
  constructor(t, e2, n2, r2, i3) {
    super(t, e2, n2, r2, i3), this.type = 5;
  }
  _$AI(t, e2 = this) {
    if ((t = dt(this, t, e2, 0) ?? ot) === it) return;
    const n2 = this._$AH, r2 = t === ot && n2 !== ot || t.capture !== n2.capture || t.once !== n2.once || t.passive !== n2.passive, i3 = t !== ot && (n2 === ot || r2);
    r2 && this.element.removeEventListener(this.name, this, n2), i3 && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var _a3;
    "function" == typeof this._$AH ? this._$AH.call(((_a3 = this.options) == null ? void 0 : _a3.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
};
var bt = class {
  constructor(t, e2, n2) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = n2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    dt(this, t);
  }
};
var Ct = Z.litHtmlPolyfillSupport;
Ct == null ? void 0 : Ct(ct, pt), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.1.3");
var yt = globalThis;
var wt = yt.ShadowRoot && (void 0 === yt.ShadyCSS || yt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var vt = Symbol();
var xt = /* @__PURE__ */ new WeakMap();
var $t = class {
  constructor(t, e2, n2) {
    if (this._$cssResult$ = true, n2 !== vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e2;
  }
  get styleSheet() {
    let t = this.o;
    const e2 = this.t;
    if (wt && void 0 === t) {
      const n2 = void 0 !== e2 && 1 === e2.length;
      n2 && (t = xt.get(e2)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n2 && xt.set(e2, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
var _t = (t, ...e2) => {
  const n2 = 1 === t.length ? t[0] : e2.reduce((e3, n3, r2) => e3 + ((t2) => {
    if (true === t2._$cssResult$) return t2.cssText;
    if ("number" == typeof t2) return t2;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t2 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t[r2 + 1], t[0]);
  return new $t(n2, t, vt);
};
var kt = wt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((t2) => {
  let e2 = "";
  for (const n2 of t2.cssRules) e2 += n2.cssText;
  return ((t3) => new $t("string" == typeof t3 ? t3 : t3 + "", void 0, vt))(e2);
})(t) : t;
var { is: St, defineProperty: Lt, getOwnPropertyDescriptor: At, getOwnPropertyNames: Mt, getOwnPropertySymbols: Et, getPrototypeOf: Ht } = Object;
var Ut = globalThis;
var Pt = Ut.trustedTypes;
var Nt = Pt ? Pt.emptyScript : "";
var Tt = Ut.reactiveElementPolyfillSupport;
var Ot = (t, e2) => t;
var Vt = { toAttribute(t, e2) {
  switch (e2) {
    case Boolean:
      t = t ? Nt : null;
      break;
    case Object:
    case Array:
      t = null == t ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e2) {
  let n2 = t;
  switch (e2) {
    case Boolean:
      n2 = null !== t;
      break;
    case Number:
      n2 = null === t ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n2 = JSON.parse(t);
      } catch (t2) {
        n2 = null;
      }
  }
  return n2;
} };
var Rt = (t, e2) => !St(t, e2);
var Zt = { attribute: true, type: String, converter: Vt, reflect: false, hasChanged: Rt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Ut.litPropertyMetadata ?? (Ut.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var zt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e2 = Zt) {
    if (e2.state && (e2.attribute = false), this._$Ei(), this.elementProperties.set(t, e2), !e2.noAccessor) {
      const n2 = Symbol(), r2 = this.getPropertyDescriptor(t, n2, e2);
      void 0 !== r2 && Lt(this.prototype, t, r2);
    }
  }
  static getPropertyDescriptor(t, e2, n2) {
    const { get: r2, set: i3 } = At(this.prototype, t) ?? { get() {
      return this[e2];
    }, set(t2) {
      this[e2] = t2;
    } };
    return { get() {
      return r2 == null ? void 0 : r2.call(this);
    }, set(e3) {
      const o2 = r2 == null ? void 0 : r2.call(this);
      i3.call(this, e3), this.requestUpdate(t, o2, n2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ot("elementProperties"))) return;
    const t = Ht(this);
    t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ot("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(Ot("properties"))) {
      const t2 = this.properties, e2 = [...Mt(t2), ...Et(t2)];
      for (const n2 of e2) this.createProperty(n2, t2[n2]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const e2 = litPropertyMetadata.get(t);
      if (void 0 !== e2) for (const [t2, n2] of e2) this.elementProperties.set(t2, n2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t2, e2] of this.elementProperties) {
      const n2 = this._$Eu(t2, e2);
      void 0 !== n2 && this._$Eh.set(n2, t2);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e2 = [];
    if (Array.isArray(t)) {
      const n2 = new Set(t.flat(1 / 0).reverse());
      for (const t2 of n2) e2.unshift(kt(t2));
    } else void 0 !== t && e2.push(kt(t));
    return e2;
  }
  static _$Eu(t, e2) {
    const n2 = e2.attribute;
    return false === n2 ? void 0 : "string" == typeof n2 ? n2 : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a3;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a3 = this.constructor.l) == null ? void 0 : _a3.forEach((t) => t(this));
  }
  addController(t) {
    var _a3;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), void 0 !== this.renderRoot && this.isConnected && ((_a3 = t.hostConnected) == null ? void 0 : _a3.call(t));
  }
  removeController(t) {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e2 = this.constructor.elementProperties;
    for (const n2 of e2.keys()) this.hasOwnProperty(n2) && (t.set(n2, this[n2]), delete this[n2]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ((t2, e2) => {
      if (wt) t2.adoptedStyleSheets = e2.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
      else for (const n2 of e2) {
        const e3 = document.createElement("style"), r2 = yt.litNonce;
        void 0 !== r2 && e3.setAttribute("nonce", r2), e3.textContent = n2.cssText, t2.appendChild(e3);
      }
    })(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var _a3;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a3 = this._$EO) == null ? void 0 : _a3.forEach((t) => {
      var _a4;
      return (_a4 = t.hostConnected) == null ? void 0 : _a4.call(t);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.forEach((t) => {
      var _a4;
      return (_a4 = t.hostDisconnected) == null ? void 0 : _a4.call(t);
    });
  }
  attributeChangedCallback(t, e2, n2) {
    this._$AK(t, n2);
  }
  _$EC(t, e2) {
    var _a3;
    const n2 = this.constructor.elementProperties.get(t), r2 = this.constructor._$Eu(t, n2);
    if (void 0 !== r2 && true === n2.reflect) {
      const i3 = (void 0 !== ((_a3 = n2.converter) == null ? void 0 : _a3.toAttribute) ? n2.converter : Vt).toAttribute(e2, n2.type);
      this._$Em = t, null == i3 ? this.removeAttribute(r2) : this.setAttribute(r2, i3), this._$Em = null;
    }
  }
  _$AK(t, e2) {
    var _a3;
    const n2 = this.constructor, r2 = n2._$Eh.get(t);
    if (void 0 !== r2 && this._$Em !== r2) {
      const t2 = n2.getPropertyOptions(r2), i3 = "function" == typeof t2.converter ? { fromAttribute: t2.converter } : void 0 !== ((_a3 = t2.converter) == null ? void 0 : _a3.fromAttribute) ? t2.converter : Vt;
      this._$Em = r2, this[r2] = i3.fromAttribute(e2, t2.type), this._$Em = null;
    }
  }
  requestUpdate(t, e2, n2) {
    if (void 0 !== t) {
      if (n2 ?? (n2 = this.constructor.getPropertyOptions(t)), !(n2.hasChanged ?? Rt)(this[t], e2)) return;
      this.P(t, e2, n2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t, e2, n2) {
    this._$AL.has(t) || this._$AL.set(t, e2), true === n2.reflect && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t2) {
      Promise.reject(t2);
    }
    const t = this.scheduleUpdate();
    return null != t && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a3;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t3, e3] of this._$Ep) this[t3] = e3;
        this._$Ep = void 0;
      }
      const t2 = this.constructor.elementProperties;
      if (t2.size > 0) for (const [e3, n2] of t2) true !== n2.wrapped || this._$AL.has(e3) || void 0 === this[e3] || this.P(e3, this[e3], n2);
    }
    let t = false;
    const e2 = this._$AL;
    try {
      t = this.shouldUpdate(e2), t ? (this.willUpdate(e2), (_a3 = this._$EO) == null ? void 0 : _a3.forEach((t2) => {
        var _a4;
        return (_a4 = t2.hostUpdate) == null ? void 0 : _a4.call(t2);
      }), this.update(e2)) : this._$EU();
    } catch (e3) {
      throw t = false, this._$EU(), e3;
    }
    t && this._$AE(e2);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.forEach((t2) => {
      var _a4;
      return (_a4 = t2.hostUpdated) == null ? void 0 : _a4.call(t2);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return true;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t2) => this._$EC(t2, this[t2]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
zt.elementStyles = [], zt.shadowRootOptions = { mode: "open" }, zt[Ot("elementProperties")] = /* @__PURE__ */ new Map(), zt[Ot("finalized")] = /* @__PURE__ */ new Map(), Tt == null ? void 0 : Tt({ ReactiveElement: zt }), (Ut.reactiveElementVersions ?? (Ut.reactiveElementVersions = [])).push("2.0.4");
var Ft = globalThis;
var jt = Ft.trustedTypes;
var Bt = jt ? jt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0;
var Wt = "$lit$";
var Dt = `lit$${Math.random().toFixed(9).slice(2)}$`;
var It = "?" + Dt;
var qt = `<${It}>`;
var Gt = document;
var Kt = () => Gt.createComment("");
var Jt = (t) => null === t || "object" != typeof t && "function" != typeof t;
var Yt = Array.isArray;
var Qt = "[ 	\n\f\r]";
var Xt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var te = /-->/g;
var ee = />/g;
var ne = RegExp(`>|${Qt}(?:([^\\s"'>=/]+)(${Qt}*=${Qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var re = /'/g;
var ie = /"/g;
var oe = /^(?:script|style|textarea|title)$/i;
var se = (t) => (e2, ...n2) => ({ _$litType$: t, strings: e2, values: n2 });
var ae = se(1);
var le = se(2);
var ce = Symbol.for("lit-noChange");
var de = Symbol.for("lit-nothing");
var he = /* @__PURE__ */ new WeakMap();
var pe = Gt.createTreeWalker(Gt, 129);
function ue(t, e2) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== Bt ? Bt.createHTML(e2) : e2;
}
var fe2 = (t, e2) => {
  const n2 = t.length - 1, r2 = [];
  let i3, o2 = 2 === e2 ? "<svg>" : "", s3 = Xt;
  for (let e3 = 0; e3 < n2; e3++) {
    const n3 = t[e3];
    let a3, l4, c4 = -1, d5 = 0;
    for (; d5 < n3.length && (s3.lastIndex = d5, l4 = s3.exec(n3), null !== l4); ) d5 = s3.lastIndex, s3 === Xt ? "!--" === l4[1] ? s3 = te : void 0 !== l4[1] ? s3 = ee : void 0 !== l4[2] ? (oe.test(l4[2]) && (i3 = RegExp("</" + l4[2], "g")), s3 = ne) : void 0 !== l4[3] && (s3 = ne) : s3 === ne ? ">" === l4[0] ? (s3 = i3 ?? Xt, c4 = -1) : void 0 === l4[1] ? c4 = -2 : (c4 = s3.lastIndex - l4[2].length, a3 = l4[1], s3 = void 0 === l4[3] ? ne : '"' === l4[3] ? ie : re) : s3 === ie || s3 === re ? s3 = ne : s3 === te || s3 === ee ? s3 = Xt : (s3 = ne, i3 = void 0);
    const h2 = s3 === ne && t[e3 + 1].startsWith("/>") ? " " : "";
    o2 += s3 === Xt ? n3 + qt : c4 >= 0 ? (r2.push(a3), n3.slice(0, c4) + Wt + n3.slice(c4) + Dt + h2) : n3 + Dt + (-2 === c4 ? e3 : h2);
  }
  return [ue(t, o2 + (t[n2] || "<?>") + (2 === e2 ? "</svg>" : "")), r2];
};
var ge2 = class _ge {
  constructor({ strings: t, _$litType$: e2 }, n2) {
    let r2;
    this.parts = [];
    let i3 = 0, o2 = 0;
    const s3 = t.length - 1, a3 = this.parts, [l4, c4] = fe2(t, e2);
    if (this.el = _ge.createElement(l4, n2), pe.currentNode = this.el.content, 2 === e2) {
      const t2 = this.el.content.firstChild;
      t2.replaceWith(...t2.childNodes);
    }
    for (; null !== (r2 = pe.nextNode()) && a3.length < s3; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t2 of r2.getAttributeNames()) if (t2.endsWith(Wt)) {
          const e3 = c4[o2++], n3 = r2.getAttribute(t2).split(Dt), s4 = /([.?@])?(.*)/.exec(e3);
          a3.push({ type: 1, index: i3, name: s4[2], strings: n3, ctor: "." === s4[1] ? we : "?" === s4[1] ? ve : "@" === s4[1] ? xe : ye }), r2.removeAttribute(t2);
        } else t2.startsWith(Dt) && (a3.push({ type: 6, index: i3 }), r2.removeAttribute(t2));
        if (oe.test(r2.tagName)) {
          const t2 = r2.textContent.split(Dt), e3 = t2.length - 1;
          if (e3 > 0) {
            r2.textContent = jt ? jt.emptyScript : "";
            for (let n3 = 0; n3 < e3; n3++) r2.append(t2[n3], Kt()), pe.nextNode(), a3.push({ type: 2, index: ++i3 });
            r2.append(t2[e3], Kt());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === It) a3.push({ type: 2, index: i3 });
      else {
        let t2 = -1;
        for (; -1 !== (t2 = r2.data.indexOf(Dt, t2 + 1)); ) a3.push({ type: 7, index: i3 }), t2 += Dt.length - 1;
      }
      i3++;
    }
  }
  static createElement(t, e2) {
    const n2 = Gt.createElement("template");
    return n2.innerHTML = t, n2;
  }
};
function me(t, e2, n2 = t, r2) {
  var _a3, _b;
  if (e2 === ce) return e2;
  let i3 = void 0 !== r2 ? (_a3 = n2._$Co) == null ? void 0 : _a3[r2] : n2._$Cl;
  const o2 = Jt(e2) ? void 0 : e2._$litDirective$;
  return (i3 == null ? void 0 : i3.constructor) !== o2 && ((_b = i3 == null ? void 0 : i3._$AO) == null ? void 0 : _b.call(i3, false), void 0 === o2 ? i3 = void 0 : (i3 = new o2(t), i3._$AT(t, n2, r2)), void 0 !== r2 ? (n2._$Co ?? (n2._$Co = []))[r2] = i3 : n2._$Cl = i3), void 0 !== i3 && (e2 = me(t, i3._$AS(t, e2.values), i3, r2)), e2;
}
var be = class {
  constructor(t, e2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e2 }, parts: n2 } = this._$AD, r2 = ((t == null ? void 0 : t.creationScope) ?? Gt).importNode(e2, true);
    pe.currentNode = r2;
    let i3 = pe.nextNode(), o2 = 0, s3 = 0, a3 = n2[0];
    for (; void 0 !== a3; ) {
      if (o2 === a3.index) {
        let e3;
        2 === a3.type ? e3 = new Ce(i3, i3.nextSibling, this, t) : 1 === a3.type ? e3 = new a3.ctor(i3, a3.name, a3.strings, this, t) : 6 === a3.type && (e3 = new $e(i3, this, t)), this._$AV.push(e3), a3 = n2[++s3];
      }
      o2 !== (a3 == null ? void 0 : a3.index) && (i3 = pe.nextNode(), o2++);
    }
    return pe.currentNode = Gt, r2;
  }
  p(t) {
    let e2 = 0;
    for (const n2 of this._$AV) void 0 !== n2 && (void 0 !== n2.strings ? (n2._$AI(t, n2, e2), e2 += n2.strings.length - 2) : n2._$AI(t[e2])), e2++;
  }
};
var Ce = class _Ce {
  get _$AU() {
    var _a3;
    return ((_a3 = this._$AM) == null ? void 0 : _a3._$AU) ?? this._$Cv;
  }
  constructor(t, e2, n2, r2) {
    this.type = 2, this._$AH = de, this._$AN = void 0, this._$AA = t, this._$AB = e2, this._$AM = n2, this.options = r2, this._$Cv = (r2 == null ? void 0 : r2.isConnected) ?? true;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e2 = this._$AM;
    return void 0 !== e2 && 11 === (t == null ? void 0 : t.nodeType) && (t = e2.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e2 = this) {
    t = me(this, t, e2), Jt(t) ? t === de || null == t || "" === t ? (this._$AH !== de && this._$AR(), this._$AH = de) : t !== this._$AH && t !== ce && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : ((t2) => Yt(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]))(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== de && Jt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Gt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var _a3;
    const { values: e2, _$litType$: n2 } = t, r2 = "number" == typeof n2 ? this._$AC(t) : (void 0 === n2.el && (n2.el = ge2.createElement(ue(n2.h, n2.h[0]), this.options)), n2);
    if (((_a3 = this._$AH) == null ? void 0 : _a3._$AD) === r2) this._$AH.p(e2);
    else {
      const t2 = new be(r2, this), n3 = t2.u(this.options);
      t2.p(e2), this.T(n3), this._$AH = t2;
    }
  }
  _$AC(t) {
    let e2 = he.get(t.strings);
    return void 0 === e2 && he.set(t.strings, e2 = new ge2(t)), e2;
  }
  k(t) {
    Yt(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let n2, r2 = 0;
    for (const i3 of t) r2 === e2.length ? e2.push(n2 = new _Ce(this.S(Kt()), this.S(Kt()), this, this.options)) : n2 = e2[r2], n2._$AI(i3), r2++;
    r2 < e2.length && (this._$AR(n2 && n2._$AB.nextSibling, r2), e2.length = r2);
  }
  _$AR(t = this._$AA.nextSibling, e2) {
    var _a3;
    for ((_a3 = this._$AP) == null ? void 0 : _a3.call(this, false, true, e2); t && t !== this._$AB; ) {
      const e3 = t.nextSibling;
      t.remove(), t = e3;
    }
  }
  setConnected(t) {
    var _a3;
    void 0 === this._$AM && (this._$Cv = t, (_a3 = this._$AP) == null ? void 0 : _a3.call(this, t));
  }
};
var ye = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e2, n2, r2, i3) {
    this.type = 1, this._$AH = de, this._$AN = void 0, this.element = t, this.name = e2, this._$AM = r2, this.options = i3, n2.length > 2 || "" !== n2[0] || "" !== n2[1] ? (this._$AH = Array(n2.length - 1).fill(new String()), this.strings = n2) : this._$AH = de;
  }
  _$AI(t, e2 = this, n2, r2) {
    const i3 = this.strings;
    let o2 = false;
    if (void 0 === i3) t = me(this, t, e2, 0), o2 = !Jt(t) || t !== this._$AH && t !== ce, o2 && (this._$AH = t);
    else {
      const r3 = t;
      let s3, a3;
      for (t = i3[0], s3 = 0; s3 < i3.length - 1; s3++) a3 = me(this, r3[n2 + s3], e2, s3), a3 === ce && (a3 = this._$AH[s3]), o2 || (o2 = !Jt(a3) || a3 !== this._$AH[s3]), a3 === de ? t = de : t !== de && (t += (a3 ?? "") + i3[s3 + 1]), this._$AH[s3] = a3;
    }
    o2 && !r2 && this.j(t);
  }
  j(t) {
    t === de ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
var we = class extends ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === de ? void 0 : t;
  }
};
var ve = class extends ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== de);
  }
};
var xe = class extends ye {
  constructor(t, e2, n2, r2, i3) {
    super(t, e2, n2, r2, i3), this.type = 5;
  }
  _$AI(t, e2 = this) {
    if ((t = me(this, t, e2, 0) ?? de) === ce) return;
    const n2 = this._$AH, r2 = t === de && n2 !== de || t.capture !== n2.capture || t.once !== n2.once || t.passive !== n2.passive, i3 = t !== de && (n2 === de || r2);
    r2 && this.element.removeEventListener(this.name, this, n2), i3 && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var _a3;
    "function" == typeof this._$AH ? this._$AH.call(((_a3 = this.options) == null ? void 0 : _a3.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
};
var $e = class {
  constructor(t, e2, n2) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = n2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    me(this, t);
  }
};
var _e = Ft.litHtmlPolyfillSupport;
_e == null ? void 0 : _e(ge2, Ce), (Ft.litHtmlVersions ?? (Ft.litHtmlVersions = [])).push("3.1.3");
var ke = class extends zt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a3;
    const t = super.createRenderRoot();
    return (_a3 = this.renderOptions).renderBefore ?? (_a3.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ((t2, e3, n2) => {
      const r2 = (n2 == null ? void 0 : n2.renderBefore) ?? e3;
      let i3 = r2._$litPart$;
      if (void 0 === i3) {
        const t3 = (n2 == null ? void 0 : n2.renderBefore) ?? null;
        r2._$litPart$ = i3 = new Ce(e3.insertBefore(Kt(), t3), t3, void 0, n2 ?? {});
      }
      return i3._$AI(t2), i3;
    })(e2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a3;
    super.connectedCallback(), (_a3 = this._$Do) == null ? void 0 : _a3.setConnected(true);
  }
  disconnectedCallback() {
    var _a3;
    super.disconnectedCallback(), (_a3 = this._$Do) == null ? void 0 : _a3.setConnected(false);
  }
  render() {
    return ce;
  }
};
var _a;
ke._$litElement$ = true, ke.finalized = true, (_a = globalThis.litElementHydrateSupport) == null ? void 0 : _a.call(globalThis, { LitElement: ke });
var Se = globalThis.litElementPolyfillSupport;
Se == null ? void 0 : Se({ LitElement: ke }), (globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.5");
var Le = (t) => (e2, n2) => {
  void 0 !== n2 ? n2.addInitializer(() => {
    customElements.define(t, e2);
  }) : customElements.define(t, e2);
};
var Ae = { attribute: true, type: String, converter: T2, reflect: false, hasChanged: O2 };
var Me = (t = Ae, e2, n2) => {
  const { kind: r2, metadata: i3 } = n2;
  let o2 = globalThis.litPropertyMetadata.get(i3);
  if (void 0 === o2 && globalThis.litPropertyMetadata.set(i3, o2 = /* @__PURE__ */ new Map()), o2.set(n2.name, t), "accessor" === r2) {
    const { name: r3 } = n2;
    return { set(n3) {
      const i4 = e2.get.call(this);
      e2.set.call(this, n3), this.requestUpdate(r3, i4, t);
    }, init(e3) {
      return void 0 !== e3 && this.P(r3, void 0, t), e3;
    } };
  }
  if ("setter" === r2) {
    const { name: r3 } = n2;
    return function(n3) {
      const i4 = this[r3];
      e2.call(this, n3), this.requestUpdate(r3, i4, t);
    };
  }
  throw Error("Unsupported decorator location: " + r2);
};
function Ee(t) {
  return (e2, n2) => "object" == typeof n2 ? Me(t, e2, n2) : ((t2, e3, n3) => {
    const r2 = e3.hasOwnProperty(n3);
    return e3.constructor.createProperty(n3, r2 ? { ...t2, wrapped: true } : t2), r2 ? Object.getOwnPropertyDescriptor(e3, n3) : void 0;
  })(t, e2, n2);
}
function He(t) {
  return Ee({ ...t, state: true, attribute: false });
}
var Ue;
var Pe;
var Ne = class extends ke {
  updated(t) {
    var e2;
    if (super.updated(t), globalThis.document && globalThis.document.documentElement.classList.contains("dark") && null != (e2 = this.shadowRoot) && null != (e2 = e2.children) && e2.length) for (const t2 of this.shadowRoot.children) t2.classList.contains("dark") || t2.classList.add("dark");
  }
  _getBrandColorLuminance() {
    if (!globalThis.window) return 0;
    const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    let e2 = window.getComputedStyle(this).getPropertyValue(t ? "--bc-color-brand-dark" : "--bc-color-brand") || window.getComputedStyle(this).getPropertyValue("--bc-color-brand") || "#196CE7";
    if (!e2.match(/^#[0-9A-F]{6}$/i)) {
      const t2 = document.createElement("div");
      t2.style.color = e2, t2.style.display = "none", document.body.appendChild(t2), e2 = window.getComputedStyle(t2).color, t2.remove();
    }
    return function(t2) {
      if (t2.startsWith("#")) return t2 = t2.slice(1), (0.299 * parseInt(t2.slice(0, 2), 16) + 0.587 * parseInt(t2.slice(2, 4), 16) + 0.114 * parseInt(t2.slice(4, 6), 16)) / 255;
      if (t2.startsWith("rgb") || t2.startsWith("rgba")) {
        const e3 = t2.match(/\d+(\.\d+)?/g);
        return (0.299 * parseFloat(e3[0]) + 0.587 * parseFloat(e3[1]) + 0.114 * parseFloat(e3[2])) / 255;
      }
      throw new Error("Unsupported luminance: " + t2);
    }(e2);
  }
};
Ne.styles = [_t(Ue || (Ue = ((t) => t)`
      :host {
        // global css reset in shadow DOM
        all: initial;
        font-variant-numeric: slashed-zero;
      }
      // TODO: move to individual components - only needed by a couple of icons
      .hover-animation:hover .hover-right-up {
        transform: translateX(2px) translateY(-2px);
        transition: all 0.3s;
      }
      .hover-animation:hover .hover-right {
        transform: translateX(3px);
        transition: all 0.3s;
      }
    `))];
var Te = class extends Ne {
  constructor() {
    super(), this._modalOpen = false, this._connected = false, this._connecting = false, this._connectorName = void 0, this._appName = void 0, this._filters = void 0, this._error = void 0, this._connected = m3.getState().connected, this._connecting = m3.getState().connecting, this._connectorName = m3.getState().connectorName, this._appName = m3.getState().bitcoinConnectConfig.appName, this._filters = m3.getState().bitcoinConnectConfig.filters, this._error = m3.getState().error, this._route = m3.getState().route, this._modalOpen = m3.getState().modalOpen, m3.subscribe((t) => {
      this._connected = t.connected, this._connecting = t.connecting, this._connectorName = t.connectorName, this._appName = t.bitcoinConnectConfig.appName, this._filters = t.bitcoinConnectConfig.filters, this._error = t.error, this._route = t.route, this._modalOpen = t.modalOpen;
    });
  }
};
b3([He()], Te.prototype, "_modalOpen", void 0), b3([He()], Te.prototype, "_connected", void 0), b3([He()], Te.prototype, "_connecting", void 0), b3([He()], Te.prototype, "_connectorName", void 0), b3([He()], Te.prototype, "_appName", void 0), b3([He()], Te.prototype, "_filters", void 0), b3([He()], Te.prototype, "_error", void 0), b3([He()], Te.prototype, "_route", void 0);
var Oe = le(Pe || (Pe = ((t) => t)`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.4635 6.0794C17.4325 6.83684 18.8238 7.94315 18.5058 9.88813C18.3285 10.984 17.8283 11.6586 17.1374 12.0334C16.8767 12.1748 16.8191 12.6131 17.0507 12.7984C18.0431 13.592 18.4393 14.7164 17.8152 16.4238C16.9057 18.9138 14.8635 19.177 12.1521 18.6697C11.9858 18.6385 11.8223 18.7396 11.7792 18.9032L11.4563 20.1009C11.3343 20.5633 10.8605 20.8392 10.3981 20.7173C9.93541 20.5953 9.65932 20.1212 9.78149 19.6586L10.0909 18.5121C10.1354 18.3439 10.0349 18.1715 9.86676 18.1266C9.62998 18.0632 9.39019 17.9976 9.14679 17.9294C8.97646 17.8817 8.79964 17.9822 8.75452 18.1532L8.44373 19.3067C8.32182 19.7688 7.8483 20.0446 7.38616 19.9226C6.92422 19.8007 6.64851 19.3274 6.77026 18.8655L7.08988 17.677C7.13458 17.5073 7.03399 17.3333 6.86481 17.2869C6.81003 17.2718 6.75512 17.2567 6.70008 17.2415L6.69828 17.241C6.4604 17.1755 6.22001 17.1094 5.97667 17.0449L5.42127 16.8919C4.80739 16.7299 4.48576 16.0556 4.74625 15.4767C4.95488 15.013 5.47104 14.7734 5.96239 14.9043C5.97132 14.9067 5.98016 14.909 5.98891 14.9113C6.1066 14.9426 6.10094 14.9199 6.21958 14.8924C6.46112 14.8366 6.58893 14.6373 6.65055 14.4901L7.80952 10.0986L7.81254 10.0867L8.63176 6.98069C8.63683 6.96147 8.64021 6.94184 8.64116 6.92198C8.65547 6.62155 8.78957 6.31876 8.35166 6.11178C8.25682 6.06695 8.16354 6.02432 8.06217 5.99736C8.04539 5.9929 8.02808 5.98833 8.01032 5.98367C7.51444 5.85341 7.21198 5.34932 7.34263 4.85356C7.47162 4.36411 7.9731 4.07202 8.46248 4.2013L9.43668 4.47448C9.68634 4.54012 9.94146 4.60362 10.2006 4.66691C10.3681 4.70784 10.5375 4.60681 10.5815 4.44006L10.8668 3.39102C10.9889 2.9288 11.4625 2.65299 11.9247 2.77495C12.3871 2.89693 12.663 3.37062 12.541 3.83294L12.2715 4.82295C12.2273 4.99041 12.3292 5.16145 12.4975 5.20248C12.7444 5.26269 12.9911 5.32354 13.2353 5.38588C13.4 5.42795 13.5684 5.32988 13.6118 5.16547L13.8783 4.18608C14.0003 3.72357 14.4741 3.44751 14.9366 3.56948C15.3992 3.69145 15.6753 4.16533 15.5533 4.62789L15.2637 5.69461C15.2215 5.85461 15.3091 6.01999 15.4635 6.0794ZM11.2479 8.6805L11.4769 7.81121C11.5836 7.40644 11.9982 7.16477 12.403 7.27142C12.8077 7.37807 13.0494 7.79266 12.9428 8.19743L12.7137 9.06672L13.5829 9.29575C13.9877 9.4024 14.2294 9.81699 14.1227 10.2218C14.0161 10.6265 13.6015 10.8682 13.1967 10.7615L12.3275 10.5325L12.0984 11.4018C11.9918 11.8066 11.5772 12.0483 11.1724 11.9416C10.7676 11.835 10.5259 11.4204 10.6326 11.0156L10.8617 10.1463L9.99225 9.91722C9.58747 9.81056 9.34579 9.39598 9.45245 8.99121C9.5591 8.58644 9.9737 8.34477 10.3785 8.45142L11.2479 8.6805ZM13.2927 12.7001L13.0636 13.5693L12.1942 13.3403C11.7895 13.2336 11.3749 13.4753 11.2682 13.8801C11.1615 14.2848 11.4032 14.6994 11.808 14.8061L12.6774 15.0351L12.4484 15.9045C12.3417 16.3092 12.5834 16.7238 12.9882 16.8305C13.3929 16.9371 13.8075 16.6954 13.9142 16.2907L14.1432 15.4214L15.0125 15.6504C15.4172 15.757 15.8318 15.5154 15.9385 15.1106C16.0451 14.7058 15.8035 14.2912 15.3987 14.1846L14.5295 13.9556L14.7585 13.0863C14.8652 12.6815 14.6235 12.2669 14.2187 12.1603C13.8139 12.0536 13.3994 12.2953 13.2927 12.7001Z" fill="currentColor"/>
</svg>`));
function Ve(t) {
  return [...t.v, (t.i ? "!" : "") + t.n].join(":");
}
function Re(t, e2 = ",") {
  return t.map(Ve).join(e2);
}
var Ze = "undefined" != typeof CSS && CSS.escape || ((t) => t.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
function ze(t) {
  for (var e2 = 9, n2 = t.length; n2--; ) e2 = Math.imul(e2 ^ t.charCodeAt(n2), 1597334677);
  return "#" + ((e2 ^ e2 >>> 9) >>> 0).toString(36);
}
function Fe(t, e2 = "@media ") {
  return e2 + je(t).map((t2) => ("string" == typeof t2 && (t2 = { min: t2 }), t2.raw || Object.keys(t2).map((e3) => `(${e3}-width:${t2[e3]})`).join(" and "))).join(",");
}
function je(t = []) {
  return Array.isArray(t) ? t : null == t ? [] : [t];
}
function Be(t) {
  return t;
}
function We() {
}
var De = { d: 0, b: 134217728, c: 268435456, a: 671088640, u: 805306368, o: 939524096 };
function Ie(t) {
  var _a3;
  return ((_a3 = t.match(/[-=:;]/g)) == null ? void 0 : _a3.length) || 0;
}
function qe(t) {
  return Math.min(/(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(t) ? Math.max(0, 29.63 * (+RegExp.$1 / (RegExp.$2 ? 15 : 1)) ** 0.137 - 43) : 0, 15) << 22 | Math.min(Ie(t), 15) << 18;
}
var Ge = ["rst-c", "st-ch", "h-chi", "y-lin", "nk", "sited", "ecked", "pty", "ad-on", "cus-w", "ver", "cus", "cus-v", "tive", "sable", "tiona", "quire"];
function Ke({ n: t, i: e2, v: n2 = [] }, r2, i3, o2) {
  t && (t = Ve({ n: t, i: e2, v: n2 })), o2 = [...je(o2)];
  for (let t2 of n2) {
    let e3 = r2.theme("screens", t2);
    for (let n3 of je(e3 && Fe(e3) || r2.v(t2))) o2.push(n3), i3 |= e3 ? 67108864 | qe(n3) : "dark" == t2 ? 1073741824 : "@" == n3[0] ? qe(n3) : 1 << ~(/:([a-z-]+)/.test(n3) && ~Ge.indexOf(RegExp.$1.slice(2, 7)) || -18);
  }
  return { n: t, p: i3, r: o2, i: e2 };
}
var Je = /* @__PURE__ */ new Map();
function Ye(t) {
  if (t.d) {
    let e2 = [], n2 = Qe(t.r.reduce((t2, n3) => "@" == n3[0] ? (e2.push(n3), t2) : n3 ? Qe(t2, (t3) => Qe(n3, (e3) => {
      let n4 = /(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(e3);
      if (n4) {
        let r2 = t3.indexOf(n4[1]);
        return ~r2 ? t3.slice(0, r2) + n4[0] + t3.slice(r2 + n4[1].length) : Xe(t3, e3);
      }
      return Xe(e3, t3);
    })) : t2, "&"), (e3) => Xe(e3, t.n ? "." + Ze(t.n) : ""));
    return n2 && e2.push(n2.replace(/:merge\((.+?)\)/g, "$1")), e2.reduceRight((t2, e3) => e3 + "{" + t2 + "}", t.d);
  }
}
function Qe(t, e2) {
  return t.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (t2, n2, r2) => e2(n2) + r2);
}
function Xe(t, e2) {
  return t.replace(/&/g, e2);
}
var tn = new Intl.Collator("en", { numeric: true });
function en(t, e2) {
  for (var n2 = 0, r2 = t.length; n2 < r2; ) {
    let i3 = r2 + n2 >> 1;
    0 >= nn(t[i3], e2) ? n2 = i3 + 1 : r2 = i3;
  }
  return r2;
}
function nn(t, e2) {
  let n2 = t.p & De.o;
  return n2 != (e2.p & De.o) || n2 != De.b && n2 != De.o ? t.p - e2.p || t.o - e2.o || tn.compare(rn(t.n), rn(e2.n)) || tn.compare(on(t.n), on(e2.n)) : 0;
}
function rn(t) {
  return (t || "").split(/:/).pop().split("/").pop() || "\0";
}
function on(t) {
  return (t || "").replace(/\W/g, (t2) => String.fromCharCode(127 + t2.charCodeAt(0))) + "\0";
}
function sn(t, e2) {
  return Math.round(parseInt(t, 16) * e2);
}
function an(t, e2 = {}) {
  if ("function" == typeof t) return t(e2);
  let { opacityValue: n2 = "1", opacityVariable: r2 } = e2, i3 = r2 ? `var(${r2})` : n2;
  if (t.includes("<alpha-value>")) return t.replace("<alpha-value>", i3);
  if ("#" == t[0] && (4 == t.length || 7 == t.length)) {
    let e3 = (t.length - 1) / 3, n3 = [17, 1, 0.062272][e3 - 1];
    return `rgba(${[sn(t.substr(1, e3), n3), sn(t.substr(1 + e3, e3), n3), sn(t.substr(1 + 2 * e3, e3), n3), i3]})`;
  }
  return "1" == i3 ? t : "0" == i3 ? "#0000" : t.replace(/^(rgb|hsl)(\([^)]+)\)$/, `$1a$2,${i3})`);
}
function ln(t, e2, n2, r2, i3 = []) {
  return function t2(e3, { n: n3, p: r3, r: i4 = [], i: o2 }, s3) {
    let a3 = [], l4 = "", c4 = 0, d5 = 0;
    for (let u4 in e3 || {}) {
      var h2, p5;
      let f5 = e3[u4];
      if ("@" == u4[0]) {
        if (!f5) continue;
        if ("a" == u4[1]) {
          a3.push(...pn(n3, r3, bn("" + f5), s3, r3, i4, o2, true));
          continue;
        }
        if ("l" == u4[1]) {
          for (let e4 of je(f5)) a3.push(...t2(e4, { n: n3, p: (h2 = De[u4[7]], r3 & ~De.o | h2), r: "d" == u4[7] ? [] : i4, i: o2 }, s3));
          continue;
        }
        if ("i" == u4[1]) {
          a3.push(...je(f5).map((t3) => ({ p: -1, o: 0, r: [], d: u4 + " " + t3 })));
          continue;
        }
        if ("k" == u4[1]) {
          a3.push({ p: De.d, o: 0, r: [u4], d: t2(f5, { p: De.d }, s3).map(Ye).join("") });
          continue;
        }
        if ("f" == u4[1]) {
          a3.push(...je(f5).map((e4) => ({ p: De.d, o: 0, r: [u4], d: t2(e4, { p: De.d }, s3).map(Ye).join("") })));
          continue;
        }
      }
      if ("object" != typeof f5 || Array.isArray(f5)) "label" == u4 && f5 ? n3 = f5 + ze(JSON.stringify([r3, o2, e3])) : (f5 || 0 === f5) && (u4 = u4.replace(/[A-Z]/g, (t3) => "-" + t3.toLowerCase()), d5 += 1, c4 = Math.max(c4, "-" == (p5 = u4)[0] ? 0 : Ie(p5) + (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7,8}$)|([fl].{5}l|g.{8}$|pl))/.test(p5) ? +!!RegExp.$1 || -!!RegExp.$2 : 0) + 1), l4 += (l4 ? ";" : "") + je(f5).map((t3) => s3.s(u4, cn("" + t3, s3.theme) + (o2 ? " !important" : ""))).join(";"));
      else if ("@" == u4[0] || u4.includes("&")) {
        let e4 = r3;
        "@" == u4[0] && (u4 = u4.replace(/\bscreen\(([^)]+)\)/g, (t3, n4) => {
          let r4 = s3.theme("screens", n4);
          return r4 ? (e4 |= 67108864, Fe(r4, "")) : t3;
        }), e4 |= qe(u4)), a3.push(...t2(f5, { n: n3, p: e4, r: [...i4, u4], i: o2 }, s3));
      } else a3.push(...t2(f5, { p: r3, r: [...i4, u4] }, s3));
    }
    return a3.unshift({ n: n3, p: r3, o: Math.max(0, 15 - d5) + 1.5 * Math.min(c4 || 15, 15), r: i4, d: l4 }), a3.sort(nn);
  }(t, Ke(e2, n2, r2, i3), n2);
}
function cn(t, e2) {
  return t.replace(/theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g, (t2, n2, r2, i3, o2 = "") => {
    let s3 = e2(r2, o2);
    return "function" == typeof s3 && /color|fill|stroke/i.test(r2) ? an(s3) : "" + je(s3).filter((t3) => Object(t3) !== t3);
  });
}
function dn(t, e2) {
  let n2, r2 = [];
  for (let i3 of t) i3.d && i3.n ? (n2 == null ? void 0 : n2.p) == i3.p && "" + n2.r == "" + i3.r ? (n2.c = [n2.c, i3.c].filter(Boolean).join(" "), n2.d = n2.d + ";" + i3.d) : r2.push(n2 = { ...i3, n: i3.n && e2 }) : r2.push({ ...i3, n: i3.n && e2 });
  return r2;
}
function hn(t, e2, n2 = De.u, r2, i3) {
  let o2 = [];
  for (let s3 of t) for (let t2 of function(t3, e3, n3, r3, i4) {
    let o3 = function(t4, e4) {
      let n4 = Je.get(t4.n);
      return n4 ? n4(t4, e4) : e4.r(t4.n, "dark" == t4.v[0]);
    }(t3 = { ...t3, i: t3.i || i4 }, e3);
    return o3 ? "string" == typeof o3 ? ({ r: r3, p: n3 } = Ke(t3, e3, n3, r3), dn(hn(bn(o3), e3, n3, r3, t3.i), t3.n)) : Array.isArray(o3) ? o3.map((t4) => {
      var e4, i5;
      return { o: 0, ...t4, r: [...je(r3), ...je(t4.r)], p: (e4 = n3, i5 = t4.p ?? n3, e4 & ~De.o | i5) };
    }) : ln(o3, t3, e3, n3, r3) : [{ c: Ve(t3), p: 0, o: 0, r: [] }];
  }(s3, e2, n2, r2, i3)) o2.splice(en(o2, t2), 0, t2);
  return o2;
}
function pn(t, e2, n2, r2, i3, o2, s3, a3) {
  return dn((a3 ? n2.flatMap((t2) => hn([t2], r2, i3, o2, s3)) : hn(n2, r2, i3, o2, s3)).map((t2) => t2.p & De.o && (t2.n || e2 == De.b) ? { ...t2, p: t2.p & ~De.o | e2, o: 0 } : t2), t);
}
function un(t, e2, n2, r2) {
  return Je.set(t, (t2, i3) => {
    let { n: o2, p: s3, r: a3, i: l4 } = Ke(t2, i3, e2);
    return n2 && pn(o2, e2, n2, i3, s3, a3, l4, r2);
  }), t;
}
function fn(t, e2, n2) {
  if ("(" != t[t.length - 1]) {
    let n3 = [], r2 = false, i3 = false, o2 = "";
    for (let e3 of t) if ("(" != e3 && !/[~@]$/.test(e3)) {
      if ("!" == e3[0] && (e3 = e3.slice(1), r2 = !r2), e3.endsWith(":")) {
        n3["dark:" == e3 ? "unshift" : "push"](e3.slice(0, -1));
        continue;
      }
      "-" == e3[0] && (e3 = e3.slice(1), i3 = !i3), e3.endsWith("-") && (e3 = e3.slice(0, -1)), e3 && "&" != e3 && (o2 += (o2 && "-") + e3);
    }
    o2 && (i3 && (o2 = "-" + o2), e2[0].push({ n: o2, v: n3.filter(gn), i: r2 }));
  }
}
function gn(t, e2, n2) {
  return n2.indexOf(t) == e2;
}
var mn = /* @__PURE__ */ new Map();
function bn(t) {
  let e2 = mn.get(t);
  if (!e2) {
    let n2 = [], r2 = [[]], i3 = 0, o2 = 0, s3 = null, a3 = 0, l4 = (e3, o3 = 0) => {
      i3 != a3 && (n2.push(t.slice(i3, a3 + o3)), e3 && fn(n2, r2)), i3 = a3 + 1;
    };
    for (; a3 < t.length; a3++) {
      let e3 = t[a3];
      if (o2) "\\" != t[a3 - 1] && (o2 += +("[" == e3) || -("]" == e3));
      else if ("[" == e3) o2 += 1;
      else if (s3) "\\" != t[a3 - 1] && s3.test(t.slice(a3)) && (s3 = null, i3 = a3 + RegExp.lastMatch.length);
      else if ("/" != e3 || "\\" == t[a3 - 1] || "*" != t[a3 + 1] && "/" != t[a3 + 1]) if ("(" == e3) l4(), n2.push(e3);
      else if (":" == e3) ":" != t[a3 + 1] && l4(false, 1);
      else if (/[\s,)]/.test(e3)) {
        l4(true);
        let t2 = n2.lastIndexOf("(");
        if (")" == e3) {
          let e4 = n2[t2 - 1];
          if (/[~@]$/.test(e4)) {
            let i4 = r2.shift();
            n2.length = t2, fn([...n2, "#"], r2);
            let { v: o3 } = r2[0].pop();
            for (let t3 of i4) t3.v.splice(+("dark" == t3.v[0]) - +("dark" == o3[0]), o3.length);
            fn([...n2, un(e4.length > 1 ? e4.slice(0, -1) + ze(JSON.stringify([e4, i4])) : e4 + "(" + Re(i4) + ")", De.a, i4, /@$/.test(e4))], r2);
          }
          t2 = n2.lastIndexOf("(", t2 - 1);
        }
        n2.length = t2 + 1;
      } else /[~@]/.test(e3) && "(" == t[a3 + 1] && r2.unshift([]);
      else s3 = "*" == t[a3 + 1] ? /^\*\// : /^[\r\n]/;
    }
    l4(true), mn.set(t, e2 = r2[0]);
  }
  return e2;
}
function Cn(t, e2, n2) {
  return [t, yn(e2, n2)];
}
function yn(t, e2) {
  return "function" == typeof t ? t : "string" == typeof t && /^[\w-]+$/.test(t) ? (n2, r2) => ({ [t]: e2 ? e2(n2, r2) : wn(n2, 1) }) : (e3) => t || { [e3[1]]: wn(e3, 2) };
}
function wn(t, e2, n2 = t.slice(e2).find(Boolean) || t.$$ || t.input) {
  return "-" == t.input[0] ? `calc(${n2} * -1)` : n2;
}
function vn(t, e2, n2, r2) {
  return [t, xn(e2, n2, r2)];
}
function xn(t, e2, n2) {
  let r2 = "string" == typeof e2 ? (t2, r3) => ({ [e2]: n2 ? n2(t2, r3) : t2._ }) : e2 || (({ 1: t2, _: e3 }, n3, r3) => ({ [t2 || r3]: e3 }));
  return (e3, n3) => {
    let i3 = Ln(t || e3[1]), o2 = n3.theme(i3, e3.$$) ?? Sn(e3.$$, i3, n3);
    if (null != o2) return e3._ = wn(e3, 0, o2), r2(e3, n3, i3);
  };
}
function $n(t, e2 = {}, n2) {
  return [t, _n(e2, n2)];
}
function _n(t = {}, e2) {
  return (n2, r2) => {
    let { section: i3 = Ln(n2[0]).replace("-", "") + "Color" } = t, [o2, s3] = (n2.$$.match(/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/) || []).slice(1);
    if (!o2) return;
    let a3 = r2.theme(i3, o2) || Sn(o2, i3, r2);
    if (!a3 || "object" == typeof a3) return;
    let { opacityVariable: l4 = `--tw-${n2[0].replace(/-$/, "")}-opacity`, opacitySection: c4 = i3.replace("Color", "Opacity"), property: d5 = i3, selector: h2 } = t, p5 = r2.theme(c4, s3 || "DEFAULT") || s3 && Sn(s3, c4, r2), u4 = e2 || (({ _: t2 }) => {
      let e3 = kn(d5, t2);
      return h2 ? { [h2]: e3 } : e3;
    });
    n2._ = { value: an(a3, { opacityVariable: l4 || void 0, opacityValue: p5 || void 0 }), color: (t2) => an(a3, t2), opacityVariable: l4 || void 0, opacityValue: p5 || void 0 };
    let f5 = u4(n2, r2);
    if (!n2.dark) {
      let t2 = r2.d(i3, o2, a3);
      t2 && t2 !== a3 && (n2._ = { value: an(t2, { opacityVariable: l4 || void 0, opacityValue: p5 || "1" }), color: (e3) => an(t2, e3), opacityVariable: l4 || void 0, opacityValue: p5 || void 0 }, f5 = { "&": f5, [r2.v("dark")]: u4(n2, r2) });
    }
    return f5;
  };
}
function kn(t, e2) {
  let n2 = {};
  return "string" == typeof e2 ? n2[t] = e2 : (e2.opacityVariable && e2.value.includes(e2.opacityVariable) && (n2[e2.opacityVariable] = e2.opacityValue || "1"), n2[t] = e2.value), n2;
}
function Sn(t, e2, n2) {
  if ("[" == t[0] && "]" == t.slice(-1)) {
    if (t = An(cn(t.slice(1, -1), n2.theme)), !e2) return t;
    if (!(/color|fill|stroke/i.test(e2) && !/^color:/.test(t) && !/^(#|((hsl|rgb)a?|hwb|lab|lch|color)\(|[a-z]+$)/.test(t) || /image/i.test(e2) && !/^image:/.test(t) && !/^[a-z-]+\(/.test(t) || /weight/i.test(e2) && !/^(number|any):/.test(t) && !/^\d+$/.test(t) || /position/i.test(e2) && /^(length|size):/.test(t))) return t.replace(/^[a-z-]+:/, "");
  }
}
function Ln(t) {
  return t.replace(/-./g, (t2) => t2[1].toUpperCase());
}
function An(t) {
  return t.includes("url(") ? t.replace(/(.*?)(url\(.*?\))(.*?)/g, (t2, e2 = "", n2, r2 = "") => An(e2) + n2 + An(r2)) : t.replace(/(^|[^\\])_+/g, (t2, e2) => e2 + " ".repeat(t2.length - e2.length)).replace(/\\_/g, "_").replace(/(calc|min|max|clamp)\(.+\)/g, (t2) => t2.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 "));
}
function Mn({ presets: t = [], ...e2 }) {
  let n2 = { darkMode: void 0, darkColor: void 0, preflight: false !== e2.preflight && [], theme: {}, variants: je(e2.variants), rules: je(e2.rules), ignorelist: je(e2.ignorelist), hash: void 0, stringify: (t2, e3) => t2 + ":" + e3, finalize: [] };
  for (let r2 of je([...t, { darkMode: e2.darkMode, darkColor: e2.darkColor, preflight: false !== e2.preflight && je(e2.preflight), theme: e2.theme, hash: e2.hash, stringify: e2.stringify, finalize: e2.finalize }])) {
    let { preflight: t2, darkMode: e3 = n2.darkMode, darkColor: i3 = n2.darkColor, theme: o2, variants: s3, rules: a3, ignorelist: l4, hash: c4 = n2.hash, stringify: d5 = n2.stringify, finalize: h2 } = "function" == typeof r2 ? r2(n2) : r2;
    n2 = { preflight: false !== n2.preflight && false !== t2 && [...n2.preflight, ...je(t2)], darkMode: e3, darkColor: i3, theme: { ...n2.theme, ...o2, extend: { ...n2.theme.extend, ...o2 == null ? void 0 : o2.extend } }, variants: [...n2.variants, ...je(s3)], rules: [...n2.rules, ...je(a3)], ignorelist: [...n2.ignorelist, ...je(l4)], hash: c4, stringify: d5, finalize: [...n2.finalize, ...je(h2)] };
  }
  return n2;
}
function En(t, e2, n2, r2, i3, o2) {
  for (let s3 of e2) {
    let e3 = n2.get(s3);
    e3 || n2.set(s3, e3 = r2(s3));
    let a3 = e3(t, i3, o2);
    if (a3) return a3;
  }
}
function Hn(t) {
  var e2;
  return Pn(t[0], "function" == typeof (e2 = t[1]) ? e2 : () => e2);
}
function Un(t) {
  return Array.isArray(t) ? Pn(t[0], yn(t[1], t[2])) : Pn(t, yn(void 0, void 0));
}
function Pn(t, e2) {
  return Nn(t, (t2, n2, r2, i3) => {
    let o2 = n2.exec(t2);
    if (o2) return o2.$$ = t2.slice(o2[0].length), o2.dark = i3, e2(o2, r2);
  });
}
function Nn(t, e2) {
  let n2 = je(t).map(Tn);
  return (t2, r2, i3) => {
    for (let o2 of n2) {
      let n3 = e2(t2, o2, r2, i3);
      if (n3) return n3;
    }
  };
}
function Tn(t) {
  return "string" == typeof t ? RegExp("^" + t + (t.includes("$") || "-" == t.slice(-1) ? "" : "$")) : t;
}
function On(t) {
  let e2 = (t == null ? void 0 : t.cssRules) ? t : (t && "string" != typeof t ? t : function(t2) {
    let e3 = document.querySelector(t2 || 'style[data-twind=""]');
    return e3 && "STYLE" == e3.tagName || (e3 = document.createElement("style"), document.head.prepend(e3)), e3.dataset.twind = "claimed", e3;
  }(t)).sheet;
  return { target: e2, snapshot() {
    let t2 = Array.from(e2.cssRules, (t3) => t3.cssText);
    return () => {
      this.clear(), t2.forEach(this.insert);
    };
  }, clear() {
    for (let t2 = e2.cssRules.length; t2--; ) e2.deleteRule(t2);
  }, destroy() {
    var _a3;
    (_a3 = e2.ownerNode) == null ? void 0 : _a3.remove();
  }, insert(t2, n2) {
    try {
      e2.insertRule(t2, n2);
    } catch (t3) {
      e2.insertRule(":root{}", n2);
    }
  }, resume: We };
}
var Vn = { screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" }, columns: { auto: "auto", "3xs": "16rem", "2xs": "18rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem" }, spacing: { px: "1px", 0: "0px", ...zn(4, "rem", 4, 0.5, 0.5), ...zn(12, "rem", 4, 5), 14: "3.5rem", ...zn(64, "rem", 4, 16, 4), 72: "18rem", 80: "20rem", 96: "24rem" }, durations: { 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms" }, animation: { none: "none", spin: "spin 1s linear infinite", ping: "ping 1s cubic-bezier(0,0,0.2,1) infinite", pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite", bounce: "bounce 1s infinite" }, aspectRatio: { auto: "auto", square: "1/1", video: "16/9" }, backdropBlur: Fn("blur"), backdropBrightness: Fn("brightness"), backdropContrast: Fn("contrast"), backdropGrayscale: Fn("grayscale"), backdropHueRotate: Fn("hueRotate"), backdropInvert: Fn("invert"), backdropOpacity: Fn("opacity"), backdropSaturate: Fn("saturate"), backdropSepia: Fn("sepia"), backgroundColor: Fn("colors"), backgroundImage: { none: "none" }, backgroundOpacity: Fn("opacity"), backgroundSize: { auto: "auto", cover: "cover", contain: "contain" }, blur: { none: "none", 0: "0", sm: "4px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "40px", "3xl": "64px" }, brightness: { ...zn(200, "", 100, 0, 50), ...zn(110, "", 100, 90, 5), 75: "0.75", 125: "1.25" }, borderColor: ({ theme: t }) => ({ DEFAULT: t("colors.gray.200", "currentColor"), ...t("colors") }), borderOpacity: Fn("opacity"), borderRadius: { none: "0px", sm: "0.125rem", DEFAULT: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", "1/2": "50%", full: "9999px" }, borderSpacing: Fn("spacing"), borderWidth: { DEFAULT: "1px", ...Zn(8, "px") }, boxShadow: { sm: "0 1px 2px 0 rgba(0,0,0,0.05)", DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)", md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)", lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)", xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)", "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)", inner: "inset 0 2px 4px 0 rgba(0,0,0,0.05)", none: "0 0 #0000" }, boxShadowColor: Fn("colors"), caretColor: Fn("colors"), accentColor: ({ theme: t }) => ({ auto: "auto", ...t("colors") }), contrast: { ...zn(200, "", 100, 0, 50), 75: "0.75", 125: "1.25" }, content: { none: "none" }, divideColor: Fn("borderColor"), divideOpacity: Fn("borderOpacity"), divideWidth: Fn("borderWidth"), dropShadow: { sm: "0 1px 1px rgba(0,0,0,0.05)", DEFAULT: ["0 1px 2px rgba(0,0,0,0.1)", "0 1px 1px rgba(0,0,0,0.06)"], md: ["0 4px 3px rgba(0,0,0,0.07)", "0 2px 2px rgba(0,0,0,0.06)"], lg: ["0 10px 8px rgba(0,0,0,0.04)", "0 4px 3px rgba(0,0,0,0.1)"], xl: ["0 20px 13px rgba(0,0,0,0.03)", "0 8px 5px rgba(0,0,0,0.08)"], "2xl": "0 25px 25px rgba(0,0,0,0.15)", none: "0 0 #0000" }, fill: ({ theme: t }) => ({ ...t("colors"), none: "none" }), grayscale: { DEFAULT: "100%", 0: "0" }, hueRotate: { 0: "0deg", 15: "15deg", 30: "30deg", 60: "60deg", 90: "90deg", 180: "180deg" }, invert: { DEFAULT: "100%", 0: "0" }, flex: { 1: "1 1 0%", auto: "1 1 auto", initial: "0 1 auto", none: "none" }, flexBasis: ({ theme: t }) => ({ ...t("spacing"), ...Rn(2, 6), ...Rn(12, 12), auto: "auto", full: "100%" }), flexGrow: { DEFAULT: 1, 0: 0 }, flexShrink: { DEFAULT: 1, 0: 0 }, fontFamily: { sans: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'.split(","), serif: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif'.split(","), mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'.split(",") }, fontSize: { xs: ["0.75rem", "1rem"], sm: ["0.875rem", "1.25rem"], base: ["1rem", "1.5rem"], lg: ["1.125rem", "1.75rem"], xl: ["1.25rem", "1.75rem"], "2xl": ["1.5rem", "2rem"], "3xl": ["1.875rem", "2.25rem"], "4xl": ["2.25rem", "2.5rem"], "5xl": ["3rem", "1"], "6xl": ["3.75rem", "1"], "7xl": ["4.5rem", "1"], "8xl": ["6rem", "1"], "9xl": ["8rem", "1"] }, fontWeight: { thin: "100", extralight: "200", light: "300", normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900" }, gap: Fn("spacing"), gradientColorStops: Fn("colors"), gridAutoColumns: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0,1fr)" }, gridAutoRows: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0,1fr)" }, gridColumn: { auto: "auto", "span-full": "1 / -1" }, gridRow: { auto: "auto", "span-full": "1 / -1" }, gridTemplateColumns: { none: "none" }, gridTemplateRows: { none: "none" }, height: ({ theme: t }) => ({ ...t("spacing"), ...Rn(2, 6), min: "min-content", max: "max-content", fit: "fit-content", auto: "auto", full: "100%", screen: "100vh" }), inset: ({ theme: t }) => ({ ...t("spacing"), ...Rn(2, 4), auto: "auto", full: "100%" }), keyframes: { spin: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } }, ping: { "0%": { transform: "scale(1)", opacity: "1" }, "75%,100%": { transform: "scale(2)", opacity: "0" } }, pulse: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".5" } }, bounce: { "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" }, "50%": { transform: "none", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" } } }, letterSpacing: { tighter: "-0.05em", tight: "-0.025em", normal: "0em", wide: "0.025em", wider: "0.05em", widest: "0.1em" }, lineHeight: { ...zn(10, "rem", 4, 3), none: "1", tight: "1.25", snug: "1.375", normal: "1.5", relaxed: "1.625", loose: "2" }, margin: ({ theme: t }) => ({ auto: "auto", ...t("spacing") }), maxHeight: ({ theme: t }) => ({ full: "100%", min: "min-content", max: "max-content", fit: "fit-content", screen: "100vh", ...t("spacing") }), maxWidth: ({ theme: t, breakpoints: e2 }) => ({ ...e2(t("screens")), none: "none", 0: "0rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", prose: "65ch" }), minHeight: { 0: "0px", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", screen: "100vh" }, minWidth: { 0: "0px", full: "100%", min: "min-content", max: "max-content", fit: "fit-content" }, opacity: { ...zn(100, "", 100, 0, 10), 5: "0.05", 25: "0.25", 75: "0.75", 95: "0.95" }, order: { first: "-9999", last: "9999", none: "0" }, padding: Fn("spacing"), placeholderColor: Fn("colors"), placeholderOpacity: Fn("opacity"), outlineColor: Fn("colors"), outlineOffset: Zn(8, "px"), outlineWidth: Zn(8, "px"), ringColor: ({ theme: t }) => ({ ...t("colors"), DEFAULT: "#3b82f6" }), ringOffsetColor: Fn("colors"), ringOffsetWidth: Zn(8, "px"), ringOpacity: ({ theme: t }) => ({ ...t("opacity"), DEFAULT: "0.5" }), ringWidth: { DEFAULT: "3px", ...Zn(8, "px") }, rotate: { ...Zn(2, "deg"), ...Zn(12, "deg", 3), ...Zn(180, "deg", 45) }, saturate: zn(200, "", 100, 0, 50), scale: { ...zn(150, "", 100, 0, 50), ...zn(110, "", 100, 90, 5), 75: "0.75", 125: "1.25" }, scrollMargin: Fn("spacing"), scrollPadding: Fn("spacing"), sepia: { 0: "0", DEFAULT: "100%" }, skew: { ...Zn(2, "deg"), ...Zn(12, "deg", 3) }, space: Fn("spacing"), stroke: ({ theme: t }) => ({ ...t("colors"), none: "none" }), strokeWidth: zn(2), textColor: Fn("colors"), textDecorationColor: Fn("colors"), textDecorationThickness: { "from-font": "from-font", auto: "auto", ...Zn(8, "px") }, textUnderlineOffset: { auto: "auto", ...Zn(8, "px") }, textIndent: Fn("spacing"), textOpacity: Fn("opacity"), transitionDuration: ({ theme: t }) => ({ ...t("durations"), DEFAULT: "150ms" }), transitionDelay: Fn("durations"), transitionProperty: { none: "none", all: "all", DEFAULT: "color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter", colors: "color,background-color,border-color,text-decoration-color,fill,stroke", opacity: "opacity", shadow: "box-shadow", transform: "transform" }, transitionTimingFunction: { DEFAULT: "cubic-bezier(0.4,0,0.2,1)", linear: "linear", in: "cubic-bezier(0.4,0,1,1)", out: "cubic-bezier(0,0,0.2,1)", "in-out": "cubic-bezier(0.4,0,0.2,1)" }, translate: ({ theme: t }) => ({ ...t("spacing"), ...Rn(2, 4), full: "100%" }), width: ({ theme: t }) => ({ min: "min-content", max: "max-content", fit: "fit-content", screen: "100vw", ...t("flexBasis") }), willChange: { scroll: "scroll-position" }, zIndex: { ...zn(50, "", 1, 0, 10), auto: "auto" } };
function Rn(t, e2) {
  let n2 = {};
  do {
    for (var r2 = 1; r2 < t; r2++) n2[`${r2}/${t}`] = Number((r2 / t * 100).toFixed(6)) + "%";
  } while (++t <= e2);
  return n2;
}
function Zn(t, e2, n2 = 0) {
  let r2 = {};
  for (; n2 <= t; n2 = 2 * n2 || 1) r2[n2] = n2 + e2;
  return r2;
}
function zn(t, e2 = "", n2 = 1, r2 = 0, i3 = 1, o2 = {}) {
  for (; r2 <= t; r2 += i3) o2[r2] = r2 / n2 + e2;
  return o2;
}
function Fn(t) {
  return ({ theme: e2 }) => e2(t);
}
var jn = { "*,::before,::after": { boxSizing: "border-box", borderWidth: "0", borderStyle: "solid", borderColor: "theme(borderColor.DEFAULT, currentColor)" }, "::before,::after": { "--tw-content": "''" }, html: { lineHeight: 1.5, WebkitTextSizeAdjust: "100%", MozTabSize: "4", tabSize: 4, fontFamily: `theme(fontFamily.sans, ${Vn.fontFamily.sans})`, fontFeatureSettings: "theme(fontFamily.sans[1].fontFeatureSettings, normal)" }, body: { margin: "0", lineHeight: "inherit" }, hr: { height: "0", color: "inherit", borderTopWidth: "1px" }, "abbr:where([title])": { textDecoration: "underline dotted" }, "h1,h2,h3,h4,h5,h6": { fontSize: "inherit", fontWeight: "inherit" }, a: { color: "inherit", textDecoration: "inherit" }, "b,strong": { fontWeight: "bolder" }, "code,kbd,samp,pre": { fontFamily: `theme(fontFamily.mono, ${Vn.fontFamily.mono})`, fontFeatureSettings: "theme(fontFamily.mono[1].fontFeatureSettings, normal)", fontSize: "1em" }, small: { fontSize: "80%" }, "sub,sup": { fontSize: "75%", lineHeight: 0, position: "relative", verticalAlign: "baseline" }, sub: { bottom: "-0.25em" }, sup: { top: "-0.5em" }, table: { textIndent: "0", borderColor: "inherit", borderCollapse: "collapse" }, "button,input,optgroup,select,textarea": { fontFamily: "inherit", fontSize: "100%", lineHeight: "inherit", color: "inherit", margin: "0", padding: "0" }, "button,select": { textTransform: "none" }, "button,[type='button'],[type='reset'],[type='submit']": { WebkitAppearance: "button", backgroundColor: "transparent", backgroundImage: "none" }, ":-moz-focusring": { outline: "auto" }, ":-moz-ui-invalid": { boxShadow: "none" }, progress: { verticalAlign: "baseline" }, "::-webkit-inner-spin-button,::-webkit-outer-spin-button": { height: "auto" }, "[type='search']": { WebkitAppearance: "textfield", outlineOffset: "-2px" }, "::-webkit-search-decoration": { WebkitAppearance: "none" }, "::-webkit-file-upload-button": { WebkitAppearance: "button", font: "inherit" }, summary: { display: "list-item" }, "blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre": { margin: "0" }, fieldset: { margin: "0", padding: "0" }, legend: { padding: "0" }, "ol,ul,menu": { listStyle: "none", margin: "0", padding: "0" }, textarea: { resize: "vertical" }, "input::placeholder,textarea::placeholder": { opacity: 1, color: "theme(colors.gray.400, #9ca3af)" }, 'button,[role="button"]': { cursor: "pointer" }, ":disabled": { cursor: "default" }, "img,svg,video,canvas,audio,iframe,embed,object": { display: "block", verticalAlign: "middle" }, "img,video": { maxWidth: "100%", height: "auto" }, "[hidden]": { display: "none" } };
var Bn = [Cn("\\[([-\\w]+):(.+)]", ({ 1: t, 2: e2 }, n2) => ({ "@layer overrides": { "&": { [t]: Sn(`[${e2}]`, "", n2) } } })), Cn("(group|peer)([~/][^-[]+)?", ({ input: t }, { h: e2 }) => [{ c: e2(t) }]), vn("aspect-", "aspectRatio"), Cn("container", (t, { theme: e2 }) => {
  let { screens: n2 = e2("screens"), center: r2, padding: i3 } = e2("container"), o2 = { width: "100%", marginRight: r2 && "auto", marginLeft: r2 && "auto", ...s3("xs") };
  for (let t2 in n2) {
    let e3 = n2[t2];
    "string" == typeof e3 && (o2[Fe(e3)] = { "&": { maxWidth: e3, ...s3(t2) } });
  }
  return o2;
  function s3(t2) {
    let e3 = i3 && ("string" == typeof i3 ? i3 : i3[t2] || i3.DEFAULT);
    if (e3) return { paddingRight: e3, paddingLeft: e3 };
  }
}), vn("content-", "content", ({ _: t }) => ({ "--tw-content": t, content: "var(--tw-content)" })), Cn("(?:box-)?decoration-(slice|clone)", "boxDecorationBreak"), Cn("box-(border|content)", "boxSizing", ({ 1: t }) => t + "-box"), Cn("hidden", { display: "none" }), Cn("table-(auto|fixed)", "tableLayout"), Cn(["(block|flex|table|grid|inline|contents|flow-root|list-item)", "(inline-(block|flex|table|grid))", "(table-(caption|cell|column|row|(column|row|footer|header)-group))"], "display"), "(float)-(left|right|none)", "(clear)-(left|right|none|both)", "(overflow(?:-[xy])?)-(auto|hidden|clip|visible|scroll)", "(isolation)-(auto)", Cn("isolate", "isolation"), Cn("object-(contain|cover|fill|none|scale-down)", "objectFit"), vn("object-", "objectPosition"), Cn("object-(top|bottom|center|(left|right)(-(top|bottom))?)", "objectPosition", Wn), Cn("overscroll(-[xy])?-(auto|contain|none)", ({ 1: t = "", 2: e2 }) => ({ ["overscroll-behavior" + t]: e2 })), Cn("(static|fixed|absolute|relative|sticky)", "position"), vn("-?inset(-[xy])?(?:$|-)", "inset", ({ 1: t, _: e2 }) => ({ top: "-x" != t && e2, right: "-y" != t && e2, bottom: "-x" != t && e2, left: "-y" != t && e2 })), vn("-?(top|bottom|left|right)(?:$|-)", "inset"), Cn("(visible|collapse)", "visibility"), Cn("invisible", { visibility: "hidden" }), vn("-?z-", "zIndex"), Cn("flex-((row|col)(-reverse)?)", "flexDirection", Dn), Cn("flex-(wrap|wrap-reverse|nowrap)", "flexWrap"), vn("(flex-(?:grow|shrink))(?:$|-)"), vn("(flex)-"), vn("grow(?:$|-)", "flexGrow"), vn("shrink(?:$|-)", "flexShrink"), vn("basis-", "flexBasis"), vn("-?(order)-"), "-?(order)-(\\d+)", vn("grid-cols-", "gridTemplateColumns"), Cn("grid-cols-(\\d+)", "gridTemplateColumns", er), vn("col-", "gridColumn"), Cn("col-(span)-(\\d+)", "gridColumn", tr), vn("col-start-", "gridColumnStart"), Cn("col-start-(auto|\\d+)", "gridColumnStart"), vn("col-end-", "gridColumnEnd"), Cn("col-end-(auto|\\d+)", "gridColumnEnd"), vn("grid-rows-", "gridTemplateRows"), Cn("grid-rows-(\\d+)", "gridTemplateRows", er), vn("row-", "gridRow"), Cn("row-(span)-(\\d+)", "gridRow", tr), vn("row-start-", "gridRowStart"), Cn("row-start-(auto|\\d+)", "gridRowStart"), vn("row-end-", "gridRowEnd"), Cn("row-end-(auto|\\d+)", "gridRowEnd"), Cn("grid-flow-((row|col)(-dense)?)", "gridAutoFlow", (t) => Wn(Dn(t))), Cn("grid-flow-(dense)", "gridAutoFlow"), vn("auto-cols-", "gridAutoColumns"), vn("auto-rows-", "gridAutoRows"), vn("gap-x(?:$|-)", "gap", "columnGap"), vn("gap-y(?:$|-)", "gap", "rowGap"), vn("gap(?:$|-)", "gap"), "(justify-(?:items|self))-", Cn("justify-", "justifyContent", Gn), Cn("(content|items|self)-", (t) => ({ ["align-" + t[1]]: Gn(t) })), Cn("(place-(content|items|self))-", ({ 1: t, $$: e2 }) => ({ [t]: ("wun".includes(e2[3]) ? "space-" : "") + e2 })), vn("p([xytrbl])?(?:$|-)", "padding", Kn("padding")), vn("-?m([xytrbl])?(?:$|-)", "margin", Kn("margin")), vn("-?space-(x|y)(?:$|-)", "space", ({ 1: t, _: e2 }) => ({ "&>:not([hidden])~:not([hidden])": { [`--tw-space-${t}-reverse`]: "0", ["margin-" + { y: "top", x: "left" }[t]]: `calc(${e2} * calc(1 - var(--tw-space-${t}-reverse)))`, ["margin-" + { y: "bottom", x: "right" }[t]]: `calc(${e2} * var(--tw-space-${t}-reverse))` } })), Cn("space-(x|y)-reverse", ({ 1: t }) => ({ "&>:not([hidden])~:not([hidden])": { [`--tw-space-${t}-reverse`]: "1" } })), vn("w-", "width"), vn("min-w-", "minWidth"), vn("max-w-", "maxWidth"), vn("h-", "height"), vn("min-h-", "minHeight"), vn("max-h-", "maxHeight"), vn("font-", "fontWeight"), vn("font-", "fontFamily", ({ _: t }) => "string" == typeof (t = je(t))[1] ? { fontFamily: qn(t) } : { fontFamily: qn(t[0]), ...t[1] }), Cn("antialiased", { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }), Cn("subpixel-antialiased", { WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" }), Cn("italic", "fontStyle"), Cn("not-italic", { fontStyle: "normal" }), Cn("(ordinal|slashed-zero|(normal|lining|oldstyle|proportional|tabular)-nums|(diagonal|stacked)-fractions)", ({ 1: t, 2: e2 = "", 3: n2 }) => "normal" == e2 ? { fontVariantNumeric: "normal" } : { ["--tw-" + (n2 ? "numeric-fraction" : "pt".includes(e2[0]) ? "numeric-spacing" : e2 ? "numeric-figure" : t)]: t, fontVariantNumeric: "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)", ...nr({ "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)", "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)", "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)", "--tw-numeric-spacing": "var(--tw-empty,/*!*/ /*!*/)", "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)" }) }), vn("tracking-", "letterSpacing"), vn("leading-", "lineHeight"), Cn("list-(inside|outside)", "listStylePosition"), vn("list-", "listStyleType"), Cn("list-", "listStyleType"), vn("placeholder-opacity-", "placeholderOpacity", ({ _: t }) => ({ "&::placeholder": { "--tw-placeholder-opacity": t } })), $n("placeholder-", { property: "color", selector: "&::placeholder" }), Cn("text-(left|center|right|justify|start|end)", "textAlign"), Cn("text-(ellipsis|clip)", "textOverflow"), vn("text-opacity-", "textOpacity", "--tw-text-opacity"), $n("text-", { property: "color" }), vn("text-", "fontSize", ({ _: t }) => "string" == typeof t ? { fontSize: t } : { fontSize: t[0], ..."string" == typeof t[1] ? { lineHeight: t[1] } : t[1] }), vn("indent-", "textIndent"), Cn("(overline|underline|line-through)", "textDecorationLine"), Cn("no-underline", { textDecorationLine: "none" }), vn("underline-offset-", "textUnderlineOffset"), $n("decoration-", { section: "textDecorationColor", opacityVariable: false, opacitySection: "opacity" }), vn("decoration-", "textDecorationThickness"), Cn("decoration-", "textDecorationStyle"), Cn("(uppercase|lowercase|capitalize)", "textTransform"), Cn("normal-case", { textTransform: "none" }), Cn("truncate", { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }), Cn("align-", "verticalAlign"), Cn("whitespace-", "whiteSpace"), Cn("break-normal", { wordBreak: "normal", overflowWrap: "normal" }), Cn("break-words", { overflowWrap: "break-word" }), Cn("break-all", { wordBreak: "break-all" }), Cn("break-keep", { wordBreak: "keep-all" }), $n("caret-", { opacityVariable: false, opacitySection: "opacity" }), $n("accent-", { opacityVariable: false, opacitySection: "opacity" }), Cn("bg-gradient-to-([trbl]|[tb][rl])", "backgroundImage", ({ 1: t }) => `linear-gradient(to ${In(t, " ")},var(--tw-gradient-stops))`), $n("from-", { section: "gradientColorStops", opacityVariable: false, opacitySection: "opacity" }, ({ _: t }) => ({ "--tw-gradient-from": t.value, "--tw-gradient-to": t.color({ opacityValue: "0" }), "--tw-gradient-stops": "var(--tw-gradient-from),var(--tw-gradient-to)" })), $n("via-", { section: "gradientColorStops", opacityVariable: false, opacitySection: "opacity" }, ({ _: t }) => ({ "--tw-gradient-to": t.color({ opacityValue: "0" }), "--tw-gradient-stops": `var(--tw-gradient-from),${t.value},var(--tw-gradient-to)` })), $n("to-", { section: "gradientColorStops", property: "--tw-gradient-to", opacityVariable: false, opacitySection: "opacity" }), Cn("bg-(fixed|local|scroll)", "backgroundAttachment"), Cn("bg-origin-(border|padding|content)", "backgroundOrigin", ({ 1: t }) => t + "-box"), Cn(["bg-(no-repeat|repeat(-[xy])?)", "bg-repeat-(round|space)"], "backgroundRepeat"), Cn("bg-blend-", "backgroundBlendMode"), Cn("bg-clip-(border|padding|content|text)", "backgroundClip", ({ 1: t }) => t + ("text" == t ? "" : "-box")), vn("bg-opacity-", "backgroundOpacity", "--tw-bg-opacity"), $n("bg-", { section: "backgroundColor" }), vn("bg-", "backgroundImage"), vn("bg-", "backgroundPosition"), Cn("bg-(top|bottom|center|(left|right)(-(top|bottom))?)", "backgroundPosition", Wn), vn("bg-", "backgroundSize"), vn("rounded(?:$|-)", "borderRadius"), vn("rounded-([trbl]|[tb][rl])(?:$|-)", "borderRadius", ({ 1: t, _: e2 }) => {
  let n2 = { t: ["tl", "tr"], r: ["tr", "br"], b: ["bl", "br"], l: ["bl", "tl"] }[t] || [t, t];
  return { [`border-${In(n2[0])}-radius`]: e2, [`border-${In(n2[1])}-radius`]: e2 };
}), Cn("border-(collapse|separate)", "borderCollapse"), vn("border-opacity(?:$|-)", "borderOpacity", "--tw-border-opacity"), Cn("border-(solid|dashed|dotted|double|none)", "borderStyle"), vn("border-spacing(-[xy])?(?:$|-)", "borderSpacing", ({ 1: t, _: e2 }) => ({ ...nr({ "--tw-border-spacing-x": "0", "--tw-border-spacing-y": "0" }), ["--tw-border-spacing" + (t || "-x")]: e2, ["--tw-border-spacing" + (t || "-y")]: e2, "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)" })), $n("border-([xytrbl])-", { section: "borderColor" }, Kn("border", "Color")), $n("border-"), vn("border-([xytrbl])(?:$|-)", "borderWidth", Kn("border", "Width")), vn("border(?:$|-)", "borderWidth"), vn("divide-opacity(?:$|-)", "divideOpacity", ({ _: t }) => ({ "&>:not([hidden])~:not([hidden])": { "--tw-divide-opacity": t } })), Cn("divide-(solid|dashed|dotted|double|none)", ({ 1: t }) => ({ "&>:not([hidden])~:not([hidden])": { borderStyle: t } })), Cn("divide-([xy]-reverse)", ({ 1: t }) => ({ "&>:not([hidden])~:not([hidden])": { ["--tw-divide-" + t]: "1" } })), vn("divide-([xy])(?:$|-)", "divideWidth", ({ 1: t, _: e2 }) => {
  let n2 = { x: "lr", y: "tb" }[t];
  return { "&>:not([hidden])~:not([hidden])": { [`--tw-divide-${t}-reverse`]: "0", [`border-${In(n2[0])}Width`]: `calc(${e2} * calc(1 - var(--tw-divide-${t}-reverse)))`, [`border-${In(n2[1])}Width`]: `calc(${e2} * var(--tw-divide-${t}-reverse))` } };
}), $n("divide-", { property: "borderColor", selector: "&>:not([hidden])~:not([hidden])" }), vn("ring-opacity(?:$|-)", "ringOpacity", "--tw-ring-opacity"), $n("ring-offset-", { property: "--tw-ring-offset-color", opacityVariable: false }), vn("ring-offset(?:$|-)", "ringOffsetWidth", "--tw-ring-offset-width"), Cn("ring-inset", { "--tw-ring-inset": "inset" }), $n("ring-", { property: "--tw-ring-color" }), vn("ring(?:$|-)", "ringWidth", ({ _: t }, { theme: e2 }) => ({ ...nr({ "--tw-ring-offset-shadow": "0 0 #0000", "--tw-ring-shadow": "0 0 #0000", "--tw-shadow": "0 0 #0000", "--tw-shadow-colored": "0 0 #0000", "&": { "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)", "--tw-ring-offset-width": e2("ringOffsetWidth", "", "0px"), "--tw-ring-offset-color": an(e2("ringOffsetColor", "", "#fff")), "--tw-ring-color": an(e2("ringColor", "", "#93c5fd"), { opacityVariable: "--tw-ring-opacity" }), "--tw-ring-opacity": e2("ringOpacity", "", "0.5") } }), "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)", "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${t} + var(--tw-ring-offset-width)) var(--tw-ring-color)`, boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)" })), $n("shadow-", { section: "boxShadowColor", opacityVariable: false, opacitySection: "opacity" }, ({ _: t }) => ({ "--tw-shadow-color": t.value, "--tw-shadow": "var(--tw-shadow-colored)" })), vn("shadow(?:$|-)", "boxShadow", ({ _: t }) => ({ ...nr({ "--tw-ring-offset-shadow": "0 0 #0000", "--tw-ring-shadow": "0 0 #0000", "--tw-shadow": "0 0 #0000", "--tw-shadow-colored": "0 0 #0000" }), "--tw-shadow": qn(t), "--tw-shadow-colored": qn(t).replace(/([^,]\s+)(?:#[a-f\d]+|(?:(?:hsl|rgb)a?|hwb|lab|lch|color|var)\(.+?\)|[a-z]+)(,|$)/g, "$1var(--tw-shadow-color)$2"), boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)" })), vn("(opacity)-"), Cn("mix-blend-", "mixBlendMode"), ...Jn(), ...Jn("backdrop-"), vn("transition(?:$|-)", "transitionProperty", (t, { theme: e2 }) => ({ transitionProperty: qn(t), transitionTimingFunction: "none" == t._ ? void 0 : qn(e2("transitionTimingFunction", "")), transitionDuration: "none" == t._ ? void 0 : qn(e2("transitionDuration", "")) })), vn("duration(?:$|-)", "transitionDuration", "transitionDuration", qn), vn("ease(?:$|-)", "transitionTimingFunction", "transitionTimingFunction", qn), vn("delay(?:$|-)", "transitionDelay", "transitionDelay", qn), vn("animate(?:$|-)", "animation", (t, { theme: e2, h: n2, e: r2 }) => {
  let i3 = qn(t), o2 = i3.split(" "), s3 = e2("keyframes", o2[0]);
  return s3 ? { ["@keyframes " + (o2[0] = r2(n2(o2[0])))]: s3, animation: o2.join(" ") } : { animation: i3 };
}), "(transform)-(none)", Cn("transform", Qn), Cn("transform-(cpu|gpu)", ({ 1: t }) => ({ "--tw-transform": Xn("gpu" == t) })), vn("scale(-[xy])?-", "scale", ({ 1: t, _: e2 }) => ({ ["--tw-scale" + (t || "-x")]: e2, ["--tw-scale" + (t || "-y")]: e2, ...Qn() })), vn("-?(rotate)-", "rotate", Yn), vn("-?(translate-[xy])-", "translate", Yn), vn("-?(skew-[xy])-", "skew", Yn), Cn("origin-(center|((top|bottom)(-(left|right))?)|left|right)", "transformOrigin", Wn), "(appearance)-", vn("(columns)-"), "(columns)-(\\d+)", "(break-(?:before|after|inside))-", vn("(cursor)-"), "(cursor)-", Cn("snap-(none)", "scroll-snap-type"), Cn("snap-(x|y|both)", ({ 1: t }) => ({ ...nr({ "--tw-scroll-snap-strictness": "proximity" }), "scroll-snap-type": t + " var(--tw-scroll-snap-strictness)" })), Cn("snap-(mandatory|proximity)", "--tw-scroll-snap-strictness"), Cn("snap-(?:(start|end|center)|align-(none))", "scroll-snap-align"), Cn("snap-(normal|always)", "scroll-snap-stop"), Cn("scroll-(auto|smooth)", "scroll-behavior"), vn("scroll-p([xytrbl])?(?:$|-)", "padding", Kn("scroll-padding")), vn("-?scroll-m([xytrbl])?(?:$|-)", "scroll-margin", Kn("scroll-margin")), Cn("touch-(auto|none|manipulation)", "touch-action"), Cn("touch-(pinch-zoom|pan-(?:(x|left|right)|(y|up|down)))", ({ 1: t, 2: e2, 3: n2 }) => ({ ...nr({ "--tw-pan-x": "var(--tw-empty,/*!*/ /*!*/)", "--tw-pan-y": "var(--tw-empty,/*!*/ /*!*/)", "--tw-pinch-zoom": "var(--tw-empty,/*!*/ /*!*/)", "--tw-touch-action": "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)" }), [`--tw-${e2 ? "pan-x" : n2 ? "pan-y" : t}`]: t, "touch-action": "var(--tw-touch-action)" })), Cn("outline-none", { outline: "2px solid transparent", "outline-offset": "2px" }), Cn("outline", { outlineStyle: "solid" }), Cn("outline-(dashed|dotted|double)", "outlineStyle"), vn("-?(outline-offset)-"), $n("outline-", { opacityVariable: false, opacitySection: "opacity" }), vn("outline-", "outlineWidth"), "(pointer-events)-", vn("(will-change)-"), "(will-change)-", ["resize(?:-(none|x|y))?", "resize", ({ 1: t }) => ({ x: "horizontal", y: "vertical" })[t] || t || "both"], Cn("select-(none|text|all|auto)", "userSelect"), $n("fill-", { section: "fill", opacityVariable: false, opacitySection: "opacity" }), $n("stroke-", { section: "stroke", opacityVariable: false, opacitySection: "opacity" }), vn("stroke-", "strokeWidth"), Cn("sr-only", { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", whiteSpace: "nowrap", clip: "rect(0,0,0,0)", borderWidth: "0" }), Cn("not-sr-only", { position: "static", width: "auto", height: "auto", padding: "0", margin: "0", overflow: "visible", whiteSpace: "normal", clip: "auto" })];
function Wn(t) {
  return ("string" == typeof t ? t : t[1]).replace(/-/g, " ").trim();
}
function Dn(t) {
  return ("string" == typeof t ? t : t[1]).replace("col", "column");
}
function In(t, e2 = "-") {
  let n2 = [];
  for (let e3 of t) n2.push({ t: "top", r: "right", b: "bottom", l: "left" }[e3]);
  return n2.join(e2);
}
function qn(t) {
  return t && "" + (t._ || t);
}
function Gn({ $$: t }) {
  return ({ r: "flex-", "": "flex-", w: "space-", u: "space-", n: "space-" }[t[3] || ""] || "") + t;
}
function Kn(t, e2 = "") {
  return ({ 1: n2, _: r2 }) => {
    let i3 = { x: "lr", y: "tb" }[n2] || n2 + n2;
    return i3 ? { ...kn(t + "-" + In(i3[0]) + e2, r2), ...kn(t + "-" + In(i3[1]) + e2, r2) } : kn(t + e2, r2);
  };
}
function Jn(t = "") {
  let e2 = ["blur", "brightness", "contrast", "grayscale", "hue-rotate", "invert", t && "opacity", "saturate", "sepia", !t && "drop-shadow"].filter(Boolean), n2 = {};
  for (let r2 of e2) n2[`--tw-${t}${r2}`] = "var(--tw-empty,/*!*/ /*!*/)";
  return n2 = { ...nr(n2), [`${t}filter`]: e2.map((e3) => `var(--tw-${t}${e3})`).join(" ") }, [`(${t}filter)-(none)`, Cn(`${t}filter`, n2), ...e2.map((e3) => vn(`${"h" == e3[0] ? "-?" : ""}(${t}${e3})(?:$|-)`, e3, ({ 1: t2, _: r2 }) => ({ [`--tw-${t2}`]: je(r2).map((t3) => `${e3}(${t3})`).join(" "), ...n2 })))];
}
function Yn({ 1: t, _: e2 }) {
  return { ["--tw-" + t]: e2, ...Qn() };
}
function Qn() {
  return { ...nr({ "--tw-translate-x": "0", "--tw-translate-y": "0", "--tw-rotate": "0", "--tw-skew-x": "0", "--tw-skew-y": "0", "--tw-scale-x": "1", "--tw-scale-y": "1", "--tw-transform": Xn() }), transform: "var(--tw-transform)" };
}
function Xn(t) {
  return [t ? "translate3d(var(--tw-translate-x),var(--tw-translate-y),0)" : "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))", "rotate(var(--tw-rotate))", "skewX(var(--tw-skew-x))", "skewY(var(--tw-skew-y))", "scaleX(var(--tw-scale-x))", "scaleY(var(--tw-scale-y))"].join(" ");
}
function tr({ 1: t, 2: e2 }) {
  return `${t} ${e2} / ${t} ${e2}`;
}
function er({ 1: t }) {
  return `repeat(${t},minmax(0,1fr))`;
}
function nr(t) {
  return { "@layer defaults": { "*,::before,::after": t, "::backdrop": t } };
}
var rr = [["sticky", "@supports ((position: -webkit-sticky) or (position:sticky))"], ["motion-reduce", "@media (prefers-reduced-motion:reduce)"], ["motion-safe", "@media (prefers-reduced-motion:no-preference)"], ["print", "@media print"], ["(portrait|landscape)", ({ 1: t }) => `@media (orientation:${t})`], ["contrast-(more|less)", ({ 1: t }) => `@media (prefers-contrast:${t})`], ["(first-(letter|line)|placeholder|backdrop|before|after)", ({ 1: t }) => `&::${t}`], ["(marker|selection)", ({ 1: t }) => `& *::${t},&::${t}`], ["file", "&::file-selector-button"], ["(first|last|only)", ({ 1: t }) => `&:${t}-child`], ["even", "&:nth-child(2n)"], ["odd", "&:nth-child(odd)"], ["open", "&[open]"], ["(aria|data)-", ({ 1: t, $$: e2 }, n2) => e2 && `&[${t}-${n2.theme(t, e2) || Sn(e2, "", n2) || `${e2}="true"`}]`], ["((group|peer)(~[^-[]+)?)(-\\[(.+)]|[-[].+?)(\\/.+)?", ({ 2: t, 3: e2 = "", 4: n2, 5: r2 = "", 6: i3 = e2 }, { e: o2, h: s3, v: a3 }) => {
  let l4 = An(r2) || ("[" == n2[0] ? n2 : a3(n2.slice(1)));
  return `${(l4.includes("&") ? l4 : "&" + l4).replace(/&/g, `:merge(.${o2(s3(t + i3))})`)}${"p" == t[0] ? "~" : " "}&`;
}], ["(ltr|rtl)", ({ 1: t }) => `[dir="${t}"] &`], ["supports-", ({ $$: t }, e2) => {
  if (t && (t = e2.theme("supports", t) || Sn(t, "", e2)), t) return t.includes(":") || (t += ":var(--tw)"), /^\w*\s*\(/.test(t) || (t = `(${t})`), `@supports ${t.replace(/\b(and|or|not)\b/g, " $1 ").trim()}`;
}], ["max-", ({ $$: t }, e2) => {
  if (t && (t = e2.theme("screens", t) || Sn(t, "", e2)), "string" == typeof t) return `@media not all and (min-width:${t})`;
}], ["min-", ({ $$: t }, e2) => (t && (t = Sn(t, "", e2)), t && `@media (min-width:${t})`)], [/^\[(.+)]$/, ({ 1: t }) => /[&@]/.test(t) && An(t).replace(/[}]+$/, "").split("{")]];
var ir = { __proto__: null, slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a" }, gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827" }, zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b" }, neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717" }, stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917" }, red: { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d" }, orange: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12" }, amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f" }, yellow: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12" }, lime: { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314" }, green: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d" }, emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b" }, teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a" }, cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63" }, sky: { 50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e" }, blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a" }, indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81" }, violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95" }, purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87" }, fuchsia: { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75" }, pink: { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843" }, rose: { 50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337" } };
function or({ disablePreflight: t } = {}) {
  return function({ colors: t2, disablePreflight: e2 } = {}) {
    return { preflight: e2 ? void 0 : jn, theme: { ...Vn, colors: { inherit: "inherit", current: "currentColor", transparent: "transparent", black: "#000", white: "#fff", ...t2 } }, variants: rr, rules: Bn, finalize: (t3) => t3.n && t3.d && t3.r.some((t4) => /^&::(before|after)$/.test(t4)) && !/(^|;)content:/.test(t3.d) ? { ...t3, d: "content:var(--tw-content);" + t3.d } : t3 };
  }({ colors: ir, disablePreflight: t });
}
var sr = "undefined" != typeof ShadowRoot && ("undefined" == typeof ShadyCSS || ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
function ar(t) {
  return t.shadowRoot || t.attachShadow({ mode: "open" });
}
var lr = { "brand-light": "var(--bc-color-brand, #196CE7)", "brand-dark": "var(--bc-color-brand-dark, var(--bc-color-brand, #3994FF))", "brand-button-text-light": "var(--bc-color-brand-button-text)", "brand-button-text-dark": "var(--bc-color-brand-button-text-dark, var(--bc-color-brand-button-text))", "brand-mixed-light": "color-mix(in srgb, var(--bc-color-brand, #196CE7) var(--bc-brand-mix, 100%), black)", "brand-mixed-dark": "color-mix(in srgb, var(--bc-color-brand-dark, var(--bc-color-brand, #3994FF)) var(--bc-brand-mix, 100%), white)", "foreground-light": "#000", "foreground-dark": "#fff", "background-light": "#fff", "background-dark": "#000", "neutral-primary-light": "#262626", "neutral-primary-dark": "#E4E4E4", "neutral-secondary-light": "#525252", "neutral-secondary-dark": "#A2A2A2", "neutral-tertiary-light": "#A2A2A2", "neutral-tertiary-dark": "#525252" };
var cr = { "glass-light": "linear-gradient(180deg, rgba(211, 211, 211, 0.20) 0%, rgba(255, 255, 255, 0.20) 50%);", "glass-dark": "linear-gradient(180deg, rgba(211, 211, 211, 0.10) 0%, rgba(0, 0, 0, 0.20) 50%)" };
var dr = () => globalThis.window ? function(t, e2 = true) {
  let n2 = function() {
    if (sr) try {
      let t3 = On(new CSSStyleSheet());
      return t3.connect = (e4) => {
        let n4 = ar(e4);
        n4.adoptedStyleSheets = [...n4.adoptedStyleSheets, t3.target];
      }, t3.disconnect = We, t3;
    } catch {
    }
    let t2 = document.createElement("style");
    t2.media = "not all", document.head.prepend(t2);
    let e3 = [On(t2)], n3 = /* @__PURE__ */ new WeakMap();
    return { get target() {
      return e3[0].target;
    }, snapshot() {
      let t3 = e3.map((t4) => t4.snapshot());
      return () => t3.forEach((t4) => t4());
    }, clear() {
      e3.forEach((t3) => t3.clear());
    }, destroy() {
      e3.forEach((t3) => t3.destroy());
    }, insert(t3, n4, r3) {
      e3[0].insert(t3, n4, r3);
      let i4 = this.target.cssRules[n4];
      e3.forEach((t4, e4) => e4 && t4.target.insertRule(i4.cssText, n4));
    }, resume: (t3, n4) => e3[0].resume(t3, n4), connect(t3) {
      let r3 = document.createElement("style");
      ar(t3).appendChild(r3);
      let i4 = On(r3), { cssRules: o2 } = this.target;
      for (let t4 = 0; t4 < o2.length; t4++) i4.target.insertRule(o2[t4].cssText, t4);
      e3.push(i4), n3.set(t3, i4);
    }, disconnect(t3) {
      let r3 = e3.indexOf(n3.get(t3));
      r3 >= 0 && e3.splice(r3, 1);
    } };
  }(), r2 = function(t2, e3) {
    let n3 = Mn(t2), r3 = function({ theme: t3, darkMode: e4, darkColor: n4 = We, variants: r4, rules: i5, hash: o3, stringify: s4, ignorelist: a4, finalize: l4 }) {
      let c4 = /* @__PURE__ */ new Map(), d5 = /* @__PURE__ */ new Map(), h2 = /* @__PURE__ */ new Map(), p5 = /* @__PURE__ */ new Map(), u4 = Nn(a4, (t4, e5) => e5.test(t4));
      r4.push(["dark", Array.isArray(e4) || "class" == e4 ? `${je(e4)[1] || ".dark"} &` : "string" == typeof e4 && "media" != e4 ? e4 : "@media (prefers-color-scheme:dark)"]);
      let f5 = "function" == typeof o3 ? (t4) => o3(t4, ze) : o3 ? ze : Be;
      f5 !== Be && l4.push((t4) => {
        var _a3;
        return { ...t4, n: t4.n && f5(t4.n), d: (_a3 = t4.d) == null ? void 0 : _a3.replace(/--(tw(?:-[\w-]+)?)\b/g, (t5, e5) => "--" + f5(e5).replace("#", "")) };
      });
      let g4 = { theme: function({ extend: t4 = {}, ...e5 }) {
        let n5 = {}, r5 = { get colors() {
          return i6("colors");
        }, theme: i6, negative: () => ({}), breakpoints(t5) {
          let e6 = {};
          for (let n6 in t5) "string" == typeof t5[n6] && (e6["screen-" + n6] = t5[n6]);
          return e6;
        } };
        return i6;
        function i6(r6, s5, a5, l5) {
          if (r6) {
            if ({ 1: r6, 2: l5 } = /^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(r6) || [, r6], /[.[]/.test(r6)) {
              let t5 = [];
              r6.replace(/\[([^\]]+)\]|([^.[]+)/g, (e6, n6, r7 = n6) => t5.push(r7)), r6 = t5.shift(), a5 = s5, s5 = t5.join("-");
            }
            let c6 = n5[r6] || Object.assign(Object.assign(n5[r6] = {}, o4(e5, r6)), o4(t4, r6));
            if (null == s5) return c6;
            s5 || (s5 = "DEFAULT");
            let d6 = c6[s5] ?? s5.split("-").reduce((t5, e6) => t5 == null ? void 0 : t5[e6], c6) ?? a5;
            return l5 ? an(d6, { opacityValue: cn(l5, i6) }) : d6;
          }
          let c5 = {};
          for (let n6 of [...Object.keys(e5), ...Object.keys(t4)]) c5[n6] = i6(n6);
          return c5;
        }
        function o4(t5, e6) {
          let n6 = t5[e6];
          return "function" == typeof n6 && (n6 = n6(r5)), n6 && /color|fill|stroke/i.test(e6) ? function t6(e7, n7 = []) {
            let r6 = {};
            for (let i7 in e7) {
              let o5 = e7[i7], s5 = [...n7, i7];
              r6[s5.join("-")] = o5, "DEFAULT" == i7 && (s5 = n7, r6[n7.join("-")] = o5), "object" == typeof o5 && Object.assign(r6, t6(o5, s5));
            }
            return r6;
          }(n6) : n6;
        }
      }(t3), e: Ze, h: f5, s: (t4, e5) => s4(t4, e5, g4), d: (t4, e5, r5) => n4(t4, e5, g4, r5), v: (t4) => (c4.has(t4) || c4.set(t4, En(t4, r4, d5, Hn, g4) || "&:" + t4), c4.get(t4)), r(t4, e5) {
        let n5 = JSON.stringify([t4, e5]);
        return h2.has(n5) || h2.set(n5, !u4(t4, g4) && En(t4, i5, p5, Un, g4, e5)), h2.get(n5);
      }, f: (t4) => l4.reduce((t5, e5) => e5(t5, g4), t4) };
      return g4;
    }(n3), i4 = /* @__PURE__ */ new Map(), o2 = [], s3 = /* @__PURE__ */ new Set();
    function a3(t3) {
      let n4 = r3.f(t3), i5 = Ye(n4);
      if (i5 && !s3.has(i5)) {
        s3.add(i5);
        let n5 = en(o2, t3);
        e3.insert(i5, n5, t3), o2.splice(n5, 0, t3);
      }
      return n4.n;
    }
    return e3.resume((t3) => i4.set(t3, t3), (t3, n4) => {
      e3.insert(t3, o2.length, n4), o2.push(n4), s3.add(t3);
    }), Object.defineProperties(function(t3) {
      if (!i4.size) for (let t4 of je(n3.preflight)) "function" == typeof t4 && (t4 = t4(r3)), t4 && ("string" == typeof t4 ? pn("", De.b, bn(t4), r3, De.b, [], false, true) : ln(t4, {}, r3, De.b)).forEach(a3);
      let e4 = i4.get(t3 = "" + t3);
      if (!e4) {
        let n4 = /* @__PURE__ */ new Set();
        for (let e5 of hn(bn(t3), r3)) n4.add(e5.c).add(a3(e5));
        e4 = [...n4].filter(Boolean).join(" "), i4.set(t3, e4).set(e4, e4);
      }
      return e4;
    }, Object.getOwnPropertyDescriptors({ get target() {
      return e3.target;
    }, theme: r3.theme, config: n3, snapshot() {
      let t3 = e3.snapshot(), n4 = new Set(s3), r4 = new Map(i4), a4 = [...o2];
      return () => {
        t3(), s3 = n4, i4 = r4, o2 = a4;
      };
    }, clear() {
      e3.clear(), s3 = /* @__PURE__ */ new Set(), i4 = /* @__PURE__ */ new Map(), o2 = [];
    }, destroy() {
      this.clear(), e3.destroy();
    } }));
  }({ ...t, hash: t.hash ?? e2 }, n2), i3 = function(t2) {
    let e3 = new MutationObserver(n3);
    return { observe(t3) {
      e3.observe(t3, { attributeFilter: ["class"], subtree: true, childList: true }), r3(t3), n3([{ target: t3, type: "" }]);
    }, disconnect() {
      e3.disconnect();
    } };
    function n3(t3) {
      for (let { type: e4, target: n4 } of t3) if ("a" == e4[0]) r3(n4);
      else for (let t4 of n4.querySelectorAll("[class]")) r3(t4);
      e3.takeRecords();
    }
    function r3(e4) {
      var _a3;
      let n4, r4 = (_a3 = e4.getAttribute) == null ? void 0 : _a3.call(e4, "class");
      r4 && function(t3, e5) {
        return t3 != e5 && "" + t3.split(" ").sort() != "" + e5.split(" ").sort();
      }(r4, n4 = t2(r4)) && e4.setAttribute("class", n4);
    }
  }(r2);
  return function(t2) {
    return class extends t2 {
      connectedCallback() {
        var _a3;
        (_a3 = super.connectedCallback) == null ? void 0 : _a3.call(this), n2.connect(this), i3.observe(ar(this));
      }
      disconnectedCallback() {
        var _a3;
        n2.disconnect(this), (_a3 = super.disconnectedCallback) == null ? void 0 : _a3.call(this);
      }
      constructor(...t3) {
        super(...t3), this.tw = r2;
      }
    };
  };
}(Mn({ darkMode: globalThis.bcDarkMode, theme: { fontFamily: { sans: ["Inter", "sans-serif"], mono: ["Roboto Mono", "monospace"] }, extend: { borderColor: p3({}, lr), backgroundColor: p3({}, lr), textColor: p3({}, lr), backgroundImage: p3({}, cr), animation: { darken: "darken 0.2s ease-out forwards", "fade-in": "fade-in 0.2s ease-out forwards" }, keyframes: { darken: { "0%": { opacity: 0 }, "100%": { opacity: 0.5 } }, lighten: { "0%": { opacity: 0.5 }, "100%": { opacity: 0 } }, "fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } }, "fade-out": { "0%": { opacity: 1 }, "100%": { opacity: 0 } } } } }, presets: [or({})], hash: false })) : hr;
function hr(t) {
  return t;
}
var pr = "transition-all hover:brightness-90 dark:hover:brightness-110 active:scale-95 cursor-pointer";
var ur = "hover-animation";
var fr = "text-brand-mixed-light dark:text-brand-mixed-dark";
var gr = "text-foreground-light dark:text-foreground-dark";
var mr = "text-neutral-primary-light dark:text-neutral-primary-dark";
var br = "text-neutral-secondary-light dark:text-neutral-secondary-dark";
var Cr = "text-neutral-tertiary-light dark:text-neutral-tertiary-dark";
var yr = "border-neutral-secondary-light dark:border-neutral-secondary-dark";
var wr = "border-neutral-tertiary-light dark:border-neutral-tertiary-dark";
var vr;
var xr;
var $r;
var _r = (t) => t;
function kr() {
  return ae(vr || (vr = _r`<div
    class="absolute top-0 left-0 w-full h-full rounded-lg border-2 pointer-events-none ${0} opacity-5"
  ></div>`), wr);
}
function Sr(t) {
  m3.getState().connected && t(m3.getState().provider);
  const e2 = m3.subscribe(async (e3, n2) => {
    if (e3.connected && !n2.connected) {
      if (!e3.provider) throw new Error("No provider available");
      t(e3.provider);
    }
  });
  return () => {
    e2();
  };
}
function Lr(t) {
  m3.getState().connecting && t();
  const e2 = m3.subscribe(async (e3, n2) => {
    e3.connecting && !n2.connecting && t();
  });
  return () => {
    e2();
  };
}
function Ar(t) {
  const e2 = m3.subscribe(async (e3, n2) => {
    !e3.connected && n2.connected && t();
  });
  return () => {
    e2();
  };
}
function Mr(t) {
  const e2 = m3.subscribe(async (e3, n2) => {
    e3.modalOpen && !n2.modalOpen && t();
  });
  return () => {
    e2();
  };
}
function Er(t) {
  const e2 = m3.subscribe(async (e3, n2) => {
    !e3.modalOpen && n2.modalOpen && t();
  });
  return () => {
    e2();
  };
}
async function Hr() {
  let t = m3.getState().provider;
  if (!t && (Nr(), await new Promise((e2, n2) => {
    const r2 = Er(() => {
      r2(), i3(), t && e2(), n2("Modal closed without connecting");
    }), i3 = Sr((e3) => {
      t = e3;
    });
  }), !t)) throw new Error("No WebLN provider available");
  return t;
}
function Ur() {
  return console.warn("Bitcoin Connect: isConnected is deprecated and will be removed in the next major version"), m3.getState().connected;
}
function Pr(t = {}) {
  m3.getState().setBitcoinConnectConfig(t);
}
function Nr() {
  const t = document.createElement("bc-modal"), e2 = document.createElement("bc-connect");
  e2.setAttribute("closable", "closable"), t.appendChild(e2), document.body.appendChild(t), m3.getState().setModalOpen(true);
}
function Tr({ invoice: t, paymentMethods: e2, onPaid: n2, onCancelled: r2 }) {
  if (document.querySelector("bc-modal")) throw new Error("bc-modal already in DOM");
  const i3 = document.createElement("bc-modal"), o2 = document.createElement("bc-payment");
  o2.setAttribute("closable", "closable"), o2.setAttribute("invoice", t), e2 && o2.setAttribute("payment-methods", e2), i3.appendChild(o2);
  let s3 = false;
  const a3 = (t2) => {
    s3 = true, null == n2 || n2(t2.detail);
  };
  window.addEventListener("bc:onpaid", a3);
  const l4 = Er(() => {
    l4(), window.removeEventListener("bc:onpaid", a3), s3 || null == r2 || r2();
  });
  return document.body.appendChild(i3), m3.getState().setModalOpen(true), { setPaid: (t2) => {
    o2.setAttribute("paid", "paid"), o2.dispatchEvent(new CustomEvent("bc:onpaid", { bubbles: true, composed: true, detail: t2 }));
  } };
}
function Or() {
  const t = document.querySelector("bc-modal");
  t && document.body.removeChild(t), m3.getState().setModalOpen(false), m3.getState().clearRouteHistory(), m3.getState().setError(void 0);
}
function Vr() {
  m3.getState().disconnect();
}
function Rr() {
  return m3.getState().connectorConfig;
}
var Zr;
var zr = (t) => t;
var Fr = class extends dr()(Te) {
  constructor() {
    super(), this._loadBalance(), this._selectedCurrency = m3.getState().currency, m3.subscribe((t, e2) => {
      this._selectedCurrency = t.currency, t.currency !== e2.currency && this._convertBalance(), t.connected !== e2.connected && t.connected && this._loadBalance();
    });
  }
  render() {
    return ae(Zr || (Zr = zr` <span
      class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5 ${0}"
    >
      <span class="font-mono">${0} </span></span
    >`), fr, this._balance || "Loading...");
  }
  async _convertBalance() {
    if (void 0 !== this._balanceSats) if (this._selectedCurrency && "sats" !== this._selectedCurrency) try {
      const t = await C2.getFiatValue({ satoshi: this._balanceSats, currency: this._selectedCurrency }), e2 = parseFloat(t.toFixed(2));
      this._balance = new Intl.NumberFormat(void 0, { style: "currency", currency: this._selectedCurrency }).format(e2);
    } catch (t) {
      console.error(t);
    }
    else this._balance = this._balanceSats.toLocaleString(void 0, { useGrouping: true }) + " sats";
  }
  _loadBalance() {
    var t = this;
    !async function() {
      try {
        const e2 = m3.getState().provider;
        if (null == e2 || !e2.getBalance) return;
        const n2 = await e2.getBalance();
        n2 && (t._balanceSats = n2.balance, t._convertBalance());
      } catch (e2) {
        t._balance = "⚠️", console.error(e2);
      }
    }();
  }
};
b3([He()], Fr.prototype, "_balance", void 0), b3([He()], Fr.prototype, "_balanceSats", void 0), b3([He()], Fr.prototype, "_selectedCurrency", void 0), Fr = b3([Le("bc-balance")], Fr);
var jr;
var Br = (t) => t;
var Wr = (t) => le(jr || (jr = Br`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class=${0}>
<g transform="rotate(0 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(30 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="currentColor">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
  </rect>
</g>
</svg>`), t || "w-7 h-7");
var Dr;
var Ir;
var qr;
var Gr;
var Kr2;
var Jr;
var Yr;
var Qr;
var Xr = (t) => t;
var ti = class extends dr()(Te) {
  constructor() {
    super(), this.title = "Connect Wallet", this._showBalance = void 0, this._showBalance = m3.getState().bitcoinConnectConfig.showBalance && m3.getState().supports("getBalance"), m3.subscribe((t) => {
      this._showBalance = t.bitcoinConnectConfig.showBalance && t.supports("getBalance");
    });
  }
  render() {
    const t = this._connecting || !this._connected && this._modalOpen;
    return ae(Dr || (Dr = Xr`<div>
      <div
        class="relative inline-flex ${0} cursor-pointer 
          rounded-lg gap-2 justify-center items-center"
        @click=${0}
      >
        <div
          class="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none ${0}"
        ></div>
        ${0}
        <bci-button variant="primary">
          ${0}
          <span class="font-semibold">
            ${0}
          </span>
        </bci-button>
        ${0}
      </div>
    </div>`), pr, this._onClick, this._connected ? "bg-glass-light dark:bg-glass-dark" : "", this._connected ? kr() : "", t ? ae(Ir || (Ir = Xr` ${0} `), Wr("w-11 h-11 -mr-2 mr-1 -ml-2.5")) : this._connected ? null : ae(qr || (qr = Xr`<span class="-ml-0.5">${0}</span>`), Oe), t ? ae(Gr || (Gr = Xr`Connecting...`)) : this._connected ? ae(Kr2 || (Kr2 = Xr`Connected`)) : ae(Jr || (Jr = Xr`${0}`), this.title), this._connected && this._showBalance ? ae(Yr || (Yr = Xr`<bc-balance class="select-none cursor-pointer"></bc-balance> `)) : null);
  }
  _onClick() {
    Nr();
  }
};
b3([Ee()], ti.prototype, "title", void 0), b3([He()], ti.prototype, "_showBalance", void 0), ti = b3([Le("bc-button")], ti);
var ei = le(Qr || (Qr = ((t) => t)`
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
<path d="M7 16.5106L13.5511 22L23 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`));
var ni;
var ri;
var ii;
var oi;
var si;
var ai;
var li = (t) => t;
var ci = class extends dr()(Te) {
  constructor() {
    super(...arguments), this.title = "Pay Now", this.paymentMethods = "all", this._waitingForInvoice = false, this._paid = false;
  }
  updated(t) {
    var e2;
    super.updated(t), t.has("invoice") && this.invoice && this._waitingForInvoice && this._launchModal(), t.has("preimage") && this.preimage && (null == (e2 = this._setPaid) || e2.call(this, { preimage: this.preimage }));
  }
  render() {
    const t = this._waitingForInvoice || this._modalOpen;
    return ae(ni || (ni = li` <div class="inline-flex" @click=${0}>
      <bci-button variant="primary">
        ${0}
        <span class="font-semibold">
          ${0}
        </span>
      </bci-button>
    </div>`), this._onClick, t ? ae(ri || (ri = li`${0}`), Wr("w-11 h-11 -mr-2 -ml-2.5 ")) : this._paid ? ae(ii || (ii = li`<span class="-ml-0.5">${0}</span>`), ei) : ae(oi || (oi = li`<span class="-ml-0.5">${0}</span>`), Oe), t ? ae(si || (si = li`Loading...`)) : ae(ai || (ai = li`${0}`), this._paid ? "Paid" : this.title));
  }
  _onClick() {
    this._paid || (this._waitingForInvoice = true, this.invoice && this._launchModal());
  }
  _launchModal() {
    if (this._waitingForInvoice = false, !this.invoice) throw new Error("No invoice available");
    const { setPaid: t } = Tr({ onPaid: () => {
      this._paid = true;
    }, invoice: this.invoice, paymentMethods: this.paymentMethods });
    this._setPaid = t;
  }
};
b3([Ee()], ci.prototype, "title", void 0), b3([Ee()], ci.prototype, "invoice", void 0), b3([Ee({ type: String, attribute: "payment-methods" })], ci.prototype, "paymentMethods", void 0), b3([Ee({})], ci.prototype, "preimage", void 0), b3([He()], ci.prototype, "_waitingForInvoice", void 0), b3([He()], ci.prototype, "_paid", void 0), ci = b3([Le("bc-pay-button")], ci);
var di;
var hi;
var pi = (t) => t;
var ui = class extends dr()(Ne) {
  constructor() {
    super(...arguments), this.variant = "secondary", this.ghost = false, this.block = false;
  }
  render() {
    const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, e2 = window.getComputedStyle(this).getPropertyValue(t ? "--bc-color-brand-button-text-dark" : "--bc-color-brand-button-text") || window.getComputedStyle(this).getPropertyValue("--bc-color-brand-button-text");
    return ae(di || (di = pi`<button
      class="w-full relative h-10 px-4 font-sans font-semibold rounded-lg flex justify-center items-center
        ${0} rounded-lg w-full ${0}
        ${0}
        ${0}
        "
    >
      ${0}
      <!-- TODO: why can the inner border not be conditionally rendered? -->

      <div
        class="flex gap-2  ${0} justify-center items-center"
      >
        <slot></slot>
      </div>
    </button>`), this.ghost ? "" : "shadow", pr, "primary" === this.variant ? "bg-brand-light dark:bg-brand-dark" : "", "primary" === this.variant ? e2 ? "text-brand-button-text-light dark:text-brand-button-text-dark" : this._getBrandColorLuminance() > 0.5 ? "text-black" : "text-white" : "secondary" === this.variant ? `${fr}` : `${Cr}`, this.ghost ? null : "primary" === this.variant ? kr() : "secondary" === this.variant ? ae(xr || (xr = _r`<div
    class="absolute -z-10 top-0 left-0 w-full h-full border-2 rounded-lg ${0}"
  ></div>`), "border-brand-mixed-light dark:border-brand-mixed-dark") : ae($r || ($r = _r`<div
    class="absolute -z-10 top-0 left-0 w-full h-full border-2 rounded-lg ${0}"
  ></div>`), wr), this.block ? "w-full" : "");
  }
};
b3([Ee()], ui.prototype, "variant", void 0), b3([Ee({ type: Boolean })], ui.prototype, "ghost", void 0), b3([Ee({ type: Boolean })], ui.prototype, "block", void 0), ui = b3([Le("bci-button")], ui);
var fi = le(hi || (hi = ((t) => t)`
<svg class="w-14 h-14" width="55" height="54" fill="none" version="1.1" viewBox="1 0 55 54" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <rect x="31" y="1" width="24" height="24" rx="6" fill="#34D14A"/>
 <path d="M40.3358 5H44.2816V11.3676H41.8352V7.04983H39.6436L40.3358 5Z" fill="#fff"/>
 <path d="m43 21c2.4853 0 4.5-1.973 4.5-4.4068s-2.0147-4.4067-4.5-4.4067-4.5 1.9729-4.5 4.4067 2.0147 4.4068 4.5 4.4068zm2.457-4.4068c0 1.3289-1.1 2.4062-2.457 2.4062s-2.4571-1.0773-2.4571-2.4062 1.1001-2.4062 2.4571-2.4062 2.457 1.0773 2.457 2.4062z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
 <g>
  <rect x="3" y="1" width="24" height="24" rx="6" fill="url(#paint0_linear_0_1)"/>
  <g stroke="#000">
   <path d="m19.114 20.571c2.1021 0 3.0589-4.6548 3.0589-6.4197 0-1.3756-0.9492-2.2093-2.1971-2.2093-1.2401 0-2.2469 0.5332-2.2594 1.1936 0 1.7428-0.3067 7.4354 1.3976 7.4354z" fill="#fff" stroke-width=".62601"/>
   <path d="m11.436 20.571c-2.1021 0-3.0589-4.6548-3.0589-6.4197 0-1.3756 0.94922-2.2093 2.1971-2.2093 1.2401 0 2.2469 0.5332 2.2594 1.1936 0 1.7428 0.3067 7.4354-1.3976 7.4354z" fill="#fff" stroke-width=".62601"/>
   <path d="m9.6923 13.592v-1e-4l11.02-0.0266c-0.2431 2.4089-1.5497 4.4004-3.3059 5.3171-0.5801 0.3028-0.9789 0.8289-1.3292 1.2909-0.0063 0.0083-0.0126 0.0166-0.0188 0.0248l-1e-4 1e-4c-0.2847 0.3756-0.5424 0.7119-0.8573 0.9598-0.315-0.2479-0.5727-0.5842-0.8574-0.9598v-1e-4l-0.0188-0.0248c-0.3503-0.462-0.7492-0.9881-1.3293-1.2909-1.7495-0.9132-3.0528-2.8931-3.3031-5.2904z" fill="#FFDF6F" stroke-width=".62284"/>
   <ellipse cx="15.213" cy="13.545" rx="5.5089" ry="1.8363" fill="#000" stroke-width=".62601"/>
   <path d="m10.789 16.633s2.7172 0.9182 4.4655 0.9182 4.4656-0.9182 4.4656-0.9182" stroke-linecap="round" stroke-width=".62601"/>
  </g>
  <circle transform="matrix(-1 0 0 1 11.277 4.4467)" cx="1.2457" cy="1.2457" r="1.2457" fill="#000"/>
  <path d="m9.8238 5.5054 2.3252 2.3252" stroke="#000" stroke-width=".62284"/>
  <circle cx="20.204" cy="5.6923" r="1.2457" fill="#000"/>
  <path d="m20.433 5.5054-2.3253 2.3252" stroke="#000" stroke-width=".62284"/>
  <path d="m10.385 13.125c-0.67142-0.3196-1.0622-1.0373-0.93126-1.7693 0.56176-3.1416 2.9029-5.4978 5.7057-5.4978 2.8095 0 5.1552 2.3677 5.7097 5.5207 0.1289 0.7333-0.265 1.4507-0.9387 1.7677-1.4415 0.6783-3.0516 1.0575-4.7502 1.0575-1.7164 0-3.3423-0.3871-4.7952-1.0788z" clip-rule="evenodd" fill="#FFDF6F" fill-rule="evenodd"/>
  <path d="m20.869 11.379-0.3067 0.0539 0.3067-0.0539zm-11.109 0.0319c0.5428-3.0356 2.7866-5.2412 5.3991-5.2412v-0.62283c-2.993 0-5.4315 2.5069-6.0122 5.7544l0.61311 0.1096zm5.3991-5.2412c2.6188 0 4.8672 2.2164 5.403 5.2632l0.6134-0.1079c-0.5732-3.2592-3.0161-5.7781-6.0164-5.7781v0.62283zm4.6384 6.6952c-1.4009 0.6593-2.9658 1.0279-4.6176 1.0279v0.6229c1.7454 0 3.4007-0.3898 4.8828-1.0872l-0.2652-0.5636zm-4.6176 1.0279c-1.6691 0-3.2494-0.3763-4.6614-1.0485l-0.2677 0.5623c1.4939 0.7112 3.1654 1.1091 4.9291 1.1091v-0.6229zm5.3822-2.4599c0.1034 0.5879-0.2114 1.1717-0.7646 1.432l0.2652 0.5636c0.7943-0.3738 1.2673-1.2248 1.1128-2.1035l-0.6134 0.1079zm-11.415-0.1316c-0.15685 0.8771 0.31241 1.7285 1.1039 2.1053l0.2677-0.5623c-0.55123-0.2625-0.86344-0.8465-0.7585-1.4334l-0.61311-0.1096z" fill="#000"/>
  <path d="m11.583 12.345c-0.5405-0.2201-0.861-0.7951-0.6738-1.3478 0.5775-1.7043 2.2621-2.9377 4.2503-2.9377s3.6727 1.2334 4.2502 2.9377c0.1873 0.5527-0.1333 1.1276-0.6737 1.3477-1.1038 0.4496-2.3112 0.6973-3.5765 0.6973s-2.4728-0.2477-3.5765-0.6972z" clip-rule="evenodd" fill="#000" fill-rule="evenodd"/>
  <ellipse cx="16.592" cy="10.716" rx="1.0381" ry=".83045" fill="#fff"/>
  <ellipse cx="13.62" cy="10.717" rx="1.0381" ry=".83045" fill="#fff"/>
 </g>
 <path d="m51.5 40h-1.5v-4c0-0.5305-0.2107-1.0392-0.5858-1.4143-0.3751-0.375-0.8838-0.5857-1.4142-0.5857h-4v-1.5c0-0.6631-0.2634-1.299-0.7322-1.7678-0.4689-0.4689-1.1048-0.7322-1.7678-0.7322s-1.2989 0.2633-1.7678 0.7322c-0.4688 0.4688-0.7322 1.1047-0.7322 1.7678v1.5h-4c-0.5304 0-1.0391 0.2107-1.4142 0.5857-0.3751 0.3751-0.5858 0.8838-0.5858 1.4143v3.8h1.5c1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7h-1.5v3.8c0 0.5304 0.2107 1.0391 0.5858 1.4142 0.3751 0.375 0.8838 0.5858 1.4142 0.5858h3.8v-1.5c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7v1.5h3.8c0.5304 0 1.0391-0.2108 1.4142-0.5858 0.3751-0.3751 0.5858-0.8838 0.5858-1.4142v-4h1.5c0.663 0 1.2989-0.2634 1.7678-0.7323 0.4688-0.4688 0.7322-1.1047 0.7322-1.7677 0-0.6631-0.2634-1.299-0.7322-1.7678-0.4689-0.4689-1.1048-0.7322-1.7678-0.7322z" fill="#525252"/>
 <rect x="3" y="29.081" width="24" height="24" ry="6.0057" fill="url(#linearGradient28)" stroke-width="0"/>
 <g transform="matrix(.25817 0 0 .25817 5.4677 38.257)" fill="#fff">
  <path d="m0 12.6 14.013-7v-0.62903h-14.013v-4.9741h22.76v7.4611l-13.985 6.943v0.628h14.042v4.9741h-22.818z"/>
  <path d="m40.444 10.314v-0.68599c3.8542 0 6.4164-1.6083 6.4164-4.4207 0-3.7005-2.7083-5.2062-7.5676-5.2062h-14.992v20h14.992c5.2371 0 7.5676-1.8798 7.5676-4.8259 0-3.0612-1.8692-4.8612-6.4164-4.8612zm-4.0003 5.143h-4.518v-3.343h4.518c1.4611 0 2.2156 0.6591 2.2156 1.658 0 1.2923-0.8798 1.685-2.2156 1.685zm0-7.6h-4.518v-3.3161h4.518c1.172 0 2.2156 0.29013 2.2156 1.685 0 1.3285-1.2023 1.6311-2.2156 1.6311z"/>
  <path d="m47.92 0h13.784c8.3691 0 12.142 4.113 12.142 10 0 6.1834-4.5347 10-12.142 10h-13.784zm17.783 10c0-3.5306-2.4672-4.857-4.8634-4.857h-4.9491v9.714h4.9491c2.367 0 4.8634-1.3264 4.8634-4.857z"/>
 </g>
 <defs>
  <linearGradient id="paint0_linear_0_1" x1="15" x2="15" y1="1" y2="23.857" gradientUnits="userSpaceOnUse">
   <stop stop-color="#FFDE6E" offset=".6691"/>
   <stop stop-color="#F8C455" offset="1"/>
  </linearGradient>
  <linearGradient id="linearGradient28" x1="3" x2="27" y1="36.903" y2="45.382" gradientUnits="userSpaceOnUse">
   <stop stop-color="#916bf8" offset="0"/>
   <stop stop-color="#9c60dd" offset=".28564"/>
   <stop stop-color="#b44aa7" offset=".55368"/>
   <stop stop-color="#e21f3d" offset="1"/>
  </linearGradient>
 </defs>
</svg>
`));
var gi;
var mi = (t) => t;
var bi = class extends dr()(Te) {
  constructor(t, e2, n2, r2) {
    super(), this._connectorType = t, this._title = e2, this._background = n2, this._icon = r2;
  }
  render() {
    return ae(gi || (gi = mi`<div
      class="flex flex-col justify-between items-center w-32 -mx-4 cursor-pointer ${0}"
      @click=${0}
    >
      <div
        class="w-16 h-16 drop-shadow rounded-2xl flex justify-center items-center overflow-hidden"
        style="background: ${0};"
      >
        ${0}
      </div>
      <span
        class="text-sm mt-3 font-sans font-medium text-center w-28 h-7 flex justify-center items-center ${0}"
      >
        ${0}
      </span>
    </div>`), pr, this._onClick, this._background, this._icon, br, this._title);
  }
  _connect(t) {
    m3.getState().connect(p3({}, t, { connectorName: this._title, connectorType: this._connectorType }));
  }
};
var Ci;
var yi = class extends bi {
  constructor() {
    super("extension.generic", "Extension Wallets", "#ffffff", fi);
  }
  _onClick() {
    this._connect({});
  }
};
yi = b3([Le("bc-extension-connector")], yi);
var wi = le(Ci || (Ci = ((t) => t)`<svg width="45" height="64" viewBox="0 0 45 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.9716 52.1905C38.5774 52.1905 41.1289 39.7778 41.1289 35.0713C41.1289 31.4029 38.5976 29.1797 35.2699 29.1797C31.9629 29.1797 29.2782 30.6017 29.2449 32.3627C29.2448 37.01 28.4268 52.1905 32.9716 52.1905Z" fill="white" stroke="black" stroke-width="1.66938"/>
<path d="M12.4972 52.1905C6.89139 52.1905 4.33989 39.7778 4.33989 35.0713C4.33989 31.4029 6.87114 29.1797 10.1989 29.1797C13.5058 29.1797 16.1906 30.6017 16.2239 32.3627C16.224 37.01 17.0419 52.1905 12.4972 52.1905Z" fill="white" stroke="black" stroke-width="1.66938"/>
<path d="M7.84577 33.579L7.84575 33.5787C7.83973 33.5213 7.8514 33.488 7.86332 33.4663C7.87739 33.4406 7.90412 33.4101 7.949 33.3846C8.04196 33.3318 8.17216 33.3222 8.29337 33.3931C12.457 35.8337 17.2594 37.2328 22.4806 37.2328C27.7028 37.2328 32.5942 35.8065 36.7846 33.3233C36.905 33.252 37.0349 33.2608 37.1281 33.3133C37.1732 33.3386 37.2001 33.3691 37.2144 33.3949C37.2264 33.4167 37.2382 33.4501 37.2324 33.5076C36.5842 39.9314 33.0999 45.2421 28.4166 47.6866L28.4165 47.6867C26.8697 48.4942 25.8061 49.897 24.8719 51.1291L24.8218 51.1952L24.8217 51.1954C24.0624 52.197 23.3752 53.094 22.5354 53.755C21.6955 53.094 21.0084 52.197 20.2491 51.1954L20.249 51.1952C20.2323 51.1732 20.2156 51.1512 20.1989 51.1291C19.2647 49.897 18.2011 48.4942 16.6542 47.6867L16.6542 47.6866C11.9887 45.2516 8.51323 39.9716 7.84577 33.579Z" fill="#FFDF6F" stroke="black" stroke-width="1.6609"/>
<ellipse cx="22.5675" cy="33.4515" rx="14.6905" ry="4.89684" fill="black" stroke="black" stroke-width="1.66938"/>
<path d="M10.7715 41.6875C10.7715 41.6875 18.0175 44.1359 22.6797 44.1359C27.3419 44.1359 34.5879 41.6875 34.5879 41.6875" stroke="black" stroke-width="1.66938" stroke-linecap="round"/>
<circle cx="3.3218" cy="3.3218" r="3.3218" transform="matrix(-1 0 0 1 12.0703 9.19043)" fill="black"/>
<path d="M8.19579 12.0137L14.3965 18.2144" stroke="black" stroke-width="1.6609"/>
<circle cx="35.8784" cy="12.5122" r="3.3218" fill="black"/>
<path d="M36.4878 12.0137L30.2871 18.2144" stroke="black" stroke-width="1.6609"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.69481 32.3343C7.90447 31.482 6.86251 29.568 7.21154 27.6161C8.70958 19.2385 14.9526 12.9551 22.4267 12.9551C29.9188 12.9551 36.174 19.269 37.6526 27.677C37.9965 29.6325 36.946 31.5456 35.1496 32.391C31.3055 34.1999 27.0119 35.2111 22.482 35.2111C17.9051 35.2111 13.5693 34.1788 9.69481 32.3343Z" fill="#FFDF6F"/>
<path d="M37.6526 27.677L36.8347 27.8209L37.6526 27.677ZM8.02903 27.7623C9.47654 19.6673 15.46 13.7855 22.4267 13.7855V12.1246C14.4452 12.1246 7.94263 18.8097 6.39406 27.4699L8.02903 27.7623ZM22.4267 13.7855C29.4101 13.7855 35.4059 19.696 36.8347 27.8209L38.4705 27.5332C36.9421 18.842 30.4275 12.1246 22.4267 12.1246V13.7855ZM34.796 31.6396C31.0602 33.3976 26.8871 34.3807 22.482 34.3807V36.0416C27.1366 36.0416 31.5508 35.0023 35.5032 33.1424L34.796 31.6396ZM22.482 34.3807C18.0312 34.3807 13.8172 33.377 10.0518 31.5845L9.33786 33.0841C13.3215 34.9806 17.779 36.0416 22.482 36.0416V34.3807ZM36.8347 27.8209C37.1104 29.3886 36.2709 30.9454 34.796 31.6396L35.5032 33.1424C37.6211 32.1457 38.8825 29.8763 38.4705 27.5332L36.8347 27.8209ZM6.39406 27.4699C5.97582 29.8089 7.22718 32.0793 9.33786 33.0841L10.0518 31.5845C8.58176 30.8847 7.7492 29.3272 8.02903 27.7623L6.39406 27.4699Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.8892 30.2522C11.4481 29.6652 10.5932 28.1319 11.0926 26.6582C12.6325 22.1132 17.1248 18.8242 22.4266 18.8242C27.7285 18.8242 32.2208 22.1132 33.7607 26.6582C34.2601 28.1319 33.4052 29.6652 31.9641 30.2522C29.0207 31.4509 25.8008 32.1114 22.4266 32.1114C19.0525 32.1114 15.8326 31.4509 12.8892 30.2522Z" fill="black"/>
<ellipse cx="26.2447" cy="25.9098" rx="2.76817" ry="2.21453" fill="white"/>
<ellipse cx="18.3209" cy="25.9118" rx="2.76817" ry="2.21453" fill="white"/>
</svg>
`));
var vi;
var xi = class extends bi {
  constructor() {
    super("nwc.alby", "Alby Account", "linear-gradient(180deg, #FFDE6E 63.72%, #F8C455 95.24%)", wi);
  }
  async _onClick() {
    var e2;
    const n2 = H.NostrWebLNProvider.withNewSecret(), r2 = m3.getState().bitcoinConnectConfig.providerConfig;
    await n2.initNWC(p3({}, (null == r2 || null == (e2 = r2.nwc) ? void 0 : e2.authorizationUrlOptions) || {}, { name: this._appName })), this._connect({ nwcUrl: n2.getNostrWalletConnectUrl(true) });
  }
};
xi = b3([Le("bc-alby-nwc-connector")], xi);
var $i = le(vi || (vi = ((t) => t)`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none"><g style="display:inline"><g fill="#5351fb" fill-rule="evenodd" clip-rule="evenodd" style="display:inline;fill:#fff"><path d="M85.331 184.218c-6.917 0-11.155 2.022-13.85 5.2a6.182 6.182 0 0 1-9.43-7.993c5.653-6.67 13.792-9.571 23.28-9.571 7.975 0 15.284 2.025 21.77 6.105 6.72-3.983 13.8-6.105 21.176-6.105 7.212 0 14.02 2.03 20.35 5.892 5.65-3.803 12.43-5.551 19.984-5.551 9.476 0 17.823 2.744 24.606 8.52a6.182 6.182 0 0 1-8.017 9.413c-4.246-3.616-9.63-5.57-16.589-5.57-6.572 0-11.296 1.74-14.748 4.719a7.727 7.727 0 0 1-9.545.435l-.11-.078c-5.225-3.71-10.498-5.416-15.93-5.416-5.532 0-11.148 1.77-16.945 5.692a7.728 7.728 0 0 1-8.945-.202l-.192-.143c-4.85-3.55-10.398-5.348-16.864-5.348z" style="fill:#fff" transform="matrix(.35359 0 0 .35359 -13.26 -25.708)"/><path d="M162.587 149.19c-9.016-7.82-20.638-11.791-35.402-11.507-14.833.285-26.352 4.547-35.094 12.368-8.816 7.887-15.392 19.916-19.275 36.76a6.182 6.182 0 1 1-12.047-2.776c4.261-18.487 11.803-33.11 23.078-43.197 11.351-10.154 25.895-15.186 43.101-15.517 17.275-.332 32.033 4.375 43.741 14.53 11.605 10.066 19.632 24.98 24.534 44.03a6.182 6.182 0 0 1-11.974 3.08c-4.505-17.51-11.544-29.863-20.66-37.77z" style="fill:#fff" transform="matrix(.35359 0 0 .35359 -13.26 -25.708)"/></g></g></svg>`));
var _i;
var ki = class extends bi {
  constructor() {
    super("nwc.umbrel", "Umbrel", "#5250fb", $i);
  }
  async _onClick() {
    m3.getState().pushRoute("/umbrel");
  }
};
ki = b3([Le("bc-umbrel-nwc-connector")], ki);
var Si = le(_i || (_i = ((t) => t)`<svg class="w-10 h-10" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M43.7274 23.9471C41.9608 25.7054 39.52 25.284 37.7615 23.5178C37.7615 23.5178 37.7615 23.5178 37.7613 23.5175L23.53 9.22225L30.1989 2.52452C32.1302 0.584715 35.4069 1.18529 36.5245 3.68405L43.9437 23.0097C44.0657 23.3272 43.9888 23.6869 43.7476 23.927L39.0614 28.5911L43.7272 23.9471H43.7274Z" fill="#472459"/>
<path d="M37.7607 24.8117C37.7607 24.8117 37.7607 24.8117 37.7604 24.8114L19.145 6.11204C17.3862 4.34557 14.5285 4.33895 12.7616 6.0972L1.32946 17.4755C-0.437483 19.234 -0.443845 22.0913 1.31462 23.8581L19.9298 42.5572C21.6886 44.3237 24.5463 44.3303 26.3132 42.572L29.9892 38.9135L31.0661 37.8417L27.6301 34.393C25.0886 36.0405 21.656 35.7473 19.4344 33.512L17.0962 31.1593C16.7639 30.8248 16.7654 30.2897 17.1 29.9574L18.2506 28.814L15.3608 25.9063C14.9078 25.4504 14.8368 24.7173 15.2453 24.2238C15.7126 23.6572 16.5555 23.6307 17.0634 24.1417L19.9897 27.0862L22.2839 24.8069L19.3941 21.8992C18.9411 21.4433 18.8701 20.7102 19.2823 20.2133C19.753 19.6504 20.5925 19.6201 21.1004 20.1311L24.0267 23.0757L25.1811 21.9286C25.5156 21.5963 26.0508 21.5978 26.3832 21.9323L28.7213 24.2851C30.9432 26.5206 31.2143 29.955 29.55 32.4858L32.9844 35.9326L34.9417 33.9846L37.7453 31.194L43.7263 25.2413C41.9597 26.9996 39.5189 26.5781 37.7602 24.8119L37.7607 24.8117Z" fill="url(#paint0_linear_856_1234)"/>
<defs>
<linearGradient id="paint0_linear_856_1234" x1="21.8632" y1="4.78284" x2="21.8632" y2="43.8864" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFCA4A"/>
<stop offset="1" stop-color="#F7931A"/>
</linearGradient>
</defs>
</svg>`));
var Li = "Nostr Wallet Connect";
var Ai;
var Mi = class extends bi {
  constructor() {
    super("nwc.generic", Li, "#ffffff", Si);
  }
  async _onClick() {
    m3.getState().pushRoute("/nwc");
  }
};
Mi = b3([Le("bc-nwc-connector")], Mi);
var Ei = le(Ai || (Ai = ((t) => t)`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10">
<path d="M2.5 28.4H5.08333V29.7H8.95833V28.4H10.25V15.4H11.5417V12.8H10.25V11.5H7.66667V12.8H6.375V14.1H5.08333V15.4H8.95833V18H7.66667V19.3H5.08333V18H3.79167V12.8H5.08333V11.5H6.375V10.2H14.125V11.5H15.4167V12.8H16.7083V15.4H18V18H19.2917V19.3H20.5833V16.7H21.875V15.4H23.1667V12.8H24.4583V10.2H25.75V8.9H27.0417V6.3H29.625V5H32.2083V6.3H33.5V7.6H30.9167V6.3H29.625V7.6H28.3333V23.2H29.625V29.7H30.9167V31H25.75V29.7H24.4583V16.7H23.1667V18H21.875V20.6H20.5833V23.2H19.2917V25.8H16.7083V23.2H15.4167V20.6H14.125V16.7H12.8333V24.5H11.5417V28.4H10.25V29.7H8.95833V31H3.79167V29.7H2.5V28.4Z" fill="#f42058"/>
</svg>`));
var Hi = "Mutiny";
var Ui;
var Pi2 = class extends bi {
  constructor() {
    super("nwc.mutiny", Hi, "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(3,33,93,1) 100%)", Ei);
  }
  async _onClick() {
    m3.getState().pushRoute("/mutiny");
  }
};
Pi2 = b3([Le("bc-mutiny-nwc-connector")], Pi2);
var Ni = le(Ui || (Ui = ((t) => t)`<svg class="w-10 h-10" width="28" height="55" viewBox="0 0 28 55" xmlns="http://www.w3.org/2000/svg"><g fill="#ffffff" fill-rule="nonzero"><path d="M27.25 30.506L11.354 53.692a.84.84 0 11-1.385-.954l15.896-23.185a.84.84 0 111.385.953zM25.16 26.374L9.629 49.082a.84.84 0 01-1.385-.954L23.776 25.42a.84.84 0 011.385.954zM20.438 1.576L2.43 27.895h16.895l-1.136 1.68H.363a.84.84 0 01-.227-1.158L19.006.622a.84.84 0 011.159-.227c.398.253.52.78.273 1.181z"></path><path d="M22.118 6.617L10.24 23.99h11.763l-1.158 1.68H7.062l1.136-1.68L20.733 5.686a.84.84 0 011.385.931z"></path></g></svg>`));
var Ti;
var Oi = class extends bi {
  constructor() {
    super("lnc", "Lightning Node Connect", "#101727", Ni);
  }
  async _onClick() {
    const t = window.prompt("Enter pairing phrase");
    if (!t) return;
    const e2 = await l2();
    if (!e2) throw new Error("LNC not supported");
    e2.credentials.pairingPhrase = t, this._connect({});
  }
};
Oi = b3([Le("bc-lnc-connector")], Oi);
var Vi = le(Ti || (Ti = ((t) => t)`<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 17.5H34.4V23.1H40V17.5Z" fill="#041011"/>
<path d="M16.7 0V5.6L27.8 8.9L22.2 0H16.7Z" fill="#041011"/>
<path d="M29.4 35H35L36.7 25L29.4 29.4V35Z" fill="#041011"/>
<path d="M35 5H29.4V10.6L36.1 16.1L35 5Z" fill="#041011"/>
<path d="M16.7 40H22.2L27.8 29.4L16.7 34.4V40Z" fill="#041011"/>
<path d="M5 29.4V35H10.6L22.2 26.7L5 29.4Z" fill="#041011"/>
<path d="M18.9 18.6L5.6 17.5H0V23.1H5.6L18.9 18.6Z" fill="#041011"/>
<path d="M10.6 5H5V10.6L21.1 12.8L10.6 5Z" fill="#041011"/>
</svg>
`));
var Ri = "LN Link";
var Zi = class extends bi {
  constructor() {
    super("nwc.generic", Ri, "#ffffff", Vi);
  }
  async _onClick() {
    m3.getState().pushRoute("/lnfi");
  }
};
Zi = b3([Le("bc-lnfi-nwc-connector")], Zi);
var zi;
var Fi;
var ji;
var Bi;
var Wi;
var Di;
var Ii;
var qi;
var Gi;
var Ki;
var Ji = (t) => t;
var Yi = class extends dr()(Te) {
  render() {
    const t = [];
    return t.push(ae(zi || (zi = Ji`<bc-alby-nwc-connector></bc-alby-nwc-connector>`))), t.push(ae(Fi || (Fi = Ji`<bc-mutiny-nwc-connector></bc-mutiny-nwc-connector>`))), t.push(ae(ji || (ji = Ji`<bc-umbrel-nwc-connector></bc-umbrel-nwc-connector>`))), t.push(ae(Bi || (Bi = Ji`<bc-nwc-connector></bc-nwc-connector>`))), t.push(ae(Wi || (Wi = Ji`<bc-lnfi-nwc-connector></bc-lnfi-nwc-connector>`))), this._filters && -1 !== this._filters.indexOf("nwc") || (window.webln && t.push(ae(Di || (Di = Ji`<bc-extension-connector></bc-extension-connector>`))), t.push(ae(Ii || (Ii = Ji`<bc-lnbits-connector></bc-lnbits-connector>`))), t.push(ae(qi || (qi = Ji`<bc-lnc-connector></bc-lnc-connector>`)))), ae(Gi || (Gi = Ji`
      <div class="flex justify-center items-start flex-wrap gap-5">
        ${0}
      </div>
    `), t);
  }
};
Yi = b3([Le("bc-connector-list")], Yi);
var Qi = le(Ki || (Ki = ((t) => t)`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
<path d="M11.25 20.25H4.75C4.19772 20.25 3.75 19.8023 3.75 19.25L3.75 4.75C3.75 4.19772 4.19772 3.75 4.75 3.75L11.25 3.75" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.25 12L9 12M20.25 12L15.75 16.5M20.25 12L15.75 7.5" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="hover-right"/>
</svg>`));
var Xi;
var to;
var eo = (t) => t;
function no(t) {
  return ae(Xi || (Xi = eo`<div class="mt-12">
    <span class="text-xs mb-1 ${0}"
      >Connected through <span class="font-bold">${0}</span></span
    >

    <bci-button
      @click=${0}
      ghost
      variant="neutral"
      class=${0}
    >
      ${0}
      <span class="text-sm ${0}"
        >Disconnect</span
      >
    </bci-button>
  </div>`), br, t, ro, ur, Qi, Cr);
}
function ro() {
  m3.getState().setModalOpen(false), setTimeout(() => {
    m3.getState().disconnect();
  }, 200);
}
var io = le(to || (to = ((t) => t)`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.6665 7.16699L12.4998 12.0003M12.4998 12.0003L17.3332 16.8337M12.4998 12.0003L17.3332 7.16699M12.4998 12.0003L7.6665 16.8337" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`));
var oo;
var so;
var ao;
var lo;
var co = (t) => t;
var ho = class extends dr()(Te) {
  constructor() {
    super(), this._isSwitchingCurrency = false, this._selectedCurrency = m3.getState().currency, m3.subscribe((t) => {
      this._selectedCurrency = t.currency;
    });
  }
  render() {
    const t = [{ name: "SATS", value: "sats" }];
    try {
      t.push(...Intl.supportedValuesOf("currency").map((t2) => ({ name: t2, value: t2 })));
    } catch (e2) {
      t.push({ name: "USD", value: "USD" });
    }
    return ae(oo || (oo = co`<div class="flex justify-center items-center gap-2">
      ${0}
    </div>`), this._isSwitchingCurrency ? ae(so || (so = co`
            <br />
            <select
              class="${0} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              @change=${0}
            >
              ${0}
            </select>
            <div
              class="${0} ${0}"
              @click=${0}
            >
              ${0}
            </div>
          `), fr, (t2) => this._handleCurrencyChange(t2), t.map((t2) => ae(ao || (ao = co`
                  <option
                    value=${0}
                    ?selected=${0}
                  >
                    ${0}
                  </option>
                `), t2.value, this._selectedCurrency === t2.value, t2.name)), pr, Cr, this._toggleSelectVisibility, io) : ae(lo || (lo = co`<div
            class="${0}"
            @click=${0}
          >
            <slot></slot>
          </div>`), pr, this._toggleSelectVisibility));
  }
  _toggleSelectVisibility() {
    this._isSwitchingCurrency = !this._isSwitchingCurrency;
  }
  _handleCurrencyChange(t) {
    const e2 = t.target.value;
    m3.getState().setCurrency(e2);
  }
};
b3([He()], ho.prototype, "_isSwitchingCurrency", void 0), b3([He()], ho.prototype, "_selectedCurrency", void 0), ho = b3([Le("bc-currency-switcher")], ho);
var po;
var uo;
var fo;
var go;
var mo;
var bo;
var Co = (t) => t;
var yo = class extends dr()(Te) {
  constructor() {
    super(), this._showBalance = void 0, this._showBalance = m3.getState().bitcoinConnectConfig.showBalance && m3.getState().supports("getBalance"), m3.subscribe((t) => {
      this._showBalance = t.bitcoinConnectConfig.showBalance && t.supports("getBalance");
    });
  }
  render() {
    return ae(po || (po = Co`<div
      class="flex flex-col justify-center items-center w-full font-sans"
    >
      ${0}
    </div>`), this._connected ? ae(uo || (uo = Co`
            ${0}
            ${0}
          `), ae(this._showBalance ? fo || (fo = Co`<span
                    class="text-xs font-medium mb-2 ${0}"
                    >Balance</span
                  >
                  <bc-currency-switcher>
                    <bc-balance class="text-2xl"></bc-balance>
                  </bc-currency-switcher>`) : go || (go = Co` <span
                  class="text-lg font-medium mt-4 -mb-4 ${0}"
                  >Wallet Connected</span
                >`), br), no(this._connectorName)) : ae(mo || (mo = Co`
            <h1
              class="my-8 ${0} w-64 max-w-full text-center"
            >
              How would you like to
              connect${0}?
            </h1>

            <bc-connector-list></bc-connector-list>

            <div class="flex flex-col items-center w-full font-sans text-sm">
              <h1 class="mt-8 ${0} text-center">
                Don't have a bitcoin lightning wallet?
                <a
                  class="no-underline font-bold ${0} ${0} "
                  @click=${0}
                  >Get one here</a
                >
              </h1>
            </div>
          `), mr, this._appName ? `
to ${this._appName}` : "", mr, pr, fr, () => m3.getState().pushRoute("/new-wallet")));
  }
};
b3([He()], yo.prototype, "_showBalance", void 0), yo = b3([Le("bc-start")], yo);
var wo = le(bo || (bo = ((t) => t)`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7">
<path d="M14.2929 16L10.6464 12.3536C10.4512 12.1583 10.4512 11.8417 10.6464 11.6464L14.2929 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`));
var vo;
var xo;
var $o = (t) => t;
var _o = class extends dr()(Te) {
  constructor() {
    super(...arguments), this._goBack = () => {
      m3.getState().popRoute(), m3.getState().setError(void 0);
    };
  }
  render() {
    return ae(vo || (vo = $o`<div
      class="flex justify-center items-center gap-2 w-full relative pb-4"
    >
      <div class="absolute left-8 h-full flex items-center justify-center">
        <div
          class="${0} ${0}"
          @click=${0}
        >
          ${0}
        </div>
      </div>
      <div class="font-sans font-medium ${0}">
        ${0}
      </div>
    </div>`), pr, Cr, this._goBack, wo, br, this.heading);
  }
};
b3([Ee()], _o.prototype, "heading", void 0), _o = b3([Le("bc-navbar")], _o);
var ko = le(xo || (xo = ((t) => t)`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 6H6.1C5.53995 6 5.25992 6 5.04601 6.10899C4.85785 6.20487 4.70487 6.35785 4.60899 6.54601C4.5 6.75992 4.5 7.03995 4.5 7.6V18.4C4.5 18.9601 4.5 19.2401 4.60899 19.454C4.70487 19.6422 4.85785 19.7951 5.04601 19.891C5.25992 20 5.53995 20 6.1 20H16.9C17.4601 20 17.7401 20 17.954 19.891C18.1422 19.7951 18.2951 19.6422 18.391 19.454C18.5 19.2401 18.5 18.9601 18.5 18.4V15" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 4H20.5M20.5 4V10M20.5 4L11.5 13" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="hover-right-up"/>
</svg>`));
var So;
var Lo;
var Ao;
var Mo = (t) => t;
function Eo(t) {
  const e2 = `border-t ${wr} ${t ? "w-24" : "w-full"}`;
  return ae(So || (So = Mo`<div
    class="w-full px-8 flex gap-4 justify-center items-center opacity-60 dark:opacity-60"
  >
    <hr class=${0} />
    ${0}
  </div>`), e2, t ? ae(Lo || (Lo = Mo`
          <span class=${0}>${0}</span>
          <hr class=${0} />
        `), Cr, t, e2) : null);
}
var Ho = le(Ao || (Ao = ((t) => t)`<svg width="49" height="24" viewBox="0 0 49 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 -my-4">
<ellipse opacity="0.1" cx="7.70773" cy="21.5226" rx="3.4509" ry="0.637088" fill="black"/>
<path d="M11.0342 18.4211C12.817 18.4211 13.6285 14.4735 13.6285 12.9767C13.6285 11.8101 12.8235 11.103 11.7652 11.103C10.7135 11.103 9.85965 11.5553 9.84905 12.1153C9.84902 13.5933 9.5889 18.4211 11.0342 18.4211Z" fill="white" stroke="currentColor" stroke-width="0.530907"/>
<path d="M4.52264 18.4211C2.73985 18.4211 1.9284 14.4735 1.9284 12.9767C1.9284 11.8101 2.7334 11.103 3.79171 11.103C4.84341 11.103 5.69723 11.5553 5.70784 12.1153C5.70786 13.5933 5.96799 18.4211 4.52264 18.4211Z" fill="white" stroke="currentColor" stroke-width="0.530907"/>
<mask id="path-4-inside-1_362_874" fill="white">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6445 12.5235C12.6735 12.2374 12.352 12.0646 12.1046 12.2113C10.8114 12.9776 9.30208 13.4175 7.68997 13.4175C6.09291 13.4175 4.59668 12.9858 3.31165 12.2326C3.06376 12.0873 2.74334 12.2612 2.77318 12.547C2.9933 14.6548 4.14156 16.4192 5.71508 17.2405C6.15438 17.4698 6.46173 17.8751 6.77033 18.282C7.0197 18.6108 7.26988 18.9407 7.59116 19.1797C7.62857 19.2075 7.66755 19.2222 7.70759 19.2222C7.74762 19.2222 7.78658 19.2075 7.82397 19.1797C8.14538 18.9407 8.39562 18.6108 8.64504 18.2819C8.9536 17.875 9.26091 17.4698 9.70016 17.2405C11.2796 16.4162 12.4305 14.6418 12.6445 12.5235Z"/>
</mask>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6445 12.5235C12.6735 12.2374 12.352 12.0646 12.1046 12.2113C10.8114 12.9776 9.30208 13.4175 7.68997 13.4175C6.09291 13.4175 4.59668 12.9858 3.31165 12.2326C3.06376 12.0873 2.74334 12.2612 2.77318 12.547C2.9933 14.6548 4.14156 16.4192 5.71508 17.2405C6.15438 17.4698 6.46173 17.8751 6.77033 18.282C7.0197 18.6108 7.26988 18.9407 7.59116 19.1797C7.62857 19.2075 7.66755 19.2222 7.70759 19.2222C7.74762 19.2222 7.78658 19.2075 7.82397 19.1797C8.14538 18.9407 8.39562 18.6108 8.64504 18.2819C8.9536 17.875 9.26091 17.4698 9.70016 17.2405C11.2796 16.4162 12.4305 14.6418 12.6445 12.5235Z" fill="#FFDF6F"/>
<path d="M5.71508 17.2405L5.96074 16.7698L5.71508 17.2405ZM6.77033 18.282L6.34731 18.6028H6.34731L6.77033 18.282ZM7.59116 19.1797L7.27429 19.6057L7.27429 19.6057L7.59116 19.1797ZM7.82397 19.1797L8.14076 19.6058L8.14076 19.6058L7.82397 19.1797ZM8.64504 18.2819L8.22202 17.9611L8.22202 17.9611L8.64504 18.2819ZM9.70016 17.2405L9.94582 17.7112H9.94582L9.70016 17.2405ZM12.1046 12.2113L12.3752 12.668L12.1046 12.2113ZM12.6445 12.5235L12.1163 12.4702L12.6445 12.5235ZM11.8339 11.7545C10.6205 12.4737 9.20424 12.8866 7.68997 12.8866V13.9484C9.39992 13.9484 11.0024 13.4815 12.3752 12.668L11.8339 11.7545ZM7.68997 12.8866C6.18981 12.8866 4.78593 12.4813 3.5801 11.7746L3.0432 12.6907C4.40743 13.4902 5.996 13.9484 7.68997 13.9484V12.8866ZM2.24515 12.6022C2.48098 14.8605 3.71574 16.7958 5.46941 17.7111L5.96074 16.7698C4.56738 16.0426 3.50562 14.4492 3.30122 12.4919L2.24515 12.6022ZM5.46941 17.7111C5.78479 17.8758 6.0236 18.1759 6.34731 18.6028L7.19335 17.9612C6.89987 17.5742 6.52397 17.0638 5.96074 16.7698L5.46941 17.7111ZM6.34731 18.6028C6.58755 18.9196 6.88185 19.3137 7.27429 19.6057L7.90804 18.7537C7.65791 18.5676 7.45184 18.302 7.19335 17.9612L6.34731 18.6028ZM7.27429 19.6057C7.38246 19.6861 7.5299 19.7531 7.70759 19.7531V18.6913C7.80519 18.6913 7.87468 18.7289 7.90803 18.7537L7.27429 19.6057ZM7.70759 19.7531C7.8852 19.7531 8.03259 19.6862 8.14076 19.6058L7.50719 18.7537C7.54057 18.7289 7.61005 18.6913 7.70759 18.6913V19.7531ZM8.14076 19.6058C8.53339 19.3138 8.82778 18.9195 9.06806 18.6027L8.22202 17.9611C7.96346 18.302 7.75738 18.5677 7.50719 18.7537L8.14076 19.6058ZM9.06806 18.6027C9.39174 18.1759 9.6305 17.8758 9.94582 17.7112L9.45451 16.7699C8.89133 17.0638 8.51547 17.5741 8.22202 17.9611L9.06806 18.6027ZM9.94582 17.7112C11.706 16.7925 12.9435 14.8462 13.1728 12.5769L12.1163 12.4702C11.9176 14.4373 10.8531 16.0399 9.45451 16.7699L9.94582 17.7112ZM3.5801 11.7746C3.28427 11.6012 2.93961 11.6167 2.67587 11.7666C2.40507 11.9206 2.20605 12.2278 2.24515 12.6022L3.30122 12.4919C3.30493 12.5275 3.29778 12.5713 3.27544 12.6121C3.25447 12.6503 3.22616 12.6752 3.20065 12.6897C3.15164 12.7176 3.09113 12.7188 3.0432 12.6907L3.5801 11.7746ZM12.3752 12.668C12.3274 12.6963 12.2669 12.6954 12.2177 12.6677C12.1921 12.6533 12.1637 12.6286 12.1426 12.5903C12.12 12.5496 12.1127 12.5057 12.1163 12.4702L13.1728 12.5769C13.2106 12.2021 13.0103 11.8954 12.7386 11.7425C12.4741 11.5936 12.1291 11.5796 11.8339 11.7545L12.3752 12.668Z" fill="black" mask="url(#path-4-inside-1_362_874)"/>
<ellipse cx="7.72545" cy="12.4621" rx="4.67198" ry="1.55733" fill="black" stroke="black" stroke-width="0.530907"/>
<path d="M3.97363 15.0811C3.97363 15.0811 6.27807 15.8597 7.76077 15.8597C9.24347 15.8597 11.5479 15.0811 11.5479 15.0811" stroke="black" stroke-width="0.530907" stroke-linecap="round"/>
<circle cx="1.05642" cy="1.05642" r="1.05642" transform="matrix(-1 0 0 1 4.38745 4.74609)" fill="black"/>
<path d="M3.15497 5.64404L5.12695 7.61603" stroke="black" stroke-width="0.528211"/>
<circle cx="11.9585" cy="5.80252" r="1.05642" fill="black"/>
<path d="M12.1522 5.64404L10.1802 7.61603" stroke="black" stroke-width="0.528211"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.63088 12.1065C3.0615 11.8354 2.73014 11.2267 2.84114 10.606C3.31755 7.94167 5.303 5.94336 7.67995 5.94336C10.0627 5.94336 12.052 7.95136 12.5222 10.6253C12.6316 11.2472 12.2975 11.8556 11.7262 12.1245C10.5037 12.6998 9.13817 13.0214 7.69756 13.0214C6.24199 13.0214 4.86309 12.6931 3.63088 12.1065Z" fill="#FFDF6F"/>
<path d="M12.5222 10.6253L12.7823 10.5796L12.5222 10.6253ZM11.7262 12.1245L11.8386 12.3635L11.7262 12.1245ZM2.84114 10.606L3.10112 10.6525L2.84114 10.606ZM3.63088 12.1065L3.7444 11.868L3.63088 12.1065ZM3.10112 10.6525C3.56146 8.07803 5.46436 6.20746 7.67995 6.20746V5.67925C5.14164 5.67925 3.07364 7.8053 2.58115 10.5595L3.10112 10.6525ZM7.67995 6.20746C9.90088 6.20746 11.8077 8.08716 12.2621 10.6711L12.7823 10.5796C12.2962 7.81556 10.2244 5.67925 7.67995 5.67925V6.20746ZM11.6137 11.8855C10.4257 12.4446 9.09849 12.7573 7.69756 12.7573V13.2855C9.17785 13.2855 10.5817 12.955 11.8386 12.3635L11.6137 11.8855ZM7.69756 12.7573C6.28209 12.7573 4.9419 12.4381 3.7444 11.868L3.51736 12.3449C4.78428 12.9481 6.20189 13.2855 7.69756 13.2855V12.7573ZM12.2621 10.6711C12.3498 11.1697 12.0828 11.6648 11.6137 11.8855L11.8386 12.3635C12.5122 12.0465 12.9134 11.3248 12.7823 10.5796L12.2621 10.6711ZM2.58115 10.5595C2.44814 11.3033 2.84611 12.0254 3.51736 12.3449L3.7444 11.868C3.2769 11.6455 3.01213 11.1501 3.10112 10.6525L2.58115 10.5595Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.64674 11.4442C4.18843 11.2575 3.91656 10.7699 4.07537 10.3012C4.56513 8.8558 5.99378 7.80981 7.67991 7.80981C9.36604 7.80981 10.7947 8.8558 11.2845 10.3012C11.4433 10.7699 11.1714 11.2575 10.7131 11.4442C9.777 11.8254 8.75299 12.0355 7.67991 12.0355C6.60684 12.0355 5.58282 11.8254 4.64674 11.4442Z" fill="black"/>
<ellipse cx="8.895" cy="10.0634" rx="0.880351" ry="0.704281" fill="white"/>
<ellipse cx="6.37474" cy="10.0639" rx="0.880351" ry="0.704281" fill="white"/>
<path d="M25.3078 11.6284L24.3574 9.04272L23.4489 11.6284H25.3078ZM23.1274 5.99577H25.6712L29.2213 15.3882L26.7195 15.6398L26.0346 13.6271H22.75L22.0931 15.5H19.5633L23.1274 5.99577ZM32.463 15.5H29.9193V5.78612L32.463 5.63238V15.5ZM35.1432 15.5H33.8573V5.78612L36.4011 5.63238V14.2281L35.1432 15.5ZM35.5765 11.3629L34.8637 9.72758C35.0314 9.52259 35.2457 9.32691 35.5066 9.14055C35.7768 8.94488 36.075 8.78647 36.4011 8.66534C36.7272 8.54421 37.0627 8.48364 37.4074 8.48364C38.0783 8.48364 38.6747 8.60943 39.1965 8.86102C39.7183 9.1126 40.1283 9.49929 40.4264 10.0211C40.7339 10.5429 40.8877 11.2091 40.8877 12.0198C40.8877 12.8211 40.7339 13.492 40.4264 14.0324C40.1283 14.5729 39.709 14.9782 39.1685 15.2484C38.6374 15.5186 38.0131 15.6537 37.2956 15.6537C37.0161 15.6537 36.7366 15.6118 36.457 15.528C36.1868 15.4441 35.9166 15.3136 35.6464 15.1366C35.3855 14.9502 35.1246 14.708 34.8637 14.4098L35.5765 12.9143C35.8467 13.1659 36.1123 13.3615 36.3732 13.5013C36.6341 13.6318 36.8856 13.697 37.1279 13.697C37.3422 13.697 37.5332 13.6318 37.701 13.5013C37.8687 13.3709 38.0038 13.1799 38.1063 12.9283C38.2088 12.6767 38.26 12.3785 38.26 12.0338C38.26 11.689 38.2088 11.4001 38.1063 11.1672C38.0131 10.9249 37.8733 10.7432 37.687 10.6221C37.5099 10.501 37.2863 10.4404 37.0161 10.4404C36.7925 10.4404 36.5642 10.5243 36.3312 10.692C36.0983 10.8597 35.8467 11.0833 35.5765 11.3629ZM43.4036 15.528L43.4595 15.3742L41.0275 9.14055L43.3757 8.46967L44.7594 12.5509L46.0592 8.72125H48.589L45.6119 16.2967C45.4722 16.6601 45.2439 16.9955 44.9271 17.303C44.6103 17.6105 44.2422 17.8714 43.8229 18.0857C43.4036 18.3 42.9703 18.4584 42.5231 18.5609L41.6705 16.5902C41.8941 16.497 42.1271 16.3945 42.3693 16.2827C42.6209 16.1709 42.8445 16.0498 43.0402 15.9193C43.2359 15.7889 43.357 15.6584 43.4036 15.528Z" fill="currentColor"/>
</svg>
`));
var Uo;
var Po = (t) => t;
var No = class extends dr()(Te) {
  render() {
    return ae(Uo || (Uo = Po`<div>
      <bc-navbar class="flex w-full" heading="About"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8">
          <div class="font-bold mb-1 ${0}">
            How does it work?
          </div>
          <p class="mb-2 ${0}">
            Bitcoin Connect is a way to connect to your lightning wallet from
            any browser.
          </p>
          <div class="flex flex-col gap-3 ${0}">
            <p>
              💾 Your connection is saved in local storage, so next time you
              visit the site will connect automatically.
            </p>
            <p>
              💸 Make sure to set budgets and permissions for sites you do not
              trust.
            </p>
          </div>
        </div>

        <div class="flex gap-4 w-full my-6 px-8">
          <a
            href="https://bitcoin-connect.com"
            target="_blank"
            class="${0} flex-1"
          >
            <bci-button>
              <span class="${0}">Learn more</span>
              ${0}
            </bci-button>
          </a>
          <a
            href="https://github.com/getAlby/bitcoin-connect"
            target="_blank"
            class="${0} flex-1"
          >
            <bci-button>
              <span class="${0}">Use it</span>
              ${0}
            </bci-button>
          </a>
        </div>
        ${0}
        <div
          class="flex w-full justify-center items-center mt-4 gap-1 font-sans"
        >
          <span class="block ${0}"
            >Made with love by</span
          >
          <span class="${0}"> ${0} </span>
        </div>
      </div>
    </div>`), fr, br, br, ur, fr, ko, ur, fr, ko, Eo(), Cr, gr, Ho);
  }
};
No = b3([Le("bc-help")], No);
var To;
var Oo = (t) => t;
var Vo = class extends dr()(Te) {
  constructor() {
    super(...arguments), this._nwcUrl = "";
  }
  render() {
    return ae(To || (To = Oo`<div class="w-full">
      <bc-navbar class="flex w-full" heading="Nostr Wallet Connect"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-1 ${0}">
            Enter your
            <a
              href="https://nwc.getalby.com/about"
              target="_blank"
              class="font-bold"
              >Connection Secret
            </a>
            below
          </div>

          <input
            value=${0}
            @change=${0}
            placeholder="nostr+walletconnect://..."
            type="password"
            class="w-full mb-8 rounded-lg p-2 border-1 ${0}"
          />
          <bci-button @click=${0}>
            <span class="${0}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`), br, this._nwcUrl, this.nwcUrlChanged, yr, this.onConnect, fr);
  }
  nwcUrlChanged(t) {
    this._nwcUrl = t.target.value;
  }
  async onConnect() {
    this._nwcUrl ? await m3.getState().connect({ nwcUrl: this._nwcUrl, connectorName: Li, connectorType: "nwc.generic" }) : m3.getState().setError("Please enter a URL");
  }
};
b3([He()], Vo.prototype, "_nwcUrl", void 0), Vo = b3([Le("bc-nwc")], Vo);
var Ro;
var Zo;
var zo = (t) => t;
var Fo = class extends dr()(Te) {
  constructor() {
    super(...arguments), this._nwcUrl = "";
  }
  render() {
    return ae(Ro || (Ro = zo`<div class="w-full">
      <bc-navbar
        class="flex w-full"
        heading=${0}
      ></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-2 ${0}">
            1. Add a new
            <a
              href="https://app.mutinywallet.com/settings/connections?name=${0}"
              target="_blank"
              class="font-bold"
              >Wallet Connection
            </a>
            from
            <span class="${0}"
              >Requests => Create a Wallet Connection</span
            >
            and copy the Connection Secret.
          </div>
          <div class="mb-1 ${0}">
            2. Paste the Connection Secret below:
          </div>

          <input
            value=${0}
            @change=${0}
            placeholder="nostr+walletconnect://..."
            type="password"
            class="w-full mb-8 rounded-lg p-2 border-1 ${0}"
          />
          <bci-button @click=${0}>
            <span class="${0}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`), Hi, br, this._appName, Cr, br, this._nwcUrl, this.nwcUrlChanged, yr, this.onClickConnect, fr);
  }
  nwcUrlChanged(t) {
    this._nwcUrl = t.target.value;
  }
  async onClickConnect() {
    this._nwcUrl ? await m3.getState().connect({ nwcUrl: this._nwcUrl, connectorName: Hi, connectorType: "nwc.mutiny" }) : m3.getState().setError("Please enter a URL");
  }
};
b3([He()], Fo.prototype, "_nwcUrl", void 0), Fo = b3([Le("bc-mutiny")], Fo);
var jo = le(Zo || (Zo = ((t) => t)`<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M256 0H0V256H256V0Z" fill="#673AB7"/>
<path d="M165 53H91V134.785H113.31V202L165 112.224H135.934L165 53Z" fill="white"/>
</svg>`));
var Bo = "LNbits";
var Wo = class extends bi {
  constructor() {
    super("lnbits", Bo, "#673ab7", jo);
  }
  async _onClick() {
    m3.getState().pushRoute("/lnbits");
  }
};
Wo = b3([Le("bc-lnbits-connector")], Wo);
var Do;
var Io = (t) => t;
var qo = class extends dr()(Te) {
  constructor() {
    super(...arguments), this._lnbitsAdminKey = "", this._lnbitsUrl = "";
  }
  render() {
    return ae(Do || (Do = Io`<div class="w-full">
      <bc-navbar
        class="flex w-full"
        heading=${0}
      ></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-4 ${0}">
            In LNbits, choose the wallet you want to connect, open it, click on
            API docs and copy the Admin Key. Paste it below:
          </div>

          <div class="mb-1 ${0}">
            LNbits Admin Key
          </div>
          <input
            value=${0}
            @change=${0}
            type="password"
            placeholder="Your 32 digit admin key"
            class="w-full mb-8 rounded-lg p-2 border-1 ${0}"
          />
          <div class="mb-1 ${0}">
            LNbits URL
          </div>

          <input
            value=${0}
            @change=${0}
            placeholder="https://legend.lnbits.com"
            class="w-full mb-8 rounded-lg p-2 border-1 ${0}"
          />
          <bci-button @click=${0}>
            <span class="${0}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`), Bo, mr, br, this._lnbitsAdminKey, this._lnbitsAdminKeyChanged, yr, br, this._lnbitsUrl, this._lnbitsUrlChanged, yr, this.onConnect, fr);
  }
  _lnbitsAdminKeyChanged(t) {
    this._lnbitsAdminKey = t.target.value;
  }
  _lnbitsUrlChanged(t) {
    this._lnbitsUrl = t.target.value;
  }
  async onConnect() {
    if (!this._lnbitsAdminKey) return void m3.getState().setError("Please enter your admin key");
    if (!this._lnbitsUrl) return void m3.getState().setError("Please enter your LNbits instance URL");
    let t = this._lnbitsUrl;
    t.endsWith("/") && (t = t.substring(0, t.length - 1)), await m3.getState().connect({ lnbitsAdminKey: this._lnbitsAdminKey, lnbitsInstanceUrl: t, connectorName: Bo, connectorType: "lnbits" });
  }
};
b3([He()], qo.prototype, "_lnbitsAdminKey", void 0), b3([He()], qo.prototype, "_lnbitsUrl", void 0), qo = b3([Le("bc-lnbits")], qo);
var Go;
var Ko;
var Jo = (t) => t;
var Yo = class extends dr()(Te) {
  render() {
    return ae(Go || (Go = Jo`<div class="w-full">
      <bc-navbar class="flex w-full" heading="Umbrel"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-4 ${0}">
            Install the App "NWC" from the Umbrel app store and click the
            connect button below. If you don't use
            <span class="italic">umbrel.local</span>
            as your umbrel domain use the Generic NWC connector instead.
          </div>
          <bci-button @click=${0}>
            <span class="${0}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`), br, this.onConnect, fr);
  }
  async onConnect() {
    const e2 = H.NostrWebLNProvider.withNewSecret({ authorizationUrl: "http://umbrel.local:58000/apps/new" });
    await e2.initNWC({ name: this._appName }), await m3.getState().connect({ nwcUrl: e2.getNostrWalletConnectUrl(), connectorName: "Umbrel", connectorType: "nwc.umbrel" });
  }
};
Yo = b3([Le("bc-umbrel")], Yo);
var Qo = le(Ko || (Ko = ((t) => t)`
<svg width="150" height="150" viewBox="0 0 150 150" version="1.1" xml:space="preserve"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:svg="http://www.w3.org/2000/svg"
  class="w-32 h-32 mt-4"
>
	<circle id="ring" cx="75" cy="75" r="48.5" fill="none" stroke="currentColor" stroke-width="5" transform="rotate(-90 75 75)" stroke-dasharray="400 400" stroke-dashoffset="400">
		<animate attributeName="stroke-dashoffset" begin="0.1s" dur="1.5s" values="500; 80; 0" fill="freeze" calcMode="spline" keyTimes="0; 0.99; 1" keySplines="0.28 0.4 0.38 1; 0 0 1 1"/>
		<animate attributeName="r" begin="1.8s" dur=".8s" values="47; 65" fill="freeze"/>
		<animate attributeName="stroke-width" begin="1.8s" dur=".8s" values="6; 0" fill="freeze"/>
	</circle>
	<circle id="circle" cx="75" cy="75" r="0" fill="currentColor" stroke="none">
		<animate attributeName="r" begin="1.4s" dur=".5s" fill="freeze" calcMode="spline" values="0; 60; 50" keyTimes="0; 0.75; 1" keySplines="0.25 0.1 0.25 1; 0.25 0.1 0.25 1"/>
	</circle>
	<path id="check" d="M 51.749354,79.542286 63.437424,91.567026 98.46891,58.494402" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-dasharray="65 65" stroke-dashoffset="65">
		<animate attributeName="stroke-dashoffset" begin="1.8s" dur=".5s" values="65; 0" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.42 0 0.58 1"/>
	</path>
</svg>
`));
var Xo;
var ts = le(Xo || (Xo = ((t) => t)`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4962 11.2367C11.7716 11.1782 12.0214 11.0339 12.2098 10.8247C12.424 10.5868 12.5206 10.2261 12.7139 9.50486L13.6802 5.89873C13.8734 5.17744 13.9701 4.81679 13.9035 4.50368C13.845 4.22827 13.7007 3.97845 13.4915 3.79004C13.2536 3.57585 12.893 3.47921 12.1717 3.28594L8.56554 2.31969C7.84425 2.12642 7.4836 2.02978 7.17049 2.09633C6.89507 2.15488 6.64525 2.29911 6.45684 2.50836C6.24265 2.74624 6.14602 3.10689 5.95275 3.82818L5.5 5.50024" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M11.0135 10.1009L10.0473 6.49473C9.85398 5.77344 9.75735 5.41279 9.54316 5.17491C9.35475 4.96566 9.10493 4.82142 8.82951 4.76288C8.5164 4.69633 8.15576 4.79296 7.43447 4.98623L3.82834 5.95249C3.10705 6.14576 2.7464 6.2424 2.50852 6.45659C2.29927 6.645 2.15504 6.89481 2.0965 7.17023C2.02994 7.48334 2.12658 7.84399 2.31985 8.56528L3.28611 12.1714C3.47938 12.8927 3.57601 13.2533 3.7902 13.4912C3.97861 13.7005 4.22843 13.8447 4.50385 13.9032C4.81696 13.9698 5.1776 13.8732 5.89889 13.6799L9.50502 12.7136C10.2263 12.5204 10.587 12.4237 10.8248 12.2095C11.0341 12.0211 11.1783 11.7713 11.2369 11.4959C11.3034 11.1828 11.2068 10.8221 11.0135 10.1009Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`));
var es;
var ns = le(es || (es = ((t) => t)`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33341 5.33341V4.80008C5.33341 4.05334 5.33341 3.67998 5.47874 3.39476C5.60657 3.14388 5.81054 2.9399 6.06143 2.81207C6.34664 2.66675 6.72001 2.66675 7.46675 2.66675H11.2001C11.9468 2.66675 12.3202 2.66675 12.6054 2.81207C12.8563 2.9399 13.0603 3.14388 13.1881 3.39476C13.3334 3.67998 13.3334 4.05334 13.3334 4.80008V8.53342C13.3334 9.28015 13.3334 9.65352 13.1881 9.93874C13.0603 10.1896 12.8563 10.3936 12.6054 10.5214C12.3202 10.6667 11.9468 10.6667 11.2001 10.6667H10.6667M10.6667 7.46675V11.2001C10.6667 11.9468 10.6667 12.3202 10.5214 12.6054C10.3936 12.8563 10.1896 13.0603 9.93874 13.1881C9.65352 13.3334 9.28015 13.3334 8.53342 13.3334H4.80008C4.05334 13.3334 3.67998 13.3334 3.39476 13.1881C3.14388 13.0603 2.9399 12.8563 2.81207 12.6054C2.66675 12.3202 2.66675 11.9468 2.66675 11.2001V7.46675C2.66675 6.72001 2.66675 6.34664 2.81207 6.06143C2.9399 5.81054 3.14388 5.60657 3.39476 5.47874C3.67998 5.33341 4.05334 5.33341 4.80008 5.33341H8.53342C9.28015 5.33341 9.65352 5.33341 9.93874 5.47874C10.1896 5.60657 10.3936 5.81054 10.5214 6.06143C10.6667 6.34664 10.6667 6.72001 10.6667 7.46675Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`));
var rs;
var is = le(rs || (rs = ((t) => t)`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 6.5V17C4.5 18.6569 5.84315 20 7.5 20H17.5C19.1569 20 20.5 18.6569 20.5 17V12C20.5 10.3431 19.1569 9 17.5 9H16.5M4.5 6.5C4.5 7.88071 5.61929 9 7 9H16.5M4.5 6.5C4.5 5.11929 5.61929 4 7 4H14.5C15.6046 4 16.5 4.89543 16.5 6V9" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
<path d="M16 15.375C16.4832 15.375 16.875 14.9832 16.875 14.5C16.875 14.0168 16.4832 13.625 16 13.625C15.5168 13.625 15.125 14.0168 15.125 14.5C15.125 14.9832 15.5168 15.375 16 15.375Z" fill="white" stroke="currentColor" stroke-width="0.75"/>
</svg>`));
var os;
var ss = le(os || (os = ((t) => t)`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H8C9.65685 3 11 4.34315 11 6V8C11 9.65685 9.65685 11 8 11H6C4.34315 11 3 9.65685 3 8V6ZM6 5C5.44772 5 5 5.44772 5 6V8C5 8.55228 5.44772 9 6 9H8C8.55228 9 9 8.55228 9 8V6C9 5.44772 8.55228 5 8 5H6ZM13 6C13 4.34315 14.3431 3 16 3H18C19.6569 3 21 4.34315 21 6V8C21 9.65685 19.6569 11 18 11H16C14.3431 11 13 9.65685 13 8V6ZM16 5C15.4477 5 15 5.44772 15 6V8C15 8.55228 15.4477 9 16 9H18C18.5523 9 19 8.55228 19 8V6C19 5.44772 18.5523 5 18 5H16ZM3 16C3 14.3431 4.34315 13 6 13H8C9.65685 13 11 14.3431 11 16V18C11 19.6569 9.65685 21 8 21H6C4.34315 21 3 19.6569 3 18V16ZM6 15C5.44772 15 5 15.4477 5 16V18C5 18.5523 5.44772 19 6 19H8C8.55228 19 9 18.5523 9 18V16C9 15.4477 8.55228 15 8 15H6ZM14 13C14.5523 13 15 13.4477 15 14V15H16C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17H14C13.4477 17 13 16.5523 13 16V14C13 13.4477 13.4477 13 14 13ZM17 14C17 13.4477 17.4477 13 18 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H18C17.4477 15 17 14.5523 17 14ZM17 18C17 17.4477 17.4477 17 18 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18Z" fill="currentColor"/>
<path d="M15 20C15 20.5523 14.5523 21 14 21C13.4477 21 13 20.5523 13 20C13 19.4477 13.4477 19 14 19C14.5523 19 15 19.4477 15 20Z" fill="currentColor"/>
<path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="currentColor"/>
<path d="M8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7Z" fill="currentColor"/>
<path d="M18 7C18 7.55228 17.5523 8 17 8C16.4477 8 16 7.55228 16 7C16 6.44772 16.4477 6 17 6C17.5523 6 18 6.44772 18 7Z" fill="currentColor"/>
</svg>`));
var as;
var ls;
var cs;
var ds;
var hs;
var ps;
var us;
var fs;
var gs;
var ms;
var bs;
var Cs;
var ys;
var ws;
var vs;
var xs;
var $s;
var _s = (t) => t;
var ks = class extends dr()(Te) {
  constructor() {
    super(...arguments), this._hasCopiedInvoice = false, this._isPaying = false, this._showQR = false, this._qr = null, this.paymentMethods = "all";
  }
  updated(t) {
    super.updated(t), t.has("paid") && this.paid && setTimeout(() => {
      Or();
    }, 3e3);
  }
  renderHeading(t) {
    return ae(as || (as = _s`
      <h2 class="text-2xl mb-6 ${0}">
        <span
          class="font-bold font-mono text-4xl align-bottom ${0}"
          >${0}</span
        >&nbsp;sats
      </h2>
    `), br, fr, t.satoshi.toLocaleString(void 0, { useGrouping: true }));
  }
  renderPaidState() {
    return ae(ls || (ls = _s`
      <div
        class="flex flex-col justify-center items-center ${0}"
      >
        <p class="font-bold">Paid!</p>
        ${0}
      </div>
    `), fr, Qo);
  }
  renderPayingState() {
    return ae(cs || (cs = _s`
      <div class="flex flex-col justify-center items-center">
        <p class="${0} mb-5">Paying...</p>
        ${0}
      </div>
    `), br, Wr(`w-48 h-48 ${fr}`));
  }
  renderPaymentConfirmation() {
    return ae(ds || (ds = _s`
      <bci-button variant="primary" @click=${0}>
        <span class="-ml-0.5">${0}</span>
        Confirm Payment
      </bci-button>
      ${0}
    `), this._payInvoice, Oe, no(this._connectorName));
  }
  renderWaitingForPayment() {
    return ae(hs || (hs = _s`
      <div class="flex justify-center items-center">
        ${0}
        <p class="${0}">Waiting for payment</p>
      </div>
    `), Wr(`w-7 h-7 ${fr}`), br);
  }
  renderConnectWalletMobile() {
    let t = null, e2 = null, n2 = null;
    return "all" !== this.paymentMethods && "internal" !== this.paymentMethods || (t = ae(ps || (ps = _s`
        <bci-button block @click=${0}>
          <span class="-ml-0.5">${0}</span>Connect Wallet
        </bci-button>
      `), this._onClickConnectWallet, Oe)), "all" !== this.paymentMethods && "external" !== this.paymentMethods || (e2 = ae(us || (us = _s`
        <bci-button block @click=${0}>
          ${0} Copy & Display Invoice
        </bci-button>
      `), this._copyAndDisplayInvoice, ss), this._showQR && (n2 = this.renderQR())), ae(fs || (fs = _s`
      <div class="mt-8 w-full flex flex-col gap-4">
        ${0}
        ${0} ${0}
      </div>
      ${0}
    `), "all" === this.paymentMethods || "external" === this.paymentMethods ? ae(gs || (gs = _s`<a href="lightning:${0}">
              <bci-button variant="primary" block>
                ${0} Open in a Bitcoin Wallet
              </bci-button>
            </a>`), this.invoice, is) : null, t, e2, n2);
  }
  renderConnectWalletDesktop() {
    let t = null;
    "all" !== this.paymentMethods && "internal" !== this.paymentMethods || (t = ae(ms || (ms = _s`
        <div class="${0}">
          <bci-button variant="primary" @click=${0}>
            <span class="-ml-0.5">${0}</span>
            Connect Wallet to Pay
          </bci-button>
        </div>
      `), "internal" !== this.paymentMethods ? "mt-8" : "", this._onClickConnectWallet, Oe));
    let e2 = null;
    "all" === this.paymentMethods && (e2 = ae(bs || (bs = _s` <div class="w-full py-8">${0}</div> `), Eo("or")));
    let n2 = null;
    return "all" !== this.paymentMethods && "external" !== this.paymentMethods || (n2 = ae(Cs || (Cs = _s`
        <div
          class="flex flex-col items-center ${0}"
        >
          <p class="font-medium ${0}">
            Scan to Pay
          </p>
          ${0}
        </div>
      `), "external" === this.paymentMethods ? "mt-8" : "", br, this.renderQR())), ae(ys || (ys = _s` ${0} ${0} ${0} `), t, e2, n2);
  }
  renderQR() {
    if (!this._showQR || !this.invoice) return null;
    const t = this.invoice;
    return setTimeout(() => {
      var e2;
      const n2 = null == (e2 = this.shadowRoot) ? void 0 : e2.getElementById("qr");
      if (!n2) return void console.error("qr canvas not found");
      const r2 = n2.getContext("2d");
      if (!r2) return void console.error("could not get context for qr canvas");
      const o2 = (0, import_qrcode_generator.default)(0, "L");
      o2.addData(t), o2.make();
      const s3 = o2.getModuleCount();
      n2.width = 4 * s3, n2.height = 4 * s3, o2.renderTo2dContext(r2, 4);
    }, 100), ae(ws || (ws = _s`
      <!-- add margin only on dark mode because on dark mode the qr has a white border -->
      <a href="lightning:${0}" class="dark:mt-2">
        <canvas id="qr" class="rounded-lg"></canvas>
      </a>
      <a
        @click=${0}
        class="
        flex gap-1
        mt-4
        ${0} ${0} font-semibold text-xs"
      >
        ${0}
        ${0}
      </a>
    `), this.invoice, this._copyInvoice, fr, pr, this._hasCopiedInvoice ? ts : ns, this._hasCopiedInvoice ? "Copied!" : "Copy Invoice");
  }
  render() {
    if (!this.invoice) return null;
    let t;
    try {
      t = new R2({ pr: this.invoice });
    } catch (t2) {
      return console.error(t2), m3.getState().setError(t2.message), null;
    }
    const e2 = window.innerWidth < 600;
    let n2;
    return e2 || (this._showQR = true), n2 = this.paid ? this.renderPaidState() : this._isPaying ? this.renderPayingState() : this._connected ? this.renderPaymentConfirmation() : ae(vs || (vs = _s`
        ${0}
        ${0}
      `), "internal" !== this.paymentMethods ? this.renderWaitingForPayment() : null, e2 ? this.renderConnectWalletMobile() : this.renderConnectWalletDesktop()), ae(xs || (xs = _s`
      <div class="flex flex-col justify-center items-center font-sans w-full">
        ${0} ${0}
      </div>
    `), this.renderHeading(t), n2);
  }
  _onClickConnectWallet() {
    this.dispatchEvent(new Event("onclickconnectwallet", { bubbles: true, composed: true }));
  }
  _copyAndDisplayInvoice() {
    this._copyInvoice(), this._showQR = true;
  }
  _copyInvoice() {
    this.invoice && (navigator.clipboard.writeText(this.invoice), this._hasCopiedInvoice = true, setTimeout(() => {
      this._hasCopiedInvoice = false;
    }, 2e3));
  }
  async _payInvoice() {
    this._isPaying = true;
    try {
      const t = m3.getState().provider;
      if (!t) throw new Error("No WebLN provider available");
      if (!this.invoice) throw new Error("No invoice to pay");
      const e2 = await t.sendPayment(this.invoice);
      if (!e2.preimage) throw new Error("No preimage in result");
      this.dispatchEvent(new CustomEvent("bc:onpaid", { bubbles: true, composed: true, detail: e2 })), this.paid = true;
    } catch (t) {
      console.error(t), m3.getState().setError(t.message);
    }
    this._isPaying = false;
  }
};
b3([He()], ks.prototype, "_hasCopiedInvoice", void 0), b3([He()], ks.prototype, "_isPaying", void 0), b3([He()], ks.prototype, "_showQR", void 0), b3([He()], ks.prototype, "_qr", void 0), b3([Ee({ type: String })], ks.prototype, "invoice", void 0), b3([Ee({ type: Boolean })], ks.prototype, "paid", void 0), b3([Ee({ type: String, attribute: "payment-methods" })], ks.prototype, "paymentMethods", void 0), ks = b3([Le("bc-send-payment")], ks);
var Ss = le($s || ($s = ((t) => t)`<svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse opacity="0.1" cx="32.1415" cy="61.8203" rx="10.8066" ry="1.99506" fill="black"/>
<path d="M42.5586 52.1078C48.1415 52.1078 50.6826 39.7459 50.6826 35.0587C50.6826 31.4053 48.1617 29.1912 44.8476 29.1912C41.5541 29.1912 38.8804 30.6074 38.8472 32.3612C38.8471 36.9895 38.0325 52.1078 42.5586 52.1078Z" fill="white" stroke="black" stroke-width="1.66255"/>
<path d="M22.1679 52.1078C16.5851 52.1078 14.044 39.7459 14.044 35.0587C14.044 31.4053 16.5649 29.1912 19.879 29.1912C23.1724 29.1912 25.8462 30.6074 25.8794 32.3612C25.8795 36.9895 26.6941 52.1078 22.1679 52.1078Z" fill="white" stroke="black" stroke-width="1.66255"/>
<path d="M17.5357 33.5726L17.5357 33.5724C17.5297 33.5152 17.5413 33.482 17.5532 33.4604C17.5672 33.4348 17.5938 33.4044 17.6385 33.379C17.7311 33.3264 17.8608 33.3169 17.9815 33.3875L18.3992 32.6737L17.981 33.3872C22.1277 35.818 26.9107 37.2115 32.1107 37.2115C37.3115 37.2115 42.183 35.791 46.3562 33.318C46.4761 33.2469 46.6055 33.2557 46.6983 33.308C46.7432 33.3333 46.77 33.3636 46.7842 33.3893C46.7962 33.411 46.808 33.4442 46.8022 33.5016C46.1566 39.899 42.6866 45.1881 38.0224 47.6226L38.0224 47.6226C36.4819 48.4268 35.4226 49.8239 34.4922 51.051C34.4756 51.073 34.4589 51.0949 34.4423 51.1168L34.4422 51.117C33.686 52.1145 33.0017 53.0078 32.1653 53.6661C31.3289 53.0078 30.6445 52.1145 29.8883 51.117L29.8882 51.1168C29.8716 51.0949 29.855 51.073 29.8383 51.051C28.9079 49.8239 27.8487 48.4268 26.3082 47.6226L26.3081 47.6226C21.6617 45.1975 18.2005 39.9391 17.5357 33.5726Z" fill="#FFDF6F" stroke="black" stroke-width="1.65411"/>
<ellipse cx="32.1969" cy="33.4459" rx="14.6305" ry="4.87682" fill="black" stroke="black" stroke-width="1.66255"/>
<path d="M20.4482 41.6479C20.4482 41.6479 27.6647 44.0864 32.3078 44.0864C36.9509 44.0864 44.1673 41.6479 44.1673 41.6479" stroke="black" stroke-width="1.66255" stroke-linecap="round"/>
<circle cx="3.30822" cy="3.30822" r="3.30822" transform="matrix(-1 0 0 1 21.7446 9.28369)" fill="black"/>
<path d="M17.8852 12.0955L24.0605 18.2708" stroke="black" stroke-width="1.65411"/>
<circle cx="45.4537" cy="12.5919" r="3.30822" fill="black"/>
<path d="M46.0601 12.0955L39.8848 18.2708" stroke="black" stroke-width="1.65411"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.3753 32.3329C17.5923 31.4841 16.5546 29.578 16.9022 27.634C18.3941 19.2907 24.6116 13.033 32.0551 13.033C39.5166 13.033 45.7462 19.3211 47.2187 27.6947C47.5612 29.6422 46.5151 31.5474 44.726 32.3894C40.8976 34.1909 36.6215 35.198 32.1102 35.198C27.552 35.198 23.234 34.1699 19.3753 32.3329Z" fill="#FFDF6F"/>
<path d="M47.2187 27.6947L46.4042 27.838L47.2187 27.6947ZM44.726 32.3894L44.3738 31.641L44.726 32.3894ZM16.9022 27.634L16.088 27.4885L16.9022 27.634ZM19.3753 32.3329L19.0198 33.0797L19.3753 32.3329ZM17.7163 27.7796C19.1579 19.7177 25.1169 13.86 32.0551 13.86V12.2059C24.1063 12.2059 17.6303 18.8637 16.088 27.4885L17.7163 27.7796ZM32.0551 13.86C39.01 13.86 44.9812 19.7463 46.4042 27.838L48.0333 27.5515C46.5111 18.8958 40.0232 12.2059 32.0551 12.2059V13.86ZM44.3738 31.641C40.6533 33.3918 36.4973 34.3709 32.1102 34.3709V36.0251C36.7458 36.0251 41.1419 34.99 45.0781 33.1377L44.3738 31.641ZM32.1102 34.3709C27.6776 34.3709 23.4808 33.3714 19.7308 31.5862L19.0198 33.0797C22.9872 34.9684 27.4265 36.0251 32.1102 36.0251V34.3709ZM46.4042 27.838C46.6788 29.3993 45.8428 30.9498 44.3738 31.641L45.0781 33.1377C47.1874 32.1451 48.4437 29.885 48.0333 27.5515L46.4042 27.838ZM16.088 27.4885C15.6715 29.8178 16.9178 32.079 19.0198 33.0797L19.7308 31.5862C18.2668 30.8893 17.4376 29.3381 17.7163 27.7796L16.088 27.4885Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.557 30.2587C21.1218 29.6741 20.2704 28.1471 20.7678 26.6794C22.3014 22.153 26.7753 18.8774 32.0555 18.8774C37.3357 18.8774 41.8095 22.153 43.3432 26.6794C43.8406 28.1471 42.9892 29.6741 41.554 30.2587C38.6226 31.4525 35.4159 32.1103 32.0555 32.1103C28.6951 32.1103 25.4884 31.4525 22.557 30.2587Z" fill="black"/>
<ellipse cx="35.8599" cy="25.935" rx="2.75685" ry="2.20548" fill="white"/>
<ellipse cx="27.9678" cy="25.9362" rx="2.75685" ry="2.20548" fill="white"/>
</svg>

`));
var Ls;
var As = le(Ls || (Ls = ((t) => t)`<?xml version="1.0" encoding="UTF-8"?>
<svg width="80" height="80" fill="none" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs>
  <linearGradient id="linearGradient16" x1="22" x2="22" y1="6" y2="38" gradientUnits="userSpaceOnUse">
   <stop stop-color="#020024" offset="0"/>
   <stop stop-color="#03215d" offset="1"/>
  </linearGradient>
 </defs>
 <g>
  <rect x="6" y="6" width="32" height="32" ry="7.9595" fill="url(#linearGradient16)" stroke-width="0"/>
  <path d="m10.161 29.944h1.9732v0.99297h2.9598v-0.99297h0.9866v-9.9297h0.98663v-1.9859h-0.98663v-0.99297h-1.9732v0.99297h-0.9866v0.99297h-0.9866v0.99297h2.9598v1.9859h-0.9866v0.99297h-1.9732v-0.99297h-0.9866v-3.9719h0.9866v-0.99297h0.9866v-0.99297h5.9196v0.99297h0.98663v0.99297h0.98655v1.9859h0.98663v1.9859h0.98663v0.99297h0.98655v-1.9859h0.98663v-0.99297h0.98663v-1.9859h0.98655v-1.9859h0.98663v-0.99297h0.98663v-1.9859h1.9732v-0.99297h1.9732v0.99297h0.98663v0.99297h-1.9732v-0.99297h-0.98663v0.99297h-0.98663v11.916h0.98663v4.9648h0.98663v0.99297h-3.9464v-0.99297h-0.98663v-9.9297h-0.98655v0.99297h-0.98663v1.9859h-0.98663v1.9859h-0.98655v1.9859h-1.9733v-1.9859h-0.98655v-1.9859h-0.98663v-2.9789h-0.98663v5.9578h-0.98655v2.9789h-0.98663v0.99297h-0.9866v0.99297h-3.9464v-0.99297h-0.9866z" fill="#f42058" stroke-width=".76382"/>
 </g>
 <g>
  <rect x="26" y="26" width="32" height="32" ry="7.9595" fill="#673ab7" stroke-width="0"/>
  <path d="m46.707 32.522h-9.4143v10.405h2.8383v8.5511l6.576-11.421h-3.6978z" fill="#fff" stroke-width=".12722"/>
 </g>
</svg>
`));
var Ms;
var Es = (t) => t;
var Hs = class extends dr()(Te) {
  render() {
    return ae(Ms || (Ms = Es`<div>
      <bc-navbar
        class="flex w-full"
        heading="Get a bitcoin lightning wallet"
      ></bc-navbar>

      <div class="gap-4 w-full my-6 px-8 font-sans text-sm w-full">
        <div class="flex flex-row items-center space-x-4">
          <div>
            <div class="w-20 h-20">${0}</div>
          </div>
          <p class="text-sm text-justify ${0}">
            For quick setup of a bitcoin lightning wallet we recommend signing
            up for the
            <a
              href="https://getalby.com/#alby-account"
              target="_blank"
              class="no-underline font-bold ${0} ${0} "
              >Alby Account</a
            >, which you can pair with the
            <a
              href="https://getalby.com/#alby-extension"
              target="_blank"
              class="no-underline font-bold ${0} ${0} "
              >Alby Browser Extension</a
            >.
          </p>
        </div>
        <br />
        <br />
        <div class="flex flex-row items-center space-x-4">
          <div>
            <div class="w-20 h-20">${0}</div>
          </div>
          <p class="text-sm text-justify ${0}">
            More advanced users could try also solutions like
            <a
              href="https://www.mutinywallet.com"
              target="_blank"
              class="no-underline font-bold ${0} ${0} "
              >Mutiny</a
            >
            or
            <a
              href="https://lnbits.com"
              target="_blank"
              class="no-underline font-bold ${0} ${0} "
              >LNBits</a
            >.
          </p>
        </div>
      </div>
    </div>`), Ss, br, pr, fr, pr, fr, As, br, pr, fr, pr, fr);
  }
};
Hs = b3([Le("bc-new-wallet")], Hs);
var Us;
var Ps = (t) => t;
var Ns = class extends dr()(Te) {
  constructor() {
    super(...arguments), this._nwcUrl = "";
  }
  render() {
    return ae(Us || (Us = Ps`<div class="w-full">
      <bc-navbar class="flex w-full" heading="LN Link"> </bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-2 ${0}">
            1. Add a new
            <a
              href="https://github.com/lnfi-network/ln-node/tree/main/LNLink"
              target="_blank"
              class="font-bold"
              >Wallet Connection
            </a>
            from
            <span class="${0}"
              >LN Node => Generate NWC</span
            >
            and copy the Connection Secret.
          </div>
          <div class="mb-1 ${0}">
            2. Paste the Connection Secret below:
          </div>

          <input
            value=${0}
            @change=${0}
            placeholder="nostr+walletconnect://..."
            type="password"
            class="w-full mb-8 rounded-lg p-2 border-1 ${0}"
          />
          <bci-button @click=${0}>
            <span class="${0}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`), br, Cr, br, this._nwcUrl, this.nwcUrlChanged, yr, this.onConnect, fr);
  }
  nwcUrlChanged(t) {
    this._nwcUrl = t.target.value;
  }
  async onConnect() {
    this._nwcUrl ? await m3.getState().connect({ nwcUrl: this._nwcUrl, connectorName: Li, connectorType: "nwc.generic" }) : m3.getState().setError("Please enter a URL");
  }
};
b3([He()], Ns.prototype, "_nwcUrl", void 0), Ns = b3([Le("bc-lnfi")], Ns);
var Ts;
var Os;
var Vs;
var Rs;
var Zs;
var zs;
var Fs;
var js;
var Bs = (t) => t;
var Ws = { "/start": ae(Ts || (Ts = Bs`<bc-start class="flex w-full"></bc-start>`)), "/help": ae(Os || (Os = Bs`<bc-help class="flex w-full"></bc-help>`)), "/nwc": ae(Vs || (Vs = Bs`<bc-nwc class="flex w-full"></bc-nwc>`)), "/lnfi": ae(Rs || (Rs = Bs`<bc-lnfi class="flex w-full"></bc-lnfi>`)), "/mutiny": ae(Zs || (Zs = Bs`<bc-mutiny class="flex w-full"></bc-mutiny>`)), "/lnbits": ae(zs || (zs = Bs`<bc-lnbits class="flex w-full"></bc-lnbits>`)), "/umbrel": ae(Fs || (Fs = Bs`<bc-umbrel class="flex w-full"></bc-umbrel>`)), "/new-wallet": ae(js || (js = Bs`<bc-new-wallet class="flex w-full"></bc-new-wallet>`)) };
var Ds;
var Is = (t) => t;
var qs = class extends dr()(Te) {
  render() {
    return ae(Ds || (Ds = Is`<div class="flex flex-col w-full">${0}</div>`), Ws[this._route]);
  }
};
qs = b3([Le("bc-router-outlet")], qs);
var Gs;
var Ks;
var Js = (t) => t;
var Ys = class extends dr()(Ne) {
  render() {
    return ae(Gs || (Gs = Js`<div
      class="${0} w-full flex-1 animate-pulse"
    >
      <h1
        class="w-1/2 h-7 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></h1>
      <div
        class="w-1/2 h-4 mt-8 mb-2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></div>
      <div
        class="mb-12 h-10 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></div>
      ${0}
      <div
        class="my-4 h-4 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></div>
      <div
        class="h-10 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md"
      ></div>
    </div>`), gr, Eo());
  }
};
Ys = b3([Le("bci-connecting")], Ys);
var Qs = le(Ks || (Ks = ((t) => t)`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.665 18.33C13.5404 18.3311 14.4074 18.1592 15.2162 17.8242C16.025 17.4892 16.7596 16.9977 17.3778 16.3778C17.9977 15.7596 18.4892 15.025 18.8242 14.2162C19.1592 13.4074 19.3311 12.5404 19.33 11.665C19.3311 10.7896 19.1592 9.92256 18.8242 9.11378C18.4892 8.305 17.9976 7.5704 17.3778 6.95218C16.7596 6.33235 16.025 5.84079 15.2162 5.50577C14.4074 5.17075 13.5404 4.99887 12.665 5.00001C11.7896 4.99889 10.9226 5.17078 10.1138 5.5058C9.305 5.84082 8.5704 6.33236 7.95218 6.95218C7.33236 7.5704 6.84082 8.305 6.5058 9.11378C6.17078 9.92256 5.99889 10.7896 6.00001 11.665C5.99887 12.5404 6.17075 13.4074 6.50577 14.2162C6.84079 15.025 7.33235 15.7596 7.95218 16.3778C8.5704 16.9976 9.305 17.4892 10.1138 17.8242C10.9226 18.1592 11.7896 18.3311 12.665 18.33Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M12.6649 12.9149V11.9152C12.9615 11.9152 13.2515 11.8272 13.4981 11.6625C13.7447 11.4977 13.9369 11.2635 14.0504 10.9895C14.1639 10.7155 14.1936 10.4139 14.1357 10.123C14.0779 9.83215 13.935 9.56495 13.7253 9.35523C13.5156 9.14551 13.2484 9.00269 12.9575 8.94483C12.6666 8.88697 12.3651 8.91667 12.091 9.03017C11.817 9.14366 11.5828 9.33587 11.418 9.58247C11.2532 9.82908 11.1653 10.119 11.1653 10.4156" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6653 15.7497C12.8642 15.7497 13.055 15.6707 13.1956 15.5301C13.3363 15.3895 13.4153 15.1987 13.4153 14.9999C13.4153 14.801 13.3363 14.6103 13.1956 14.4696C13.055 14.329 12.8642 14.25 12.6653 14.25C12.4664 14.25 12.2756 14.329 12.135 14.4696C11.9943 14.6103 11.9153 14.801 11.9153 14.9999C11.9153 15.1987 11.9943 15.3895 12.135 15.5301C12.2756 15.6707 12.4664 15.7497 12.6653 15.7497Z" fill="currentColor"/>
</svg>
`));
var Xs;
var ta;
var ea;
var na = (t) => t;
var ra = class extends dr()(Te) {
  render() {
    return ae(Xs || (Xs = na`<div
      class="flex justify-center items-center gap-2 w-full relative"
    >
      <div
        class="absolute right-0 h-full flex items-center justify-center gap-2"
      >
        ${0}
        ${0}
      </div>
      <div class="flex items-center justify-center">
        <slot></slot>
      </div>
    </div>`), this.showHelp ? ae(ta || (ta = na`<div
              class="${0} ${0}"
              @click=${0}
            >
              ${0}
            </div>`), pr, Cr, () => m3.getState().pushRoute("/help"), Qs) : null, this.closable ? ae(ea || (ea = na`<div
              class="${0} ${0}"
              @click=${0}
            >
              ${0}
            </div>`), pr, Cr, this._handleClose, io) : null);
  }
  _handleClose() {
    this.dispatchEvent(new Event("onclose", { bubbles: true, composed: true }));
  }
};
b3([Ee({ type: Boolean })], ra.prototype, "closable", void 0), b3([Ee({ type: Boolean, attribute: "show-help" })], ra.prototype, "showHelp", void 0), ra = b3([Le("bc-modal-header")], ra);
var ia;
var oa;
var sa = (t) => t;
var aa = class extends dr()(Te) {
  constructor() {
    super(...arguments), this._handleClose = () => {
      Or();
    };
  }
  render() {
    return ae(ia || (ia = sa` <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-end sm:items-center z-[21000]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full -z-10 ${0} animate-darken"
        @click=${0}
      ></div>
      <div
        class="transition-all p-4 pt-6 pb-8 rounded-2xl shadow-2xl flex justify-center items-center w-full bg-white dark:bg-black max-w-md max-sm:rounded-b-none
        animate-fade-in"
      >
        <slot @onclose=${0}></slot>
      </div>
    </div>`), "bg-foreground-light dark:bg-foreground-dark", this._handleClose, this._handleClose);
  }
};
aa = b3([Le("bc-modal")], aa);
var la = le(oa || (oa = ((t) => t)`<svg width="116" height="14" viewBox="0 0 116 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.88623 4.23009C7.4526 4.23009 7.94227 4.33038 8.35525 4.53097C8.76823 4.73156 9.11041 5.00295 9.3818 5.34513C9.65319 5.68732 9.85378 6.0885 9.98357 6.54867C10.1134 7.00885 10.1783 7.50443 10.1783 8.0354C10.1783 8.84956 10.0249 9.62242 9.71809 10.354C9.4231 11.0737 9.01602 11.705 8.49685 12.2478C7.97767 12.7788 7.3641 13.2035 6.65614 13.5221C5.94817 13.8289 5.18121 13.9823 4.35525 13.9823C4.24905 13.9823 4.06026 13.9764 3.78888 13.9646C3.52929 13.9646 3.2284 13.941 2.88622 13.8938C2.54404 13.8466 2.17826 13.7758 1.78888 13.6814C1.41129 13.587 1.05141 13.4572 0.709229 13.292L3.77118 0.424778L6.51454 0L5.4172 4.56637C5.65318 4.46018 5.88917 4.37758 6.12516 4.31858C6.36115 4.25959 6.61484 4.23009 6.88623 4.23009ZM4.58534 11.8053C4.99832 11.8053 5.3877 11.705 5.75348 11.5044C6.11926 11.3038 6.43195 11.0384 6.69153 10.708C6.96292 10.3658 7.17531 9.9823 7.3287 9.55752C7.4821 9.13274 7.55879 8.69027 7.55879 8.23009C7.55879 7.66372 7.4644 7.22124 7.27561 6.90266C7.08681 6.58407 6.73873 6.42478 6.23136 6.42478C6.06616 6.42478 5.84788 6.45428 5.57649 6.51328C5.3169 6.57227 5.08091 6.69617 4.86852 6.88496L3.70038 11.7345C3.77118 11.7463 3.83018 11.7581 3.87737 11.7699C3.93637 11.7817 3.99537 11.7935 4.05436 11.8053C4.11336 11.8053 4.18416 11.8053 4.26675 11.8053C4.34935 11.8053 4.45554 11.8053 4.58534 11.8053Z" fill="currentColor"/>
<path d="M13.1552 13.7345H10.5357L12.7481 4.42478H15.3853L13.1552 13.7345ZM14.4295 3.29204C14.0637 3.29204 13.7333 3.18584 13.4384 2.97345C13.1434 2.74926 12.9959 2.41298 12.9959 1.9646C12.9959 1.71681 13.0431 1.48673 13.1375 1.27434C13.2437 1.05015 13.3794 0.861357 13.5446 0.707964C13.7097 0.542772 13.8985 0.412979 14.1109 0.318584C14.3351 0.224189 14.5711 0.176991 14.8189 0.176991C15.1847 0.176991 15.5151 0.289086 15.81 0.513274C16.105 0.725664 16.2525 1.05605 16.2525 1.50442C16.2525 1.75221 16.1994 1.9882 16.0932 2.21239C15.9988 2.42478 15.869 2.61357 15.7038 2.77876C15.5387 2.93215 15.344 3.05605 15.1198 3.15044C14.9074 3.24484 14.6773 3.29204 14.4295 3.29204Z" fill="currentColor"/>
<path d="M17.7251 2.1062L20.4685 1.68142L19.7959 4.42478H22.734L22.203 6.58407H19.2827L18.5039 9.84071C18.4331 10.1121 18.3859 10.3658 18.3623 10.6018C18.3505 10.8378 18.38 11.0443 18.4508 11.2212C18.5334 11.3864 18.6691 11.5162 18.8579 11.6106C19.0467 11.705 19.3063 11.7522 19.6367 11.7522C19.9198 11.7522 20.1912 11.7286 20.4508 11.6814C20.7222 11.6224 20.9936 11.5457 21.265 11.4513L21.4597 13.469C21.1057 13.5988 20.7222 13.7109 20.3092 13.8053C19.8962 13.8997 19.4066 13.9469 18.8402 13.9469C18.026 13.9469 17.3948 13.8289 16.9464 13.5929C16.498 13.3451 16.1794 13.0148 15.9906 12.6018C15.8018 12.177 15.7192 11.6932 15.7428 11.1504C15.7664 10.6077 15.849 10.0354 15.9906 9.43363L17.7251 2.1062Z" fill="currentColor"/>
<path d="M22.475 10.0177C22.475 9.21534 22.6048 8.46018 22.8644 7.75221C23.124 7.04425 23.4957 6.42478 23.9794 5.89381C24.4632 5.36283 25.0473 4.94395 25.7316 4.63717C26.4278 4.33038 27.2007 4.17699 28.0502 4.17699C28.5812 4.17699 29.0532 4.23009 29.4662 4.33628C29.8909 4.43068 30.2744 4.56047 30.6166 4.72567L29.7139 6.77876C29.478 6.68437 29.2302 6.60177 28.9706 6.53097C28.7228 6.44838 28.416 6.40708 28.0502 6.40708C27.1653 6.40708 26.4691 6.70797 25.9617 7.30974C25.4544 7.89971 25.2007 8.70797 25.2007 9.73452C25.2007 10.3363 25.3305 10.826 25.5901 11.2035C25.8496 11.5693 26.3275 11.7522 27.0237 11.7522C27.3659 11.7522 27.6963 11.7168 28.0148 11.646C28.3334 11.5752 28.6166 11.4867 28.8644 11.3805L29.0591 13.4867C28.7287 13.6165 28.3629 13.7286 27.9617 13.823C27.5724 13.9292 27.0945 13.9823 26.5281 13.9823C25.7965 13.9823 25.1771 13.8761 24.6697 13.6637C24.1623 13.4513 23.7434 13.1681 23.4131 12.8142C23.0827 12.4484 22.8408 12.0236 22.6874 11.5398C22.5458 11.0561 22.475 10.5487 22.475 10.0177Z" fill="currentColor"/>
<path d="M33.8569 13.9823C33.2316 13.9823 32.6888 13.8879 32.2286 13.6991C31.7684 13.5103 31.385 13.2448 31.0782 12.9027C30.7832 12.5605 30.559 12.1593 30.4056 11.6991C30.2522 11.2271 30.1755 10.708 30.1755 10.1416C30.1755 9.43363 30.2876 8.72567 30.5118 8.0177C30.7478 7.30974 31.09 6.67257 31.5383 6.1062C31.9867 5.53982 32.5354 5.07965 33.1844 4.72567C33.8333 4.35988 34.5767 4.17699 35.4145 4.17699C36.028 4.17699 36.5649 4.27139 37.0251 4.46018C37.4971 4.64897 37.8805 4.91445 38.1755 5.25664C38.4823 5.59882 38.7124 6.0059 38.8658 6.47788C39.0192 6.93805 39.0959 7.45133 39.0959 8.0177C39.0959 8.72567 38.9838 9.43363 38.7596 10.1416C38.5354 10.8496 38.205 11.4867 37.7684 12.0531C37.3319 12.6195 36.7832 13.0855 36.1224 13.4513C35.4735 13.8053 34.7183 13.9823 33.8569 13.9823ZM35.1667 6.40708C34.7773 6.40708 34.4351 6.51918 34.1401 6.74336C33.8451 6.96755 33.5973 7.25074 33.3968 7.59292C33.1962 7.9351 33.0428 8.31269 32.9366 8.72567C32.8422 9.12685 32.795 9.51033 32.795 9.87611C32.795 10.4779 32.8894 10.944 33.0782 11.2743C33.267 11.5929 33.6091 11.7522 34.1047 11.7522C34.4941 11.7522 34.8363 11.6401 35.1313 11.4159C35.4263 11.1917 35.674 10.9086 35.8746 10.5664C36.0752 10.2242 36.2227 9.85251 36.3171 9.45133C36.4233 9.03835 36.4764 8.64897 36.4764 8.28319C36.4764 7.68142 36.382 7.22124 36.1932 6.90266C36.0044 6.57227 35.6622 6.40708 35.1667 6.40708Z" fill="currentColor"/>
<path d="M42.0732 13.7345H39.4537L41.6661 4.42478H44.3033L42.0732 13.7345ZM43.3475 3.29204C42.9818 3.29204 42.6514 3.18584 42.3564 2.97345C42.0614 2.74926 41.9139 2.41298 41.9139 1.9646C41.9139 1.71681 41.9611 1.48673 42.0555 1.27434C42.1617 1.05015 42.2974 0.861357 42.4626 0.707964C42.6278 0.542772 42.8166 0.412979 43.0289 0.318584C43.2531 0.224189 43.4891 0.176991 43.7369 0.176991C44.1027 0.176991 44.4331 0.289086 44.7281 0.513274C45.0231 0.725664 45.1705 1.05605 45.1705 1.50442C45.1705 1.75221 45.1174 1.9882 45.0113 2.21239C44.9169 2.42478 44.7871 2.61357 44.6219 2.77876C44.4567 2.93215 44.262 3.05605 44.0378 3.15044C43.8254 3.24484 43.5953 3.29204 43.3475 3.29204Z" fill="currentColor"/>
<path d="M46.2538 4.84956C46.4544 4.79056 46.6727 4.72566 46.9087 4.65487C47.1564 4.57227 47.4278 4.50148 47.7228 4.44248C48.0296 4.37168 48.3659 4.31859 48.7317 4.28319C49.1092 4.23599 49.534 4.21239 50.006 4.21239C51.3983 4.21239 52.3541 4.61357 52.8733 5.41593C53.3924 6.21829 53.4809 7.31564 53.1387 8.70797L51.9352 13.7345H49.298L50.4662 8.81416C50.537 8.50738 50.5901 8.21239 50.6255 7.92921C50.6727 7.63422 50.6727 7.38053 50.6255 7.16814C50.5783 6.94395 50.4662 6.76696 50.2892 6.63717C50.124 6.49558 49.8644 6.42478 49.5104 6.42478C49.1682 6.42478 48.8202 6.46018 48.4662 6.53097L46.7494 13.7345H44.1122L46.2538 4.84956Z" fill="currentColor"/>
<path d="M59.411 14C58.6441 14 57.9656 13.8879 57.3756 13.6637C56.7974 13.4395 56.3137 13.1209 55.9243 12.708C55.5349 12.295 55.2399 11.7994 55.0393 11.2212C54.8505 10.6313 54.7561 9.9705 54.7561 9.23894C54.7561 8.17699 54.9213 7.16224 55.2517 6.19469C55.5939 5.22714 56.0718 4.37168 56.6853 3.62832C57.3107 2.88496 58.06 2.29499 58.9331 1.85841C59.8063 1.41003 60.7798 1.18584 61.8535 1.18584C62.7739 1.18584 63.5054 1.28024 64.0482 1.46903C64.6028 1.65782 64.998 1.83481 65.234 2L64.5261 3.41593C64.2547 3.23894 63.883 3.07375 63.411 2.92035C62.9508 2.75516 62.4022 2.67257 61.765 2.67257C60.9508 2.67257 60.2193 2.86726 59.5703 3.25664C58.9213 3.63422 58.3727 4.1298 57.9243 4.74336C57.4759 5.34513 57.1337 6.0295 56.8977 6.79646C56.6617 7.55162 56.5438 8.30089 56.5438 9.04425C56.5438 11.3451 57.5408 12.4956 59.5349 12.4956C59.9597 12.4956 60.3373 12.4661 60.6677 12.4071C61.0098 12.3481 61.3107 12.2832 61.5703 12.2124C61.8299 12.1298 62.06 12.0413 62.2606 11.9469C62.4612 11.8525 62.6382 11.7699 62.7915 11.6991L63.0039 13.1858C62.8623 13.2684 62.6736 13.3569 62.4376 13.4513C62.2134 13.5457 61.9479 13.6342 61.6411 13.7168C61.3343 13.7994 60.9921 13.8643 60.6146 13.9115C60.237 13.9705 59.8358 14 59.411 14Z" fill="currentColor"/>
<path d="M67.2379 13.9646C66.2703 13.9646 65.5093 13.6814 64.9547 13.115C64.4119 12.5369 64.1406 11.7463 64.1406 10.7434C64.1406 10.059 64.235 9.33924 64.4237 8.58407C64.6243 7.82891 64.937 7.13274 65.3618 6.49558C65.7866 5.85841 66.3352 5.33333 67.0078 4.92035C67.6804 4.50737 68.4945 4.30089 69.4503 4.30089C70.4178 4.30089 71.173 4.58997 71.7158 5.16814C72.2704 5.73451 72.5476 6.51918 72.5476 7.52213C72.5476 8.20649 72.4473 8.92626 72.2468 9.68142C72.058 10.4366 71.7512 11.1327 71.3264 11.7699C70.9016 12.4071 70.353 12.9322 69.6804 13.3451C69.0078 13.7581 68.1937 13.9646 67.2379 13.9646ZM67.5211 12.5664C68.0521 12.5664 68.524 12.413 68.937 12.1062C69.3618 11.7994 69.7158 11.41 69.999 10.9381C70.294 10.4543 70.5181 9.92331 70.6715 9.34513C70.8249 8.76696 70.9016 8.20649 70.9016 7.66372C70.9016 7.06195 70.7718 6.58407 70.5122 6.23009C70.2527 5.87611 69.8043 5.69912 69.1671 5.69912C68.6361 5.69912 68.1583 5.85251 67.7335 6.15929C67.3205 6.46608 66.9665 6.86136 66.6715 7.34513C66.3883 7.81711 66.1701 8.34219 66.0167 8.92036C65.8633 9.49853 65.7866 10.059 65.7866 10.6018C65.7866 11.2035 65.9164 11.6814 66.176 12.0354C66.4355 12.3894 66.8839 12.5664 67.5211 12.5664Z" fill="currentColor"/>
<path d="M74.8253 13.7345H73.1793L75.3032 4.88496C75.8459 4.71977 76.43 4.58997 77.0554 4.49558C77.6926 4.38938 78.2589 4.33628 78.7545 4.33628C79.2855 4.33628 79.7398 4.41298 80.1173 4.56637C80.5067 4.70796 80.8194 4.90856 81.0554 5.16814C81.2914 5.41593 81.4625 5.72271 81.5687 6.0885C81.6867 6.44248 81.7457 6.83186 81.7457 7.25664C81.7457 7.52803 81.7221 7.81711 81.6749 8.1239C81.6277 8.41888 81.5687 8.71977 81.4979 9.02655L80.3651 13.7345H78.7191L79.7634 9.38053C79.8459 9.05015 79.9226 8.71387 79.9934 8.37168C80.076 8.0295 80.1173 7.70502 80.1173 7.39823C80.1173 6.92626 79.9875 6.53687 79.728 6.23009C79.4684 5.91151 78.9846 5.75221 78.2766 5.75221C77.9816 5.75221 77.6926 5.76991 77.4094 5.80531C77.1262 5.84071 76.8902 5.88791 76.7014 5.9469L74.8253 13.7345Z" fill="currentColor"/>
<path d="M84.2197 13.7345H82.5736L84.6975 4.88496C85.2403 4.71977 85.8244 4.58997 86.4498 4.49558C87.0869 4.38938 87.6533 4.33628 88.1489 4.33628C88.6798 4.33628 89.1341 4.41298 89.5117 4.56637C89.9011 4.70796 90.2138 4.90856 90.4498 5.16814C90.6857 5.41593 90.8568 5.72271 90.963 6.0885C91.081 6.44248 91.14 6.83186 91.14 7.25664C91.14 7.52803 91.1164 7.81711 91.0692 8.1239C91.022 8.41888 90.963 8.71977 90.8922 9.02655L89.7595 13.7345H88.1135L89.1577 9.38053C89.2403 9.05015 89.317 8.71387 89.3878 8.37168C89.4704 8.0295 89.5117 7.70502 89.5117 7.39823C89.5117 6.92626 89.3819 6.53687 89.1223 6.23009C88.8627 5.91151 88.379 5.75221 87.671 5.75221C87.376 5.75221 87.0869 5.76991 86.8037 5.80531C86.5206 5.84071 86.2846 5.88791 86.0958 5.9469L84.2197 13.7345Z" fill="currentColor"/>
<path d="M94.2335 8.90266C94.9179 8.87906 95.5432 8.83776 96.1096 8.77876C96.676 8.70797 97.1656 8.59587 97.5786 8.44248C97.9916 8.27729 98.3102 8.059 98.5344 7.78761C98.7704 7.51623 98.8884 7.16224 98.8884 6.72567C98.8884 6.61947 98.8648 6.50738 98.8176 6.38938C98.7822 6.27139 98.7114 6.16519 98.6052 6.0708C98.5108 5.9646 98.3751 5.88201 98.1981 5.82301C98.0211 5.75221 97.8028 5.71682 97.5432 5.71682C97.1302 5.71682 96.7409 5.80531 96.3751 5.9823C96.0211 6.15929 95.7025 6.39528 95.4193 6.69027C95.1361 6.97345 94.8943 7.30974 94.6937 7.69912C94.4931 8.0767 94.3397 8.47788 94.2335 8.90266ZM95.9149 13.9646C95.3131 13.9646 94.794 13.882 94.3574 13.7168C93.9208 13.5398 93.555 13.3038 93.26 13.0089C92.9651 12.7021 92.7468 12.3481 92.6052 11.9469C92.4636 11.5457 92.3928 11.1209 92.3928 10.6726C92.3928 9.84661 92.5167 9.05015 92.7645 8.28319C93.0123 7.51623 93.3662 6.83776 93.8264 6.24779C94.2866 5.65782 94.8471 5.19174 95.5078 4.84956C96.1686 4.49558 96.9179 4.31858 97.7556 4.31858C98.2394 4.31858 98.6524 4.38348 98.9946 4.51328C99.3485 4.63127 99.6317 4.79646 99.8441 5.00885C100.068 5.22124 100.234 5.46903 100.34 5.75221C100.446 6.0236 100.499 6.30679 100.499 6.60177C100.499 7.15634 100.399 7.62832 100.198 8.0177C99.9975 8.39528 99.732 8.71387 99.4016 8.97345C99.0713 9.23304 98.6819 9.43363 98.2335 9.57522C97.7969 9.71682 97.3367 9.82891 96.853 9.91151C96.381 9.9941 95.8972 10.0531 95.4016 10.0885C94.9179 10.1121 94.4577 10.1357 94.0211 10.1593C94.0093 10.2537 94.0034 10.3304 94.0034 10.3894C94.0034 10.4484 94.0034 10.4956 94.0034 10.531C94.0034 10.8024 94.0329 11.0619 94.0919 11.3097C94.1627 11.5457 94.2866 11.7581 94.4636 11.9469C94.6406 12.1239 94.8825 12.2655 95.1892 12.3717C95.5078 12.4779 95.9208 12.531 96.4282 12.531C96.6524 12.531 96.8825 12.5133 97.1185 12.4779C97.3662 12.4307 97.5963 12.3776 97.8087 12.3186C98.0329 12.2478 98.2276 12.1829 98.3928 12.1239C98.5698 12.0531 98.6937 11.9882 98.7645 11.9292L98.9061 13.3274C98.6701 13.4572 98.2866 13.5929 97.7556 13.7345C97.2364 13.8879 96.6229 13.9646 95.9149 13.9646Z" fill="currentColor"/>
<path d="M101.199 10.4425C101.199 9.64012 101.317 8.86726 101.553 8.1239C101.801 7.38053 102.161 6.72567 102.633 6.15929C103.105 5.59292 103.683 5.14454 104.368 4.81416C105.052 4.47198 105.837 4.30089 106.722 4.30089C107.111 4.30089 107.483 4.33038 107.837 4.38938C108.191 4.43658 108.527 4.53687 108.846 4.69027L108.226 6.0708C108.037 5.9646 107.813 5.88201 107.553 5.82301C107.306 5.76401 106.981 5.73451 106.58 5.73451C106.002 5.73451 105.483 5.86431 105.022 6.1239C104.562 6.37168 104.167 6.70797 103.837 7.13274C103.518 7.54572 103.27 8.0295 103.093 8.58407C102.928 9.12685 102.846 9.69322 102.846 10.2832C102.846 10.59 102.875 10.8791 102.934 11.1504C103.005 11.4218 103.123 11.6637 103.288 11.8761C103.453 12.0767 103.671 12.236 103.943 12.354C104.226 12.472 104.58 12.531 105.005 12.531C105.217 12.531 105.441 12.5133 105.677 12.4779C105.913 12.4307 106.132 12.3776 106.332 12.3186C106.533 12.2596 106.71 12.2006 106.863 12.1416C107.028 12.0708 107.146 12.0059 107.217 11.9469L107.359 13.3451C107.135 13.4867 106.787 13.6224 106.315 13.7522C105.843 13.8938 105.306 13.9646 104.704 13.9646C104.138 13.9646 103.636 13.882 103.199 13.7168C102.763 13.5398 102.397 13.2979 102.102 12.9912C101.807 12.6726 101.583 12.3009 101.43 11.8761C101.276 11.4395 101.199 10.9617 101.199 10.4425Z" fill="currentColor"/>
<path d="M111.557 13.9823C110.672 13.9823 110.023 13.7876 109.61 13.3982C109.197 13.0089 108.99 12.4425 108.99 11.6991C108.99 11.2153 109.073 10.5959 109.238 9.84071L111.132 1.9646L112.849 1.68142L112.158 4.53097H115.291L114.955 5.91151H111.822L110.849 9.9823C110.707 10.5369 110.636 11.0207 110.636 11.4336C110.636 11.823 110.742 12.1062 110.955 12.2832C111.167 12.4484 111.521 12.531 112.017 12.531C112.359 12.531 112.695 12.4779 113.026 12.3717C113.356 12.2537 113.61 12.1475 113.787 12.0531L113.91 13.4513C113.734 13.5575 113.433 13.6696 113.008 13.7876C112.583 13.9174 112.099 13.9823 111.557 13.9823Z" fill="currentColor"/>
</svg>

`));
var ca;
var da = le(ca || (ca = ((t) => t)`<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4996 8.6934C13.5646 12.4434 9.76602 14.7256 6.01514 13.7905C2.26579 12.8555 -0.0166852 9.05718 0.918793 5.30739C1.8534 1.55695 5.65197 -0.725474 9.40176 0.209458C13.1524 1.14439 15.4347 4.94318 14.4996 8.6934Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.52902 4.06707C10.5141 4.44605 11.2102 4.99957 11.0511 5.97269C10.9624 6.52101 10.7122 6.8585 10.3665 7.04603C10.236 7.1168 10.2072 7.33609 10.3231 7.42878C10.8196 7.82585 11.0179 8.38842 10.7056 9.24266C10.2505 10.4885 9.22882 10.6202 7.87222 10.3663C7.78904 10.3508 7.70726 10.4014 7.68566 10.4832L7.52414 11.0824C7.46306 11.3138 7.22603 11.4518 6.99467 11.3908C6.76319 11.3298 6.62506 11.0926 6.68618 10.8612L6.84101 10.2875C6.86324 10.2033 6.81295 10.1171 6.72884 10.0946C6.61038 10.0629 6.49041 10.0301 6.36863 9.99598C6.28341 9.9721 6.19494 10.0224 6.17237 10.108L6.01688 10.6851C5.95588 10.9163 5.71897 11.0543 5.48775 10.9932C5.25664 10.9322 5.11869 10.6955 5.17961 10.4643L5.33952 9.86967C5.36188 9.78479 5.31155 9.69775 5.22691 9.67449C5.1995 9.66696 5.17203 9.6594 5.1445 9.65182L5.1436 9.65157C5.02458 9.6188 4.90431 9.58569 4.78256 9.55341L4.50468 9.47686C4.19755 9.39585 4.03663 9.05848 4.16696 8.76881C4.27134 8.53681 4.52958 8.41694 4.77541 8.48242C4.77988 8.48361 4.7843 8.48479 4.78868 8.48595C4.84757 8.50157 4.84473 8.49023 4.90409 8.4765C5.02494 8.44855 5.08888 8.34885 5.11971 8.2752L5.69957 6.078L5.70108 6.07204L6.11095 4.51802C6.11349 4.5084 6.11518 4.49858 6.11565 4.48865C6.12282 4.33833 6.18991 4.18684 5.97081 4.08327C5.92336 4.06085 5.87669 4.03952 5.82597 4.02603C5.81758 4.0238 5.80892 4.02151 5.80003 4.01918C5.55193 3.954 5.40061 3.7018 5.46597 3.45375C5.53051 3.20887 5.78141 3.06273 6.02626 3.12741L6.51367 3.26409C6.63858 3.29693 6.76622 3.3287 6.89587 3.36037C6.97969 3.38084 7.06441 3.3303 7.08644 3.24687L7.22919 2.722C7.29025 2.49074 7.52721 2.35275 7.75848 2.41376C7.9898 2.47479 8.12784 2.71179 8.0668 2.94311L7.93196 3.43844C7.90985 3.52223 7.96087 3.6078 8.04506 3.62833C8.16859 3.65845 8.29203 3.6889 8.41417 3.72009C8.4966 3.74114 8.58086 3.69207 8.60256 3.60981L8.73588 3.11979C8.79692 2.88839 9.03398 2.75027 9.26539 2.81129C9.49683 2.87232 9.63496 3.10941 9.57392 3.34084L9.42905 3.87456C9.40794 3.95461 9.45175 4.03735 9.52902 4.06707ZM7.41985 5.36848L7.53445 4.93355C7.58781 4.73103 7.79524 4.61012 7.99776 4.66348C8.20028 4.71684 8.32119 4.92427 8.26783 5.12679L8.15323 5.56172L8.58812 5.67631C8.79064 5.72967 8.91155 5.9371 8.85819 6.13962C8.80483 6.34214 8.5974 6.46305 8.39488 6.40969L7.95999 6.2951L7.84539 6.73004C7.79203 6.93256 7.5846 7.05348 7.38208 7.00012C7.17956 6.94675 7.05865 6.73932 7.11201 6.53681L7.22661 6.10186L6.79163 5.98725C6.58911 5.93389 6.4682 5.72646 6.52156 5.52394C6.57492 5.32142 6.78235 5.20051 6.98487 5.25387L7.41985 5.36848ZM8.44291 7.37958L8.32831 7.81451L7.89332 7.6999C7.6908 7.64654 7.48337 7.76745 7.43001 7.96997C7.37665 8.17249 7.49757 8.37992 7.70008 8.43328L8.13507 8.54789L8.02046 8.98284C7.9671 9.18536 8.08802 9.39279 8.29054 9.44615C8.49305 9.49951 8.70048 9.37859 8.75385 9.17608L8.86845 8.74113L9.30334 8.85572C9.50585 8.90908 9.71328 8.78817 9.76665 8.58565C9.82001 8.38313 9.69909 8.1757 9.49658 8.12234L9.06169 8.00775L9.17629 7.57282C9.22965 7.3703 9.10873 7.16287 8.90621 7.10951C8.7037 7.05615 8.49627 7.17707 8.44291 7.37958Z" fill="white"/>
</svg>`));
var ha;
var pa;
var ua;
var fa;
var ga;
var ma;
var ba;
var Ca = (t) => t;
var ya = (pa = class extends (ha = dr()(Te)) {
  render() {
    return ae(ua || (ua = Ca`<div class="w-full flex-col justify-center items-center">
      <bc-modal-header class="flex w-full" show-help ?closable=${0}>
        <div class="${0} mr-[2px]">
          ${0}
        </div>
        <div class="${0}">${0}</div>
      </bc-modal-header>
      <div class="flex w-full pt-8">
        ${0}
      </div>
      ${0}
    </div>`), this.closable, fr, da, gr, la, ae(this._connecting ? fa || (fa = Ca`<bci-connecting class="flex w-full"></bci-connecting>`) : ga || (ga = Ca` <bc-router-outlet class="flex w-full"></bc-router-outlet>`)), this._error ? ae(ma || (ma = Ca`<p class="mt-4 text-center font-sans text-red-500">
            ${0}
          </p>`), this._error) : null);
  }
}, pa.styles = [...ha.styles, _t(ba || (ba = Ca`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    `))], pa);
b3([Ee({ type: Boolean })], ya.prototype, "closable", void 0), ya = b3([Le("bc-connect")], ya);
var wa;
var va;
var xa;
var $a;
var _a2;
var ka;
var Sa = (t) => t;
var La = (va = class extends (wa = dr()(Te)) {
  constructor() {
    super(), this.paymentMethods = "all", this._showConnect = false, m3.subscribe((t, e2) => {
      t.connected !== e2.connected && t.connected && (this._showConnect = false);
    });
  }
  render() {
    return this._showConnect && !this.paid ? ae(xa || (xa = Sa` <bc-connect closable=${0}></bc-connect>`), true) : ae($a || ($a = Sa`<div class="w-full flex-col justify-center items-center">
          <bc-modal-header class="flex w-full" ?closable=${0}>
            <p
              class="font-sans font-medium ${0}"
            >
              Payment Request
            </p>
          </bc-modal-header>
          <div class="flex flex-col justify-center items-center w-full pt-8">
            <bc-send-payment
              .invoice=${0}
              .paymentMethods=${0}
              ?paid=${0}
              @onclickconnectwallet=${0}
            ></bc-send-payment>
          </div>
          ${0}
        </div>`), this.closable, br, this.invoice, this.paymentMethods, this.paid, this._onClickConnectWallet, this._error ? ae(_a2 || (_a2 = Sa`<p class="mt-4 text-center font-sans text-red-500">
                ${0}
              </p>`), this._error) : null);
  }
  _onClickConnectWallet() {
    this._showConnect = true;
  }
}, va.styles = [...wa.styles, _t(ka || (ka = Sa`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    `))], va);
b3([Ee({ type: Boolean })], La.prototype, "closable", void 0), b3([Ee({ type: String })], La.prototype, "invoice", void 0), b3([Ee({ type: String, attribute: "payment-methods" })], La.prototype, "paymentMethods", void 0), b3([Ee({ type: Boolean })], La.prototype, "paid", void 0), b3([He()], La.prototype, "_showConnect", void 0), La = b3([Le("bc-payment")], La);
var Aa = { NostrWebLNProvider: H.NostrWebLNProvider, LNCWebLNProvider: d3, LnbitsWebLNProvider: h };

// node_modules/.pnpm/@getalby+bitcoin-connect-react@3.6.2_@types+react@18.3.10_react@18.3.1_typescript@5.6.2/node_modules/@getalby/bitcoin-connect-react/dist/index.modern.js
function i2(i3) {
  import_react.default.useEffect(() => {
    if (i3.onConnected) {
      const n2 = Sr(i3.onConnected);
      return () => {
        n2();
      };
    }
    return () => {
    };
  }, []), import_react.default.useEffect(() => {
    if (i3.onConnecting) {
      const n2 = Lr(i3.onConnecting);
      return () => {
        n2();
      };
    }
    return () => {
    };
  }, []), import_react.default.useEffect(() => {
    if (i3.onDisconnected) {
      const n2 = Ar(i3.onDisconnected);
      return () => {
        n2();
      };
    }
    return () => {
    };
  }, []), import_react.default.useEffect(() => {
    if (i3.onModalOpened) {
      const n2 = Mr(i3.onModalOpened);
      return () => {
        n2();
      };
    }
    return () => {
    };
  }, []), import_react.default.useEffect(() => {
    if (i3.onModalClosed) {
      const n2 = Er(i3.onModalClosed);
      return () => {
        n2();
      };
    }
    return () => {
    };
  }, []);
}
var a2 = (e2) => (i2(e2), import_react.default.createElement("bc-button", null));
function d4() {
  return d4 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t = arguments[e2];
      for (var o2 in t) Object.prototype.hasOwnProperty.call(t, o2) && (n2[o2] = t[o2]);
    }
    return n2;
  }, d4.apply(this, arguments);
}
function s2(e2, t) {
  import_react.default.useEffect(() => {
    const n2 = (n3) => {
      null == e2 || e2(n3.detail);
    };
    return window.addEventListener("bc:onpaid", n2), t && window.dispatchEvent(new CustomEvent("bc:onpaid", { detail: t })), () => {
      window.removeEventListener("bc:onpaid", n2);
    };
  }, [e2, t]);
}
var l3 = (e2) => {
  i2(e2);
  const { onPaid: t, payment: o2 } = e2;
  return s2(t, o2), import_react.default.createElement("bc-pay-button", d4({ invoice: e2.invoice }, e2.paymentMethods ? { "payment-methods": e2.paymentMethods } : {}, { preimage: null == o2 ? void 0 : o2.preimage, onClick: e2.onClick }));
};
var u3 = (e2) => (i2(e2), import_react.default.createElement("bc-connect", null));
var p4 = (e2) => {
  i2(e2);
  const { onPaid: t, payment: o2 } = e2;
  return s2(t, o2), import_react.default.createElement("bc-payment", d4({ invoice: e2.invoice }, e2.paymentMethods ? { "payment-methods": e2.paymentMethods } : {}, o2 ? { paid: true } : {}));
};
export {
  a2 as Button,
  u3 as Connect,
  l3 as PayButton,
  p4 as Payment,
  Aa as WebLNProviders,
  Or as closeModal,
  Vr as disconnect,
  Rr as getConnectorConfig,
  Pr as init,
  Ur as isConnected,
  Nr as launchModal,
  Tr as launchPaymentModal,
  Sr as onConnected,
  Lr as onConnecting,
  Ar as onDisconnected,
  Er as onModalClosed,
  Mr as onModalOpened,
  Hr as requestProvider
};
/*! Bundled license information:

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ciphers/esm/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=@getalby_bitcoin-connect-react.js.map
