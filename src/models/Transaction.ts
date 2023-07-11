import { Metadata } from './Metadata'

export interface TransactionError {
  code: number
  message: string
}

export interface Transaction {
  hash?: string

  toAddress?: string
  fromAddress?: string
  gas?: string
  rpcMethodName?: string
  rpcMethodArgs?: unknown[]

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

  error?: TransactionError
  metadata?: Metadata
}
