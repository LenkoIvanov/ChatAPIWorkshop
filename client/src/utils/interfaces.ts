export interface JWTToken {
  username: string;
  exp: number;
  iat: number;
}

export interface AuthorInfo {
  username: string;
  color: string;
}
