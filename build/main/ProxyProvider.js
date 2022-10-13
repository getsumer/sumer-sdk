"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyProvider = exports.applyProxy = void 0;
const ProviderError_1 = require("./Errors/ProviderError");
const Notify_1 = require("./Notify/Notify");
const applyProxy = async (target, thisArg, argumentsList, address, apikey) => {
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
            Notify_1.NotifyBuilder.build(apikey).error(providerError);
            error.DappSonar = true;
        }
        throw error;
    }
};
exports.applyProxy = applyProxy;
class ProxyProvider {
    constructor(_provider, apikey) {
        const handler = {
            get(target, prop, _receiver) {
                const response = target[prop];
                if (typeof target[prop] === 'function') {
                    return new Proxy(response, { apply: async (_target, thisArg, argumentsList) => (0, exports.applyProxy)(_target, thisArg, argumentsList, _provider.selectedAddress, apikey) });
                }
                return response;
            },
            apply: async (target, thisArg, argumentsList) => {
                return (0, exports.applyProxy)(target, thisArg, argumentsList, _provider.selectedAddress, apikey);
            }
        };
        return new Proxy(_provider, handler);
    }
}
exports.ProxyProvider = ProxyProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFFekMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxPQUFlLEVBQUMsTUFBYyxFQUFFLEVBQUU7O0lBQzlHLElBQUk7UUFDQSxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUMvRCxPQUFPLEdBQUcsQ0FBQTtLQUNiO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFFbEIsSUFBSSxPQUFPLEtBQUssU0FBUyxLQUFJLE1BQUEsTUFBQSxhQUFhLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSSxDQUFBLEVBQUU7Z0JBQzVELE9BQU8sR0FBRyxNQUFBLE1BQUEsYUFBYSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLDBDQUFFLElBQUksQ0FBQTthQUM5QztZQUNELElBQUksYUFBYSxHQUFHLElBQUksNkJBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFFekUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFJLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSywwQ0FBRSxJQUFJLENBQUEsRUFBRTtnQkFDbEQsYUFBYSxHQUFHLElBQUksNkJBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7YUFDdEg7WUFFRCxzQkFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDaEQsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7U0FDekI7UUFDRCxNQUFNLEtBQUssQ0FBQTtLQUVkO0FBQ0wsQ0FBQyxDQUFBO0FBdEJZLFFBQUEsVUFBVSxjQXNCdEI7QUFFRCxNQUFhLGFBQWE7SUFFdEIsWUFBWSxTQUFvRCxFQUFDLE1BQWM7UUFDM0UsTUFBTSxPQUFPLEdBQUc7WUFDWixHQUFHLENBQUMsTUFBVyxFQUFFLElBQVMsRUFBRSxTQUFjO2dCQUN0QyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzdCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUVwQyxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBWSxFQUFFLE9BQVksRUFBRSxhQUFrQixFQUFFLEVBQUUsQ0FBQyxJQUFBLGtCQUFVLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLGVBQWUsRUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7aUJBQ2pMO2dCQUNELE9BQU8sUUFBUSxDQUFBO1lBRW5CLENBQUM7WUFDRCxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxFQUFFO2dCQUUzRCxPQUFPLElBQUEsa0JBQVUsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsZUFBZSxFQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZGLENBQUM7U0FDSixDQUFBO1FBQ0QsT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUdKO0FBdEJELHNDQXNCQyJ9