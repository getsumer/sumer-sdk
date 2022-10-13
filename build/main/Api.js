"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor(key) {
        this.url = 'http://127.0.0.1:3000';
        // if (Api._instance) {
        //     return Api._instance
        // }
        //  Api._instance = this;
        this.headers = {
            Authorization: `${key}`
        };
        console.log({ headers: this.headers });
    }
    send(body) {
        return axios_1.default.post(this.url, body, { headers: this.headers });
    }
    sendTxHash(txHash, body) {
        //const route = '/tx'
        return axios_1.default.post(`${this.url}/tx/${txHash}`, body, { headers: this.headers });
    }
    sendProviderError(body) {
        const route = '/exception';
        return axios_1.default.post(this.url + route, body, { headers: this.headers });
    }
}
exports.Api = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFFMUIsTUFBYSxHQUFHO0lBSVosWUFBWSxHQUFXO1FBRGYsUUFBRyxHQUFVLHVCQUF1QixDQUFBO1FBRXhDLHVCQUF1QjtRQUN2QiwyQkFBMkI7UUFDM0IsSUFBSTtRQUNOLHlCQUF5QjtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFFLEdBQUcsR0FBRyxFQUFFO1NBQzFCLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBUTtRQUNULE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWEsRUFBRSxJQUFRO1FBQzlCLHFCQUFxQjtRQUNyQixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUVoRixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsSUFBUTtRQUN0QixNQUFNLEtBQUssR0FBRyxZQUFZLENBQUE7UUFDMUIsT0FBTyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0NBRUo7QUE3QkQsa0JBNkJDIn0=