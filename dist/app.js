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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const got_1 = __importDefault(require("got"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const node_cache_1 = __importDefault(require("node-cache"));
const app = (0, express_1.default)();
const cache = new node_cache_1.default();
function createBadge(badge) {
    return __awaiter(this, void 0, void 0, function* () {
        badge.value = badge.value.replace(/-/g, '--').replace(/_/g, '__');
        const url = new URL(`http://img.shields.io/badge/${badge.key}-${badge.value}-${badge.color}?style=${badge.style}&logo=${badge.logo}`);
        if (cache.has(url.toString())) {
            return cache.get(url.toString());
        }
        const response = (yield (0, got_1.default)(url)).body;
        cache.set(url.toString(), response);
        return response;
    });
}
app.use(express_1.default.static(__dirname + '/frontend/build', {
    index: false
}));
app.get('/*', (req, res) => {
    var _a, _b, _c, _d;
    if (!("app" in req.query)) {
        return res.status(200).sendFile(__dirname + '/frontend/build/index.html');
    }
    const appName = req.query.app;
    const root = (_a = req.query.root) !== null && _a !== void 0 ? _a : '';
    const style = (_b = req.query.style) !== null && _b !== void 0 ? _b : 'flat';
    const badgeName = (_c = req.query.name) !== null && _c !== void 0 ? _c : 'vercel';
    const logo = (_d = req.query.logo) !== null && _d !== void 0 ? _d : 'vercel';
    const url = appName + '.vercel.app/' + root;
    const handleRequest = (statusCode = 404) => __awaiter(void 0, void 0, void 0, function* () {
        const badge = {
            key: badgeName.replace(/-/g, '--').replace(/_/g, '__'),
            value: 'deployed',
            color: 'brightgreen',
            style: style,
            logo: logo,
        };
        if (statusCode <= 599 && statusCode >= 500) {
            badge.value = 'failed';
            badge.color = 'red';
        }
        else if (statusCode <= 499 && statusCode >= 400) {
            badge.value = 'not-found';
            badge.color = 'lightgrey';
        }
        else if (statusCode <= 399 && statusCode >= 300) {
        }
        res.setHeader('Content-type', 'image/svg+xml');
        res.status(200).send(yield createBadge(badge));
    });
    try {
        https_1.default.get("https://" + url, (response) => __awaiter(void 0, void 0, void 0, function* () {
            var statusCode = response.statusCode;
            yield handleRequest(statusCode);
        })).on('error', () => {
            http_1.default.get("http://" + url, (response) => __awaiter(void 0, void 0, void 0, function* () {
                var statusCode = response.statusCode;
                yield handleRequest(statusCode);
            })).on('error', () => {
                handleRequest(404);
            });
        });
    }
    catch (_e) {
        res.status(500).send('Internal Server Error. Please open an issue at <a href="https://github.com/therealsujitk/vercel-badge/issues">vercel-badge/issues</a>.');
    }
});
exports.default = app;
