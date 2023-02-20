import axios, { RawAxiosRequestHeaders } from 'axios'
import { v4 } from 'uuid'
import bowser from 'bowser'
import { NotifyService } from './NotifyService'
import { ProviderError, ContractError } from '../Errors'
import { TransactionData } from '../Types/TransactionData'

export class NotifyServiceApi implements NotifyService {
  private headers: RawAxiosRequestHeaders
  private url: string

  constructor(apikey: string, chainId?: number, dns?: string) {
    this.headers = {
      Authorization: `${apikey}`,
      chainId: `${chainId}`,
    }
    this.url = dns ?? 'https://api.getsumer.com'
  }

  public async trackTransaction({
    chainId,
    txHash,
    functionName,
    args,
  }: TransactionData): Promise<void> {
    const body = {
      id: v4(),
      chainId,
      txHash,
      functionName,
      functionArgs: args,
      metadata: this.meta(),
    }
    return axios.post(`${this.url}/tx/${body.txHash}`, body, { headers: this.headers })
  }

  public async trackError(error: ContractError | ProviderError): Promise<void> {
    if (error instanceof ContractError) {
      const body = {
        id: v4(),
        userAddress: error.signerOrProviderAddress,
        contractAddress: error.contractAddress,
        functionName: error.name,
        args: error.args,
        message: error.reason,
        metadata: this.meta(),
      }
      return axios.post(this.url + '/contract_errors', body, { headers: this.headers })
    } else {
      const body = {
        id: v4(),
        userAddress: error.address,
        code: error.code,
        message: error.message,
        metadata: this.meta(),
      }
      return axios.post(`${this.url}/exception`, body, { headers: this.headers })
    }
  }

  public async checkConnection(): Promise<void> {
    return axios.post(
      `${this.url}/set_status`,
      { status: 'provider detected' },
      { headers: this.headers },
    )
  }

  private meta() {
    if (window?.navigator?.userAgent) {
      return bowser.parse(window.navigator.userAgent)
    }
    return {}
  }
}
