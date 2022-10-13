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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFFMUIsTUFBYSxHQUFHO0lBSVosWUFBWSxHQUFXO1FBRGYsUUFBRyxHQUFVLHVCQUF1QixDQUFBO1FBRXhDLHVCQUF1QjtRQUN2QiwyQkFBMkI7UUFDM0IsSUFBSTtRQUNOLHlCQUF5QjtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFFLFVBQVUsR0FBRyxFQUFFO1NBQ2pDLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVE7UUFDVCxPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYSxFQUFFLElBQVE7UUFDOUIscUJBQXFCO1FBQ3JCLE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVyRSxDQUFDO0lBQ0QsaUJBQWlCLENBQUMsSUFBUTtRQUN0QixNQUFNLEtBQUssR0FBRyxZQUFZLENBQUE7UUFDMUIsT0FBTyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekQsQ0FBQztDQUVKO0FBN0JELGtCQTZCQyJ9