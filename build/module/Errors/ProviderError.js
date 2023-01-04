import { findEipError } from './eip';
export class ProviderError {
    message;
    code;
    address;
    eip;
    constructor(message, code, address) {
        this.message = message;
        this.code = code;
        this.address = address;
        this.eip = findEipError(code);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvUHJvdmlkZXJFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVksWUFBWSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBRTlDLE1BQU0sT0FBTyxhQUFhO0lBRWYsT0FBTyxDQUFRO0lBQ2YsSUFBSSxDQUFRO0lBQ1osT0FBTyxDQUFRO0lBQ2YsR0FBRyxDQUFVO0lBRXBCLFlBQWEsT0FBZSxFQUFFLElBQVMsRUFBRSxPQUFlO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2pDLENBQUM7Q0FDSiJ9