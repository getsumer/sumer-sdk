import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
export interface Notify {
    error(msg: ContractError | ProviderError): void;
}
export declare class NotifyBuilder {
    static build(apikey?: string, _env?: string): Notify;
}
