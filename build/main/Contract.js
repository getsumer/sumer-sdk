"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const ethers_1 = require("ethers");
const ContractError_1 = require("./Errors/ContractError");
const Providers_1 = __importDefault(require("./Providers"));
class Contract {
    constructor(addressOrName, contractInterface, signerOrProvider) {
        this.baseContract = new ethers_1.ethers.Contract(addressOrName, contractInterface, signerOrProvider);
        // @ts-ignore
        const functionsNames = contractInterface.map((ci) => ci.name);
        functionsNames.forEach((key) => {
            this[key] = async (...args) => {
                let response;
                try {
                    // @ts-ignore
                    response = await this.baseContract[key](...args);
                }
                catch (error) {
                    if (!error.DappSonar) {
                        let address;
                        if (ethers_1.Signer.isSigner(signerOrProvider)) {
                            address = await signerOrProvider.getAddress();
                        }
                        const contracError = new ContractError_1.ContractError(addressOrName, key, args, address, error.reason);
                        Providers_1.default.get('Notify').error(contracError);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsbUNBQXFEO0FBQ3JELDBEQUFzRDtBQUN0RCw0REFBbUM7QUFFbkMsTUFBYSxRQUFRO0lBRWpCLFlBQ0ksYUFBcUIsRUFBRSxpQkFBeUQsRUFDaEYsZ0JBQW9DO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQzNGLGFBQWE7UUFDYixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVsRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQVMsRUFBZ0IsRUFBRTtnQkFDN0MsSUFBSSxRQUFhLENBQUE7Z0JBQ2pCLElBQUk7b0JBQ0EsYUFBYTtvQkFDYixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7aUJBQ25EO2dCQUFDLE9BQU8sS0FBVSxFQUFFO29CQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTt3QkFDbEIsSUFBSSxPQUFlLENBQUE7d0JBQ25CLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFOzRCQUNuQyxPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQTt5QkFDaEQ7d0JBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSw2QkFBYSxDQUNsQyxhQUFhLEVBQ2IsR0FBRyxFQUNILElBQUksRUFDSixPQUFPLEVBQ1AsS0FBSyxDQUFDLE1BQU0sQ0FDZixDQUFBO3dCQUNELG1CQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTt3QkFDM0MsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7cUJBQ3pCO29CQUNELE1BQU0sS0FBSyxDQUFBO2lCQUNkO2dCQUNELE9BQU8sUUFBUSxDQUFBO1lBQ25CLENBQUMsQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUVKO0FBdENELDRCQXNDQyJ9