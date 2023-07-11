import { Observer, TargetExecution, ExecutionResult } from '../core'
import { TransactionError } from '../models'

export class TransactionObserver extends Observer {
  public async inspect(execution: TargetExecution): Promise<void> {
    if (this.isTransaction(execution)) {
      const { result } = execution
      const methodArgs = this.getMethodArgs(execution)
      await this.telemetryService.trackTransaction({
        chainId: this.parseNumber(result['chainId']) || this.getChainId(execution),
        hash: this.getTransactionHash(result),

        fromAddress: methodArgs['from'] ?? this.getWalletAddress(execution),
        toAddress: methodArgs['to'] ?? undefined,
        value: this.parseBigNumber(methodArgs['value']) ?? undefined,
        data: methodArgs['data'] ?? undefined,
        gas: methodArgs['gas'] ?? undefined,
        rpcMethodName: this.getMethodName(execution),
        rpcMethodArgs: Array.isArray(methodArgs) ? methodArgs : [JSON.stringify(methodArgs)],
        error: this.getTransactionError(result),
        metadata: this.getMetadata(execution),
      })
    }
  }

  private getTransactionError(result: ExecutionResult): TransactionError | undefined {
    if (result['code']) {
      return {
        code: result['code'],
        message: result['message'],
      }
    }
    return undefined
  }

  private parseNumber(value?: string | number): number | undefined {
    switch (typeof value) {
      case 'string':
        return parseInt(value)
      default:
        return value
    }
  }

  private parseBigNumber(value?: ExecutionResult): string | undefined {
    switch (typeof value) {
      case 'string':
      case 'undefined':
        return value
      default:
        return value['hex'] || value['_hex']
    }
  }
}
