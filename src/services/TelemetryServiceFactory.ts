import { TelemetryService } from '../core'
import { LogTelemetryService } from './LogTelemetryService'
import { SumerTelemetryService } from './SumerTelemetryService'

export class TelemetryServiceFactory {
  private static telemetryServiceInstance: TelemetryService

  static create(apikey: string, dns?: string): TelemetryService {
    if (this.telemetryServiceInstance) {
      return this.telemetryServiceInstance
    }
    if (process.env.NODE_ENV === 'test') {
      this.telemetryServiceInstance = new LogTelemetryService()
    } else {
      this.telemetryServiceInstance = new SumerTelemetryService(apikey, dns)
    }
    return this.telemetryServiceInstance
  }
}
