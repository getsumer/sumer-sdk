import { Api } from './../Api';
import { ContractError } from '../Errors/ContractError';
import { Notify } from './Notify';
import { ProviderError } from '../Errors/ProviderError';
import { txData } from '../Types/TxData';
export declare class NotifyApi implements Notify {
    private client;
    constructor(client: Api);
    txHash(message: txData): void;
    providerError(message: ProviderError): void;
    contractError(msg: ContractError): void;
    setStatus(): void;
    private meta;
}
