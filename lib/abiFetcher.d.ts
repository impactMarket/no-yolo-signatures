import { Result, RootError } from '@celo/base';
import { JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/abstract-provider';
import { Address, KnownProxy } from './types';
export declare enum FetchAbiErrorTypes {
    FetchAbiError = "FetchAbiError",
    NoProxy = "NoProxy",
    NotFound = "NotFound"
}
export declare class FetchingAbiError extends RootError<FetchAbiErrorTypes.FetchAbiError> {
    constructor(error: Error);
}
export declare class NoProxyError extends RootError<FetchAbiErrorTypes.NoProxy> {
    constructor(error: Error);
}
export declare class NotFoundError extends RootError<FetchAbiErrorTypes.NotFound> {
    readonly errors: FetchAbiError[];
    constructor(errors: FetchAbiError[]);
}
export declare type FetchAbiError = FetchingAbiError | NoProxyError | NotFoundError;
export interface AbiFetcher {
    fetchAbiForAddress: (address: Address) => Promise<Result<JsonFragment[], FetchAbiError>>;
}
export declare class SourcifyAbiFetcher implements AbiFetcher {
    readonly chainId: number;
    constructor(chainId: number);
    fetchAbiForAddress(address: Address): Promise<Result<JsonFragment[], FetchingAbiError>>;
}
export declare class ExplorerAbiFetcher implements AbiFetcher {
    readonly baseUrl: string;
    readonly apiKey?: string | undefined;
    constructor(baseUrl: string, apiKey?: string | undefined);
    fetchAbiForAddress(address: Address): Promise<Result<JsonFragment[], FetchingAbiError>>;
}
export declare class ProxyAbiFetcher implements AbiFetcher {
    readonly provider: Provider;
    readonly abiFetchers: AbiFetcher[];
    readonly knownProxies: KnownProxy[];
    constructor(provider: Provider, abiFetchers: AbiFetcher[], knownProxies?: KnownProxy[]);
    fetchAbiForAddress(address: Address): Promise<Result<JsonFragment[], FetchAbiError>>;
    getImplementationAddress(knownProxy: KnownProxy, address: Address): Promise<string>;
}
export declare const getAbisFromFetchers: (abiFetchers: AbiFetcher[], address: Address) => Promise<import("@celo/base").OkResult<JsonFragment[][]> | import("@celo/base").ErrorResult<NotFoundError>>;
interface GetAbiFetcherOptions {
    rpcUrls?: {
        [chainId: number]: string;
    };
    explorerAPIKey?: string;
    accomodateRateLimit?: boolean;
}
export declare const getAbiFetchersForChainId: (chainId: number, opts?: GetAbiFetcherOptions | undefined) => (SourcifyAbiFetcher | ExplorerAbiFetcher | ProxyAbiFetcher)[];
export {};
