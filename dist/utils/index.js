"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = exports.getLink = void 0;
var semver_1 = require("semver");
var getLink = function (name) {
    return (process.env.REGISTRY_URL) ? process.env.REGISTRY_URL + name : "https://registry.npmjs.org/" + name;
};
exports.getLink = getLink;
var getVersion = function (npmPackage, version) {
    if (npmPackage['dist-tags'][version]) {
        var packageVersion_1 = npmPackage['dist-tags'][version];
        if (!npmPackage.versions[packageVersion_1]) {
            return false;
        }
        return npmPackage.versions[packageVersion_1];
    }
    var packageVersion = semver_1.maxSatisfying(Object.keys(npmPackage.versions), version);
    if (!packageVersion || !npmPackage.versions[packageVersion]) {
        return false;
    }
    return npmPackage.versions[packageVersion];
};
exports.getVersion = getVersion;
//# sourceMappingURL=index.js.map