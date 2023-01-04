"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderError = void 0;
const eip_1 = require("./eip");
class ProviderError {
    constructor(message, code, address) {
        this.message = message;
        this.code = code;
        this.address = address;
        this.eip = (0, eip_1.findEipError)(code);
    }
}
exports.ProviderError = ProviderError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FcnJvcnMvUHJvdmlkZXJFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBOEM7QUFFOUMsTUFBYSxhQUFhO0lBT3RCLFlBQWEsT0FBZSxFQUFFLElBQVMsRUFBRSxPQUFlO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBQSxrQkFBWSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2pDLENBQUM7Q0FDSjtBQWJELHNDQWFDIn0=