// https://eips.ethereum.org/EIPS/eip-1474

import { EipError } from './1193'

export const RPCErrorsEip1474: EipError[] = [
  { statusCode: -32700, name: 'Parse error', description: 'Invalid JSON' },
  {
    statusCode: -32600,
    name: 'Invalid request',
    description: 'JSON is not a valid request object',
  },
  { statusCode: -32601, name: 'Method not found', description: 'Method does not exist' },
  { statusCode: -32602, name: 'Invalid params', description: 'Invalid method parameters' },
  { statusCode: -32603, name: 'Internal error', description: 'Internal JSON - RPC error' },
  { statusCode: -32000, name: 'Invalid input', description: 'Missing or invalid parameters' },
  { statusCode: -32001, name: 'Resource not found	', description: 'Requested resource not found' },
  {
    statusCode: -32002,
    name: 'Resource unavailable',
    description: 'Requested resource not available	',
  },
  { statusCode: -32003, name: 'Transaction rejected', description: 'Transaction creation failed' },
  { statusCode: -32004, name: 'Method not supported', description: 'Method is not implemented' },
  { statusCode: -32005, name: 'Limit exceeded', description: 'Request exceeds defined limit' },
  {
    statusCode: -32006,
    name: 'JSON-RPC version not supported	',
    description: 'Version of JSON - RPC protocol is not supported',
  },
]
