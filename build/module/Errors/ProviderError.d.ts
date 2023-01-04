import { EipError } from './eip';
export declare class ProviderError {
    message: string;
    code: number;
    address: string;
    eip: EipError;
    constructor(message: string, code: any, address: string);
}
