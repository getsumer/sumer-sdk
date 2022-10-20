import axios from "axios";
export class Api {
    headers;
    //private url:string = 'http://127.0.0.1:3000'
    url = 'http://sumer-env.eba-p6jdgm9w.us-east-1.elasticbeanstalk.com';
    constructor(key, chainId) {
        this.headers = {
            Authorization: `${key}`,
            chainId: `${chainId}`,
        };
        console.log({ headers: this.headers });
    }
    send(body) {
        return axios.post(this.url + '/TOBEDONE', body, { headers: this.headers });
    }
    sendTxHash(txHash, body) {
        console.log("seinding tx data :", body);
        return axios.post(`${this.url}/tx/${txHash}`, body, { headers: this.headers });
    }
    sendProviderError(body) {
        console.log("seinding error data :", body);
        return axios.post(`${this.url}/exception`, body, { headers: this.headers });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUc7SUFDSixPQUFPLENBQU07SUFDckIsOENBQThDO0lBQ3RDLEdBQUcsR0FBVSw4REFBOEQsQ0FBQTtJQUNuRixZQUFZLEdBQVcsRUFBRSxPQUFlO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxhQUFhLEVBQUUsR0FBRyxHQUFHLEVBQUU7WUFDdkIsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFO1NBQ3hCLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBUTtRQUNULE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFhLEVBQUUsSUFBUTtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBRWhGLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxJQUFRO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDMUMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0NBRUoifQ==