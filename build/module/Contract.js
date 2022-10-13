import { ethers, Signer } from 'ethers';
import { ContractError } from './Errors/ContractError';
import { NotifyBuilder } from './Notify/Notify';
export class Contract {
    baseContract;
    apiKey;
    constructor(addressOrName, contractInterface, signerOrProvider, apiKey) {
        this.baseContract = new ethers.Contract(addressOrName, contractInterface, signerOrProvider);
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
                }
                catch (error) {
                    if (!error.DappSonar) {
                        let address;
                        if (Signer.isSigner(signerOrProvider)) {
                            address = await signerOrProvider.getAddress();
                        }
                        const contracError = new ContractError(addressOrName, key, args, address, error.reason);
                        NotifyBuilder.build(this.apiKey).error(contracError);
                        error.DappSonar = true;
                    }
                    throw error;
                }
                return response;
            };
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFnQixNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFL0MsTUFBTSxPQUFPLFFBQVE7SUFDVixZQUFZLENBQWM7SUFDeEIsTUFBTSxDQUFTO0lBQ3hCLFlBQ0ksYUFBcUIsRUFBRSxpQkFBeUQsRUFDaEYsZ0JBQW9DLEVBQUUsTUFBYztRQUNwRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtRQUMzRixhQUFhO1FBQ2IsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEUsSUFBSSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUE7UUFDbEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxJQUFTLEVBQWdCLEVBQUU7Z0JBQzdDLElBQUksUUFBYSxDQUFBO2dCQUNqQixJQUFJO29CQUNBLGFBQWE7b0JBQ2IsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO29CQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFBO2lCQUM5QztnQkFBQyxPQUFPLEtBQVUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7d0JBQ2xCLElBQUksT0FBZSxDQUFBO3dCQUNuQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTs0QkFDbkMsT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUE7eUJBQ2hEO3dCQUNELE1BQU0sWUFBWSxHQUFHLElBQUksYUFBYSxDQUNsQyxhQUFhLEVBQ2IsR0FBRyxFQUNILElBQUksRUFDSixPQUFPLEVBQ1AsS0FBSyxDQUFDLE1BQU0sQ0FDZixDQUFBO3dCQUNELGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTt3QkFDcEQsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7cUJBQ3pCO29CQUNELE1BQU0sS0FBSyxDQUFBO2lCQUNkO2dCQUNELE9BQU8sUUFBUSxDQUFBO1lBQ25CLENBQUMsQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUVKIn0=