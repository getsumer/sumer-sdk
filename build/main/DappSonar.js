"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DappSonar = void 0;
const providers_1 = require("@ethersproject/providers");
const Contract_1 = require("./Contract");
const Notify_1 = require("./Notify");
const ProviderError_1 = require("./Errors/ProviderError");
class DappSonar extends providers_1.Web3Provider {
    constructor(_provider, network) {
        super(_provider, network);
        super.listAccounts().then(a => {
            this.actualAddres = a[0];
        });
    }
    static Contract(addressOrName, contractInterface, signerOrProvider) {
        return new Contract_1.Contract(addressOrName, contractInterface, signerOrProvider);
    }
    async sendTransaction(signedTransaction) {
        try {
            const response = await super.sendTransaction(signedTransaction);
            return response;
        }
        catch (error) {
            if (!error.DappSonar) {
                const providerError = new ProviderError_1.ProviderError(error.message, error.code, this.actualAddres);
                Notify_1.Notify.error(providerError);
                error.DappSonar = true;
            }
            throw error;
        }
    }
}
exports.DappSonar = DappSonar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3REFBdUk7QUFFdkkseUNBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQywwREFBdUQ7QUFHdkQsTUFBYSxTQUFVLFNBQVEsd0JBQVk7SUFHekMsWUFBWSxTQUE4QyxFQUFFLE9BQW9CO1FBQzlFLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHRCxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQXFCLEVBQUUsaUJBQXlELEVBQUUsZ0JBQW9DO1FBQ3BJLE9BQU8sSUFBSSxtQkFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLGlCQUEyQztRQUMvRCxJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7WUFFL0QsT0FBTyxRQUFRLENBQUE7U0FDaEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO2dCQUNwQixNQUFNLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDckYsZUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDM0IsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7YUFDdkI7WUFDRCxNQUFNLEtBQUssQ0FBQTtTQUNaO0lBQ0gsQ0FBQztDQUlGO0FBaENELDhCQWdDQyJ9