import { ContractError, ProviderError, Transaction } from '../models'

export interface NotifyService {
  trackError(error: ContractError | ProviderError): Promise<void>
  trackTransaction(transaction: Transaction): Promise<void>
}
