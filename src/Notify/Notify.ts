import { Api } from '../Api'
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { NotifyApi } from './NotifyApi'
import { NotifyLog } from './NotifyLog'
import { NotifyVoid } from './NotifyVoid'

export interface Notify {
    error(msg: ContractError | ProviderError): void
}

export class NotifyBuilder {
    static build(apikey?:string,_env?: string): Notify {
        const env = _env ?? process.env.NODE_ENV
        console.log('apiKey', apikey)
        if (env === 'test') {
            return NotifyVoid
        }
        if (undefined ===apikey) {
            return new NotifyLog()
        }
        const api = new Api( apikey)
        return new NotifyApi(api)
    }
}