"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const ethers_1 = require("ethers");
const ContractError_1 = require("./Errors/ContractError");
const Notify_1 = require("./Notify/Notify");
class Contract {
    constructor(addressOrName, contractInterface, signerOrProvider, apiKey, chainId) {
        this.baseContract = new ethers_1.ethers.Contract(addressOrName, contractInterface, signerOrProvider);
        // @ts-ignore
        const functionsNames = contractInterface.map((ci) => ci.name);
        this.apiKey = apiKey;
        functionsNames.forEach((key) => {
            this[key] = async (...args) => {
                let response;
                try {
                    // @ts-ignore
                    response = await this.baseContract[key](...args);
                    console.log('contract response ', response);
                    const payload = {
                        chainId: chainId,
                        txHash: response.hash,
                        functionName: key,
                        functionArgs: args,
                    };
                    console.log(this.apiKey);
                    Notify_1.NotifyBuilder.build(this.apiKey, chainId).txHash(payload);
                }
                catch (error) {
                    if (!error.DappSonar) {
                        let address;
                        if (ethers_1.Signer.isSigner(signerOrProvider)) {
                            address = await signerOrProvider.getAddress();
                        }
                        const contracError = new ContractError_1.ContractError(addressOrName, key, args, address, error.reason);
                        console.log("contract error: ", contracError);
                        Notify_1.NotifyBuilder.build(this.apiKey, chainId).error(contracError);
                        error.DappSonar = true;
                    }
                    throw error;
                }
                return response;
            };
        });
    }
}
exports.Contract = Contract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsbUNBQXFEO0FBQ3JELDBEQUFzRDtBQUN0RCw0Q0FBK0M7QUFFL0MsTUFBYSxRQUFRO0lBR2pCLFlBQ0ksYUFBcUIsRUFBRSxpQkFBeUQsRUFDaEYsZ0JBQW9DLEVBQUUsTUFBZSxFQUFFLE9BQWdCO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQzNGLGFBQWE7UUFDYixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQVMsRUFBZ0IsRUFBRTtnQkFDN0MsSUFBSSxRQUFhLENBQUE7Z0JBQ2pCLElBQUk7b0JBQ0EsYUFBYTtvQkFDYixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7b0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUE7b0JBQzNDLE1BQU0sT0FBTyxHQUFHO3dCQUNaLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUk7d0JBQ3JCLFlBQVksRUFBRSxHQUFHO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDckIsQ0FBQTtvQkFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDeEIsc0JBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7aUJBRTVEO2dCQUFDLE9BQU8sS0FBVSxFQUFFO29CQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTt3QkFDbEIsSUFBSSxPQUFlLENBQUE7d0JBQ25CLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFOzRCQUNuQyxPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQTt5QkFDaEQ7d0JBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSw2QkFBYSxDQUNsQyxhQUFhLEVBQ2IsR0FBRyxFQUNILElBQUksRUFDSixPQUFPLEVBQ1AsS0FBSyxDQUFDLE1BQU0sQ0FDZixDQUFBO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUE7d0JBQzdDLHNCQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO3dCQUM3RCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtxQkFDekI7b0JBQ0QsTUFBTSxLQUFLLENBQUE7aUJBQ2Q7Z0JBQ0QsT0FBTyxRQUFRLENBQUE7WUFDbkIsQ0FBQyxDQUFBO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBRUo7QUFuREQsNEJBbURDIn0=