import { Api } from '../Api';
import { NotifyApi } from './NotifyApi';
import { NotifyLog } from './NotifyLog';
import { NotifyVoid } from './NotifyVoid';
export class NotifyBuilder {
    static build(apikey, chainId, _env) {
        const env = _env ?? process.env.NODE_ENV;
        console.log('apiKey', apikey);
        console.log('builder chainId', chainId);
        if (env === 'test') {
            return new NotifyVoid;
        }
        if (undefined === apikey) {
            return new NotifyLog();
        }
        const api = new Api(apikey, chainId);
        return new NotifyApi(api);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUc1QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQVN6QyxNQUFNLE9BQU8sYUFBYTtJQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWUsRUFBRSxPQUFnQixFQUFFLElBQWE7UUFDekQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFdkMsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxVQUFVLENBQUE7U0FDeEI7UUFDRCxJQUFJLFNBQVMsS0FBSSxNQUFNLEVBQUU7WUFDckIsT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFBO1NBQ3pCO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUUsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BDLE9BQU8sSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0IsQ0FBQztDQUNKIn0=