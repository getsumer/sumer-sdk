import { Target, TransactionObserver } from '../../src/observers'
import { Transaction } from '../../src/models'
import { NotifyServiceMock } from '../__mocks__'

describe('TransactionObserver', () => {
  it('should track transaction', () => {
    // Given
    const hash = '0x388c818ca8b9251b393131c08a736a67ccb19297'
    const notifyService = new NotifyServiceMock()
    const observer = new TransactionObserver(notifyService)
    const transaction: Transaction = {
      hash,
    }
    const target: Target = {
      execution: {
        args: [],
        methodName: 'method',
        target: {},
        result: { hash: transaction.hash },
      },
    }

    // When
    observer.inspect(target)

    // Then
    expect(notifyService.trackTransaction).toHaveBeenCalled()
  })

  it('should not track transaction', () => {
    // Given
    const notifyService = new NotifyServiceMock()
    const observer = new TransactionObserver(notifyService)
    const target: Target = {
      execution: {
        args: [],
        methodName: 'method',
        target: {},
      },
    }

    // When
    observer.inspect(target)

    // Then
    expect(notifyService.trackTransaction).toHaveBeenCalledTimes(0)
  })
})
