export type PetCategory = 'Food' | 'Toys' | 'Grooming' | 'Health' | 'Accessories';

export type Product = {
  id: string;
  name: string;
  category: PetCategory;
  petType: 'Dog' | 'Cat' | 'Bird' | 'Small Pet';
  price: number;
  rating: number;
  reviews: number;
  emoji: string;
  color: string;
  badge: string;
  description: string;
  details: string[];
};

export type Order = {
  id: string;
  status: 'Packing' | 'Shipped' | 'Delivered';
  total: number;
  items: number;
  eta: string;
};

export const heroStats = [
  { label: 'Active deals', value: '12' },
  { label: 'Fast delivery', value: '90 min' },
  { label: 'Happy pets', value: '4.9k' },
];

export const categories: PetCategory[] = [
  'Food',
  'Toys',
  'Grooming',
  'Health',
  'Accessories',
];

export const products: Product[] = [
  {
    id: 'salmon-bites',
    name: 'Wild Salmon Bites',
    category: 'Food',
    petType: 'Cat',
    price: 18.99,
    rating: 4.8,
    reviews: 124,
    emoji: '🐟',
    color: '#FFD6BF',
    badge: 'Top Seller',
    description: 'Protein-rich grain-free cat treats made for picky indoor cats.',
    details: ['Freeze-dried recipe', 'No artificial colors', 'Ideal for training rewards'],
  },
  {
    id: 'calm-chews',
    name: 'Calm Care Chews',
    category: 'Health',
    petType: 'Dog',
    price: 24.5,
    rating: 4.7,
    reviews: 86,
    emoji: '🦴',
    color: '#D6E7C6',
    badge: 'Vet Pick',
    description: 'Daily calming chews with chamomile and L-theanine for anxious dogs.',
    details: ['60 chew jar', 'Supports travel comfort', 'Chicken flavor'],
  },
  {
    id: 'feather-frenzy',
    name: 'Feather Frenzy Wand',
    category: 'Toys',
    petType: 'Cat',
    price: 12.0,
    rating: 4.9,
    reviews: 203,
    emoji: '🪶',
    color: '#F7D7F0',
    badge: 'New',
    description: 'Interactive teaser toy built for quick play sessions and high energy cats.',
    details: ['Flexible carbon rod', 'Swap-in feather tip', 'Lightweight grip handle'],
  },
  {
    id: 'paw-balm',
    name: 'Paw Repair Balm',
    category: 'Grooming',
    petType: 'Dog',
    price: 16.75,
    rating: 4.6,
    reviews: 59,
    emoji: '🐾',
    color: '#FCE5B8',
    badge: 'Limited',
    description: 'Soothing shea butter balm for dry paws and rough nose patches.',
    details: ['Lick-safe formula', 'Travel-size tin', 'Use after walks'],
  },
  {
    id: 'orchard-mix',
    name: 'Orchard Seed Mix',
    category: 'Food',
    petType: 'Bird',
    price: 14.25,
    rating: 4.5,
    reviews: 41,
    emoji: '🌾',
    color: '#D8F1E2',
    badge: 'Fresh Batch',
    description: 'Vitamin-fortified premium seed blend for parrots and small birds.',
    details: ['Resealable bag', 'No dust fillers', 'With dried fruit pieces'],
  },
  {
    id: 'nest-hideout',
    name: 'Cozy Nest Hideout',
    category: 'Accessories',
    petType: 'Small Pet',
    price: 29.99,
    rating: 4.8,
    reviews: 73,
    emoji: '🏠',
    color: '#D9DEFF',
    badge: 'Bundle Save',
    description: 'Soft tunnel bed and hideout for rabbits, hamsters, and guinea pigs.',
    details: ['Machine washable', 'Anti-slip base', 'Folds flat for storage'],
  },
];

export const featuredIds = ['salmon-bites', 'calm-chews', 'nest-hideout'];

export const initialCart = [
  { productId: 'salmon-bites', quantity: 1 },
  { productId: 'paw-balm', quantity: 2 },
];

export const orders: Order[] = [
  { id: 'PS-1042', status: 'Shipped', total: 48.75, items: 3, eta: 'Arrives Monday' },
  { id: 'PS-1028', status: 'Delivered', total: 31.0, items: 2, eta: 'Delivered on Mar 5' },
  { id: 'PS-1019', status: 'Packing', total: 72.4, items: 4, eta: 'Ready in 2 hours' },
];

export const supportTopics = [
  'Nutrition plans by pet age',
  'Refill reminders for health products',
  'Express delivery windows in your city',
  'Same-day grooming essentials guidance',
];
