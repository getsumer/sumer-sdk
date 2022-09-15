"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderError = void 0;
const BaseError_1 = require("./BaseError");
const eip_1 = require("./eip");
class ProviderError extends BaseError_1.BaseError {
    constructor(message, code, address) {
        super(message, code);
        this.address = address;
        this.eip = (0, eip_1.findEipError)(code);
    }
    toString() {
        if (this.eip) {
            return `[${this.code}] ${this.eip.description}`;
        }
        return `[${this.code}] ${this.message}`;
    }
}
exports.ProviderError = ProviderError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvUHJvdmlkZXJFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBdUM7QUFDdkMsK0JBQThDO0FBRTlDLE1BQWEsYUFBYyxTQUFRLHFCQUFTO0lBR3hDLFlBQWEsT0FBZSxFQUFFLElBQVMsRUFBRSxPQUFnQjtRQUNyRCxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBQSxrQkFBWSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRWpDLENBQUM7SUFDTSxRQUFRO1FBQ1gsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtTQUNsRDtRQUNELE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMzQyxDQUFDO0NBQ0o7QUFmRCxzQ0FlQyJ9