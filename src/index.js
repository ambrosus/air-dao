import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrismicProvider } from '@prismicio/react';
import { client } from './prismic';
import { Web3ReactProvider } from '@web3-react/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/index.scss';

import {
  metamaskConnector,
  metamaskHooks,
} from 'airdao-components-and-tools/utils';

import {
  walletconnectConnector,
  walletconnectHooks,
} from './services/connectors';

const root = ReactDOM.createRoot(document.getElementById('root'));

const connectors = [
  [metamaskConnector, metamaskHooks],
  [walletconnectConnector, walletconnectHooks],
];

root.render(
  <React.StrictMode>
    <PrismicProvider {...{ client }}>
      <Web3ReactProvider connectors={connectors}>
        <App />
      </Web3ReactProvider>
    </PrismicProvider>
  </React.StrictMode>
);
