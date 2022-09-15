"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DappSonar_1 = require("../DappSonar");
const NotifyApi_1 = require("../Notify/NotifyApi");
const NotifyLog_1 = require("../Notify/NotifyLog");
const NotifyVoid_1 = require("../Notify/NotifyVoid");
const simple_di_1 = __importDefault(require("simple-di"));
simple_di_1.default.register('Notify', () => {
    if (process.env.NODE_ENV === 'test') {
        return new NotifyVoid_1.NotifyVoid();
    }
    if (process.env.NODE_ENV === 'production') {
        return new NotifyApi_1.NotifyApi(simple_di_1.default.get('Api'));
    }
    return new NotifyLog_1.NotifyLog();
});
simple_di_1.default.register('Api', () => new Api(DappSonar_1.DappSonar.apikey));
exports.default = simple_di_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUHJvdmlkZXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXlDO0FBRXpDLG1EQUFnRDtBQUNoRCxtREFBZ0Q7QUFDaEQscURBQWtEO0FBQ2xELDBEQUFrQztBQUdsQyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBVyxFQUFFO0lBQ3RDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQ2pDLE9BQU8sSUFBSSx1QkFBVSxFQUFFLENBQUE7S0FDMUI7SUFDRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtRQUN2QyxPQUFPLElBQUkscUJBQVMsQ0FBQyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0tBQzdDO0lBQ0QsT0FBTyxJQUFJLHFCQUFTLEVBQUUsQ0FBQTtBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILG1CQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFRLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFFaEUsa0JBQWUsbUJBQVMsQ0FBQSJ9