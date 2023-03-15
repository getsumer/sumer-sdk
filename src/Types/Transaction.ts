import { TransactionReceipt } from '@ethersproject/providers'

interface Log {
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
}
interface TransactionArguments {
  chainId: number
  txHash: string
  functionName?: string
  args?: any[]
}

export interface ProcessedTransactionData {
  wallet?: unknown | string
  chainId?: number
  to: string
  from: string
  contractAddress?: string
  transactionIndex: number
  root?: string
  gasUsed: string
  logsBloom: string
  blockHash: string
  transactionHash: string
  logs: Log[]
  blockNumber: number
  confirmations: number
  cumulativeGasUsed: string
  effectiveGasPrice: string
  byzantium: boolean
  type: number
  status?: number
}

export class Transaction {
  public readonly chainId: number
  public readonly txHash: string
  public readonly functionName?: string
  public readonly args?: any[]

  constructor({ chainId, txHash, functionName, args }: TransactionArguments) {
    this.chainId = chainId
    this.txHash = txHash
    this.functionName = functionName
    this.args = args
  }
}

interface ProcessedTransactionResultArguments {
  wallet: unknown | string
  chainId: number
  data: TransactionReceipt
}
export class ProcessedTransactionResult implements ProcessedTransactionData {
  readonly wallet?: unknown | string
  readonly chainId?: number
  // tx recepit
  readonly to: string
  readonly from: string
  readonly contractAddress?: string
  readonly transactionIndex: number
  readonly root?: string
  readonly gasUsed: string
  readonly logsBloom: string
  readonly blockHash: string
  readonly transactionHash: string
  readonly logs: Log[]
  readonly blockNumber: number
  readonly confirmations: number
  readonly cumulativeGasUsed: string
  readonly effectiveGasPrice: string
  readonly byzantium: boolean
  readonly type: number
  readonly status?: number

  constructor({ wallet, chainId, data }: ProcessedTransactionResultArguments) {
    this.wallet = wallet
    this.chainId = chainId
    this.to = data.to
    this.from = data.from
    this.contractAddress = data.contractAddress
    this.transactionIndex = data.transactionIndex
    this.root = data.root
    this.gasUsed = data.gasUsed._hex
    this.logsBloom = data.logsBloom
    this.blockHash = data.blockHash
    this.transactionHash = data.transactionHash
    this.logs = data.logs
    this.blockNumber = data.blockNumber
    this.confirmations = data.confirmations
    this.cumulativeGasUsed = data.cumulativeGasUsed._hex
    this.effectiveGasPrice = data.effectiveGasPrice._hex
    this.byzantium = data.byzantium
    this.type = data.type
    this.status = data.status
  }
}
