import { ApiError } from '../utils/ApiError.js';

export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error.errors) {
                const messages = error.errors.map(err => err.message).join(', ');
                return next(new ApiError(400, messages));
            }
            return next(new ApiError(400, 'Validation failed'));
        }
    };
};