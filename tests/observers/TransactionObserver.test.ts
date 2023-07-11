import { Target } from '../../src/core'
import { TransactionObserver } from '../../src/observers'
import { Transaction } from '../../src/models'
import { TelemetryServiceMock } from '../__mocks__'

describe('TransactionObserver', () => {
  it('should track transaction', () => {
    // Given
    const hash = '0x388c818ca8b9251b393131c08a736a67ccb19297'
    const telemetryService = new TelemetryServiceMock()
    const observer = new TransactionObserver(telemetryService)
    const transaction: Transaction = {
      hash,
    }
    const target: Target = {
      execution: {
        methodName: 'method',
        methodArgs: [],
        target: {},
        result: { hash: transaction.hash },
      },
      observers: [],
    }

    // When
    observer.inspect(target.execution)

    // Then
    expect(telemetryService.trackTransaction).toHaveBeenCalled()
  })

  it('should not track transaction', () => {
    // Given
    const notifyService = new TelemetryServiceMock()
    const observer = new TransactionObserver(notifyService)
    const target: Target = {
      execution: {
        methodName: 'method',
        methodArgs: [],
        target: {},
      },
      observers: [],
    }

    // When
    observer.inspect(target.execution)

    // Then
    expect(notifyService.trackTransaction).toHaveBeenCalledTimes(0)
  })
})
