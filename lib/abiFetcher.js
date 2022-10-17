"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.getAbiFetchersForChainId = exports.getAbisFromFetchers = exports.ProxyAbiFetcher = exports.ExplorerAbiFetcher = exports.SourcifyAbiFetcher = exports.NotFoundError = exports.NoProxyError = exports.FetchingAbiError = exports.FetchAbiErrorTypes = void 0;
var base_1 = require("@celo/base");
var providers_1 = require("@ethersproject/providers");
var cross_fetch_1 = require("cross-fetch");
var networks_1 = require("./networks");
var proxy_v1_1 = __importDefault(require("./static/proxy-v1"));
var usdc_proxy_1 = __importDefault(require("./static/usdc-proxy"));
var FetchAbiErrorTypes;
(function (FetchAbiErrorTypes) {
    FetchAbiErrorTypes["FetchAbiError"] = "FetchAbiError";
    FetchAbiErrorTypes["NoProxy"] = "NoProxy";
    FetchAbiErrorTypes["NotFound"] = "NotFound";
})(FetchAbiErrorTypes = exports.FetchAbiErrorTypes || (exports.FetchAbiErrorTypes = {}));
var FetchingAbiError = /** @class */ (function (_super) {
    __extends(FetchingAbiError, _super);
    function FetchingAbiError(error) {
        var _this = _super.call(this, FetchAbiErrorTypes.FetchAbiError) || this;
        _this.message = error.message;
        return _this;
    }
    return FetchingAbiError;
}(base_1.RootError));
exports.FetchingAbiError = FetchingAbiError;
var NoProxyError = /** @class */ (function (_super) {
    __extends(NoProxyError, _super);
    function NoProxyError(error) {
        var _this = _super.call(this, FetchAbiErrorTypes.NoProxy) || this;
        _this.message = error.message;
        return _this;
    }
    return NoProxyError;
}(base_1.RootError));
exports.NoProxyError = NoProxyError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(errors) {
        var _this = _super.call(this, FetchAbiErrorTypes.NotFound) || this;
        _this.errors = errors;
        _this.message = 'No ABIs could be found';
        return _this;
    }
    return NotFoundError;
}(base_1.RootError));
exports.NotFoundError = NotFoundError;
var fetchAsResult = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, cross_fetch_1.fetch)(input)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, (0, base_1.Ok)(res)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, Promise.resolve((0, base_1.Err)(new FetchingAbiError(error_1)))];
            case 3: return [2 /*return*/];
        }
    });
}); };
var SourcifyAbiFetcher = /** @class */ (function () {
    function SourcifyAbiFetcher(chainId) {
        this.chainId = chainId;
    }
    SourcifyAbiFetcher.prototype.fetchAbiForAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var requestResult, data, abi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchAsResult("https://repo.sourcify.dev/contracts/full_match/" + this.chainId + "/" + address + "/metadata.json")];
                    case 1:
                        requestResult = _a.sent();
                        if (!requestResult.ok) {
                            return [2 /*return*/, requestResult];
                        }
                        if (!requestResult.result.ok) {
                            return [2 /*return*/, (0, base_1.Err)(new FetchingAbiError(new Error('Could not fetch ABI')))];
                        }
                        return [4 /*yield*/, requestResult.result.json()];
                    case 2:
                        data = _a.sent();
                        abi = data.output.abi;
                        return [2 /*return*/, (0, base_1.Ok)(abi)];
                }
            });
        });
    };
    return SourcifyAbiFetcher;
}());
exports.SourcifyAbiFetcher = SourcifyAbiFetcher;
var ExplorerAbiFetcher = /** @class */ (function () {
    function ExplorerAbiFetcher(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }
    ExplorerAbiFetcher.prototype.fetchAbiForAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var apiKeyS, requestResult, data, abi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiKeyS = this.apiKey ? "&apikey=" + this.apiKey : '';
                        return [4 /*yield*/, fetchAsResult(this.baseUrl + "/api?module=contract&action=getabi&address=" + address + apiKeyS)];
                    case 1:
                        requestResult = _a.sent();
                        if (!requestResult.ok) {
                            return [2 /*return*/, requestResult];
                        }
                        if (!requestResult.result.ok) {
                            return [2 /*return*/, (0, base_1.Err)(new FetchingAbiError(new Error('Could not fetch ABI. Status:' + requestResult.result.status)))];
                        }
                        return [4 /*yield*/, requestResult.result.json()];
                    case 2:
                        data = _a.sent();
                        if (data.status !== '1') {
                            return [2 /*return*/, (0, base_1.Err)(new FetchingAbiError(new Error("Error from " + this.baseUrl + ": " + (data.result || data.message))))];
                        }
                        abi = JSON.parse(data.result);
                        return [2 /*return*/, (0, base_1.Ok)(abi)];
                }
            });
        });
    };
    return ExplorerAbiFetcher;
}());
exports.ExplorerAbiFetcher = ExplorerAbiFetcher;
var ProxyAbiFetcher = /** @class */ (function () {
    function ProxyAbiFetcher(provider, abiFetchers, knownProxies) {
        if (knownProxies === void 0) { knownProxies = [proxy_v1_1.default, usdc_proxy_1.default]; }
        this.provider = provider;
        this.abiFetchers = abiFetchers;
        this.knownProxies = knownProxies;
    }
    ProxyAbiFetcher.prototype.fetchAbiForAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var contractCode, contractCodeStripped, matchingProxy, implementationAdress, implementationABI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.getCode(address)];
                    case 1:
                        contractCode = _a.sent();
                        contractCodeStripped = stripMetadataFromBytecode(contractCode);
                        matchingProxy = this.knownProxies.find(function (_) { return stripMetadataFromBytecode(_.bytecode) === contractCodeStripped; });
                        if (!matchingProxy) {
                            return [2 /*return*/, (0, base_1.Err)(new NoProxyError(new Error('Is not a proxy')))];
                        }
                        return [4 /*yield*/, this.getImplementationAddress(matchingProxy, address)
                            // Get ABI of Implementation
                        ];
                    case 2:
                        implementationAdress = _a.sent();
                        return [4 /*yield*/, (0, exports.getAbisFromFetchers)(this.abiFetchers, implementationAdress)];
                    case 3:
                        implementationABI = _a.sent();
                        if (!implementationABI.ok) {
                            return [2 /*return*/, implementationABI];
                        }
                        return [2 /*return*/, (0, base_1.Ok)(implementationABI.result[0])];
                }
            });
        });
    };
    ProxyAbiFetcher.prototype.getImplementationAddress = function (knownProxy, address) {
        return __awaiter(this, void 0, void 0, function () {
            var storageRead;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.getStorageAt(address, knownProxy.location)];
                    case 1:
                        storageRead = _a.sent();
                        return [2 /*return*/, '0x' + storageRead.substring(26)];
                }
            });
        });
    };
    return ProxyAbiFetcher;
}());
exports.ProxyAbiFetcher = ProxyAbiFetcher;
var getAbisFromFetchers = function (abiFetchers, address) { return __awaiter(void 0, void 0, void 0, function () {
    var abis, successFullAbis, failedAbis;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(abiFetchers.map(function (f) { return f.fetchAbiForAddress(address); }))];
            case 1:
                abis = _a.sent();
                successFullAbis = abis.filter(base_1.isOk);
                if (successFullAbis.length > 0) {
                    return [2 /*return*/, (0, base_1.Ok)(successFullAbis.map(function (_) { return _.result; }))];
                }
                else {
                    failedAbis = abis.filter(base_1.isErr);
                    return [2 /*return*/, (0, base_1.Err)(new NotFoundError(failedAbis.map(function (_) { return _.error; })))];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getAbisFromFetchers = getAbisFromFetchers;
var getAbiFetchersForChainId = function (chainId, opts) {
    var _a;
    var sourcifyAbiFetcher = new SourcifyAbiFetcher(chainId);
    var network = networks_1.NETWORKS[chainId];
    if (!network) {
        return [sourcifyAbiFetcher];
    }
    var explorerAbiFetcher = new ExplorerAbiFetcher(network.explorerAPIURL, opts === null || opts === void 0 ? void 0 : opts.explorerAPIKey);
    var rpcUrl = ((_a = opts === null || opts === void 0 ? void 0 : opts.rpcUrls) === null || _a === void 0 ? void 0 : _a[chainId]) || network.rpcURL;
    var provider = new providers_1.JsonRpcProvider(rpcUrl);
    var proxyAbiFetcher = new ProxyAbiFetcher(provider, [sourcifyAbiFetcher, explorerAbiFetcher]);
    if (opts === null || opts === void 0 ? void 0 : opts.accomodateRateLimit) {
        return [proxyAbiFetcher, sourcifyAbiFetcher];
    }
    return [proxyAbiFetcher, explorerAbiFetcher, sourcifyAbiFetcher];
};
exports.getAbiFetchersForChainId = getAbiFetchersForChainId;
var stripMetadataFromBytecode = function (bytecode) {
    // Docs:
    // https://docs.soliditylang.org/en/develop/metadata.html#encoding-of-the-metadata-hash-in-the-bytecode
    // Metadata format has changed once, but can be detected using last two bytes.
    switch (bytecode.substring(bytecode.length - 4)) {
        case '0029':
            // Format: 0xa1 0x65 'b' 'z' 'z' 'r' '0' 0x58 0x20 <32 bytes of swarm> 0x00 0x29
            return bytecode.substring(0, bytecode.length - 43 * 2);
        case '0032':
            // Format:
            // 0xa2 0x65 'b' 'z' 'z' 'r' '0' 0x58 0x20 <32 bytes of swarm>
            // 0x64 's' 'o' 'l' 'c' 0x43 <3 byte version encoding>
            // 0x00 0x32
            return bytecode.substring(0, bytecode.length - 52 * 2);
        default:
            return bytecode;
    }
};
//# sourceMappingURL=abiFetcher.js.map