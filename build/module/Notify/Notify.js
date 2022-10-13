import { Api } from '../Api';
import { NotifyApi } from './NotifyApi';
import { NotifyLog } from './NotifyLog';
import { NotifyVoid } from './NotifyVoid';
export class NotifyBuilder {
    static build(apikey, _env) {
        const env = _env ?? process.env.NODE_ENV;
        console.log('apiKey', apikey);
        if (env === 'test') {
            return new NotifyVoid;
        }
        if (undefined === apikey) {
            return new NotifyLog();
        }
        const api = new Api(apikey);
        return new NotifyApi(api);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUc1QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQVV6QyxNQUFNLE9BQU8sYUFBYTtJQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWMsRUFBQyxJQUFhO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQTtRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUM3QixJQUFJLEdBQUcsS0FBSyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxJQUFJLFVBQVUsQ0FBQTtTQUN4QjtRQUNELElBQUksU0FBUyxLQUFJLE1BQU0sRUFBRTtZQUNyQixPQUFPLElBQUksU0FBUyxFQUFFLENBQUE7U0FDekI7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBRSxNQUFNLENBQUMsQ0FBQTtRQUM1QixPQUFPLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDSiJ9