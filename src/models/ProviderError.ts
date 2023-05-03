import { ProviderErrorsEip1193 } from './eip/1193'
import { RPCErrorsEip1474 } from './eip/1474'

export interface EipError {
  statusCode: number
  name: string
  description: string
}

interface ProviderErrorArguments {
  chainId?: number
  message: string
  code: number
  address: string
}

export class ProviderError {
  public readonly chainId?: number
  public readonly message: string
  public readonly code: number
  public readonly address: string
  public readonly eip: EipError
  public readonly type = 'WALLET'
  public readonly eipErrors = [...ProviderErrorsEip1193, ...RPCErrorsEip1474]

  constructor({ chainId, message, code, address }: ProviderErrorArguments) {
    this.chainId = chainId
    this.message = message
    this.code = code
    this.address = address
    this.eip = this.getEipError(code)
  }

  private getEipError(eipCode: number): EipError {
    return this.eipErrors.find((e: EipError) => e.statusCode === eipCode)
  }
}
