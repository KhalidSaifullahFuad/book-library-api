// Dependencies
const jwt = require('jsonwebtoken');

// Service
const userService = require("../services/user.service");

// Schema
const {userSchema, loginSchema, options} = require("../models/validation/user.schema");


async function getAll(req, res) {
    try{
        const users = await userService.getAllUsers();

        res.status(200).json({data : users});
    }catch(err){
        res.status(400).json({error : err.message});
    }
}

async function register(req, res) {
    try{
        const {error} = userSchema.validate(req.body, options);
        if(error) throw new Error(error.details[0].message);

        const existingUser = await userService.findByEmailOrUsername(req.body);
        if(existingUser !== null) throw new Error("User already exists");

        const user = await userService.register(req.body);

        res.status(201).json({"message" : "User registered successfully", "user" : user});
    }catch(err){
        res.status(400).json({error : err.message});
    }
}

async function login(req, res) {
    try{
        const result = loginSchema.validate(req.body, options);
        if(result.error) throw new Error(result.error.details[0].message);

        const user = await userService.login(req.body.email, req.body.password);

        // create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
        res.header('auth-token', token);

        res.status(200).json({message : "User logged in successfully", token : token});
    }catch(err){
        res.status(400).json({error : err.message});
    }
}

function logout(req, res) {
    res.status(200).json({message : "User logged out successfully"});
}


module.exports = {
    getAll,
    register,
    login,
    logout
};