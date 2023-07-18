import { Observer, TargetExecution, ExecutionResult } from '../core'
import { TransactionError } from '../models'

export class TransactionObserver extends Observer {
  public async inspect(execution: TargetExecution): Promise<void> {
    if (this.isTransaction(execution)) {
      const { result } = execution
      const methodArgs = this.getMethodArgs(execution)
      const args = methodArgs[0]
        ? (JSON.parse(methodArgs[0]) as Record<string, string>)
        : (methodArgs as Record<string, string>)

      await this.telemetryService.trackTransaction({
        chainId: this.parseNumber(result['chainId']) || this.getChainId(execution),
        hash: this.getTransactionHash(result),

        fromAddress: args['from'] ?? this.getWalletAddress(execution),
        toAddress: args['to'] ?? undefined,
        value: this.parseBigNumber(args['value']) ?? undefined,
        data: args['data'] ?? undefined,
        gas: args['gas'] ?? undefined,
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
