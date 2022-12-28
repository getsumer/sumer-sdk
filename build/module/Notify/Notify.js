import { Api } from '../Api';
import { NotifyApi } from './NotifyApi';
import { NotifyLog } from './NotifyLog';
import { NotifyVoid } from './NotifyVoid';
export class NotifyBuilder {
    static build(apikey, chainId, _env) {
        const env = _env ?? process.env.NODE_ENV;
        if (env === 'test') {
            return new NotifyVoid();
        }
        if (undefined === apikey) {
            return new NotifyLog();
        }
        const api = new Api(apikey, chainId);
        return new NotifyApi(api);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUc1QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQWN6QyxNQUFNLE9BQU8sYUFBYTtJQUd0QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWUsRUFBRSxPQUFnQixFQUFFLElBQWE7UUFFekQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBRXhDLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtZQUVoQixPQUFPLElBQUksVUFBVSxFQUFFLENBQUE7U0FDMUI7UUFFRCxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7WUFFdEIsT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFBO1NBQ3pCO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRXBDLE9BQU8sSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0IsQ0FBQztDQUNKIn0=