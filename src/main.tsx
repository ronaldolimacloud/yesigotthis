import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

// Dynamically set the redirect URI based on environment
const redirectUri = import.meta.env.PROD 
  ? 'https://www.yesigotthis.com'
  : 'http://localhost:5173';

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: redirectUri,
  post_logout_redirect_uri: redirectUri,
  response_type: "code",
  scope: "email openid phone",
  loadUserInfo: true,
  onSigninCallback: () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider {...cognitoAuthConfig}>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);