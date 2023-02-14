"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const ethers_1 = require("ethers");
class Contract {
    constructor(addressOrName, contractInterface, signerOrProvider) {
        this.baseContract = new ethers_1.BaseContract(addressOrName, contractInterface, signerOrProvider);
        //@ts-ignore
        const functionsNames = contractInterface.map((ci) => ci.name);
        functionsNames.forEach((key) => {
            this[key] = async (...args) => {
                console.log('Function called ', key, 'args', args);
                let response;
                try {
                    //@ts-ignore
                    response = await this.baseContract[key](...args);
                    console.log('Response', response);
                }
                catch (error) {
                    if (!error.DappSonar) {
                        console.error('Error on ', key, ' function', error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsbUNBQThDO0FBRTlDLE1BQWEsUUFBUTtJQUVqQixZQUFZLGFBQXFCLEVBQUUsaUJBQXlELEVBQUUsZ0JBQW9DO1FBQzlILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxxQkFBWSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hGLFlBQVk7UUFDWixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQVMsRUFBZ0IsRUFBRTtnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNsRCxJQUFJLFFBQVEsQ0FBQTtnQkFDWixJQUFJO29CQUNBLFlBQVk7b0JBQ1osUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO29CQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQTtpQkFDcEM7Z0JBQUMsT0FBTyxLQUFVLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO3dCQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFBO3dCQUNuRCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtxQkFDekI7b0JBQ0QsTUFBTSxLQUFLLENBQUE7aUJBQ2Q7Z0JBQ0QsT0FBTyxRQUFRLENBQUE7WUFDbkIsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUo7QUEzQkQsNEJBMkJDIn0=