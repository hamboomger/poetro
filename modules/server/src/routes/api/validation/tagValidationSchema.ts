import Joi from 'joi';

const tagValidationSchema = {
  body: Joi.object({
    name: Joi.string()
      .required(),
    color: Joi.string()
      .regex(/^#([0-9A-F]{3}){1,2}$/)
      .message('Invalid hex color format'),
  }),
};

export default tagValidationSchema;
