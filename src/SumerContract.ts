import { Contract, Signer } from 'ethers'
import { Fragment, JsonFragment } from '@ethersproject/abi'
import { Provider } from '@ethersproject/providers'
import { NotifyService } from './Notify'
import { ContractError } from './Errors'
import { TxResponse } from './Transactions/TxResponse'

interface SumerContractArguments {
  addressOrName: string
  contractInterface: ReadonlyArray<Fragment | JsonFragment>
  signerOrProvider?: Provider | Signer
  notifyService: NotifyService
  chainId: number
}

/**
 * The SumerContract class is a wrapper of the ethersjs Contract class. It sends
 * notifications (errors or tx data to the sumer api), when a contract function is called.
 */
export class SumerContract {
  [key: string]: any

  constructor({
    addressOrName,
    contractInterface,
    signerOrProvider,
    chainId,
    notifyService,
  }: SumerContractArguments) {
    const contract = new Contract(addressOrName, contractInterface, signerOrProvider)

    // Absorb baseContract definitions
    Object.assign(this, contract)
    contractInterface.forEach(ci => {
      if (ci.name) {
        this[ci.name] = contract.functions[ci.name]
      }
    })
    const handler = {
      get(target: any, prop: any, _receiver: any) {
        const method = target[prop]
        if (typeof method !== 'function') {
          return method
        }
        return async (...args: any) => {
          try {
            const result = await method.apply(this, args)
            const transaction = new TxResponse({
              chainId,
              functionName: prop,
              args: args,
              txResponse: result,
            })
            await notifyService.trackTxResponse(transaction)
            return result
          } catch (err) {
            let signerOrProviderAddress = '0x0000000000000000000000000000000000000000'
            if (Signer.isSigner(signerOrProvider)) {
              signerOrProviderAddress = await signerOrProvider.getAddress()
            }
            const contracError = new ContractError({
              contractAddress: addressOrName,
              signerOrProviderAddress,
              name: prop,
              args,
              reason: err instanceof Error ? err.message : 'Unknown reason',
              chainId,
            })

            await notifyService.trackError(contracError)
            throw err
          }
        }
      },
    }
    return new Proxy(this, handler)
  }
}
