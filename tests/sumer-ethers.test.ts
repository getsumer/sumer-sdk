import { ethersLogProvider } from '../src/sumer-ethers'
import { JsonRpcProvider } from '@ethersproject/providers'

describe('LogProvider', () => {
  let jsonMockProvider: JsonRpcProvider
  let logProvider: ReturnType<typeof ethersLogProvider>

  beforeEach(() => {
    jsonMockProvider = new JsonRpcProvider()
    logProvider = ethersLogProvider(jsonMockProvider)
    jest.spyOn(console, 'info').mockImplementation(() => {})
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should call the original provider function', async () => {
    jsonMockProvider.send = jest.fn()
    jsonMockProvider.listAccounts = jest.fn().mockResolvedValue([])

    await logProvider.send('eth_accounts', [])

    expect(jsonMockProvider.send).toHaveBeenCalledWith('eth_accounts', [])
  })
})
