import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { Fragment, JsonFragment } from '@ethersproject/abi'
import { Observer, TelemetryService } from './core'
import { TransactionObserver } from './observers'
import { TelemetryServiceFactory } from './services'
import { ProxyTarget } from './targets'
import { SumerContract } from './SumerContract'

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
 * Sumer provides a tracking interface for transactions that may occur during
 * the interaction with a contract or the provider itself
 */
export class Sumer {
  private static _dappKey: string
  private static _dns: string
  private static telemetryService: TelemetryService
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
    this.telemetryService = TelemetryServiceFactory.create(dappKey, dns)
    this.sumerObservers = [...observers, new TransactionObserver(this.telemetryService)]
    this._dappKey = dappKey
    this._dns = dns
    if (standalone) {
      this.initializeWindow()
    }
    this.isInitialized = true
  }

  public static observe<T>(target: T, observers: Observer[] = []): T {
    if (!this.isInitialized) {
      throw new Error(`Sumer client is not properly or yet initialized.`)
    }
    const proxyTarget = new ProxyTarget([...observers, ...this.sumerObservers])
    return proxyTarget.proxy(target)
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
      telemetryService: this.telemetryService,
    }) as Contract
  }

  public static trackTransaction(hash: string) {
    const validHex = /^0x[a-fA-F0-9]{64}$/
    if (!hash.match(validHex)) {
      throw new Error(`Transaction hash <${hash}> has not a valid 66-character hexadecimal format.`)
    }
    return this.telemetryService.trackTransaction({ hash })
  }

  private static initializeWindow() {
    if (!this.isInitialized && typeof window !== 'undefined' && window.ethereum) {
      const proxyTarget = new ProxyTarget(this.sumerObservers)
      const desc = Object.getOwnPropertyDescriptor(window, 'ethereum')
      const isReadOnly = desc && !desc.writable

      if (!isReadOnly) {
        window.ethereum = proxyTarget.proxy(window.ethereum)
      } else {
        console.warn(
          'Unable to initialize in standalone mode as window.ethereum is set as readonly.',
        )
      }
    }
  }
}
