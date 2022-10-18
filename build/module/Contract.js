import { ethers, Signer } from 'ethers';
import { ContractError } from './Errors/ContractError';
import { NotifyBuilder } from './Notify/Notify';
export class Contract {
    baseContract;
    apiKey;
    constructor(addressOrName, contractInterface, signerOrProvider, apiKey, chainId) {
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
                    const payload = {
                        chainId: chainId,
                        txHash: response.hash,
                        functionName: key,
                        functionArgs: args,
                    };
                    console.log(this.apiKey);
                    NotifyBuilder.build(this.apiKey, chainId).txHash(payload);
                }
                catch (error) {
                    if (!error.DappSonar) {
                        let address;
                        if (Signer.isSigner(signerOrProvider)) {
                            address = await signerOrProvider.getAddress();
                        }
                        const contracError = new ContractError(addressOrName, key, args, address, error.reason);
                        console.log("contract error: ", contracError);
                        NotifyBuilder.build(this.apiKey, chainId).error(contracError);
                        error.DappSonar = true;
                    }
                    throw error;
                }
                return response;
            };
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFnQixNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFL0MsTUFBTSxPQUFPLFFBQVE7SUFDVixZQUFZLENBQWM7SUFDekIsTUFBTSxDQUFTO0lBQ3ZCLFlBQ0ksYUFBcUIsRUFBRSxpQkFBeUQsRUFDaEYsZ0JBQW9DLEVBQUUsTUFBZSxFQUFFLE9BQWdCO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQzNGLGFBQWE7UUFDYixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQVMsRUFBZ0IsRUFBRTtnQkFDN0MsSUFBSSxRQUFhLENBQUE7Z0JBQ2pCLElBQUk7b0JBQ0EsYUFBYTtvQkFDYixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7b0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUE7b0JBQzNDLE1BQU0sT0FBTyxHQUFHO3dCQUNaLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUk7d0JBQ3JCLFlBQVksRUFBRSxHQUFHO3dCQUNqQixZQUFZLEVBQUUsSUFBSTtxQkFDckIsQ0FBQTtvQkFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDeEIsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFFNUQ7Z0JBQUMsT0FBTyxLQUFVLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO3dCQUNsQixJQUFJLE9BQWUsQ0FBQTt3QkFDbkIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7NEJBQ25DLE9BQU8sR0FBRyxNQUFNLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFBO3lCQUNoRDt3QkFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLGFBQWEsQ0FDbEMsYUFBYSxFQUNiLEdBQUcsRUFDSCxJQUFJLEVBQ0osT0FBTyxFQUNQLEtBQUssQ0FBQyxNQUFNLENBQ2YsQ0FBQTt3QkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFBO3dCQUM3QyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO3dCQUM3RCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtxQkFDekI7b0JBQ0QsTUFBTSxLQUFLLENBQUE7aUJBQ2Q7Z0JBQ0QsT0FBTyxRQUFRLENBQUE7WUFDbkIsQ0FBQyxDQUFBO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBRUoifQ==