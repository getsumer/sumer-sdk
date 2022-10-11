import axios from "axios";
export class Api {
    static _instance;
    headers;
    url = 'https://127.0.0.1:3001';
    constructor(key) {
        if (Api._instance) {
            return Api._instance;
        }
        Api._instance = this;
        this.headers = {
            Authorization: `Bearer ${key}`
        };
        console.log(this.headers);
    }
    send(body) {
        return axios.post(this.url, body, this.headers);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUc7SUFDWixNQUFNLENBQUMsU0FBUyxDQUFNO0lBQ2QsT0FBTyxDQUFNO0lBQ2IsR0FBRyxHQUFVLHdCQUF3QixDQUFBO0lBQzdDLFlBQVksR0FBVztRQUNuQixJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDZixPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUE7U0FDdkI7UUFDRCxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFFLFVBQVUsR0FBRyxFQUFFO1NBQ2pDLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVE7UUFDVCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25ELENBQUM7Q0FFSiJ9