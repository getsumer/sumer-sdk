import { Buffer } from 'buffer'

export interface TargetResult {
  target: Record<string, string>
  methodName: string
  args: string[]
  error?: Buffer
  data?: Buffer
}

export interface Target {
  result: TargetResult
}
