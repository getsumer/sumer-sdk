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
        console.log('env', DappSonar_1.DappSonar.getInstance().apikey);
        if (env === 'test') {
            return NotifyVoid_1.NotifyVoid;
        }
        if (undefined === DappSonar_1.DappSonar.getInstance().apikey) {
            return new NotifyLog_1.NotifyLog();
        }
        const api = new Api_1.Api(DappSonar_1.DappSonar.getInstance().apikey);
        return new NotifyApi_1.NotifyApi(api);
    }
}
exports.NotifyBuilder = NotifyBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQTRCO0FBQzVCLDRDQUF3QztBQUd4QywyQ0FBdUM7QUFDdkMsMkNBQXVDO0FBQ3ZDLDZDQUF5QztBQU16QyxNQUFhLGFBQWE7SUFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFhO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFHLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkQsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO1lBQ2hCLE9BQU8sdUJBQVUsQ0FBQTtTQUNwQjtRQUNELElBQUksU0FBUyxLQUFLLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQzlDLE9BQU8sSUFBSSxxQkFBUyxFQUFFLENBQUE7U0FDekI7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsQ0FBRSxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3BELE9BQU8sSUFBSSxxQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDSjtBQWJELHNDQWFDIn0=