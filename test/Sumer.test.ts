import { ProxyProvider } from '../src/ProxyProvider'
import { Sumer } from '../src/Sumer'
import { ProviderError } from '../src/Errors/ProviderError'
import { ContractError } from '../src/Errors/ContractError'
import { deployContract, MockProvider } from 'ethereum-waffle'
import ERC20 from "./fixtures/build/ERC20.json";
import { ethers, Wallet, BytesLike } from 'ethers';
import { NotifyVoid } from '../src/Notify/NotifyVoid'
require('dotenv').config()

const WALLET_PUBLIC_ADDRESS = '0x14791697260E4c9A71f18484C9f997B308e59325'
const WALLET_PRIVATE_ADDRESS = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

describe('Test user can use Provider as expected', () => {
    let provider: Sumer
    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeEach(async () => {
        const mockProvider = {
            request: async (a) => {
                switch (a.method) {
                    case 'eth_accounts':
                        return [WALLET_PUBLIC_ADDRESS]
                    case 'personal_sign':
                        return 'this is a signed message'
                    default:
                        return null
                }
            }
        }
        const proxy = new ProxyProvider(mockProvider)
        provider = new Sumer(proxy, '123', 1)

        jest.resetAllMocks();
    })

    it('DappSonar can sign messsage', async () => {

        const signer = provider.getSigner()
        const msgSigned = await signer.signMessage('message')
        expect(msgSigned).toEqual('this is a signed message')
    })

    it('DappSonar can retrieve actual account', async () => {
        const address = provider.actualAddres
        expect(address).toEqual(WALLET_PUBLIC_ADDRESS)
    })

})

describe('Test Dappson catch fails from Provider', () => {
    let provider: Sumer

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(async () => {
        const mockProvider = {
            request: async (a) => {
                switch (a.method) {
                    case 'eth_accounts':
                        return [WALLET_PUBLIC_ADDRESS]
                    case 'personal_sign':
                        throw { message: 'This is a raw message', code: 4001 }
                    default:
                        return null
                }
            },
            selectedAddress: WALLET_PUBLIC_ADDRESS
        }
        const proxy = new ProxyProvider(mockProvider)
        provider = new Sumer(proxy, '123', 1)

        jest.resetAllMocks();
    })

    it('DappSonar catch failure sign message, user reject', async () => {
        
        const spy = jest.spyOn(NotifyVoid,'error')

        const signer = provider.getSigner()

        try {
            await signer.signMessage('message')
        } catch (e) { console.log({e})}

        expect(spy).toBeCalled();

        const error = new ProviderError(`This is a raw message`, 4001, WALLET_PUBLIC_ADDRESS)

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining(error)
        );
        
        spy.mockClear()

    })

    it('DappSonar catch failure on contract build method', async () => {

        const spy = jest.spyOn(NotifyVoid, 'error')

        const walletAddress = provider.actualAddres

        const abi = [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
        const signer = provider.getSigner()
        const USDTContract = Sumer.Contract(CONTRACT_ADDRESS, abi, signer)
        try {
            await USDTContract.approve(walletAddress, false);
        } catch (_e) { }

        expect(spy).toHaveBeenCalledTimes(1);

        const error = new ContractError(CONTRACT_ADDRESS,
            'approve',
            [walletAddress, false],
            WALLET_PUBLIC_ADDRESS,
            "invalid BigNumber value")

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining(error)
        );
        spy.mockClear()


    })

    it(`Revert on call send transaction`, async () => {
        const spy = jest.spyOn(NotifyVoid, 'error')

        const web3Provider = new MockProvider();
        const provider = new Sumer(new ProxyProvider(web3Provider.provider), '123')
        provider.getWallets = () => web3Provider.getWallets()

        const wallets = provider.getWallets();
        const wallet: Wallet = wallets[0]
        try {
            let amountInEther = '10'

            let payload = {
                to: '0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB',
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther(amountInEther)
            }

            const signedTx = await wallet.signTransaction(payload)
            await provider.sendTransaction(signedTx + 'hola');

        } catch (e) {
        }

        expect(spy).toHaveBeenCalledTimes(1);
        const error = new ProviderError(
            expect.any(String),
            'INVALID_ARGUMENT', wallet.address)

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining(error)
        );
        spy.mockClear()
    })

    it(`Contract revert on call no exist function`, async () => {
        const spy = jest.spyOn(NotifyVoid, 'error')
        const web3Provider = new MockProvider();
        const provider = new Sumer(new ProxyProvider(web3Provider.provider), '123')
        provider.getWallets = () => web3Provider.getWallets()
        const [wallet] = provider.getWallets();
        const token = await deployContract(wallet, ERC20, [wallet.address, 1000]);
        const signer = provider.getSigner()
        const contractAddres = token.address
        const noExistAbiFragment = [{
            inputs: [],
            name: "thisFunctionNoExist",
            outputs: [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            stateMutability: "view",
            type: "function"
        }]
        const TokenContract = Sumer.Contract(contractAddres, [
            ...ERC20.abi, ...noExistAbiFragment
        ], signer)
        try {

            await TokenContract.thisFunctionNoExist()
        } catch (e) {
        }
        expect(spy).toHaveBeenCalledTimes(2);
        const p_error = new ProviderError('VM Exception while processing transaction: revert', -32000, '0x17ec8597ff92c3f44523bdc65bf0f1be632917ff')
        const c_error = new ContractError(contractAddres, 'thisFunctionNoExist', [], wallet.address, 'missing revert data in call exception; Transaction reverted without a reason string')

        expect(spy).toHaveBeenNthCalledWith(1, expect.objectContaining(p_error));
        expect(spy).toHaveBeenNthCalledWith(2, expect.objectContaining(c_error));
        spy.mockClear()
    });
});


