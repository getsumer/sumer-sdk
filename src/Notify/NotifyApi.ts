import { Api } from './../Api';
import bowser from 'bowser'
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'

export class NotifyApi implements Notify {
    private client: Api
    constructor(client: Api) {
        this.client = client
    }

    txHash(message: any): void {
        console.log(message)
        const data = {
            ...message,
            metadata: this.meta()
        }
        this.client.sendTxHash(data.txHash, data)
    }
    providerError(message: ProviderError): void {
        console.log(message)
        const data = {
            userAddress: message.address,
            code: message.code,
            message: message.message,
            metadata: this.meta()
        }

        this.client.sendProviderError(data)
    }
    public error(msg: ContractError | ProviderError) {
        const log = {
            message: msg.toString(),
            timestamp: Date.now(),
            wallet: msg.address,
            metadata: this.meta()
        }
        this.client.send(log)
    }

    private meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent)
        }

        return {}
    }
}
