import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'

export class NotifyVoid implements Notify {

    txHash(_message: ContractError): void {
        return
    }
    providerError(_message: ProviderError): void {
        return
    }
    contractError(_msg: ContractError | ProviderError): void {
        return
    }

    static error(_msg: ContractError | ProviderError) {
        return
    }
}
