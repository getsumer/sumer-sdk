import { ErrorParams, NotifyService } from './NotifyService'
import { Transaction } from '../models'
import { Parser } from 'bowser'

export class NotifyServiceLog implements NotifyService {
  private _chainId: number

  get chainId() {
    return this._chainId
  }

  public async trackTransaction(
    transaction: Transaction,
    metadata?: Parser.ParsedResult | Record<string, string>,
    error?: ErrorParams,
  ): Promise<void> {
    console.info('trackTransaction Log:', transaction, metadata, error)
  }

  public async checkConnection(): Promise<void> {
    console.info('checkConnection')
  }
}
