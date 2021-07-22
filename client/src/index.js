import React from 'react';
import ReactDOM from 'react-dom';
// import * as Sentry from "@sentry/react"; // Uncommnet to enable Sentry 
// import { Integrations } from "@sentry/tracing"; // Uncomment to enable Sentry
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
// import { Config } from "./env.config"; // Uncomment to enable Sentry

// NOTE: Uncomment the below to enable Sentry error reporting
// Sentry.init({
//   dsn: Config.dsn,
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>    
        <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
