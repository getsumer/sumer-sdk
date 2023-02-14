import { Fragment, JsonFragment } from '@ethersproject/abi'
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Networkish,
  Provider,
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import { BigNumber, Signer } from 'ethers'
import { Contract } from './Contract'

interface ProviderMessage {
  readonly type: string
  readonly data: unknown
}

export class DappSonar extends Web3Provider {
  actualAddres: string | undefined

  constructor(_provider: ExternalProvider | JsonRpcFetchFunc, network?: Networkish) {
    super(_provider, network)

    this.on('error', (message: any) => {
      console.error('Error Provider', message)
    })
    this.on('message', (message: ProviderMessage) => {
      console.info('Message', message)
    })

    super.listAccounts().then(a => {
      this.actualAddres = a[0]
    })
  }
  [key: string]: any

  async sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse> {
    return super.sendTransaction(signedTransaction)
  }
  async getBalance(address: string): Promise<BigNumber> {
    let balance: BigNumber = BigNumber.from(0)
    try {
      balance = await super.getBalance(address)
      console.info('Balance of', this.actualAddres, ' is ', balance.toString())
    } catch (error) {
      console.error('Error on getBlance')
    }

    return balance
  }

  static Contract(
    addressOrName: string,
    contractInterface: ReadonlyArray<Fragment | JsonFragment>,
    signerOrProvider?: Signer | Provider,
  ) {
    return new Contract(addressOrName, contractInterface, signerOrProvider)
  }
}
