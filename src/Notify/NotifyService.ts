import { ContractError, ProviderError } from '../Errors'
import { TxReceipt, TxResponse } from '../Transactions'
export interface NotifyService {
  trackError(error: ContractError | ProviderError): Promise<void>
  trackTxResponse(txResponse: TxResponse): Promise<void>
  checkConnection(): Promise<void>
  trackTxReceipt(txReceipt: TxReceipt): Promise<void>
}
