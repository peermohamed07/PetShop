import { PetItem } from '@/types/pet';

export const seedPets: PetItem[] = [
  {
    id: 'seed-1',
    name: 'Milo',
    breed: 'Golden Retriever',
    age: 2,
    price: 299.99,
    imageUrl: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg',
    source: 'seed',
    createdAt: '2026-03-08T10:00:00.000Z',
  },
  {
    id: 'seed-2',
    name: 'Luna',
    breed: 'Husky',
    age: 1,
    price: 349.5,
    imageUrl: 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg',
    source: 'seed',
    createdAt: '2026-03-08T10:10:00.000Z',
  },
  {
    id: 'seed-3',
    name: 'Rocky',
    breed: 'Beagle',
    age: 3,
    price: 259.0,
    imageUrl: 'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg',
    source: 'seed',
    createdAt: '2026-03-08T10:20:00.000Z',
  },
];
