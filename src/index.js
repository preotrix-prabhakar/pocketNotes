import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from './context/GroupData'; // Adjust path as needed


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <App/>
  </AppProvider>
);
