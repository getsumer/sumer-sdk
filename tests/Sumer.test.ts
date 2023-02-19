import { SumerProvider } from './../src/SumerProvider'
import { Sumer } from '../src/Sumer'
import { ProviderError } from '../src/Errors/ProviderError'
import { ContractError } from '../src/Errors/ContractError'
import { NotifyServiceLog } from '../src/Notify/NotifyServiceLog'

const WALLET_PUBLIC_ADDRESS = '0x14791697260E4c9A71f18484C9f997B308e59325'
//const WALLET_PRIVATE_ADDRESS = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

describe('Test user can use SumerWeb3Provider as expected', () => {
  jest.spyOn(console, 'info').mockImplementation(() => {})
  let provider: SumerProvider
  afterEach(() => {
    Sumer.destroy()
    jest.clearAllMocks()
  })
  beforeEach(async () => {
    const mockProvider = {
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
    provider = Sumer.init({
      provider: mockProvider,
      dappKey: '123',
      network: 1,
    })

    jest.resetAllMocks()
  })

  it('Sumer can sign messsage', async () => {
    // Given
    const signer = provider.getSigner()

    // When
    const msgSigned = await signer.signMessage('message')

    // Then
    expect(msgSigned).toEqual('this is a signed message')
  })

  it('Sumer can retrieve actual account', async () => {
    expect(Sumer.currentAddress).toEqual(WALLET_PUBLIC_ADDRESS)
  })
})

describe('Test Sumer catch fails from Provider', () => {
  let provider: SumerProvider

  afterEach(() => {
    Sumer.destroy()
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    const mockProvider = {
      request: async a => {
        switch (a.method) {
          case 'eth_accounts':
            return [WALLET_PUBLIC_ADDRESS]
          case 'personal_sign':
            throw { message: 'This is a raw message', code: 4001 }
          default:
            return null
        }
      },
      selectedAddress: WALLET_PUBLIC_ADDRESS,
    }
    provider = Sumer.init({
      provider: mockProvider,
      dappKey: '123',
      network: 1,
    })

    jest.resetAllMocks()
  })

  it('Sumer catch failure sign message, user reject', async () => {
    // Given
    const spy = jest.spyOn(NotifyServiceLog.prototype, 'trackError')
    const signer = provider.getSigner()
    const error = new ProviderError({
      message: `This is a raw message`,
      code: 4001,
      address: WALLET_PUBLIC_ADDRESS,
    })

    // When
    try {
      await signer.signMessage('message')
    } catch (e) {}

    // Then
    expect(spy).toBeCalled()
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(error))
    spy.mockClear()
  })

  it('Sumer catch failure on contract build method', async () => {
    // Given
    const spy = jest.spyOn(NotifyServiceLog.prototype, 'trackError')
    const walletAddress = Sumer.currentAddress
    const abi = [
      {
        constant: false,
        inputs: [
          {
            name: '_spender',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ]
    const signer = provider.getSigner()
    const USDTContract = Sumer.createWrappedContract(CONTRACT_ADDRESS, abi, signer)
    const error = new ContractError({
      contractAddress: CONTRACT_ADDRESS,
      name: 'approve',
      args: [walletAddress, false],
      signerOrProviderAddress: WALLET_PUBLIC_ADDRESS,
      reason: 'invalid BigNumber value',
    })

    // When
    try {
      await USDTContract.approve(walletAddress, false)
    } catch (e) {}

    // Then
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(error)
    spy.mockClear()
  })
})
