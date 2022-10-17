import { Address, Transaction, TokenList, GenericAddressList } from "./types";
export declare enum AddressInfoType {
    TokenListInfo = "tokenListInfo",
    GenericAddressInfo = "genericAddressInfo",
    ContextInfo = "contextInfo",
    GenericWarningInfo = "genericWarningInfo"
}
export declare enum ContextInfoType {
    MsgSender = "msgSender"
}
export interface TokenAddressInfo {
    type: AddressInfoType.TokenListInfo;
    chainId: number;
    symbol: string;
    address: Address;
    name: string;
    logoURI: string;
    source: string;
}
export interface GenericAddressInfo {
    type: AddressInfoType.GenericAddressInfo;
    chainId: number;
    address: Address;
    name: string;
    description: string;
    logoURI: string;
    source: string;
}
export interface GenericWarningInfo {
    type: AddressInfoType.GenericWarningInfo;
    chainId: number;
    address: Address;
    name: string;
    description: string;
    logoURI: string;
    source: string;
}
interface ContextAddressInfo {
    type: AddressInfoType.ContextInfo;
    contextType: ContextInfoType;
}
export declare type AddressInfo = TokenAddressInfo | GenericAddressInfo | ContextAddressInfo | GenericWarningInfo;
export declare type AddressFetchResult = {
    [key: Address]: Array<AddressInfo>;
};
interface AddressInfoFetchContext {
    tx: Transaction;
}
export interface AddressInfoFetcher {
    fetchInfo: (address: Address, context: AddressInfoFetchContext) => Promise<Array<AddressInfo>>;
}
export declare enum BuiltInAddressInfoFetchersType {
    TokenList = "TokenList",
    GenericAddressList = "GenericAddressList",
    GenericWarningList = "GenericWarningList",
    Context = "Context"
}
export declare type BuiltInAddressInfoFetcher = TokenListAddressInfoFetcher | GenericAddressListInfoFetcher | ContextAddressInfoFetcher | GenericWarningListInfoFetcher;
export declare class TokenListAddressInfoFetcher implements AddressInfoFetcher {
    readonly tokenList: TokenList;
    readonly source: string;
    readonly type = BuiltInAddressInfoFetchersType.TokenList;
    static fromURL(url: string): Promise<TokenListAddressInfoFetcher>;
    constructor(tokenList: TokenList, source: string);
    fetchInfo(address: Address): Promise<Array<AddressInfo>>;
}
export declare class GenericAddressListInfoFetcher implements AddressInfoFetcher {
    readonly addressList: GenericAddressList;
    readonly source: string;
    readonly type = BuiltInAddressInfoFetchersType.GenericAddressList;
    static fromURL(url: string): Promise<GenericAddressListInfoFetcher>;
    constructor(addressList: GenericAddressList, source: string);
    fetchInfo(address: Address): Promise<Array<AddressInfo>>;
}
export declare class GenericWarningListInfoFetcher implements AddressInfoFetcher {
    readonly addressList: GenericAddressList;
    readonly source: string;
    readonly type = BuiltInAddressInfoFetchersType.GenericWarningList;
    static fromURL(url: string): Promise<GenericWarningListInfoFetcher>;
    constructor(addressList: GenericAddressList, source: string);
    fetchInfo(address: Address): Promise<Array<AddressInfo>>;
}
export declare class ContextAddressInfoFetcher implements AddressInfoFetcher {
    readonly type = BuiltInAddressInfoFetchersType.Context;
    fetchInfo(address: Address, context: AddressInfoFetchContext): Promise<ContextAddressInfo[]>;
}
export declare const getAddressInfoFetchersForChainId: (chainId: number) => Promise<(ContextAddressInfoFetcher | GenericAddressListInfoFetcher | TokenListAddressInfoFetcher)[]>;
export {};
