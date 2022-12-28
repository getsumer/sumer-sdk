import { Api } from './../Api';
import { ContractError } from '../Errors/ContractError';
import { Notify } from './Notify';
export declare class NotifyApi implements Notify {
    private client;
    constructor(client: Api);
    txHash(message: any): void;
    providerError(message: any): void;
    contractError(msg: ContractError): void;
    setStatus(): void;
    private meta;
}
