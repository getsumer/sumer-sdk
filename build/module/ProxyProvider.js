import { ProviderError } from './Errors/ProviderError';
import { NotifyBuilder } from './Notify/Notify';
/**
 * applyProxy is called when a function of the wrapped provider object is called, and
 * sends error notifications to the sumer api
*/
export const applyProxy = async (target, thisArg, argumentsList, address, apikey, chainId) => {
    try {
        // call the target function
        const res = await Reflect.apply(target, thisArg, argumentsList);
        return res;
    }
    catch (error) {
        if (!error.DappSonar) {
            if (address === undefined && argumentsList[0]?.params[0]?.from) {
                address = argumentsList[0]?.params[0]?.from;
            }
            // prepare error payload
            let providerError = new ProviderError(error.message, error.code, address);
            if (error.body && JSON.parse(error.body).error?.code) {
                providerError = new ProviderError(JSON.parse(error.body).error.message, JSON.parse(error.body).error.code, address);
            }
            // send payload with provider error
            NotifyBuilder.build(apikey, chainId).providerError(providerError);
            error.DappSonar = true;
        }
        throw error;
    }
};
/**
 * ProxyProvider class wraps the provider object and adds error notifications
 */
export class ProxyProvider {
    constructor(_provider, apikey) {
        const chainId = _provider.networkVersion;
        // prepare proxy handler for the called function of the provider object
        const handler = {
            get(target, prop, _receiver) {
                const response = target[prop];
                if (typeof target[prop] === 'function') {
                    return new Proxy(response, {
                        apply: async (_target, thisArg, argumentsList) => applyProxy(_target, thisArg, argumentsList, _provider.selectedAddress, apikey, chainId)
                    });
                }
                return response;
            },
            apply: async (target, thisArg, argumentsList) => {
                return applyProxy(target, thisArg, argumentsList, _provider.selectedAddress, apikey, chainId);
            }
        };
        return new Proxy(_provider, handler);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHaEQ7OztFQUdFO0FBQ0YsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxNQUFXLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsT0FBZSxFQUFFLE1BQWUsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDbEksSUFBSTtRQUNBLDJCQUEyQjtRQUMzQixNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUMvRCxPQUFPLEdBQUcsQ0FBQTtLQUViO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFFakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFFbEIsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFO2dCQUM1RCxPQUFPLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUE7YUFDOUM7WUFFRCx3QkFBd0I7WUFDeEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3pFLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUNsRCxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQ3RIO1lBQ0QsbUNBQW1DO1lBQ25DLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNqRSxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtTQUN6QjtRQUNELE1BQU0sS0FBSyxDQUFBO0tBQ2Q7QUFDTCxDQUFDLENBQUE7QUFHRDs7R0FFRztBQUNILE1BQU0sT0FBTyxhQUFhO0lBRXRCLFlBQVksU0FBb0QsRUFBRSxNQUFlO1FBRTdFLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUE7UUFFeEMsdUVBQXVFO1FBQ3ZFLE1BQU0sT0FBTyxHQUFHO1lBQ1osR0FBRyxDQUFDLE1BQVcsRUFBRSxJQUFTLEVBQUUsU0FBYztnQkFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM3QixJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtvQkFFcEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7d0JBQ3ZCLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBWSxFQUFFLE9BQVksRUFBRSxhQUFrQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQ3ZFLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztxQkFDbkYsQ0FBQyxDQUFBO2lCQUNMO2dCQUNELE9BQU8sUUFBUSxDQUFBO1lBRW5CLENBQUM7WUFDRCxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxFQUFFO2dCQUUzRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUNqRyxDQUFDO1NBQ0osQ0FBQTtRQUNELE9BQU8sSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Q0FFSiJ9