"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyLog = void 0;
const bowser_1 = __importDefault(require("bowser"));
class NotifyLog {
    txHash(message) {
        console.log("txHash Log:", message);
    }
    providerError(message) {
        console.log("providerError Log:", message);
    }
    error(msg) {
        const log = {
            message: msg.toString(),
            timestamp: Date.now(),
            wallet: msg.address,
            meta: this.meta()
        };
        console.error("error log: ", log);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0RBQTJCO0FBSzNCLE1BQWEsU0FBUztJQUVsQixNQUFNLENBQUMsT0FBc0I7UUFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFzQjtRQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBa0M7UUFDM0MsTUFBTSxHQUFHLEdBQUc7WUFDUixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNyQixNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDcEIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRXJDLENBQUM7SUFFTyxJQUFJOztRQUNSLElBQUksTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsU0FBUywwQ0FBRSxTQUFTLEVBQUU7WUFDOUIsT0FBTyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ2xEO1FBQ0QsT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0NBQ0o7QUE1QkQsOEJBNEJDIn0=