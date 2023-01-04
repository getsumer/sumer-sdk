"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const ethers_1 = require("ethers");
const ContractError_1 = require("./Errors/ContractError");
const Notify_1 = require("./Notify/Notify");
/**
 * The Contract class is a wrapper of the ethersjs Contract class. It sends
 * notifications (errors or tx data to the sumer api), when a contract function is called.
 */
class Contract {
    constructor(addressOrName, contractInterface, signerOrProvider, apiKey, chainId) {
        this.apiKey = apiKey;
        this.chainId = chainId;
        // create the base contract
        this.baseContract = new ethers_1.ethers.Contract(addressOrName, contractInterface, signerOrProvider);
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
                    Notify_1.NotifyBuilder.build(this.apiKey, this.chainId).txHash(payload);
                }
                catch (error) {
                    if (!error.DappSonar) {
                        let address;
                        if (ethers_1.Signer.isSigner(signerOrProvider)) {
                            address = await signerOrProvider.getAddress();
                        }
                        const contracError = new ContractError_1.ContractError(addressOrName, key, args, address, error.reason);
                        // send error info
                        Notify_1.NotifyBuilder.build(this.apiKey, this.chainId).contractError(contracError);
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
exports.Contract = Contract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsbUNBQXVHO0FBQ3ZHLDBEQUFzRDtBQUN0RCw0Q0FBK0M7QUFHL0M7OztHQUdHO0FBQ0gsTUFBYSxRQUFRO0lBZ0JqQixZQUNJLGFBQXFCLEVBQUUsaUJBQXlELEVBQ2hGLGdCQUFvQyxFQUFFLE1BQWUsRUFBRSxPQUFnQjtRQUV2RSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUV0QiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLENBQUE7UUFFM0YsK0RBQStEO1FBQy9ELE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWxFLGtHQUFrRztRQUNsRyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQVMsRUFBZ0IsRUFBRTtnQkFDN0MsSUFBSSxRQUFRLENBQUE7Z0JBQ1osSUFBSTtvQkFDQSxrQ0FBa0M7b0JBQ2xDLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtvQkFFaEQsTUFBTSxPQUFPLEdBQVc7d0JBQ3BCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt3QkFDckIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFjO3dCQUMvQixZQUFZLEVBQUUsR0FBYTt3QkFDM0IsSUFBSSxFQUFFLElBQUk7cUJBQ2IsQ0FBQTtvQkFDRCw0QkFBNEI7b0JBQzVCLHNCQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFFakU7Z0JBQUMsT0FBTyxLQUFVLEVBQUU7b0JBRWpCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO3dCQUNsQixJQUFJLE9BQWUsQ0FBQTt3QkFFbkIsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7NEJBQ25DLE9BQU8sR0FBRyxNQUFNLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFBO3lCQUNoRDt3QkFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLDZCQUFhLENBQ2xDLGFBQWEsRUFDYixHQUFHLEVBQ0gsSUFBSSxFQUNKLE9BQU8sRUFDUCxLQUFLLENBQUMsTUFBTSxDQUNmLENBQUE7d0JBRUQsa0JBQWtCO3dCQUNsQixzQkFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUE7d0JBQzFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO3FCQUN6QjtvQkFDRCxNQUFNLEtBQUssQ0FBQTtpQkFDZDtnQkFDRCxPQUFPLFFBQVEsQ0FBQTtZQUNuQixDQUFDLENBQUE7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUVGLCtCQUErQjtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUE7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFBO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUE7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUE7UUFDaEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQTtRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFBO1FBQ3hELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFBO0lBQ2hFLENBQUM7Q0FFSjtBQXBGRCw0QkFvRkMifQ==