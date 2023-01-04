import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
import { txData } from '../Types/TxData';
import { Notify } from './Notify';
export declare class NotifyVoid implements Notify {
    txHash(_message: txData): void;
    providerError(_message: ProviderError): void;
    contractError(_message: ContractError): void;
    setStatus(): void;
}
