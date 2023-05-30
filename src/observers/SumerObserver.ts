import { Target } from './Target'
import { Observer } from './Observer'
import { NotifyService } from '../services'
import bowser, { Parser } from 'bowser'

enum Wallet {
  METAMASK = 'MetaMask',
  COINBASE = 'Coinbase',
}
export abstract class SumerObserver implements Observer {
  protected readonly notifyService: NotifyService
  constructor(notifyService: NotifyService) {
    this.notifyService = notifyService
  }

  public abstract inspect(_target: Target): Promise<void>

  protected getWallet(_executionTarget: Record<string, string | object>): string | undefined {
    if (
      _executionTarget?.isMetaMask &&
      typeof _executionTarget.isMetaMask === 'boolean' &&
      _executionTarget.selectedAddress
    ) {
      return Wallet.METAMASK
    }

    if (
      _executionTarget?.isCoinbaseWallet &&
      typeof _executionTarget.isCoinbaseWallet === 'boolean' &&
      _executionTarget._addresses[0]
    ) {
      return Wallet.COINBASE
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
