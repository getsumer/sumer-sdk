
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'

export class NotifyLog implements Notify {

    txHash(message: ContractError): void {
        console.error("txHash Log:", message)
    }

    providerError(message: ProviderError): void {
        console.error("providerError Log:", message)
    }

    contractError(msg: ContractError | ProviderError) {
        console.error("error log: ", msg)
    }

    setStatus(): void {
        console.error("checkProvider Log:")
    }

}
