"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notify = void 0;
const bowser_1 = __importDefault(require("bowser"));
class Notify {
    static meta() {
        var _a;
        if ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) {
            return bowser_1.default.parse(window.navigator.userAgent);
        }
        return {};
    }
    static error(msg) {
        if (process.env.NODE_ENV !== 'test') {
            const log = {
                message: msg.toString(),
                timestamp: Date.now(),
                wallet: msg.address,
                meta: this.meta()
            };
            console.error(log);
        }
    }
}
exports.Notify = Notify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL05vdGlmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxvREFBNEI7QUFDNUIsTUFBYSxNQUFNO0lBRVAsTUFBTSxDQUFDLElBQUk7O1FBQ2YsSUFBSSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxTQUFTLDBDQUFFLFNBQVMsRUFBRTtZQUM5QixPQUFPLGdCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDbEQ7UUFFRCxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQWtDO1FBRTNDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBRWpDLE1BQU0sR0FBRyxHQUFHO2dCQUNSLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPO2dCQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTthQUNwQixDQUFBO1lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNyQjtJQUNMLENBQUM7Q0FDSjtBQXRCRCx3QkFzQkMifQ==