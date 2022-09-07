import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";


const applyProxy = async (target: any, thisArg: any, argumentsList: any) => {
    try {
        const res = await Reflect.apply(target, thisArg, argumentsList);
        return res
    } catch (error: any) {
        if (!error.DappSonar) {
            console.error('Provider error', error)
            error.DappSonar = true
        }
        throw error

    }
}

export class ProxyProvider {

    constructor(_provider: ExternalProvider | JsonRpcFetchFunc) {

        const handler = {
            get: function (target: any, prop: any, _receiver: any) {
                const response = target[prop];
                if (typeof target[prop] === 'function') {
                    return new Proxy(response, { apply: applyProxy });
                } else {
                    return response
                }
            },
        };
        return new Proxy(_provider, handler)
    }
}