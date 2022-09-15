import { BaseError } from './BaseError';
import { EipError } from './eip';
export declare class ProviderError extends BaseError {
    address: string;
    eip: EipError;
    constructor(message: string, code: any, address?: string);
    toString(): string;
}
