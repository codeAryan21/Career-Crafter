import { z } from 'zod';

export const postJobSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200),
    description: z.string().min(50, 'Description must be at least 50 characters'),
    category: z.string().min(2),
    level: z.string().min(2),
    location: z.string().min(2),
    salary: z.number().positive('Salary must be positive').min(0)
});
