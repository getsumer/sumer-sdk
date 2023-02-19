import { NotifyService } from './NotifyService'
import { ContractError, ProviderError } from '../Errors'
import { TransactionData } from '../Types/TransactionData'

export class NotifyServiceLog implements NotifyService {
  private _chainId: number

  get chainId() {
    return this._chainId
  }

  public async trackTransaction(transactionData: TransactionData): Promise<void> {
    console.info('trackTransaction Log:', transactionData)
  }

  public async trackError(msg: ContractError | ProviderError): Promise<void> {
    console.info('trackError log: ', msg)
  }

  public async checkConnection(): Promise<void> {
    console.info('checkConnection')
  }
}
