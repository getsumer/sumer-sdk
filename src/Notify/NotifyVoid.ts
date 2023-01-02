import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { Notify } from './Notify'
import { txData } from '../Contract';

export class NotifyVoid implements Notify {

    txHash(_message: txData): void {
        return
    }
    providerError(_message: ProviderError): void {
        return
    }
    contractError(_message: ContractError): void {
        return
    }
    setStatus(): void {
        return
    }
}
