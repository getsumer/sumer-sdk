import { Target, ErrorObserver } from '../../src/observers'
import { ProviderError } from '../../src/models'
import { NotifyServiceMock } from '../__mocks__'

describe('ErrorObserver', () => {
  it('should track error', () => {
    // Given
    const signerOrProviderAddress = '0x388c818ca8b9251b393131c08a736a67ccb19297'
    const notifyService = new NotifyServiceMock()
    const errorObserver = new ErrorObserver(notifyService)
    const error = new ProviderError({
      address: signerOrProviderAddress,
      code: 1,
      message: 'error message',
    })
    const target: Target = {
      result: {
        args: [],
        methodName: 'method',
        target: {
          selectedAddress: signerOrProviderAddress,
        },
        error: Buffer.from(JSON.stringify({ code: error.code, message: error.message })),
      },
    }

    // When
    errorObserver.inspect(target)

    // Then
    expect(notifyService.trackError).toHaveBeenCalled()
  })

  it('should not track error', () => {
    // Given
    const signerOrProviderAddress = '0x388c818ca8b9251b393131c08a736a67ccb19297'
    const notifyService = new NotifyServiceMock()
    const errorObserver = new ErrorObserver(notifyService)
    const target: Target = {
      result: {
        args: [],
        methodName: 'method',
        target: {
          selectedAddress: signerOrProviderAddress,
        },
      },
    }

    // When
    errorObserver.inspect(target)

    // Then
    expect(notifyService.trackError).toHaveBeenCalledTimes(0)
  })
})