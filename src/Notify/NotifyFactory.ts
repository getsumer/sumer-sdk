import { NotifyServiceApi } from './NotifyServiceApi'
import { NotifyServiceLog } from './NotifyServiceLog'
import { NotifyService } from './NotifyService'

export class NotifyFactory {
  static create(
    apikey?: string,
    chainId?: number,
    env: string = process.env.NODE_ENV,
  ): NotifyService {
    if (env === 'test' || !apikey) {
      return new NotifyServiceLog()
    }
    return new NotifyServiceApi(apikey, chainId)
  }
}
