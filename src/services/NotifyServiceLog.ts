import { NotifyService } from './NotifyService'
import { ProviderError, ContractError, Transaction } from '../models'
import { Parser } from 'bowser'

export class NotifyServiceLog implements NotifyService {
  private _chainId: number

  get chainId() {
    return this._chainId
  }

  public async trackTransaction(
    transaction: Transaction,
    metadata?: Parser.ParsedResult | Record<string, string>,
  ): Promise<void> {
    console.info('trackTransaction Log:', transaction, metadata)
  }

  public async trackError(
    msg: ContractError | ProviderError,
    metadata?: Parser.ParsedResult | Record<string, string>,
  ): Promise<void> {
    console.info('trackError log: ', msg, metadata)
  }

  public async checkConnection(): Promise<void> {
    console.info('checkConnection')
  }
}
