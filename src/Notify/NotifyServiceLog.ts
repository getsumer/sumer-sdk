import { NotifyService } from './NotifyService'
import { ContractError, ProviderError } from '../Errors'
import { Transaction } from '../Types/Transaction'

export class NotifyServiceLog implements NotifyService {
  private _chainId: number

  get chainId() {
    return this._chainId
  }

  public async trackTransaction(transaction: Transaction): Promise<void> {
    console.info('trackTransaction Log:', transaction)
  }

  public async trackError(msg: ContractError | ProviderError): Promise<void> {
    console.info('trackError log: ', msg)
  }

  public async checkConnection(): Promise<void> {
    console.info('checkConnection')
  }
}
