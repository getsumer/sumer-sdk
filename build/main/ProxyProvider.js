"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyProvider = exports.applyProxy = void 0;
const ProviderError_1 = require("./Errors/ProviderError");
const Notify_1 = require("./Notify/Notify");
/**
 * applyProxy is called when a function of the wrapped provider object is called, and
 * sends error notifications to the sumer api
*/
const applyProxy = async (target, thisArg, argumentsList, address, apikey, chainId) => {
    var _a, _b, _c, _d, _e;
    try {
        // call the target function
        const res = await Reflect.apply(target, thisArg, argumentsList);
        return res;
    }
    catch (error) {
        if (!error.DappSonar) {
            if (address === undefined && ((_b = (_a = argumentsList[0]) === null || _a === void 0 ? void 0 : _a.params[0]) === null || _b === void 0 ? void 0 : _b.from)) {
                address = (_d = (_c = argumentsList[0]) === null || _c === void 0 ? void 0 : _c.params[0]) === null || _d === void 0 ? void 0 : _d.from;
            }
            // prepare error payload
            let providerError = new ProviderError_1.ProviderError(error.message, error.code, address);
            if (error.body && ((_e = JSON.parse(error.body).error) === null || _e === void 0 ? void 0 : _e.code)) {
                providerError = new ProviderError_1.ProviderError(JSON.parse(error.body).error.message, JSON.parse(error.body).error.code, address);
            }
            // send payload with provider error
            Notify_1.NotifyBuilder.build(apikey, chainId).providerError(providerError);
            error.DappSonar = true;
        }
        throw error;
    }
};
exports.applyProxy = applyProxy;
/**
 * ProxyProvider class wraps the provider object and adds error notifications
 */
class ProxyProvider {
    constructor(_provider, apikey) {
        const chainId = _provider.networkVersion;
        // prepare proxy handler for the called function of the provider object
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFHaEQ7OztFQUdFO0FBQ0ssTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxPQUFlLEVBQUUsTUFBZSxFQUFFLE9BQWdCLEVBQUUsRUFBRTs7SUFDbEksSUFBSTtRQUNBLDJCQUEyQjtRQUMzQixNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUMvRCxPQUFPLEdBQUcsQ0FBQTtLQUViO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFFakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFFbEIsSUFBSSxPQUFPLEtBQUssU0FBUyxLQUFJLE1BQUEsTUFBQSxhQUFhLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSSxDQUFBLEVBQUU7Z0JBQzVELE9BQU8sR0FBRyxNQUFBLE1BQUEsYUFBYSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLDBDQUFFLElBQUksQ0FBQTthQUM5QztZQUVELHdCQUF3QjtZQUN4QixJQUFJLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3pFLElBQUksS0FBSyxDQUFDLElBQUksS0FBSSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssMENBQUUsSUFBSSxDQUFBLEVBQUU7Z0JBQ2xELGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQ3RIO1lBQ0QsbUNBQW1DO1lBQ25DLHNCQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDakUsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7U0FDekI7UUFDRCxNQUFNLEtBQUssQ0FBQTtLQUNkO0FBQ0wsQ0FBQyxDQUFBO0FBekJZLFFBQUEsVUFBVSxjQXlCdEI7QUFHRDs7R0FFRztBQUNILE1BQWEsYUFBYTtJQUV0QixZQUFZLFNBQW9ELEVBQUUsTUFBZTtRQUU3RSxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFBO1FBRXhDLHVFQUF1RTtRQUN2RSxNQUFNLE9BQU8sR0FBRztZQUNaLEdBQUcsQ0FBQyxNQUFXLEVBQUUsSUFBUyxFQUFFLFNBQWM7Z0JBQ3RDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDN0IsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBRXBDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO3dCQUN2QixLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQVksRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxFQUFFLENBQUMsSUFBQSxrQkFBVSxFQUN2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7cUJBQ25GLENBQUMsQ0FBQTtpQkFDTDtnQkFDRCxPQUFPLFFBQVEsQ0FBQTtZQUVuQixDQUFDO1lBQ0QsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFXLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsRUFBRTtnQkFFM0QsT0FBTyxJQUFBLGtCQUFVLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDakcsQ0FBQztTQUNKLENBQUE7UUFDRCxPQUFPLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBRUo7QUE1QkQsc0NBNEJDIn0=