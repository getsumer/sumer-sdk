import { Chain, createClient, ProviderWithFallbackConfig } from '@wagmi/core'
import { providers } from 'ethers'
import { NotifyFactory } from './Notify'
import { ProcessedTransactionResult } from './Types/Transaction'
import { TransactionReceipt } from '@ethersproject/providers'
import { ProviderError } from './Errors'

declare global {
  interface Window {
    userRejectedRequestInitialized?: boolean
    _nextSetupHydrationWarning?: boolean
  }
}

interface UserRejectedRequestParams {
  dappKey?: string
  wallet?: unknown
  chainId?: number
}

type Provider = providers.BaseProvider & { chains?: Chain[] }

export function sumerProvider<TProvider extends Provider = Provider>(
  providerFn: ({
    chainId,
  }: {
    chainId?: number
  }) => ProviderWithFallbackConfig<TProvider> | providers.FallbackProvider,
  dappKey?: string,
): ({
  chainId,
}: {
  chainId?: number
}) => ProviderWithFallbackConfig<TProvider> | providers.FallbackProvider {
  const wrappedProviderFn = ({ chainId }: { chainId?: number }) => {
    const provider = providerFn({ chainId })

    return new Proxy(provider, {
      get(target, prop, _receiver) {
        const method = target[prop]

        if (typeof method === 'function') {
          getUserRejectedRequest({ dappKey, chainId: provider._network.chainId })

          return async (...args: any) => {
            if (method.name === '_waitForTransaction') {
              const transactionReceipt = await method.apply(target, args)

              const txData = new ProcessedTransactionResult({
                wallet: createClient({ provider }).storage.getItem('wallet'),
                chainId: provider._network.chainId,
                data: transactionReceipt as TransactionReceipt,
              })

              await NotifyFactory.create(dappKey).trackProcessedTransaction(txData)
              return transactionReceipt
            }
          }
        }
        return method
      },
    })
  }
  return wrappedProviderFn
}

export function getUserRejectedRequest({ dappKey, chainId }: UserRejectedRequestParams) {
  if (typeof window !== 'undefined' && !window.userRejectedRequestInitialized) {
    const originalConsoleError = window.console.error

    window.console.error = (...args) => {
      try {
        args.forEach(arg => {
          if (arg instanceof Error && arg.name === 'UserRejectedRequestError') {
            const error = JSON.parse(JSON.stringify(arg))
            const rejectError = new ProviderError({
              message: error.cause?.reason,
              address: error.cause?.transaction?.from,
              toAddress: error.cause?.transaction?.to,
              code: error.code,
            })

            const sendError = async (error: ProviderError) => {
              await NotifyFactory.create(dappKey, chainId).trackError(error)
            }

            sendError(rejectError)
            console.warn(arg)
          }
        })
      } catch (e) {
        console.warn('Error in custom console.error:', e)
      } finally {
        if (window._nextSetupHydrationWarning) {
          //prevent Next.js from logging the hydration warning
        } else {
          originalConsoleError.apply(window.console, args)
        }
      }
    }
    window.userRejectedRequestInitialized = true
  }
}
