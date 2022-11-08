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
}
exports.Api = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFFMUIsTUFBYSxHQUFHO0lBSVosWUFBWSxHQUFXLEVBQUUsT0FBZTtRQUZ4Qyw4Q0FBOEM7UUFDdEMsUUFBRyxHQUFVLDBCQUEwQixDQUFBO1FBRTNDLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxhQUFhLEVBQUUsR0FBRyxHQUFHLEVBQUU7WUFDdkIsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFO1NBQ3hCLENBQUE7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBUTtRQUN0QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDakYsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFhLEVBQUUsSUFBUTtRQUU5QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUNoRixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsSUFBUTtRQUV0QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBQzdFLENBQUM7Q0FFSjtBQXhCRCxrQkF3QkMifQ==