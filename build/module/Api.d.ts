export declare class Api {
    static _instance: Api;
    private headers;
    private url;
    constructor(key: string);
    send(body: any): Promise<import("axios").AxiosResponse<any, any>>;
}
