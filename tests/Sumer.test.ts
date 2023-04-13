import { Sumer } from '../src/Sumer'
import { ProviderError, ContractError, Transaction } from '../src/models'
import { NotifyServiceLog } from '../src/services'
import { Web3Provider } from '@ethersproject/providers'
import { CustomJsonRpcProvider, transactionResponse, replaceable } from './__mocks__'

const WALLET_PUBLIC_ADDRESS = '0x14791697260E4c9A71f18484C9f997B308e59325'
const CONTRACT_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

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
    Sumer.init({ dappKey: '123' })
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
    // Given
    const spy = jest.spyOn(NotifyServiceLog.prototype, 'trackTransaction')
    const provider = wagmiProvider({ chainId: 1 })

    // When
    const transactionReceipt = await provider._waitForTransaction(
      transactionResponse.hash,
      1,
      1,
      replaceable,
    )
    const transaction: Transaction = {
      hash: transactionReceipt.transactionHash,
      from: transactionReceipt.from,
      to: transactionReceipt.to,
      blockHash: transactionReceipt.blockHash,
      blockNumber: transactionReceipt.blockNumber,
      confirmations: transactionReceipt.confirmations,
      transactionIndex: transactionReceipt.transactionIndex,
      contractAddress: transactionReceipt.contractAddress,
      gasUsed: transactionReceipt.gasUsed?._hex,
      effectiveGasPrice: transactionReceipt.effectiveGasPrice?._hex,
      cumulativeGasUsed: transactionReceipt.cumulativeGasUsed?._hex,
      status: transactionReceipt.status,
      chainId: 1,

      args: [
        '0x505a3fd48d4b778c74b4583b8892d5102e3d4aabf1e035b0fdcd7a74a7b509dc',
        1,
        1,
        {
          data: '0x474cf53d000000000000000000000000368eedf3f56ad10b9bc57eed4dac65b26bb667f6000000000000000000000000b23012c7730a606f971d756795ddfe104df642700000000000000000000000000000000000000000000000000000000000000000',
          from: '0xb23012C7730A606F971d756795ddFe104Df64270',
          nonce: 54,
          startBlock: 1337,
          to: '0xd5B55D3Ed89FDa19124ceB5baB620328287b915d',
          value: {
            _hex: '0x3782dace9d900000',
            _isBigNumber: true,
          },
        },
      ],
      functionName: '_waitForTransaction',
    }

    // Then
    expect(spy).toHaveBeenCalledWith(transaction)
  })
})

describe('Sumer catch errors', () => {
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

  it('Sumer with Web3Provider catch failure sign message by user reject', async () => {
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

  it('Sumer should track UserRejectedRequestError from window console', async () => {
    // Given
    const spy = jest.spyOn(NotifyServiceLog.prototype, 'trackError')
    let error = new Error('User rejected the request')
    error.name = 'UserRejectedRequestError'

    // When
    window.console.error(error)

    // Then
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Sumer should not track unlisted error from window console', async () => {
    // Given
    const spy = jest.spyOn(NotifyServiceLog.prototype, 'trackError')
    let error = new Error('Unknown error message')
    error.name = 'UnknownError'

    // When
    window.console.error(error)

    // Then
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
