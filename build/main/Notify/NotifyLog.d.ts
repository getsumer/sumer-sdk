import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
import { txData } from '../Types/TxData';
import { Notify } from './Notify';
export declare class NotifyLog implements Notify {
    txHash(message: txData): void;
    providerError(message: ProviderError): void;
    contractError(msg: ContractError): void;
    setStatus(): void;
}
