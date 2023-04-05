// https://eips.ethereum.org/EIPS/eip-1193
import { EipError } from '../ProviderError'

export const ProviderErrorsEip1193: EipError[] = [
  {
    statusCode: 4001,
    name: 'User Rejected Request',
    description: 'The user rejected the request.',
  },
  {
    statusCode: 4100,
    name: 'Unauthorized',
    description: 'The requested method and/ or account has not been authorized by the user.',
  },
  {
    statusCode: 4200,
    name: 'Unsupported Method',
    description: 'The Provider does not support the requested method.',
  },
  {
    statusCode: 4900,
    name: 'Disconnected',
    description: 'The Provider is disconnected from all chains.',
  },
  {
    statusCode: 4901,
    name: 'Chain Disconnected',
    description: 'The Provider is not connected to the requested chain.',
  },
]
