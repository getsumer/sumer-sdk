import { NotifyService } from './../../src/Notify/NotifyService'

export class MockNotifyService implements NotifyService {
  trackTxReceipt = jest.fn()
  trackError = jest.fn()
  trackTxResponse = jest.fn()
  checkConnection = jest.fn()
}
