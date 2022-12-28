"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sumer = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const Contract_1 = require("./Contract");
const ProviderError_1 = require("./Errors/ProviderError");
const Notify_1 = require("./Notify/Notify");
class Sumer extends providers_1.Web3Provider {
    constructor(_provider, key, network) {
        super(_provider, network);
        this.isProvider = false;
        // @ts-ignore
        this.chainId = _provider.networkVersion;
        if (!this.isProvider) {
            this.isProvider = !!_provider;
            Notify_1.NotifyBuilder.build(key, this.chainId).setStatus();
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
        return new Contract_1.Contract(addressOrName, contractInterface, signerOrProvider, apikey, chainId);
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
                    from = ethers_1.ethers.utils.parseTransaction(signedTransaction).from;
                }
                catch (error) {
                    from = this.actualAddres;
                }
                const providerError = new ProviderError_1.ProviderError(error.message, error.code, from);
                Notify_1.NotifyBuilder.build(this.apikey, this.chainId).providerError(providerError);
                error.DappSonar = true;
            }
            throw error;
        }
    }
}
exports.Sumer = Sumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU3VtZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esd0RBQXNJO0FBQ3RJLG1DQUFrRDtBQUNsRCx5Q0FBcUM7QUFDckMsMERBQXNEO0FBQ3RELDRDQUErQztBQUUvQyxNQUFhLEtBQU0sU0FBUSx3QkFBWTtJQVFyQyxZQUFZLFNBQThDLEVBQUUsR0FBWSxFQUFFLE9BQW9CO1FBRTVGLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFKbkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUt6QixhQUFhO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFBO1FBRXJDLElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtZQUM3QixzQkFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO1NBQ25EO1FBRUQsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFdkIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFxQixFQUFFLGlCQUF5RCxFQUFFLGdCQUFvQyxFQUFFLE1BQWUsRUFBRSxPQUFlO1FBQzdLLE9BQU8sSUFBSSxtQkFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDekYsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQTJDO1FBQ3RFLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUMvRCxPQUFPLFFBQVEsQ0FBQTtTQUNoQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUE7Z0JBQzVCLElBQUk7b0JBQ0YsSUFBSSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsaUJBQThCLENBQUMsQ0FBQyxJQUFJLENBQUE7aUJBQzFFO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2lCQUN6QjtnQkFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN4RSxzQkFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO2FBQ3ZCO1lBQ0QsTUFBTSxLQUFLLENBQUE7U0FDWjtJQUNILENBQUM7Q0FFRjtBQXhERCxzQkF3REMifQ==