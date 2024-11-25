export interface CognitoConfig {
    authority: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
  }
  
  export interface UserProfile {
    email: string;
    // Add other profile fields as needed
  }
  
  export interface AuthUser {
    profile: UserProfile;
    id_token: string;
    access_token: string;
    refresh_token: string;
  }