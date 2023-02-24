import bowser, { Parser } from 'bowser'
import { NotifyService } from './NotifyService'
import { ProviderError, ContractError } from '../Errors'
import { TransactionData } from '../Types/TransactionData'

interface FetchBody {
  [key: string]: string | number | FetchBody | any
}

export class NotifyServiceApi implements NotifyService {
  private headers: HeadersInit
  private url: string

  constructor(apikey: string, chainId?: number, dns?: string) {
    this.headers = {
      authorization: `${apikey}`,
      chainid: `${chainId}`,
    }
    this.url = dns ?? 'https://api.getsumer.com'
  }

  public async trackTransaction({
    chainId,
    txHash,
    functionName,
    args,
  }: TransactionData): Promise<void> {
    this.fetchPost('transactions', {
      chainId,
      txHash,
      functionName,
      functionArgs: args,
      metadata: this.meta(),
    })
  }

  public async trackError(error: ContractError | ProviderError): Promise<void> {
    let body: FetchBody
    if (error instanceof ContractError) {
      body = {
        userAddress: error.signerOrProviderAddress,
        contractAddress: error.contractAddress,
        functionName: error.name,
        args: error.args,
        message: error.reason,
        metadata: this.meta(),
      }
    } else {
      body = {
        userAddress: error.address,
        code: error.code,
        message: error.message,
        metadata: this.meta(),
      }
    }
    this.fetchPost('w3errors', body)
  }

  public async checkConnection(): Promise<void> {
    this.fetchPost('activate')
  }

  private fetchPost(uriPath: string, body?: FetchBody) {
    fetch(`${this.url}/${uriPath}`, {
      method: 'POST',
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  private meta(): Parser.ParsedResult | Record<string, string> {
    if (window?.navigator?.userAgent) {
      return bowser.parse(window.navigator.userAgent)
    }
    return {}
  }
}
