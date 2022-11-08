export declare class Api {
    private headers;
    private url;
    constructor(key: string, chainId: number);
    sendContractError(body: any): Promise<import("axios").AxiosResponse<any, any>>;
    sendTxHash(txHash: string, body: any): Promise<import("axios").AxiosResponse<any, any>>;
    sendProviderError(body: any): Promise<import("axios").AxiosResponse<any, any>>;
}
