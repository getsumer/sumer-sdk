import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'

export class NotifyVoid implements Notify {
    error(_msg: ContractError | ProviderError): void {
        return
    }

    static error(_msg: ContractError | ProviderError) {

        return
    }
}
