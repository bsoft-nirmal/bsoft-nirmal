import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must include an uppercase letter')
  .regex(/[0-9]/, 'Must include a number')
  .regex(/[^A-Za-z0-9]/, 'Must include a special character');

export const phoneSchema = z
  .string()
  .min(7, 'Invalid phone number')
  .regex(/^[0-9+()\-\s]+$/, 'Invalid phone number');
