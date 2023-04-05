import { Target } from './Target'
import { SumerObserver } from './SumerObserver'

export class TransactionObserver extends SumerObserver {
  public async inspect({ result }: Target): Promise<void> {
    if (!result.data) {
      return
    }
    const transactionData = this.getData(result.data)
    if (this.isTransaction(transactionData)) {
      this.notifyService.trackTransaction({
        hash: transactionData.hash || transactionData.transactionHash,
        from: transactionData.from,
        to: transactionData.to,

        // Transaction Response
        chainId: transactionData.chainId,
        nonce: transactionData.nonce,
        gasLimit: transactionData.gasLimit?.hex,
        maxFeePerGas: transactionData.maxFeePerGas?.hex,
        maxPriorityFeePerGas: transactionData.maxPriorityFeePerGas?.hex,
        data: transactionData.data,
        value: transactionData.value?.hex,

        // Transaction Receipt
        blockHash: transactionData.blockHash,
        blockNumber: transactionData.blockNumber,
        confirmations: transactionData.confirmations,
        transactionIndex: transactionData.transactionIndex,
        contractAddress: transactionData.contractAddress,
        gasUsed: transactionData.gasUsed?.hex,
        effectiveGasPrice: transactionData.effectiveGasPrice?.hex,
        cumulativeGasUsed: transactionData.cumulativeGasUsed?.hex,
        status: transactionData.status,

        args: result.args,
        functionName: result.methodName,
      })
    }
  }

  private isTransaction(result: Record<string, string>): boolean {
    return result
      ? Object.getOwnPropertyNames(result).some(propertyName =>
          ['hash', 'transactionHash'].includes(propertyName),
        )
      : false
  }
}
