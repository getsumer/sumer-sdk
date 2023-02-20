import { NotifyService } from './../../src/Notify/NotifyService'

export class MockNotifyService implements NotifyService {
  trackError = jest.fn()
  trackTransaction = jest.fn()
  checkConnection = jest.fn()
}
