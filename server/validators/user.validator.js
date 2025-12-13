import { z } from 'zod';

export const registerUserSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
               'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
});

export const loginUserSchema = z.object({
    email: z.string().email('Invalid email address').optional(),
    username: z.string().min(3).optional(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
               'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
}).refine(data => data.email || data.username, {
    message: 'Either email or username is required'
});

export const applyJobSchema = z.object({
    jobId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid job ID')
});
