"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DappSonar = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const Contract_1 = require("./Contract");
class DappSonar extends providers_1.Web3Provider {
    constructor(_provider, network) {
        super(_provider, network);
        this.on('error', (message) => {
            console.log('Error Provider', message);
        });
        this.on('message', (message) => {
            console.log('Message', message);
        });
        super.listAccounts().then(a => {
            this.actualAddres = a[0];
        });
    }
    async sendTransaction(signedTransaction) {
        return super.sendTransaction(signedTransaction);
    }
    async getBalance(address) {
        let balance = ethers_1.BigNumber.from(0);
        try {
            balance = await super.getBalance(address);
            console.log('Balance of', this.actualAddres, ' is ', balance.toString());
        }
        catch (error) {
            console.log('Error on getBlance');
        }
        return balance;
    }
    static Contract(addressOrName, contractInterface, signerOrProvider) {
        return new Contract_1.Contract(addressOrName, contractInterface, signerOrProvider);
    }
}
exports.DappSonar = DappSonar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFwcFNvbmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RhcHBTb25hci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3REFBdUk7QUFDdkksbUNBQTJDO0FBQzNDLHlDQUFzQztBQU90QyxNQUFhLFNBQVUsU0FBUSx3QkFBWTtJQUd6QyxZQUFZLFNBQThDLEVBQUUsT0FBb0I7UUFDOUUsS0FBSyxDQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO1lBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDeEMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQXdCLEVBQUUsRUFBRTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBSUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxpQkFBMkM7UUFDL0QsT0FBTyxLQUFLLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDakQsQ0FBQztJQUNELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZTtRQUM5QixJQUFJLE9BQU8sR0FBYyxrQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQyxJQUFJO1lBRUYsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtTQUN6RTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1NBQ2xDO1FBRUQsT0FBTyxPQUFPLENBQUE7SUFFaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBcUIsRUFBRSxpQkFBeUQsRUFBRSxnQkFBb0M7UUFFcEksT0FBTyxJQUFJLG1CQUFRLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFDekUsQ0FBQztDQUNGO0FBM0NELDhCQTJDQyJ9