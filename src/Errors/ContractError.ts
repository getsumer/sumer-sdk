export class ContractError {
    public contractAddress: string
    public name: string
    public address: string
    public args: any[]
    public reason: string

    constructor (addressOrName: string, name: string, args: any[], address: string, reason: string) {
        this.args = args
        this.name = name
        this.address = address
        this.contractAddress = addressOrName
        this.reason = reason
    }

    public toString () {
        return `Error on Contract ${this.contractAddress} function "${this.name}" with args "${this.args.toString()}. Reason: ${this.reason} "`
    }
}
