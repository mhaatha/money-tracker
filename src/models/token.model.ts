export enum TokenTypes {
  ACCESS = 'access',
  REFRESH = 'refresh'
}

export interface Payload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

export interface TokenResponse {
  access: {
    token: string;
    expired: Date;
  };
  refresh: {
    token: string;
    expired: Date;
  };
}

export interface RequestRefreshToken {
  refreshToken: string;
}
