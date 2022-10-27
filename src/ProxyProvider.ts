import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { ProviderError } from './Errors/ProviderError'
import { NotifyBuilder } from './Notify/Notify';

export const applyProxy = async (target: any, thisArg: any, argumentsList: any, address: string, apikey?: string, chainId?: number) => {
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
            NotifyBuilder.build(apikey, chainId).providerError(providerError)
            error.DappSonar = true
        }
        throw error
    }
}

export class ProxyProvider {

    constructor(_provider: ExternalProvider | JsonRpcFetchFunc | any, apikey?: string) {
        const chainId = _provider.networkVersion
        const handler = {
            get(target: any, prop: any, _receiver: any) {
                const response = target[prop]
                if (typeof target[prop] === 'function') {

                    return new Proxy(response, {
                        apply: async (_target: any, thisArg: any, argumentsList: any) => applyProxy(
                            _target, thisArg, argumentsList, _provider.selectedAddress, apikey, chainId)
                    })
                }
                return response

            },
            apply: async (target: any, thisArg: any, argumentsList: any) => {

                return applyProxy(target, thisArg, argumentsList, _provider.selectedAddress, apikey, chainId)
            }
        }
        return new Proxy(_provider, handler)
    }
    [key: string]: any;

}
