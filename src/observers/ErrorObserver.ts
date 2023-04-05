import { Target } from './Target'
import { SumerObserver } from './SumerObserver'
import { ProviderError } from '../models'

export class ErrorObserver extends SumerObserver {
  public async inspect({ result }: Target): Promise<void> {
    if (!result.error) {
      return
    }
    const errorData = this.getData(result.error)
    if (this.isError(errorData)) {
      this.notifyService.trackError(
        new ProviderError({
          address: result.target.selectedAddress,
          code: errorData.code,
          message: errorData.message,
        }),
      )
    }
  }

  private isError(result: Record<string, string>): boolean {
    return result
      ? Object.getOwnPropertyNames(result).every(propertyName =>
          ['code', 'message', 'target', 'methodName', 'args'].includes(propertyName),
        )
      : false
  }
}
