import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'

export class NotifyVoid implements Notify {

    sendTxHash(_message: ContractError): void {
        return
    }
    providerError(_message: ProviderError): void {
        return
    }
    error(_msg: ContractError | ProviderError): void {
        return
    }

    static error(_msg: ContractError | ProviderError) {
        return
    }
}
