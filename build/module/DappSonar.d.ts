import { Fragment, JsonFragment } from '@ethersproject/abi';
import { ExternalProvider, JsonRpcFetchFunc, Networkish, Provider, TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { Contract } from './Contract';
export declare class DappSonar extends Web3Provider {
    static apikey: string;
    [key: string]: any;
    static Contract(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider): Contract;
    actualAddres: string | undefined;
    constructor(_provider: ExternalProvider | JsonRpcFetchFunc, key: string, network?: Networkish);
    sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>;
}
