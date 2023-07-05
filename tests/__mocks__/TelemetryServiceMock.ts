import { TelemetryService } from './../../src/core'

export class TelemetryServiceMock implements TelemetryService {
  trackError = jest.fn()
  trackTransaction = jest.fn()
  checkConnection = jest.fn()
}
