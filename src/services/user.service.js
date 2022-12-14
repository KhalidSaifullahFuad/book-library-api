
// Dependencies
const bcrypt = require('bcryptjs');
const {db, ObjectId} = require('../services/db.service');

// MongoDB Collection
const collection = db.collection('users');

// Service methods
async function getAllUsers() {
    const users = [];
    await collection.find().forEach(user => users.push(user));

    if(users.length === 0)
        throw new Error("No users found");

    return users;
}

async function findByEmailOrUsername(user) {
    const existingUser = await collection.findOne({
        $or: [
            {email: user.email},
            {username: user.username}
        ]
    });

    return existingUser;
}

async function register(user) {
    // password hashing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // username generation
    user.username = user.username || user.email.split('@')[0]
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();

    const result = await collection.insertOne(user);

    if(result.insertedCount === 0)
        throw new Error("Registration failed");

    return user;
}

async function login(email, password) {
    const userByEmail = await collection.findOne({email: email});

    if(userByEmail === null){
        throw new Error("Invalid email or password");
    }

    const passwordExist = await bcrypt.compare(password, userByEmail.password);

    if(!passwordExist)
        throw new Error("Invalid password");

    return userByEmail;
}

module.exports = {
    getAllUsers,
    findByEmailOrUsername,
    register,
    login
};