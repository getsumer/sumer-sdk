import { Target, ExecutionPayload } from './Target'
import { SumerObserver } from './SumerObserver'
import { ProviderError } from '../models'

export class ErrorObserver extends SumerObserver {
  public async inspect({ execution }: Target): Promise<void> {
    console.info('ErrorObserver.inspect', execution.target.chainId)
    if (!execution.error) {
      return
    }
    if (this.isError(execution.error)) {
      console.info('ErrorObserver', execution.target.chainId.toString())
      this.notifyService.trackError(
        new ProviderError({
          chainId: parseInt(execution.target.chainId.toString()) ?? undefined,
          address: execution.target.selectedAddress.toString(),
          code: execution.error['code'],
          message: execution.error['message'],
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
}
