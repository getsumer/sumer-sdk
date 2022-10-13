import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
import { Notify } from './Notify';
export declare class NotifyVoid implements Notify {
    sendTxHash(_message: ContractError): void;
    providerError(_message: ProviderError): void;
    error(_msg: ContractError | ProviderError): void;
    static error(_msg: ContractError | ProviderError): void;
}
