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
}
exports.ContractError = ContractError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvQ29udHJhY3RFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLGFBQWE7SUFRdEIsWUFBYSxhQUFxQixFQUFFLElBQVksRUFBRSxJQUFXLEVBQUUsT0FBZSxFQUFFLE1BQWM7UUFDMUYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUE7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztDQUNKO0FBZkQsc0NBZUMifQ==