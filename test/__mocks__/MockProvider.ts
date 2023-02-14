import { BaseProvider } from "@ethersproject/providers";

export class MockProvider extends BaseProvider {

    async perform(method, params) {
        if (method === "getBlockNumber") { return 1337; }

        if (method === "itFails") {
            throw new Error("itFails");
        }
        return super.perform(method, params);
    }
}



