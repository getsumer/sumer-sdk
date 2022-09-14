export declare class ContractError {
    contractAddress: string;
    name: string;
    address: string;
    args: Array<any>;
    reason: string;
    constructor(addressOrName: string, name: string, args: Array<any>, address: string, reason: string);
    toString(): string;
}
