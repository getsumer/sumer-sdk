import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers';
export declare const applyProxy: (target: any, thisArg: any, argumentsList: any, address: string, apikey?: string, chainId?: string) => Promise<any>;
export declare class ProxyProvider {
    constructor(_provider: ExternalProvider | JsonRpcFetchFunc | any, apikey?: string);
    [key: string]: any;
}
