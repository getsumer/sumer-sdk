import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
import { Notify } from './Notify';
export declare class NotifyVoid implements Notify {
    error(_msg: ContractError | ProviderError): void;
}
