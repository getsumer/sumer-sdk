import { ProviderError } from './Errors/ProviderError';
import { NotifyBuilder } from './Notify/Notify';
export const applyProxy = async (target, thisArg, argumentsList, address) => {
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
            NotifyBuilder.build().error(providerError);
            error.DappSonar = true;
        }
        throw error;
    }
};
export class ProxyProvider {
    constructor(_provider) {
        const handler = {
            get(target, prop, _receiver) {
                const response = target[prop];
                if (typeof target[prop] === 'function') {
                    return new Proxy(response, { apply: async (_target, thisArg, argumentsList) => applyProxy(_target, thisArg, argumentsList, _provider.selectedAddress) });
                }
                return response;
            },
            apply: async (target, thisArg, argumentsList) => {
                return applyProxy(target, thisArg, argumentsList, _provider.selectedAddress);
            }
        };
        return new Proxy(_provider, handler);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxNQUFXLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDL0YsSUFBSTtRQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQy9ELE9BQU8sR0FBRyxDQUFBO0tBQ2I7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUVsQixJQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUU7Z0JBQzVELE9BQU8sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQTthQUM5QztZQUNELElBQUksYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUV6RSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDbEQsYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTthQUN0SDtZQUVELGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDMUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7U0FDekI7UUFDRCxNQUFNLEtBQUssQ0FBQTtLQUVkO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsTUFBTSxPQUFPLGFBQWE7SUFFdEIsWUFBWSxTQUFvRDtRQUM1RCxNQUFNLE9BQU8sR0FBRztZQUNaLEdBQUcsQ0FBQyxNQUFXLEVBQUUsSUFBUyxFQUFFLFNBQWM7Z0JBQ3RDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDN0IsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBRXBDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFZLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2lCQUMxSztnQkFDRCxPQUFPLFFBQVEsQ0FBQTtZQUVuQixDQUFDO1lBQ0QsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFXLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsRUFBRTtnQkFFM0QsT0FBTyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBQ2hGLENBQUM7U0FDSixDQUFBO1FBQ0QsT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUdKIn0=