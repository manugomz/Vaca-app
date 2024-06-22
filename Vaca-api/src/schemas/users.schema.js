import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required().messages({
        'string.empty': 'Por favor agrega tu nombre',
        'string.min': 'El nombre debe tener mínimo 3 caracteres',
        'string.max': 'El nombre no debe tener más de 100 caracteres',
    }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .min(10)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Por favor ingresar un email',
            'string.min': 'El email debe tener al menos 10 caracteres',
            'string.max': 'Email should have less than 50 characters',
            'string.base': `Email should be a type of 'email'`,
            '*': 'El email no tiene un formato válido',
        }),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[0-9])[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
            'string.min': 'La contraseña debe tener mínimo 8 caracteres',
            '*': 'La contraseña debe incluír al menos un número',
        }),
});

export default schema;
