import { Transaction } from '../models'

export interface TelemetryService {
  trackTransaction(transaction: Transaction): Promise<void>
}
