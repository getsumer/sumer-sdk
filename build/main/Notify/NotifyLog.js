"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyLog = void 0;
const bowser_1 = __importDefault(require("bowser"));
class NotifyLog {
    txHash(message) {
        console.log(message);
    }
    providerError(message) {
        console.log(message);
    }
    error(msg) {
        const log = {
            message: msg.toString(),
            timestamp: Date.now(),
            wallet: msg.address,
            meta: this.meta()
        };
        console.error(log);
    }
    meta() {
        var _a;
        if ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) {
            return bowser_1.default.parse(window.navigator.userAgent);
        }
        return {};
    }
}
exports.NotifyLog = NotifyLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0RBQTJCO0FBSzNCLE1BQWEsU0FBUztJQUVsQixNQUFNLENBQUMsT0FBc0I7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQXNCO1FBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFrQztRQUMzQyxNQUFNLEdBQUcsR0FBRztZQUNSLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTztZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUNwQixDQUFBO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUV0QixDQUFDO0lBRU8sSUFBSTs7UUFDUixJQUFJLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFNBQVMsMENBQUUsU0FBUyxFQUFFO1lBQzlCLE9BQU8sZ0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUNsRDtRQUVELE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztDQUNKO0FBNUJELDhCQTRCQyJ9