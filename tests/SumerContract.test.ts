import { SumerContract } from '../src/SumerContract'
import { abi } from './fixtures/build/IERC20.json'
import { Contract } from 'ethers'
import { MockProvider } from './__mocks__/MockProvider'
import { MockNotifyService } from './__mocks__/MockNotifyService'

describe('SumerContract', () => {
  const chainId = 5
  const provider = new MockProvider(chainId)
  const notifyService = new MockNotifyService()

  it('should create a valid instance', async () => {
    // Given
    const address = '0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19'

    // When
    const sumerContract = new SumerContract({
      addressOrName: address,
      contractInterface: abi,
      signerOrProvider: provider,
      chainId,
      notifyService,
    })
    const contract = new Contract(address, abi, provider)

    // Then
    Object.keys(contract).forEach(key => {
      expect(JSON.stringify(sumerContract[key])).toStrictEqual(JSON.stringify(contract[key]))
    })
  })
})
