import { NotifyServiceLog } from '../src/Notify'
import { sumerProvider } from '../src/sumer-wagmi'
import { ProcessedTransactionResult } from '../src/Types/Transaction'
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
  })

  it('should properly call _waitForTransaction', async () => {
    const applySpy = jest.spyOn(mockProvider._waitForTransaction.constructor.prototype, 'apply')
    await provider._waitForTransaction(transaction.hash, 1, 1, replaceable)

    expect(providerFn).toHaveBeenCalledTimes(1)
    expect(applySpy).toHaveBeenCalledTimes(1)
    expect(applySpy).toHaveBeenCalledWith(mockProvider, [transaction.hash, 1, 1, replaceable])
  })

  it('should track processed transaction', async () => {
    const spy = jest.spyOn(NotifyServiceLog.prototype, 'trackProcessedTransaction')
    const applySpy = jest.spyOn(mockProvider._waitForTransaction.constructor.prototype, 'apply')
    const txReceipt = await provider._waitForTransaction(transaction.hash, 1, 1, replaceable)
    const txData = new ProcessedTransactionResult({
      wallet: null, // no wallet in test: no client created and no wallet name set
      chainId: 1,
      data: txReceipt,
    })

    expect(applySpy).toHaveBeenCalledWith(mockProvider, [transaction.hash, 1, 1, replaceable])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(txData)
  })
})

describe('getUserRejectedRequest', () => {
  let originalWindow
  let trackErrorSpy

  beforeEach(() => {
    originalWindow = global.window
    const dom = new JSDOM()
    global.window = dom.window
    trackErrorSpy = jest.spyOn(NotifyServiceLog.prototype, 'trackError')
  })

  afterEach(() => {
    global.window = originalWindow
    trackErrorSpy.mockRestore()
  })

  it('should track user reject  error', async () => {
    const dappKey = 'dappKey'
    const chainId = 1

    getUserRejectedRequest({ dappKey, chainId })

    let error = new Error('User rejected the request')
    error.name = 'UserRejectedRequestError'

    console.error = jest.fn().mockImplementation(() => {})
    console.warn = jest.fn().mockImplementation(() => {})
    window.console.error(error)

    expect(trackErrorSpy).toHaveBeenCalledTimes(1)
  })
})
