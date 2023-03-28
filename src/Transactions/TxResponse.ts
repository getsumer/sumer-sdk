import { TransactionResponse } from '@ethersproject/providers'

interface TxResponseArgs {
  chainId?: number
  functionName?: string
  args?: any[]
  txResponse: TransactionResponse
}

export class TxResponse {
  readonly chainId?: number
  readonly functionName?: string
  readonly args?: any[]
  readonly hash: string
  readonly blockNumber?: number
  readonly blockHash?: string
  readonly timestamp?: number
  readonly confirmations?: number
  readonly from: string
  readonly raw?: string

  constructor({ chainId, functionName, args, txResponse: data }: TxResponseArgs) {
    this.chainId = chainId
    this.functionName = functionName
    this.args = args

    this.hash = data.hash
    this.blockNumber = data.blockNumber
    this.blockHash = data.blockHash
    this.timestamp = data.timestamp
    this.confirmations = data.confirmations
    this.from = data.from
    this.raw = data.raw
  }
}
