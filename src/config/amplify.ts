import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_AWS_REGION,
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      oauth: {
        domain: import.meta.env.VITE_COGNITO_DOMAIN,
        scope: ['email', 'openid', 'phone'],
        redirectSignIn: import.meta.env.VITE_COGNITO_REDIRECT_URI,
        redirectSignOut: import.meta.env.VITE_COGNITO_LOGOUT_URI,
        responseType: 'code',
      },
    },
  },
}); 