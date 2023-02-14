"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyProvider = void 0;
const applyProxy = async (target, thisArg, argumentsList) => {
    try {
        const res = await Reflect.apply(target, thisArg, argumentsList);
        return res;
    }
    catch (error) {
        if (!error.DappSonar) {
            console.error('Provider error', error);
            error.DappSonar = true;
        }
        throw error;
    }
};
class ProxyProvider {
    constructor(_provider) {
        const handler = {
            get: function (target, prop, _receiver) {
                const response = target[prop];
                if (typeof target[prop] === 'function') {
                    return new Proxy(response, { apply: applyProxy });
                }
                else {
                    return response;
                }
            },
        };
        return new Proxy(_provider, handler);
    }
}
exports.ProxyProvider = ProxyProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxNQUFXLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsRUFBRTtJQUN2RSxJQUFJO1FBQ0EsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDaEUsT0FBTyxHQUFHLENBQUE7S0FDYjtJQUFDLE9BQU8sS0FBVSxFQUFFO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7U0FDekI7UUFDRCxNQUFNLEtBQUssQ0FBQTtLQUVkO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsTUFBYSxhQUFhO0lBRXRCLFlBQVksU0FBOEM7UUFFdEQsTUFBTSxPQUFPLEdBQUc7WUFDWixHQUFHLEVBQUUsVUFBVSxNQUFXLEVBQUUsSUFBUyxFQUFFLFNBQWM7Z0JBQ2pELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ3BDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7aUJBQ3JEO3FCQUFNO29CQUNILE9BQU8sUUFBUSxDQUFBO2lCQUNsQjtZQUNMLENBQUM7U0FDSixDQUFDO1FBQ0YsT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNKO0FBaEJELHNDQWdCQyJ9