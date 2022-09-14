import { BaseError } from './BaseError'
import { EipError, findEipError } from './eip'

export class ProviderError extends BaseError {
    public address: string
    public eip: EipError
    constructor (message: string, code: any, address?: string) {
        super(message, code)
        this.address = address
        this.eip = findEipError(code)

    }
    public toString () {
        if (this.eip) {
            return `[${this.code}] ${this.eip.description}`
        }
        return `[${this.code}] ${this.message}`
    }
}
