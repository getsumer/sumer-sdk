import bowser from 'bowser'
import { ContractError } from './Errors/ContractError'
import { ProviderError } from './Errors/ProviderError'
export class Notify {
    public static error (msg: ContractError | ProviderError) {

        if (process.env.NODE_ENV !== 'test') {

            const log = {
                message: msg.toString(),
                timestamp: Date.now(),
                wallet: msg.address,
                meta: this.meta()
            }
            console.error(log)
        }
    }

    private static meta () {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent)
        }

        return {}
    }
}
