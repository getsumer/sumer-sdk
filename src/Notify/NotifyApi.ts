import { Api } from './../Api';
import bowser from 'bowser'
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'
import { v4 } from 'uuid';

export class NotifyApi implements Notify {
    private client: Api
    constructor(client: Api) {
        this.client = client
    }

    txHash(message: any): void {
        const  id = v4().toString()

        console.log("tx hash data ", message)

        const data = {
            id,
            ...message,
            metadata: this.meta()
        }
        this.client.sendTxHash(data.txHash, data)
    }
    providerError(message: any): void {
        const  id = v4().toString()

        console.log("provider error: ", message)
        const data = {
            id,
            userAddress: message.address,
            code: message.code,
            message: message.message,
            metadata: this.meta()
        }

        this.client.sendProviderError(data)
    }
    public error(msg: ContractError | ProviderError) {
        const  id = v4().toString()

        const log = {
            id,
            userAddress: msg.address,
            message: msg.toString(),
            //timestamp: Date.now(),
            //wallet: msg.address,
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
