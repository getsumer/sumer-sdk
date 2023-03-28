import { TransactionReceipt } from '@ethersproject/providers'

interface TransactionLog {
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

interface TxReceiptArgs {
  wallet?: unknown | string
  chainId?: number
  txReceipt: TransactionReceipt
}

export class TxReceipt {
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
  readonly logs: TransactionLog[]
  readonly blockNumber: number
  readonly confirmations: number
  readonly cumulativeGasUsed: string
  readonly effectiveGasPrice: string
  readonly byzantium?: boolean
  readonly type?: number
  readonly status?: number

  constructor({ wallet, chainId, txReceipt: data }: TxReceiptArgs) {
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
