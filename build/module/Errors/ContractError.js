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
    toString() {
        return `Error on Contract ${this.contractAddress} function "${this.name}" with args "${this.args.toString()}. Reason: ${this.reason} "`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvQ29udHJhY3RFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sYUFBYTtJQUN0QixlQUFlLENBQVE7SUFDdkIsSUFBSSxDQUFRO0lBQ1osT0FBTyxDQUFRO0lBQ2YsSUFBSSxDQUFZO0lBQ2hCLE1BQU0sQ0FBUTtJQUVkLFlBQVksYUFBcUIsRUFBRSxJQUFZLEVBQUUsSUFBZ0IsRUFBRSxPQUFlLEVBQUMsTUFBYTtRQUM1RixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQTtRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8scUJBQXFCLElBQUksQ0FBQyxlQUFlLGNBQWMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGFBQWEsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFBO0lBQzNJLENBQUM7Q0FDSiJ9