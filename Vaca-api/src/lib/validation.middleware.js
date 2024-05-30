const validate = (schemas) => {
    return (req, res, next) => {
        const validationOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };
        const errors = [];
        if (schemas.body) {
            const { error } = schemas.body.validate(req.body, validationOptions);
            if (error) {
                errors.push(...error.details.map((detail) => detail.message));
            }
        }
        if (schemas.params) {
            const { error } = schemas.params.validate(req.params, validationOptions);
            if (error) {
                errors.push(...error.details.map((detail) => detail.message));
            }
        }
        if (schemas.query) {
            const { error } = schemas.query.validate(req.query, validationOptions);
            if (error) {
                errors.push(...error.details.map((detail) => detail.message));
            }
        }
        if (errors.length > 0) {
            return res.status(422).json({ error: errors });
        } else {
            next();
        }
    };
};

export default validate;
