import { Target } from './Target'
import { Observer } from './Observer'
import { NotifyService } from '../services'

export abstract class SumerObserver implements Observer {
  protected readonly notifyService: NotifyService
  constructor(notifyService: NotifyService) {
    this.notifyService = notifyService
  }

  public abstract inspect(_target: Target): Promise<void>
}
