import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { txData } from '../Types/TxData'
import { Notify } from './Notify'

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
