import { Sumer } from '../src/Sumer'
import { ProviderError, ContractError } from '../src/models'
import { NotifyServiceLog } from '../src/services'
import { Web3Provider } from '@ethersproject/providers'

const WALLET_PUBLIC_ADDRESS = '0x14791697260E4c9A71f18484C9f997B308e59325'
const CONTRACT_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

describe('Test user can use SumerWeb3Provider as expected', () => {
  jest.spyOn(console, 'info').mockImplementation(() => {})
  let web3Provider: Web3Provider
  afterEach(() => {
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
    Sumer.init({ dappKey: '123' })
    web3Provider = new Web3Provider(Sumer.observe(mockProvider))

    jest.resetAllMocks()
  })

  it('Sumer can sign messsage', async () => {
    // Given
    const signer = web3Provider.getSigner()

    // When
    const msgSigned = await signer.signMessage('message')

    // Then
    expect(msgSigned).toEqual('this is a signed message')
  })
})

describe('Test Sumer catch fails from Provider', () => {
  let web3Provider: Web3Provider

  afterEach(() => {
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
    Sumer.init({ dappKey: '123' })
    web3Provider = new Web3Provider(Sumer.observe(mockProvider))

    jest.resetAllMocks()
  })

  it('Sumer catch failure sign message, user reject', async () => {
    // Given
    const spy = jest.spyOn(NotifyServiceLog.prototype, 'trackError')
    const signer = web3Provider.getSigner()
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
    const walletAddress = WALLET_PUBLIC_ADDRESS
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
    const signer = web3Provider.getSigner()
    const USDTContract = Sumer.contract(CONTRACT_ADDRESS, abi, 5, signer)
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
