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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var celoAbiFetchers, celoAddressInfoFetchers, parser, provider, parseResult, txHash, tx, parseResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    celoAbiFetchers = (0, _1.getAbiFetchersForChainId)(42220);
                    return [4 /*yield*/, (0, _1.getAddressInfoFetchersForChainId)(42220)];
                case 1:
                    celoAddressInfoFetchers = _a.sent();
                    parser = new parser_1.Parser({ abiFetchers: celoAbiFetchers, addressInfoFetchers: celoAddressInfoFetchers });
                    provider = new ethers_1.ethers.providers.JsonRpcProvider('https://forno.celo.org');
                    if (!(process.argv.length > 3)) return [3 /*break*/, 3];
                    return [4 /*yield*/, parser.parseAsResult({
                            from: '',
                            to: process.argv[2],
                            data: process.argv[3],
                            value: process.argv[4] || 0,
                        })];
                case 2:
                    parseResult = _a.sent();
                    if (!parseResult.transactionDescription.ok) {
                        console.log('Could not decode transaction');
                        return [2 /*return*/];
                    }
                    console.log("To: " + parser.formatAddress(process.argv[2], parseResult.addressInfo));
                    console.log(parser.formatTxDescriptionToHuman(parseResult.transactionDescription.result, parseResult.addressInfo));
                    return [3 /*break*/, 6];
                case 3:
                    txHash = process.argv[2];
                    return [4 /*yield*/, provider.getTransaction(txHash)];
                case 4:
                    tx = _a.sent();
                    return [4 /*yield*/, parser.parseAsResult({
                            from: tx.from,
                            to: tx.to,
                            data: tx.data,
                            value: tx.value,
                        })];
                case 5:
                    parseResult = _a.sent();
                    if (!parseResult.transactionDescription.ok) {
                        console.log('Could not decode transaction');
                        return [2 /*return*/];
                    }
                    console.log(parser.formatTxDescriptionToHuman(parseResult.transactionDescription.result, parseResult.addressInfo));
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
//# sourceMappingURL=cli-parse.js.map