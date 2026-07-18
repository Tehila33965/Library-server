import joi from 'joi';

export const bookSchema = joi.object({
    name: joi.string().min(2).max(100).required(),
    category: joi.string().required(),
    price: joi.number().min(0).required()
});

export const signUpSchema = joi.object({
    userName: joi.string().alphanum().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
}).required();

export const signInSchema = joi.object({
    userName: joi.string().required(),
    password: joi.string().required()
});

export const idParamSchema = joi.object({
    id: joi.number().integer().positive().required()
});

export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const allErrors = error.details.map(detail => detail.message);
            const err = new Error('Validation failed');
            err.statusCode = 400;
            err.details = allErrors;

            return next(err);
        }
        next();
    }
}

export const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            const allErrors = error.details.map(detail => detail.message);
            const err = new Error('Invalid Route Parameters');
            err.statusCode = 400;
            err.details = allErrors;
            return next(err);
        }
        next();
    };
};