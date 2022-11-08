
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'

export class NotifyLog implements Notify {

    txHash(message: ContractError): void {

        console.log("txHash Log:", message)
    }
    providerError(message: ProviderError): void {

        console.log("providerError Log:", message)
    }

    contractError(msg: ContractError | ProviderError) {

        console.error("error log: ",msg )

    }
}
