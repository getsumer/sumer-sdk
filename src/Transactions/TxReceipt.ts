interface TransactionLog {
  blockNumber: number | string
  blockHash: string
  transactionIndex: number | string
  removed: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number | string
}
type GasHexValue = string | { _hex: string }
interface TransactionReceipt {
  blockHash: string
  blockNumber: number | string
  contractAddress?: string
  cumulativeGasUsed: GasHexValue
  effectiveGasPrice: GasHexValue
  confirmations?: number | string
  from: string
  gasUsed: GasHexValue
  logs: TransactionLog[]
  logsBloom: string
  status?: number | string
  to: string
  transactionHash: string
  transactionIndex: number | string
  type?: number | string
  root?: string
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
  readonly transactionIndex: number | string
  readonly root?: string
  readonly gasUsed: GasHexValue
  readonly logsBloom: string
  readonly blockHash: string
  readonly transactionHash: string
  readonly logs: TransactionLog[]
  readonly blockNumber: number | string
  readonly confirmations?: number | string
  readonly cumulativeGasUsed: string
  readonly effectiveGasPrice: string
  readonly byzantium?: boolean
  readonly type?: number | string
  readonly status?: number | string

  constructor({ wallet, chainId, txReceipt: data }: TxReceiptArgs) {
    this.wallet = wallet
    this.chainId = chainId
    this.to = data.to
    this.from = data.from
    this.contractAddress = data.contractAddress
    this.transactionIndex = data.transactionIndex.toString()
    this.root = data.root
    this.gasUsed = data.gasUsed instanceof Object ? data.gasUsed._hex : data.gasUsed
    this.logsBloom = data.logsBloom
    this.blockHash = data.blockHash
    this.transactionHash = data.transactionHash
    this.logs = data.logs
    this.blockNumber = data.blockNumber.toString()
    this.confirmations = data.confirmations?.toString()
    this.cumulativeGasUsed = data.gasUsed instanceof Object ? data.gasUsed._hex : data.gasUsed
    this.effectiveGasPrice = data.gasUsed instanceof Object ? data.gasUsed._hex : data.gasUsed
    this.type = data.type?.toString()
    this.status = data.status?.toString()
  }
}
