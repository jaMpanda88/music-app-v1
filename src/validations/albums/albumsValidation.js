const Joi = require('joi');

const albumsSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

module.exports = { albumsSchema };