import { Target, TargetExecution, Observer } from './observers'

export type TargetFunction = (...args: any) => object

export class SumerTarget implements Target {
  private _observers: Observer[]
  private _execution: TargetExecution

  get observers() {
    return this._observers
  }

  get execution() {
    return this._execution
  }

  constructor(observers: Observer[]) {
    this._observers = observers
  }

  public proxy<T>(target: T): T {
    const providerType = typeof target
    switch (providerType) {
      case 'function':
        return this.proxyFunction(target as TargetFunction) as T
      case 'object':
        return this.proxyObject(target as object) as T
      default:
        new Error(`Unsupported Target of type <${providerType}>`)
    }
    return target
  }

  /**
   * Provider wrapping for Object-based libraries like Web3React
   */
  private proxyObject(target: object): object {
    return new Proxy(target, { get: this.getHandler.bind(this) })
  }

  /**
   * Provider wrapping for Function-based libraries like wagmi.sh
   */
  private proxyFunction(provider: TargetFunction): TargetFunction {
    return new Proxy(provider, { apply: this.applyHandler.bind(this) })
  }

  private applyHandler(target: TargetFunction, _thisArg: any, args: any[]) {
    const targetObject = target(...args)
    if (typeof targetObject === 'object' && targetObject !== null) {
      return this.proxyObject(targetObject)
    }
    return target(...args)
  }

  private getHandler(target: any, prop: string | symbol) {
    const method = target[prop]
    if (typeof method !== 'function') {
      return method
    }
    return async (...args: any) => {
      try {
        const bindedMethod = method.bind(target)
        const result = await bindedMethod(...args)
        this._execution = {
          result,
          target,
          methodName: prop.toString(),
          args,
        }
        this.observers.map(o => o.inspect(this))
        return result
      } catch (error) {
        this._execution = {
          error,
          target,
          methodName: prop.toString(),
          args,
        }
        this.observers.map(o => o.inspect(this))
        throw error
      }
    }
  }
}
