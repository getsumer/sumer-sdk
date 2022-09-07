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
export class ProxyProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm94eVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxNQUFXLEVBQUUsT0FBWSxFQUFFLGFBQWtCLEVBQUUsRUFBRTtJQUN2RSxJQUFJO1FBQ0EsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDaEUsT0FBTyxHQUFHLENBQUE7S0FDYjtJQUFDLE9BQU8sS0FBVSxFQUFFO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7U0FDekI7UUFDRCxNQUFNLEtBQUssQ0FBQTtLQUVkO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsTUFBTSxPQUFPLGFBQWE7SUFFdEIsWUFBWSxTQUE4QztRQUV0RCxNQUFNLE9BQU8sR0FBRztZQUNaLEdBQUcsRUFBRSxVQUFVLE1BQVcsRUFBRSxJQUFTLEVBQUUsU0FBYztnQkFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtvQkFDcEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztpQkFDckQ7cUJBQU07b0JBQ0gsT0FBTyxRQUFRLENBQUE7aUJBQ2xCO1lBQ0wsQ0FBQztTQUNKLENBQUM7UUFDRixPQUFPLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBQ0oifQ==