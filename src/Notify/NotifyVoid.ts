import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'

export class NotifyVoid implements Notify {

    public error(_msg: ContractError | ProviderError) {
        return
    }
}
