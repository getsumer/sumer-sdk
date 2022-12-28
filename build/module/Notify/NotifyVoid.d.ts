import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
import { Notify } from './Notify';
export declare class NotifyVoid implements Notify {
    txHash(_message: ContractError): void;
    providerError(_message: ProviderError): void;
    contractError(_msg: ContractError | ProviderError): void;
    setStatus(): void;
}
