import bowser from 'bowser'
import { Metadata } from '../models'
import { TelemetryService } from './TelemetryService'
import { TargetExecution, ExecutionResult } from './Target'

enum Wallet {
  BRAVE = 'isBraveWallet',
  COINBASE = 'isCoinbaseWallet',
  METAMASK = 'isMetaMask',
}

export abstract class Observer {
  protected readonly NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

  constructor(protected readonly telemetryService?: TelemetryService) {}
  public abstract inspect(targetExecution: TargetExecution): Promise<void>

  protected getMethodName({ methodName, methodArgs }: TargetExecution): string | undefined {
    if (methodArgs && methodArgs.length) {
      return methodArgs[0]['method']
    }
    return methodName
  }

  protected getMethodArgs({ methodArgs }: TargetExecution): string[] | Record<string, string> {
    if (methodArgs && methodArgs.length && methodArgs[0]['params']) {
      if (methodArgs[0]['params'].length > 1) {
        return methodArgs[0]['params'].map((p: unknown) =>
          typeof p === 'string' ? p : JSON.stringify(p),
        )
      }
      return methodArgs[0]['params'][0]
    }
    return []
  }

  protected isTransaction({ result, methodArgs }: TargetExecution): boolean {
    return result && !this.isCall(methodArgs)
      ? this.isTransactionHash(result.toString()) ||
          this.containsTransactionHash(result) ||
          result['code']
      : false
  }

  protected isTransactionHash(hash: string) {
    return /^0x([A-Fa-f0-9]{64})$/.test(hash)
  }

  protected containsTransactionHash(result: ExecutionResult) {
    return Object.getOwnPropertyNames(result).some(propertyName =>
      ['hash', 'transactionHash'].includes(propertyName),
    )
  }

  protected getTransactionHash(result: ExecutionResult): string {
    return this.isTransactionHash(result.toString())
      ? result.toString()
      : result['hash'] || result['transactionHash']
  }

  protected getChainId(execution: TargetExecution): number | undefined {
    if (!execution.target) {
      return undefined
    }
    // Target extends from BaseProvider
    if (execution.target._network) {
      return execution.target._network['chainId']
    }
    // Target is an ExternalProvider
    if (execution.target.chainId) {
      return parseInt(execution.target.chainId.toString())
    }
    return undefined
  }

  protected getMetadata(execution: TargetExecution): Metadata {
    const metadata: Metadata = {
      walletName: this.getWalletName(execution),
    }
    if (typeof window !== 'undefined' && window.navigator?.userAgent) {
      const { browser, os, platform } = bowser.parse(window.navigator.userAgent)
      metadata.browserName = browser.name
      metadata.browserVersion = browser.version
      metadata.osName = os.name
      metadata.osVersion = os.version
      metadata.platformType = platform.type
    }
    return metadata
  }

  protected getWalletName({ target }: TargetExecution): string | undefined {
    const wallets = {
      [Wallet.BRAVE]: { addressKey: 'selectedAddress', nameKey: 'Brave' },
      [Wallet.COINBASE]: { addressKey: '_addresses', nameKey: 'Coinbase' },
      [Wallet.METAMASK]: { addressKey: 'selectedAddress', nameKey: 'Metamask' },
    }
    for (const [walletKey, { addressKey, nameKey }] of Object.entries(wallets)) {
      if (target?.[walletKey] && typeof target[walletKey] === 'boolean' && target[addressKey]) {
        return nameKey
      }
    }
    return undefined
  }

  protected getWalletAddress(execution: TargetExecution): string {
    if (execution.target.selectedAddress) {
      return execution.target.selectedAddress.toString()
    }
    if (execution.target._addresses && execution.target._addresses[0]) {
      return execution.target._addresses[0].toString()
    }
    return this.NULL_ADDRESS
  }

  protected isNumber(result: ExecutionResult): result is number {
    return typeof result === 'number'
  }

  protected isString(result: ExecutionResult): result is string {
    return typeof result === 'string'
  }

  protected isObject(
    result: ExecutionResult,
  ): result is Record<string, string | number | boolean | object> {
    return typeof result === 'object'
  }

  private isCall(args: unknown[]) {
    return args ? args.filter(Boolean).some(arg => arg['method'] === 'eth_call') : false
  }
}
