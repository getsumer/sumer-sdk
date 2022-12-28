import { Api } from './../Api';
import bowser from 'bowser'
import { ContractError } from '../Errors/ContractError'
import { Notify } from './Notify'
import { v4 } from 'uuid';

export class NotifyApi implements Notify {
    
    private client: Api

    constructor(client: Api) {
        this.client = client
    }

    txHash(message: any): void {
        const id = v4().toString()

        const data = {
            id,
            chainId: message.chainId,
            txHash: message.txHash,
            functionName: message.functionName,
            functionArgs: message.args,
            metadata: this.meta()
        }
        this.client.sendTxHash(data.txHash, data)
    }

    providerError(message: any): void {
        const id = v4().toString()

        const data = {
            id,
            userAddress: message.address,
            code: message.code,
            message: message.message,
            metadata: this.meta()
        }

        this.client.sendProviderError(data)
    }

    contractError(msg: ContractError) {
        const id = v4().toString()

        const data = {
            id,
            userAddress: msg.address,
            contractAddress: msg.contractAddress,
            functionName: msg.name,
            args: msg.args,
            message: msg.reason,
            metadata: this.meta()
        }
        this.client.sendContractError(data)
    }

    setStatus(): void {
        this.client.sendSetStatus()
    }

    private meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent)
        }
        return {}
    }
}
