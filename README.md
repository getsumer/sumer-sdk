<p align="center">
  <a href="http://getsumer.com">
    <img src="https://uploads-ssl.webflow.com/633ab0cd3a69e79d248f3b25/633abf29186753321feb30c4_sumer-logo-v1.svg" loading="lazy" width="192px" height="192px"/>
  </a>
</p>

<h2 align="center">
  Sumer SDK Quickstart
</h2>

[![npm version](https://badge.fury.io/js/sumer-sdk.svg)](https://badge.fury.io/js/sumer-sdk)

#### Sumer is the easiest way to track your dapp activity, install and integrate the sumer-sdk within few lines of code  :rocket:

### Install
```
npm i sumer-sdk
```

#### After installing the Sumer SDK in your project and getting your dApp key from the signup process at [Sumer App](https://app.getsumer.com/), you can start using sumer as follows:

* Initialize the Sumer client by wrapping the provider:<br>
```JS
...
import { Sumer } from "sumer-sdk"
const dappKey = 'YOUR_DAPP_KEY'

const web3provider = new ethers.providers.Web3Provider(window.ethereum, dappKey)

const provider = Sumer.init({ provider: web3provider, dappKey })

// Use the provider as usual
await provider.send("eth_requestAccounts", [])
...
```

  * Then wrap your contracts to automatically listen for events and errors:
  
```JS
...
import { Sumer } from "sumer-sdk"
const dappKey = 'YOUR_DAPP_KEY'

const contract = Sumer.createWrappedContract(contract args..., dappKey)

// Use the contract instance as usual
const tx = contract.myFunction(...) 
...
```

* Integrate with [web3-react](https://github.com/Uniswap/web3-react):

```JS
...
import { Sumer } from "sumer-sdk"
const dappKey = 'YOUR_DAPP_KEY'

// Configuration for web3-react
const getLibrary = (provider) => {

  const library = Sumer.init({ provider, dappKey })
  
  return library
}

// Use the Web3ReactProvider as usual
  <Web3ReactProvider getLibrary={getLibrary}>
    <YourDappComponents />
  </Web3ReactProvider>
```

* If you want to use other web3 react hooks libraries, and you may have any trouble implementing it, please get in touch with us to provide you [support](https://discord.com/channels/1044217387119022080/1044252595616751676).
