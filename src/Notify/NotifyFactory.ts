import { NotifyServiceApi } from './NotifyServiceApi'
import { NotifyServiceLog } from './NotifyServiceLog'
import { NotifyService } from './NotifyService'

export class NotifyFactory {
  static create(apikey?: string, chainId?: number, dns?: string): NotifyService {
    if (process.env.NODE_ENV === 'test' || !apikey) {
      return new NotifyServiceLog()
    }
    return new NotifyServiceApi(apikey, chainId, dns)
  }
}