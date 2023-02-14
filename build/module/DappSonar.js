import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { Contract } from "./Contract";
export class DappSonar extends Web3Provider {
    actualAddres;
    constructor(_provider, network) {
        super(_provider, network);
        this.on('error', (message) => {
            console.log('Error Provider', message);
        });
        this.on('message', (message) => {
            console.log('Message', message);
        });
        super.listAccounts().then(a => {
            this.actualAddres = a[0];
        });
    }
    async sendTransaction(signedTransaction) {
        return super.sendTransaction(signedTransaction);
    }
    async getBalance(address) {
        let balance = BigNumber.from(0);
        try {
            balance = await super.getBalance(address);
            console.log('Balance of', this.actualAddres, ' is ', balance.toString());
        }
        catch (error) {
            console.log('Error on getBlance');
        }
        return balance;
    }
    static Contract(addressOrName, contractInterface, signerOrProvider) {
        return new Contract(addressOrName, contractInterface, signerOrProvider);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQWlGLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZJLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxRQUFRLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQU90QyxNQUFNLE9BQU8sU0FBVSxTQUFRLFlBQVk7SUFDekMsWUFBWSxDQUFvQjtJQUVoQyxZQUFZLFNBQThDLEVBQUUsT0FBb0I7UUFDOUUsS0FBSyxDQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO1lBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDeEMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQXdCLEVBQUUsRUFBRTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBSUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBMkM7UUFDL0QsT0FBTyxLQUFLLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDakQsQ0FBQztJQUNELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZTtRQUM5QixJQUFJLE9BQU8sR0FBYyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFDLElBQUk7WUFFRixPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1NBQ3pFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUE7U0FDbEM7UUFFRCxPQUFPLE9BQU8sQ0FBQTtJQUVoQixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFxQixFQUFFLGlCQUF5RCxFQUFFLGdCQUFvQztRQUVwSSxPQUFPLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7Q0FDRiJ9