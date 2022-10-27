import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { Contract } from './Contract';
import { ProviderError } from './Errors/ProviderError';
import { NotifyBuilder } from './Notify/Notify';
export class DappSonar extends Web3Provider {
    static apikey;
    actualAddres;
    static instance;
    static chainId;
    constructor(_provider, key, network) {
        super(_provider, network);
        //@ts-ignore
        this.chainId = _provider.networkVersion;
        super.listAccounts().then((accounts) => {
            this.actualAddres = accounts[0];
        });
        this.apikey = key;
        this.instance = this;
    }
    static getInstance() {
        return DappSonar.instance;
    }
    static Contract(addressOrName, contractInterface, signerOrProvider, apikey, chainId) {
        return new Contract(addressOrName, contractInterface, signerOrProvider, apikey, chainId);
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
                NotifyBuilder.build(this.apikey, this.chainId).providerError(providerError);
                error.DappSonar = true;
            }
            throw error;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQWlGLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBQ3RJLE9BQU8sRUFBYSxNQUFNLEVBQVUsTUFBTSxRQUFRLENBQUE7QUFDbEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRS9DLE1BQU0sT0FBTyxTQUFVLFNBQVEsWUFBWTtJQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFTO0lBRWYsWUFBWSxDQUFvQjtJQUMvQixNQUFNLENBQUMsUUFBUSxDQUFZO0lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQVE7SUFDdEIsWUFBWSxTQUE4QyxFQUFFLEdBQVksRUFBRSxPQUFvQjtRQUU1RixLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3pCLFlBQVk7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUE7UUFFckMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFdkIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBR00sTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFxQixFQUFFLGlCQUF5RCxFQUFFLGdCQUFvQyxFQUFFLE1BQWUsRUFBRSxPQUFlO1FBQzdLLE9BQU8sSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN6RixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBMkM7UUFDdEUsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBQy9ELE9BQU8sUUFBUSxDQUFBO1NBQ2hCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQTtnQkFDNUIsSUFBSTtvQkFDRixJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQTtpQkFDMUU7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUE7aUJBQ3pCO2dCQUVELE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDeEUsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO2FBQ3ZCO1lBQ0QsTUFBTSxLQUFLLENBQUE7U0FDWjtJQUNILENBQUM7Q0FFRiJ9