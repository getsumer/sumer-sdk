import { Observer } from './Observer'

export type ExecutionPayload =
  | number
  | string
  | { [key: number]: ExecutionPayload }
  | { [key: string]: ExecutionPayload }

export interface TargetExecution {
  target: Record<string, string>
  methodName: string
  args: string[]
  error?: ExecutionPayload
  result?: ExecutionPayload
}

export interface Target {
  readonly execution: TargetExecution
  readonly observers: Observer[]
  proxy<T>(target: T): T
}
