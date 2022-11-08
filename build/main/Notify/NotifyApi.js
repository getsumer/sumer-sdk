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
        const data = {
            id,
            chainId: message.chainId,
            txHash: message.txHash,
            functionName: message.functionName,
            functionArgs: message.args,
            metadata: this.meta()
        };
        this.client.sendTxHash(data.txHash, data);
    }
    providerError(message) {
        const id = (0, uuid_1.v4)().toString();
        const data = {
            id,
            userAddress: message.address,
            code: message.code,
            message: message.message,
            metadata: this.meta()
        };
        this.client.sendProviderError(data);
    }
    contractError(msg) {
        const id = (0, uuid_1.v4)().toString();
        const data = {
            id,
            userAddress: msg.address,
            contractAddress: msg.contractAddress,
            functionName: msg.name,
            args: msg.args,
            message: msg.reason,
            metadata: this.meta()
        };
        console.log(data);
        this.client.sendContractError(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0RBQTJCO0FBRzNCLCtCQUEwQjtBQUUxQixNQUFhLFNBQVM7SUFHbEIsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBWTtRQUNmLE1BQU0sRUFBRSxHQUFHLElBQUEsU0FBRSxHQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFMUIsTUFBTSxJQUFJLEdBQUc7WUFDVCxFQUFFO1lBQ0YsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3hCLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBWTtRQUN0QixNQUFNLEVBQUUsR0FBRyxJQUFBLFNBQUUsR0FBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTFCLE1BQU0sSUFBSSxHQUFHO1lBQ1QsRUFBRTtZQUNGLFdBQVcsRUFBRSxPQUFPLENBQUMsT0FBTztZQUM1QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3hCLENBQUE7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBa0I7UUFDNUIsTUFBTSxFQUFFLEdBQUcsSUFBQSxTQUFFLEdBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUUxQixNQUFNLElBQUksR0FBRztZQUNULEVBQUU7WUFDRixXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDeEIsZUFBZSxFQUFFLEdBQUcsQ0FBQyxlQUFlO1lBQ3BDLFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUN0QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRU8sSUFBSTs7UUFDUixJQUFJLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFNBQVMsMENBQUUsU0FBUyxFQUFFO1lBQzlCLE9BQU8sZ0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUNsRDtRQUNELE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztDQUNKO0FBekRELDhCQXlEQyJ9