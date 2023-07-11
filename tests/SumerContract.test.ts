import { SumerContract } from '../src/SumerContract'
import { abi } from './fixtures/build/IERC20.json'
import { Contract } from 'ethers'
import { BaseProviderMock, TelemetryServiceMock } from './__mocks__'

describe('SumerContract', () => {
  const chainId = 5
  const provider = new BaseProviderMock(chainId)
  const telemetryService = new TelemetryServiceMock()

  it('should create a valid instance', async () => {
    // Given
    const address = '0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19'

    // When
    const sumerContract = new SumerContract({
      addressOrName: address,
      contractInterface: abi,
      signerOrProvider: provider,
      chainId,
      telemetryService,
    })
    const contract = new Contract(address, abi, provider)

    // Then
    Object.keys(contract).forEach(key => {
      expect(JSON.stringify(sumerContract[key])).toStrictEqual(JSON.stringify(contract[key]))
    })
  })
})
