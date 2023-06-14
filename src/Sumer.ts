import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { Fragment, JsonFragment } from '@ethersproject/abi'
import { NotifyService, NotifyFactory } from './services'
import { SumerContract } from './SumerContract'
import { SumerTarget } from './SumerTarget'
import { Observer, TransactionObserver } from './observers'

declare global {
  interface Window {
    ethereum?: unknown
  }
}

interface SumerInitArguments {
  dappKey: string
  dns?: string
  observers?: Observer[]
  standalone?: boolean
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

  public static init({
    dappKey,
    dns,
    observers = [],
    standalone = true,
  }: SumerInitArguments): void {
    this.notifyService = NotifyFactory.create(dappKey, dns)
    this.sumerObservers = [...observers, new TransactionObserver(this.notifyService)]
    this._dappKey = dappKey
    this._dns = dns
    this.initializeWindow(standalone)
    this.isInitialized = true
  }

  public static observe<T>(target: T, observers: Observer[] = []): T {
    if (!this.isInitialized) {
      throw new Error(`Sumer client is not properly or yet initialized.`)
    }
    const sumerTarget = new SumerTarget([...observers, ...this.sumerObservers])
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

  public static trackTransaction(hash: string) {
    const validHex = /^0x[a-fA-F0-9]{64}$/
    if (!hash.match(validHex)) {
      throw new Error(`Transaction hash <${hash}> has not a valid 66-character hexadecimal format.`)
    }
    return this.notifyService.trackTransaction({ hash })
  }

  private static initializeWindow(standalone?: boolean) {
    if (typeof window !== 'undefined' && !this.isInitialized) {
      const sumerTarget = new SumerTarget(this.sumerObservers)

      if (window.ethereum && standalone) {
        const desc = Object.getOwnPropertyDescriptor(window, 'ethereum')
        const isReadOnly = desc && !desc.writable

        if (!isReadOnly) {
          window.ethereum = sumerTarget.proxy(window.ethereum)
        } else {
          console.warn(
            'Unable to initialize in standalone mode as window.ethereum is set as readonly.',
          )
        }
      }
    }
  }
}
