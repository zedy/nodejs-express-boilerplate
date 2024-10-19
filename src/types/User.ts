// this is what the JWT will contain, essentially user data
export type JWTPayload = {
  id: number;
  email: string;
  role: string;
};
