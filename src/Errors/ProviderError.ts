import { EipError, findEipError } from './eip'

export class ProviderError {

    public message: string
    public code: number
    public address: string
    public eip: EipError

    constructor (message: string, code: any, address: string) {
        this.message = message
        this.code = code
        this.address = address
        this.eip = findEipError(code)
    }
}
