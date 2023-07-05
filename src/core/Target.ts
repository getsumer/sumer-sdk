import { Observer } from './Observer'

export type ExecutionPayload =
  | number
  | string
  | { [key: number]: ExecutionPayload }
  | { [key: string]: ExecutionPayload }

export interface TargetExecution {
  target: Record<string, string | object>
  methodName?: string
  methodArgs?: unknown[]
  result?: ExecutionPayload
}

export interface Target {
  readonly execution: TargetExecution
  readonly observers: Observer[]
}
