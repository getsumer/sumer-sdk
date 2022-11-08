import axios from "axios";

export class Api {
    private headers: any;
    //private url:string = 'http://127.0.0.1:3000'
    private url:string = 'https://api.getsumer.com'
    constructor(key: string, chainId: number) {
        this.headers = {
            Authorization: `${key}`,
            chainId: `${chainId}`,
        }
    }

    sendContractError(body:any){
        return axios.post(this.url+'/contract_errors', body, {headers: this.headers})
    }

    sendTxHash(txHash:string, body:any){

        return axios.post(`${this.url}/tx/${txHash}`, body, {headers: this.headers})
    }
    sendProviderError(body:any){

        return axios.post(`${this.url}/exception`, body, {headers: this.headers})
    }

}