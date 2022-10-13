import axios from "axios";

export class Api {
    //static _instance: Api;
    private headers: any;
    private url:string = 'http://127.0.0.1:3000'
    constructor(key: string) {
        // if (Api._instance) {
        //     return Api._instance
        // }
      //  Api._instance = this;
        this.headers = {
            Authorization: `Bearer ${key}`
        }
        console.log({headers: this.headers})
    }

    send(body:any){
        return axios.post(this.url, body, {headers: this.headers})
    }

    sendTxHash(txHash:string, body:any){
        //const route = '/tx'
        return axios.post(`${this.url}/tx/${txHash}`, body, {headers: this.headers})

    }
    sendProviderError(body:any){
        const route = '/exception'
        return axios.post(this.url+route, body, {headers: this.headers})     
    }

}