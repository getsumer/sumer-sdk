import { Api } from './../Api';
import { ContractError } from '../Errors/ContractError';
import { ProviderError } from '../Errors/ProviderError';
import { Notify } from './Notify';
export declare class NotifyApi implements Notify {
    private client;
    constructor(client: Api);
    txHash(message: any): void;
    providerError(message: ProviderError): void;
    error(msg: ContractError | ProviderError): void;
    private meta;
}
