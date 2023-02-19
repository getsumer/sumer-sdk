import { EipError, findEipError } from './eip'

interface ProviderErrorArguments {
  message: string
  code: any
  address: string
}

export class ProviderError {
  public message: string
  public code: number
  public address: string
  public eip: EipError

  constructor({ message, code, address }: ProviderErrorArguments) {
    this.message = message
    this.code = code
    this.address = address
    this.eip = findEipError(code)
  }
}
