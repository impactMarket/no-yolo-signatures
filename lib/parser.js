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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDescription = exports.Parser = exports.UnknownError = exports.AbiMismatchError = exports.NoAbiFetchersError = exports.ParserErrorTypes = void 0;
var base_1 = require("@celo/base");
var abi_1 = require("@ethersproject/abi");
var _1 = require(".");
var abiFetcher_1 = require("./abiFetcher");
var bignumber_js_1 = require("bignumber.js");
var ParserErrorTypes;
(function (ParserErrorTypes) {
    ParserErrorTypes["NoAbiFetchers"] = "NoAbiFetchers";
    ParserErrorTypes["AbiMismatch"] = "AbiMismatch";
    ParserErrorTypes["Unknown"] = "Unknown";
})(ParserErrorTypes = exports.ParserErrorTypes || (exports.ParserErrorTypes = {}));
var NoAbiFetchersError = /** @class */ (function (_super) {
    __extends(NoAbiFetchersError, _super);
    function NoAbiFetchersError(error) {
        var _this = _super.call(this, ParserErrorTypes.NoAbiFetchers) || this;
        _this.message = error.message;
        return _this;
    }
    return NoAbiFetchersError;
}(base_1.RootError));
exports.NoAbiFetchersError = NoAbiFetchersError;
var AbiMismatchError = /** @class */ (function (_super) {
    __extends(AbiMismatchError, _super);
    function AbiMismatchError(error) {
        var _this = _super.call(this, ParserErrorTypes.AbiMismatch) || this;
        _this.message = error.message;
        return _this;
    }
    return AbiMismatchError;
}(base_1.RootError));
exports.AbiMismatchError = AbiMismatchError;
var UnknownError = /** @class */ (function (_super) {
    __extends(UnknownError, _super);
    function UnknownError(error) {
        var _this = _super.call(this, ParserErrorTypes.Unknown) || this;
        _this.message = error.message;
        return _this;
    }
    return UnknownError;
}(base_1.RootError));
exports.UnknownError = UnknownError;
var Parser = /** @class */ (function () {
    /**
     * Creates a new instance of the parser
     * @param abiFetchers Array of AbiFetchers, order matters as priority (i.e. proxy fetcher before plain fetcher)
     */
    function Parser(opts) {
        this.parseTransactionDescription = (0, base_1.makeAsyncThrowable)(this.parseTransactionDescriptionAsResult.bind(this));
        this.abiFetchers = opts.abiFetchers ? opts.abiFetchers : [];
        this.addressInfoFetchers = opts.addressInfoFetchers ? opts.addressInfoFetchers : [];
        this.advancedMode = opts.advancedMode !== undefined ? opts.advancedMode : true;
        this.addressesLength = opts.addressesLength && opts.addressesLength > 3 ? opts.addressesLength : -1;
        this.decimalPlaces = opts.decimalPlaces && opts.decimalPlaces ? opts.decimalPlaces : -1;
    }
    Parser.prototype.parseAsResult = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionDescription, addressInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parseTransactionDescriptionAsResult(tx)];
                    case 1:
                        transactionDescription = _a.sent();
                        return [4 /*yield*/, this.getAddressInfo(tx, transactionDescription)];
                    case 2:
                        addressInfo = _a.sent();
                        return [2 /*return*/, {
                                transactionDescription: transactionDescription,
                                addressInfo: addressInfo
                            }];
                }
            });
        });
    };
    Parser.prototype.getAddressInfo = function (tx, txDescriptionResult) {
        return __awaiter(this, void 0, void 0, function () {
            var addresses, addressesFromTxDescription, context, result, ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addresses = [tx.from, tx.to];
                        if (txDescriptionResult.ok) {
                            addressesFromTxDescription = txDescriptionResult.result.args.flatMap(function (arg, index) {
                                var fragment = txDescriptionResult.result.functionFragment.inputs[index];
                                return _this.collectAddressesFromParam(arg, fragment);
                            });
                            addresses.push.apply(addresses, addressesFromTxDescription);
                        }
                        context = { tx: tx };
                        return [4 /*yield*/, Promise.all(addresses.map(function (address) { return __awaiter(_this, void 0, void 0, function () {
                                var info;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.all(this.addressInfoFetchers.map(function (_) { return _.fetchInfo(address, context); }))];
                                        case 1:
                                            info = _a.sent();
                                            return [2 /*return*/, [address, info.flat()]];
                                    }
                                });
                            }); }))];
                    case 1:
                        result = _a.sent();
                        ret = {};
                        result.forEach(function (_a) {
                            var address = _a[0], info = _a[1];
                            return ret[address] = info;
                        });
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    Parser.prototype.collectAddressesFromParam = function (paramValue, paramType) {
        var _this = this;
        if (paramType.arrayChildren) {
            return paramValue.flatMap(function (arg) { return _this.collectAddressesFromParam(arg, paramType.arrayChildren); });
        }
        if (paramType.type === 'address') {
            return [paramValue];
        }
        return [];
    };
    Parser.prototype.parseTransactionDescriptionAsResult = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var abis, abiInterface, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.abiFetchers.length === 0) {
                            return [2 /*return*/, (0, base_1.Err)(new NoAbiFetchersError(new Error('No AbiFetchers specified')))];
                        }
                        return [4 /*yield*/, (0, abiFetcher_1.getAbisFromFetchers)(this.abiFetchers, tx.to)];
                    case 1:
                        abis = _a.sent();
                        if (!abis.ok) {
                            return [2 /*return*/, abis];
                        }
                        abiInterface = new abi_1.Interface(abis.result[0]);
                        try {
                            data = abiInterface.parseTransaction(tx);
                            return [2 /*return*/, (0, base_1.Ok)(data)];
                        }
                        catch (error) {
                            if (error instanceof Error) {
                                return [2 /*return*/, (0, base_1.Err)(new AbiMismatchError(error))];
                            }
                            return [2 /*return*/, (0, base_1.Err)(new UnknownError(error.toString()))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Parser.prototype.formatParam = function (paramValue, paramType, addressInfo) {
        var _this = this;
        if (paramType.arrayChildren) {
            return "[" + paramValue
                .map(function (el) { return _this.formatParam(el, paramType.arrayChildren, addressInfo); })
                .join(', ') + "]";
        }
        if (paramType.type === 'uint256') {
            return this.advancedMode
                ? paramValue.toString()
                : new bignumber_js_1.BigNumber(paramValue.toString()).div(new bignumber_js_1.BigNumber(10).pow(18)).toFixed(this.decimalPlaces !== -1 ? this.decimalPlaces : 18);
        }
        if (paramType.type === 'address') {
            var formattedValue = this.formatAddress(paramValue, addressInfo);
            if (this.addressesLength !== -1) {
                var cut = (this.addressesLength / 2);
                return "\"" + formattedValue.slice(0, cut + 2) + "..." + formattedValue.slice(formattedValue.length - cut, formattedValue.length) + "\"";
            }
            return "\"" + formattedValue + "\"";
        }
        return paramValue;
    };
    Parser.prototype.formatAddress = function (address, addressInfo) {
        if (!addressInfo)
            return address;
        var addyInfo = addressInfo[address];
        if (addyInfo.length === 0)
            return address;
        switch (addyInfo[0].type) {
            case _1.AddressInfoType.TokenListInfo:
                return "Token: " + addyInfo[0].name + " (" + addyInfo[0].symbol + ")";
            case _1.AddressInfoType.GenericAddressInfo:
                return addyInfo[0].name;
        }
        return address;
    };
    Parser.prototype.formatTxDescriptionToHuman = function (description, addressInfo) {
        var _this = this;
        var functionName = description.name;
        var inputs = description.args.map(function (arg, index) {
            var fragment = description.functionFragment.inputs[index];
            return fragment.name + ": " + _this.formatParam(arg, fragment, addressInfo);
        });
        return functionName + "(" + inputs.join(', ') + ")";
    };
    return Parser;
}());
exports.Parser = Parser;
var abi_2 = require("@ethersproject/abi");
Object.defineProperty(exports, "TransactionDescription", { enumerable: true, get: function () { return abi_2.TransactionDescription; } });
//# sourceMappingURL=parser.js.map