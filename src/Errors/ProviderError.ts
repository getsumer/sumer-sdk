import { EipError, findEipError } from './eip'

interface ProviderErrorArguments {
  message: string
  code: number
  address: string
  toAddress?: string
  chainId?: number
}

export class ProviderError {
  public readonly message: string
  public readonly code: number
  public readonly address: string
  public readonly toAddress?: string
  public readonly chainId?: number
  public readonly eip?: EipError
  public readonly type = 'WALLET'

  constructor({ message, code, address, toAddress, chainId }: ProviderErrorArguments) {
    this.message = message
    this.code = code
    this.address = address
    this.toAddress = toAddress
    this.chainId = chainId
    this.eip = findEipError(code)
  }
}
