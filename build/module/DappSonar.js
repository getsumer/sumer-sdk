import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { Contract } from './Contract';
import { ProviderError } from './Errors/ProviderError';
import { NotifyBuilder } from './Notify/Notify';
export class DappSonar extends Web3Provider {
    static apikey;
    actualAddres;
    constructor(_provider, key, network) {
        super(_provider, network);
        super.listAccounts().then((a) => {
            this.actualAddres = a[0];
        });
        this.apikey = key;
    }
    static Contract(addressOrName, contractInterface, signerOrProvider) {
        return new Contract(addressOrName, contractInterface, signerOrProvider);
    }
    async sendTransaction(signedTransaction) {
        try {
            const response = await super.sendTransaction(signedTransaction);
            return response;
        }
        catch (error) {
            if (!error.DappSonar) {
                let from = this.actualAddres;
                try {
                    from = ethers.utils.parseTransaction(signedTransaction).from;
                }
                catch (error) {
                    from = this.actualAddres;
                }
                const providerError = new ProviderError(error.message, error.code, from);
                NotifyBuilder.build().error(providerError);
                error.DappSonar = true;
            }
            throw error;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQWlGLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBQ3RJLE9BQU8sRUFBYSxNQUFNLEVBQVUsTUFBTSxRQUFRLENBQUE7QUFDbEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRS9DLE1BQU0sT0FBTyxTQUFVLFNBQVEsWUFBWTtJQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFTO0lBRWYsWUFBWSxDQUFvQjtJQUV2QyxZQUFZLFNBQThDLEVBQUUsR0FBWSxFQUFFLE9BQW9CO1FBQzVGLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFekIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7SUFDbkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBcUIsRUFBRSxpQkFBeUQsRUFBRSxnQkFBb0M7UUFDM0ksT0FBTyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBMkM7UUFDdEUsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBRS9ELE9BQU8sUUFBUSxDQUFBO1NBQ2hCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQTtnQkFDNUIsSUFBSTtvQkFDRixJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQTtpQkFDMUU7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUE7aUJBQ3pCO2dCQUVELE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDeEUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDMUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7YUFDdkI7WUFDRCxNQUFNLEtBQUssQ0FBQTtTQUNaO0lBQ0gsQ0FBQztDQUVGIn0=