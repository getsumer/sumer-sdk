import { Target, ExecutionPayload, TargetExecution } from './Target'
import { SumerObserver } from './SumerObserver'
import { ErrorParams } from '../services'

export class TransactionObserver extends SumerObserver {
  public async inspect({ execution }: Target): Promise<void> {
    if (!this.isCall(execution.args) && this.isTransaction(execution.result)) {
      const { result, target } = execution
      const wallet = this.getWallet(target)

      await this.notifyService.trackTransaction({
        hash: result['hash'] || result['transactionHash'] || result,
        fromAddress: result['from'],
        toAddress: result['to'],

        // Transaction Response
        chainId: this.parseNumber(result['chainId']) || this.getChainId(execution),
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

        rpcMethodArgs: new Array(this.getArgsParams(execution.args)),
        rpcMethodName: this.getMethodName(execution.args),

        metadata: { ...this.meta(), wallet },
      })
    }

    if (this.isNotProcessed(execution.result)) {
      const { args, result, target } = execution

      const params = this.getArgsParams(args)
      const error = this.getErrorResult(result)

      if (params) {
        await this.notifyService.trackTransaction({
          fromAddress: params['from'] ?? this.getAddress(execution),
          toAddress: params['to'] ?? undefined,
          value: params['value'] ?? undefined,
          data: params['data'] ?? undefined,
          gas: params['gas'] ?? undefined,

          chainId: this.getChainId(execution),
          rpcMethodName: this.getMethodName(args),
          rpcMethodArgs: new Array(params),

          metadata: { ...this.meta(), wallet: this.getWallet(target) },
          error,
        })
      }
    }
  }

  private getMethodName(args: unknown[]): string | undefined {
    if (args && args.length > 0) {
      return args[0]['method']
    }
    return undefined
  }

  private getArgsParams(args: unknown[]): object | undefined {
    if (!(args && args.length > 0)) {
      return undefined
    }
    if (!(args[0]['params'] && args[0]['params'][0])) {
      return undefined
    }

    return args[0]['params'][0] as object
  }

  private getErrorResult(result: ExecutionPayload): ErrorParams | undefined {
    if (!this.isNotProcessed(result)) {
      return undefined
    }
    return {
      code: result['code'],
      message: result['message'],
    }
  }
  private isNotProcessed(result: ExecutionPayload): boolean {
    return result && result['code']
  }
  private isTransaction(result: ExecutionPayload): boolean {
    return result
      ? this.isTransactionHash(result.toString()) || this.containsTransactionHash(result)
      : false
  }

  private isTransactionHash(hash: string) {
    return /^0x([A-Fa-f0-9]{64})$/.test(hash)
  }

  private isCall(args: unknown[]) {
    return args ? args.filter(Boolean).some(arg => arg['method'] === 'eth_call') : false
  }

  private containsTransactionHash(result: ExecutionPayload) {
    return Object.getOwnPropertyNames(result).some(propertyName =>
      ['hash', 'transactionHash'].includes(propertyName),
    )
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

  private getChainId(execution: TargetExecution): number | undefined {
    if (!execution.target) {
      return undefined
    }
    // Target extends from BaseProvider
    if (execution.target._network) {
      return execution.target._network['chainId']
    }
    // Target is an ExternalProvider
    if (execution.target.chainId) {
      return parseInt(execution.target.chainId.toString())
    }
    return undefined
  }
}
