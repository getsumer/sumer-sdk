import { Observer } from './Observer'

export type ExecutionResult = number | string | Record<string, string | number | boolean | object>

export interface TargetExecution {
  target: Record<string, string | object>
  methodName?: string
  methodArgs?: unknown[]
  result?: ExecutionResult
}

export interface Target {
  readonly execution: TargetExecution
  readonly observers: Observer[]
}
