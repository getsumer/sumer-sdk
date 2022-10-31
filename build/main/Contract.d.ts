import { Fragment, Interface, JsonFragment } from '@ethersproject/abi';
import { Provider, TransactionResponse } from '@ethersproject/providers';
import { BigNumber, ContractFunction, ethers, EventFilter, PopulatedTransaction, Signer } from 'ethers';
export declare class Contract {
    baseContract: ethers.BaseContract;
    private apiKey?;
    private chainId?;
    readonly address: string;
    readonly interface?: Interface;
    readonly functions?: {
        [name: string]: ContractFunction;
    };
    readonly callStatic?: {
        [name: string]: ContractFunction;
    };
    readonly estimateGas?: {
        [name: string]: ContractFunction<BigNumber>;
    };
    readonly populateTransaction?: {
        [name: string]: ContractFunction<PopulatedTransaction>;
    };
    readonly filters?: {
        [name: string]: (...args: Array<any>) => EventFilter;
    };
    readonly resolvedAddress?: Promise<string>;
    readonly deployTransaction?: TransactionResponse;
    constructor(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider, apiKey?: string, chainId?: number);
    [key: string]: any;
}
