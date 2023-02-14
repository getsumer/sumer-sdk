import { Contract } from '../src/Contract'
import { abi } from './fixtures/build/IERC20.json'
import { ethers } from 'ethers'
import { MockProvider } from './__mocks__/MockProvider'

describe('Contract', () => {
  let provider = new MockProvider(5)

  it('should create a valid instance', async () => {
    const address = '0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19'
    let apiKey = '7be660b0-7c34-4910-adeb-7775f433f4d0'
    let contract = new Contract(address, abi, provider, apiKey, 5)

    expect(contract.baseContract).toBeInstanceOf(ethers.BaseContract)
    expect(contract.baseContract.address).toBe(address)
    expect(contract.baseContract.interface).toBeInstanceOf(ethers.utils.Interface)
    expect(contract.address).toBe(address)
    expect(contract.interface).toBe(contract.baseContract.interface)
    expect(contract.functions).toBe(contract.baseContract.functions)
    expect(contract.estimateGas).toBe(contract.baseContract.estimateGas)
    expect(contract.populateTransaction).toBe(contract.baseContract.populateTransaction)
    expect(contract.callStatic).toBe(contract.baseContract.callStatic)
    expect(contract.filters).toBe(contract.baseContract.filters)
  })
})
