import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { txData } from '../Types/TxData'
import { Notify } from './Notify'

export class NotifyLog implements Notify {
  txHash(message: txData): void {
    console.error('txHash Log:', message)
  }

  providerError(message: ProviderError): void {
    console.error('providerError Log:', message)
  }

  contractError(msg: ContractError) {
    console.error('error log: ', msg)
  }

  setStatus(): void {
    console.error('checkProvider Log:')
  }
}
