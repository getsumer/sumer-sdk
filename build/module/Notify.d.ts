import { ContractError } from "./Errors/ContractError";
import { ProviderError } from "./Errors/ProviderError";
export declare class Notify {
    private static meta;
    static error(msg: ContractError | ProviderError): void;
}
