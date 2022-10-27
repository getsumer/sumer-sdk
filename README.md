<p align="center">
  <a href="http://getsumer.com">
    <img src="https://uploads-ssl.webflow.com/633ab0cd3a69e79d248f3b25/633abf29186753321feb30c4_sumer-logo-v1.svg" loading="lazy" width="192px" height="192px"/>
  </a>
</p>

<h2 align="center">
  Sumer SDK Quickstart
</h2>

#### Sumer is the easiest way to track your dapp activity, install and integrate the sumer-sdk within few lines of code  :rocket:


### Supported chains:
- Ethereum: Mainnet, Goerli
- all compatible EVM networks will be added :building_construction:

### Install
```
npm i sumer-sdk
```

#### After getting your Dapp Key in our :parrot:sumer analytics app:parrot:, you can start using sumer:

#### Integrate with [web3-react](https://github.com/Uniswap/web3-react)
```JS
...
import { Web3ReactProvider } from "@web3-react/core";
import { SumerObserver, Client } from "sumer-sdk";
const key = 'YOUR_DAPP_KEY'

//Configuration for web3-react
const getLibrary = (provider) => {
  const client = new Client(provider, key)
  const library = new SumerObserver(client, key);
  return library;
};

// Use the Web3ReactProvider as usual
  <Web3ReactProvider getLibrary={getLibrary}>
    <YourDappComponents />
  </Web3ReactProvider>,
```

##### Listen to your contracts
```JS
...
import { SumerObserver} from "sumer-sdk";
const key = 'YOUR_DAPP_KEY'

const contract = SumerObserver.Contract(contract args..., key, chainId)
...

```


#### Integrate with [warmish](https://wagmi.sh/)
- to be added
