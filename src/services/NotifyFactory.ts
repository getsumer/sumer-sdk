import { NotifyServiceApi } from './NotifyServiceApi'
import { NotifyServiceLog } from './NotifyServiceLog'
import { NotifyService } from './NotifyService'

export class NotifyFactory {
  private static notifyServiceInstance: NotifyService

  static create(apikey: string, dns?: string): NotifyService {
    if (this.notifyServiceInstance) {
      return this.notifyServiceInstance
    }
    if (process.env.NODE_ENV === 'test') {
      this.notifyServiceInstance = new NotifyServiceLog()
    } else {
      this.notifyServiceInstance = new NotifyServiceApi(apikey, dns)
    }
    return this.notifyServiceInstance
  }
}
