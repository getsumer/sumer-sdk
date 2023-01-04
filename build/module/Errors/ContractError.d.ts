export declare class ContractError {
    contractAddress: string;
    name: string;
    address: string;
    args: any[];
    reason: string;
    constructor(addressOrName: string, name: string, args: any[], address: string, reason: string);
}
