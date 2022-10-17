
import bowser from 'bowser'
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'

export class NotifyLog implements Notify {

    txHash(message: ContractError): void {
        console.log(message)
    }
    providerError(message: ProviderError): void {
        
        console.log(message)
    }

    public error(msg: ContractError | ProviderError) {
        const log = {
            message: msg.toString(),
            timestamp: Date.now(),
            wallet: msg.address,
            meta: this.meta()
        }
        console.error(log)

    }

    private meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent)
        }

        return {}
    }
}
