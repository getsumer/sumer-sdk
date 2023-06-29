import { Contract, Signer } from 'ethers'
import { Fragment, JsonFragment } from '@ethersproject/abi'
import { Provider } from '@ethersproject/providers'
import { NotifyService } from './services'

interface SumerContractArguments {
  addressOrName: string
  contractInterface: ReadonlyArray<Fragment | JsonFragment>
  signerOrProvider?: Signer | Provider
  notifyService: NotifyService
  chainId: number
}

/**
 * The SumerContract class is a wrapper of the ethersjs Contract class. It sends
 * notifications (errors or tx data to the sumer api), when a contract function is called.
 */
export class SumerContract {
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
    contractInterface.forEach(ci => (this[ci.name] = contract.functions[ci.name]))
    const handler = {
      get(target: any, prop: any, _receiver: any) {
        const method = target[prop]
        if (typeof method !== 'function') {
          return method
        }
        return async (...args: any) => {
          try {
            const bindedMethod = method.bind(target)
            const result = await bindedMethod(...args)
            notifyService.trackTransaction({
              chainId,
              hash: result.hash,
            })
            return result
          } catch (err) {
            console.info('trackError log: ', err)
            throw err
          }
        }
      },
    }
    return new Proxy(this, handler)
  }
}
