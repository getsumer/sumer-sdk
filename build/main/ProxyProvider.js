"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyProvider = exports.applyProxy = void 0;
const ProviderError_1 = require("./Errors/ProviderError");
const Notify_1 = require("./Notify/Notify");
const applyProxy = async (target, thisArg, argumentsList, address) => {
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
            Notify_1.NotifyBuilder.build().error(providerError);
            error.DappSonar = true;
        }
        throw error;
    }
};
exports.applyProxy = applyProxy;
class ProxyProvider {
    constructor(_provider) {
        const handler = {
            get(target, prop, _receiver) {
                const response = target[prop];
                if (typeof target[prop] === 'function') {
                    return new Proxy(response, { apply: async (_target, thisArg, argumentsList) => (0, exports.applyProxy)(_target, thisArg, argumentsList, _provider.selectedAddress) });
                }
                return response;
            },
            apply: async (target, thisArg, argumentsList) => {
                return (0, exports.applyProxy)(target, thisArg, argumentsList, _provider.selectedAddress);
            }
        };
        return new Proxy(_provider, handler);
    }
}
exports.ProxyProvider = ProxyProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBEQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFFekMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxPQUFlLEVBQUUsRUFBRTs7SUFDL0YsSUFBSTtRQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQy9ELE9BQU8sR0FBRyxDQUFBO0tBQ2I7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUVsQixJQUFJLE9BQU8sS0FBSyxTQUFTLEtBQUksTUFBQSxNQUFBLGFBQWEsQ0FBQyxDQUFDLENBQUMsMENBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxJQUFJLENBQUEsRUFBRTtnQkFDNUQsT0FBTyxHQUFHLE1BQUEsTUFBQSxhQUFhLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSSxDQUFBO2FBQzlDO1lBQ0QsSUFBSSxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUV6RSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUksTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQSxFQUFFO2dCQUNsRCxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTthQUN0SDtZQUVELHNCQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQzFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1NBQ3pCO1FBQ0QsTUFBTSxLQUFLLENBQUE7S0FFZDtBQUNMLENBQUMsQ0FBQTtBQXRCWSxRQUFBLFVBQVUsY0FzQnRCO0FBRUQsTUFBYSxhQUFhO0lBRXRCLFlBQVksU0FBb0Q7UUFDNUQsTUFBTSxPQUFPLEdBQUc7WUFDWixHQUFHLENBQUMsTUFBVyxFQUFFLElBQVMsRUFBRSxTQUFjO2dCQUN0QyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzdCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUVwQyxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBWSxFQUFFLE9BQVksRUFBRSxhQUFrQixFQUFFLEVBQUUsQ0FBQyxJQUFBLGtCQUFVLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtpQkFDMUs7Z0JBQ0QsT0FBTyxRQUFRLENBQUE7WUFFbkIsQ0FBQztZQUNELEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBVyxFQUFFLE9BQVksRUFBRSxhQUFrQixFQUFFLEVBQUU7Z0JBRTNELE9BQU8sSUFBQSxrQkFBVSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUNoRixDQUFDO1NBQ0osQ0FBQTtRQUNELE9BQU8sSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Q0FHSjtBQXRCRCxzQ0FzQkMifQ==