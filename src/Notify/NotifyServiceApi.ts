import bowser, { Parser } from 'bowser'
import { NotifyService } from './NotifyService'
import { ProviderError, ContractError } from '../Errors'
import {
  ProcessedTransactionData,
  ProcessedTransactionResult,
  Transaction,
} from '../Types/Transaction'

interface TransactionBody {
  chainId: number
  txHash: string
  functionName: string
  functionArgs: any
  metadata: Parser.ParsedResult | Record<string, string>
}

interface ErrorBody {
  userAddress: string
  message: string
  errorType: string
  metadata: Parser.ParsedResult | Record<string, string>
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

  constructor(apikey: string, chainId?: number, dns?: string) {
    this.headers = {
      authorization: `${apikey}`,
      chainid: `${chainId}`,
      'Content-Type': 'application/json',
    }
    this.url = dns ?? 'https://api.getsumer.com'
  }

  public async trackProcessedTransaction(data: ProcessedTransactionResult): Promise<void> {
    this.fetchPost('transactions', {
      ...data,
    })
  }

  public async trackTransaction({
    chainId,
    txHash,
    functionName,
    args,
  }: Transaction): Promise<void> {
    this.fetchPost('transactions', {
      chainId,
      txHash,
      functionName,
      functionArgs: args,
      metadata: this.meta(),
    })
  }

  public async trackError(error: ContractError | ProviderError): Promise<void> {
    let body: ContractErrorBody | ProviderErrorBody
    if (error instanceof ContractError) {
      body = {
        userAddress: error.signerOrProviderAddress,
        contractAddress: error.contractAddress,
        functionName: error.name,
        args: error.args,
        message: error.reason,
        errorType: error.type,
        metadata: this.meta(),
      }
    } else {
      body = {
        userAddress: error.address,
        contractAddress: error.toAddress,
        code: error.code,
        message: error.message,
        errorType: error.type,
        metadata: this.meta(),
      }
    }
    this.fetchPost('errors', body)
  }

  public async checkConnection(): Promise<void> {
    fetch(`${this.url}/check`, {
      method: 'GET',
      headers: this.headers,
    })
  }

  private fetchPost(
    uriPath: string,
    body?: TransactionBody | ContractErrorBody | ProviderErrorBody | ProcessedTransactionData,
  ) {
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
