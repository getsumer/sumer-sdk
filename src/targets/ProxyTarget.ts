import { Target, TargetExecution, Observer } from '../core'

export type TargetFunction = (...args: any) => object | undefined

export class ProxyTarget implements Target {
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
    const targetType = typeof target
    switch (targetType) {
      case 'function':
        return this.proxyFunction(target as TargetFunction) as T
      case 'object':
        return this.proxyObject(target as object) as T
      default:
        console.debug(`[SumerSDK] Unsupported Target of type <${targetType}>`)
        return target
    }
  }

  /**
   * Proxy for Object-based libraries like Web3React
   */
  private proxyObject(target: object): object {
    if (target === null) {
      return target
    }
    return new Proxy(target, { get: this.getHandler.bind(this) })
  }

  /**
   * Proxy for Function-based libraries like wagmi.sh
   */
  private proxyFunction(target: TargetFunction): TargetFunction {
    return new Proxy(target, { apply: this.applyHandler.bind(this) })
  }

  private applyHandler(target: TargetFunction, _thisArg: any, args: any[]) {
    const targetResult = target(...args)
    if (typeof targetResult === 'object') {
      return this.proxyObject(targetResult)
    }
    this._execution = {
      target: _thisArg,
      methodArgs: args,
    }
    this.observers.map(o => o.inspect(this.execution))
    return targetResult
  }

  private getHandler(target: any, prop: string | symbol) {
    if (prop === Symbol.iterator) {
      return target[Symbol.iterator].bind(target)
    }

    // coinbase wallet installed
    if (target.selectedProvider && target.selectedProvider[prop]) {
      target = target.selectedProvider
    }

    // brave wallet installed
    if (target.isBraveWallet && typeof target.isBraveWallet === 'boolean') {
      const _target = target[prop]
      if (!(typeof _target === 'function' && prop === 'request')) {
        return _target
      }
    }

    const method = target[prop]
    const methodType = typeof method
    switch (methodType) {
      case 'object':
        return this.proxyObject(method)
      case 'function':
        return async (...args: any) => {
          try {
            if (prop === 'then') {
              return this.handlePromise(target)
            }
            const bindedMethod = method.bind(target)
            const result = await bindedMethod(...args)
            this._execution = {
              result,
              target,
              methodName: prop.toString(),
              methodArgs: args,
            }
            await Promise.all(this.observers.map(o => o.inspect(this.execution)))
            return this.proxy(result)
          } catch (error) {
            this._execution = {
              result: error,
              target,
              methodName: prop.toString(),
              methodArgs: args,
            }
            this.observers.map(o => o.inspect(this.execution))
            throw error
          }
        }
      default:
        return method
    }
  }

  private handlePromise(target: Promise<Record<string, string>>) {
    target
      .then(result => {
        this._execution = {
          result,
          target: JSON.parse(JSON.stringify(target)),
          methodName: 'then',
        }
        this.observers.map(o => o.inspect(this.execution))
        return this.proxy(result)
      })
      .catch((error: any) => {
        this._execution = {
          result: error,
          target: JSON.parse(JSON.stringify(target)),
          methodName: 'then',
        }
        this.observers.map(o => o.inspect(this.execution))
        throw error
      })
  }
}
