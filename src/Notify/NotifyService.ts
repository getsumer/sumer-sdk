import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { TransactionData } from '../Types/TransactionData'

export interface NotifyService {
  trackError(error: ContractError | ProviderError): Promise<void>
  trackTransaction(transactionData: TransactionData): Promise<void>
  checkConnection(): Promise<void>
}
