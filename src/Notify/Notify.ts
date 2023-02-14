import { Api } from '../Api'
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { txData } from '../Types/TxData'
import { NotifyApi } from './NotifyApi'
import { NotifyLog } from './NotifyLog'
import { NotifyVoid } from './NotifyVoid'

export interface Notify {
  contractError(msg: ContractError): void
  txHash(msg: txData): void
  providerError(msg: ProviderError): void
  setStatus(): void
}

export class NotifyBuilder {
  static build(apikey?: string, chainId?: number, _env?: string): Notify {
    const env = _env ?? process.env.NODE_ENV
    if (env === 'test') {
      return new NotifyVoid()
    }
    if (!apikey) {
      return new NotifyLog()
    }
    const api = new Api(apikey, chainId)
    return new NotifyApi(api)
  }
}
