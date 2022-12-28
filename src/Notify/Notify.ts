import { Api } from '../Api'
import { ContractError } from '../Errors/ContractError'
import { ProviderError } from '../Errors/ProviderError'
import { NotifyApi } from './NotifyApi'
import { NotifyLog } from './NotifyLog'
import { NotifyVoid } from './NotifyVoid'

export interface Notify {

    contractError(msg: ContractError | ProviderError): void;

    txHash(message: any): void;

    providerError(message: ProviderError | any): void;

    setStatus(): void;

}

export class NotifyBuilder {


    static build(apikey?: string, chainId?: number, _env?: string): Notify {

        const env = _env ?? process.env.NODE_ENV

        if (env === 'test') {

            return new NotifyVoid()
        }

        if (undefined === apikey) {

            return new NotifyLog()
        }

        const api = new Api(apikey, chainId)

        return new NotifyApi(api)
    }
}