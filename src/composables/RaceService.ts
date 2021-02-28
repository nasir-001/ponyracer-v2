import { RaceModel } from '@/models/RaceModel';
import axios from 'axios';
const baseUrl = 'https://ponyracer.ninja-squad.com';

export function useRaceService() {
  return {
    async list(): Promise<Array<RaceModel>> {
      const response = await axios.get<Array<RaceModel>>(`${baseUrl}/api/races`, {
        params: { status: 'PENDING' }
      });

      return Promise.resolve(response.data);
    }
  };
}
