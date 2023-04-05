import { Target } from './Target'

export interface Observer {
  inspect(target: Target): Promise<void>
}
