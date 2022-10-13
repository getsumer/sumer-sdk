import { Fragment, JsonFragment } from '@ethersproject/abi';
import { ExternalProvider, JsonRpcFetchFunc, Networkish, Provider, TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { Contract } from './Contract';
export declare class DappSonar extends Web3Provider {
    static apikey?: string;
    [key: string]: any;
    actualAddres: string | undefined;
    private static instance;
    static chainId: string;
    constructor(_provider: ExternalProvider | JsonRpcFetchFunc, key?: string, network?: Networkish);
    static getInstance(): DappSonar | undefined;
    static Contract(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider, apikey?: string): Contract;
    sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>;
}
