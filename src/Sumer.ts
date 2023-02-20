import { Contract, BytesLike, ethers, Signer } from 'ethers'
import { Fragment, JsonFragment } from '@ethersproject/abi'
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Networkish,
  Provider,
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import { NotifyService, NotifyFactory } from './Notify'
import { SumerContract } from './SumerContract'
import { SumerProvider } from './SumerProvider'
import { ProviderError } from './Errors'

interface SumerInitArguments {
  provider: ExternalProvider | JsonRpcFetchFunc
  dappKey: string
  network?: Networkish
  dns?: string
}

/**
 * Sumer provides a tracking mechanism for errors that may occur during
 * the interaction with a contract or the provider itself
 */
export class Sumer {
  private static notifyService: NotifyService
  private static dappKey: string
  private static chainId: number
  private static sumerProviderInstance: SumerProvider
  private static _currentAddress: string

  private constructor() {}

  static get currentAddress() {
    return this._currentAddress
  }

  static get provider() {
    return this.sumerProviderInstance
  }

  static init({ provider, dappKey, network, dns }: SumerInitArguments): Web3Provider {
    if (this.sumerProviderInstance) {
      return this.sumerProviderInstance
    }
    // @ts-ignore
    this.chainId = provider.networkVersion
    this.dappKey = dappKey
    this.notifyService = NotifyFactory.create(this.dappKey, this.chainId, dns)
    this.sumerProviderInstance = new SumerProvider({
      provider,
      network,
      notifyService: this.notifyService,
    })
    this.sumerProviderInstance.listAccounts().then(accounts => (this._currentAddress = accounts[0]))
    this.notifyService.checkConnection()

    return this.sumerProviderInstance
  }

  public static createWrappedContract(
    addressOrName: string,
    contractInterface: ReadonlyArray<Fragment | JsonFragment>,
    signerOrProvider?: Signer | Provider,
  ): Contract {
    return new SumerContract({
      addressOrName,
      contractInterface,
      signerOrProvider,
      chainId: this.chainId,
      notifyService: this.notifyService,
    }) as Contract
  }

  // Wrap sendTransaction to catch errors
  public static async sendTransaction(
    signedTransaction: string | Promise<string>,
  ): Promise<TransactionResponse> {
    try {
      const response = await this.sumerProviderInstance.sendTransaction(signedTransaction)
      await this.notifyService.trackTransaction({
        chainId: this.chainId,
        txHash: response.hash,
      })

      return response
    } catch (error) {
      if (!error.Sumer) {
        let from = this.currentAddress
        try {
          from = ethers.utils.parseTransaction(signedTransaction as BytesLike).from
        } catch (error) {
          from = this.currentAddress
        }
        const providerError = new ProviderError({
          message: error.message,
          code: error.code,
          address: from,
        })
        this.notifyService.trackError(providerError)
        error.Sumer = true
      }
      throw error
    }
  }

  public static destroy() {
    delete this.sumerProviderInstance
  }
}
