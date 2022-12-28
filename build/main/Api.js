"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor(key, chainId) {
        //private url:string = 'http://127.0.0.1:3000'
        this.url = 'https://api.getsumer.com';
        this.headers = {
            Authorization: `${key}`,
            chainId: `${chainId}`,
        };
    }
    sendContractError(body) {
        return axios_1.default.post(this.url + '/contract_errors', body, { headers: this.headers });
    }
    sendTxHash(txHash, body) {
        return axios_1.default.post(`${this.url}/tx/${txHash}`, body, { headers: this.headers });
    }
    sendProviderError(body) {
        return axios_1.default.post(`${this.url}/exception`, body, { headers: this.headers });
    }
    sendSetStatus() {
        return axios_1.default.post(`${this.url}/set_status`, { status: 'provider detected' }, { headers: this.headers });
    }
}
exports.Api = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxrREFBMEI7QUFFMUIsTUFBYSxHQUFHO0lBTVosWUFBWSxHQUFXLEVBQUUsT0FBZTtRQUh4Qyw4Q0FBOEM7UUFDdEMsUUFBRyxHQUFXLDBCQUEwQixDQUFBO1FBRzVDLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxhQUFhLEVBQUUsR0FBRyxHQUFHLEVBQUU7WUFDdkIsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFO1NBQ3hCLENBQUE7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBUztRQUN2QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDckYsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsSUFBUztRQUVoQyxPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUNsRixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsSUFBUztRQUV2QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQy9FLENBQUM7SUFDRCxhQUFhO1FBQ1QsT0FBTyxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDM0csQ0FBQztDQUVKO0FBN0JELGtCQTZCQyJ9