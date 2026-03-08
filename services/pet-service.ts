import { getJson, postJson } from '@/services/api-client';
import { SubmitPetPayload, SubmitPetResult } from '@/types/pet';

const REQRES_USERS_ENDPOINT = 'https://reqres.in/api/users';
const DOG_IMAGE_ENDPOINT = 'https://dog.ceo/api/breeds/image/random';
const REQRES_API_KEY = process.env.EXPO_PUBLIC_REQRES_API_KEY;

type DogImageResponse = {
  message: string;
  status: string;
};

export async function submitPetDetails(payload: SubmitPetPayload): Promise<SubmitPetResult> {
  if (!REQRES_API_KEY) {
    return {
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
  }

  return postJson<SubmitPetPayload, SubmitPetResult>(REQRES_USERS_ENDPOINT, payload, {
    headers: {
      'x-api-key': REQRES_API_KEY,
    },
  });
}

export async function fetchRandomPetImage(): Promise<string> {
  const response = await getJson<DogImageResponse>(DOG_IMAGE_ENDPOINT);

  if (response.status !== 'success' || !response.message) {
    throw new Error('Unable to fetch random pet image');
  }

  return response.message;
}

export const apiEndpoints = {
  submitPetDetails: REQRES_USERS_ENDPOINT,
  randomPetImage: DOG_IMAGE_ENDPOINT,
};
