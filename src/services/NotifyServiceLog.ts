import { Transaction } from '../models'
import { NotifyService } from './NotifyService'

export class NotifyServiceLog implements NotifyService {
  private _chainId: number

  get chainId() {
    return this._chainId
  }

  public async trackTransaction(transaction: Transaction): Promise<void> {
    console.info('trackTransaction Log:', transaction)
  }

  public async checkConnection(): Promise<void> {
    console.info('checkConnection')
  }
}
