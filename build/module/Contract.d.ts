import { Fragment, JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';
import { BaseContract, Signer } from 'ethers';
export declare class Contract {
    baseContract: BaseContract;
    private apiKey?;
    constructor(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider, apiKey?: string);
    [key: string]: any;
}
