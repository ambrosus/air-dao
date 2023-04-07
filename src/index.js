import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrismicProvider } from '@prismicio/react';
import { client } from './prismic';
import { Web3ReactProvider } from '@web3-react/core';
import { AmbErrorProviderWeb3 } from '@airdao/airdao-node-contracts';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/index.scss';

const getLibrary = (provider = null) => new AmbErrorProviderWeb3(provider);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrismicProvider {...{ client }}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </PrismicProvider>
  </React.StrictMode>
);
