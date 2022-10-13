import axios from "axios";
export class Api {
    //static _instance: Api;
    headers;
    url = 'http://127.0.0.1:3000';
    constructor(key) {
        // if (Api._instance) {
        //     return Api._instance
        // }
        //  Api._instance = this;
        this.headers = {
            Authorization: `${key}`
        };
        console.log({ headers: this.headers });
    }
    send(body) {
        return axios.post(this.url, body, { headers: this.headers });
    }
    sendTxHash(txHash, body) {
        //const route = '/tx'
        return axios.post(`${this.url}/tx/${txHash}`, body, { headers: this.headers });
    }
    sendProviderError(body) {
        const route = '/exception';
        return axios.post(this.url + route, body, { headers: this.headers });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUc7SUFDWix3QkFBd0I7SUFDaEIsT0FBTyxDQUFNO0lBQ2IsR0FBRyxHQUFVLHVCQUF1QixDQUFBO0lBQzVDLFlBQVksR0FBVztRQUNuQix1QkFBdUI7UUFDdkIsMkJBQTJCO1FBQzNCLElBQUk7UUFDTix5QkFBeUI7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBRSxHQUFHLEdBQUcsRUFBRTtTQUMxQixDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVE7UUFDVCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFhLEVBQUUsSUFBUTtRQUM5QixxQkFBcUI7UUFDckIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFFaEYsQ0FBQztJQUNELGlCQUFpQixDQUFDLElBQVE7UUFDdEIsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFBO1FBQzFCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDcEUsQ0FBQztDQUVKIn0=