import { Result, RootError } from '@celo/base';
import { TransactionDescription } from '@ethersproject/abi';
import { AbiFetcher, FetchAbiError } from './abiFetcher';
import { AddressFetchResult, AddressInfoFetcher } from './addressInfo';
import { Transaction } from './types';
export declare enum ParserErrorTypes {
    NoAbiFetchers = "NoAbiFetchers",
    AbiMismatch = "AbiMismatch",
    Unknown = "Unknown"
}
export declare class NoAbiFetchersError extends RootError<ParserErrorTypes.NoAbiFetchers> {
    constructor(error: Error);
}
export declare class AbiMismatchError extends RootError<ParserErrorTypes.AbiMismatch> {
    constructor(error: Error);
}
export declare class UnknownError extends RootError<ParserErrorTypes.Unknown> {
    constructor(error: Error);
}
export declare type ParserErrors = FetchAbiError | AbiMismatchError | UnknownError | NoAbiFetchersError;
interface ParserConstructorOpts {
    abiFetchers?: AbiFetcher[];
    addressInfoFetchers?: AddressInfoFetcher[];
    advancedMode?: boolean;
    decimalPlaces?: number;
    addressesLength?: number;
}
export interface ParserResult {
    transactionDescription: Result<TransactionDescription, ParserErrors>;
    addressInfo: AddressFetchResult;
}
export declare class Parser {
    readonly abiFetchers: AbiFetcher[];
    readonly addressInfoFetchers: AddressInfoFetcher[];
    readonly advancedMode: boolean;
    readonly addressesLength: number;
    readonly decimalPlaces: number;
    /**
     * Creates a new instance of the parser
     * @param abiFetchers Array of AbiFetchers, order matters as priority (i.e. proxy fetcher before plain fetcher)
     */
    constructor(opts: ParserConstructorOpts);
    parseAsResult(tx: Transaction): Promise<ParserResult>;
    getAddressInfo(tx: Transaction, txDescriptionResult: Result<TransactionDescription, ParserErrors>): Promise<AddressFetchResult>;
    private collectAddressesFromParam;
    parseTransactionDescriptionAsResult(tx: Transaction): Promise<Result<TransactionDescription, ParserErrors>>;
    parseTransactionDescription: (tx: Transaction) => Promise<TransactionDescription>;
    private formatParam;
    formatAddress(address: string, addressInfo?: AddressFetchResult): string;
    formatTxDescriptionToHuman(description: TransactionDescription, addressInfo?: AddressFetchResult): string;
}
export { TransactionDescription } from '@ethersproject/abi';
