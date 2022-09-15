import { DappSonar } from '../DappSonar'
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { NotifyApi } from './NotifyApi'
import { NotifyLog } from './NotifyLog'
import { NotifyVoid } from './NotifyVoid'

export interface Notify {
    error(msg: ContractError | ProviderError): void
}

export class NotifyBuilder {
    static build(_env?: string): Notify {
        const env = _env ?? process.env.NODE_ENV
        if (env === 'test') {
            return NotifyVoid
        }
        if (env === 'production') {
            const api = new Api(DappSonar.apikey)
            return new NotifyApi(api)
        }
        return new NotifyLog()
    }
}