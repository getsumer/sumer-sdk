<a name="readme-top"></a>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <a href="https://getsumer.com/">
    <img src="https://sumer-public.s3.eu-west-1.amazonaws.com/logo-single.svg" alt="Logo" width="130" height="130">
  </a>
<br />

<!-- PROJECT TITLES & BADGES -->

<h3 align="center">The Sumer SDK</h3>

  <p align="center">
    A Monitoring Platform for EVM-Based dApps
    <br />
    <br />
  <a href="https://www.npmjs.com/package/sumer-sdk/">
    <img src="https://img.shields.io/npm/v/sumer-sdk?colorA=21262d&colorB=161b22&style=flat" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/sumer-sdk/">
    <img src="https://img.shields.io/npm/dm/sumer-sdk?colorA=21262d&colorB=161b22&style=flat" alt="Downloads per month">
  </a>
    <a href="https://github.com/getsumer/sumer-sdk/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/getsumer/sumer-sdk.svg?colorA=21262d&colorB=161b22&style=flat" alt="License">
    </a>
        <br />
    <a href="https://github.com/getsumer/sumer-sdk/graphs/contributors/">
        <img src="https://img.shields.io/github/contributors/getsumer/sumer-sdk.svg?colorA=21262d&colorB=161b22&style=flat" alt="Contributors">
    </a>
    <br />
    <br />
    <a href="https://docs.getsumer.com/sumer/sumer-sdk/quickstart/">
        <img src="https://img.shields.io/badge/Explore-Docs-X?colorA=21262d&colorB=161b22&style=for-the-badge" alt="Explore-Docs">
    </a>
    <br />
    <br />
    <a href="https://github.com/getsumer/sumer-sdk/issues/">
        <img src="https://img.shields.io/badge/Report-Bug-X?colorA=21262d&colorB=161b22&style=for-the-badge" alt="Report-Bug">
    </a>
    &nbsp;
    <a href="https://github.com/getsumer/sumer-sdk/issues/">
        <img src="https://img.shields.io/badge/Request-Feature-X?colorA=21262d&colorB=161b22&style=for-the-badge" alt="Request-Feature">
    </a>
  </p>
</div>

<br />

<!-- INTRODUCTION -->

## 1. Introduction

Sumer is the easiest way to integrate monitoring and get visibility to your dApp activity.
<br/>
<br/>
It has been designed as an Observer Pattern-based SDK that allows users to observe Web3 Providers execution.
<br/>
Integration is done with just a few lines of code and directly into the dApp frontend

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SDK INITIALIZATION -->

## 2. SDK Initialization

### 2.1. Prerequisites

To visualize the monitored activity, a Sumer dApp key is required.
<br/>
Go to [Sumer App](https://app.getsumer.com/) and complete the sign up process to create your Sumer dApp and get the key.

### 2.2. Installation

Add the _sumer-sdk_ package to your project

```sh
npm i sumer-sdk
```
or

```sh
yarn add sumer-sdk
```

### 2.3. Initialization

Initialize the Sumer SDK

```js
import { Sumer } from 'sumer-sdk'

Sumer.init({ dappKey: 'YOUR_DAPP_KEY' })
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SDK INTEGRATION -->

## 3. SDK Integration

### 3.1. Integration with Web3 Libraries

The SDK currently has full support on [Wagmi](https://github.com/wagmi-dev/wagmi), [Ethers](https://github.com/ethers-io/ethers.js/) and [Web3-React](https://github.com/Uniswap/web3-react)
<br/>
Once integrated, all dApp activity will be captured and observable in the [Sumer App](https://app.getsumer.com/) 

### Wagmi Integration

The developer uses the wagmi.sh library as usual, no more software modifications are required

_Client Integration_

```js
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

### Ethers Integration

Integration done by either creating an observer on the ethers provider and/or the ethers contract
<br/>
The developer uses the ethers library as usual, no more software modifications are required

_Provider Integration_

```js
import { Sumer } from 'sumer-sdk'

const web3Provider = ethers.providers.Web3Provider(Sumer.observe(provider))

// use the provider instance as usual
const tx = web3Provider.myFunction(...)
```

_Contract Integration_

```js
import { Sumer } from 'sumer-sdk'

const contract = Sumer.contract(address, abi, chainId, signerOrProvider)

// use the contract instance as usual
const tx = contract.myFunction(...)
```

### Web3 React Integration

The developer uses the web3-react library as usual, no more software modifications are required

_Provider Integration_

```js
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

### 3.2. Custom Observers

The SDK allows the developer to create a customized observer targeting the desired object

```js
import { Sumer, Observer, Target } from 'sumer-sdk'

class CustomObserver implements Observer {
  public async inspect(target: Target): Promise<void> {
    // use target object as needed
  }
}

// ...

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider: Sumer.observe(provider, [new CustomObserver()]),
})

// ...
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## 4. Contact

If you have any trouble integrating the SDK or visualizing the monitored activity, do not hesistate to contact the developers team. Also contat us for any features/support that you would like to request.
<br/>
<br/>
General Contact - team@getsumer.com

Developers Team - dev@getsumer.com
<br/>
<br/>
Twitter Profile - [twitter](https://twitter.com/getsumer/)

LinkedIn Profile - [linkedin](https://www.linkedin.com/company/getsumer/)
<br/>
<br/>
Sumer Website - [website](https://getsumer.com/)
<br/>
<br/>
GitHub Repository - [repository](https://github.com/uri1001/the-evm-networks-project)

Documentation - [documentation](https://docs.getsumer.com/sumer/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 5. License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
