import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { Fragment, JsonFragment } from '@ethersproject/abi'
import { NotifyService, NotifyFactory } from './services'
import { SumerContract } from './SumerContract'
import { SumerTarget } from './SumerTarget'
import { Observer, ErrorObserver, TransactionObserver } from './observers'
import { ProviderError } from './models'

interface SumerInitArguments {
  dappKey: string
  dns?: string
}

/**
 * Sumer provides a tracking interface for errors that may occur during
 * the interaction with a contract or the provider itself
 */
export class Sumer {
  private static _dappKey: string
  private static _dns: string
  private static notifyService: NotifyService
  private static sumerObservers: Observer[]
  private static isInitialized = false

  private constructor() {}

  static get dappKey() {
    return this._dappKey
  }

  static get dns() {
    return this._dns
  }

  public static init({ dappKey, dns }: SumerInitArguments): void {
    this.notifyService = NotifyFactory.create(dappKey, dns)
    this.sumerObservers = [
      new ErrorObserver(this.notifyService),
      new TransactionObserver(this.notifyService),
    ]
    this._dappKey = dappKey
    this._dns = dns
    this.initializeConsoleErrorTracking()
    this.isInitialized = true
  }

  public static observe<T>(target: T, observers: Observer[] = []): T {
    if (!this.isInitialized) {
      throw new Error(`Sumer client is not properly or yet initialized.`)
    }
    const sumerTarget = new SumerTarget([...this.sumerObservers, ...observers])
    return sumerTarget.proxy(target)
  }

  public static contract(
    addressOrName: string,
    contractInterface: ReadonlyArray<Fragment | JsonFragment>,
    chainId: number,
    signerOrProvider?: Signer | Provider,
  ): Contract {
    return new SumerContract({
      addressOrName,
      contractInterface,
      signerOrProvider,
      chainId,
      notifyService: this.notifyService,
    }) as Contract
  }

  private static initializeConsoleErrorTracking() {
    if (typeof window !== 'undefined' && !this.isInitialized) {
      const WAGMI_ERROR_NAMES = ['UserRejectedRequestError']
      const consoleError = window.console.error
      window.console.error = async (...args) => {
        args.forEach(async arg => {
          if (WAGMI_ERROR_NAMES.includes(arg.name)) {
            this.notifyService.trackError(
              new ProviderError({
                message: arg.cause?.reason,
                address: arg.cause?.transaction?.from,
                code: arg.code,
              }),
            )
          }
        })
        consoleError.apply(window.console, args)
      }
    }
  }
}
