"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyBuilder = void 0;
const Api_1 = require("../Api");
const NotifyApi_1 = require("./NotifyApi");
const NotifyLog_1 = require("./NotifyLog");
const NotifyVoid_1 = require("./NotifyVoid");
class NotifyBuilder {
    static build(apikey, chainId, _env) {
        const env = _env !== null && _env !== void 0 ? _env : process.env.NODE_ENV;
        if (env === 'test') {
            return new NotifyVoid_1.NotifyVoid();
        }
        if (undefined === apikey) {
            return new NotifyLog_1.NotifyLog();
        }
        const api = new Api_1.Api(apikey, chainId);
        return new NotifyApi_1.NotifyApi(api);
    }
}
exports.NotifyBuilder = NotifyBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQTRCO0FBRzVCLDJDQUF1QztBQUN2QywyQ0FBdUM7QUFDdkMsNkNBQXlDO0FBY3pDLE1BQWEsYUFBYTtJQUd0QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWUsRUFBRSxPQUFnQixFQUFFLElBQWE7UUFFekQsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFKLElBQUksY0FBSixJQUFJLEdBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUE7UUFFeEMsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO1lBRWhCLE9BQU8sSUFBSSx1QkFBVSxFQUFFLENBQUE7U0FDMUI7UUFFRCxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7WUFFdEIsT0FBTyxJQUFJLHFCQUFTLEVBQUUsQ0FBQTtTQUN6QjtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUVwQyxPQUFPLElBQUkscUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM3QixDQUFDO0NBQ0o7QUFyQkQsc0NBcUJDIn0=