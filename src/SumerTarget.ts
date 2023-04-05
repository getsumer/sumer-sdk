import { Buffer } from 'buffer'
import { Target, TargetResult, Observer } from './observers'

export type TargetFunction = (...args: any) => object

export class SumerTarget implements Target {
  private observers: Observer[]
  private _result: TargetResult

  get result() {
    return this._result
  }

  constructor(observers: Observer[]) {
    this.observers = observers
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
        this._result = {
          data: this.transformToBuffer(result),
          target,
          methodName: prop.toString(),
          args,
        }
        this.observers.map(o => o.inspect(this))
        return result
      } catch (err) {
        this._result = {
          error: this.transformToBuffer(err),
          target,
          methodName: prop.toString(),
          args,
        }
        this.observers.map(o => o.inspect(this))
        throw err
      }
    }
  }

  private transformToBuffer(data: any): Buffer {
    const cache = []
    const dataString = JSON.stringify(data, (_key, value) => {
      if (typeof value === 'object' && value !== null) {
        // Discard possible Circular Reference case
        if (cache.includes(value)) {
          return
        }
        cache.push(value)
      }
      return value
    })
    return Buffer.from(dataString)
  }
}
