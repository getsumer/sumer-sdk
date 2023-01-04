import { ethers, Signer } from 'ethers';
import { ContractError } from './Errors/ContractError';
import { NotifyBuilder } from './Notify/Notify';
/**
 * The Contract class is a wrapper of the ethersjs Contract class. It sends
 * notifications (errors or tx data to the sumer api), when a contract function is called.
 */
export class Contract {
    baseContract;
    apiKey;
    chainId;
    //inherited from the baseContract instance
    address;
    interface;
    functions;
    callStatic;
    estimateGas;
    populateTransaction;
    filters;
    resolvedAddress;
    deployTransaction;
    constructor(addressOrName, contractInterface, signerOrProvider, apiKey, chainId) {
        this.apiKey = apiKey;
        this.chainId = chainId;
        // create the base contract
        this.baseContract = new ethers.Contract(addressOrName, contractInterface, signerOrProvider);
        // get the functions names from the provided contract interface
        const functionsNames = contractInterface.map((ci) => ci.name);
        // for each function name, create a new function that will call (wraps) the base contract function
        functionsNames.forEach((key) => {
            this[key] = async (...args) => {
                let response;
                try {
                    // call the base contract function
                    response = await this.baseContract[key](...args);
                    const payload = {
                        chainId: this.chainId,
                        txHash: response.hash,
                        functionName: key,
                        args: args,
                    };
                    // send payload with tx info
                    NotifyBuilder.build(this.apiKey, this.chainId).txHash(payload);
                }
                catch (error) {
                    if (!error.DappSonar) {
                        let address;
                        if (Signer.isSigner(signerOrProvider)) {
                            address = await signerOrProvider.getAddress();
                        }
                        const contracError = new ContractError(addressOrName, key, args, address, error.reason);
                        // send error info
                        NotifyBuilder.build(this.apiKey, this.chainId).contractError(contracError);
                        error.DappSonar = true;
                    }
                    throw error;
                }
                return response;
            };
        });
        // set the inherited properties
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUErQixNQUFNLEVBQXFDLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUN2RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRy9DOzs7R0FHRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBQ1YsWUFBWSxDQUFxQjtJQUNoQyxNQUFNLENBQVM7SUFDZixPQUFPLENBQVM7SUFFeEIsMENBQTBDO0lBQ2pDLE9BQU8sQ0FBUztJQUNoQixTQUFTLENBQWE7SUFDdEIsU0FBUyxDQUF3QztJQUNqRCxVQUFVLENBQXdDO0lBQ2xELFdBQVcsQ0FBbUQ7SUFDOUQsbUJBQW1CLENBQThEO0lBQ2pGLE9BQU8sQ0FBdUQ7SUFDOUQsZUFBZSxDQUFtQjtJQUNsQyxpQkFBaUIsQ0FBdUI7SUFFakQsWUFDSSxhQUFxQixFQUFFLGlCQUF5RCxFQUNoRixnQkFBb0MsRUFBRSxNQUFlLEVBQUUsT0FBZ0I7UUFFdkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFFdEIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBRTNGLCtEQUErRDtRQUMvRCxNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVsRSxrR0FBa0c7UUFDbEcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lB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