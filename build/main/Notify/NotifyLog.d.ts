import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
import { Notify } from './Notify';
export declare class NotifyLog implements Notify {
    txHash(message: ContractError): void;
    providerError(message: ProviderError): void;
    contractError(msg: ContractError | ProviderError): void;
    setStatus(): void;
}
