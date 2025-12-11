import { z } from 'zod';

export const registerUserSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100)
});

export const loginUserSchema = z.object({
    email: z.string().email('Invalid email address').optional(),
    username: z.string().min(3).optional(),
    password: z.string().min(6, 'Password must be at least 6 characters')
}).refine(data => data.email || data.username, {
    message: 'Either email or username is required'
});

export const applyJobSchema = z.object({
    jobId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid job ID')
});
