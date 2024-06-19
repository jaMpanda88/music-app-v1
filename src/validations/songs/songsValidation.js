const Joi = require('joi');

const songSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().max(50).required(),
  performer: Joi.string().max(50).required(),
  duration: Joi.number().optional(),
  albumId: Joi.string().optional(),
});

module.exports = { songSchema };