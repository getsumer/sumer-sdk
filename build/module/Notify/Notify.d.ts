import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
export interface Notify {
    contractError(msg: ContractError | ProviderError): void;
    txHash(message: any): void;
    providerError(message: ProviderError | any): void;
    setStatus(): void;
}
export declare class NotifyBuilder {
    static build(apikey?: string, chainId?: number, _env?: string): Notify;
}
