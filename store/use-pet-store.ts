import { create } from 'zustand';

import { seedPets } from '@/data/seed-pets';
import { PetItem, SubmissionRecord } from '@/types/pet';

type PetStore = {
  pets: PetItem[];
  selectedImageUri: string | null;
  randomImageUri: string | null;
  submissions: SubmissionRecord[];
  setSelectedImageUri: (uri: string | null) => void;
  setRandomImageUri: (uri: string | null) => void;
  addPet: (pet: PetItem) => void;
  addSubmissionRecord: (record: SubmissionRecord) => void;
};

export const usePetStore = create<PetStore>((set) => ({
  pets: seedPets,
  selectedImageUri: null,
  randomImageUri: null,
  submissions: [],
  setSelectedImageUri: (uri) => set({ selectedImageUri: uri }),
  setRandomImageUri: (uri) => set({ randomImageUri: uri }),
  addPet: (pet) =>
    set((state) => ({
      pets: [pet, ...state.pets],
    })),
  addSubmissionRecord: (record) =>
    set((state) => ({
      submissions: [record, ...state.submissions].slice(0, 10),
    })),
}));
