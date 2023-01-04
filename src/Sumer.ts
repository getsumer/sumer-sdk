import { Fragment, JsonFragment } from '@ethersproject/abi'
import { ExternalProvider, JsonRpcFetchFunc, Networkish, Provider, TransactionResponse, Web3Provider } from '@ethersproject/providers'
import { BytesLike, ethers, Signer } from 'ethers'
import { Contract } from './Contract'
import { ProviderError } from './Errors/ProviderError'
import { NotifyBuilder } from './Notify/Notify'
import { txData } from './Types/TxData'

/**
 * Sumer is a Provider that extends ethers Web3Provider. Sumer can track the errors 
 * that may occur during the interaction with a contract or the provider.
 */
export class Sumer extends Web3Provider {

  static apikey?: string
  public actualAddres: string | undefined
  private static instance: Sumer;
  static chainId: number;
  private isProvider = false;
  [key: string]: any;

  constructor(_provider: ExternalProvider | JsonRpcFetchFunc, key?: string, network?: Networkish) {

    super(_provider, network)
    // @ts-ignore
    this.chainId = _provider.networkVersion

    if (!this.isProvider) {
      this.isProvider = !!_provider
      NotifyBuilder.build(key, this.chainId).setStatus()
    }

    super.listAccounts().then((accounts) => {
      this.actualAddres = accounts[0]
    })

    this.apikey = key
    this.instance = this;

  }
  public static getInstance(): Sumer | undefined {
    return Sumer.instance;
  }

  // use the sumer contract to catch the errors
  public static Contract(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider, apikey?: string, chainId?: number) {
    return new Contract(addressOrName, contractInterface, signerOrProvider, apikey, chainId)
  }

  // wrap sendTransaction to catch errors
  public async sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse> {

    try {
      const response = await super.sendTransaction(signedTransaction)
      // send tx data 
      const payload: txData = {
        chainId: this.chainId,
        txHash: response.hash,
      }
      NotifyBuilder.build(this.apikey, this.chainId).txHash(payload)

      return response

    } catch (error) {

      if (!error.DappSonar) {
        let from = this.actualAddres
        try {
          from = ethers.utils.parseTransaction(signedTransaction as BytesLike).from
        } catch (error) {
          from = this.actualAddres
        }

        // notify the error to the sumer server
        const providerError = new ProviderError(error.message, error.code, from)
        NotifyBuilder.build(this.apikey, this.chainId).providerError(providerError)
        error.DappSonar = true
      }
      throw error
    }
  }
}
