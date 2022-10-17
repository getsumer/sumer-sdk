import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
export interface Notify {
    error(msg: ContractError | ProviderError): void;
    txHash(message: any): void;
    providerError(message: ProviderError): void;
}
export declare class NotifyBuilder {
    static build(apikey?: string, chainId?: number, _env?: string): Notify;
}
