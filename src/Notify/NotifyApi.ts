import { Api } from './../Api'
import bowser from 'bowser'
import { ContractError } from '../Errors/ContractError'
import { Notify } from './Notify'
import { v4 } from 'uuid'
import { ProviderError } from '../Errors/ProviderError'
import { txData } from '../Types/TxData'

export class NotifyApi implements Notify {
  private client: Api

  constructor(client: Api) {
    this.client = client
  }

  txHash(message: txData): void {
    const data = {
      id: v4(),
      chainId: message.chainId,
      txHash: message.txHash,
      functionName: message.functionName,
      functionArgs: message.args,
      metadata: this.meta(),
    }

    this.client.sendTxHash(data.txHash, data)
  }

  providerError(message: ProviderError): void {
    const data = {
      id: v4(),
      userAddress: message.address,
      code: message.code,
      message: message.message,
      metadata: this.meta(),
    }
    this.client.sendProviderError(data)
  }

  contractError(msg: ContractError) {
    const data = {
      id: v4(),
      userAddress: msg.address,
      contractAddress: msg.contractAddress,
      functionName: msg.name,
      args: msg.args,
      message: msg.reason,
      metadata: this.meta(),
    }
    this.client.sendContractError(data)
  }

  setStatus(): void {
    this.client.sendSetStatus()
  }

  private meta() {
    if (window?.navigator?.userAgent) {
      return bowser.parse(window.navigator.userAgent)
    }
    return {}
  }
}
