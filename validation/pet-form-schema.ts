import { z } from 'zod';

export const petFormSchema = z.object({
  name: z.string().trim().min(2, 'Pet name is required'),
  breed: z.string().trim().min(2, 'Breed is required'),
  age: z
    .string()
    .trim()
    .min(1, 'Age is required')
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, 'Age must be a positive number'),
  price: z
    .string()
    .trim()
    .min(1, 'Price is required')
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, 'Price must be a positive number'),
});

export type PetFormSchema = z.infer<typeof petFormSchema>;
