import { providers } from 'ethers'
import { ProviderError } from './Errors'
import { NotifyFactory } from './Notify'
import { TxReceipt } from './Transactions'

interface FetchData {
  method: string
  from: string
  to?: string
  data?: string
}

interface TxParams {
  from: string
  to: string
  [key: string]: any
}

export class SumerWeb3ReactProvider extends providers.Web3Provider {
  private readonly nullAddress = '0x0000000000000000000000000000000000000000'

  constructor(provider: providers.Web3Provider) {
    super(provider.provider, provider.network)
  }

  send(method: string, params: any[]): Promise<any> {
    const data = this.getData(method, params)

    const response = super.send(method, params)
    response
      .then(res => {
        if (res && res.transactionHash) {
          const txData = new TxReceipt({
            wallet: this.connection.url,
            chainId: this._network.chainId,
            txReceipt: res,
          })
          NotifyFactory.create().trackTxReceipt(txData)
        }
      })
      .catch(err => {
        const error = JSON.parse(JSON.stringify(err))
        const { message, code } = error
        const providerError = new ProviderError({
          message,
          code,
          address: data.from,
          toAddress: data.to,
        })
        NotifyFactory.create('dappKey').trackError(providerError)
      })
    return response
  }

  static create(provider: providers.Web3Provider): providers.Web3Provider {
    return new SumerWeb3ReactProvider(provider) as providers.Web3Provider
  }

  private getData(method: string, params: string[]): FetchData {
    switch (method) {
      case 'eth_sign':
      case 'eth_signTypedData_v4':
        return {
          method,
          from: params?.[0] ?? this.nullAddress,
          data: JSON.stringify(params?.[1]),
        }

      case 'personal_sign':
        return {
          method,
          from: params?.[1] ?? this.nullAddress,
          data: JSON.stringify(params?.[0]),
        }

      case 'eth_sendTransaction': {
        const txData: TxParams = JSON.parse(params?.[0] ?? '{}')
        return {
          method,
          from: txData.from ?? this.nullAddress,
          to: txData.to,
          data: JSON.stringify(params?.[0]),
        }
      }

      default:
        return {
          method,
          from: this.nullAddress,
        }
    }
  }
}
