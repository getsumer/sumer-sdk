import { Fragment, JsonFragment } from "@ethersproject/abi";
import { ExternalProvider, JsonRpcFetchFunc, Networkish, Provider, TransactionResponse, Web3Provider } from "@ethersproject/providers";
import { BigNumber, Signer } from "ethers";
import { Contract } from "./Contract";

interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

export class DappSonar extends Web3Provider {
  actualAddres: string | undefined

  constructor(_provider: ExternalProvider | JsonRpcFetchFunc, network?: Networkish) {
    super(_provider,network);

    this.on('error', (message: any) => {

      console.log('Error Provider', message)
    })
    this.on('message', (message: ProviderMessage) => {
      console.log('Message', message)
    });

    super.listAccounts().then(a => {
      this.actualAddres = a[0]
    });

  }
  [key: string]: any;


  async sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse> {
    return super.sendTransaction(signedTransaction)
  }
  async getBalance(address: string): Promise<BigNumber> {
    let balance: BigNumber = BigNumber.from(0)
    try {

      balance = await super.getBalance(address)
      console.log('Balance of', this.actualAddres, ' is ', balance.toString())
    } catch (error) {
      console.log('Error on getBlance')
    }

    return balance

  }

  static Contract(addressOrName: string, contractInterface: ReadonlyArray<Fragment | JsonFragment>, signerOrProvider?: Signer | Provider) {

    return new Contract(addressOrName, contractInterface, signerOrProvider)
  }
}