import { ethers, Signer } from 'ethers';
import { ContractError } from './Errors/ContractError';
import { NotifyBuilder } from './Notify/Notify';
export class Contract {
    baseContract;
    apiKey;
    chainId;
    address;
    interface;
    functions;
    callStatic;
    estimateGas;
    populateTransaction;
    filters;
    // This will always be an address. This will only differ from
    // address if an ENS name was used in the constructor
    resolvedAddress;
    // This is only set if the contract was created with a call to deploy
    deployTransaction;
    constructor(addressOrName, contractInterface, signerOrProvider, apiKey, chainId) {
        this.apiKey = apiKey;
        this.chainId = chainId;
        this.baseContract = new ethers.Contract(addressOrName, contractInterface, signerOrProvider);
        // @ts-ignore
        const functionsNames = contractInterface.map((ci) => ci.name);
        functionsNames.forEach((key) => {
            this[key] = async (...args) => {
                let response;
                try {
                    // @ts-ignore
                    response = await this.baseContract[key](...args);
                    const payload = {
                        chainId: this.chainId,
                        txHash: response.hash,
                        functionName: key,
                        functionArgs: args,
                    };
                    NotifyBuilder.build(this.apiKey, this.chainId).txHash(payload);
                }
                catch (error) {
                    if (!error.DappSonar) {
                        let address;
                        if (Signer.isSigner(signerOrProvider)) {
                            address = await signerOrProvider.getAddress();
                        }
                        const contracError = new ContractError(addressOrName, key, args, address, error.reason);
                        NotifyBuilder.build(this.apiKey, this.chainId).error(contracError);
                        error.DappSonar = true;
                    }
                    throw error;
                }
                return response;
            };
        });
        this.address = this.baseContract.address;
        this.interface = this.baseContract.interface;
        this.functions = this.baseContract.functions;
        this.callStatic = this.baseContract.callStatic;
        this.estimateGas = this.baseContract.estimateGas;
        this.populateTransaction = this.baseContract.populateTransaction;
        this.filters = this.baseContract.filters;
        this.resolvedAddress = this.baseContract.resolvedAddress;
        this.deployTransaction = this.baseContract.deployTransaction;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUErQixNQUFNLEVBQXFDLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUN2RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRS9DLE1BQU0sT0FBTyxRQUFRO0lBQ1YsWUFBWSxDQUFxQjtJQUNoQyxNQUFNLENBQVM7SUFDZixPQUFPLENBQVM7SUFFZixPQUFPLENBQVM7SUFDaEIsU0FBUyxDQUFhO0lBQ3RCLFNBQVMsQ0FBMEM7SUFDbkQsVUFBVSxDQUEwQztJQUNwRCxXQUFXLENBQXFEO0lBQ2hFLG1CQUFtQixDQUFnRTtJQUNuRixPQUFPLENBQThEO0lBRTlFLDZEQUE2RDtJQUM3RCxxREFBcUQ7SUFDNUMsZUFBZSxDQUFtQjtJQUUzQyxxRUFBcUU7SUFDNUQsaUJBQWlCLENBQXVCO0lBR2pELFlBQ0ksYUFBcUIsRUFBRSxpQkFBeUQsRUFDaEYsZ0JBQW9DLEVBQUUsTUFBZSxFQUFFLE9BQWdCO1FBRXZFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBRXRCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQzNGLGFBQWE7UUFDYixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQVMsRUFBZ0IsRUFBRTtnQkFDN0MsSUFBSSxRQUFhLENBQUE7Z0JBQ2pCLElBQUk7b0JBQ0EsYUFBYTtvQkFDYixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7b0JBQ2hELE1BQU0sT0FBTyxHQUFHO3dCQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt3QkFDckIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJO3dCQUNyQixZQUFZLEVBQUUsR0FBRzt3QkFDakIsWUFBWSxFQUFFLElBQUk7cUJBQ3JCLENBQUE7b0JBRUQsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7aUJBRWpFO2dCQUFDLE9BQU8sS0FBVSxFQUFFO29CQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTt3QkFDbEIsSUFBSSxPQUFlLENBQUE7d0JBQ25CLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFOzRCQUNuQyxPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQTt5QkFDaEQ7d0JBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQ2xDLGFBQWEsRUFDYixHQUFHLEVBQ0gsSUFBSSxFQUNKLE9BQU8sRUFDUCxLQUFLLENBQUMsTUFBTSxDQUNmLENBQUE7d0JBQ0QsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7d0JBQ2xFLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO3FCQUN6QjtvQkFDRCxNQUFNLEtBQUssQ0FBQTtpQkFDZDtnQkFDRCxPQUFPLFFBQVEsQ0FBQTtZQUNuQixDQUFDLENBQUE7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUE7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFBO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUE7UUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQTtRQUNoRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUE7UUFDeEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUE7SUFDaEUsQ0FBQztDQUVKIn0=