import { NotifyService } from './../../src/services'

export class MockNotifyService implements NotifyService {
  trackError = jest.fn()
  trackTransaction = jest.fn()
  checkConnection = jest.fn()
}
