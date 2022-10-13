"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor(key) {
        this.url = 'http://127.0.0.1:3001';
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
        return axios_1.default.post(this.url, body, this.headers);
    }
    sendTxHash(txHash, body) {
        //const route = '/tx'
        return axios_1.default.post(`${this.url}/tx/${txHash}`, body, this.headers);
    }
    sendProviderError(body) {
        const route = '/exception';
        return axios_1.default.post(this.url + route, body, this.headers);
    }
}
exports.Api = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFFMUIsTUFBYSxHQUFHO0lBSVosWUFBWSxHQUFXO1FBRGYsUUFBRyxHQUFVLHVCQUF1QixDQUFBO1FBRXhDLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUNmLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQTtTQUN2QjtRQUNELEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxhQUFhLEVBQUUsVUFBVSxHQUFHLEVBQUU7U0FDakMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBUTtRQUNULE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFhLEVBQUUsSUFBUTtRQUM5QixxQkFBcUI7UUFDckIsT0FBTyxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXJFLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxJQUFRO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQTtRQUMxQixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0NBRUo7QUE3QkQsa0JBNkJDIn0=