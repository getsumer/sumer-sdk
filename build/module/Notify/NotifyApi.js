import bowser from 'bowser';
import { v4 } from 'uuid';
export class NotifyApi {
    client;
    constructor(client) {
        this.client = client;
    }
    txHash(message) {
        const id = v4().toString();
        const data = {
            id,
            chainId: message.chainId,
            txHash: message.txHash,
            functionName: message.functionName,
            functionArgs: message.args,
            metadata: this.meta()
        };
        this.client.sendTxHash(data.txHash, data);
    }
    providerError(message) {
        const id = v4().toString();
        const data = {
            id,
            userAddress: message.address,
            code: message.code,
            message: message.message,
            metadata: this.meta()
        };
        this.client.sendProviderError(data);
    }
    contractError(msg) {
        const id = v4().toString();
        const data = {
            id,
            userAddress: msg.address,
            contractAddress: msg.contractAddress,
            functionName: msg.name,
            args: msg.args,
            message: msg.reason,
            metadata: this.meta()
        };
        console.log(data);
        this.client.sendContractError(data);
    }
    meta() {
        if (window?.navigator?.userAgent) {
            return bowser.parse(window.navigator.userAgent);
        }
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5QXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL05vdGlmeS9Ob3RpZnlBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBRzNCLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxPQUFPLFNBQVM7SUFDVixNQUFNLENBQUs7SUFFbkIsWUFBWSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBWTtRQUNmLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTFCLE1BQU0sSUFBSSxHQUFHO1lBQ1QsRUFBRTtZQUNGLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN4QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQVk7UUFDdEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFMUIsTUFBTSxJQUFJLEdBQUc7WUFDVCxFQUFFO1lBQ0YsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQzVCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEIsQ0FBQTtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFrQjtRQUM1QixNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUUxQixNQUFNLElBQUksR0FBRztZQUNULEVBQUU7WUFDRixXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDeEIsZUFBZSxFQUFFLEdBQUcsQ0FBQyxlQUFlO1lBQ3BDLFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUN0QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRU8sSUFBSTtRQUNSLElBQUksTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7WUFDOUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDbEQ7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7Q0FDSiJ9