// run  "ganache-cli" on console
describe(`Test Dappsonar catch fails from RPC Mainnet`, () => {
    let provider
    const provUrl = `https://mainnet.infura.io/v3JK/${process.env.INFURA_MAINNET}`
    console.log(provUrl)
    beforeEach(() => {
        const web3Provider = new ethers.providers.JsonRpcProvider(provUrl)

        provider = new ProxyProvider(web3Provider)
        provider.selectedAddress = WALLET_PUBLIC_ADDRESS
    })
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('-32600', async () => {
        const spy = jest.spyOn(NotifyVoid, 'error')
        try {
            await provider.getGasPrice()
        } catch (e) {
        }

        expect(spy).toHaveBeenCalledTimes(1);
        const error = new ProviderError(
            'invalid json request',
            -32600, WALLET_PUBLIC_ADDRESS)

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining(error))
        spy.mockClear()
    })
    it(`-32601`, async () => {
        const spy = jest.spyOn(NotifyVoid, 'error')
        try {
            await provider.send('noExistMethod',)
        } catch (e) {
        }

        expect(spy).toHaveBeenCalledTimes(1);
        const error = new ProviderError(
            'The method noExistMethod does not exist/is not available',
            -32601, WALLET_PUBLIC_ADDRESS)

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining(error))
        spy.mockClear()
    })
    it(`-32602`, async () => {
        const spy = jest.spyOn(NotifyVoid, 'error')
        try {
            await provider.send('eth_call', [])
        } catch (e) {
        }

        expect(spy).toHaveBeenCalledTimes(1);
        const error = new ProviderError(
            'missing value for required argument 0',
            -32602, WALLET_PUBLIC_ADDRESS)

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining(error))
        spy.mockClear()
    })

    it(`Contract Revert on no exist function`, async () => {
        const spy = jest.spyOn(NotifyVoid, 'error')

        let wallet = new ethers.Wallet(WALLET_PRIVATE_ADDRESS as BytesLike, provider);
        const noExistAbiFragment = [{
            inputs: [],
            name: "thisFunctionNoExist",
            outputs: [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            stateMutability: "view",
            type: "function"
        }]
        const TokenContract = Sumer.Contract(CONTRACT_ADDRESS, [
            ...ERC20.abi, ...noExistAbiFragment
        ], wallet)
        try {

            const tx = await TokenContract.thisFunctionNoExist()
            console.log(tx)
        } catch (e) {
        }
        expect(spy).toHaveBeenCalledTimes(2);
        const p_error = new ProviderError('invalid json request', -32600, WALLET_PUBLIC_ADDRESS)
        const c_error = new ProviderError(expect.any(String), "CALL_EXCEPTION", WALLET_PUBLIC_ADDRESS)

        expect(spy).toHaveBeenNthCalledWith(1, expect.objectContaining(p_error));
        expect(spy).toHaveBeenNthCalledWith(2, expect.objectContaining(c_error));
        spy.mockClear()
    });

    it(`Contract Revert on send transaction`, async () => {
        const spy = jest.spyOn(NotifyVoid, 'error')
        try {
            const web3Provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3JK/${process.env.INFURA_MAINNET}`)

            let wallet = new ethers.Wallet(WALLET_PRIVATE_ADDRESS as BytesLike, web3Provider);

            const USDTContract = Sumer.Contract(CONTRACT_ADDRESS, [
                ...ERC20.abi
            ], wallet)

            var newAddress = "0x15c72944b325a3E1c7a4DBdc6F883bD5948d3D9f";

            const submittedTx = await USDTContract.transfer(newAddress, 10, { gasLimit: 10000 });

            console.log(submittedTx)
        } catch (e) {
        }
        expect(spy).toHaveBeenCalledTimes(1);
        const error = new ContractError(CONTRACT_ADDRESS,
            "transfer",
            ["0x15c72944b325a3E1c7a4DBdc6F883bD5948d3D9f", 10, { "gasLimit": 10000 }],
            WALLET_PUBLIC_ADDRESS,
            'insufficient funds for intrinsic transaction cost')

        expect(spy).toHaveBeenNthCalledWith(1, expect.objectContaining(error));


        spy.mockClear()
    });
})