"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyLog = void 0;
class NotifyLog {
    txHash(message) {
        console.error("txHash Log:", message);
    }
    providerError(message) {
        console.error("providerError Log:", message);
    }
    contractError(msg) {
        console.error("error log: ", msg);
    }
    setStatus() {
        console.error("checkProvider Log:");
    }
}
exports.NotifyLog = NotifyLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsTUFBYSxTQUFTO0lBRWxCLE1BQU0sQ0FBQyxPQUFlO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3pDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBc0I7UUFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQWtCO1FBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FFSjtBQWxCRCw4QkFrQkMifQ==