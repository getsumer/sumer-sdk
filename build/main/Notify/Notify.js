"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyBuilder = void 0;
const DappSonar_1 = require("../DappSonar");
const NotifyApi_1 = require("./NotifyApi");
const NotifyLog_1 = require("./NotifyLog");
const NotifyVoid_1 = require("./NotifyVoid");
class NotifyBuilder {
    static build(_env) {
        const env = _env !== null && _env !== void 0 ? _env : process.env.NODE_ENV;
        if (env === 'test') {
            return NotifyVoid_1.NotifyVoid;
        }
        if (env === 'production') {
            const api = new Api(DappSonar_1.DappSonar.apikey);
            return new NotifyApi_1.NotifyApi(api);
        }
        return new NotifyLog_1.NotifyLog();
    }
}
exports.NotifyBuilder = NotifyBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQXdDO0FBR3hDLDJDQUF1QztBQUN2QywyQ0FBdUM7QUFDdkMsNkNBQXlDO0FBTXpDLE1BQWEsYUFBYTtJQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQWE7UUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFKLElBQUksY0FBSixJQUFJLEdBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUE7UUFDeEMsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO1lBQ2hCLE9BQU8sdUJBQVUsQ0FBQTtTQUNwQjtRQUNELElBQUksR0FBRyxLQUFLLFlBQVksRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3JDLE9BQU8sSUFBSSxxQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLHFCQUFTLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0NBQ0o7QUFaRCxzQ0FZQyJ9