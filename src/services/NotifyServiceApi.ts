import { Parser } from 'bowser'
import { NotifyService } from './NotifyService'
import { ProviderError, ContractError, Transaction } from '../models'

interface ErrorBody {
  userAddress: string
  message: string
  errorType: string
  chainId?: number
  metadata?: Parser.ParsedResult | Record<string, string>
}

interface ContractErrorBody extends ErrorBody {
  contractAddress: string
  functionName: string
  args: any
}

interface ProviderErrorBody extends ErrorBody {
  code: number
}

export class NotifyServiceApi implements NotifyService {
  private headers: HeadersInit
  private url: string

  constructor(apikey: string, dns?: string) {
    this.headers = {
      authorization: `${apikey}`,
      'Content-Type': 'application/json',
    }
    this.url = dns ?? 'https://api.getsumer.com'
    this.checkConnection()
  }

  public async trackTransaction(
    transaction: Transaction,
    metadata: Record<string, string>,
  ): Promise<void> {
    this.fetchPost('transactions', {
      ...transaction,
      metadata,
    })
  }

  public async trackError(
    error: ContractError | ProviderError,
    metadata: Record<string, string>,
  ): Promise<void> {
    let body: ContractErrorBody | ProviderErrorBody
    if (error instanceof ContractError) {
      body = {
        userAddress: error.signerOrProviderAddress,
        contractAddress: error.contractAddress,
        functionName: error.name,
        args: error.args,
        message: error.reason,
        errorType: error.type,
        chainId: error.chainId,
        metadata,
      }
    } else {
      body = {
        userAddress: error.address,
        code: error.code,
        message: error.message,
        errorType: error.type,
        chainId: error.chainId,
        metadata,
      }
    }
    this.fetchPost('errors', body)
  }

  private async checkConnection(): Promise<void> {
    try {
      fetch(`${this.url}/check`, {
        method: 'GET',
        headers: this.headers,
      })
    } catch (e) {
      console.warn(`[Sumer:NotifyService][fetch]`, e)
    }
  }

  private fetchPost(uriPath: string, body?: Transaction | ContractErrorBody | ProviderErrorBody) {
    try {
      fetch(`${this.url}/${uriPath}`, {
        method: 'POST',
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
      })
    } catch (e) {
      console.warn(`[Sumer:NotifyService][fetch]`, e)
    }
  }
}
