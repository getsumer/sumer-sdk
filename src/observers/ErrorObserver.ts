import { Target, ExecutionPayload } from './Target'
import { SumerObserver } from './SumerObserver'
import { ProviderError } from '../models'

export class ErrorObserver extends SumerObserver {
  public async inspect({ execution }: Target): Promise<void> {
    if (!execution.error) {
      return
    }
    if (this.isError(execution.error)) {
      this.notifyService.trackError(
        new ProviderError({
          address: execution.target.selectedAddress,
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
