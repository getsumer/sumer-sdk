import { ContractError, ProviderError } from '../Errors'
import { Transaction } from '../Types/Transaction'

export interface NotifyService {
  trackError(error: ContractError | ProviderError): Promise<void>
  trackTransaction(transaction: Transaction): Promise<void>
  checkConnection(): Promise<void>
}
