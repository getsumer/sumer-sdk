import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers';
/**
 * applyProxy is called when a function of the wrapped provider object is called, and
 * sends error notifications to the sumer api
*/
export declare const applyProxy: (target: any, thisArg: any, argumentsList: any, address: string, apikey?: string, chainId?: number) => Promise<unknown>;
/**
 * ProxyProvider class wraps the provider object and adds error notifications
 */
export declare class ProxyProvider {
    constructor(_provider: ExternalProvider | JsonRpcFetchFunc | any, apikey?: string);
    [key: string]: any;
}
