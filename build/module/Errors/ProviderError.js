import { BaseError } from './BaseError';
import { findEipError } from './eip';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvUHJvdmlkZXJFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3ZDLE9BQU8sRUFBWSxZQUFZLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFFOUMsTUFBTSxPQUFPLGFBQWMsU0FBUSxTQUFTO0lBQ2pDLE9BQU8sQ0FBUTtJQUNmLEdBQUcsQ0FBVTtJQUNwQixZQUFhLE9BQWUsRUFBRSxJQUFTLEVBQUUsT0FBZ0I7UUFDckQsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUVqQyxDQUFDO0lBQ00sUUFBUTtRQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNWLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUE7U0FDbEQ7UUFDRCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDM0MsQ0FBQztDQUNKIn0=