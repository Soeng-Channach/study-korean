import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './app/App.jsx';
import { AppProviders } from './app/providers.jsx';
import './styles/index.css';

registerSW({
  immediate: true,
  onOfflineReady() {
    console.info('TOPIK II is ready offline.');
  },
  onNeedRefresh() {
    console.info('A new version is ready and will update automatically.');
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);
