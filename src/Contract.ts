import { Fragment, JsonFragment } from "@ethersproject/abi";
import { Provider, } from "@ethersproject/providers";
import { BaseContract, Signer } from "ethers";

export class Contract {
    baseContract: BaseContract
    constructor(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider) {
        this.baseContract = new BaseContract(addressOrName, contractInterface, signerOrProvider)
        //@ts-ignore
        const functionsNames = contractInterface.map((ci: any) => ci.name);

        functionsNames.forEach((key: any) => {
            this[key] = async (...args: any): Promise<any> => {
                console.log('Function called ', key, 'args', args)
                let response
                try {
                    //@ts-ignore
                    response = await this.baseContract[key](...args)
                    console.log('Response', response)
                } catch (error: any) {
                    if (!error.DappSonar) {
                        console.error('Error on ', key, ' function', error)
                        error.DappSonar = true
                    }
                    throw error
                }
                return response
            };
        });
    }
    [key: string]: any;
}
