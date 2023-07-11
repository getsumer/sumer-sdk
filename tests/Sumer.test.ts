import { Web3Provider } from '@ethersproject/providers'
import { LogTelemetryService } from '../src/services'
import { Sumer } from '../src/Sumer'
import { CustomJsonRpcProvider, transactionResponse, replaceable } from './__mocks__'

const WALLET_PUBLIC_ADDRESS = '0x14791697260E4c9A71f18484C9f997B308e59325'

global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

describe('Sumer observed provider can be used as expected', () => {
  jest.spyOn(console, 'info').mockImplementation(() => {})
  let web3Provider: Web3Provider
  let wagmiProvider: Function
  afterEach(() => {
    jest.clearAllMocks()
  })
  beforeEach(async () => {
    const mockWeb3Provider = {
      request: async a => {
        switch (a.method) {
          case 'eth_accounts':
            return [WALLET_PUBLIC_ADDRESS]
          case 'personal_sign':
            return 'this is a signed message'
          default:
            return null
        }
      },
    }
    Sumer.init({ dappKey: '123', standalone: false })
    web3Provider = new Web3Provider(Sumer.observe(mockWeb3Provider))
    wagmiProvider = Sumer.observe(() => new CustomJsonRpcProvider())
    jest.resetAllMocks()
  })

  it('Sumer with Web3Provider can sign a messsage', async () => {
    // Given
    const signer = web3Provider.getSigner()

    // When
    const msgSigned = await signer.signMessage('message')

    // Then
    expect(msgSigned).toEqual('this is a signed message')
  })

  it('Sumer with Wagmi providers should track processed transaction', async () => {
    const spy = jest.spyOn(LogTelemetryService.prototype, 'trackTransaction')

    const provider = wagmiProvider({ chainId: 1 })

    await provider._waitForTransaction(transactionResponse.hash, 1, 1, replaceable)

    expect(spy).toBeCalledTimes(1)
  })
})
