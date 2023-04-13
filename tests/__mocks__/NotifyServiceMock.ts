import { NotifyService } from './../../src/services'

export class NotifyServiceMock implements NotifyService {
  trackError = jest.fn()
  trackTransaction = jest.fn()
  checkConnection = jest.fn()
}
