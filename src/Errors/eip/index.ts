import { ProviderErrorsEip1193 } from './1193'
import { RPCErrorsEip1474 } from './1474'

export interface EipError {
  statusCode: number
  name: string
  description: string
}

export const eipErrors = [...ProviderErrorsEip1193, ...RPCErrorsEip1474]

export const findEipError = (eipCode: number) => {
  return eipErrors.find((e: EipError) => e.statusCode === eipCode)
}
