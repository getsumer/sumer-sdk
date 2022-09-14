import { BaseError } from "./BaseError";
import { findEipError } from "./eip";
export class ProviderError extends BaseError {
    address;
    eip;
    constructor(message, code, address) {
        super(message, code);
        this.address = address;
        this.eip = findEipError(code);
    }
    toString() {
        if (this.eip) {
            return `[${this.code}] ${this.eip.description}`;
        }
        return `[${this.code}] ${this.message}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvUHJvdmlkZXJFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBWSxZQUFZLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFL0MsTUFBTSxPQUFPLGFBQWMsU0FBUSxTQUFTO0lBQ3hDLE9BQU8sQ0FBUTtJQUNmLEdBQUcsQ0FBVTtJQUNiLFlBQVksT0FBZSxFQUFFLElBQVMsRUFBRSxPQUFnQjtRQUNwRCxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRWpDLENBQUM7SUFDRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtTQUNsRDtRQUNELE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMzQyxDQUFDO0NBQ0oifQ==