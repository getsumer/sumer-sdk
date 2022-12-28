import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { Contract } from './Contract';
import { ProviderError } from './Errors/ProviderError';
import { NotifyBuilder } from './Notify/Notify';
export class Sumer extends Web3Provider {
    static apikey;
    actualAddres;
    static instance;
    static chainId;
    isProvider = false;
    constructor(_provider, key, network) {
        super(_provider, network);
        // @ts-ignore
        this.chainId = _provider.networkVersion;
        if (!this.isProvider) {
            this.isProvider = !!_provider;
            NotifyBuilder.build(key, this.chainId).setStatus();
        }
        super.listAccounts().then((accounts) => {
            this.actualAddres = accounts[0];
        });
        this.apikey = key;
        this.instance = this;
    }
    static getInstance() {
        return Sumer.instance;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU3VtZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFpRixZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUN0SSxPQUFPLEVBQWEsTUFBTSxFQUFVLE1BQU0sUUFBUSxDQUFBO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUUvQyxNQUFNLE9BQU8sS0FBTSxTQUFRLFlBQVk7SUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBUztJQUVmLFlBQVksQ0FBb0I7SUFDL0IsTUFBTSxDQUFDLFFBQVEsQ0FBUTtJQUMvQixNQUFNLENBQUMsT0FBTyxDQUFRO0lBQ2QsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUUzQixZQUFZLFNBQThDLEVBQUUsR0FBWSxFQUFFLE9BQW9CO1FBRTVGLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDekIsYUFBYTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQTtRQUVyQyxJQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUE7WUFDN0IsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO1NBQ25EO1FBRUQsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFdkIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFxQixFQUFFLGlCQUF5RCxFQUFFLGdCQUFvQyxFQUFFLE1BQWUsRUFBRSxPQUFlO1FBQzdLLE9BQU8sSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN6RixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBMkM7UUFDdEUsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBQy9ELE9BQU8sUUFBUSxDQUFBO1NBQ2hCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQTtnQkFDNUIsSUFBSTtvQkFDRixJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQTtpQkFDMUU7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUE7aUJBQ3pCO2dCQUVELE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDeEUsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO2FBQ3ZCO1lBQ0QsTUFBTSxLQUFLLENBQUE7U0FDWjtJQUNILENBQUM7Q0FFRiJ9