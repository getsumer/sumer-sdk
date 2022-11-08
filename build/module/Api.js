import axios from "axios";
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUc7SUFDSixPQUFPLENBQU07SUFDckIsOENBQThDO0lBQ3RDLEdBQUcsR0FBVSwwQkFBMEIsQ0FBQTtJQUMvQyxZQUFZLEdBQVcsRUFBRSxPQUFlO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxhQUFhLEVBQUUsR0FBRyxHQUFHLEVBQUU7WUFDdkIsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFO1NBQ3hCLENBQUE7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBUTtRQUN0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDakYsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFhLEVBQUUsSUFBUTtRQUU5QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUNoRixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsSUFBUTtRQUV0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBQzdFLENBQUM7Q0FFSiJ9