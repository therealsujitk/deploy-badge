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
const node_cache_1 = __importDefault(require("node-cache"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = (0, express_1.default)();
const cache = new node_cache_1.default();
function createBadge(badge) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL(`http://img.shields.io/badge/label-${badge.message}-${badge.color}`);
        url.searchParams.append('style', badge.style);
        url.searchParams.append('logo', badge.logo);
        url.searchParams.append('label', badge.label);
        if (cache.has(url.toString())) {
            return cache.get(url.toString());
        }
        const response = yield (0, node_fetch_1.default)(url);
        const body = yield response.text();
        cache.set(url.toString(), body);
        return body;
    });
}
app.use(express_1.default.static(__dirname + '/frontend/build', { index: false }));
app.get('/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    if (!("app" in req.query)) {
        return res.status(200).sendFile(__dirname + '/frontend/build/index.html');
    }
    const appName = req.query.app;
    const root = (_a = req.query.root) !== null && _a !== void 0 ? _a : '';
    const style = (_b = req.query.style) !== null && _b !== void 0 ? _b : 'flat';
    const label = (_d = (_c = req.query.label) !== null && _c !== void 0 ? _c : req.query.name) !== null && _d !== void 0 ? _d : 'vercel';
    const logo = (_e = req.query.logo) !== null && _e !== void 0 ? _e : 'vercel';
    const url = appName + '.vercel.app/' + root;
    const handleRequest = (statusCode = 404) => __awaiter(void 0, void 0, void 0, function* () {
        const badge = {
            label: label,
            message: 'deployed',
            color: 'brightgreen',
            style: style,
            logo: logo,
        };
        if (statusCode <= 599 && statusCode >= 500) {
            badge.message = 'failed';
            badge.color = 'red';
        }
        else if (statusCode <= 499 && statusCode >= 400) {
            badge.message = 'not found';
            badge.color = 'lightgrey';
        }
        else if (statusCode <= 399 && statusCode >= 300) {
        }
        createBadge(badge)
            .then(badge => res.setHeader('Content-type', 'image/svg+xml').status(200).send(badge))
            .catch(_ => res.status(500).send('Internal Server Error. Please open an issue at <a href="https://github.com/therealsujitk/vercel-badge/issues">vercel-badge/issues</a>.'));
    });
    (0, node_fetch_1.default)(`http://${url}`)
        .then(response => handleRequest(response.status))
        .catch(_ => handleRequest());
}));
exports.default = app;
