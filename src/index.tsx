import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/style.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
