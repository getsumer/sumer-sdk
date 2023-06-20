import { NotifyService } from './NotifyService'
import { Transaction } from '../models'

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

  public async trackTransaction(transaction: Transaction): Promise<void> {
    this.fetchPost('transactions', {
      ...transaction,
    })
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

  private fetchPost(uriPath: string, body?: Transaction): void {
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
