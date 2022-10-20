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
            txHash: message.txHash,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0RBQTJCO0FBRzNCLCtCQUEwQjtBQUUxQixNQUFhLFNBQVM7SUFFbEIsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBWTtRQUNmLE1BQU8sRUFBRSxHQUFHLElBQUEsU0FBRSxHQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFckMsTUFBTSxJQUFJLEdBQUc7WUFDVCxFQUFFO1lBQ0YsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDekIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3hCLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBWTtRQUN0QixNQUFPLEVBQUUsR0FBRyxJQUFBLFNBQUUsR0FBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDeEMsTUFBTSxJQUFJLEdBQUc7WUFDVCxFQUFFO1lBQ0YsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQzVCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEIsQ0FBQTtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFrQjtRQUMzQixNQUFPLEVBQUUsR0FBRyxJQUFBLFNBQUUsR0FBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTNCLE1BQU0sR0FBRyxHQUFHO1lBQ1IsRUFBRTtZQUNGLFdBQVcsRUFBRSxHQUFHLENBQUMsT0FBTztZQUN4QixlQUFlLEVBQUUsR0FBRyxDQUFDLGVBQWU7WUFDcEMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNoQix5REFBeUQ7UUFDekQsdUJBQXVCO0lBQzNCLENBQUM7SUFFTyxJQUFJOztRQUNSLElBQUksTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsU0FBUywwQ0FBRSxTQUFTLEVBQUU7WUFDOUIsT0FBTyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ2xEO1FBRUQsT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0NBQ0o7QUE1REQsOEJBNERDIn0=