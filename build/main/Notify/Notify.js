"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyBuilder = void 0;
const Api_1 = require("../Api");
const DappSonar_1 = require("../DappSonar");
const NotifyApi_1 = require("./NotifyApi");
const NotifyLog_1 = require("./NotifyLog");
const NotifyVoid_1 = require("./NotifyVoid");
class NotifyBuilder {
    static build(_env) {
        const env = _env !== null && _env !== void 0 ? _env : process.env.NODE_ENV;
        console.log('env', env);
        if (env === 'test') {
            return NotifyVoid_1.NotifyVoid;
        }
        if (env === 'development') {
            return new NotifyLog_1.NotifyLog();
        }
        const api = new Api_1.Api(DappSonar_1.DappSonar.apikey);
        return new NotifyApi_1.NotifyApi(api);
    }
}
exports.NotifyBuilder = NotifyBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQTRCO0FBQzVCLDRDQUF3QztBQUd4QywyQ0FBdUM7QUFDdkMsMkNBQXVDO0FBQ3ZDLDZDQUF5QztBQU16QyxNQUFhLGFBQWE7SUFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFhO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZCLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtZQUNoQixPQUFPLHVCQUFVLENBQUE7U0FDcEI7UUFDRCxJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7WUFDdkIsT0FBTyxJQUFJLHFCQUFTLEVBQUUsQ0FBQTtTQUN6QjtRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxDQUFDLHFCQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDckMsT0FBTyxJQUFJLHFCQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0IsQ0FBQztDQUNKO0FBYkQsc0NBYUMifQ==