import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { TransactionData } from '../Types/transactionData'
import { NotifyService } from './NotifyService'

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
