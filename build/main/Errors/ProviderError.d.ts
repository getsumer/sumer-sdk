import { BaseError } from "./BaseError";
import { eipError } from "./eip";
export declare class ProviderError extends BaseError {
    address: string;
    eip: eipError;
    constructor(message: string, code: any, address?: string);
    toString(): string;
}
