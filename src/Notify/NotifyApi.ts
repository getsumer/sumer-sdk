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