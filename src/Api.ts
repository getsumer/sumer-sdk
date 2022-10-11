import axios from "axios";

export class Api {
    static _instance: Api;
    private headers: any;
    private url:string = 'https://127.0.0.1:3001'
    constructor(key: string) {
        if (Api._instance) {
            return Api._instance
        }
        Api._instance = this;
        this.headers = {
            Authorization: `Bearer ${key}`
        }
        console.log(this.headers)
    }

    send(body:any){
        return axios.post(this.url, body, this.headers)
    }

}