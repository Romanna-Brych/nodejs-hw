import { Segments, Joi } from 'celebrate';

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().max(32),
    email: Joi.string().email().max(64),
  }).min(1),
};
