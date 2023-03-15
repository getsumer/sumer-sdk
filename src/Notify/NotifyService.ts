import { ContractError, ProviderError } from '../Errors'
import { ProcessedTransactionResult, Transaction } from '../Types/Transaction'

export interface NotifyService {
  trackError(error: ContractError | ProviderError): Promise<void>
  trackTransaction(transaction: Transaction): Promise<void>
  checkConnection(): Promise<void>
  trackProcessedTransaction(processedTransactionResult: ProcessedTransactionResult): Promise<void>
}
