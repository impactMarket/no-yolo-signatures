"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressInfoFetchersForChainId = exports.ContextAddressInfoFetcher = exports.GenericWarningListInfoFetcher = exports.GenericAddressListInfoFetcher = exports.TokenListAddressInfoFetcher = exports.BuiltInAddressInfoFetchersType = exports.ContextInfoType = exports.AddressInfoType = void 0;
var _1 = require(".");
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var AddressInfoType;
(function (AddressInfoType) {
    AddressInfoType["TokenListInfo"] = "tokenListInfo";
    AddressInfoType["GenericAddressInfo"] = "genericAddressInfo";
    AddressInfoType["ContextInfo"] = "contextInfo";
    AddressInfoType["GenericWarningInfo"] = "genericWarningInfo";
})(AddressInfoType = exports.AddressInfoType || (exports.AddressInfoType = {}));
var ContextInfoType;
(function (ContextInfoType) {
    ContextInfoType["MsgSender"] = "msgSender";
})(ContextInfoType = exports.ContextInfoType || (exports.ContextInfoType = {}));
var BuiltInAddressInfoFetchersType;
(function (BuiltInAddressInfoFetchersType) {
    BuiltInAddressInfoFetchersType["TokenList"] = "TokenList";
    BuiltInAddressInfoFetchersType["GenericAddressList"] = "GenericAddressList";
    BuiltInAddressInfoFetchersType["GenericWarningList"] = "GenericWarningList";
    BuiltInAddressInfoFetchersType["Context"] = "Context";
})(BuiltInAddressInfoFetchersType = exports.BuiltInAddressInfoFetchersType || (exports.BuiltInAddressInfoFetchersType = {}));
var TokenListAddressInfoFetcher = /** @class */ (function () {
    function TokenListAddressInfoFetcher(tokenList, source) {
        this.tokenList = tokenList;
        this.source = source;
        this.type = BuiltInAddressInfoFetchersType.TokenList;
    }
    TokenListAddressInfoFetcher.fromURL = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, new this(json, url)];
                }
            });
        });
    };
    TokenListAddressInfoFetcher.prototype.fetchInfo = function (address) {
        var match = this.tokenList.tokens.find(function (_) { return _.address === address; });
        if (!match) {
            return Promise.resolve([]);
        }
        return Promise.resolve([__assign(__assign({ type: AddressInfoType.TokenListInfo }, match), { source: this.source })]);
    };
    return TokenListAddressInfoFetcher;
}());
exports.TokenListAddressInfoFetcher = TokenListAddressInfoFetcher;
var GenericAddressListInfoFetcher = /** @class */ (function () {
    function GenericAddressListInfoFetcher(addressList, source) {
        this.addressList = addressList;
        this.source = source;
        this.type = BuiltInAddressInfoFetchersType.GenericAddressList;
    }
    GenericAddressListInfoFetcher.fromURL = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, new this(json, url)];
                }
            });
        });
    };
    GenericAddressListInfoFetcher.prototype.fetchInfo = function (address) {
        var match = this.addressList.addresses.find(function (_) { return _.address === address; });
        if (!match) {
            return Promise.resolve([]);
        }
        return Promise.resolve([__assign(__assign({ type: AddressInfoType.GenericAddressInfo }, match), { source: this.source })]);
    };
    return GenericAddressListInfoFetcher;
}());
exports.GenericAddressListInfoFetcher = GenericAddressListInfoFetcher;
var GenericWarningListInfoFetcher = /** @class */ (function () {
    function GenericWarningListInfoFetcher(addressList, source) {
        this.addressList = addressList;
        this.source = source;
        this.type = BuiltInAddressInfoFetchersType.GenericWarningList;
    }
    GenericWarningListInfoFetcher.fromURL = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, new this(json, url)];
                }
            });
        });
    };
    GenericWarningListInfoFetcher.prototype.fetchInfo = function (address) {
        var match = this.addressList.addresses.find(function (_) { return _.address === address; });
        if (!match) {
            return Promise.resolve([]);
        }
        return Promise.resolve([__assign(__assign({ type: AddressInfoType.GenericWarningInfo }, match), { source: this.source })]);
    };
    return GenericWarningListInfoFetcher;
}());
exports.GenericWarningListInfoFetcher = GenericWarningListInfoFetcher;
var ContextAddressInfoFetcher = /** @class */ (function () {
    function ContextAddressInfoFetcher() {
        this.type = BuiltInAddressInfoFetchersType.Context;
    }
    ContextAddressInfoFetcher.prototype.fetchInfo = function (address, context) {
        if (address === context.tx.from) {
            return Promise.resolve([{
                    type: AddressInfoType.ContextInfo,
                    contextType: ContextInfoType.MsgSender
                }]);
        }
        return Promise.resolve([]);
    };
    return ContextAddressInfoFetcher;
}());
exports.ContextAddressInfoFetcher = ContextAddressInfoFetcher;
var getAddressInfoFetchersForChainId = function (chainId) { return __awaiter(void 0, void 0, void 0, function () {
    var contextFetcher, network, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                contextFetcher = new ContextAddressInfoFetcher();
                network = _1.NETWORKS[chainId];
                if (!network) {
                    return [2 /*return*/, [contextFetcher]];
                }
                if (!network.genericAddressListUrl) return [3 /*break*/, 2];
                return [4 /*yield*/, GenericAddressListInfoFetcher.fromURL(network.genericAddressListUrl)];
            case 1:
                _a = [_d.sent()];
                return [3 /*break*/, 3];
            case 2:
                _a = [];
                _d.label = 3;
            case 3:
                _b = [
                    _a
                ];
                if (!network.tokenListUrl) return [3 /*break*/, 5];
                return [4 /*yield*/, TokenListAddressInfoFetcher.fromURL(network.tokenListUrl)];
            case 4:
                _c = [_d.sent()];
                return [3 /*break*/, 6];
            case 5:
                _c = [];
                _d.label = 6;
            case 6: return [2 /*return*/, _b.concat([
                    _c,
                    [contextFetcher]
                ]).flat()];
        }
    });
}); };
exports.getAddressInfoFetchersForChainId = getAddressInfoFetchersForChainId;
//# sourceMappingURL=addressInfo.js.map