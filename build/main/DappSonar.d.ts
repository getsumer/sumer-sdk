import { Fragment, JsonFragment } from "@ethersproject/abi";
import { ExternalProvider, JsonRpcFetchFunc, Networkish, Provider, TransactionResponse, Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { Contract } from "./Contract";
export declare class DappSonar extends Web3Provider {
    actualAddres: string | undefined;
    constructor(_provider: ExternalProvider | JsonRpcFetchFunc, network?: Networkish);
    [key: string]: any;
    static Contract(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider): Contract;
    sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>;
}
