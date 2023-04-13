import { Target, ExecutionPayload } from './Target'
import { SumerObserver } from './SumerObserver'

export class TransactionObserver extends SumerObserver {
  public async inspect({ execution }: Target): Promise<void> {
    if (!execution.result) {
      return
    }
    if (this.isTransaction(execution.result)) {
      const { result } = execution
      this.notifyService.trackTransaction({
        hash: result['hash'] || result['transactionHash'],
        from: result['from'],
        to: result['to'],

        // Transaction Response
        chainId: this.parseNumber(result['chainId']) || this.getChainId({ execution }),
        nonce: this.parseNumber(result['nonce']),
        gasLimit: this.parseBigNumber(result['gasLimit']),
        maxFeePerGas: this.parseBigNumber(result['maxFeePerGas']),
        maxPriorityFeePerGas: this.parseBigNumber(result['maxPriorityFeePerGas']),
        data: result['data'],
        value: this.parseBigNumber(result['value']),

        // Transaction Receipt
        blockHash: result['blockHash'],
        blockNumber: this.parseNumber(result['blockNumber']),
        confirmations: result['confirmations'],
        transactionIndex: this.parseNumber(result['transactionIndex']),
        contractAddress: result['contractAddress'],
        gasUsed: this.parseBigNumber(result['gasUsed']),
        effectiveGasPrice: this.parseBigNumber(result['effectiveGasPrice']),
        cumulativeGasUsed: this.parseBigNumber(result['cumulativeGasUsed']),
        status: this.parseNumber(result['status']),

        args: execution.args,
        functionName: execution.methodName,
      })
    }
  }

  private isTransaction(result: ExecutionPayload): boolean {
    return result
      ? Object.getOwnPropertyNames(result).some(propertyName =>
          ['hash', 'transactionHash'].includes(propertyName),
        )
      : false
  }

  private parseNumber(value?: string | number): number | undefined {
    switch (typeof value) {
      case 'string':
        return parseInt(value)
      default:
        return value
    }
  }

  private parseBigNumber(value?: ExecutionPayload): string | undefined {
    switch (typeof value) {
      case 'string':
      case 'undefined':
        return value
      default:
        return value['hex'] || value['_hex']
    }
  }

  private getChainId({ execution }: Target): number | undefined {
    if (!execution.target) {
      return undefined
    }
    // providers derived from base provider
    if (execution.target._network) {
      return execution.target._network['chainId']
    }
    // external providers
    if (execution.target.chainId) {
      return parseInt(execution.target.chainId.toString())
    }
    return undefined
  }
}
