import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrismicProvider } from '@prismicio/react';
import { client } from './prismic';
import { Web3ReactProvider } from '@web3-react/core';
import { providers } from 'ethers';
import { BrowserRouter } from "react-router-dom";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/index.scss';

const getLibrary = (provider = null) => new providers.Web3Provider(provider);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PrismicProvider {...{ client }}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </PrismicProvider>
    </BrowserRouter>
  </React.StrictMode>
);
