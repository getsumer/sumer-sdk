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
        this.chainId = chainId;
        functionsNames.forEach((key) => {
            this[key] = async (...args) => {
                let response;
                try {
                    // @ts-ignore
                    response = await this.baseContract[key](...args);
                    console.log('contract response ', response);
                    const payload = {
                        chainId: this.chainId,
                        txHash: response.hash,
                        functionName: key,
                        functionArgs: args,
                    };
                    console.log(this.apiKey);
                    Notify_1.NotifyBuilder.build(this.apiKey, this.chainId).txHash(payload);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsbUNBQXFEO0FBQ3JELDBEQUFzRDtBQUN0RCw0Q0FBK0M7QUFFL0MsTUFBYSxRQUFRO0lBSWpCLFlBQ0ksYUFBcUIsRUFBRSxpQkFBeUQsRUFDaEYsZ0JBQW9DLEVBQUUsTUFBZSxFQUFFLE9BQWdCO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQzNGLGFBQWE7UUFDYixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQVMsRUFBZ0IsRUFBRTtnQkFDN0MsSUFBSSxRQUFhLENBQUE7Z0JBQ2pCLElBQUk7b0JBQ0EsYUFBYTtvQkFDYixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7b0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUE7b0JBQzNDLE1BQU0sT0FBTyxHQUFHO3dCQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt3QkFDckIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJO3dCQUNyQixZQUFZLEVBQUUsR0FBRzt3QkFDakIsWUFBWSxFQUFFLElBQUk7cUJBQ3JCLENBQUE7b0JBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ3hCLHNCQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFFakU7Z0JBQUMsT0FBTyxLQUFVLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO3dCQUNsQixJQUFJLE9BQWUsQ0FBQTt3QkFDbkIsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7NEJBQ25DLE9BQU8sR0FBRyxNQUFNLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFBO3lCQUNoRDt3QkFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLDZCQUFhLENBQ2xDLGFBQWEsRUFDYixHQUFHLEVBQ0gsSUFBSSxFQUNKLE9BQU8sRUFDUCxLQUFLLENBQUMsTUFBTSxDQUNmLENBQUE7d0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQTt3QkFDN0Msc0JBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7d0JBQzdELEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO3FCQUN6QjtvQkFDRCxNQUFNLEtBQUssQ0FBQTtpQkFDZDtnQkFDRCxPQUFPLFFBQVEsQ0FBQTtZQUNuQixDQUFDLENBQUE7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSjtBQXJERCw0QkFxREMifQ==