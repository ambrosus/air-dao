import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {PrismicProvider} from "@prismicio/react";
import { client } from './prismic';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrismicProvider {...{ client }}>
      <App />
    </PrismicProvider>
  </React.StrictMode>
);
