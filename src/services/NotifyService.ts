import { Parser } from 'bowser'
import { ContractError, ProviderError, Transaction } from '../models'

export interface NotifyService {
  trackError(
    error: ContractError | ProviderError,
    metadata?: Parser.ParsedResult | Record<string, string>,
  ): Promise<void>
  trackTransaction(
    transaction: Transaction,
    metadata?: Parser.ParsedResult | Record<string, string>,
  ): Promise<void>
}
