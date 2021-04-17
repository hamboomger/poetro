import Joi from 'joi';

export const createTagValidationSchema = {
  body: Joi.object({
    name: Joi.string()
      .required(),
    color: Joi.string()
      .optional()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/)
      .message('Invalid hex color format'),
  }),
};

export const updateTagValidationSchema = {
  body: Joi.object({
    name: Joi.string()
      .optional(),
    color: Joi.string()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/)
      .message('Invalid hex color format'),
  }),
};
