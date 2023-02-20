import { ContractError, ProviderError } from '../Errors'
import { TransactionData } from '../Types/TransactionData'

export interface NotifyService {
  trackError(error: ContractError | ProviderError): Promise<void>
  trackTransaction(transactionData: TransactionData): Promise<void>
  checkConnection(): Promise<void>
}
