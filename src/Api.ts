import axios from "axios";

export class Api {
    private headers: any;
    private url:string = 'http://127.0.0.1:3000'
    constructor(key: string, chainId: number) {
        this.headers = {
            Authorization: `${key}`,
            chainId: `${chainId}`,
        }
        console.log({headers: this.headers})
    }

    send(body:any){
        return axios.post(this.url, body, {headers: this.headers})
    }

    sendTxHash(txHash:string, body:any){
        return axios.post(`${this.url}/tx/${txHash}`, body, {headers: this.headers})

    }
    sendProviderError(body:any){
        return axios.post(`${this.url}/tx/exception`, body, {headers: this.headers})     
    }

}