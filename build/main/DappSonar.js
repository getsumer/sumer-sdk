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
exports.DappSonar = DappSonar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3REFBc0k7QUFDdEksbUNBQWtEO0FBQ2xELHlDQUFxQztBQUNyQywwREFBc0Q7QUFDdEQsNENBQStDO0FBRS9DLE1BQWEsU0FBVSxTQUFRLHdCQUFZO0lBTXpDLFlBQVksU0FBOEMsRUFBRSxHQUFZLEVBQUUsT0FBb0I7UUFFNUYsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN6QixZQUFZO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFBO1FBRXJDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBRXZCLENBQUM7SUFDTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUdNLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBcUIsRUFBRSxpQkFBeUQsRUFBRSxnQkFBb0MsRUFBRSxNQUFlLEVBQUUsT0FBZTtRQUM3SyxPQUFPLElBQUksbUJBQVEsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3pGLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBZSxDQUFDLGlCQUEyQztRQUN0RSxJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7WUFDL0QsT0FBTyxRQUFRLENBQUE7U0FDaEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO2dCQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2dCQUM1QixJQUFJO29CQUNGLElBQUksR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGlCQUE4QixDQUFDLENBQUMsSUFBSSxDQUFBO2lCQUMxRTtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQTtpQkFDekI7Z0JBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDeEUsc0JBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUMxRSxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTthQUN2QjtZQUNELE1BQU0sS0FBSyxDQUFBO1NBQ1o7SUFDSCxDQUFDO0NBRUY7QUFsREQsOEJBa0RDIn0=