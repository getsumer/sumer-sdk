import { DappSonar } from '../DappSonar';
import { NotifyApi } from './NotifyApi';
import { NotifyLog } from './NotifyLog';
import { NotifyVoid } from './NotifyVoid';
export class NotifyBuilder {
    static build(_env) {
        const env = _env ?? process.env.NODE_ENV;
        if (env === 'test') {
            return NotifyVoid;
        }
        if (env === 'production') {
            const api = new Api(DappSonar.apikey);
            return new NotifyApi(api);
        }
        return new NotifyLog();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUd4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQU16QyxNQUFNLE9BQU8sYUFBYTtJQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQWE7UUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQ3hDLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtZQUNoQixPQUFPLFVBQVUsQ0FBQTtTQUNwQjtRQUNELElBQUksR0FBRyxLQUFLLFlBQVksRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDckMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUM1QjtRQUNELE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0NBQ0oifQ==