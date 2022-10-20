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
            chainId: message.chainId,
            txHash: message.txHash,
            functionName: message.key,
            functionArgs: message.args,
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
            contractAddress: msg.contractAddress,
            functionName: msg.name,
            args: msg.args,
            message: msg.reason,
            metadata: this.meta()
        };
        console.log(log);
        //***prepare endpoint for contract intearctions errors ??
        //this.client.send(log)
    }
    meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent);
        }
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBRzNCLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxPQUFPLFNBQVM7SUFDVixNQUFNLENBQUs7SUFDbkIsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBWTtRQUNmLE1BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRXJDLE1BQU0sSUFBSSxHQUFHO1lBQ1QsRUFBRTtZQUNGLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ3pCLFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQVk7UUFDdEIsTUFBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN4QyxNQUFNLElBQUksR0FBRztZQUNULEVBQUU7WUFDRixXQUFXLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDNUIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQWtCO1FBQzNCLE1BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTNCLE1BQU0sR0FBRyxHQUFHO1lBQ1IsRUFBRTtZQUNGLFdBQVcsRUFBRSxHQUFHLENBQUMsT0FBTztZQUN4QixlQUFlLEVBQUUsR0FBRyxDQUFDLGVBQWU7WUFDcEMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNoQix5REFBeUQ7UUFDekQsdUJBQXVCO0lBQzNCLENBQUM7SUFFTyxJQUFJO1FBQ1IsSUFBSSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRTtZQUM5QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUNsRDtRQUVELE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztDQUNKIn0=