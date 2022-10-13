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
        return new Contract_1.Contract(addressOrName, contractInterface, signerOrProvider, apikey);
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
                Notify_1.NotifyBuilder.build(this.apikey).error(providerError);
                error.DappSonar = true;
            }
            throw error;
        }
    }
}
exports.DappSonar = DappSonar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3REFBc0k7QUFDdEksbUNBQWtEO0FBQ2xELHlDQUFxQztBQUNyQywwREFBc0Q7QUFDdEQsNENBQStDO0FBRS9DLE1BQWEsU0FBVSxTQUFRLHdCQUFZO0lBTXpDLFlBQVksU0FBOEMsRUFBRSxHQUFZLEVBQUUsT0FBb0I7UUFFNUYsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN6QixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBQ00sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFHTSxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQXFCLEVBQUUsaUJBQXlELEVBQUUsZ0JBQW9DLEVBQUUsTUFBZTtRQUM1SixPQUFPLElBQUksbUJBQVEsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDaEYsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQTJDO1FBQ3RFLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUUvRCxPQUFPLFFBQVEsQ0FBQTtTQUNoQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUE7Z0JBQzVCLElBQUk7b0JBQ0YsSUFBSSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsaUJBQThCLENBQUMsQ0FBQyxJQUFJLENBQUE7aUJBQzFFO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2lCQUN6QjtnQkFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN4RSxzQkFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBRSxDQUFBO2dCQUN0RCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTthQUN2QjtZQUNELE1BQU0sS0FBSyxDQUFBO1NBQ1o7SUFDSCxDQUFDO0NBRUY7QUE5Q0QsOEJBOENDIn0=