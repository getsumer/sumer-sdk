import { Fragment, Interface, JsonFragment } from '@ethersproject/abi'
import { Provider, TransactionResponse } from '@ethersproject/providers'
import { BigNumber, ContractFunction, ethers, EventFilter, PopulatedTransaction, Signer } from 'ethers'
import { ContractError } from './Errors/ContractError'
import { NotifyBuilder } from './Notify/Notify'

export class Contract {
    public baseContract: ethers.BaseContract
    private apiKey?: string
    private chainId?: number

    readonly address: string;
    readonly interface?: Interface;
    readonly functions?: { [ name: string ]: ContractFunction };
    readonly callStatic?: { [ name: string ]: ContractFunction };
    readonly estimateGas?: { [ name: string ]: ContractFunction<BigNumber> };
    readonly populateTransaction?: { [ name: string ]: ContractFunction<PopulatedTransaction> };
    readonly filters?: { [ name: string ]: (...args: any[]) => EventFilter };
    readonly resolvedAddress?: Promise<string>;
    readonly deployTransaction?: TransactionResponse;

    constructor(
        addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>,
        signerOrProvider?: Signer | Provider, apiKey?: string, chainId?: number) {

        this.apiKey = apiKey
        this.chainId = chainId

        this.baseContract = new ethers.Contract(addressOrName, contractInterface, signerOrProvider)

        const functionsNames = contractInterface.map((ci: any) => ci.name)
        functionsNames.forEach((key: any) => {
            this[key] = async (...args: any): Promise<any> => {
                let response: any
                try {
                    response = await this.baseContract[key](...args)
                    const payload = {
                        chainId: this.chainId,
                        txHash: response.hash,
                        functionName: key,
                        functionArgs: args,
                    }

                    NotifyBuilder.build(this.apiKey, this.chainId).txHash(payload)

                } catch (error: any) {
                    if (!error.DappSonar) {
                        let address: string
                        if (Signer.isSigner(signerOrProvider)) {
                            address = await signerOrProvider.getAddress()
                        }
                        const contracError = new ContractError(
                            addressOrName,
                            key,
                            args,
                            address,
                            error.reason
                        )
                        NotifyBuilder.build(this.apiKey, this.chainId).contractError(contracError)
                        error.DappSonar = true
                    }
                    throw error
                }
                return response
            }
        })
        this.address = this.baseContract.address
        this.interface = this.baseContract.interface
        this.functions = this.baseContract.functions
        this.callStatic = this.baseContract.callStatic
        this.estimateGas = this.baseContract.estimateGas
        this.populateTransaction = this.baseContract.populateTransaction
        this.filters = this.baseContract.filters
        this.resolvedAddress = this.baseContract.resolvedAddress
        this.deployTransaction = this.baseContract.deployTransaction
    }
    [key: string]: any;
}
