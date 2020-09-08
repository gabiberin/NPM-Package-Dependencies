"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
var LRU = require("lru-cache");
var options = { max: 500,
    length: function (n, key) { return n * 2 + key.length; },
    dispose: function (key, n) { n.close(); },
    maxAge: 1000 * 60 * 60 };
var cache = new LRU(options);
exports.cache = cache;
//# sourceMappingURL=index.js.map