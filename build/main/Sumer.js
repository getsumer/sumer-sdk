"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sumer = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const Contract_1 = require("./Contract");
const ProviderError_1 = require("./Errors/ProviderError");
const Notify_1 = require("./Notify/Notify");
/**
 * Sumer is a Provider that extends ethers Web3Provider. Sumer can track the errors
 * that may occur during the interaction with a contract or the provider.
 */
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
    // use the sumer contract to catch the errors
    static Contract(addressOrName, contractInterface, signerOrProvider, apikey, chainId) {
        return new Contract_1.Contract(addressOrName, contractInterface, signerOrProvider, apikey, chainId);
    }
    // wrap sendTransaction to catch errors
    async sendTransaction(signedTransaction) {
        try {
            const response = await super.sendTransaction(signedTransaction);
            // maybe send tx data also here 
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
                // notify the error to the sumer server
                const providerError = new ProviderError_1.ProviderError(error.message, error.code, from);
                Notify_1.NotifyBuilder.build(this.apikey, this.chainId).providerError(providerError);
                error.DappSonar = true;
            }
            throw error;
        }
    }
}
exports.Sumer = Sumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU3VtZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esd0RBQXNJO0FBQ3RJLG1DQUFrRDtBQUNsRCx5Q0FBcUM7QUFDckMsMERBQXNEO0FBQ3RELDRDQUErQztBQUcvQzs7O0dBR0c7QUFDSCxNQUFhLEtBQU0sU0FBUSx3QkFBWTtJQVNyQyxZQUFZLFNBQThDLEVBQUUsR0FBWSxFQUFFLE9BQW9CO1FBRTVGLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFMbkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQU16QixhQUFhO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFBO1FBRXZDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtZQUM3QixzQkFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO1NBQ25EO1FBRUQsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFdkIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUN4QixDQUFDO0lBRUQsNkNBQTZDO0lBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBcUIsRUFBRSxpQkFBeUQsRUFBRSxnQkFBb0MsRUFBRSxNQUFlLEVBQUUsT0FBZ0I7UUFDOUssT0FBTyxJQUFJLG1CQUFRLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMxRixDQUFDO0lBRUQsdUNBQXVDO0lBQ2hDLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQTJDO1FBQ3RFLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUMvRCxnQ0FBZ0M7WUFDaEMsT0FBTyxRQUFRLENBQUE7U0FDaEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO2dCQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2dCQUM1QixJQUFJO29CQUNGLElBQUksR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGlCQUE4QixDQUFDLENBQUMsSUFBSSxDQUFBO2lCQUMxRTtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQTtpQkFDekI7Z0JBRUQsdUNBQXVDO2dCQUN2QyxNQUFNLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN4RSxzQkFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzNFLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO2FBQ3ZCO1lBQ0QsTUFBTSxLQUFLLENBQUE7U0FDWjtJQUNILENBQUM7Q0FFRjtBQTdERCxzQkE2REMifQ==