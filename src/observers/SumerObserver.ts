import { Target, TargetExecution } from './Target'
import { Observer } from './Observer'
import { NotifyService } from '../services'
import bowser, { Parser } from 'bowser'

enum Wallet {
  BRAVEWALLET = 'isBraveWallet',
  COINBASE = 'isCoinbaseWallet',
  METAMASK = 'isMetaMask',
}
export abstract class SumerObserver implements Observer {
  private readonly NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
  protected readonly notifyService: NotifyService

  constructor(notifyService: NotifyService) {
    this.notifyService = notifyService
  }

  public abstract inspect(_target: Target): Promise<void>

  protected getWallet(_executionTarget: Record<string, string | object>): string | undefined {
    const wallets = {
      [Wallet.COINBASE]: { addressKey: '_addresses', nameKey: 'Coinbase' },
      [Wallet.BRAVEWALLET]: { addressKey: 'selectedAddress', nameKey: 'Brave' },
      [Wallet.METAMASK]: { addressKey: 'selectedAddress', nameKey: 'Metamask' },
    }

    for (const [walletKey, { addressKey, nameKey }] of Object.entries(wallets)) {
      if (
        _executionTarget?.[walletKey] &&
        typeof _executionTarget[walletKey] === 'boolean' &&
        _executionTarget[addressKey]
      ) {
        return nameKey
      }
    }
    return undefined
  }
  protected meta(): Parser.ParsedResult | Record<string, string> {
    if (window?.navigator?.userAgent) {
      return bowser.parse(window.navigator.userAgent)
    }
    return {}
  }

  protected getAddress(execution: TargetExecution): string {
    if (execution.target.selectedAddress) {
      return execution.target.selectedAddress.toString()
    }
    if (execution.target._addresses && execution.target._addresses[0]) {
      return execution.target._addresses[0].toString()
    }
    return this.NULL_ADDRESS
  }
}
