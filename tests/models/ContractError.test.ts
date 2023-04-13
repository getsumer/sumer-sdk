import { ContractError } from '../../src/models'

describe('ContractError', () => {
  it('should set the ContractError properties', () => {
    // Given
    const contractAddress = '0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19'
    const signerOrProviderAddress = '0x388c818ca8b9251b393131c08a736a67ccb19297'
    const name = 'transfer'
    const args = [100, 'patata']
    const reason = 'insufficient balance'

    // When
    const error = new ContractError({
      contractAddress,
      signerOrProviderAddress,
      name,
      args,
      reason,
    })

    // Then
    expect(error.contractAddress).toBe(contractAddress)
    expect(error.signerOrProviderAddress).toBe(signerOrProviderAddress)
    expect(error.name).toBe(name)
    expect(error.args).toEqual(args)
    expect(error.reason).toBe(reason)
  })
})
