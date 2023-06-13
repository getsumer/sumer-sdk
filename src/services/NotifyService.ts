import { Parser } from 'bowser'
import { Transaction } from '../models'

export interface ErrorParams {
  code: number
  message: string
}

export interface NotifyService {
  trackTransaction(
    transaction: Transaction,
    metadata?: Parser.ParsedResult | Record<string, string>,
    error?: ErrorParams,
  ): Promise<void>
}
