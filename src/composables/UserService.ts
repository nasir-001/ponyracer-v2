import { RegistrationResponse } from "@/models/RegistrationResponse";
import { UserModel } from "@/models/UserModel";
import axios from "axios";

const baseUrl = 'https://ponyracer.ninja-squad.com'

export function useUserService() {
  return {
    async register(userModel: UserModel): Promise<RegistrationResponse> {
      const response = await axios.post<RegistrationResponse>(`${baseUrl}/api/users`, userModel)

      return Promise.resolve(response.data)
    },
  };
};