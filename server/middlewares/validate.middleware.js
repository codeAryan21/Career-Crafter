import { ApiError } from '../utils/ApiError.js';

export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error.errors) {
                const messages = error.errors.map(err => err.message).join(', ');
                throw new ApiError(400, messages);
            }
            throw new ApiError(400, 'Validation failed');
        }
    };
};