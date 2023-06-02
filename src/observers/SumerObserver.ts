import { Target } from './Target'
import { Observer } from './Observer'
import { NotifyService } from '../services'
import bowser, { Parser } from 'bowser'

enum Wallet {
  BRAVEWALLET = 'isBraveWallet',
  COINBASE = 'isCoinbaseWallet',
  METAMASK = 'isMetaMask',
}
export abstract class SumerObserver implements Observer {
  protected readonly notifyService: NotifyService
  constructor(notifyService: NotifyService) {
    this.notifyService = notifyService
  }

  public abstract inspect(_target: Target): Promise<void>

  protected getWallet(_executionTarget: Record<string, string | object>): string | undefined {
    const wallets = {
      [Wallet.COINBASE]: { addressKey: '_addresses' },
      [Wallet.BRAVEWALLET]: { addressKey: 'selectedAddress' },
      [Wallet.METAMASK]: { addressKey: 'selectedAddress' },
    }

    for (const [walletKey, { addressKey }] of Object.entries(wallets)) {
      if (
        _executionTarget?.[walletKey] &&
        typeof _executionTarget[walletKey] === 'boolean' &&
        _executionTarget[addressKey]
      ) {
        return walletKey
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
}
