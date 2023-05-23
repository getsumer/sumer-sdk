import { Target, ExecutionPayload, TargetExecution } from './Target'
import { SumerObserver } from './SumerObserver'
import { ProviderError } from '../models'
export class ErrorObserver extends SumerObserver {
  private readonly NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

  public async inspect({ execution }: Target): Promise<void> {
    if (this.isError(execution.result)) {
      const { result } = execution
      this.notifyService.trackError(
        new ProviderError({
          address: this.getAddress(execution),
          code: result['code'],
          message: this.extractErrorInfo(result),
          chainId: this.getChainId(execution),
        }),
      )
    }
  }

  private isError(result: ExecutionPayload): boolean {
    return result
      ? Object.getOwnPropertyNames(result).some(propertyName =>
          ['code', 'message'].includes(propertyName),
        )
      : false
  }

  private getChainId(execution: TargetExecution): number | undefined {
    if (execution.target.chainId) {
      return parseInt(execution.target.chainId.toString())
    }
    return undefined
  }

  private getAddress(execution: TargetExecution): string {
    if (execution.target.selectedAddress) {
      return execution.target.selectedAddress.toString()
    }
    if (execution.target._addresses && execution.target._addresses[0]) {
      return execution.target._addresses[0].toString()
    }
    return this.NULL_ADDRESS
  }

  private extractErrorInfo(payload: ExecutionPayload) {
    if (payload['data'] && payload['data'].message) {
      return payload['data'].message
    }
    return payload['message']
  }
}
