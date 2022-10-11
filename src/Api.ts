export class Api {
    static _instance: Api;
    private headers: any
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


}