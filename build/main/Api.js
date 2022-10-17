"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor(key, chainId) {
        this.url = 'http://127.0.0.1:3000';
        this.headers = {
            Authorization: `${key}`,
            chainId: `${chainId}`,
        };
        console.log({ headers: this.headers });
    }
    send(body) {
        return axios_1.default.post(this.url + '/exception', body, { headers: this.headers });
    }
    sendTxHash(txHash, body) {
        return axios_1.default.post(`${this.url}/tx/${txHash}`, body, { headers: this.headers });
    }
    sendProviderError(body) {
        return axios_1.default.post(`${this.url}/exception`, body, { headers: this.headers });
    }
}
exports.Api = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFFMUIsTUFBYSxHQUFHO0lBR1osWUFBWSxHQUFXLEVBQUUsT0FBZTtRQURoQyxRQUFHLEdBQVUsdUJBQXVCLENBQUE7UUFFeEMsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUN2QixPQUFPLEVBQUUsR0FBRyxPQUFPLEVBQUU7U0FDeEIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFRO1FBQ1QsT0FBTyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUMzRSxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWEsRUFBRSxJQUFRO1FBQzlCLE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBRWhGLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxJQUFRO1FBQ3RCLE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDN0UsQ0FBQztDQUVKO0FBdkJELGtCQXVCQyJ9