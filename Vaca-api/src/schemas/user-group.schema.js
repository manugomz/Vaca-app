import Joi from 'joi';

const schema = Joi.object({
    groupid: Joi.number().min(1).required(),
    userids: Joi.array().items(Joi.number()).required(),
});

export default schema;
