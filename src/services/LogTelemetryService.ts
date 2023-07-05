import { TelemetryService } from '../core'
import { Transaction } from '../models'

export class LogTelemetryService implements TelemetryService {
  private _chainId: number

  get chainId() {
    return this._chainId
  }

  public async trackTransaction(transaction: Transaction): Promise<void> {
    console.info('trackTransaction Log:', transaction)
  }

  public async checkConnection(): Promise<void> {
    console.info('checkConnection')
  }
}
