interface TransactionArguments {
  chainId: number
  txHash: string
  functionName?: string
  args?: any[]
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
