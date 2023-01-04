import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
import { txData } from '../Types/TxData';
export interface Notify {
    contractError(msg: ContractError): void;
    txHash(msg: txData): void;
    providerError(msg: ProviderError): void;
    setStatus(): void;
}
export declare class NotifyBuilder {
    static build(apikey?: string, chainId?: number, _env?: string): Notify;
}
