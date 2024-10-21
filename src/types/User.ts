// this is what the JWT will contain, essentially user data
export type UserBasic = {
  id: number;
  email: string;
  username: string;
}

export type JWTPayload = {
  user: UserBasic,
  iat: string;
  aud: string;
};
