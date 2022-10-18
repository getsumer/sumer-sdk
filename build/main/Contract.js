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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsbUNBQXFEO0FBQ3JELDBEQUFzRDtBQUN0RCw0Q0FBK0M7QUFFL0MsTUFBYSxRQUFRO0lBR2pCLFlBQ0ksYUFBcUIsRUFBRSxpQkFBeUQsRUFDaEYsZ0JBQW9DLEVBQUUsTUFBYyxFQUFDLE9BQWU7UUFDcEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLENBQUE7UUFDM0YsYUFBYTtRQUNiLE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2xFLElBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFBO1FBQ2xCLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsSUFBUyxFQUFnQixFQUFFO2dCQUM3QyxJQUFJLFFBQWEsQ0FBQTtnQkFDakIsSUFBSTtvQkFDQSxhQUFhO29CQUNiLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtvQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtvQkFDM0MsTUFBTSxPQUFPLEdBQUc7d0JBQ1osT0FBTyxFQUFFLE9BQU87d0JBQ2hCLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSTt3QkFDckIsWUFBWSxFQUFFLEdBQUc7d0JBQ2pCLFlBQVksRUFBRSxJQUFJO3FCQUNyQixDQUFBO29CQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUN4QixzQkFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFFM0Q7Z0JBQUMsT0FBTyxLQUFVLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO3dCQUNsQixJQUFJLE9BQWUsQ0FBQTt3QkFDbkIsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7NEJBQ25DLE9BQU8sR0FBRyxNQUFNLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFBO3lCQUNoRDt3QkFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLDZCQUFhLENBQ2xDLGFBQWEsRUFDYixHQUFHLEVBQ0gsSUFBSSxFQUNKLE9BQU8sRUFDUCxLQUFLLENBQUMsTUFBTSxDQUNmLENBQUE7d0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQTt3QkFDN0Msc0JBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7d0JBQzVELEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO3FCQUN6QjtvQkFDRCxNQUFNLEtBQUssQ0FBQTtpQkFDZDtnQkFDRCxPQUFPLFFBQVEsQ0FBQTtZQUNuQixDQUFDLENBQUE7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSjtBQW5ERCw0QkFtREMifQ==