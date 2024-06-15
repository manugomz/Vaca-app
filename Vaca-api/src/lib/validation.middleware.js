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
            const dataReturned = res.status(400).json({ error: errors });
            if (req.doTransaction && req.dbClient) {
                console.log('Closing connection');
                req.dbClient.release();
                req.dbClient = undefined;
                req.doTransaction = undefined;
            }
            console.info('---ERROR---');
            console.error(errors);
            return dataReturned;
        } else {
            next();
        }
    };
};

export default validate;
