import { BaseProvider, Provider, TransactionRequest } from "@ethersproject/providers";
import { Bytes, Signer } from 'ethers';
import { Deferrable } from "ethers/lib/utils";


export class MockProvider extends BaseProvider {

    async perform(method, params) {
        if (method === "getBlockNumber") { return 1337; }

        if (method === "itFails") {
            throw new Error("itFails");
        }
        return super.perform(method, params);
    }
}


export class MockSigner extends Signer {
    getAddress(): Promise<string> {
        return Promise.resolve("0x0000000000000000000000000000000000000000")
    }
    signMessage(message: string | Bytes): Promise<string> {
        throw new Error("Method not implemented.");
    }
    signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
        throw new Error("Method not implemented.");
    }
    connect(provider: Provider): Signer {
        throw new Error("Method not implemented.");
    }

}

    