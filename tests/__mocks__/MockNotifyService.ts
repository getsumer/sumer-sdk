import { NotifyService } from './../../src/Notify/NotifyService'

export class MockNotifyService implements NotifyService {
  trackProcessedTransaction = jest.fn()
  trackError = jest.fn()
  trackTransaction = jest.fn()
  checkConnection = jest.fn()
}
