 export interface UserDetails {
    email: string;
    email_verified: string;
    preferred_username: string;
    picture: string;
    "custom:valid_until": string;
    "custom:subscription_status": string;
    sub: string;
  }
  
export interface UserDetailsResponse {
    message: string;
    userDetails: UserDetails;
  }
  