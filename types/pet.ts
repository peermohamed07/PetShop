export type PetFormValues = {
  name: string;
  breed: string;
  age: string;
  price: string;
};

export type PetItem = {
  id: string;
  name: string;
  breed: string;
  age: number;
  price: number;
  imageUrl: string;
  source: 'seed' | 'submitted';
  remoteId?: string;
  createdAt: string;
};

export type SubmitPetPayload = {
  name: string;
  breed: string;
  age: number;
  price: number;
};

export type SubmitPetResult = {
  id: string;
  createdAt: string;
};

export type SubmissionRecord = {
  id: string;
  petName: string;
  breed: string;
  status: 'success' | 'error';
  createdAt: string;
  message: string;
};
