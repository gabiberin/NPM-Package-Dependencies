"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var utils_1 = require("../utils");
var cache_1 = require("../cache");
var got_1 = require("got");
var Node = /** @class */ (function () {
    function Node(name, children) {
        this.name = name;
        this.children = children;
    }
    Node.prototype.printFromNode = function () {
        var children;
        var result = {
            name: this.name,
            children: this.printChildren()
        };
        return result;
    };
    Node.prototype.printChildren = function () {
        if (!this.children) {
            return [];
        }
        var children = [];
        this.children.forEach(function (node) {
            children.push(node.printFromNode());
        });
        return children;
    };
    Node.buildNode = function (name, version) {
        return __awaiter(this, void 0, void 0, function () {
            var npmPackage, _a, pVersion, children, _i, _b, _c, key, version_1, childrenNodes;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = cache_1.cache.get(name);
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, got_1.default(utils_1.getLink(name)).json()];
                    case 1:
                        _a = (_d.sent());
                        _d.label = 2;
                    case 2:
                        npmPackage = _a;
                        if (!cache_1.cache.has(name)) {
                            cache_1.cache.set(name, npmPackage);
                        }
                        pVersion = utils_1.getVersion(npmPackage, version);
                        if (!pVersion) {
                            throw new Error('Package not found');
                        }
                        if (!pVersion.dependencies) {
                            return [2 /*return*/, new Node(pVersion.name + "@" + pVersion.version)];
                        }
                        children = [];
                        for (_i = 0, _b = Object.entries(pVersion.dependencies); _i < _b.length; _i++) {
                            _c = _b[_i], key = _c[0], version_1 = _c[1];
                            children.push(Node.buildNode(key, version_1));
                        }
                        return [4 /*yield*/, Promise.all(children)];
                    case 3:
                        childrenNodes = _d.sent();
                        return [2 /*return*/, new Node(pVersion.name + "@" + pVersion.version, childrenNodes)];
                }
            });
        });
    };
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=Node.js.map