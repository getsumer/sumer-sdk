import { JsonRpcProvider } from '@ethersproject/providers'
import { ProviderError } from './Errors'
import { NotifyFactory } from './Notify/NotifyFactory'

class LogProvider<T extends JsonRpcProvider> {
  constructor(provider: T, dappKey?: string) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(provider)).filter(
      prop => typeof provider[prop] === 'function' && prop !== 'constructor',
    )

    for (const method of methods) {
      const targetMethod = provider[method]

      if (typeof targetMethod === 'function') {
        this[method] = this.logMethod(provider, targetMethod, dappKey)
      }
    }
  }

  private logMethod<T extends JsonRpcProvider>(
    provider: T,
    targetMethod: (...args: any[]) => Promise<any>,
    dappKey?: string,
  ) {
    return async (...args: any[]) => {
      try {
        const response = await targetMethod.apply(provider, args)
        console.info({ response })
        return response
      } catch (error) {
        const from = await provider.listAccounts()
        const providerError = new ProviderError({
          message: error.message,
          code: error.code,
          address: from[0],
        })
        await NotifyFactory.create(dappKey).trackError(providerError)
        throw error
      }
    }
  }
}

/// log functionality to ethers providers based on JsonRpcProvider, for instance:
// Web3Provider, APIPrviders such as InfuraProvider, AlchemyProvider, etc.
export function ethersLogProvider<T extends JsonRpcProvider>(provider: T, dappKey?: string): T {
  const logProvider = new LogProvider(provider, dappKey)
  return Object.assign(provider, logProvider)
}
