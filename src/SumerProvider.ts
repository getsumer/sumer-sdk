import { ExternalProvider, JsonRpcFetchFunc, Networkish } from '@ethersproject/providers'
import { ProviderError } from './Errors'
import { NotifyService } from './Notify'
import { providers } from 'ethers'

interface SumerProviderArguments {
  provider: ExternalProvider | JsonRpcFetchFunc
  notifyService: NotifyService
  network?: Networkish
}

/**
 * SumerProvider class wraps the provider object and adds error tracking
 */
export class SumerProvider extends providers.Web3Provider {
  constructor({ provider, network, notifyService }: SumerProviderArguments) {
    const handler = {
      get(target: any, prop: any, _receiver: any) {
        const method = target[prop]
        if (typeof method !== 'function') {
          return method
        }
        return async (...args: any) => {
          try {
            return await method.apply(this, args)
          } catch (err) {
            // @ts-ignore
            let address = provider.selectedAddress
            if (address === undefined && args[0]?.params[0]?.from) {
              address = args[0]?.params[0]?.from
            }
            const error = JSON.parse(JSON.stringify(err))
            const { message, code } = error
            const providerError = new ProviderError({
              message,
              code,
              address,
            })
            // Send payload with provider error
            notifyService.trackError(providerError)
            throw err
          }
        }
      },
    }
    super(new Proxy(provider, handler), network)
  }
}
