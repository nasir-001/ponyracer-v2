export interface UserModel {
  login: string;
  password: string;
  birthYear: number;
}

export interface AuthenticateModel {
  login: string;
  password: string;
}