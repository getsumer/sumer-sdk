import { providers } from 'ethers'
import { transactionReceipt } from '../__mocks__'

export class CustomJsonRpcProvider extends providers.JsonRpcProvider {
  async _waitForTransaction(
    _transactionHash: string,
    _confirmations: number,
    _timeout: number,
    _replaceable: object,
  ): Promise<providers.TransactionReceipt> {
    return transactionReceipt
  }

  _network = { name: 'homestead', chainId: 1 }
}
