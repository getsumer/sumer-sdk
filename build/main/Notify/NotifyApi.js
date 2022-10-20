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
        const data = {
            id,
            chainId: message.chainId,
            txHash: message.response.hash,
            functionName: message.key,
            functionArgs: message.args,
            metadata: this.meta()
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0RBQTJCO0FBRzNCLCtCQUEwQjtBQUUxQixNQUFhLFNBQVM7SUFFbEIsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBWTtRQUNmLE1BQU8sRUFBRSxHQUFHLElBQUEsU0FBRSxHQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFckMsTUFBTSxJQUFJLEdBQUc7WUFDVCxFQUFFO1lBQ0YsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUk7WUFDN0IsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ3pCLFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQVk7UUFDdEIsTUFBTyxFQUFFLEdBQUcsSUFBQSxTQUFFLEdBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUUzQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sSUFBSSxHQUFHO1lBQ1QsRUFBRTtZQUNGLFdBQVcsRUFBRSxPQUFPLENBQUMsT0FBTztZQUM1QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3hCLENBQUE7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBa0I7UUFDM0IsTUFBTyxFQUFFLEdBQUcsSUFBQSxTQUFFLEdBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUUzQixNQUFNLEdBQUcsR0FBRztZQUNSLEVBQUU7WUFDRixXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDeEIsZUFBZSxFQUFFLEdBQUcsQ0FBQyxlQUFlO1lBQ3BDLFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUN0QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDaEIseURBQXlEO1FBQ3pELHVCQUF1QjtJQUMzQixDQUFDO0lBRU8sSUFBSTs7UUFDUixJQUFJLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFNBQVMsMENBQUUsU0FBUyxFQUFFO1lBQzlCLE9BQU8sZ0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUNsRDtRQUVELE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztDQUNKO0FBNURELDhCQTREQyJ9