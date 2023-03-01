import { EipError, findEipError } from './eip'

interface ProviderErrorArguments {
  message: string
  code: any
  address: string
}

export class ProviderError {
  public readonly message: string
  public readonly code: number
  public readonly address: string
  public readonly eip: EipError
  public readonly type = 'WALLET'

  constructor({ message, code, address }: ProviderErrorArguments) {
    this.message = message
    this.code = code
    this.address = address
    this.eip = findEipError(code)
  }
}
