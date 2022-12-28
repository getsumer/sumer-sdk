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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5TG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlMb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsTUFBYSxTQUFTO0lBRWxCLE1BQU0sQ0FBQyxPQUFzQjtRQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQXNCO1FBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFrQztRQUM1QyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBRUo7QUFsQkQsOEJBa0JDIn0=