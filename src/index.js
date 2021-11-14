import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleContext } from '@drizzle/react-plugin'
import { Drizzle } from "@drizzle/store";
import App from './App';
import metalX from './ABI/MTLX_ABI.json';
import amplify from './ABI/AMPLIFY_ABI.json';
import lp from './ABI/LP_ABI.json';
import herc20TokenIn from './ABI/HERC20TOKENIN_ABI.json';
import huniswapV2 from './ABI/HUNISWAPV2_ABI.json';
import mockERC20 from './ABI/MOCKERC20_ABI.json';
import proxy from './ABI/PROXY_ABI.json';
import registry from './ABI/REGISTRY_ABI.json';
import uniswapBV2Router from './ABI/UNISWAPV2ROUTER_ABI.json';
import Web3 from "web3";
import { contractAddresses } from './constants';
import LockScreen from './containers/LockScreen';
import dotenv from "dotenv";
dotenv.config();

window.web3 = new Web3(window.ethereum);

const drizzleOptions = {
  contracts: [
    {
      contractName: 'MetalX',
      web3Contract: new window.web3.eth.Contract(metalX, contractAddresses.mtlx)
    },
    {
      contractName: 'Amplify',
      web3Contract: new window.web3.eth.Contract(amplify, contractAddresses.amplify)
    },
    {
      contractName: 'LP',
      web3Contract: new window.web3.eth.Contract(lp, contractAddresses.lp)
    },
    {
      contractName: 'HERC20TokenIn',
      web3Contract: new window.web3.eth.Contract(herc20TokenIn, contractAddresses.HERC20TokensIn)
    },
    {
      contractName: 'HUniswapV2',
      web3Contract: new window.web3.eth.Contract(huniswapV2, contractAddresses.HUniswapV2)
    },
    {
      contractName: 'MockERC20',
      web3Contract: new window.web3.eth.Contract(mockERC20, contractAddresses.usdt)
    },
    {
      contractName: 'Proxy',
      web3Contract: new window.web3.eth.Contract(proxy, contractAddresses.proxy)
    },
    {
      contractName: 'Registry',
      web3Contract: new window.web3.eth.Contract(registry, contractAddresses.registry)
    },
    {
      contractName: 'UniswapV2Router',
      web3Contract: new window.web3.eth.Contract(uniswapBV2Router, contractAddresses.UniswapV2Router)
    }

  ],
}

const drizzle = new Drizzle(drizzleOptions);

ReactDOM.render(
  <>
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if(!initialized) {
            return <LockScreen />
          }
          return (
            <App drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  </>,
  document.getElementById('root')
);