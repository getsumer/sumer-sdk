import { providers } from 'ethers'
import { receipt } from './Transaction'

export class CustomJsonRpcProvider extends providers.JsonRpcProvider {
  async _waitForTransaction(
    _transactionHash: string,
    _confirmations: number,
    _timeout: number,
    _replaceable: object,
  ) {
    return receipt
  }
}
