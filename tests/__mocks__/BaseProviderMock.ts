import { BaseProvider } from '@ethersproject/providers'

export class BaseProviderMock extends BaseProvider {
  async perform(method: string, params: any) {
    if (method === 'getBlockNumber') {
      return 1337
    }

    if (method === 'itFails') {
      throw new Error('itFails')
    }
    return super.perform(method, params)
  }
}
