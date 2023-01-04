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
        const data = {
            id: (0, uuid_1.v4)(),
            chainId: message.chainId,
            txHash: message.txHash,
            functionName: message.functionName,
            functionArgs: message.args,
            metadata: this.meta()
        };
        this.client.sendTxHash(data.txHash, data);
    }
    providerError(message) {
        const data = {
            id: (0, uuid_1.v4)(),
            userAddress: message.address,
            code: message.code,
            message: message.message,
            metadata: this.meta()
        };
        this.client.sendProviderError(data);
    }
    contractError(msg) {
        const data = {
            id: (0, uuid_1.v4)(),
            userAddress: msg.address,
            contractAddress: msg.contractAddress,
            functionName: msg.name,
            args: msg.args,
            message: msg.reason,
            metadata: this.meta()
        };
        this.client.sendContractError(data);
    }
    setStatus() {
        this.client.sendSetStatus();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0RBQTJCO0FBRzNCLCtCQUEwQjtBQUkxQixNQUFhLFNBQVM7SUFJbEIsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBZTtRQUVsQixNQUFNLElBQUksR0FBRztZQUNULEVBQUUsRUFBRSxJQUFBLFNBQUUsR0FBRTtZQUNSLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQXNCO1FBRWhDLE1BQU0sSUFBSSxHQUFHO1lBQ1QsRUFBRSxFQUFFLElBQUEsU0FBRSxHQUFFO1lBQ1IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQzVCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEIsQ0FBQTtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFrQjtRQUU1QixNQUFNLElBQUksR0FBRztZQUNULEVBQUUsRUFBRSxJQUFBLFNBQUUsR0FBRTtZQUNSLFdBQVcsRUFBRSxHQUFHLENBQUMsT0FBTztZQUN4QixlQUFlLEVBQUUsR0FBRyxDQUFDLGVBQWU7WUFDcEMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDL0IsQ0FBQztJQUVPLElBQUk7O1FBQ1IsSUFBSSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxTQUFTLDBDQUFFLFNBQVMsRUFBRTtZQUM5QixPQUFPLGdCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDbEQ7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7Q0FDSjtBQTNERCw4QkEyREMifQ==