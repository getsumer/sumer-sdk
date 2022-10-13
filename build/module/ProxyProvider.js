import { ProviderError } from './Errors/ProviderError';
import { NotifyBuilder } from './Notify/Notify';
export const applyProxy = async (target, thisArg, argumentsList, address, apikey, chainId) => {
    try {
        const res = await Reflect.apply(target, thisArg, argumentsList);
        return res;
    }
    catch (error) {
        if (!error.DappSonar) {
            if (address === undefined && argumentsList[0]?.params[0]?.from) {
                address = argumentsList[0]?.params[0]?.from;
            }
            let providerError = new ProviderError(error.message, error.code, address);
            if (error.body && JSON.parse(error.body).error?.code) {
                providerError = new ProviderError(JSON.parse(error.body).error.message, JSON.parse(error.body).error.code, address);
            }
            NotifyBuilder.build(apikey, chainId).error(providerError);
            error.DappSonar = true;
        }
        throw error;
    }
};
export class ProxyProvider {
    constructor(_provider, apikey) {
        const chainId = _provider.networkVersion;
        const handler = {
            get(target, prop, _receiver) {
                const response = target[prop];
                if (typeof target[prop] === 'function') {
                    return new Proxy(response, { apply: async (_target, thisArg, argumentsList) => applyProxy(_target, thisArg, argumentsList, _provider.selectedAddress, apikey, chainId) });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxNQUFXLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsT0FBZSxFQUFFLE1BQWUsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDbEksSUFBSTtRQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQy9ELE9BQU8sR0FBRyxDQUFBO0tBQ2I7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUVsQixJQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUU7Z0JBQzVELE9BQU8sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQTthQUM5QztZQUNELElBQUksYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUV6RSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDbEQsYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTthQUN0SDtZQUVELGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUN4RCxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtTQUN6QjtRQUNELE1BQU0sS0FBSyxDQUFBO0tBRWQ7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLE9BQU8sYUFBYTtJQUV0QixZQUFZLFNBQW9ELEVBQUMsTUFBYztRQUMzRSxNQUFNLE9BQU8sR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFBO1FBQ3RDLE1BQU0sT0FBTyxHQUFHO1lBQ1osR0FBRyxDQUFDLE1BQVcsRUFBRSxJQUFTLEVBQUUsU0FBYztnQkFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM3QixJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtvQkFFcEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQVksRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtpQkFDekw7Z0JBQ0QsT0FBTyxRQUFRLENBQUE7WUFFbkIsQ0FBQztZQUNELEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBVyxFQUFFLE9BQVksRUFBRSxhQUFrQixFQUFFLEVBQUU7Z0JBRTNELE9BQU8sVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxlQUFlLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQy9GLENBQUM7U0FDSixDQUFBO1FBQ0QsT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUdKIn0=