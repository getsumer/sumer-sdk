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
        //this.chainId=_provider.networkVersion
        super.getNetwork().then((network) => {
            this.chainId = network.chainId;
        });
        super.listAccounts().then((a) => {
            this.actualAddres = a[0];
        });
        this.apikey = key;
        this.instance = this;
    }
    static getInstance() {
        return DappSonar.instance;
    }
    static Contract(addressOrName, contractInterface, signerOrProvider, apikey) {
        console.log("sending...chain ID:", this.chainId);
        return new Contract(addressOrName, contractInterface, signerOrProvider, apikey, this.chainId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQWlGLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBQ3RJLE9BQU8sRUFBYSxNQUFNLEVBQVUsTUFBTSxRQUFRLENBQUE7QUFDbEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRS9DLE1BQU0sT0FBTyxTQUFVLFNBQVEsWUFBWTtJQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFTO0lBRWYsWUFBWSxDQUFvQjtJQUMvQixNQUFNLENBQUMsUUFBUSxDQUFZO0lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQVE7SUFDdEIsWUFBWSxTQUE4QyxFQUFFLEdBQVksRUFBRSxPQUFvQjtRQUU1RixLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3pCLFlBQVk7UUFFWix1Q0FBdUM7UUFDdkMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtRQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUNGLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBRXZCLENBQUM7SUFDTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUdNLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBcUIsRUFBRSxpQkFBeUQsRUFBRSxnQkFBb0MsRUFBRSxNQUFlO1FBQzVKLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2hELE9BQU8sSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQTJDO1FBQ3RFLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUUvRCxPQUFPLFFBQVEsQ0FBQTtTQUNoQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUE7Z0JBQzVCLElBQUk7b0JBQ0YsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsaUJBQThCLENBQUMsQ0FBQyxJQUFJLENBQUE7aUJBQzFFO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2lCQUN6QjtnQkFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ3hFLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUMxRSxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTthQUN2QjtZQUNELE1BQU0sS0FBSyxDQUFBO1NBQ1o7SUFDSCxDQUFDO0NBRUYifQ==