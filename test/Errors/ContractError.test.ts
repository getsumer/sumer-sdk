import { ContractError } from './../../src/Errors/ContractError';
describe('ContractError', () => {
    it('should set the ContractError properties', () => {

        const error = new ContractError(
            '0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19',
            'transfer',
            [100, 'patata'],
            '0x388c818ca8b9251b393131c08a736a67ccb19297',
            'insufficient balance')

        expect(error.contractAddress).toBe('0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19')
        expect(error.name).toBe('transfer')
        expect(error.args).toEqual([100, 'patata'])
        expect(error.address).toBe('0x388c818ca8b9251b393131c08a736a67ccb19297')
        expect(error.reason).toBe('insufficient balance')
    })
})