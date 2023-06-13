export interface Transaction {
  hash?: string

  toAddress?: string
  fromAddress?: string
  functionName?: string
  args?: any[]

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
}
