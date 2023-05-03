import { Target, ExecutionPayload, TargetExecution } from './Target'
import { SumerObserver } from './SumerObserver'
import { ProviderError } from '../models'

export class ErrorObserver extends SumerObserver {
  private readonly KNOWN_ERROR_NAMES = ['UserRejectedRequestError']

  public async inspect({ execution }: Target): Promise<void> {
    if (this.isError(execution.result)) {
      const { result } = execution
      this.notifyService.trackError(
        new ProviderError({
          address: execution.target.selectedAddress?.toString(),
          code: result['code'],
          message: result['message'],
          chainId: this.getChainId(execution),
        }),
      )
    } else if (execution.args) {
      execution.args.forEach(async (arg: string | Error) => {
        const errorMessage = arg instanceof Error ? arg.name : arg
        if (this.KNOWN_ERROR_NAMES.includes(errorMessage)) {
          this.notifyService.trackError(
            new ProviderError({
              message: arg['cause']?.reason,
              address: arg['cause']?.transaction?.from,
              code: arg['code'],
              chainId: this.getChainId(execution),
            }),
          )
        }
      })
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
}
