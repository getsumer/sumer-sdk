<p align="center">
  <a href="https://getsumer.com">
    <img src="https://sumer-public.s3.eu-west-1.amazonaws.com/sumer-logo-v1.svg" loading="lazy" width="192px" height="192px"/>
  </a>
</p>

<h2 align="center">
  Sumer SDK
</h2>

[![npm version](https://badge.fury.io/js/sumer-sdk.svg)](https://badge.fury.io/js/sumer-sdk)

#### Sumer is the easiest way to track your Dapp activity. Integrate _sumer-sdk_ within few lines of code.

### Introduction

This is an Observer Pattern-based SDK that allows users to observe Web3 Providers execution.

### Quickstart

#### Go to [Sumer App](https://app.getsumer.com/)
Complete the sign-up process and create your Dapp to receive its _key_; copy it to use later.

#### Install
Add the _sumer-sdk_ package to your project:
```
npm i sumer-sdk
yarn add sumer-sdk
```

#### Initialize

```JS
import { Sumer } from 'sumer-sdk'

Sumer.init({
  dappKey: 'YOUR_DAPP_KEY',
})
```

#### Use

* _web3-react_ example:

```JS
import { Sumer } from 'sumer-sdk'

function getWeb3Library(provider: any): providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(Sumer.observe(provider))
  library.pollingInterval = 12000
  return library
}

<Web3ReactProvider getLibrary={getWeb3Library}>
  <YourDappComponents />
</Web3ReactProvider>
```

* _wagmi.sh_ example:

```JS
import { Sumer } from 'sumer-sdk'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider: Sumer.observe(provider),
  webSocketProvider: Sumer.observe(webSocketProvider),
})

<WagmiConfig client={client}>
  <YourDappComponents />
</WagmiConfig>
```

* _ethers_ contract example:

```JS
import { Sumer } from 'sumer-sdk'

const contract = Sumer.contract(address, abi, chainId, signerOrProvider)

// Use the contract instance as usual
const tx = contract.myFunction(...)
```

**If you have any trouble integrating with other web3 libraries, please get in touch with us to provide you [support](https://discord.com/channels/1044217387119022080/1044252595616751676).**
