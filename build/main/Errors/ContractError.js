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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvQ29udHJhY3RFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLGFBQWE7SUFPdEIsWUFBYSxhQUFxQixFQUFFLElBQVksRUFBRSxJQUFXLEVBQUUsT0FBZSxFQUFFLE1BQWM7UUFDMUYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUE7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztJQUVNLFFBQVE7UUFDWCxPQUFPLHFCQUFxQixJQUFJLENBQUMsZUFBZSxjQUFjLElBQUksQ0FBQyxJQUFJLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxhQUFhLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQTtJQUMzSSxDQUFDO0NBQ0o7QUFsQkQsc0NBa0JDIn0=