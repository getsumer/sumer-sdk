import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { ProviderError } from './Errors/ProviderError'
import { Notify } from './Notify/Notify';
import Container  from './Providers/index';

export const applyProxy = async (target: any, thisArg: any, argumentsList: any, address: string) => {
    try {
        const res = await Reflect.apply(target, thisArg, argumentsList)
        return res
    } catch (error: any) {
        if (!error.DappSonar) {

            if (address === undefined && argumentsList[0]?.params[0]?.from) {
                address = argumentsList[0]?.params[0]?.from
            }
            let providerError = new ProviderError(error.message, error.code, address)

            if (error.body && JSON.parse(error.body).error?.code) {
                providerError = new ProviderError(JSON.parse(error.body).error.message, JSON.parse(error.body).error.code, address)
            }

            Container.get<Notify>('Notify').error(providerError)
            error.DappSonar = true
        }
        throw error

    }
}

export class ProxyProvider {

    constructor(_provider: ExternalProvider | JsonRpcFetchFunc | any) {
        const handler = {
            get(target: any, prop: any, _receiver: any) {
                const response = target[prop]
                if (typeof target[prop] === 'function') {

                    return new Proxy(response, { apply: async (_target: any, thisArg: any, argumentsList: any) => applyProxy(_target, thisArg, argumentsList, _provider.selectedAddress) })
                }
                return response

            },
            apply: async (target: any, thisArg: any, argumentsList: any) => {

                return applyProxy(target, thisArg, argumentsList, _provider.selectedAddress)
            }
        }
        return new Proxy(_provider, handler)
    }
    [key: string]: any;

}
