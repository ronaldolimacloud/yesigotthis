export function checkRequiredEnvVars() {
  const required = [
    'VITE_COGNITO_AUTHORITY',
    'VITE_COGNITO_CLIENT_ID',
    'VITE_COGNITO_DOMAIN',
    'VITE_APP_URL'
  ];

  const missing = required.filter(
    key => !import.meta.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
} 