"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyProvider = exports.applyProxy = void 0;
const ProviderError_1 = require("./Errors/ProviderError");
const Providers_1 = __importDefault(require("./Providers"));
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
            Providers_1.default.get('Notify').error(providerError);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDBEQUFzRDtBQUN0RCw0REFBbUM7QUFFNUIsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxPQUFlLEVBQUUsRUFBRTs7SUFDL0YsSUFBSTtRQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQy9ELE9BQU8sR0FBRyxDQUFBO0tBQ2I7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUVsQixJQUFJLE9BQU8sS0FBSyxTQUFTLEtBQUksTUFBQSxNQUFBLGFBQWEsQ0FBQyxDQUFDLENBQUMsMENBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxJQUFJLENBQUEsRUFBRTtnQkFDNUQsT0FBTyxHQUFHLE1BQUEsTUFBQSxhQUFhLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSSxDQUFBO2FBQzlDO1lBQ0QsSUFBSSxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUV6RSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUksTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQSxFQUFFO2dCQUNsRCxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTthQUN0SDtZQUVELG1CQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUM1QyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtTQUN6QjtRQUNELE1BQU0sS0FBSyxDQUFBO0tBRWQ7QUFDTCxDQUFDLENBQUE7QUF0QlksUUFBQSxVQUFVLGNBc0J0QjtBQUVELE1BQWEsYUFBYTtJQUV0QixZQUFZLFNBQW9EO1FBQzVELE1BQU0sT0FBTyxHQUFHO1lBQ1osR0FBRyxDQUFDLE1BQVcsRUFBRSxJQUFTLEVBQUUsU0FBYztnQkFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM3QixJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtvQkFFcEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQVksRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxFQUFFLENBQUMsSUFBQSxrQkFBVSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUE7aUJBQzFLO2dCQUNELE9BQU8sUUFBUSxDQUFBO1lBRW5CLENBQUM7WUFDRCxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFZLEVBQUUsYUFBa0IsRUFBRSxFQUFFO2dCQUUzRCxPQUFPLElBQUEsa0JBQVUsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDaEYsQ0FBQztTQUNKLENBQUE7UUFDRCxPQUFPLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBR0o7QUF0QkQsc0NBc0JDIn0=