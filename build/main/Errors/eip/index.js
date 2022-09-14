"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEipError = exports.eipErrors = void 0;
const _1193_1 = require("./1193");
const _1474_1 = require("./1474");
exports.eipErrors = [
    ..._1193_1.ProviderErrorsEip1193,
    ..._1474_1.RPCErrorsEip1474
];
const findEipError = (eipCode) => {
    return exports.eipErrors.find((e) => e.statusCode === eipCode);
};
exports.findEipError = findEipError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvRXJyb3JzL2VpcC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBOEM7QUFDOUMsa0NBQXlDO0FBUzVCLFFBQUEsU0FBUyxHQUFHO0lBQ3JCLEdBQUcsNkJBQXFCO0lBQ3hCLEdBQUcsd0JBQWdCO0NBQ3RCLENBQUE7QUFFTSxNQUFNLFlBQVksR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFO0lBQzVDLE9BQU8saUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssT0FBTyxDQUFDLENBQUE7QUFDcEUsQ0FBQyxDQUFBO0FBRlksUUFBQSxZQUFZLGdCQUV4QiJ9