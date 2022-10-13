"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DappSonar = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const Contract_1 = require("./Contract");
const ProviderError_1 = require("./Errors/ProviderError");
const Notify_1 = require("./Notify/Notify");
class DappSonar extends providers_1.Web3Provider {
    constructor(_provider, key, network) {
        super(_provider, network);
        //@ts-ignore
        this.chainId = _provider.networkVersion;
        super.listAccounts().then((a) => {
            this.actualAddres = a[0];
        });
        console.log("chain ID:", this.chainId);
        this.apikey = key;
        this.instance = this;
    }
    static getInstance() {
        return DappSonar.instance;
    }
    static Contract(addressOrName, contractInterface, signerOrProvider, apikey) {
        return new Contract_1.Contract(addressOrName, contractInterface, signerOrProvider, apikey, this.chainId);
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
                Notify_1.NotifyBuilder.build(this.apikey, this.chainId).error(providerError);
                error.DappSonar = true;
            }
            throw error;
        }
    }
}
exports.DappSonar = DappSonar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3REFBc0k7QUFDdEksbUNBQWtEO0FBQ2xELHlDQUFxQztBQUNyQywwREFBc0Q7QUFDdEQsNENBQStDO0FBRS9DLE1BQWEsU0FBVSxTQUFRLHdCQUFZO0lBTXpDLFlBQVksU0FBOEMsRUFBRSxHQUFZLEVBQUUsT0FBb0I7UUFFNUYsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN6QixZQUFZO1FBRVosSUFBSSxDQUFDLE9BQU8sR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFBO1FBQ3JDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUV2QixDQUFDO0lBQ00sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFHTSxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQXFCLEVBQUUsaUJBQXlELEVBQUUsZ0JBQW9DLEVBQUUsTUFBZTtRQUM1SixPQUFPLElBQUksbUJBQVEsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBMkM7UUFDdEUsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBRS9ELE9BQU8sUUFBUSxDQUFBO1NBQ2hCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQTtnQkFDNUIsSUFBSTtvQkFDRixJQUFJLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQTtpQkFDMUU7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUE7aUJBQ3pCO2dCQUVELE1BQU0sYUFBYSxHQUFHLElBQUksNkJBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ3hFLHNCQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUUsQ0FBQTtnQkFDbkUsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7YUFDdkI7WUFDRCxNQUFNLEtBQUssQ0FBQTtTQUNaO0lBQ0gsQ0FBQztDQUVGO0FBcERELDhCQW9EQyJ9