import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'El grupo debe tener un nombre',
        'string.min': 'El nombre debe tener mínimo 3 caracteres',
        'string.max': 'El nombre no debe tener más de 10 caracteres',
    }),

    color: Joi.string()
        .trim()
        .pattern(new RegExp('^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$'))
        .required()
        .messages({
            'string.empty': 'Por favor elija un color',
            '*': 'El formato del color es incorrecto',
        }),
});

export default schema;
