import axios from "axios";
export class Api {
    headers;
    url = 'http://127.0.0.1:3000';
    //private url:string = 'http://sumer-env.eba-p6jdgm9w.us-east-1.elasticbeanstalk.com'
    constructor(key, chainId) {
        this.headers = {
            Authorization: `${key}`,
            chainId: `${chainId}`,
        };
        console.log({ headers: this.headers });
    }
    send(body) {
        return axios.post(this.url + '/exception', body, { headers: this.headers });
    }
    sendTxHash(txHash, body) {
        return axios.post(`${this.url}/tx/${txHash}`, body, { headers: this.headers });
    }
    sendProviderError(body) {
        return axios.post(`${this.url}/exception`, body, { headers: this.headers });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUc7SUFDSixPQUFPLENBQU07SUFDYixHQUFHLEdBQVUsdUJBQXVCLENBQUE7SUFDNUMscUZBQXFGO0lBQ3JGLFlBQVksR0FBVyxFQUFFLE9BQWU7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUN2QixPQUFPLEVBQUUsR0FBRyxPQUFPLEVBQUU7U0FDeEIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFRO1FBQ1QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUMzRSxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWEsRUFBRSxJQUFRO1FBQzlCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBRWhGLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxJQUFRO1FBQ3RCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDN0UsQ0FBQztDQUVKIn0=