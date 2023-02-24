interface ContractErrorArguments {
  contractAddress: string
  signerOrProviderAddress: string
  name: string
  args: any[]
  reason: string
}

export class ContractError {
  public readonly contractAddress: string
  public readonly signerOrProviderAddress: string
  public readonly name: string
  public readonly args: any[]
  public readonly reason: string

  constructor({
    contractAddress,
    name,
    args,
    signerOrProviderAddress,
    reason,
  }: ContractErrorArguments) {
    this.contractAddress = contractAddress
    this.signerOrProviderAddress = signerOrProviderAddress
    this.name = name
    this.args = args
    this.reason = reason
  }
}
