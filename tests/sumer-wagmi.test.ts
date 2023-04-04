import { NotifyServiceLog } from '../src/Notify'
import { sumerProvider } from '../src/sumer-wagmi'
import { TxReceipt } from '../src/Transactions/TxReceipt'
import { transaction, replaceable } from './__mocks__/Transaction'
import { getUserRejectedRequest } from '../src/sumer-wagmi'
import { CustomJsonRpcProvider } from './__mocks__/CustomJsonRpcProvider'
import { JSDOM } from 'jsdom'

describe('sumerProvider', () => {
  let providerFn: jest.Mock
  let wrappedProviderFn: ReturnType<typeof sumerProvider>
  let provider: ReturnType<typeof wrappedProviderFn>
  let mockProvider: CustomJsonRpcProvider

  beforeEach(() => {
    mockProvider = new CustomJsonRpcProvider()
    mockProvider._network = { name: 'homestead', chainId: 1 }
    providerFn = jest.fn().mockReturnValue(mockProvider)
    wrappedProviderFn = sumerProvider(providerFn)
    provider = wrappedProviderFn({ chainId: 1 })
    jest.spyOn(console, 'info').mockImplementation(() => {})
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should track processed transaction', async () => {
    const spy = jest.spyOn(NotifyServiceLog.prototype, 'trackTxReceipt')
    const txReceipt = await provider._waitForTransaction(transaction.hash, 1, 1, replaceable)
    const txData = new TxReceipt({
      wallet: null, // no wallet in test: no client created and no wallet name set
      chainId: 1,
      txReceipt: txReceipt,
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(txData)
  })
})

describe('getUserRejectedRequest', () => {
  let originalWindow: Window & typeof globalThis
  let trackErrorSpy: jest.SpyInstance

  beforeEach(() => {
    jest.spyOn(console, 'info').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    originalWindow = global.window
    const dom = new JSDOM()
    global.window = dom.window as unknown as Window & typeof globalThis
    window.userRejectedRequestInitialized = false
    trackErrorSpy = jest.spyOn(NotifyServiceLog.prototype, 'trackError')
  })

  afterEach(() => {
    global.window = originalWindow
    trackErrorSpy.mockRestore()
    jest.clearAllMocks()
  })

  it('should track user reject  error', async () => {
    const dappKey = 'dappKey'
    const chainId = 1

    getUserRejectedRequest({ dappKey, chainId })

    let error = new Error('User rejected the request')
    error.name = 'UserRejectedRequestError'

    window.console.error(error)

    expect(trackErrorSpy).toHaveBeenCalledTimes(1)
  })
})
