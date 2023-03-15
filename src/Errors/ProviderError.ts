import { EipError, findEipError } from './eip'

interface ProviderErrorArguments {
  message: string
  code: number
  address: string
  toAddress?: string
}

export class ProviderError {
  public readonly message: string
  public readonly code: number
  public readonly address: string
  public readonly toAddress?: string
  public readonly eip: EipError
  public readonly type = 'WALLET'

  constructor({ message, code, address, toAddress }: ProviderErrorArguments) {
    this.message = message
    this.code = code
    this.address = address
    this.toAddress = toAddress
    this.eip = findEipError(code)
  }
}
