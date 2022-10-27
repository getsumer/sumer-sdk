"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyProvider = exports.applyProxy = void 0;
const ProviderError_1 = require("./Errors/ProviderError");
const Notify_1 = require("./Notify/Notify");
const applyProxy = async (target, thisArg, argumentsList, address, apikey, chainId) => {
    var _a, _b, _c, _d, _e;
    try {
        const res = await Reflect.apply(target, thisArg, argumentsList);
        return res;
    }
    catch (error) {
        if (!error.DappSonar) {
            if (address === undefined && ((_b = (_a = argumentsList[0]) === null || _a === void 0 ? void 0 : _a.params[0]) === null || _b === void 0 ? void 0 : _b.from)) {
                address = (_d = (_c = argumentsList[0]) === null || _c === void 0 ? void 0 : _c.params[0]) === null || _d === void 0 ? void 0 : _d.from;
            }
            let providerError = new ProviderError_1.ProviderError(error.message, error.code, address);
            if (error.body && ((_e = JSON.parse(error.body).error) === null || _e === void 0 ? void 0 : _e.code)) {
                providerError = new ProviderError_1.ProviderError(JSON.parse(error.body).error.message, JSON.parse(error.body).error.code, address);
            }
            Notify_1.NotifyBuilder.build(apikey, chainId).providerError(providerError);
            error.DappSonar = true;
        }
        throw error;
    }
};
exports.applyProxy = applyProxy;
class ProxyProvider {
    constructor(_provider, apikey) {
        const chainId = _provider.networkVersion;
        const handler = {
            get(target, prop, _receiver) {
                const response = target[prop];
                if (typeof target[prop] === 'function') {
                    return new Proxy(response, {
                        apply: async (_target, thisArg, argumentsList) => (0, exports.applyProxy)(_target, thisArg, argumentsList, _provider.selectedAddress, apikey, chainId)
                    });
                }
                return response;
            },
            apply: async (target, thisArg, argumentsList) => {
                return (0, exports.applyProxy)(target, thisArg, argumentsList, _provider.selectedAddress, apikey, chainId);
            }
        };
        return new Proxy(_provider, handler);
    }
}
exports.ProxyProvider = ProxyProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFFekMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxPQUFlLEVBQUUsTUFBZSxFQUFFLE9BQWdCLEVBQUUsRUFBRTs7SUFDbEksSUFBSTtRQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQy9ELE9BQU8sR0FBRyxDQUFBO0tBQ2I7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUVsQixJQUFJLE9BQU8sS0FBSyxTQUFTLEtBQUksTUFBQSxNQUFBLGFBQWEsQ0FBQyxDQUFDLENBQUMsMENBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxJQUFJLENBQUEsRUFBRTtnQkFDNUQsT0FBTyxHQUFHLE1BQUEsTUFBQSxhQUFhLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSSxDQUFBO2FBQzlDO1lBQ0QsSUFBSSxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUV6RSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUksTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQSxFQUFFO2dCQUNsRCxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTthQUN0SDtZQUNELHNCQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDakUsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7U0FDekI7UUFDRCxNQUFNLEtBQUssQ0FBQTtLQUVkO0FBQ0wsQ0FBQyxDQUFBO0FBckJZLFFBQUEsVUFBVSxjQXFCdEI7QUFFRCxNQUFhLGFBQWE7SUFFdEIsWUFBWSxTQUFvRCxFQUFFLE1BQWU7UUFDN0UsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQTtRQUN4QyxNQUFNLE9BQU8sR0FBRztZQUNaLEdBQUcsQ0FBQyxNQUFXLEVBQUUsSUFBUyxFQUFFLFNBQWM7Z0JBQ3RDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDN0IsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBRXBDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO3dCQUN2QixLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQVksRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxFQUFFLENBQUMsSUFBQSxrQkFBVSxFQUN2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7cUJBQ25GLENBQUMsQ0FBQTtpQkFDTDtnQkFDRCxPQUFPLFFBQVEsQ0FBQTtZQUVuQixDQUFDO1lBQ0QsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFXLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsRUFBRTtnQkFFM0QsT0FBTyxJQUFBLGtCQUFVLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDakcsQ0FBQztTQUNKLENBQUE7UUFDRCxPQUFPLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBR0o7QUExQkQsc0NBMEJDIn0=