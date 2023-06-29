import { Parser } from 'bowser'

export interface Transaction {
  hash?: string

  toAddress?: string
  fromAddress?: string
  rpcMethodName?: string
  rpcMethodArgs?: unknown[]
  gas?: string

  // Transaction Response
  nonce?: number
  gasLimit?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
  data?: string
  value?: string
  chainId?: number

  // Transaction Receipt
  blockHash?: string
  blockNumber?: number
  confirmations?: number
  transactionIndex?: number
  contractAddress?: string
  gasUsed?: string
  effectiveGasPrice?: string
  cumulativeGasUsed?: string
  status?: number

  // Error
  error?: {
    code: number
    message: string
  }

  metadata?: Parser.ParsedResult | Record<string, string>
}
