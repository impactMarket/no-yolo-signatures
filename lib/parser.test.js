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
var ethers_1 = require("ethers");
var _1 = require(".");
var parser_1 = require("./parser");
// Real network tests
var celoAbiFetchers = (0, _1.getAbiFetchersForChainId)(42220);
var ethAbiFetchers = (0, _1.getAbiFetchersForChainId)(1, { accomodateRateLimit: true });
var celoAddressInfoFetchers;
describe('Real transaction tests', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, _1.getAddressInfoFetchersForChainId)(42220)];
                case 1:
                    celoAddressInfoFetchers = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('can properly decode a basic Celo TX', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parser, provider, txHash, tx, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parser = new parser_1.Parser({ abiFetchers: celoAbiFetchers, addressInfoFetchers: celoAddressInfoFetchers });
                    provider = new ethers_1.ethers.providers.JsonRpcProvider('https://forno.celo.org');
                    txHash = '0x13c0fb425956878519a59cb67ad0f76f2399223c84b8fe5383f005d38b75c345';
                    return [4 /*yield*/, provider.getTransaction(txHash)];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, parser.parseAsResult({
                            from: tx.from,
                            to: tx.to,
                            data: tx.data,
                            value: tx.value,
                        })];
                case 2:
                    result = _a.sent();
                    if (!result.transactionDescription.ok) {
                        throw new Error();
                    }
                    expect(parser.formatTxDescriptionToHuman(result.transactionDescription.result)).toEqual("swapExactTokensForTokens(amountIn: 10768150309273298380, amountOutMin: 1868254991157015353, path: [\"0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B\", \"0x471EcE3750Da237f93B8E339c536989b8978a438\", \"0xa8d0E6799FF3Fd19c6459bf02689aE09c4d78Ba7\"], to: \"0x2fcE67597ffbc863dFE8Cec25cCbE80961768CE8\", deadline: 1634594476)");
                    return [2 /*return*/];
            }
        });
    }); });
    it('can properly decode a Celo Core proxied TX', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parser, provider, txHash, tx, txDescription;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parser = new parser_1.Parser({ abiFetchers: celoAbiFetchers });
                    provider = new ethers_1.ethers.providers.JsonRpcProvider('https://forno.celo.org');
                    txHash = '0x3d17faf7c8e9e5fdc69570c9b620cf5eb79db2e3e3c1bb6f9f1e1cd72184aeb9';
                    return [4 /*yield*/, provider.getTransaction(txHash)];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, parser.parseTransactionDescription({
                            from: tx.from,
                            to: tx.to,
                            data: tx.data,
                            value: tx.value,
                        })];
                case 2:
                    txDescription = _a.sent();
                    expect(parser.formatTxDescriptionToHuman(txDescription)).toEqual("approve(spender: \"0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121\", value: 115792089237316195423570985008687907853269984665640564039457584007913129639935)");
                    return [2 /*return*/];
            }
        });
    }); });
    it('can properly decode a Celo Core proxied TX without advanced mode and short addresses', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parser, provider, txHash, tx, txDescription;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parser = new parser_1.Parser({ abiFetchers: celoAbiFetchers, advancedMode: false, decimalPlaces: 3, addressesLength: 4 });
                    provider = new ethers_1.ethers.providers.JsonRpcProvider('https://forno.celo.org');
                    txHash = '0x3d17faf7c8e9e5fdc69570c9b620cf5eb79db2e3e3c1bb6f9f1e1cd72184aeb9';
                    return [4 /*yield*/, provider.getTransaction(txHash)];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, parser.parseTransactionDescription({
                            from: tx.from,
                            to: tx.to,
                            data: tx.data,
                            value: tx.value,
                        })];
                case 2:
                    txDescription = _a.sent();
                    expect(parser.formatTxDescriptionToHuman(txDescription)).toEqual("approve(spender: \"0xE3...21\", value: 115792089237316195423570985008687907853269984665640564039457.584)");
                    return [2 /*return*/];
            }
        });
    }); });
    it('can decode a Ethereum proxied TX', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parser, provider, txHash, tx, txDescription;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parser = new parser_1.Parser({ abiFetchers: ethAbiFetchers });
                    provider = new ethers_1.ethers.providers.JsonRpcProvider('https://mainnet-nethermind.blockscout.com/');
                    txHash = '0xb87ec0c256b81be5ca98040e58f27483167c773ef38c024e71e209410f8d26b3';
                    return [4 /*yield*/, provider.getTransaction(txHash)];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, parser.parseTransactionDescription({
                            from: tx.from,
                            to: tx.to,
                            data: tx.data,
                            value: tx.value,
                        })];
                case 2:
                    txDescription = _a.sent();
                    expect(parser.formatTxDescriptionToHuman(txDescription)).toEqual("transfer(to: \"0x4F990a64ad8B39737d69452E50baB50B5257c46a\", value: 290000000)");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=parser.test.js.map