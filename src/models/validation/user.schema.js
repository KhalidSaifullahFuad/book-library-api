// Dependencies
const Joi = require("joi");

// Schema
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3).max(20).alphanum().optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

// Options
const options = {
    errors: {
        wrap: {
            label: "\'"
        }
    }
};

module.exports = {userSchema, loginSchema, options};

