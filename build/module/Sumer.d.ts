import { Fragment, JsonFragment } from '@ethersproject/abi';
import { ExternalProvider, JsonRpcFetchFunc, Networkish, Provider, TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { Contract } from './Contract';
export declare class Sumer extends Web3Provider {
    static apikey?: string;
    [key: string]: any;
    actualAddres: string | undefined;
    private static instance;
    static chainId: number;
    private isProvider;
    constructor(_provider: ExternalProvider | JsonRpcFetchFunc, key?: string, network?: Networkish);
    static getInstance(): Sumer | undefined;
    static Contract(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider, apikey?: string, chainId?: number): Contract;
    sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>;
}
