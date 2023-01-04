import { Fragment, JsonFragment } from '@ethersproject/abi';
import { ExternalProvider, JsonRpcFetchFunc, Networkish, Provider, TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { Contract } from './Contract';
/**
 * Sumer is a Provider that extends ethers Web3Provider. Sumer can track the errors
 * that may occur during the interaction with a contract or the provider.
 */
export declare class Sumer extends Web3Provider {
    static apikey?: string;
    actualAddres: string | undefined;
    private static instance;
    static chainId: number;
    private isProvider;
    [key: string]: any;
    constructor(_provider: ExternalProvider | JsonRpcFetchFunc, key?: string, network?: Networkish);
    static getInstance(): Sumer | undefined;
    static Contract(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider, apikey?: string, chainId?: number): Contract;
    sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>;
}
