import { ProviderError } from '../../src/models'

describe('ProviderError', () => {
  test('should set the ProviderError properties', () => {
    // Given
    const message = 'Test error message'
    const code = 4001
    const address = '0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19'
    const eip = {
      statusCode: 4001,
      name: 'User Rejected Request',
      description: 'The user rejected the request.',
    }

    // When
    const error = new ProviderError({ message, code, address })

    // Then
    expect(error.message).toBe(message)
    expect(error.code).toBe(code)
    expect(error.address).toBe(address)
    expect(error.eip).toEqual(eip)
  })
})
