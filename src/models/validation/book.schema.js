// Dependency
const Joi = require("joi");

// Schema
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().min(1000).max(new Date().getFullYear()).required(),
    genre: Joi.string().required(),
    pages: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
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