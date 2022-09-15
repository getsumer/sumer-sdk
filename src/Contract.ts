import { Fragment, JsonFragment } from '@ethersproject/abi'
import { Provider } from '@ethersproject/providers'
import { BaseContract, ethers, Signer } from 'ethers'
import { ContractError } from './Errors/ContractError'
import { Notify } from './Notify/Notify'
import container from './Providers'

export class Contract {
    public baseContract: BaseContract
    constructor(
        addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>,
        signerOrProvider?: Signer | Provider) {
        this.baseContract = new ethers.Contract(addressOrName, contractInterface, signerOrProvider)
        // @ts-ignore
        const functionsNames = contractInterface.map((ci: any) => ci.name)

        functionsNames.forEach((key: any) => {
            this[key] = async (...args: any): Promise<any> => {
                let response: any
                try {
                    // @ts-ignore
                    response = await this.baseContract[key](...args)
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
                        container.get<Notify>('Notify').error(contracError)
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
