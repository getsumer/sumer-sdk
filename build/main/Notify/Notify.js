"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyBuilder = void 0;
const Api_1 = require("../Api");
const NotifyApi_1 = require("./NotifyApi");
const NotifyLog_1 = require("./NotifyLog");
const NotifyVoid_1 = require("./NotifyVoid");
class NotifyBuilder {
    static build(apikey, _env) {
        const env = _env !== null && _env !== void 0 ? _env : process.env.NODE_ENV;
        console.log('env', apikey);
        if (env === 'test') {
            return NotifyVoid_1.NotifyVoid;
        }
        if (undefined === apikey) {
            return new NotifyLog_1.NotifyLog();
        }
        const api = new Api_1.Api(apikey);
        return new NotifyApi_1.NotifyApi(api);
    }
}
exports.NotifyBuilder = NotifyBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQTRCO0FBRzVCLDJDQUF1QztBQUN2QywyQ0FBdUM7QUFDdkMsNkNBQXlDO0FBTXpDLE1BQWEsYUFBYTtJQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWMsRUFBQyxJQUFhO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzFCLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtZQUNoQixPQUFPLHVCQUFVLENBQUE7U0FDcEI7UUFDRCxJQUFJLFNBQVMsS0FBSSxNQUFNLEVBQUU7WUFDckIsT0FBTyxJQUFJLHFCQUFTLEVBQUUsQ0FBQTtTQUN6QjtRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxDQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzVCLE9BQU8sSUFBSSxxQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDSjtBQWJELHNDQWFDIn0=