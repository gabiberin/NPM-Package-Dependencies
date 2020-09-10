"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
var path = require("path");
var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var package_1 = require("./endpoints/package");
/**
 * Bootstrap the application framework
 */
function createApp() {
    var app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev', {
        skip: function (req, res) { return res.statusCode < 400; }
    }));
    // Package API
    app.get('/api/package/:name/:version', package_1.getPackage);
    app.get('/api/package/:scope/:name/:version', package_1.getScopedPackage);
    // Handle production
    //if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(path.resolve(__dirname + '/../public/')));
    // Handle SPA
    app.get(/.*/, function (req, res) { return res.sendFile(path.resolve(__dirname + '/../public/index.html')); });
    //}
    return app;
}
exports.createApp = createApp;
//# sourceMappingURL=index.js.map