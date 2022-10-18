import bowser from 'bowser';
import { v4 } from 'uuid';
export class NotifyApi {
    client;
    constructor(client) {
        this.client = client;
    }
    txHash(message) {
        const id = v4().toString();
        console.log("tx hash data ", message);
        const data = {
            id,
            ...message,
            metadata: this.meta()
        };
        this.client.sendTxHash(data.txHash, data);
    }
    providerError(message) {
        const id = v4().toString();
        console.log("provider error: ", message);
        const data = {
            id,
            userAddress: message.address,
            code: message.code,
            message: message.message,
            metadata: this.meta()
        };
        this.client.sendProviderError(data);
    }
    error(msg) {
        const id = v4().toString();
        const log = {
            id,
            userAddress: msg.address,
            message: msg.toString(),
            //timestamp: Date.now(),
            //wallet: msg.address,
            metadata: this.meta()
        };
        this.client.send(log);
    }
    meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent);
        }
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBSTNCLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxPQUFPLFNBQVM7SUFDVixNQUFNLENBQUs7SUFDbkIsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBWTtRQUNmLE1BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE1BQU0sSUFBSSxHQUFHO1lBQ1QsRUFBRTtZQUNGLEdBQUcsT0FBTztZQUNWLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3hCLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBWTtRQUN0QixNQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUUzQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sSUFBSSxHQUFHO1lBQ1QsRUFBRTtZQUNGLFdBQVcsRUFBRSxPQUFPLENBQUMsT0FBTztZQUM1QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3hCLENBQUE7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFDTSxLQUFLLENBQUMsR0FBa0M7UUFDM0MsTUFBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFM0IsTUFBTSxHQUFHLEdBQUc7WUFDUixFQUFFO1lBQ0YsV0FBVyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1lBQ3hCLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLHdCQUF3QjtZQUN4QixzQkFBc0I7WUFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEIsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFTyxJQUFJO1FBQ1IsSUFBSSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRTtZQUM5QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUNsRDtRQUVELE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztDQUNKIn0=