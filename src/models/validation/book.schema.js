// Dependency
const Joi = require("joi");

// Schema
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    published: Joi.number().integer().min(1000).max(new Date().getFullYear()),
    genres: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).required(),
    publisher: Joi.string(),
    pages: Joi.number().integer().min(60).required(),
    language: Joi.string().valid("English", "Bengali", "Japanese").required(),
});


// Options
const options = {
    errors: {
        wrap: {
            label: "\'"
        }
    }
};


// Export
module.exports = {bookSchema, options};