interface ContractErrorArguments {
  contractAddress: string
  signerOrProviderAddress: string
  name: string
  args: any[]
  reason: string
}

export class ContractError {
  public contractAddress: string
  public signerOrProviderAddress: string
  public name: string
  public args: any[]
  public reason: string

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
