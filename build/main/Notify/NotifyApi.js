"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyApi = void 0;
const bowser_1 = __importDefault(require("bowser"));
const uuid_1 = require("uuid");
class NotifyApi {
    constructor(client) {
        this.client = client;
    }
    txHash(message) {
        const id = (0, uuid_1.v4)().toString();
        console.log("tx hash data ", message);
        const data = Object.assign(Object.assign({ id }, message), { metadata: this.meta() });
        this.client.sendTxHash(data.txHash, data);
    }
    providerError(message) {
        const id = (0, uuid_1.v4)().toString();
        console.log("provider error: ", message);
        const data = {
            id,
            userAddress: message.address,
            code: message.code,
            message: message.message,
            metadata: this.meta()
        };
        this.client.sendProviderError(data);
    }
    error(msg) {
        const id = (0, uuid_1.v4)().toString();
        const log = {
            id,
            userAddress: msg.address,
            contractAddress: msg.contractAddress,
            functionName: msg.name,
            args: msg.args,
            message: msg.reason,
            metadata: this.meta()
        };
        console.log(log);
        //***prepare endpoint for contract intearctions errors ??
        //this.client.send(log)
    }
    meta() {
        var _a;
        if ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) {
            return bowser_1.default.parse(window.navigator.userAgent);
        }
        return {};
    }
}
exports.NotifyApi = NotifyApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0RBQTJCO0FBRzNCLCtCQUEwQjtBQUUxQixNQUFhLFNBQVM7SUFFbEIsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBWTtRQUNmLE1BQU8sRUFBRSxHQUFHLElBQUEsU0FBRSxHQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFckMsTUFBTSxJQUFJLGlDQUNOLEVBQUUsSUFDQyxPQUFPLEtBQ1YsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FDeEIsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFZO1FBQ3RCLE1BQU8sRUFBRSxHQUFHLElBQUEsU0FBRSxHQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN4QyxNQUFNLElBQUksR0FBRztZQUNULEVBQUU7WUFDRixXQUFXLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDNUIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQWtCO1FBQzNCLE1BQU8sRUFBRSxHQUFHLElBQUEsU0FBRSxHQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFM0IsTUFBTSxHQUFHLEdBQUc7WUFDUixFQUFFO1lBQ0YsV0FBVyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1lBQ3hCLGVBQWUsRUFBRSxHQUFHLENBQUMsZUFBZTtZQUNwQyxZQUFZLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDdEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3hCLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2hCLHlEQUF5RDtRQUN6RCx1QkFBdUI7SUFDM0IsQ0FBQztJQUVPLElBQUk7O1FBQ1IsSUFBSSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxTQUFTLDBDQUFFLFNBQVMsRUFBRTtZQUM5QixPQUFPLGdCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDbEQ7UUFFRCxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7Q0FDSjtBQXpERCw4QkF5REMifQ==