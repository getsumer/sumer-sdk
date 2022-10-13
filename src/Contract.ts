import { Fragment, JsonFragment } from '@ethersproject/abi'
import { Provider } from '@ethersproject/providers'
import { BaseContract, ethers, Signer } from 'ethers'
import { ContractError } from './Errors/ContractError'
import { NotifyBuilder } from './Notify/Notify'

export class Contract {
    public baseContract: BaseContract
    private  apiKey?: string
    constructor(
        addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>,
        signerOrProvider?: Signer | Provider, apiKey?:string) {
        this.baseContract = new ethers.Contract(addressOrName, contractInterface, signerOrProvider)
        // @ts-ignore
        const functionsNames = contractInterface.map((ci: any) => ci.name)
        this.apiKey=apiKey
        functionsNames.forEach((key: any) => {
            this[key] = async (...args: any): Promise<any> => {
                let response: any
                try {
                    // @ts-ignore
                    response = await this.baseContract[key](...args)
                    console.log('contract response ', response)
                    const payload = {
                        txHash: response.hash,
                        functionName: key,
                        functionArgs: args,
                    }
                    console.log(this.apiKey)
                    NotifyBuilder.build(this.apiKey).sendTxHash(payload)

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
                        NotifyBuilder.build(this.apiKey).error(contracError)
                        error.DappSonar = true
                    }
                    throw error
                }
                return response
            }
        })
    }
    [key: string]: any;
}
