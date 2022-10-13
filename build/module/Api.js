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
            Authorization: `Bearer ${key}`
        };
        console.log(this.headers);
    }
    send(body) {
        return axios.post(this.url, body, this.headers);
    }
    sendTxHash(txHash, body) {
        //const route = '/tx'
        return axios.post(`${this.url}/tx/${txHash}`, body, this.headers);
    }
    sendProviderError(body) {
        const route = '/exception';
        return axios.post(this.url + route, body, this.headers);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUc7SUFDWix3QkFBd0I7SUFDaEIsT0FBTyxDQUFNO0lBQ2IsR0FBRyxHQUFVLHVCQUF1QixDQUFBO0lBQzVDLFlBQVksR0FBVztRQUNuQix1QkFBdUI7UUFDdkIsMkJBQTJCO1FBQzNCLElBQUk7UUFDTix5QkFBeUI7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBRSxVQUFVLEdBQUcsRUFBRTtTQUNqQyxDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFRO1FBQ1QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWEsRUFBRSxJQUFRO1FBQzlCLHFCQUFxQjtRQUNyQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFckUsQ0FBQztJQUNELGlCQUFpQixDQUFDLElBQVE7UUFDdEIsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFBO1FBQzFCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pELENBQUM7Q0FFSiJ9