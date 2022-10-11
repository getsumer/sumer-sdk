import { Api } from '../Api';
import { DappSonar } from '../DappSonar';
import { NotifyApi } from './NotifyApi';
import { NotifyLog } from './NotifyLog';
import { NotifyVoid } from './NotifyVoid';
export class NotifyBuilder {
    static build(_env) {
        const env = _env ?? process.env.NODE_ENV;
        console.log('env', env);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUM1QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBR3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBTXpDLE1BQU0sT0FBTyxhQUFhO0lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBYTtRQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUE7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDdkIsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO1lBQ2hCLE9BQU8sVUFBVSxDQUFBO1NBQ3BCO1FBQ0QsSUFBSSxHQUFHLEtBQUssWUFBWSxFQUFFO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNyQyxPQUFPLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLFNBQVMsRUFBRSxDQUFBO0lBQzFCLENBQUM7Q0FDSiJ9