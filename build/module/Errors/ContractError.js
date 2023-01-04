export class ContractError {
    contractAddress;
    name;
    address;
    args;
    reason;
    constructor(addressOrName, name, args, address, reason) {
        this.args = args;
        this.name = name;
        this.address = address;
        this.contractAddress = addressOrName;
        this.reason = reason;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvQ29udHJhY3RFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sYUFBYTtJQUVmLGVBQWUsQ0FBUTtJQUN2QixJQUFJLENBQVE7SUFDWixPQUFPLENBQVE7SUFDZixJQUFJLENBQU87SUFDWCxNQUFNLENBQVE7SUFFckIsWUFBYSxhQUFxQixFQUFFLElBQVksRUFBRSxJQUFXLEVBQUUsT0FBZSxFQUFFLE1BQWM7UUFDMUYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUE7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztDQUNKIn0=