import { getJson, postJson } from '@/services/api-client';
import { SubmitPetPayload, SubmitPetResult } from '@/types/pet';

const REQRES_USERS_ENDPOINT = 'https://reqres.in/api/users';
const DOG_IMAGE_ENDPOINT = 'https://dog.ceo/api/breeds/image/random';

type DogImageResponse = {
  message: string;
  status: string;
};

export async function submitPetDetails(payload: SubmitPetPayload): Promise<SubmitPetResult> {
  return postJson<SubmitPetPayload, SubmitPetResult>(REQRES_USERS_ENDPOINT, payload);
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
