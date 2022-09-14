"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractError = void 0;
class ContractError {
    constructor(addressOrName, name, args, address, reason) {
        this.args = args;
        this.name = name;
        this.address = address;
        this.contractAddress = addressOrName;
        this.reason = reason;
    }
    toString() {
        return `Error on Contract ${this.contractAddress} function "${this.name}" with args "${this.args.toString()}. Reason: ${this.reason} "`;
    }
}
exports.ContractError = ContractError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvQ29udHJhY3RFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLGFBQWE7SUFPdEIsWUFBWSxhQUFxQixFQUFFLElBQVksRUFBRSxJQUFnQixFQUFFLE9BQWUsRUFBQyxNQUFhO1FBQzVGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFBO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxxQkFBcUIsSUFBSSxDQUFDLGVBQWUsY0FBYyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUE7SUFDM0ksQ0FBQztDQUNKO0FBbEJELHNDQWtCQyJ9