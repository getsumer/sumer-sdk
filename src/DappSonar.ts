import { Fragment, JsonFragment } from '@ethersproject/abi'
import { ExternalProvider, JsonRpcFetchFunc, Networkish, Provider, TransactionResponse, Web3Provider } from '@ethersproject/providers'
import { BytesLike, ethers, Signer } from 'ethers'
import { Contract } from './Contract'
import { ProviderError } from './Errors/ProviderError'
import { NotifyBuilder } from './Notify/Notify'

export class DappSonar extends Web3Provider {
  static apikey?: string
  [key: string]: any;
  public actualAddres: string | undefined

  constructor(_provider: ExternalProvider | JsonRpcFetchFunc, key?: string, network?: Networkish,) {
    super(_provider, network)

    super.listAccounts().then((a) => {
      this.actualAddres = a[0]
    })
    this.apikey = key
  }

  public static Contract(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider) {
    return new Contract(addressOrName, contractInterface, signerOrProvider)
  }

  public async sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse> {
    try {
      const response = await super.sendTransaction(signedTransaction)

      return response
    } catch (error) {
      if (!error.DappSonar) {
        let from = this.actualAddres
        try {
          from = ethers.utils.parseTransaction(signedTransaction as BytesLike).from
        } catch (error) {
          from = this.actualAddres
        }

        const providerError = new ProviderError(error.message, error.code, from)
        NotifyBuilder.build().error(providerError)
        error.DappSonar = true
      }
      throw error
    }
  }

}