import { NotifyService } from './NotifyService'
import { ContractError, ProviderError } from '../Errors'
import { TxReceipt, TxResponse } from '../Transactions'

export class NotifyServiceLog implements NotifyService {
  public async trackTxReceipt(TxReceipt: TxReceipt): Promise<void> {
    console.info('trackProcessedTransaction Log:', TxReceipt)
  }

  public async trackTxResponse(txResponse: TxResponse): Promise<void> {
    console.info('trackTransaction Log:', txResponse)
  }

  public async trackError(msg: ContractError | ProviderError): Promise<void> {
    console.info('trackError log: ', msg)
  }

  public async checkConnection(): Promise<void> {
    console.info('checkConnection')
  }
}
