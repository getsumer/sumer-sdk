import { Fragment, JsonFragment } from "@ethersproject/abi";
import { BaseContract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
export declare class Contract {
    baseContract: BaseContract;
    constructor(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider);
    [key: string]: any;
}
