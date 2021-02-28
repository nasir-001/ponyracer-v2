import { RegistrationResponse } from '@/models/RegistrationResponse';
import { AuthenticateModel } from '@/models/UserModel'
import { UserModel } from '@/models/UserModel';
import axios from 'axios';

const baseUrl = 'https://ponyracer.ninja-squad.com';

export function useUserService() {
  return {
    async register(userModel: UserModel): Promise<RegistrationResponse> {
      const response = await axios.post<RegistrationResponse>(`${baseUrl}/api/users`, userModel);

      return Promise.resolve(response.data);
    },

    async authenticate(loginModel: AuthenticateModel): Promise<RegistrationResponse> {
      const response = await axios.post<RegistrationResponse>(`${baseUrl}/api/users/authentication`, loginModel);

      return Promise.resolve(response.data);
    }
  };
}
