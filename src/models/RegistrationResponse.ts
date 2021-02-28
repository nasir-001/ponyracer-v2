export interface RegistrationResponse {
  id: number;
  login: string;
  money: number;
  registrationInstant: string;
  token: string | null;
}