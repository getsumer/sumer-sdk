import axios from 'axios';
export class Api {
    headers;
    //private url:string = 'http://127.0.0.1:3000'
    url = 'https://api.getsumer.com';
    constructor(key, chainId) {
        this.headers = {
            Authorization: `${key}`,
            chainId: `${chainId}`,
        };
    }
    sendContractError(body) {
        return axios.post(this.url + '/contract_errors', body, { headers: this.headers });
    }
    sendTxHash(txHash, body) {
        return axios.post(`${this.url}/tx/${txHash}`, body, { headers: this.headers });
    }
    sendProviderError(body) {
        return axios.post(`${this.url}/exception`, body, { headers: this.headers });
    }
    sendSetStatus() {
        return axios.post(`${this.url}/set_status`, { status: 'provider detected' }, { headers: this.headers });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUc7SUFFSixPQUFPLENBQXNCO0lBQ3JDLDhDQUE4QztJQUN0QyxHQUFHLEdBQVcsMEJBQTBCLENBQUE7SUFFaEQsWUFBWSxHQUFXLEVBQUUsT0FBZTtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFFLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxHQUFHLE9BQU8sRUFBRTtTQUN4QixDQUFBO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQVM7UUFDdkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ3JGLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLElBQVM7UUFFaEMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDbEYsQ0FBQztJQUNELGlCQUFpQixDQUFDLElBQVM7UUFFdkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUMvRSxDQUFDO0lBQ0QsYUFBYTtRQUNULE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQzNHLENBQUM7Q0FFSiJ9