import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
// index.js or main entry
import { HelmetProvider } from 'react-helmet-async';





// index.js or App.jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
        <GoogleOAuthProvider clientId="245508046927-i95br0nl17o19smq8f36f0fu0f61e2jq.apps.googleusercontent.com">
<HelmetProvider>

          <App />
</HelmetProvider>
        </GoogleOAuthProvider>
        </AuthProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 