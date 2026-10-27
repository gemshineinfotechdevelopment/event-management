import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </SettingsProvider>
  </React.StrictMode>
);

