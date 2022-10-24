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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUc7SUFDSixPQUFPLENBQU07SUFDYixHQUFHLEdBQVUsdUJBQXVCLENBQUE7SUFDNUMscUZBQXFGO0lBQ3JGLFlBQVksR0FBVyxFQUFFLE9BQWU7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUN2QixPQUFPLEVBQUUsR0FBRyxPQUFPLEVBQUU7U0FDeEIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFRO1FBQ1QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWEsRUFBRSxJQUFRO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDdkMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFFaEYsQ0FBQztJQUNELGlCQUFpQixDQUFDLElBQVE7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBQzdFLENBQUM7Q0FFSiJ9